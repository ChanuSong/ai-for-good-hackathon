import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {defaults, evaluate, inquiryPacket, documentPlan} from '../prototype/engine.mjs';
const data=JSON.parse(await readFile(new URL('../data/seocho-infertility.json',import.meta.url)));
const documents=JSON.parse(await readFile(new URL('../data/document-preparation.json',import.meta.url)));

test('scope changes remove document guidance from both screen plan and exported packet',()=>{
  for(const changes of [{district:'other'},{district:'unknown'},{marriage:'de_facto'},{treatment_started:'yes'}]) {
    const p={...defaults,...changes},r=evaluate(p,data);
    assert.equal(documentPlan(r,documents),null);
    assert.ok(!inquiryPacket(p,r,data,'ko',documents).includes(documents.source.url));
  }
});
test('self-reported preparation never turns document lookup candidates into issued or exempt documents',()=>{
  const before=JSON.stringify(documents);
  const p={...defaults,preparation:'reviewed',insurance_confirmed:'yes'},r=evaluate(p,data);
  const plan=documentPlan(r,documents);
  assert.equal(JSON.stringify(plan),before);
  for(const lang of ['ko','ja']) {
    const packet=inquiryPacket(p,r,data,lang,documents);
    assert.ok(packet.includes(plan.note[lang]));
    assert.ok(packet.includes(plan.question[lang]));
    for(const group of plan.groups) assert.ok(packet.includes(group.title[lang]));
  }
});

test('unknown insurance produces a question, not an eligibility decision',()=>{
  const r=evaluate({...defaults},data);
  assert.ok(r.questions.some(q=>q.id==='insurance'));
  assert.equal(r.scope,'supported');
  assert.equal(r.reviewStatus,'human_review_pending');
  assert.equal('eligible' in r,false);
});
test('self-reported preparation does not resolve evidence gaps',()=>{
  const r=evaluate({...defaults,insurance_confirmed:'yes',preparation:'reviewed'},data);
  assert.deepEqual(r.questions.map(q=>q.id),['residence','channel','validity']);
  assert.ok(r.claimIds.includes('C-06'));
  assert.equal(data.claims.find(c=>c.id==='C-06').evidence_status,'conflicting');
});
test('other district or de facto marriage does not receive the Seocho path',()=>{
  for(const changes of [{district:'other'},{marriage:'de_facto'}]){
    const p={...defaults,...changes},r=evaluate(p,data);
    assert.equal(r.scope,'outside');assert.deepEqual(r.claimIds,[]);
    assert.ok(!inquiryPacket(p,r,data).includes('02-2155-8135'));
  }
});
test('unknown jurisdiction is not silently treated as Seocho',()=>{
  const r=evaluate({...defaults,district:'unknown'},data);
  assert.equal(r.scope,'unconfirmed');assert.deepEqual(r.claimIds,[]);
});
test('already started treatment receives contact only, no retroactive decision',()=>{
  const r=evaluate({...defaults,treatment_started:'yes'},data);
  assert.equal(r.scope,'contact_first');assert.deepEqual(r.claimIds,['C-03']);
});
test('language changes preserve question IDs and source references',()=>{
  const p={...defaults},r=evaluate(p,data),snapshot=JSON.stringify(r);
  const ko=inquiryPacket(p,r,data,'ko'),ja=inquiryPacket(p,r,data,'ja');
  assert.equal(JSON.stringify(r),snapshot);
  for(const source of data.sources){assert.ok(ko.includes(source.url));assert.ok(ja.includes(source.url));}
});
test('condition recomputation removes obsolete questions without mutating data',()=>{
  const before=JSON.stringify(data);
  evaluate({...defaults},data);
  const r=evaluate({...defaults,insurance_confirmed:'yes'},data);
  assert.ok(!r.questions.some(q=>q.id==='insurance'));
  assert.ok(r.questions.some(q=>q.id==='validity'));
  assert.equal(JSON.stringify(data),before);
});
test('unsupported and unexpected profile values are rejected',()=>{
  assert.throws(()=>evaluate({...defaults,district:'invented'},data));
  assert.throws(()=>evaluate({...defaults,personal_id:'should not be collected'},data));
});
