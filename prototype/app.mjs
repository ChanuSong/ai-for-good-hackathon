import {defaults, fields, evaluate, inquiryPacket, documentPlan} from './engine.mjs';

const translations = {
  ko: {
    eyebrow: 'MARO · 신청 준비 검증실', headline: '서류마다 헤매지 않도록.',
    intro: '직접 준비할 서류와 조회 가능한 서류를 구분하고, 필요한 준비 경로를 찾아요.',
    notice: '합성 사례 전용 · 공식 원문 대조, 사람 검토 전 · AI 미연결',
    profileTitle: '01. 가상의 상황', profileNote: '외국인 여성·한국인 남성 가구의 난임 지원 준비 사례예요. 실제 개인 정보를 입력하지 않아요.',
    reset: '합성 사례 초기화', viewTitle: '02. 준비할 내용 살펴보기', baseline: 'A · 정적 안내', structured: 'B · 준비 점검',
    parity: '두 화면은 같은 조건·근거·질문을 사용해요. A는 기존 서비스 자체를 재현한 화면이 아니에요.',
    packetTitle: '03. 문의할 내용 가져가기', packetNote: '확인되지 않은 질문과 상황을 함께 가져가세요. 직접 선택·복사할 수 있어요.',
    copy: '문의 준비서 복사', print: '인쇄 / PDF', copied: '복사했어요.', copyFailed: '자동 복사가 제한되어 있어요. 위 내용을 선택해 직접 복사해 주세요.',
    footer: '현재 선택은 이 탭의 메모리에서만 사용해요. 새로고침하면 초기화돼요. 외부 AI·분석 서비스로 전송하지 않아요. 공식 링크는 외부 사이트로 이동해요.',
    gaps: '아직 확인할 내용', facts: '근거와 함께 읽는 안내', questions: '담당 창구에 물어볼 질문',
    source_checked: '공식 원문 대조 · 검토 전', verified: '사람 검토 기록 있음', needs_confirmation: '적용 확인 필요', conflicting: '공식 안내 상충',
    source: '공식 자료', supported: '준비를 도와드릴 수 있는 합성 사례예요. 개인별 자격이나 신청 준비 완료를 뜻하지 않아요.',
    outside: '이번 데모의 지역·혼인 범위를 벗어나요. 실제 지원 불가 판정은 아니에요. 해당 조건의 공식 안내부터 확인하세요.',
    unconfirmed: '지역·혼인 조건부터 확인해야 해요. 아직 서초구 법률혼 사례의 절차를 적용하지 않아요.',
    contact_first: '시술 시작 여부·신청 시점은 담당 창구에 먼저 확인하세요. 소급 지원 여부를 판단하지 않아요.',
    changed: '선택한 조건으로 다시 정리했어요. 근거·기관 확인 상태는 바뀌지 않아요.', packetLabel: '합성 사례 문의 준비서',
    language: '언어', glossary: '낯선 서류·용어 이해하기', glossaryToggle: '쉬운 용어 설명 보기 — A·B 공통', fail: '자료를 불러오지 못했어요. README의 실행 명령으로 다시 열어 주세요.', count: n => `확인할 항목 ${n}개 · 완료율이 아니에요`,
  },
  ja: {
    eyebrow: 'MARO · 申請準備の検証', headline: '書類の準備で迷わないために。',
    intro: '自分で準備する書類と照会可能な書類を区分し、必要な準備方法を探します。',
    notice: '架空事例専用 · 公式原文と照合済み・担当者確認前 · AI未接続',
    profileTitle: '01. 架空の状況', profileNote: '外国籍の妻と韓国籍の夫の不妊治療助成の準備事例です。実際の個人情報は入力しません。',
    reset: '架空事例を初期化', viewTitle: '02. 準備する内容を見る', baseline: 'A · 一覧の案内', structured: 'B · 準備チェック',
    parity: '両画面は同じ条件・根拠・質問を使います。Aは既存サービスそのものを再現した画面ではありません。',
    packetTitle: '03. 問い合わせ内容を持ち出す', packetNote: '未確認の質問と状況をまとめています。選択してコピーできます。',
    copy: '問い合わせシートをコピー', print: '印刷 / PDF', copied: 'コピーしました。', copyFailed: '自動コピーが制限されています。上の内容を選択してコピーしてください。',
    footer: '選択内容はこのタブのメモリのみで扱い、再読み込みで初期化します。外部AI・分析サービスに送信しません。公式リンクは外部サイトを開きます。',
    gaps: 'まだ確認すること', facts: '根拠と一緒に読む案内', questions: '窓口に聞く質問',
    source_checked: '公式原文と照合・確認前', verified: '担当者の確認記録あり', needs_confirmation: '適用の確認が必要', conflicting: '公式案内が相違',
    source: '公式資料', supported: '準備を補助できる架空事例です。個別の資格や申請準備の完了を示すものではありません。',
    outside: '今回のデモの地域・婚姻条件の範囲外です。実際の支援対象外という判定ではありません。条件に合う公式案内を確認してください。',
    unconfirmed: '地域・婚姻条件を先に確認してください。まだ瑞草区の法律婚事例の手続きを適用しません。',
    contact_first: '治療開始の状況・申請時期は窓口に先に確認してください。遡及支援の可否は判断しません。',
    changed: '選択条件で再整理しました。根拠や窓口の確認状態は変わりません。', packetLabel: '架空事例の問い合わせ準備シート',
    language: '言語', glossary: '慣れない書類・用語を理解する', glossaryToggle: 'わかりやすい用語説明を表示 — A・B共通', fail: '資料を読み込めませんでした。READMEの起動方法で開き直してください。', count: n => `確認する項目 ${n}件 · 完了率ではありません`,
  },
};
let profile = {...defaults};
let language = 'ko';
let mode = new URLSearchParams(location.search).get('view') === 'B' ? 'structured' : 'baseline';
let data;
let glossary;
let documents;
const $ = id => document.getElementById(id);
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if(cls) node.className=cls; return node; };

function renderForm() {
  $('profile').replaceChildren();
  for (const [key, field] of Object.entries(fields)) {
    const label = el('label', field.label[language]);
    label.htmlFor = key;
    const select = el('select'); select.id = key; select.name = key;
    for (const [value, text] of Object.entries(field.values)) {
      const option = el('option', text[language]); option.value=value; select.append(option);
    }
    select.value = profile[key];
    select.addEventListener('change', () => {profile[key]=select.value; renderResults(); $('announcement').textContent=translations[language].changed;});
    label.append(select); $('profile').append(label);
  }
}

function renderResults() {
  const t = translations[language];
  const result = evaluate(profile, data);
  $('results').replaceChildren();
  $('results').className = mode;
  $('baseline').setAttribute('aria-pressed', String(mode === 'baseline'));
  $('structured').setAttribute('aria-pressed', String(mode === 'structured'));
  $('results').append(el('p', t[result.scope], 'scope-message'));
  $('results').append(el('p', t.count(result.gaps.length), 'count'));
  const gaps = el('section'); gaps.append(el('h3', t.gaps));
  for (const gap of result.gaps) {const p=el('p', gap.title[language], 'gap'); p.dataset.gap=gap.id; gaps.append(p);}
  const facts = el('section'); facts.append(el('h3', t.facts));
  for (const id of result.claimIds) {
    const claim = data.claims.find(c => c.id === id);
    const article = el('article', undefined, 'fact'); article.dataset.claim=id;
    article.append(el('span', t[claim.evidence_status], `badge ${claim.evidence_status}`), el('p', claim.text[language]));
    const sources=el('div',undefined,'sources');
    for (const sid of claim.source_ids) {
      const source=data.sources.find(s=>s.id===sid);
      const link=el('a', `${t.source} · ${source.title}`); link.href=source.url; link.target='_blank'; link.rel='noopener noreferrer'; sources.append(link);
    }
    article.append(sources); facts.append(article);
  }
  const questions=el('section'); questions.append(el('h3',t.questions));
  for (const [i, q] of result.questions.entries()) {const p=el('p',`${i+1}. ${q.text[language]}`,'question'); p.dataset.question=q.id; questions.append(p);}
  if($('glossary-toggle').checked && result.scope==='supported') {
    const section=el('section'); section.id='glossary'; section.append(el('h3',t.glossary));
    for(const term of glossary.terms) {
      const article=el('article',undefined,'fact');article.dataset.term=term.id;
      article.append(el('strong',term.name[language]),el('p',term.meaning[language]),el('p',term.action[language]));
      const link=el('a',`${t.source} · ${term.publisher}`);link.href=term.url;link.target='_blank';link.rel='noopener noreferrer';article.append(link);
      section.append(article);
    }
    $('results').append(section);
  }
  const plan=documentPlan(result,documents);
  const documentSection=el('section'); documentSection.id='documents';
  if(plan) {
    documentSection.append(el('h3',plan.title[language]),el('p',plan.note[language],'scope-message'));
    for(const group of plan.groups) {
      const article=el('article',undefined,'fact'); article.dataset.documentGroup=group.id;
      article.append(el('strong',group.title[language]),el('p',group.action[language]));
      const list=el('ul');
      for(const doc of group.documents) {
        const item=el('li'); item.dataset.document=doc.id; item.append(el('span',doc.name));
        if(doc.route) {
          const details=el('details'),summary=el('summary',doc.route.label[language]);
          const link=el('a',doc.route.label[language]);link.href=doc.route.url;link.target='_blank';link.rel='noopener noreferrer';
          details.append(summary,el('p',doc.route.note[language]),link);item.append(details);
        }
        list.append(item);
      }
      article.append(list);documentSection.append(article);
    }
    const link=el('a',`${t.source} · ${plan.source.title}`);link.href=plan.source.url;link.target='_blank';link.rel='noopener noreferrer';
    documentSection.append(el('p',plan.question[language],'question'),link,el('p',language==='ko' ? `원문 변경일 ${plan.source.source_updated_at} · 열람일 ${plan.checked_at} · 사람 검토 전` : `原文更新日 ${plan.source.source_updated_at} · 閲覧日 ${plan.checked_at} · 担当者確認前`,'muted'));
  }
  if(mode==='structured') $('results').append(documentSection,gaps,questions,facts); else $('results').append(facts,documentSection,gaps,questions);
  $('packet').value=inquiryPacket(profile,result,data,language,documents);
  $('packet-print').textContent=$('packet').value;
  $('copy-status').textContent='';
}

function render() {
  const t=translations[language]; document.documentElement.lang=language;
  const mapping={eyebrow:'eyebrow',headline:'headline',intro:'intro',notice:'notice','profile-title':'profileTitle','profile-note':'profileNote',reset:'reset','view-title':'viewTitle',baseline:'baseline',structured:'structured','parity-note':'parity','packet-title':'packetTitle','packet-note':'packetNote',copy:'copy',print:'print',footer:'footer'};
  for(const [id,key] of Object.entries(mapping)) $(id).textContent=t[key];
  $('language-label').firstChild.textContent=`${t.language} `;
  $('packet').setAttribute('aria-label',t.packetLabel);
  $('glossary-label').textContent=t.glossaryToggle;
  $('announcement').textContent='';
  renderForm(); renderResults();
}

$('language').addEventListener('change', event => {language=event.target.value; if(data) render();});
$('glossary-toggle').addEventListener('change',()=>{if(data) renderResults();});
for(const view of ['baseline','structured']) $(view).addEventListener('click',()=>{mode=view; if(data) renderResults();});
$('reset').addEventListener('click',()=>{profile={...defaults}; if(data) render();});
$('copy').addEventListener('click',async()=>{try {await navigator.clipboard.writeText($('packet').value);$('copy-status').textContent=translations[language].copied;}catch{$('packet').focus();$('packet').select();$('copy-status').textContent=translations[language].copyFailed;}});
$('print').addEventListener('click',()=>window.print());
try {
  const [response, termResponse, documentResponse]=await Promise.all([fetch('../data/seocho-infertility.json',{cache:'no-store'}),fetch('../data/preparation-glossary.json',{cache:'no-store'}),fetch('../data/document-preparation.json',{cache:'no-store'})]);
  if(!response.ok || !termResponse.ok || !documentResponse.ok) throw new Error('Dataset unavailable');
  data=await response.json();glossary=await termResponse.json();documents=await documentResponse.json();render();
} catch {
  $('notice').textContent=translations[language].fail;
  for(const id of ['baseline','structured','reset','copy','print']) $(id).disabled=true;
}
