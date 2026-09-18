// Public-source fixtures stand in for a future SeoulTalk knowledge export.
// No SeoulTalk API, remote model, or live translation is connected.
import { matchGuide } from "./life-guides.mjs";
export const replyLanguages = { ko: "한국어", ja: "日本語", en: "English" };
export const chatUI = {
  ko: {
    title: "서울 생활,\n편한 언어로 물어보세요.",
    subtitle: "서울 생활 안내",
    description: "궁금한 것부터, 다음에 할 일까지.",
    mode: "답변 언어",
    auto: "질문 언어로",
    placeholder: "편한 언어로 질문하세요",
    send: "보내기",
    clear: "새 대화",
    thinking: "안내를 확인하고 있어요",
    source: "공식 안내",
    original: "한국어 답변 보기",
    privacy: "개인정보 없이 질문해 주세요",
    about: "채팅 안내",
    disclosure:
      "공개된 공식 안내를 바탕으로 필요한 행동을 설명해요. 답변의 출처와 확인일을 함께 살펴보세요.",
    scope: "한국어·일본어·영어 / 생활 FAQ·약제비·공공시설 예약·통역 지원",
    followups: ["필요한 서류는?", "남은 지원금은 어디서 확인해요?"],
    examples: [
      "薬代の助成はどう申請しますか？",
      "How do I book a public facility?",
      "통역 지원을 받을 수 있나요?",
    ],
  },
  ja: {
    title: "ソウルの暮らしを、\nいつもの言葉で。",
    subtitle: "ソウル生活ガイド",
    description: "知りたいことから、次の手続きまで。",
    mode: "回答言語",
    auto: "質問の言語",
    placeholder: "使いやすい言語で質問してください",
    send: "送信",
    clear: "新しい会話",
    thinking: "案内を確認しています",
    source: "公式案内",
    original: "韓国語の回答を見る",
    privacy: "個人情報は入力しないでください",
    about: "チャットについて",
    disclosure:
      "公開された公式案内をもとに、必要な行動をご案内します。回答の出典と確認日もご確認ください。",
    scope: "韓国語・日本語・英語 / 生活FAQ・薬代・公共施設予約・通訳支援",
    followups: ["必要な書類は？", "助成の残額はどこで確認できますか？"],
    examples: [
      "薬代の助成はどう申請しますか？",
      "How do I book a public facility?",
      "通訳の支援はありますか？",
    ],
  },
};
const sources = {
  medication: {
    title: "금천구보건소 · 난임부부 시술비",
    url: "https://www.geumcheon.go.kr/health/contents.do?key=1487",
  },
  booking: {
    title: "서울시 · 공공서비스 예약",
    url: "https://news.seoul.go.kr/gov/archives/529543",
  },
  interpretation: {
    title: "MY SEOUL+ · 가족상담 및 통·번역",
    url: "https://global.seoul.go.kr/hmpg/cinf/mari/fcns/contPageDetail.do?conts_no=008CF59C26DA4F31B62C01F238DA0BDE",
  },
};
const records = {
  medication: {
    topic: "medication",
    source: sources.medication,
    action: "workflow",
    ko: {
      title: "금천구 약제비 청구는 이렇게 준비해요",
      body: "금천구의 시술 후 원외약 청구 안내예요. 먼저 이번 시술 회차의 지원 잔액을 확인하세요.\n방문·이메일·e보건소 경로가 안내되어 있어요. e보건소는 처음 시술비 지원을 e보건소로 신청한 경우에 이용할 수 있어요.\n청구 기한은 시술 완료 후 1개월 이내예요. 다른 지역이나 개인별 지원 가능 여부는 담당 기관에 확인해 주세요.",
      cta: "금천구 준비 절차 보기",
    },
    ja: {
      title: "衿川区の薬代請求を準備しましょう",
      body: "衿川区で治療後の院外処方薬代を請求する手続きの案内です。まず今回の治療回の助成残額を確認してください。\n窓口・メール・e保健所での請求が案内されています。e保健所は、最初の治療費助成を同サービスで申請した場合に利用できます。\n期限は治療終了後1か月以内です。他の地域や個別の助成可否は担当機関に確認してください。",
      cta: "衿川区の準備ステップを見る",
    },
    en: {
      title: "Prepare a medication claim in Geumcheon",
      body: "This guide covers medication prescribed outside the clinic after fertility treatment in Geumcheon. First, check the remaining support for this treatment cycle.\nThe guide lists in-person, email and e-Health Center claims. The e-Health Center route is available if you originally applied for treatment support there.\nClaim within one month of completing treatment. Confirm individual eligibility and rules for other districts with the responsible office.",
      cta: "View Geumcheon preparation steps",
    },
  },
  documents: {
    topic: "medication",
    source: sources.medication,
    action: "workflow",
    ko: {
      title: "금천구 기준, 서류 네 묶음이에요",
      body: "1. 시술비 청구서(신청인용)\n2. 체외수정 또는 인공수정 시술확인서 사본\n3. 원외약 처방전과 약제별 금액이 적힌 영수증\n4. 본인 명의 통장 사본\n개인 상황에 따른 추가 서류는 제출 전에 보건소에 확인하세요.",
      cta: "준비 절차와 서류 확인",
    },
    ja: {
      title: "衿川区では4種類の書類を準備します",
      body: "1. 治療費請求書（申請者用）\n2. 体外受精または人工授精の治療確認書コピー\n3. 院外処方箋と薬剤別の金額を記載した領収書\n4. 本人名義の通帳コピー\n個別事情による追加書類は、提出前に保健所へ確認してください。",
      cta: "準備ステップと書類を確認",
    },
    en: {
      title: "Four document groups for Geumcheon",
      body: "1. Treatment-cost claim form for the applicant\n2. Copy of the IVF or artificial insemination treatment confirmation\n3. Outside-clinic prescription and receipt showing each medication’s cost\n4. Copy of a bankbook in your name\nCheck with the health center for any additional documents before submitting.",
      cta: "Review steps and documents",
    },
  },
  balance: {
    topic: "medication",
    source: sources.medication,
    action: "phone",
    ko: {
      title: "개인별 잔액은 담당 창구에서 확인해요",
      body: "SeoulMate에서는 지원 잔액을 조회할 수 없어요. 금천아이맘건강센터 02-2627-2643에 확인 방법을 문의해 주세요.\n“이번 시술 회차의 약제비 청구 가능 잔액을 어디에서 확인할 수 있나요?”라고 물어보면 돼요.",
      cta: "담당 창구에 전화하기",
    },
    ja: {
      title: "個人の残額は担当窓口で確認します",
      body: "SeoulMateでは助成残額を照会できません。衿川アイマム健康センター（02-2627-2643）へ確認方法をお問い合わせください。\n「今回の治療回で薬代請求に使える残額はどこで確認できますか？」と質問できます。",
      cta: "担当窓口に電話する",
    },
    en: {
      title: "Check your balance with the responsible office",
      body: "SeoulMate cannot look up your personal support balance. Ask Geumcheon i-Mom Health Center at 02-2627-2643 how to check it.\nYou can ask: “Where can I check the remaining support available for medication claims in this treatment cycle?”",
      cta: "Call the responsible office",
    },
  },
  booking: {
    topic: "booking",
    source: sources.booking,
    action: "booking",
    ko: {
      title: "서울시 공공서비스예약에서 시작해요",
      body: "체육시설·회의실·문화행사·교육 등의 예약 정보를 한곳에서 찾아볼 수 있어요.\n원하는 시설이나 프로그램을 검색한 뒤 해당 상세 안내에서 신청 조건과 일정을 확인하세요. 여기서는 실시간 빈자리 조회나 예약 접수를 하지 않아요.",
      cta: "공공서비스예약 열기",
    },
    ja: {
      title: "ソウル市の公共サービス予約へ",
      body: "スポーツ施設・会議室・文化イベント・講座などの予約情報を探せます。\n希望の施設やプログラムを検索し、詳細案内で申込条件と日程を確認してください。ここではリアルタイムの空き状況照会や予約受付はできません。",
      cta: "公共サービス予約を開く",
    },
    en: {
      title: "Start with Seoul Public Service Reservation",
      body: "Find booking information for sports facilities, meeting rooms, cultural events and classes.\nSearch for a facility or program, then check its application conditions and schedule on the detail page. Check availability and complete your reservation on the official website.",
      cta: "Open public service reservations",
    },
  },
  interpretation: {
    topic: "interpretation",
    source: sources.interpretation,
    action: "interpretation",
    ko: {
      title: "통역·상담 지원 창구를 찾아보세요",
      body: "MY SEOUL+의 가족상담 및 통·번역 안내에서 가족센터 등 지원기관을 찾을 수 있어요.\n이용 대상·지원 언어·예약 가능 여부는 해당 기관에 확인해 주세요. 이 채팅에서 통역을 배정하거나 상담을 예약하지는 않아요.",
      cta: "MY SEOUL+ 지원 안내 열기",
    },
    ja: {
      title: "通訳・相談の窓口を探せます",
      body: "MY SEOUL+の家族相談・通訳翻訳の案内から、家族センターなどの支援機関を探せます。\n利用対象・対応言語・予約可否は各機関に確認してください。このチャットで通訳の手配や相談予約は行いません。",
      cta: "MY SEOUL+の支援案内を開く",
    },
    en: {
      title: "Find interpreting and counseling support",
      body: "The family counseling and interpretation guide on MY SEOUL+ helps you find support organizations such as family centers.\nConfirm eligibility, supported languages and appointment availability with the organization. This chat does not assign an interpreter or book a consultation.",
      cta: "Open the MY SEOUL+ support guide",
    },
  },
  fallback: {
    topic: null,
    ko: {
      title: "이 질문은 아직 안내하기 어려워요",
      body: "이사·퇴직금 등 생활 FAQ, 금천구 약제비, 공공시설 예약, 통역 지원을 질문할 수 있어요. 어떤 안내가 필요한지 알려주세요.",
    },
    ja: {
      title: "この質問はまだご案内できません",
      body: "引っ越し・退職金などの生活FAQ、衿川区の薬代請求、公共施設予約、通訳支援について質問できます。必要な案内を教えてください。",
    },
    en: {
      title: "I don’t have a verified answer for this yet",
      body: "You can ask about moving, severance pay and other life FAQs, Geumcheon medication claims, public facility reservations or interpreting support. Which guide do you need?",
    },
  },
};
export function detectLanguage(question, fallback = "ko") {
  if (/[ぁ-んァ-ヶ]/u.test(question)) return "ja";
  if (/[가-힣]/u.test(question)) return "ko";
  if (/[a-z]/i.test(question)) return "en";
  return fallback;
}
export function createReply(
  question,
  { mode = "auto", appLanguage = "ko", context = null } = {},
) {
  const fallbackLanguage = Object.hasOwn(replyLanguages, appLanguage)
    ? appLanguage
    : "ko";
  const language = Object.hasOwn(replyLanguages, mode)
    ? mode
    : detectLanguage(question, fallbackLanguage);
  const guide = matchGuide(question);
  if (guide) {
    const content = guide[language];
    const body = `${content.answer}\n${content.deadline}\n${content.caution}`;
    return {
      key: guide.id,
      language,
      topic: guide.id,
      title: content.title,
      body,
      source: guide.sources[0],
      action: `guide:${guide.id}`,
      cta: {
        ko: "내가 할 일 확인하기",
        ja: "次の行動を確認",
        en: "See what to do next",
      }[language],
      korean: {
        title: guide.ko.title,
        body: `${guide.ko.answer}\n${guide.ko.deadline}\n${guide.ko.caution}`,
      },
      checkedAt: "2026-09-18",
    };
  }
  const medication =
    /약제비|약값|원외약|난임|薬代|薬剤|不妊|medication|fertility|ivf/i.test(
      question,
    );
  let key = "fallback";
  if (
    /통역|번역\s*지원|通訳|翻訳支援|interpret|translation support/i.test(
      question,
    )
  )
    key = "interpretation";
  else if (
    /공공.*예약|시설.*예약|체육|公共|施設|予約|public facility|facilit|reservation|\bbook\b/i.test(
      question,
    )
  )
    key = "booking";
  else if (medication || context === "medication") {
    if (/잔액|남은|残額|残り|balance|remaining/i.test(question))
      key = "balance";
    else if (/서류|書類|document|paperwork/i.test(question)) key = "documents";
    else if (medication) key = "medication";
  }
  const record = records[key];
  return {
    key,
    language,
    topic: record.topic,
    ...record[language],
    source: record.source,
    action: record.action,
    korean: record.ko,
    checkedAt: record.source ? "2026-09-18" : null,
  };
}
export const chatActionUrls = {
  phone: "tel:0226272643",
  booking: "https://yeyak.seoul.go.kr/",
  interpretation: sources.interpretation.url,
};
