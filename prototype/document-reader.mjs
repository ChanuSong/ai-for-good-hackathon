import { findGuide } from "./life-guides.mjs";
export const documentState = { photoUrl: "", sample: false, result: false };
const words = {
  ko: {
    eyebrow: "문서 촬영",
    title: "받은 문서,\n이해부터 다음 행동까지.",
    sub: "공문서·행정 안내문을 사진으로 가져오세요.",
    capture: "사진 촬영",
    album: "사진에서 선택",
    sample: "이사 안내문 열기",
    frame: "문서 전체가 보이게 촬영해 주세요",
    privacy: "사진은 이 화면에서만 사용해요.",
    language: "번역할 언어",
    replace: "다시 촬영",
    remove: "사진 삭제",
    review: "문서가 선명하게 보이나요?",
    analyze: "이사 안내 확인하기",
    notice: "현재 제공하는 안내: 이사 후 주소 변경",
    result: "문서 안내",
    summary: "이 문서는 무엇인가요?",
    who: "누가 확인해야 하나요?",
    when: "언제까지 해야 하나요?",
    translation: "쉬운 번역",
    actions: "다음 행동",
    docs: "준비할 자료",
    original: "원문 확인",
    photo: "내가 가져온 사진",
    photoNote: "사진 판독 결과가 아닌, 이사 절차에 관한 안내입니다.",
    help: "담당 창구",
    checklist: "체크리스트로 이어가기",
    sampleDoc: "이사 안내문",
    source: "공식 근거",
    retake: "다른 문서 촬영",
  },
  ja: {
    eyebrow: "文書を撮影",
    title: "届いた文書を、\n理解して次の行動へ。",
    sub: "公文書や行政の案内を写真で取り込めます。",
    capture: "写真を撮る",
    album: "写真から選ぶ",
    sample: "引っ越しの案内文を開く",
    frame: "文書全体が入るように撮ってください",
    privacy: "写真はこの画面でのみ使用します。",
    language: "翻訳する言語",
    replace: "撮り直す",
    remove: "写真を削除",
    review: "文字ははっきり見えますか？",
    analyze: "引っ越しの案内を確認",
    notice: "現在の案内：引っ越し後の住所変更",
    result: "文書の案内",
    summary: "どんな文書？",
    who: "誰が確認する？",
    when: "いつまでに？",
    translation: "やさしい翻訳",
    actions: "次の行動",
    docs: "準備する資料",
    original: "原文を確認",
    photo: "取り込んだ写真",
    photoNote: "写真の読み取り結果ではなく、住所変更の手続きの案内です。",
    help: "問い合わせ先",
    checklist: "チェックリストへ進む",
    sampleDoc: "住所変更の案内文",
    source: "公式資料",
    retake: "別の文書を撮影",
  },
  en: {
    result: "Document guide",
    summary: "What is this notice?",
    who: "Who should check it?",
    when: "By when?",
    translation: "Plain-language translation",
    actions: "Next steps",
    docs: "What to prepare",
    original: "View the Korean notice",
    photo: "Your photo",
    photoNote: "This is an address-change guide, not a reading of your photo.",
    help: "Contact",
    checklist: "Continue to the checklist",
    sampleDoc: "Address-change notice",
    source: "Official source",
    retake: "Capture another document",
  },
};
const content = {
  ko: {
    title: "이사 후 주소 변경신고 안내",
    summary:
      "이사한 뒤, 외국인등록 또는 국내거소신고의 주소를 바꾸라는 안내예요.",
    who: "한국에서 거주지를 옮긴 등록외국인·국내거소신고자",
    when: "등록외국인 15일 / 국내거소신고자 14일",
    translation:
      "새집으로 이사했다면 담당 기관에 새 주소를 알려주세요. 외국인등록증인지 국내거소신고증인지에 따라 신고 기한이 달라요. 신분증과 새 주소를 보여주는 자료를 준비하고, 관할 창구에 신고 방법을 확인하세요.",
  },
  ja: {
    title: "引っ越し後の住所変更の届出",
    summary:
      "引っ越し後に、外国人登録または国内居所申告の住所を変更するよう案内する文書です。",
    who: "韓国内で引っ越した登録外国人・国内居所申告者",
    when: "登録外国人15日 / 国内居所申告者14日",
    translation:
      "引っ越したら担当機関に新しい住所を知らせてください。外国人登録証か国内居所申告証かによって届出期限が異なります。身分証明書と新住所を証明する資料を準備し、担当窓口で手続き方法を確認しましょう。",
  },
  en: {
    title: "Report your address after moving",
    summary:
      "This notice asks you to update your foreign resident or domestic residence registration after moving.",
    who: "Registered foreign residents and domestic residence reporters who moved within Korea",
    when: "Registered foreign residents: 15 days / domestic residence reporters: 14 days",
    translation:
      "Tell the responsible authority your new address after moving. The deadline depends on which registration card you hold. Prepare identification and proof of your new address, then confirm how to report the change with the responsible office.",
  },
};
export const sampleNotice =
  "외국인 체류지 변경신고 안내\n\n외국인등록을 한 사람이 체류지를 변경한 경우 새로운 체류지로 전입한 날부터 15일 이내에 체류지 변경신고를 하여야 합니다.\n\n국내거소신고자는 거소 이전일로부터 14일 이내에 신고하여야 합니다.\n\n준비: 신분증, 체류지 입증 자료 등\n문의: 외국인종합안내센터 1345";
const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const languageSelect = (language) =>
  `<select id="reader-language">${Object.entries({
    ko: "한국어",
    ja: "日本語",
    en: "English",
  })
    .map(
      ([id, label]) =>
        `<option value="${id}" ${language === id ? "selected" : ""}>${label}</option>`,
    )
    .join("")}</select>`;
export function readerView(appLanguage, icon, language) {
  const u = words[appLanguage];
  if (documentState.result) {
    const l = words[language],
      c = content[language],
      g = findGuide("moving")[language],
      source = findGuide("moving").sources[0];
    return `<article class="document-result" lang="${language}"><span class="section-kicker">${l.result}</span><h1>${c.title}</h1><label class="reader-language">${u.language}${languageSelect(language)}</label>${documentState.photoUrl ? `<details class="photo-original"><summary>${l.photo}${icon("chevron")}</summary><img src="${documentState.photoUrl}" alt="${l.photo}"></details><p class="document-demo-note">${l.photoNote}</p>` : ""}<section class="document-summary-card"><span>${l.summary}</span><p>${c.summary}</p><dl><dt>${l.who}</dt><dd>${c.who}</dd><dt>${l.when}</dt><dd>${c.when}</dd></dl></section><section class="document-translation"><h2>${icon("globe")}${l.translation}</h2><p>${c.translation}</p></section><section class="document-action-list"><h2>${l.actions}</h2><ol>${g.steps.map((step, i) => `<li><span>0${i + 1}</span><p>${step}</p></li>`).join("")}</ol></section><details class="guide-details"><summary>${l.docs}${icon("chevron")}</summary><ul>${g.docs.map((doc) => `<li>${doc}</li>`).join("")}</ul></details><details class="guide-details"><summary>${l.original}${icon("chevron")}</summary><p class="notice-text" lang="ko">${escapeHTML(sampleNotice)}</p></details><a class="chat-source" href="${source.url}" target="_blank" rel="noopener noreferrer">${icon("shield")}<span>${source.title}<small>${l.source} · 2026.09.18</small></span>${icon("link")}</a><a class="document-contact" href="tel:1345">${icon("phone")}<span>${l.help}<strong>1345</strong></span>${icon("arrow")}</a><button class="primary full" data-action="read-sample">${l.checklist}${icon("arrow")}</button><button class="text-button full" data-action="document-reset">${l.retake}</button></article>`;
  }
  const hasDocument = documentState.photoUrl || documentState.sample;
  return `<div class="page-title"><span class="section-kicker">${u.eyebrow}</span><h1>${(hasDocument ? u.review : u.title).replace("\n", "<br>")}</h1>${hasDocument ? "" : `<p>${u.sub}</p>`}</div>${hasDocument ? `${documentState.photoUrl ? `<div class="document-photo"><img src="${documentState.photoUrl}" alt="${u.photo}"></div><div class="photo-controls"><button data-action="capture-document">${icon("camera")}${u.replace}</button><button data-action="document-reset">${u.remove}</button></div>` : `<div class="notice-preview"><span class="paper-label">${u.sampleDoc}</span><p class="notice-text">${escapeHTML(sampleNotice)}</p></div>`}<label class="reader-language">${u.language}${languageSelect(language)}</label><p class="document-demo-note">${u.notice}</p><button class="primary full" data-action="analyze-document">${u.analyze}${icon("spark")}</button>` : `<div class="capture-stage"><div class="capture-frame"><span>${icon("document")}</span><i></i><i></i><i></i><i></i></div><p>${u.frame}</p></div><button class="primary full" data-action="capture-document">${u.capture}${icon("camera")}</button><button class="secondary full photo-album" data-action="upload-document">${u.album}${icon("folder")}</button><button class="text-button full" data-action="document-sample">${u.sample}${icon("arrow")}</button>`}<p class="chat-privacy">${u.privacy}</p>`;
}
