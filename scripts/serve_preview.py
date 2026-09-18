"""Serve only demo assets. Never expose .env, source docs, or directory listings."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = (ROOT / "prototype", ROOT / "data")
EXTENSIONS = {".html", ".mjs", ".js", ".css", ".json", ".svg", ".png", ".jpg", ".webp", ".woff2"}

class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        if path == "/":
            self.send_response(302)
            self.send_header("Location", "/prototype/")
            self.end_headers()
            return None
        if any(part.startswith(".") for part in Path(path).parts if part not in {"/"}):
            self.send_error(404)
            return None
        target = (ROOT / path.lstrip("/")).resolve()
        if target == ROOT / "prototype":
            target = target / "index.html"
        if not any(target.is_relative_to(folder) for folder in PUBLIC) or target.suffix not in EXTENSIONS or not target.is_file():
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def list_directory(self, path):
        self.send_error(404)
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8973)
    args = parser.parse_args()
    print(f"Preview: http://127.0.0.1:{args.port}/prototype/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", args.port), PreviewHandler).serve_forever()
