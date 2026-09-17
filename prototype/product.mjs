const $ = id => document.getElementById(id);
const el = (tag, text, cls) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (cls) node.className = cls;
  return node;
};

const ui = {
  ko: {
    eyebrow: 'MARO · My Administrative Roadmap',
    headline: '한국 생활행정, 다음 행동이 보이게.',
    intro: '기관별로 흩어진 정보를 내 상황에 맞는 실행 순서로 연결합니다.',
    notice: '합성 사례 · 공식 자료 기반 · 사람 검토 전 · AI 연결 전 규칙 기반 데모',
    situationTitle: '01. 지금 어떤 상황인가요?',
    situationNote: '실제 개인정보를 입력하지 마세요. 이 데모는 난임 시술 후 약제비 청구 시나리오만 지원합니다.',
    situationExample: '시술은 끝났고, 약값도 지원받을 수 있다고 들었어요. 어떻게 청구하나요?',
    analyze: '내가 할 일 보기',
    roadmapTitle: '02. 나의 실행 로드맵',
    currentTitle: '지금 할 일',
    why: '왜 필요한가요?',
    details: '확인할 내용',
    source: '공식 근거',
    checked: '이 단계 확인했어요',
    blocked: '막혔어요',
    unblockTitle: '막혔을 때 이렇게 물어보세요',
    contact: '담당 창구',
    close: '닫기',
    reset: '처음부터',
    done: '준비 흐름을 끝까지 확인했습니다.',
    doneNote: '여기서의 체크는 사용자 준비 상태입니다. 실제 접수·보완·지급 완료는 담당기관 확인 전입니다.',
    research: '연구용 A/B 비교 보기',
    unsupported: '현재 데모는 “난임 시술 후 약제비 청구” 상황만 지원합니다.',
    matched: '합성 데모 시나리오와 일치했습니다. 아래에서 지금 할 일부터 확인하세요.',
    step: (i,n) => `준비 단계 ${i} / ${n}`,
    statusDone: '확인',
    statusNow: '지금',
    statusLater: '다음',
    language: '언어'
  },
  ja: {
    eyebrow: 'MARO · My Administrative Roadmap',
    headline: '韓国の生活行政、次にすることが見えるように。',
    intro: '機関ごとに分かれた情報を、自分の状況に合う実行順序につなぎます。',
    notice: '架空事例 · 公式資料ベース · 担当者確認前 · AI接続前のルールベースデモ',
    situationTitle: '01. 今どんな状況ですか？',
    situationNote: '実際の個人情報は入力しないでください。このデモは不妊治療後の薬代請求のみ対応します。',
    situationExample: '治療は終わりました。薬代も助成されると聞きました。どう請求すればいいですか？',
    analyze: 'やることを見る',
    roadmapTitle: '02. 私の実行ロードマップ',
    currentTitle: '今すること',
    why: 'なぜ必要ですか？',
    details: '確認すること',
    source: '公式根拠',
    checked: 'この段階を確認した',
    blocked: '困っています',
    unblockTitle: '止まったときはこう聞いてください',
    contact: '担当窓口',
    close: '閉じる',
    reset: '最初から',
    done: '準備の流れを最後まで確認しました。',
    doneNote: 'ここでのチェックは利用者側の準備状況です。実際の受付・補完・支給完了は担当機関の確認前です。',
    research: '研究用A/B比較を見る',
    unsupported: '現在のデモは「不妊治療後の薬代請求」の状況のみ対応します。',
    matched: '架空デモのシナリオと一致しました。下で今することから確認してください。',
    step: (i,n) => `準備段階 ${i} / ${n}`,
    statusDone: '確認',
    statusNow: '今',
    statusLater: '次',
    language: '言語'
  }
};

let data;
let language = 'ko';
let current = 0;
let started = false;

function supportedInput(value) {
  const v = value.toLowerCase();
  return ['약제비','약값','약대','처방','시술','薬代','治療','処方'].some(token => v.includes(token));
}

function renderStatic() {
  const t = ui[language];
  document.documentElement.lang = language;
  $('eyebrow').textContent = t.eyebrow;
  $('headline').textContent = t.headline;
  $('intro').textContent = t.intro;
  $('notice').textContent = t.notice;
  $('situation-title').textContent = t.situationTitle;
  $('situation-note').textContent = t.situationNote;
  $('situation').placeholder = t.situationExample;
  if (!$('situation').value) $('situation').value = t.situationExample;
  $('analyze').textContent = t.analyze;
  $('roadmap-title').textContent = t.roadmapTitle;
  $('research-link').textContent = t.research;
  $('reset').textContent = t.reset;
  $('language-label').firstChild.textContent = `${t.language} `;
  renderRoadmap();
}

function renderRoadmap() {
  const t = ui[language];
  const workspace = $('workspace');
  $('announcement').textContent = '';
  if (!started) {
    workspace.hidden = true;
    return;
  }
  workspace.hidden = false;
  $('scenario-summary').textContent = data.summary[language];

  const steps = $('steps');
  steps.replaceChildren();
  data.steps.forEach((step, index) => {
    const item = el('li', undefined, index < current ? 'step done' : index === current ? 'step current' : 'step later');
    const status = el('span', index < current ? t.statusDone : index === current ? t.statusNow : t.statusLater, 'step-status');
    const title = el('span', step.title[language], 'step-title');
    item.append(status, title);
    steps.append(item);
  });

  const card = $('current-card');
  const finished = current >= data.steps.length;
  card.replaceChildren();
  $('unblock').hidden = true;

  if (finished) {
    card.append(el('p', t.done, 'completion-title'), el('p', t.doneNote, 'scope-message'));
    const source = el('a', `${t.source} · ${data.source.publisher}`);
    source.href = data.source.url;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    card.append(source);
    return;
  }

  const step = data.steps[current];
  card.append(el('p', t.step(current + 1, data.steps.length), 'eyebrow'));
  card.append(el('h3', step.title[language], 'action-title'));
  card.append(el('p', step.action[language], 'action-copy'));

  const why = el('section', undefined, 'action-section');
  why.append(el('h4', t.why), el('p', step.why[language]));
  card.append(why);

  const detail = el('section', undefined, 'action-section');
  detail.append(el('h4', t.details));
  const list = el('ul');
  step.details[language].forEach(item => list.append(el('li', item)));
  detail.append(list);
  card.append(detail);

  const source = el('a', `${t.source} · ${data.source.publisher}`, 'source-link');
  source.href = data.source.url;
  source.target = '_blank';
  source.rel = 'noopener noreferrer';
  card.append(source);

  const actions = el('div', undefined, 'action-buttons');
  const next = el('button', t.checked);
  next.type = 'button';
  next.addEventListener('click', () => {
    current += 1;
    renderRoadmap();
  });
  const blocked = el('button', t.blocked, 'secondary');
  blocked.type = 'button';
  blocked.addEventListener('click', () => renderUnblock(step));
  actions.append(next, blocked);
  card.append(actions);
}

function renderUnblock(step) {
  const t = ui[language];
  const panel = $('unblock');
  panel.replaceChildren();
  panel.hidden = false;
  panel.append(el('h3', t.unblockTitle));
  panel.append(el('p', step.unblock[language], 'question'));
  panel.append(el('strong', t.contact), el('p', data.source.contact));
  const close = el('button', t.close, 'secondary');
  close.type = 'button';
  close.addEventListener('click', () => { panel.hidden = true; });
  panel.append(close);
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}

$('analyze').addEventListener('click', () => {
  const t = ui[language];
  if (!supportedInput($('situation').value)) {
    $('announcement').textContent = t.unsupported;
    $('workspace').hidden = true;
    return;
  }
  started = true;
  current = 0;
  $('announcement').textContent = t.matched;
  renderRoadmap();
});

$('reset').addEventListener('click', () => {
  current = 0;
  started = false;
  $('situation').value = ui[language].situationExample;
  $('announcement').textContent = '';
  renderRoadmap();
});

$('language').addEventListener('change', event => {
  language = event.target.value;
  $('situation').value = ui[language].situationExample;
  renderStatic();
});

try {
  const response = await fetch('../data/geumcheon-medication-claim.json', {cache:'no-store'});
  if (!response.ok) throw new Error('dataset unavailable');
  data = await response.json();
  renderStatic();
} catch {
  $('notice').textContent = '데모 데이터를 불러오지 못했습니다. 로컬 서버 실행 상태를 확인해 주세요.';
  $('analyze').disabled = true;
}
