import test from "node:test";
import assert from "node:assert/strict";
import { createReply } from "../prototype/chat.mjs";

test("question language and explicit reply language are independent from app language", () => {
  assert.equal(createReply("薬代の助成はどう申請しますか？").language, "ja");
  assert.equal(
    createReply("How do I book a public facility?", { appLanguage: "ja" })
      .language,
    "en",
  );
  assert.equal(createReply("약제비 신청 방법", { mode: "en" }).language, "en");
  assert.equal(
    createReply("How do I book a public facility?", { mode: "ja" }).language,
    "ja",
  );
  assert.equal(createReply("???", { appLanguage: "ja" }).language, "ja");
});

test("short follow-ups use topic context without applying fertility rules to other topics", () => {
  assert.equal(
    createReply("必要な書類は？", { context: "medication" }).key,
    "documents",
  );
  assert.equal(
    createReply("What documents?", { context: "booking" }).key,
    "fallback",
  );
  assert.equal(
    createReply("통역이 필요해요", { context: "medication" }).topic,
    "interpretation",
  );
  assert.equal(
    createReply("날씨는 어때?", { context: "medication" }).key,
    "fallback",
  );
});

test("personal balance requests never fabricate a balance or successful lookup", () => {
  for (const [q, phrase] of [
    ["남은 지원금은 어디서 확인해요?", "조회할 수 없어요"],
    ["助成の残額は？", "照会できません"],
    ["What is my remaining balance?", "cannot look up"],
  ]) {
    const reply = createReply(q, { context: "medication" });
    assert.equal(reply.key, "balance");
    assert.ok(reply.body.includes(phrase));
    assert.equal(reply.action, "phone");
    assert.ok(reply.body.includes("02-2627-2643"));
  }
});

test("unsupported questions have no fabricated citation or action", () => {
  const reply = createReply("Tell me my visa eligibility");
  assert.equal(reply.key, "fallback");
  assert.equal(reply.source, undefined);
  assert.equal(reply.action, undefined);
});

test("language variants retain source, jurisdiction, and an identical Korean reference answer", () => {
  const replies = ["ko", "ja", "en"].map((mode) =>
    createReply("약제비 신청", { mode }),
  );
  for (const reply of replies) {
    assert.equal(
      reply.source.url,
      "https://www.geumcheon.go.kr/health/contents.do?key=1487",
    );
    assert.deepEqual(reply.korean, replies[0].korean);
    assert.equal(reply.action, "workflow");
  }
  assert.match(replies[0].body, /금천구/);
  assert.match(replies[1].body, /衿川区/);
  assert.match(replies[2].body, /Geumcheon/);
});
