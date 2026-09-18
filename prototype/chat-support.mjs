import { findGuide } from "./life-guides.mjs";
export const districts = {
  geumcheon: {
    ko: "금천구",
    ja: "衿川区",
    en: "Geumcheon-gu",
    url: "https://www.geumcheon.go.kr/",
  },
  mapo: {
    ko: "마포구",
    ja: "麻浦区",
    en: "Mapo-gu",
    url: "https://www.mapo.go.kr/",
  },
  gangnam: {
    ko: "강남구",
    ja: "江南区",
    en: "Gangnam-gu",
    url: "https://www.gangnam.go.kr/",
  },
};
export const answerLabels = {
  ko: {
    terms: "어려운 말, 쉽게",
    next: "지금 할 일",
    local: "내 지역에서 확인하기",
    selected: "직접 선택한 지역",
    source: "공식 근거",
    original: "한국어 답변",
    choose: "지역을 선택하면 문의처도 안내해요",
    office: "구청 안내 보기",
    termNote: "공식 용어는 창구에서도 그대로 사용할 수 있어요.",
  },
  ja: {
    terms: "難しい言葉を、やさしく",
    next: "今すること",
    local: "自分の地域で確認",
    selected: "自分で選んだ地域",
    source: "公式資料",
    original: "韓国語の回答",
    choose: "地域を選ぶと相談先もご案内できます",
    office: "区役所の案内を見る",
    termNote: "韓国語の正式名称は窓口でも使えます。",
  },
  en: {
    terms: "In plain language",
    next: "What to do next",
    local: "Check in your area",
    selected: "Area you selected",
    source: "Official sources",
    original: "Korean answer",
    choose: "Choose your area to find the right office",
    office: "Open district office guide",
    termNote: "Keep the Korean term handy when speaking to the office.",
  },
};
const glossary = {
  address: {
    name: "체류지 변경신고",
    ko: [
      "이사한 주소 알리기",
      "외국인등록에 적힌 주소가 바뀌었다고 관할 기관에 알려주는 절차예요.",
    ],
    ja: [
      "引っ越した住所の届出",
      "外国人登録に記載された住所が変わったことを、担当機関に知らせる手続きです。",
    ],
    en: [
      "Reporting your new address",
      "Telling the responsible authority that the address on your foreign resident registration has changed.",
    ],
  },
  residence: {
    name: "국내거소신고",
    ko: [
      "재외동포의 국내 거주지 신고",
      "해당 재외동포가 한국에서 사는 곳을 신고하는 제도예요. 일반 외국인등록과는 별개라 기한도 구분해요.",
    ],
    ja: [
      "在外同胞の国内住所の申告",
      "対象となる在外同胞が韓国で暮らす住所を申告する制度です。通常の外国人登録とは異なり、期限も区別します。",
    ],
    en: [
      "Domestic residence registration",
      "A separate residence registration system for eligible overseas Koreans. Its reporting deadline differs from regular foreign resident registration.",
    ],
  },
  hours: {
    name: "소정근로시간",
    ko: [
      "계약에서 약속한 근무시간",
      "회사와 미리 정한 근무시간이에요. 실제로 추가 근무한 모든 시간을 뜻하는 것은 아니에요.",
    ],
    ja: [
      "契約で決めた労働時間",
      "会社とあらかじめ約束した勤務時間です。追加で働いたすべての時間を指すわけではありません。",
    ],
    en: [
      "Your contracted working hours",
      "The hours you agreed to work with your employer—not simply every hour of extra work you performed.",
    ],
  },
  severance: {
    name: "퇴직금",
    ko: [
      "일을 그만둘 때 받는 퇴직급여",
      "일정한 근로 요건을 충족하면 받는 급여예요. 마지막 월급과는 구분해서 확인해요.",
    ],
    ja: [
      "退職時の給付",
      "一定の勤務条件を満たした場合に受け取る給付です。最後の月給とは分けて確認します。",
    ],
    en: [
      "Severance pay",
      "A payment when employment ends if the work requirements are met. Check it separately from your final salary.",
    ],
  },
  complaint: {
    name: "진정",
    ko: [
      "기관에 조사와 처리를 요청하기",
      "임금 미지급 같은 문제를 노동관서에 알리고 확인해 달라고 요청하는 절차예요.",
    ],
    ja: [
      "労働当局への申立て",
      "賃金未払いなどの問題を労働当局に伝え、調査や対応を求める手続きです。",
    ],
    en: [
      "Filing a labor complaint",
      "Asking the labor authority to examine and address a problem such as unpaid wages.",
    ],
  },
  status: {
    name: "체류자격",
    ko: [
      "한국에 머물며 할 수 있는 활동의 범위",
      "유학·취업 등 체류 목적에 따른 자격이에요. 자격마다 일할 수 있는 조건이 달라요.",
    ],
    ja: [
      "韓国で滞在・活動できる資格",
      "留学や就労などの目的に応じた資格です。働ける条件は資格ごとに異なります。",
    ],
    en: [
      "Status of stay",
      "Your permission to stay for a purpose such as study or work. Work conditions depend on this status.",
    ],
  },
  prescription: {
    name: "원외처방",
    ko: [
      "병원 밖 약국에서 받는 처방약",
      "병원에서 처방전을 받고, 병원 밖 약국에서 약을 구입하는 경우를 말해요.",
    ],
    ja: [
      "病院の外の薬局で受け取る処方薬",
      "病院でもらった処方箋を使って、院外の薬局で薬を購入することです。",
    ],
    en: [
      "An outside-clinic prescription",
      "Medicine you buy at a pharmacy outside the clinic using a prescription from your medical provider.",
    ],
  },
  balance: {
    name: "지원 잔액",
    ko: [
      "이번 시술 회차에 남은 지원 한도",
      "통장 잔액이 아니라, 해당 시술 회차에서 아직 사용하지 않은 지원 금액이에요.",
    ],
    ja: [
      "今回の治療回で残っている助成枠",
      "銀行口座の残高ではなく、その治療回でまだ使っていない助成金額です。",
    ],
    en: [
      "Remaining support for this treatment cycle",
      "The support amount not yet used for this treatment cycle—not the balance in your bank account.",
    ],
  },
};
const topicTerms = {
  moving: ["address", "residence"],
  severance: ["severance", "hours"],
  unpaid: ["complaint"],
  "job-change": ["status"],
  visa: ["status"],
  medication: ["prescription", "balance"],
};
export function enrichReply(reply, districtId) {
  const district = districts[districtId],
    language = reply.language;
  const guide = findGuide(reply.key);
  const result = {
    ...reply,
    sources: guide?.sources || (reply.source ? [reply.source] : []),
    terms: (topicTerms[reply.topic] || []).map((id) => ({
      name: glossary[id].name,
      title: glossary[id][language][0],
      description: glossary[id][language][1],
    })),
    steps: guide?.[language].steps || [],
    location: null,
  };
  if (!reply.topic) return result;
  if (!district) {
    result.needsLocation = ["moving", "medication", "interpretation"].includes(
      reply.topic,
    );
    return result;
  }
  const isWork = ["severance", "unpaid"].includes(reply.topic);
  const isImmigration = ["job-change", "visa"].includes(reply.topic);
  const note = isWork
    ? {
        ko: "노동 문제의 관할은 거주지보다 사업장 소재지가 중요해요. 근무한 곳을 기준으로 1350에 문의하세요.",
        ja: "労働問題の管轄は住まいより勤務先の所在地が重要です。勤務先を基準に1350へ確認してください。",
        en: "For labor issues, the workplace location matters more than your home address. Ask 1350 using your workplace location.",
      }
    : isImmigration
      ? {
          ko: "체류자격·연장 문의는 1345에서 관할 출입국기관과 필요한 절차를 확인하세요.",
          ja: "在留資格・延長は1345で管轄の出入国機関と必要な手続きを確認してください。",
          en: "For status or extension questions, ask 1345 which immigration office and process apply.",
        }
      : {
          ko: `${district.ko}의 공식 안내에서 해당 창구를 찾아보세요. 주소 변경은 새 주소 관할 주민센터와 1345에 확인할 수 있어요.`,
          ja: `${district.ja}の公式案内で担当窓口を確認できます。住所変更は新住所の住民センターや1345に確認してください。`,
          en: `Use the ${district.en} official guide to find the responsible office. For an address change, check the community center for your new address or ask 1345.`,
        };
  result.location = {
    district: district[language],
    note: note[language],
    url: isWork ? "tel:1350" : isImmigration ? "tel:1345" : district.url,
    label: isWork
      ? "1350"
      : isImmigration
        ? "1345"
        : answerLabels[language].office,
  };
  if (reply.topic === "medication" && districtId !== "geumcheon") {
    const content = {
      ko: {
        title: `${district.ko}의 약제비 안내를 먼저 확인해요`,
        body: "준비된 약제비 자료는 금천구 기준이에요. 다른 자치구의 청구 경로·기한에 그대로 적용할 수는 없어요.\n거주지 보건소에 약제비 청구 담당 창구와 필요한 서류를 확인해 주세요.",
      },
      ja: {
        title: `${district.ja}の薬代の案内を先に確認しましょう`,
        body: "用意した薬代の資料は衿川区のものです。他の区の請求方法・期限にそのまま適用できません。\nお住まいの保健所に担当窓口と必要書類を確認してください。",
      },
      en: {
        title: `Check the medication guide for ${district.en}`,
        body: "The prepared medication example is for Geumcheon. Its claim route and deadline cannot simply be applied to another district.\nAsk the health center where you live for the responsible desk and required documents.",
      },
    };
    Object.assign(result, content[language], {
      korean: content.ko,
      action: undefined,
      source: undefined,
      sources: [],
      steps: [],
      checkedAt: null,
    });
    result.location.note = {
      ko: "선택한 지역의 구청 안내에서 보건소 문의처를 확인하세요.",
      ja: "選択した区の公式案内で保健所の問い合わせ先を確認してください。",
      en: "Use your selected district’s official guide to find its health center contact.",
    }[language];
  } else if (reply.topic === "medication") {
    result.location.note = {
      ko: "금천아이맘건강센터에서 잔액 확인 방법과 청구 경로를 문의하세요.",
      ja: "衿川アイマム健康センターで残額の確認方法と請求方法をお問い合わせください。",
      en: "Ask Geumcheon i-Mom Health Center how to check your balance and claim route.",
    }[language];
    result.location.url = "tel:0226272643";
    result.location.label = "02-2627-2643";
  } else if (reply.topic === "interpretation") {
    result.location.note = {
      ko: "거주 지역에서 이용할 수 있는 가족센터를 찾고, 지원 언어와 이용 대상을 확인하세요.",
      ja: "住んでいる地域で利用できる家族センターを探し、対応言語と利用対象を確認してください。",
      en: "Find a family center serving your area and confirm supported languages and eligibility.",
    }[language];
    result.location.url = reply.source.url;
  }
  return result;
}
