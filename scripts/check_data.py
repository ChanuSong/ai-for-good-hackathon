"""Check the first demo's data contract; not a general JSON Schema engine."""
import json
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_URLS = {
    "S-SEOCHO": "https://www.seocho.go.kr/site/sh/03/10304050101002020031910.jsp",
    "S-SEOUL": "https://seoul-agi.seoul.go.kr/ifc-csp",
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def fields(obj, names):
    require(isinstance(obj, dict) and set(obj) == set(names.split()), "Unexpected or missing fields")


def nonempty(value):
    require(isinstance(value, str) and bool(value.strip()), "Expected nonempty text")


def localized(value):
    fields(value, "ko ja")
    for text in value.values():
        nonempty(text)


def id_list(values, allowed, minimum=0):
    require(isinstance(values, list) and len(values) >= minimum, "Missing references")
    for value in values:
        nonempty(value)
        require(value in allowed, f"Unknown reference: {value}")
    require(len(set(values)) == len(values), "Duplicate references")


def indexed(values):
    require(isinstance(values, list) and bool(values), "Expected nonempty records")
    result = {}
    for value in values:
        require(isinstance(value, dict) and "id" in value, "Missing record ID")
        nonempty(value["id"])
        require(value["id"] not in result, "Duplicate record ID")
        result[value["id"]] = value
    return result


def validate(dataset):
    fields(dataset, "schema_version dataset_version id data_mode review_status scope sources claims tasks")
    require(dataset["schema_version"] == "1.0", "Unsupported schema")
    nonempty(dataset["dataset_version"])
    require(dataset["id"] == "seocho-infertility-preparation", "Wrong dataset")
    require(dataset["data_mode"] == "official_sources", "Wrong data mode")
    require(dataset["review_status"] in {"human_review_pending", "human_reviewed"}, "Invalid review status")
    scope = dataset["scope"]
    fields(scope, "district marriage household stage description")
    require((scope["district"], scope["marriage"], scope["household"], scope["stage"]) ==
            ("seocho", "legal", "synthetic_foreign_wife_korean_husband", "before_treatment"), "Scope mismatch")
    nonempty(scope["description"])
    sources, claims, tasks = (indexed(dataset[key]) for key in ("sources", "claims", "tasks"))
    for source_id, source in sources.items():
        fields(source, "id title publisher url checked_at updated_at checked_by human_reviewer")
        for key in ("title", "publisher", "url", "checked_by"):
            nonempty(source[key])
        require(source["url"] == ALLOWED_URLS.get(source_id), "Unregistered source URL")
        require(urlparse(source["url"]).scheme == "https", "HTTPS required")
        date.fromisoformat(source["checked_at"])
        if source["updated_at"] is not None:
            date.fromisoformat(source["updated_at"])
        if source["human_reviewer"] is not None:
            nonempty(source["human_reviewer"])
    for claim in claims.values():
        fields(claim, "id text source_ids locations evidence_status human_reviewer")
        localized(claim["text"])
        id_list(claim["source_ids"], sources, 1)
        require(isinstance(claim["locations"], list) and len(claim["locations"]) == len(claim["source_ids"]), "Missing source locations")
        for location in claim["locations"]:
            nonempty(location)
        status = claim["evidence_status"]
        require(status in {"source_checked", "verified", "needs_confirmation", "conflicting"}, "Invalid evidence status")
        if claim["human_reviewer"] is not None:
            nonempty(claim["human_reviewer"])
        if status == "verified":
            nonempty(claim["human_reviewer"])
            require(all(sources[s]["human_reviewer"] for s in claim["source_ids"]), "Unreviewed source for verified claim")
        if status == "conflicting":
            require(len(claim["source_ids"]) >= 2, "Conflict needs both sources")
    if dataset["review_status"] == "human_reviewed":
        require(all(c["human_reviewer"] for c in claims.values()) and all(s["human_reviewer"] for s in sources.values()), "Missing human review records")
    for task in tasks.values():
        fields(task, "id title reason claim_ids depends_on owner status applicability deadline")
        localized(task["title"])
        localized(task["reason"])
        id_list(task["claim_ids"], claims, 1)
        id_list(task["depends_on"], tasks)
        require(task["owner"] in {"user", "spouse", "together"}, "Invalid owner")
        require(task["status"] in {"todo", "doing", "done"}, "Invalid completion status")
        require(task["applicability"] in {"applicable", "not_applicable", "needs_confirmation"}, "Invalid applicability")
        require(task["deadline"] is None, "P0 must not compute deadlines")
        if task["status"] == "done":
            require(all(tasks[t]["status"] == "done" for t in task["depends_on"]), "Completed task with incomplete prerequisites")
    visiting, visited = set(), set()

    def visit(task_id):
        require(task_id not in visiting, "Cyclic task dependencies")
        if task_id in visited:
            return
        visiting.add(task_id)
        for dependency in tasks[task_id]["depends_on"]:
            visit(dependency)
        visiting.remove(task_id)
        visited.add(task_id)

    for task_id in tasks:
        visit(task_id)
    return {"sources": len(sources), "claims": len(claims), "tasks": len(tasks)}


def main():
    dataset = json.loads((ROOT / "data/seocho-infertility.json").read_text())
    counts = validate(dataset)
    cases = json.loads((ROOT / "data/acceptance-cases.json").read_text())
    require(cases["dataset_id"] == dataset["id"], "Acceptance cases target another dataset")
    require(cases["result_status"] == "not_executed_in_app", "Do not claim app tests from data validation")
    records = indexed(cases["cases"])
    require(set(records) == {f"A-{i:02}" for i in range(1, 13)}, "Missing acceptance cases")
    for case in records.values():
        id_list(case["must_show_claims"], {c["id"] for c in dataset["claims"]})
        nonempty(case["expected"])
    schema = json.loads((ROOT / "data/roadmap.schema.json").read_text())
    require(schema["$schema"] == "https://json-schema.org/draft/2020-12/schema", "Wrong schema version")
    print(f"PASS: {counts}; {len(records)} acceptance specifications. App, translation and administrative review remain pending.")


if __name__ == "__main__":
    main()
