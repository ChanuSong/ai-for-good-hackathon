import test from "node:test";
import assert from "node:assert/strict";
import { createReply } from "../prototype/chat.mjs";
import { enrichReply } from "../prototype/chat-support.mjs";

test("glossary preserves the Korean term and explains it in the reply language", () => {
  const reply = enrichReply(
    createReply("引っ越しました。住所変更は？"),
    "mapo",
  );
  assert.equal(reply.terms[0].name, "체류지 변경신고");
  assert.match(reply.terms[0].description, /担当機関/);
  assert.equal(reply.location.district, "麻浦区");
  assert.equal(reply.location.url, "https://www.mapo.go.kr/");
});
test("another district never inherits Geumcheon claim deadlines or workflow", () => {
  for (const mode of ["ko", "ja", "en"]) {
    const reply = enrichReply(createReply("약제비 신청", { mode }), "mapo");
    assert.equal(reply.action, undefined);
    assert.equal(reply.source, undefined);
    assert.deepEqual(reply.sources, []);
    assert.doesNotMatch(reply.body, /1개월|1か月|one month/);
    assert.equal(reply.location.url, "https://www.mapo.go.kr/");
  }
});
test("residential district does not determine labor jurisdiction", () => {
  const reply = enrichReply(createReply("퇴직금을 받고 싶어요"), "gangnam");
  assert.equal(reply.location.url, "tel:1350");
  assert.match(reply.location.note, /사업장 소재지/);
});
test("missing location asks for selection instead of implying GPS or an inferred district", () => {
  const reply = enrichReply(createReply("체류지 변경신고"), "");
  assert.equal(reply.location, null);
  assert.equal(reply.needsLocation, true);
});
