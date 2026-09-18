import qrcode from "./vendor/qrcode.mjs";
import { lifeGuides, findGuide, guideUI } from "./life-guides.mjs";
export const guideState = {
  id: "moving",
  language: "ko",
  category: "all",
  checked: new Map(),
  qrReady: false,
};
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const languages = { ko: "한국어", ja: "日本語", en: "English" };
const languageSelect = (id, language) =>
  `<select id="${id}">${Object.entries(languages)
    .map(
      ([v, l]) =>
        `<option value="${v}" ${v === language ? "selected" : ""}>${l}</option>`,
    )
    .join("")}</select>`;
export function homeTools(language, icon) {
  const u = guideUI[language];
  return `<div class="home-tools">${[
    ["faq", "chat", u.faqShort],
    ["reader", "camera", u.scanShort],
    ["qr", "qr", u.qrShort],
  ]
    .map(
      ([view, symbol, title]) =>
        `<button data-action="open-${view}"><span>${icon(symbol)}</span>${title}</button>`,
    )
    .join("")}</div>`;
}
export function faqView(language, icon) {
  const u = guideUI[language];
  return `<div class="page-title"><span class="section-kicker">FAQ</span><h1>${u.title.replace("\n", "<br>")}</h1><p>${u.sub}</p></div><div class="faq-filters">${["all", "living", "work", "stay"].map((id) => `<button data-faq-filter="${id}" aria-pressed="${guideState.category === id}">${u[id]}</button>`).join("")}</div><div class="faq-list">${lifeGuides
    .filter(
      (g) =>
        guideState.category === "all" || g.category === guideState.category,
    )
    .map(
      (g) =>
        `<button class="faq-card" data-guide="${g.id}"><span class="faq-symbol">${icon(g.icon)}</span><span><small>${g[language].short}</small><strong>${g[language].title}</strong></span>${icon("chevron")}</button>`,
    )
    .join("")}</div>`;
}
export function guideView(icon) {
  const g = findGuide(guideState.id),
    language = guideState.language,
    c = g[language],
    u = guideUI[language];
  const checked = guideState.checked.get(g.id) || new Set();
  return `<article class="resident-guide" lang="${language}"><div class="guide-topline"><button class="back-button" data-action="open-faq" aria-label="${u.back}">${icon("chevron")}</button><label class="guide-language"><span class="sr-only">${u.language}</span>${icon("globe")}${languageSelect("guide-language", language)}</label><button class="icon-button" data-action="open-qr" aria-label="${u.share}">${icon("qr")}</button></div><span class="section-kicker">${c.short}</span><h1>${c.title}</h1><p class="guide-answer">${c.answer}</p><div class="guide-deadline">${icon("info")}<strong>${c.deadline}</strong></div><p class="guide-caution">${c.caution}</p><h2>${u.next}</h2><div class="guide-checklist">${c.steps.map((step, i) => `<label><input type="checkbox" data-guide-check="${i}" ${checked.has(i) ? "checked" : ""}><span><small>0${i + 1}</small>${step}</span></label>`).join("")}</div><p class="guide-check-note">${u.note}</p><details class="guide-details"><summary>${u.docs}${icon("chevron")}</summary><ul>${c.docs.map((doc) => `<li>${doc}</li>`).join("")}</ul></details>${language !== "ko" ? `<details class="guide-details"><summary>${u.original}${icon("chevron")}</summary><p lang="ko">${g.ko.answer}<br><br>${g.ko.deadline}<br>${g.ko.caution}</p></details>` : ""}<div class="guide-sources"><small>${u.checked}</small>${g.sources.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${icon("shield")}<span>${esc(s.title)}</span>${icon("link")}</a>`).join("")}</div><div class="guide-contact">${g.phone ? `<a href="tel:${g.phone}">${icon("phone")}<span>${u.phone}<strong>${g.phone}</strong></span>${icon("arrow")}</a>` : ""}<button class="primary full" data-action="guide-chat">${u.ask}${icon("chat")}</button></div></article>`;
}
export function makeGuideLink(
  base,
  id = guideState.id,
  language = guideState.language,
) {
  const url = new URL("./index.html", base);
  url.search = "";
  url.hash = new URLSearchParams({ guide: id, lang: language }).toString();
  return url.href;
}
export function makeQR(url) {
  const code = qrcode(0, "M");
  code.addData(url, "Byte");
  code.make();
  return code.createSvgTag({
    cellSize: 6,
    margin: 24,
    scalable: true,
    alt: "SeoulMate guide QR",
  });
}
export function qrView(language, icon, base) {
  const u = guideUI[language],
    g = findGuide(guideState.id),
    c = g[guideState.language];
  const link = makeGuideLink(base),
    local = ["localhost", "127.0.0.1", "[::1]"].includes(
      new URL(base).hostname,
    );
  return `${guideState.qrReady ? `<div class="qr-result-heading"><span class="section-kicker">${u.qrBadge}</span><h1>${language === "ko" ? "QR이 준비됐어요" : "QRができました"}</h1></div>` : `<div class="page-title"><span class="section-kicker">${u.qrBadge}</span><h1>${u.qrTitle.replace("\n", "<br>")}</h1><p>${u.qrSub}</p></div>`}<div class="qr-config"><label>${u.select}<select id="qr-guide">${lifeGuides.map((g) => `<option value="${g.id}" ${g.id === guideState.id ? "selected" : ""}>${g[language].short}</option>`).join("")}</select></label><label>${u.language}${languageSelect("qr-language", guideState.language)}</label></div>${!guideState.qrReady ? `<div class="notice-preview"><span class="paper-label">SeoulMate · ${u.sample}</span><h2>${g.ko.short} 안내</h2><p>${g.ko.answer}</p><div class="paper-rule"></div><p>${g.ko.deadline}</p><small>${g.sources[0].title}</small></div><button class="primary full" data-action="generate-qr">${u.generate}${icon("qr")}</button>` : `<div class="qr-card"><span class="qr-brand">SeoulMate<span></span></span><h2>${esc(c.short)}</h2><p>${u.scan}</p><div class="qr-image">${makeQR(link)}</div><span class="qr-languages">한국어 · 日本語 · English</span><small>${esc(link)}</small></div><div class="qr-actions"><button class="secondary" data-action="copy-qr">${icon("copy")}${u.copy}</button><button class="secondary" data-action="download-qr">${icon("document")}${u.download}</button></div><button class="primary full" data-action="preview-qr">${u.preview}${icon("arrow")}</button><p class="inline-note">${local ? u.local : u.qrNote}</p>`}`;
}
