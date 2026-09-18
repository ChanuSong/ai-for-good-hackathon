// Curated examples for the recording demo, not individual legal decisions.
export const guideUI = {
  ko: {
    faq: "자주 묻는 질문",
    title: "서울 생활의\n헷갈리는 순간들",
    sub: "내 상황에 맞는 다음 행동을 확인해요.",
    all: "전체",
    living: "생활",
    work: "직장",
    stay: "체류",
    next: "지금 할 일",
    docs: "준비할 자료",
    source: "공식 근거",
    checked: "자료 확인 · 2026.09.18",
    ask: "채팅으로 물어보기",
    share: "안내 QR",
    back: "뒤로",
    language: "안내 언어",
    done: "준비 확인",
    note: "체크는 준비 상태이며, 기관에 신고·접수되지 않습니다.",
    phone: "상담 창구",
    original: "한국어 안내 보기",
    qrTitle: "공문 한 장에서,\n내 언어의 안내로.",
    qrSub: "안내문에 붙일 QR을 만들어 보세요.",
    select: "안내 선택",
    generate: "QR 만들기",
    copy: "링크 복사",
    download: "QR 저장",
    preview: "주민 화면 열기",
    scan: "스캔해서 편한 언어로 읽어보세요",
    qrNote: "안내 ID와 언어만 담아요. 개인정보는 포함하지 않아요.",
    local:
      "현재 QR은 로컬 주소입니다. 다른 기기에서 열려면 공개 배포 주소가 필요합니다.",
    reader: "문서 읽기",
    readTitle: "어려운 안내문,\n할 일로 바꿔드려요.",
    sample: "샘플 공문 · 체험",
    read: "쉬운 안내로 보기",
    readNote: "이 체험은 준비된 공문 예시를 사용해요.",
    qrBadge: "안내 QR · 체험",
    faqShort: "생활 FAQ",
    qrShort: "공문 QR",
    scanShort: "문서 촬영",
  },
  ja: {
    faq: "よくある質問",
    title: "ソウルの暮らしで\n迷ったときに",
    sub: "状況に合う次の行動を確認しましょう。",
    all: "すべて",
    living: "生活",
    work: "仕事",
    stay: "在留",
    next: "今すること",
    docs: "準備する資料",
    source: "公式資料",
    checked: "資料確認 · 2026.09.18",
    ask: "チャットで質問",
    share: "案内QR",
    back: "戻る",
    language: "案内の言語",
    done: "準備確認",
    note: "チェックは準備状況です。機関への届出・申請にはなりません。",
    phone: "相談窓口",
    original: "韓国語の案内を見る",
    qrTitle: "一枚の案内から、\n自分の言葉へ。",
    qrSub: "案内文に貼るQRを作ってみましょう。",
    select: "案内を選択",
    generate: "QRを作る",
    copy: "リンクをコピー",
    download: "QRを保存",
    preview: "住民向け画面を開く",
    scan: "スキャンして使いやすい言語で読めます",
    qrNote: "案内IDと言語のみを含みます。個人情報は含みません。",
    local: "このQRはローカルURLです。他の端末には公開URLが必要です。",
    reader: "文書を読む",
    readTitle: "難しい案内文を、\n次の行動に。",
    sample: "サンプル文書 · デモ",
    read: "やさしい案内を見る",
    readNote: "このデモは用意した文書例を使用します。",
    qrBadge: "案内QR · デモ",
    faqShort: "生活FAQ",
    qrShort: "案内QR",
    scanShort: "文書を撮影",
  },
  en: {
    next: "What to do next",
    docs: "What to prepare",
    source: "Official sources",
    checked: "Sources checked · 2026.09.18",
    ask: "Ask in chat",
    share: "Guide QR",
    back: "Back",
    language: "Guide language",
    done: "Prepared",
    note: "Checks record preparation only. Nothing is submitted to an authority.",
    phone: "Contact",
    original: "View Korean guide",
  },
};
const immigration = {
  title: "법무부 · 외국인 업무 지침",
  url: "https://www.moj.go.kr/bbs/immigration/47/465762/download.do",
};
const labor = {
  title: "고용노동부 · 퇴직급여 안내",
  url: "https://www.moel.go.kr/news/cardinfo/view.do?bbs_seq=20191201000",
};
const wages = {
  title: "고용노동부 · 노동포털",
  url: "https://labor.moel.go.kr/minwonApply/minwonFormat.do?searchVal=SN001",
};
export const lifeGuides = [
  {
    id: "moving",
    category: "living",
    icon: "home",
    phone: "1345",
    sources: [immigration],
    ko: {
      title: "이사했는데, 전입신고만 하면 되나요?",
      short: "이사 · 주소 변경",
      answer:
        "외국인등록을 했다면 체류지 변경신고를 확인하세요. 한국인 가족의 전입신고만으로 내 신고도 끝났다고 생각하면 안 돼요.",
      deadline: "등록외국인 15일 · 국내거소신고자 14일",
      caution:
        "새 주소로 전입한 날을 기준으로 합니다. 외국인등록과 국내거소신고는 기한이 달라요.",
      steps: [
        "내 신분증이 외국인등록증인지 국내거소신고증인지 확인",
        "이사한 날짜와 새 주소를 확인",
        "주민센터·관할 출입국기관 또는 하이코리아에서 신고 경로 확인",
      ],
      docs: [
        "여권·외국인등록증 또는 국내거소신고증",
        "임대차계약서 등 거주지 입증 자료",
      ],
      question: "이사했어요. 체류지 변경신고는 어떻게 하나요?",
    },
    ja: {
      title: "引っ越し後、転入届だけで大丈夫？",
      short: "引っ越し・住所変更",
      answer:
        "外国人登録をしている場合は在留地変更の届出を確認しましょう。韓国人家族の転入届だけで、自分の届出も済んだと思わないようにしてください。",
      deadline: "登録外国人15日・国内居所申告者14日",
      caution:
        "新住所への転入日が基準です。外国人登録と国内居所申告では期限が異なります。",
      steps: [
        "外国人登録証か国内居所申告証かを確認",
        "引っ越した日と新住所を確認",
        "住民センター・出入国機関・Hi Koreaで届出方法を確認",
      ],
      docs: [
        "旅券・外国人登録証または国内居所申告証",
        "賃貸契約書など住所を証明する資料",
      ],
      question: "引っ越しました。住所変更はどう届け出ますか？",
    },
    en: {
      title: "I moved. Is my family’s address report enough?",
      short: "Moving · address change",
      answer:
        "If you are a registered foreign resident, check your own change-of-residence reporting duty. Do not assume a Korean family member’s report also completes yours.",
      deadline:
        "Registered foreign residents: 15 days · domestic residence reporters: 14 days",
      caution:
        "Count from moving into the new address. The two registration systems have different deadlines.",
      steps: [
        "Check which registration card you hold",
        "Confirm your moving date and new address",
        "Check the reporting route with a community center, immigration office or Hi Korea",
      ],
      docs: [
        "Passport and foreign resident or domestic residence card",
        "Proof of residence, such as a rental agreement",
      ],
      question: "I moved. How do I report my new address?",
    },
  },
  {
    id: "severance",
    category: "work",
    icon: "document",
    phone: "1350",
    sources: [
      labor,
      {
        title: "고용24 · 외국인근로자 전용보험",
        url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000338&systCnntId=CI00002054&systId=SI00000362",
      },
    ],
    ko: {
      title: "외국인도 퇴직금을 받을 수 있나요?",
      short: "퇴직금",
      answer:
        "외국인이라는 이유만으로 제외되지는 않아요. 근로자에 해당하고 계속근로 1년 이상, 4주 평균 주 소정근로시간 15시간 이상 등의 요건을 확인해야 해요.",
      deadline: "일반적인 지급 원칙: 퇴직 후 14일 이내",
      caution:
        "특별한 사정에 따른 지급기일 연장 합의나 출국만기보험 적용 여부에 따라 지급 경로·시점이 달라질 수 있어요. 개인별 금액은 여기서 확정하지 않아요.",
      steps: [
        "입사·퇴사일과 계약상 근로시간 확인",
        "급여명세서와 근로계약서 준비",
        "회사에 지급 내역을 요청하고, 불명확하면 1350 상담",
      ],
      docs: ["근로계약서·급여명세서", "입사일·퇴사일, 임금 입금 내역"],
      question: "외국인도 퇴직금을 받을 수 있나요?",
    },
    ja: {
      title: "外国人も退職金をもらえますか？",
      short: "退職金",
      answer:
        "外国人という理由だけで除外されません。労働者に該当し、継続勤務1年以上、4週平均の週所定労働時間15時間以上などの条件を確認します。",
      deadline: "一般的な支払原則：退職後14日以内",
      caution:
        "特別な事情による期限延長の合意や出国満期保険の適用で、支払方法・時期が異なる場合があります。個人の金額はここでは確定しません。",
      steps: [
        "入社・退職日と契約上の労働時間を確認",
        "給与明細と雇用契約書を準備",
        "会社に支払内容を確認し、不明なら1350に相談",
      ],
      docs: ["雇用契約書・給与明細", "入社・退職日、給与入金記録"],
      question: "外国人も退職金をもらえますか？",
    },
    en: {
      title: "Can foreign workers receive severance pay?",
      short: "Severance pay",
      answer:
        "Foreign nationality alone does not exclude you. Check employee status, at least one year of continuous service, and at least 15 contractual hours per week averaged over four weeks.",
      deadline: "General payment rule: within 14 days of leaving",
      caution:
        "An agreed extension for special circumstances or departure guarantee insurance may affect timing and payment route. This guide does not determine your personal amount.",
      steps: [
        "Confirm employment dates and contracted working hours",
        "Prepare payslips and your employment contract",
        "Ask your employer for payment details; contact 1350 if unclear",
      ],
      docs: [
        "Employment contract and payslips",
        "Employment dates and wage deposit records",
      ],
      question: "Can foreign workers receive severance pay?",
    },
  },
  {
    id: "unpaid",
    category: "work",
    icon: "document",
    phone: "1350",
    sources: [wages],
    ko: {
      title: "월급을 못 받았어요. 어디에 말하나요?",
      short: "임금 체불",
      answer:
        "미지급 기간과 금액을 정리해 고용노동부 상담 또는 노동포털의 임금체불 진정 경로를 확인하세요.",
      deadline: "미지급 내역부터 정리",
      caution:
        "상담과 진정 접수는 다릅니다. 여기서 확인한 것으로 신고가 접수되지는 않아요.",
      steps: [
        "약속된 지급일과 실제 받은 금액을 비교",
        "계약서·급여명세·입금 내역 등 증거 정리",
        "1350 상담 또는 노동포털에서 진정 방법 확인",
      ],
      docs: ["근로계약서·급여명세서", "통장 입금 내역·미지급 기간 기록"],
      question: "월급을 못 받았어요. 어디에 신고하나요?",
    },
    ja: {
      title: "給料が未払いです。どこに相談する？",
      short: "賃金未払い",
      answer:
        "未払い期間と金額を整理し、雇用労働部の相談窓口か労働ポータルの申立て方法を確認してください。",
      deadline: "まず未払いの記録を整理",
      caution:
        "相談と正式な申立ては別です。この画面の確認では申立ては受理されません。",
      steps: [
        "約束の支払日と実際の受取額を比較",
        "契約書・給与明細・入金記録を整理",
        "1350または労働ポータルで申立て方法を確認",
      ],
      docs: ["雇用契約書・給与明細", "入金記録・未払い期間のメモ"],
      question: "給料が未払いです。どこに相談できますか？",
    },
    en: {
      title: "My wages were not paid. Where can I get help?",
      short: "Unpaid wages",
      answer:
        "List the unpaid periods and amounts, then check labor counseling or the wage complaint route on the Ministry of Employment and Labor portal.",
      deadline: "Start by documenting unpaid wages",
      caution:
        "Counseling and filing a complaint are separate. Checking this guide does not file a complaint.",
      steps: [
        "Compare the agreed payday with actual payments",
        "Collect your contract, payslips and deposit records",
        "Contact 1350 or check the labor portal’s complaint process",
      ],
      docs: [
        "Employment contract and payslips",
        "Deposit records and unpaid wage dates",
      ],
      question: "My wages were not paid. Where can I report this?",
    },
  },
  {
    id: "job-change",
    category: "stay",
    icon: "route",
    phone: "1345",
    sources: [immigration],
    ko: {
      title: "직장을 바꾸면 비자도 확인해야 하나요?",
      short: "이직 · 체류자격",
      answer:
        "네. 체류자격에 따라 새 직장에서 일할 수 있는 범위와 허가·신고 절차가 달라요. 모든 외국인에게 같은 절차가 적용되지는 않아요.",
      deadline: "새 직장 근무 시작 전에 확인",
      caution:
        "퇴사했다고 모두 구직비자로 바꿔야 하는 것은 아닙니다. 본인의 체류자격과 조건을 먼저 확인하세요.",
      steps: [
        "현재 체류자격과 만료일 확인",
        "새 업무·회사·근무 시작 예정일 정리",
        "1345에 사전 허가 또는 신고 대상인지 문의",
      ],
      docs: ["외국인등록증·고용계약 관련 자료", "새 직장의 업무와 시작 예정일"],
      question: "직장을 바꾸면 비자도 확인해야 하나요?",
    },
    ja: {
      title: "転職するとき、在留資格の確認も必要？",
      short: "転職・在留資格",
      answer:
        "はい。在留資格によって働ける範囲や許可・届出の手続きが異なります。全員に同じ手続きが適用されるわけではありません。",
      deadline: "新しい職場で働き始める前に確認",
      caution:
        "退職した全員が求職ビザへ変更する必要があるわけではありません。自分の資格と条件を確認してください。",
      steps: [
        "現在の在留資格と満了日を確認",
        "新しい仕事・会社・開始予定日を整理",
        "1345で事前許可または届出が必要か確認",
      ],
      docs: ["外国人登録証・雇用契約資料", "新しい業務と開始予定日"],
      question: "転職するとき在留資格の確認は必要ですか？",
    },
    en: {
      title: "Do I need to check my visa before changing jobs?",
      short: "Changing jobs · immigration",
      answer:
        "Yes. Work permissions and reporting requirements depend on your status of stay. There is no single process for all foreign residents.",
      deadline: "Check before starting the new job",
      caution:
        "Leaving a job does not mean everyone must switch to a job-seeking visa. Check your own status and conditions first.",
      steps: [
        "Check your current status and expiry date",
        "List the new role, employer and planned start date",
        "Ask 1345 whether prior permission or a report is needed",
      ],
      docs: [
        "Foreign resident card and employment documents",
        "New role and planned start date",
      ],
      question: "Do I need to check my visa before changing jobs?",
    },
  },
  {
    id: "visa",
    category: "stay",
    icon: "shield",
    phone: "1345",
    sources: [
      {
        title: "정부24 · 체류기간연장허가",
        url: "https://m.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12700000097&HighCtgCD=A01008",
      },
    ],
    ko: {
      title: "체류기간 만료가 다가오면 뭘 해야 하나요?",
      short: "체류기간 연장",
      answer:
        "체류기간을 더 연장하려면 현재 자격에 맞는 연장 절차와 제출자료를 확인하세요. 방문예약만 한 상태와 신청을 접수한 상태는 달라요.",
      deadline: "체류기간이 끝나기 전에 준비",
      caution:
        "체류자격에 따라 요건과 이용 가능한 신청 경로가 다르므로 1345 또는 관할 출입국기관에 확인하세요.",
      steps: [
        "여권과 체류기간 만료일 확인",
        "하이코리아에서 내 자격의 연장 절차 확인",
        "필요 자료·신청 경로를 확인하고 접수 상태 확인",
      ],
      docs: ["여권·외국인등록증", "체류자격별로 안내받은 제출자료"],
      question: "체류기간 만료가 다가오면 뭘 해야 하나요?",
    },
    ja: {
      title: "在留期限が近づいています。何をする？",
      short: "在留期間の延長",
      answer:
        "延長する場合は、自分の在留資格に合う手続きと書類を確認しましょう。訪問予約と申請の受付は別の状態です。",
      deadline: "在留期限が終わる前に準備",
      caution:
        "資格によって条件と申請方法が異なります。1345または管轄の出入国機関に確認してください。",
      steps: [
        "旅券と在留期限を確認",
        "Hi Koreaで自分の資格の延長手続きを確認",
        "必要資料と申請方法を確認し、受付状況も確認",
      ],
      docs: ["旅券・外国人登録証", "在留資格ごとに案内された資料"],
      question: "在留期限が近づいています。何をすればいいですか？",
    },
    en: {
      title: "My stay is expiring. What should I do?",
      short: "Extending your stay",
      answer:
        "Check the extension process and documents for your current status. A visit reservation is not the same as a submitted application.",
      deadline: "Prepare before your stay expires",
      caution:
        "Conditions and available application channels vary by status. Confirm with 1345 or the responsible immigration office.",
      steps: [
        "Check your passport and stay expiry dates",
        "Find the extension process for your status on Hi Korea",
        "Confirm the documents, application route and receipt status",
      ],
      docs: [
        "Passport and foreign resident card",
        "Documents required for your specific status",
      ],
      question: "My stay is expiring. What should I do?",
    },
  },
  {
    id: "interpretation",
    category: "living",
    icon: "chat",
    sources: [
      {
        title: "MY SEOUL+ · 가족상담 및 통·번역",
        url: "https://global.seoul.go.kr/hmpg/cinf/mari/fcns/contPageDetail.do?conts_no=008CF59C26DA4F31B62C01F238DA0BDE",
      },
    ],
    ko: {
      title: "한국어로 설명하기 어려우면 도움받을 수 있나요?",
      short: "통역 · 상담",
      answer:
        "MY SEOUL+의 가족상담 및 통·번역 안내에서 가족센터 등 지원기관을 찾아볼 수 있어요.",
      deadline: "방문 전에 지원 언어·예약 확인",
      caution:
        "기관마다 이용 대상과 지원 언어가 달라요. 모든 언어의 즉시 통역을 보장하지 않아요.",
      steps: [
        "상담할 업무와 편한 언어 정리",
        "MY SEOUL+에서 지원기관 찾기",
        "이용 대상·지원 언어·예약 가능 여부 확인",
      ],
      docs: ["상담할 내용을 정리한 메모", "설명이 필요한 안내문"],
      question: "한국어로 설명하기 어려워요. 통역 지원이 있나요?",
    },
    ja: {
      title: "韓国語で説明が難しいとき、支援はある？",
      short: "通訳・相談",
      answer:
        "MY SEOUL+の家族相談・通訳翻訳案内から、家族センターなどの支援機関を探せます。",
      deadline: "訪問前に対応言語と予約を確認",
      caution:
        "利用対象と対応言語は機関ごとに異なります。すべての言語の即時通訳を保証するものではありません。",
      steps: [
        "相談したい内容と希望言語を整理",
        "MY SEOUL+で支援機関を探す",
        "対象者・対応言語・予約可否を確認",
      ],
      docs: ["相談内容のメモ", "説明してほしい案内文"],
      question: "韓国語で説明が難しいです。通訳支援はありますか？",
    },
    en: {
      title: "Can I get help explaining something in Korean?",
      short: "Interpreting · counseling",
      answer:
        "Find support organizations such as family centers through the family counseling and interpretation guide on MY SEOUL+.",
      deadline: "Check language support and appointments before visiting",
      caution:
        "Eligibility and supported languages vary by organization. Immediate interpreting in every language is not guaranteed.",
      steps: [
        "Write down your question and preferred language",
        "Find a support organization on MY SEOUL+",
        "Confirm eligibility, language support and availability",
      ],
      docs: [
        "Notes about your question",
        "The notice you need help understanding",
      ],
      question: "Can I get interpreting support?",
    },
  },
];
export const findGuide = (id) => lifeGuides.find((g) => g.id === id);
export function matchGuide(question) {
  if (/퇴직금|退職金|severance/i.test(question)) return findGuide("severance");
  if (/체불|월급|給料|賃金|unpaid|wages|salary/i.test(question))
    return findGuide("unpaid");
  if (
    /이사|전입|체류지|引っ越|住所変更|\bmoved?\b|address change/i.test(question)
  )
    return findGuide("moving");
  if (/이직|직장.*바꾸|転職|changing jobs|change.*job/i.test(question))
    return findGuide("job-change");
  if (/만료|체류기간|在留期限|stay.*expir|visa.*expir/i.test(question))
    return findGuide("visa");
  return null;
}
