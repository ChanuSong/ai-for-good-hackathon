"""Reject material errors in the administrative demo data."""
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from check_data import validate


class DataValidationTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / "data/seocho-infertility.json").read_text())

    def test_current_dataset(self):
        self.assertEqual(validate(self.data), {"sources": 2, "claims": 8, "tasks": 6})

    def test_rejects_fabricated_source(self):
        self.data["claims"][0]["source_ids"] = ["S-INVENTED"]
        with self.assertRaisesRegex(ValueError, "Unknown reference"):
            validate(self.data)

    def test_rejects_url_replacement(self):
        self.data["sources"][0]["url"] = "https://example.com/unverified"
        with self.assertRaisesRegex(ValueError, "Unregistered"):
            validate(self.data)

    def test_rejects_evidence_promotion_without_human(self):
        self.data["claims"][0]["evidence_status"] = "verified"
        with self.assertRaises(ValueError):
            validate(self.data)

    def test_rejects_conflict_with_hidden_source(self):
        claim = next(c for c in self.data["claims"] if c["id"] == "C-06")
        claim["source_ids"].pop()
        claim["locations"].pop()
        with self.assertRaisesRegex(ValueError, "both sources"):
            validate(self.data)

    def test_rejects_deadline_in_p0(self):
        self.data["tasks"][-1]["deadline"] = "2027-03-17"
        with self.assertRaisesRegex(ValueError, "deadlines"):
            validate(self.data)

    def test_rejects_cycle(self):
        self.data["tasks"][0]["depends_on"] = [self.data["tasks"][-1]["id"]]
        with self.assertRaisesRegex(ValueError, "Cyclic"):
            validate(self.data)

    def test_rejects_missing_translation(self):
        del self.data["claims"][0]["text"]["ja"]
        with self.assertRaises(ValueError):
            validate(self.data)

    def test_rejects_completion_without_prerequisite(self):
        self.data["tasks"][-1]["status"] = "done"
        with self.assertRaisesRegex(ValueError, "prerequisites"):
            validate(self.data)


if __name__ == "__main__":
    unittest.main()
