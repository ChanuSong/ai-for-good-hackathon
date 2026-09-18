import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../data/geumcheon-medication-claim.json', import.meta.url)));

test('medication claim demo has one official source and five ordered steps', () => {
  assert.equal(data.scope.scenario, '합성 사례');
  assert.equal(data.source.publisher, '금천구보건소');
  assert.match(data.source.url, /geumcheon\.go\.kr/);
  assert.equal(data.steps.length, 5);
  assert.deepEqual(data.steps.map(step => step.id), [
    'check-balance',
    'choose-channel',
    'prepare-documents',
    'submit-claim',
    'confirm-result'
  ]);
});

test('every product step is bilingual and has an unblock path', () => {
  for (const step of data.steps) {
    for (const key of ['title', 'why', 'action', 'details', 'unblock']) {
      assert.ok(step[key], step.id + ' missing ' + key);
      assert.ok(step[key].ko, step.id + '.' + key + '.ko missing');
      assert.ok(step[key].ja, step.id + '.' + key + '.ja missing');
    }
    assert.ok(Array.isArray(step.details.ko));
    assert.ok(Array.isArray(step.details.ja));
  }
});

test('demo explicitly separates user progress from institution outcome', () => {
  const submit = data.steps.find(step => step.id === 'submit-claim');
  const confirm = data.steps.find(step => step.id === 'confirm-result');
  assert.match(submit.action.ko, /기관 접수.*완료된 것으로 처리하지 않습니다/);
  assert.match(confirm.action.ko, /기관에서 접수 여부/);
  assert.match(data.scope.note, /실제 접수 결과를 판정하지 않는다/);
});
