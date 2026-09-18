import { districts, answerLabels, enrichReply } from "./chat-support.mjs";
import { documentState, readerView } from "./document-reader.mjs";
import {
  chatUI,
  replyLanguages,
  createReply,
  chatActionUrls,
} from "./chat.mjs";
import { findGuide, matchGuide } from "./life-guides.mjs";
import {
  guideState,
  homeTools,
  faqView,
  guideView,
  qrView,
  makeGuideLink,
  makeQR,
} from "./guide-views.mjs";

const $ = (id) => document.getElementById(id);
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const paths = {
  camera: "M3 7h4l2-3h6l2 3h4v14H3Zm13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  qr: "M3 3h6v6H3Zm12 0h6v6h-6ZM3 15h6v6H3Zm12 0h3v3h3v3h-6ZM3 12h6m3-9v6m0 3h3m3 0h3m-9 3v6",
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  route: "M5 4v12a4 4 0 0 0 4 4h6a4 4 0 0 0 0-8H9m6-8h4v4M19 4l-6 6",
  folder:
    "M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18",
  arrow: "M4 12h15m-6-6 6 6-6 6",
  chevron: "m9 5 7 7-7 7",
  check: "m5 12 4 4L19 6",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
  shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Zm-4 9 3 3 5-6",
  chat: "M21 11a8 8 0 0 1-8 8H6l-4 3 1-7a8 8 0 1 1 18-4ZM8 10h8m-8 4h5",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  document: "M14 3H5v18h14V8Zm0 0v5h5M8 12h8m-8 4h6",
  info: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v6m0-10v1",
  link: "M14 3h7v7m0-7L10 14m1-10H4v16h16v-7",
  close: "m6 6 12 12M6 18 18 6",
  copy: "M8 8h12v13H8ZM16 8V3H3v13h5",
  phone: "M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4c0 4-8 1-12-3S1 3 5 3Z",
};
const icon = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.document}"/></svg>`;
const texts = {
  ko: {
    home: "홈",
    tasks: "할 일",
    docs: "서류",
    language: "언어",
    demo: "안내",
    about: "서비스 안내",
    close: "닫기",
    welcome: "무엇을<br>처리할까요?",
    situation: "내 상황 입력",
    placeholder: "지금 필요한 일을 적어주세요.",
    example: "난임 시술이 끝났어요. 약제비 지원을 신청하고 싶어요.",
    medicine: "약제비 지원 신청",
    sample: "빠른 입력",
    region: "지역",
    district: "서울 금천구",
    otherRegion: "다른 지역",
    stage: "현재 상황",
    finished: "시술 완료",
    before: "시술 전",
    unknown: "모르겠어요",
    find: "할 일 찾기",
    privacy: "개인정보를 입력하지 마세요.",
    quick: "바로 시작",
    quickSub: "시술 후 원외약 비용 청구",
    quickLabel: "약제비 청구",
    resume: "이어서 진행",
    related: "관련 업무",
    matched: "확인할 지원이<br>있어요.",
    matchTag: "건강 · 의료",
    title: "난임 약제비 지원",
    eligibility: "대상 확인 필요",
    resultSub: "시술 후 구입한 원외처방 약의 비용을 청구하는 절차예요.",
    deadline: "청구 기한",
    deadlineValue: "시술 완료 후 1개월 이내",
    procedure: "진행 순서",
    procedureValue: "5단계",
    provider: "담당 기관",
    providerValue: "금천구보건소",
    start: "준비 시작하기",
    edit: "입력 수정",
    roadmap: "약제비 청구",
    progress: "안내 확인",
    now: "지금 할 일",
    why: "왜 필요한가요?",
    details: "확인할 내용",
    source: "금천구 공식 안내",
    sourceDate: "자료 확인",
    next: "안내 확인 · 다음",
    last: "안내 확인 마치기",
    previous: "이전 단계",
    blocked: "도움 요청",
    helpTitle: "이렇게 물어보세요",
    helpSub: "질문을 복사해 담당 창구에 문의하세요.",
    contact: "금천아이맘건강센터",
    copy: "질문 복사",
    seoulHelp: "통역·상담 지원 찾기",
    seoulNote: "MY SEOUL+ · 외부 사이트",
    koreanQuestion: "한국어 문의 문구",
    copied: "질문을 복사했어요.",
    copyFail: "질문을 길게 눌러 복사해 주세요.",
    call: "전화하기",
    helpNote: "문의 내용은 자동 전송되지 않아요.",
    doneTitle: "안내를 모두<br>확인했어요.",
    doneSub: "준비한 서류를 확인한 경로로 제출해 주세요.",
    institution: "기관 접수·지급",
    notVerified: "미확인",
    restart: "새로 시작",
    viewDocs: "서류 확인",
    docsTitle: "준비 서류",
    docsSub: "준비한 서류에 체크해 주세요.",
    docsNote: "추가 서류는 접수 전에 확인해 주세요.",
    docDone: "준비",
    docGroup: "약제비 청구 · 금천구",
    emptyTitle: "진행 중인 일이 없어요",
    emptyDocs: "아직 준비할 서류가 없어요",
    emptySub: "상황을 입력하면 필요한 일을 찾을 수 있어요.",
    returnHome: "할 일 찾기",
    unsupported:
      "이사·퇴직금은 생활 FAQ에서, 난임 시술 후 약제비는 아래 버튼에서 확인해 주세요.",
    scopeError: "이 약제비 안내는 금천구에서 시술을 완료한 경우에 해당해요.",
    inputRequired: "상황을 입력하거나 약제비 지원 신청을 선택해 주세요.",
    loadError: "자료를 불러오지 못했어요.",
    aboutText:
      "공식 안내를 쉬운 언어로 이해하고, 필요한 서류와 다음 행동을 확인하세요. 신청과 개인별 조회는 담당 기관에서 진행해 주세요.",
    aboutPrivacy:
      "입력과 체크는 이 화면에서만 유지되며, 새로고침하면 지워집니다.",
    review: "행정·번역 검토 전",
    research: "연구용 비교 화면",
    unconfirmed: "잔액·지원 가능 여부는 담당 기관에 확인해 주세요.",
    saveState: "체크는 준비 상태이며, 기관 접수 결과가 아니에요.",
    checkContact: "잔액 확인 문의",
    statusPending: "확인 필요",
    shortSteps: [
      "지원 잔액",
      "청구 경로",
      "서류 준비",
      "청구 접수",
      "결과 확인",
    ],
    stepTitles: [
      "지원 잔액부터\n확인해요",
      "이용할 수 있는\n청구 경로를 찾아요",
      "필요한 서류를\n준비해요",
      "확인한 경로로\n청구해요",
      "기관의 접수 결과를\n확인해요",
    ],
    stepCopy: [
      "이번 시술 회차에 약제비를 청구할 잔액이 남아 있는지 확인하세요.",
      "처음 시술비 지원을 신청한 방법에 따라 온라인 청구 가능 여부가 달라져요.",
      "아래 네 묶음을 준비하고, 추가 서류가 필요한지 확인하세요.",
      "준비한 서류를 보건소에 제출하세요. SeoulMate에서 제출을 대신하지는 않아요.",
      "기관에 접수 여부와 보완할 내용을 확인하세요.",
    ],
    docNames: [
      "시술비 청구서",
      "시술확인서 사본",
      "원외약 처방전·영수증",
      "본인 명의 통장 사본",
    ],
    docNotes: [
      "신청인용 1부",
      "체외수정 또는 인공수정 · 1부",
      "약제별 금액 기재",
      "1부",
    ],
  },
  ja: {
    home: "ホーム",
    tasks: "やること",
    docs: "書類",
    language: "言語",
    demo: "案内",
    about: "サービス案内",
    close: "閉じる",
    welcome: "どんな手続きを<br>お探しですか？",
    situation: "状況を入力",
    placeholder: "今、必要なことを教えてください。",
    example: "不妊治療が終わりました。薬代の助成を申請したいです。",
    medicine: "薬代の助成申請",
    sample: "かんたん入力",
    region: "地域",
    district: "ソウル・衿川区",
    otherRegion: "ほかの地域",
    stage: "現在の状況",
    finished: "治療終了",
    before: "治療前",
    unknown: "不明",
    find: "やることを探す",
    privacy: "個人情報は入力しないでください。",
    quick: "すぐにはじめる",
    quickSub: "治療後の院外処方薬代の請求",
    quickLabel: "薬代の請求",
    resume: "続きを見る",
    related: "関連する手続き",
    matched: "確認する助成が<br>見つかりました。",
    matchTag: "健康・医療",
    title: "不妊治療の薬代助成",
    eligibility: "対象か確認が必要",
    resultSub: "治療後に購入した院外処方薬の費用を請求する手続きです。",
    deadline: "請求期限",
    deadlineValue: "治療終了後1か月以内",
    procedure: "案内の流れ",
    procedureValue: "5ステップ",
    provider: "担当機関",
    providerValue: "衿川区保健所",
    start: "準備をはじめる",
    edit: "入力を変更",
    roadmap: "薬代の請求",
    progress: "案内の確認",
    now: "今すること",
    why: "なぜ必要？",
    details: "確認すること",
    source: "衿川区の公式案内",
    sourceDate: "資料確認",
    next: "確認して次へ",
    last: "案内の確認を終える",
    previous: "前へ",
    blocked: "相談する",
    helpTitle: "こう聞いてみましょう",
    helpSub: "質問をコピーして窓口へお問い合わせください。",
    contact: "衿川アイマム健康センター",
    copy: "質問をコピー",
    seoulHelp: "通訳・相談の案内を見る",
    seoulNote: "MY SEOUL+ · 外部サイト",
    koreanQuestion: "韓国語の問い合わせ文",
    copied: "質問をコピーしました。",
    copyFail: "質問を長押ししてコピーしてください。",
    call: "電話する",
    helpNote: "質問は自動送信されません。",
    doneTitle: "すべての案内を<br>確認しました。",
    doneSub: "確認した方法で準備書類を提出してください。",
    institution: "機関の受付・支給",
    notVerified: "未確認",
    restart: "新しくはじめる",
    viewDocs: "書類を見る",
    docsTitle: "準備書類",
    docsSub: "準備した書類にチェックしてください。",
    docsNote: "追加書類は提出前に確認してください。",
    docDone: "準備済み",
    docGroup: "薬代請求・衿川区",
    emptyTitle: "進行中の手続きはありません",
    emptyDocs: "準備する書類はありません",
    emptySub: "状況から必要な手続きを探しましょう。",
    returnHome: "やることを探す",
    unsupported:
      "引っ越し・退職金は生活FAQ、治療後の薬代は下のボタンから確認できます。",
    scopeError: "この薬代の案内は衿川区で治療が終了した場合に対応します。",
    inputRequired: "状況を入力するか薬代の助成申請を選んでください。",
    loadError: "資料を読み込めませんでした。",
    aboutText:
      "公式案内をやさしい言葉で理解し、必要な書類と次の行動を確認できます。申請や個人別の照会は担当機関で行ってください。",
    aboutPrivacy:
      "入力とチェックはこの画面のみで保持し、再読み込みすると消去します。",
    review: "行政・翻訳確認前",
    research: "研究用の比較画面",
    unconfirmed: "残額・助成の可否は担当機関でご確認ください。",
    saveState: "チェックは準備状況であり、受付結果ではありません。",
    checkContact: "残額について問い合わせ",
    statusPending: "確認が必要",
    shortSteps: ["残額", "請求方法", "書類", "提出", "結果"],
    stepTitles: [
      "助成の残額を\n確認しましょう",
      "利用できる\n請求方法を確認",
      "必要な書類を\n準備しましょう",
      "確認した方法で\n提出しましょう",
      "機関の受付結果を\n確認しましょう",
    ],
    stepCopy: [
      "今回の治療回で薬代を請求できる残額があるか確認してください。",
      "最初の治療費助成の申請方法により、オンライン請求の可否が変わります。",
      "以下の4項目を準備し、追加書類の有無を確認してください。",
      "準備した書類を保健所に提出します。SeoulMateは提出を代行しません。",
      "機関で受付状況と補完事項を確認してください。",
    ],
    docNames: [
      "治療費請求書",
      "治療確認書のコピー",
      "院外処方箋・領収書",
      "本人名義の通帳コピー",
    ],
    docNotes: [
      "申請者用・1部",
      "体外受精または人工授精・1部",
      "薬剤別の金額を記載",
      "1部",
    ],
  },
};
const MY_SEOUL_SUPPORT =
  "https://global.seoul.go.kr/hmpg/cinf/mari/fcns/contPageDetail.do?conts_no=008CF59C26DA4F31B62C01F238DA0BDE";
let data;
const state = {
  language: "ko",
  view: "home",
  input: "",
  district: "geumcheon",
  stage: "after",
  matched: false,
  started: false,
  current: 0,
  reviewed: 0,
  documents: new Set(),
  error: "",
};
const t = () => texts[state.language];
const conversation = {
  mode: "auto",
  draft: "",
  messages: [],
  context: null,
  pending: false,
  generation: 0,
  district: "",
  phase: 0,
  retryQuestion: "",
};
const chatText = () => chatUI[state.language];
let toastTimer;
function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 3500);
}
const action = (id, label, kind = "primary", symbol = "") =>
  `<button type="button" class="${kind}" data-action="${id}">${esc(label)}${symbol ? icon(symbol) : ""}</button>`;
const official = () =>
  `<a href="${esc(data.source.url)}" target="_blank" rel="noopener noreferrer">${icon("shield")}${esc(t().source)}${icon("link")}</a>`;
const brand = `<a class="brand" href="./index.html" aria-label="SeoulMate">SeoulMate<span class="brand-dot"></span></a>`;
function shell(content) {
  const u = t(),
    active =
      state.view === "chat"
        ? "chat"
        : state.view === "docs"
          ? "docs"
          : state.view === "workflow"
            ? "tasks"
            : "home";
  return `<div class="app-frame ${state.view === "chat" ? "chat-frame" : ""}"><header class="app-header">${brand}<div class="header-actions"><label class="language-control">${icon("globe")}<select id="language" aria-label="${u.language}"><option value="ko" ${state.language === "ko" ? "selected" : ""}>한국어</option><option value="ja" ${state.language === "ja" ? "selected" : ""}>日本語</option></select></label></div></header><main id="main" tabindex="-1" class="main ${state.view === "workflow" && state.started ? "flow-main" : ""} ${state.view === "chat" ? "chat-main" : ""}">${content}</main><nav class="tab-bar" aria-label="SeoulMate">${[
    ["home", "home", u.home],
    ["chat", "chat", state.language === "ko" ? "채팅" : "チャット"],
    ["tasks", "route", u.tasks],
    ["docs", "folder", u.docs],
  ]
    .map(
      ([id, s, label]) =>
        `<button type="button" data-nav="${id}" ${active === id ? 'aria-current="page"' : ""} class="${active === id ? "active" : ""}"><span class="tab-icon">${icon(s)}${id === "tasks" && state.started ? "<i></i>" : ""}</span><span>${label}</span></button>`,
    )
    .join("")}</nav></div>`;
}
function pageTitle(title, sub = "") {
  return `<div class="page-title"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>`;
}
function chatMessage(message) {
  const u = chatText();
  if (message.role === "user")
    return `<div class="chat-user">${esc(message.text)}</div>`;
  if (message.role === "status")
    return `<div class="chat-stopped">${state.language === "ko" ? "답변을 중지했어요." : "回答を停止しました。"}${message === conversation.messages.at(-1) && !conversation.pending ? `<button data-action="chat-retry">${state.language === "ko" ? "다시 시도" : "再試行"}</button>` : ""}</div>`;
  const reply = message.reply,
    labels = answerLabels[reply.language];
  const nextAction = reply.action?.startsWith("guide:")
    ? `<button class="chat-next" data-guide="${esc(reply.action.slice(6))}" data-guide-language="${reply.language}">${esc(reply.cta)}${icon("arrow")}</button>`
    : !reply.action
      ? ""
      : reply.action === "workflow"
        ? `<button class="chat-next" data-action="chat-workflow">${esc(reply.cta)}${icon("arrow")}</button>`
        : `<a class="chat-next" href="${esc(chatActionUrls[reply.action])}" ${reply.action === "phone" ? "" : 'target="_blank" rel="noopener noreferrer"'}>${esc(reply.cta)}${icon("link")}</a>`;
  const terms = reply.terms?.length
    ? `<section class="answer-glossary"><h3>${icon("spark")}${labels.terms}</h3>${reply.terms.map((term) => `<div class="term-row"><span class="term-korean" lang="ko">${esc(term.name)}</span><strong>${esc(term.title)}</strong><p>${esc(term.description)}</p></div>`).join("")}</section>`
    : "";
  const local = reply.location
    ? `<aside class="answer-local"><div class="local-heading">${icon("pin")}<span>${labels.selected}<strong>${esc(reply.location.district)}</strong></span></div><p>${esc(reply.location.note)}</p><a href="${esc(reply.location.url)}" ${reply.location.url.startsWith("tel:") ? "" : 'target="_blank" rel="noopener noreferrer"'}>${esc(reply.location.label)}${icon("arrow")}</a></aside>`
    : reply.needsLocation
      ? `<button class="chat-location-prompt" data-action="chat-location">${icon("pin")}${labels.choose}${icon("chevron")}</button>`
      : "";
  const sources = reply.sources || (reply.source ? [reply.source] : []);
  return `<article class="chat-answer" lang="${reply.language}"><div class="chat-author"><span class="chat-avatar">${icon("spark")}</span><strong>SeoulMate</strong><span class="reply-language">${replyLanguages[reply.language]}</span></div><div class="chat-answer-body"><h2>${esc(reply.title)}</h2><div class="answer-paragraphs">${reply.body
    .split(/\n+/)
    .map((p) => `<p>${esc(p)}</p>`)
    .join(
      "",
    )}</div>${terms}${local}${reply.steps?.length ? `<details class="answer-steps"><summary>${labels.next}<span>${reply.steps.length}</span></summary><ol>${reply.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol></details>` : ""}${sources.length ? `<details class="answer-sources"><summary>${icon("shield")}${labels.source}<span>${sources.length}</span></summary>${sources.map((source) => `<a class="chat-source" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(source.title)}<small>${new URL(source.url).hostname} · ${{ ko: "자료 확인", ja: "確認日", en: "Checked" }[reply.language]} ${reply.checkedAt || "2026-09-18"}</small></span>${icon("link")}</a>`).join("")}</details>` : ""}${reply.language !== "ko" ? `<details class="chat-original"><summary>${labels.original}</summary><div lang="ko"><strong>${esc(reply.korean.title)}</strong><p>${esc(reply.korean.body)}</p></div></details>` : ""}${nextAction}</div></article>`;
}

function chat() {
  const u = chatText();
  return `<div class="chat-toolbar"><button class="chat-knowledge" data-action="chat-about">${icon("shield")}<span>${u.subtitle}</span>${icon("info")}</button><button class="icon-button" data-action="chat-clear" aria-label="${u.clear}" title="${u.clear}">${icon("spark")}</button></div><div class="chat-context-bar"><button data-action="chat-location">${icon("pin")}<span>${conversation.district ? districts[conversation.district][state.language] : state.language === "ko" ? "내 지역 설정" : "地域を選ぶ"}</span><small>${state.language === "ko" ? "직접 선택" : "手動選択"}</small>${icon("chevron")}</button><span>${state.language === "ko" ? "쉬운 용어 설명" : "やさしい用語解説"}</span></div><div id="chat-scroll" class="chat-scroll"><div id="chat-messages" role="log" aria-label="${state.language === "ko" ? "대화" : "会話"}" aria-live="polite">${conversation.messages.length ? conversation.messages.map(chatMessage).join("") : `<section class="chat-welcome"><span class="chat-welcome-icon">${icon("chat")}</span><h1>${esc(u.title).replace(/\n/g, "<br>")}</h1><p>${u.description}</p><div class="chat-examples">${u.examples.map((q, i) => `<button data-chat-example="${i}"><span>${esc(q)}</span>${icon("arrow")}</button>`).join("")}</div></section>`}${conversation.pending ? `<div class="chat-typing" role="status"><span class="chat-dots" aria-hidden="true"><i></i><i></i><i></i></span>${conversation.phase ? (state.language === "ko" ? "쉬운 말로 정리하고 있어요" : "やさしい言葉にまとめています") : u.thinking}<button data-action="chat-stop">${state.language === "ko" ? "중지" : "停止"}</button></div>` : ""}</div>${conversation.context === "medication" && !conversation.pending ? `<div class="chat-followups">${u.followups.map((q, i) => `<button data-chat-followup="${i}">${esc(q)}</button>`).join("")}</div>` : ""}</div><div class="chat-compose-area"><label class="chat-language">${icon("globe")}<span>${u.mode}</span><select id="reply-language">${[["auto", u.auto], ...Object.entries(replyLanguages)].map(([value, label]) => `<option value="${value}" ${conversation.mode === value ? "selected" : ""}>${label}</option>`).join("")}</select></label><form id="chat-form"><label for="chat-input" class="sr-only">${u.placeholder}</label><textarea id="chat-input" rows="1" maxlength="600" placeholder="${u.placeholder}">${esc(conversation.draft)}</textarea><button type="submit" class="chat-send" aria-label="${u.send}" ${conversation.pending || !conversation.draft.trim() ? "disabled" : ""}>${icon("arrow")}</button></form><p class="chat-privacy">${u.privacy}</p></div>`;
}
function scrollChat() {
  const container = $("chat-scroll");
  if (container) container.scrollTop = container.scrollHeight;
}
async function sendChat(value, retry = false) {
  const question = value.trim().slice(0, 600);
  if (!question || conversation.pending) return;
  const generation = conversation.generation;
  const reply = enrichReply(
    createReply(question, {
      mode: conversation.mode,
      appLanguage: state.language,
      context: conversation.context,
    }),
    conversation.district,
  );
  if (retry && conversation.messages.at(-1)?.role === "status")
    conversation.messages.pop();
  if (!retry) conversation.messages.push({ role: "user", text: question });
  conversation.retryQuestion = question;
  conversation.phase = 0;
  conversation.draft = "";
  conversation.pending = true;
  render();
  scrollChat();
  await new Promise((resolve) => setTimeout(resolve, 450));
  if (generation !== conversation.generation) return;
  conversation.phase = 1;
  if (state.view === "chat") render();
  await new Promise((resolve) => setTimeout(resolve, 650));
  if (generation !== conversation.generation) return;
  conversation.messages.push({ role: "assistant", reply });
  conversation.context = reply.topic;
  conversation.pending = false;
  if (state.view === "chat") {
    render();
    const last = document.querySelector(".chat-answer:last-child");
    const container = $("chat-scroll");
    if (last && container)
      container.scrollTop +=
        last.getBoundingClientRect().top -
        container.getBoundingClientRect().top -
        16;
  }
}
function home() {
  const u = t();
  return `${pageTitle(u.welcome)}${homeTools(state.language, icon)}<form id="situation-form" class="composer-form">${state.error ? `<p class="error" role="alert">${esc(state.error)}</p>` : ""}<div class="composer"><label class="sr-only" for="situation">${u.situation}</label><textarea id="situation" maxlength="600" placeholder="${u.placeholder}">${esc(state.input)}</textarea><button type="button" data-action="sample" class="example-pill">${icon("spark")}${u.medicine}<span>+</span></button></div><div class="context-fields"><label class="context-field">${icon("pin")}<span class="sr-only">${u.region}</span><select id="district"><option value="geumcheon" ${state.district === "geumcheon" ? "selected" : ""}>${u.district}</option><option value="other" ${state.district === "other" ? "selected" : ""}>${u.otherRegion}</option></select></label><label class="context-field"><span class="sr-only">${u.stage}</span><select id="stage">${[
    ["after", u.finished],
    ["before", u.before],
    ["unknown", u.unknown],
  ]
    .map(
      ([v, l]) =>
        `<option value="${v}" ${state.stage === v ? "selected" : ""}>${l}</option>`,
    )
    .join(
      "",
    )}</select></label></div><button type="submit" class="primary full">${u.find}${icon("arrow")}</button><p class="privacy">${u.privacy}</p></form><section class="shortcut-section"><h2>${state.started ? u.resume : u.quick}</h2><button type="button" class="service-row" data-action="${state.started ? "tasks" : "quick"}"><span class="service-icon">${icon(state.started ? "route" : "document")}</span><span class="service-copy"><strong>${state.started ? u.roadmap : u.quickLabel}</strong><small>${state.started ? `${u.progress} ${state.reviewed}/5` : u.quickSub}</small></span>${icon("chevron")}</button></section>`;
}
function sourceRow() {
  return `<div class="source-row">${official()}<span>${esc(data.source.checked_at)}</span></div>`;
}
function result() {
  const u = t();
  return `<button class="back-button" data-action="edit" aria-label="${u.edit}">${icon("chevron")}</button>${pageTitle(u.matched)}<section class="benefit-card"><div class="benefit-top"><span class="service-icon large">${icon("document")}</span><span class="category">${u.matchTag}</span></div><h2>${u.title}</h2><span class="status-chip">${u.eligibility}</span><p>${u.resultSub}</p><dl class="facts">${[
    [u.deadline, u.deadlineValue],
    [u.provider, u.providerValue],
    [u.procedure, u.procedureValue],
  ]
    .map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`)
    .join(
      "",
    )}</dl></section><p class="inline-note">${icon("info")}${u.unconfirmed}</p>${sourceRow()}<div class="bottom-action">${action("start", u.start, "primary full", "arrow")}</div>`;
}
function documentList() {
  const u = t();
  return `<ul class="document-list">${u.docNames.map((name, i) => `<li><label class="document-item ${state.documents.has(i) ? "checked" : ""}"><input type="checkbox" data-doc="${i}" ${state.documents.has(i) ? "checked" : ""}><span class="custom-check">${icon("check")}</span><span class="document-copy"><strong>${name}</strong><small>${u.docNotes[i]}</small></span></label></li>`).join("")}</ul>`;
}
function roadmap() {
  const u = t();
  return `<div class="progress-heading"><span>${u.roadmap}</span><span>${Math.min(state.current + 1, 5)}<small> / 5</small></span></div><div class="progress-track" role="progressbar" aria-label="${u.progress}" aria-valuenow="${state.reviewed}" aria-valuemin="0" aria-valuemax="5">${data.steps.map((s, i) => `<button type="button" data-step="${i}" aria-label="${esc(s.title[state.language])}" ${i > state.reviewed ? "disabled" : ""} ${state.current === i ? 'aria-current="step"' : ""} class="${i < state.reviewed ? "done" : ""} ${i === state.current ? "current" : ""}"><span></span></button>`).join("")}</div>`;
}
function workflow() {
  const u = t();
  if (!state.started) return empty();
  if (state.current >= 5)
    return `<section class="completion"><div class="success-orbit"><span>${icon("check")}</span><i></i><b></b></div>${pageTitle(u.doneTitle, u.doneSub)}<div class="institution-status"><span>${u.institution}</span><strong>${u.notVerified}</strong></div>${action("docs", u.viewDocs, "primary full", "folder")}${action("reset", u.restart, "text-button full")}</section>`;
  const s = data.steps[state.current];
  return `${roadmap()}<article class="step-content"><span class="step-eyebrow">${u.now}</span><h1>${u.stepTitles[state.current].split("\n").join("<br>")}</h1><p class="step-copy">${u.stepCopy[state.current]}</p>${state.current === 0 ? `<button class="contact-action" data-action="help"><span class="contact-icon">${icon("phone")}</span><span><strong>${u.checkContact}</strong><small>${u.contact}</small></span>${icon("chevron")}</button>` : ""}${state.current === 2 ? documentList() : `<div class="check-points">${s.details[state.language].map((d) => `<p><span class="point-dot"></span>${esc(d)}</p>`).join("")}</div>`}<details class="explanation"><summary>${u.why}${icon("chevron")}</summary><p>${esc(s.why[state.language])}</p></details>${sourceRow()}</article><div class="flow-actions"><div class="flow-secondary">${state.current ? action("previous", u.previous, "text-button", "") : ""}${action("help", u.blocked, "text-button", "chat")}</div>${action("next", state.current === 4 ? u.last : u.next, "primary full", "arrow")}<p>${u.saveState}</p></div>`;
}
function empty(isDocs = false) {
  const u = t();
  return `${pageTitle(isDocs ? u.docsTitle : u.tasks)}<section class="empty-state"><span class="empty-icon">${icon(isDocs ? "folder" : "route")}</span><h2>${isDocs ? u.emptyDocs : u.emptyTitle}</h2><p>${u.emptySub}</p>${action("edit", u.returnHome, "primary", "arrow")}</section>`;
}
function docs() {
  const u = t();
  if (!state.started) return empty(true);
  return `${pageTitle(u.docsTitle, u.docsSub)}<div class="document-summary"><span>${u.docGroup}</span><strong id="document-count">${state.documents.size}<small> / 4</small></strong></div>${documentList()}<p class="inline-note">${icon("info")}${u.docsNote}</p>${sourceRow()}`;
}
function render(focus = false) {
  const restoreChatInput =
    !focus && document.activeElement?.id === "chat-input";
  const selection = restoreChatInput
    ? [$("chat-input").selectionStart, $("chat-input").selectionEnd]
    : null;
  document.documentElement.lang = state.language;
  document.title =
    state.language === "ko"
      ? "SeoulMate · 생활행정"
      : "SeoulMate · 生活の手続き";
  $("app").innerHTML = shell(
    state.view === "faq"
      ? faqView(state.language, icon)
      : state.view === "guide"
        ? guideView(icon)
        : state.view === "qr"
          ? qrView(state.language, icon, location.href)
          : state.view === "reader"
            ? readerView(state.language, icon, guideState.language)
            : state.view === "chat"
              ? chat()
              : state.view === "home"
                ? home()
                : state.view === "result"
                  ? result()
                  : state.view === "docs"
                    ? docs()
                    : workflow(),
  );
  if (focus) {
    $("main").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  if (state.view === "chat") scrollChat();
  if (restoreChatInput && $("chat-input")) {
    $("chat-input").focus({ preventScroll: true });
    $("chat-input").setSelectionRange(...selection);
  }
}
function sheetHeader(title) {
  return `<div class="sheet-handle"></div><div class="sheet-heading"><h2 id="help-title">${title}</h2><button type="button" class="icon-button" data-action="close" aria-label="${t().close}">${icon("close")}</button></div>`;
}
function showHelp() {
  const u = t(),
    s = data.steps[Math.min(state.current, 4)],
    d = $("help-dialog");
  d.innerHTML = `${sheetHeader(u.helpTitle)}<p class="sheet-intro">${u.helpSub}</p><div class="question-card" id="question">${esc(s.unblock[state.language])}${state.language === "ja" ? `<div class="korean-question"><small>${u.koreanQuestion}</small>${esc(s.unblock.ko)}</div>` : ""}</div><div class="contact-box"><span class="contact-icon">${icon("phone")}</span><div><small>${u.contact}</small><a href="tel:0226272643">02-2627-2643</a></div></div><div class="sheet-actions">${action("copy", u.copy, "secondary", "copy")}<a class="primary" href="tel:0226272643">${u.call}${icon("arrow")}</a></div><p class="sheet-note">${u.helpNote}</p><a class="seoul-link" href="${MY_SEOUL_SUPPORT}" target="_blank" rel="noopener noreferrer"><span class="seoul-symbol">${icon("globe")}</span><span><strong>${u.seoulHelp}</strong><small>${u.seoulNote}</small></span>${icon("link")}</a>`;
  d.showModal();
}
function showAbout() {
  const u = t(),
    d = $("help-dialog");
  d.innerHTML = `${sheetHeader("SeoulMate")}<p class="about-copy">${u.aboutText}</p><p class="about-copy">${u.aboutPrivacy}</p>`;
  d.showModal();
}
function navigate(view) {
  if (view !== "guide" && location.hash)
    history.replaceState(null, "", location.pathname + location.search);
  state.error = "";
  state.view = view;
  render(true);
}
function openGuide(id, language = state.language) {
  if (!findGuide(id)) return;
  guideState.id = id;
  guideState.language = Object.hasOwn(replyLanguages, language)
    ? language
    : state.language;
  history.pushState(
    null,
    "",
    makeGuideLink(location.href, id, guideState.language),
  );
  navigate("guide");
}
function readGuideRoute() {
  const params = new URLSearchParams(location.hash.slice(1));
  if (!findGuide(params.get("guide"))) return false;
  guideState.id = params.get("guide");
  guideState.language = Object.hasOwn(replyLanguages, params.get("lang"))
    ? params.get("lang")
    : "ko";
  if (guideState.language !== "en") state.language = guideState.language;
  state.view = "guide";
  return true;
}
window.addEventListener("popstate", () => {
  if (!data) return;
  if (!readGuideRoute()) state.view = "home";
  render(true);
});
function supported(value) {
  const v = value.trim();
  return (
    /약제비|약값|원외약|薬代|薬剤費/.test(v) &&
    !/시술\s*전|아직.{0,8}(안\s*끝|끝나지)|治療前|まだ.{0,8}終わってい/.test(v)
  );
}
let finding = false;
async function analyze() {
  if (finding) return;
  const guide = matchGuide(state.input);
  if (guide) {
    openGuide(guide.id);
    return;
  }
  state.error = "";
  if (!state.input.trim()) state.error = t().inputRequired;
  else if (state.district !== "geumcheon" || state.stage !== "after")
    state.error = t().scopeError;
  else if (!supported(state.input)) state.error = t().unsupported;
  if (state.error) {
    state.matched = false;
    render();
    $("situation").focus();
    return;
  }
  finding = true;
  $("app").innerHTML =
    `<div class="app-frame"><main id="main" class="finding-page" tabindex="-1"><div class="finding-content" role="status"><span class="finding-spinner" aria-hidden="true"></span><span class="finding-label">${state.language === "ko" ? "금천구 보건소의 약제비 지원 안내를<br>확인하고 있어요" : "衿川区保健所の薬剤費支援の案内を<br>確認しています"}</span></div></main></div>`;
  $("main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
  // Brief presentation delay for the demo; no remote analysis is performed.
  await new Promise((resolve) => setTimeout(resolve, 2200));
  finding = false;
  state.matched = true;
  navigate("result");
}
$("app").addEventListener("submit", (e) => {
  if (e.target.id === "chat-form") {
    e.preventDefault();
    sendChat(conversation.draft);
  }
  if (e.target.id === "situation-form") {
    e.preventDefault();
    analyze();
  }
});
$("app").addEventListener("input", (e) => {
  if (e.target.id === "chat-input") {
    conversation.draft = e.target.value;
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 90)}px`;
    $("chat-form").querySelector("button").disabled =
      conversation.pending || !conversation.draft.trim();
  }
  if (e.target.id === "situation") state.input = e.target.value;
});
$("app").addEventListener("change", (e) => {
  if (
    ["guide-language", "qr-language", "reader-language"].includes(e.target.id)
  ) {
    guideState.language = e.target.value;
    if (state.view === "guide")
      history.replaceState(null, "", makeGuideLink(location.href));
    if (state.view === "qr") guideState.qrReady = false;
    render();
    return;
  }
  if (e.target.id === "qr-guide") {
    guideState.id = e.target.value;
    guideState.qrReady = false;
    render();
    return;
  }
  if (e.target.matches("[data-guide-check]")) {
    const checked = guideState.checked.get(guideState.id) || new Set();
    const item = Number(e.target.dataset.guideCheck);
    if (e.target.checked) checked.add(item);
    else checked.delete(item);
    guideState.checked.set(guideState.id, checked);
    return;
  }
  if (e.target.id === "reply-language") {
    conversation.mode = e.target.value;
  }
  if (e.target.id === "language") {
    const old = texts[state.language];
    const wasExample = state.input === old.example;
    state.language = e.target.value;
    if (state.view === "guide") {
      guideState.language = state.language;
      history.replaceState(null, "", makeGuideLink(location.href));
    }
    if (wasExample) state.input = t().example;
    state.error = "";
    render();
  } else if (e.target.id === "district") state.district = e.target.value;
  else if (e.target.id === "stage") state.stage = e.target.value;
  else if (e.target.matches("[data-doc]")) {
    const i = Number(e.target.dataset.doc);
    if (e.target.checked) state.documents.add(i);
    else state.documents.delete(i);
    e.target
      .closest(".document-item")
      .classList.toggle("checked", e.target.checked);
    if ($("document-count"))
      $("document-count").innerHTML =
        `${state.documents.size}<small> / 4</small>`;
  }
});
async function handleAction(id) {
  switch (id) {
    case "capture-document":
      $("document-camera").click();
      break;
    case "upload-document":
      $("document-upload").click();
      break;
    case "document-reset":
      clearDocument();
      navigate("reader");
      break;
    case "document-sample":
      clearDocument();
      documentState.sample = true;
      render(true);
      break;
    case "analyze-document":
      if (!documentState.photoUrl && !documentState.sample) break;
      documentState.result = true;
      render(true);
      break;
    case "open-faq":
      navigate("faq");
      break;
    case "open-reader":
      guideState.language = state.language;
      navigate("reader");
      break;
    case "open-qr":
      if (state.view !== "guide") guideState.language = state.language;
      guideState.qrReady = false;
      navigate("qr");
      break;
    case "generate-qr":
      guideState.qrReady = true;
      render(true);
      break;
    case "preview-qr":
      openGuide(guideState.id, guideState.language);
      break;
    case "read-sample":
      openGuide("moving", guideState.language);
      break;
    case "copy-qr":
      try {
        await navigator.clipboard.writeText(makeGuideLink(location.href));
        toast(
          state.language === "ko"
            ? "안내 링크를 복사했어요."
            : "案内リンクをコピーしました。",
        );
      } catch {
        toast(
          state.language === "ko"
            ? "QR 아래 링크를 복사해 주세요."
            : "QRの下のリンクをコピーしてください。",
        );
      }
      break;
    case "download-qr": {
      const url = URL.createObjectURL(
        new Blob([makeQR(makeGuideLink(location.href))], {
          type: "image/svg+xml",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `SeoulMate-${guideState.id}-${guideState.language}.svg`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      break;
    }
    case "guide-chat": {
      const question = findGuide(guideState.id)[guideState.language].question;
      conversation.mode = guideState.language;
      navigate("chat");
      sendChat(question);
      break;
    }
    case "chat-location": {
      const ja = state.language === "ja";
      $("help-dialog").innerHTML =
        `${sheetHeader(ja ? "案内する地域" : "안내받을 지역")}<p class="sheet-intro">${ja ? "案内する地域を選んでください。次の質問から反映します。" : "안내받을 지역을 선택해 주세요. 다음 질문부터 반영돼요."}</p><div class="district-options">${Object.entries(
          districts,
        )
          .map(
            ([id, d]) =>
              `<button data-chat-district="${id}" aria-pressed="${conversation.district === id}">${icon("pin")}<span>${d[state.language]}</span>${conversation.district === id ? icon("check") : icon("chevron")}</button>`,
          )
          .join(
            "",
          )}</div><button class="text-button" data-chat-district="">${ja ? "地域を設定しない" : "지역 설정 없이 사용"}</button><p class="sheet-note">${ja ? "GPSの取得や位置情報の送信は行いません。" : "GPS를 조회하거나 위치를 전송하지 않아요."}</p>`;
      $("help-dialog").showModal();
      break;
    }
    case "chat-stop":
      if (!conversation.pending) break;
      conversation.generation += 1;
      conversation.pending = false;
      conversation.messages.push({ role: "status" });
      render();
      break;
    case "chat-retry":
      sendChat(conversation.retryQuestion, true);
      break;
    case "chat-about": {
      const u = chatText();
      $("help-dialog").innerHTML =
        `${sheetHeader(u.about)}<p class="about-copy">${u.disclosure}</p><p class="sheet-note">${u.scope}</p>`;
      $("help-dialog").showModal();
      break;
    }
    case "chat-clear":
      conversation.generation += 1;
      conversation.messages = [];
      conversation.context = null;
      conversation.pending = false;
      conversation.draft = "";
      render(true);
      break;
    case "chat-workflow":
      state.matched = true;
      state.district = "geumcheon";
      state.stage = "after";
      navigate(state.started ? "workflow" : "result");
      break;
    case "about":
      showAbout();
      break;
    case "quick":
      state.input = t().example;
      state.district = "geumcheon";
      state.stage = "after";
      analyze();
      break;
    case "sample":
      state.input = t().example;
      state.district = "geumcheon";
      state.stage = "after";
      state.error = "";
      render();
      $("situation").focus();
      break;
    case "edit":
      navigate("home");
      break;
    case "tasks":
      navigate("workflow");
      break;
    case "docs":
      navigate("docs");
      break;
    case "start":
      if (!state.matched) return;
      state.started = true;
      state.current = 0;
      state.reviewed = 0;
      state.documents.clear();
      navigate("workflow");
      break;
    case "next":
      state.reviewed = Math.max(state.reviewed, Math.min(state.current + 1, 5));
      state.current = Math.min(state.current + 1, 5);
      render(true);
      break;
    case "previous":
      state.current = Math.max(0, state.current - 1);
      render(true);
      break;
    case "help":
      showHelp();
      break;
    case "close":
      $("help-dialog").close();
      break;
    case "copy":
      try {
        await navigator.clipboard.writeText(
          $("question").textContent + "\n" + data.source.contact,
        );
        toast(t().copied);
      } catch {
        toast(t().copyFail);
      }
      break;
    case "reset":
      state.started = false;
      state.matched = false;
      state.current = 0;
      state.reviewed = 0;
      state.documents.clear();
      state.input = "";
      state.district = "geumcheon";
      state.stage = "after";
      navigate("home");
      break;
  }
}
$("app").addEventListener("click", (e) => {
  const guide = e.target.closest("[data-guide]");
  if (guide) {
    openGuide(
      guide.dataset.guide,
      guide.dataset.guideLanguage || state.language,
    );
    return;
  }
  const filter = e.target.closest("[data-faq-filter]");
  if (filter) {
    guideState.category = filter.dataset.faqFilter;
    render();
    return;
  }
  const example = e.target.closest("[data-chat-example], [data-chat-followup]");
  if (example) {
    const u = chatText();
    sendChat(
      example.hasAttribute("data-chat-example")
        ? u.examples[Number(example.dataset.chatExample)]
        : u.followups[Number(example.dataset.chatFollowup)],
    );
    return;
  }
  const nav = e.target.closest("[data-nav]");
  if (nav) {
    navigate(nav.dataset.nav === "tasks" ? "workflow" : nav.dataset.nav);
    return;
  }
  const step = e.target.closest("[data-step]");
  if (step && !step.disabled) {
    state.current = Number(step.dataset.step);
    render(true);
    return;
  }
  const a = e.target.closest("[data-action]");
  if (a) handleAction(a.dataset.action);
});
$("app").addEventListener("keydown", (e) => {
  if (
    e.target.id === "chat-input" &&
    e.key === "Enter" &&
    !e.shiftKey &&
    !e.isComposing
  ) {
    e.preventDefault();
    sendChat(conversation.draft);
  }
});
let documentGeneration = 0;
function clearDocument() {
  documentGeneration += 1;
  if (documentState.photoUrl) URL.revokeObjectURL(documentState.photoUrl);
  documentState.photoUrl = "";
  documentState.sample = false;
  documentState.result = false;
}
async function loadDocument(e) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  if (
    !/^image\/(jpeg|png|webp|gif|heic|heif|avif)$/.test(file.type) ||
    file.size > 15 * 1024 * 1024
  ) {
    toast(
      state.language === "ko"
        ? "15MB 이하의 사진 파일을 선택해 주세요."
        : "15MB以下の画像を選んでください。",
    );
    return;
  }
  const generation = ++documentGeneration;
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    if (generation !== documentGeneration) {
      URL.revokeObjectURL(url);
      return;
    }
    if (documentState.photoUrl) URL.revokeObjectURL(documentState.photoUrl);
    documentState.photoUrl = url;
    documentState.sample = false;
    documentState.result = false;
    guideState.language = state.language;
    navigate("reader");
  } catch {
    URL.revokeObjectURL(url);
    if (generation === documentGeneration)
      toast(
        state.language === "ko"
          ? "이 사진을 열 수 없어요. JPG 또는 PNG로 다시 선택해 주세요."
          : "写真を開けません。JPGかPNGで選び直してください。",
      );
  }
}
$("document-camera").addEventListener("change", loadDocument);
$("document-upload").addEventListener("change", loadDocument);
$("help-dialog").addEventListener("click", (e) => {
  const district = e.target.closest("[data-chat-district]");
  if (district) {
    const id = district.dataset.chatDistrict;
    if (!id || Object.hasOwn(districts, id)) conversation.district = id;
    $("help-dialog").close();
    render();
    return;
  }
  const a = e.target.closest("[data-action]");
  if (a) handleAction(a.dataset.action);
  if (e.target === $("help-dialog")) {
    const r = e.target.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      e.target.close();
  }
});
try {
  const r = await fetch("../data/geumcheon-medication-claim.json", {
    cache: "no-store",
  });
  if (!r.ok) throw Error("unavailable");
  data = await r.json();
  if (
    data.steps?.length !== 5 ||
    !data.steps.every((s) =>
      ["ko", "ja"].every(
        (l) =>
          s.title?.[l] &&
          s.action?.[l] &&
          s.why?.[l] &&
          s.unblock?.[l] &&
          Array.isArray(s.details?.[l]),
      ),
    ) ||
    !data.source?.url?.startsWith("https://www.geumcheon.go.kr/")
  )
    throw Error("invalid dataset");
  readGuideRoute();
  render();
} catch {
  $("app").innerHTML =
    `<main class="main"><section class="panel empty-state"><h1>SeoulMate</h1><p role="alert">${texts.ko.loadError}</p><button type="button" class="primary" id="reload">다시 불러오기</button></section></main>`;
  $("reload").addEventListener("click", () => location.reload());
}
