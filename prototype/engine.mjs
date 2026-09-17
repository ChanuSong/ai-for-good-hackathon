// The validation prototype assembles reviewed-source candidates; it is not an AI model.
export const fields = {
  district: {label: {ko: '한국인 배우자의 주민등록 지역', ja: '韓国籍の配偶者の住民登録地域'}, values: {seocho: {ko: '서초구', ja: '瑞草区'}, other: {ko: '다른 지역', ja: '別の地域'}, unknown: {ko: '모름', ja: '不明'}}},
  marriage: {label: {ko: '혼인 관계', ja: '婚姻関係'}, values: {legal: {ko: '법률혼', ja: '法律婚'}, de_facto: {ko: '사실혼', ja: '事実婚'}, unknown: {ko: '모름', ja: '不明'}}},
  insurance_confirmed: {label: {ko: '두 사람의 보험 가입·고지 확인', ja: '双方の保険加入・通知の確認'}, values: {yes: {ko: '확인했다고 가정', ja: '確認済みと仮定'}, no: {ko: '충족하지 않는 것으로 가정', ja: '満たしていないと仮定'}, unknown: {ko: '아직 모름', ja: '未確認'}}},
  treatment_started: {label: {ko: '시술 시작 여부', ja: '治療開始の状況'}, values: {no: {ko: '시작 전', ja: '開始前'}, yes: {ko: '이미 시작', ja: '開始済み'}, unknown: {ko: '모름', ja: '不明'}}},
  preparation: {label: {ko: '준비 목록을 읽고 확인했나요?', ja: '準備項目を読んで確認しましたか？'}, values: {not_checked: {ko: '아직 읽지 않음', ja: 'まだ読んでいない'}, some_prepared: {ko: '읽었지만 모르는 항목 있음', ja: '読んだが不明な項目がある'}, reviewed: {ko: '읽고 확인함 — 자기보고', ja: '読んで確認した — 自己申告'}}},
};
export const defaults = Object.freeze({district: 'seocho', marriage: 'legal', insurance_confirmed: 'unknown', treatment_started: 'no', preparation: 'not_checked'});
const tr = (ko, ja) => ({ko, ja});
const questionBank = {
  insurance: tr('보험 가입·고지를 아직 확정하지 못했습니다. 어떤 항목과 서류로 확인하면 되나요?', '保険加入・通知をまだ確定できていません。どの項目と書類で確認すればよいですか？'),
  documents: tr('준비 목록 중 아직 확인하지 못한 항목이 있습니다. 제 조건에서 필요한 항목과 생략 가능한 항목을 함께 확인해 주세요.', '準備項目に未確認のものがあります。この条件で必要な項目と省略可能な項目を一緒に確認してください。'),
  residence: tr('외국인 여성·한국인 남성의 법률혼 가구도 별도의 체류 증빙이 필요한가요?', '外国籍の妻と韓国籍の夫の法律婚世帯にも、別途在留証明が必要ですか？'),
  channel: tr('외국인 당사자가 이용할 수 있는 신청·인증 경로는 무엇인가요? 배우자가 도울 수 있는 범위도 확인하고 싶습니다.', '外国籍の本人が利用できる申請・認証方法は何ですか？配偶者が手伝える範囲も確認したいです。'),
  validity: tr('통지서 유효기간에 관한 두 공식 안내가 다릅니다. 이 사례에 적용되는 기간과 공식 근거를 알려주세요.', '通知書の有効期間について二つの公式案内が異なります。この事例に適用される期間と公式の根拠を教えてください。'),
  started: tr('시술 시작 여부와 신청 시점을 먼저 상담하고 싶습니다. 지금 확인해야 할 사항은 무엇인가요?', '治療開始の状況と申請時期について先に相談したいです。今確認すべきことは何ですか？'),
  scope: tr('현재 지역·혼인 조건에 맞는 공식 안내와 담당 창구를 먼저 확인하고 싶습니다.', '現在の地域・婚姻条件に合う公式案内と担当窓口を先に確認したいです。'),
};

export function evaluate(profile, data) {
  for (const [key, field] of Object.entries(fields)) {
    if (!Object.hasOwn(field.values, profile[key])) throw new Error(`Invalid profile field: ${key}`);
  }
  if (Object.keys(profile).some(key => !Object.hasOwn(fields, key))) throw new Error('Unexpected profile field');
  const base = {reviewStatus: data.review_status, gaps: [], questions: [], claimIds: [], scope: 'supported'};
  const add = (id, title, claimIds = []) => {
    base.gaps.push({id, title, claimIds});
    base.questions.push({id, text: questionBank[id], claimIds});
  };
  if (profile.district !== 'seocho' || profile.marriage !== 'legal') {
    base.scope = (profile.district === 'unknown' || profile.marriage === 'unknown') ? 'unconfirmed' : 'outside';
    add('scope', tr('이 사례의 안내 범위부터 확인', 'この事例の案内対象を先に確認'));
    return base;
  }
  if (profile.treatment_started !== 'no') {
    base.scope = 'contact_first';
    base.claimIds = ['C-03'];
    add('started', tr('시술 시작·신청 시점 상담이 먼저', '治療開始・申請時期の相談を優先'), ['C-03']);
    return base;
  }
  base.claimIds = data.claims.map(claim => claim.id);
  if (profile.insurance_confirmed !== 'yes') add('insurance', tr('보험 조건을 확인하지 못했어요', '保険条件が未確認です'), ['C-01']);
  if (profile.preparation !== 'reviewed') add('documents', tr('준비 목록을 확인할 일이 남았어요', '準備項目の確認が残っています'), ['C-04']);
  add('residence', tr('체류 증빙의 적용 범위가 불명확해요', '在留証明の適用範囲が不明確です'), ['C-07']);
  add('channel', tr('이용 가능한 신청 경로를 확인해요', '利用可能な申請方法を確認します'), ['C-08']);
  add('validity', tr('공식 안내의 기간이 서로 달라요', '公式案内の期間が異なります'), ['C-06']);
  return base;
}

export function documentPlan(result, documents) {
  return result.scope === 'supported' ? documents : null;
}

export function inquiryPacket(profile, result, data, language = 'ko', documents = null) {
  if (!['ko', 'ja'].includes(language)) throw new Error('Unsupported language');
  const heading = tr('MARO 합성 사례 문의 준비서', 'MARO 架空事例の問い合わせ準備シート');
  const note = tr('검증용 합성 사례입니다. 자격 승인·실제 신청·기관 검토 결과가 아닙니다.', '検証用の架空事例です。資格承認・実際の申請・窓口の確認結果ではありません。');
  const lines = [heading[language], note[language], '', tr('가정: 외국인 여성·한국인 남성 가구', '想定：外国籍の妻・韓国籍の夫の世帯')[language]];
  for (const [key, field] of Object.entries(fields)) lines.push(`${field.label[language]}: ${field.values[profile[key]][language]}`);
  lines.push('', tr('확인할 질문', '確認する質問')[language]);
  result.questions.forEach((question, i) => lines.push(`${i + 1}. ${question.text[language]}`));
  const plan = documents && documentPlan(result, documents);
  if (plan) {
    lines.push('', plan.title[language], plan.note[language]);
    for (const group of plan.groups) {
      lines.push('', group.title[language], group.action[language]);
      for (const doc of group.documents) {
        lines.push(`- ${doc.name}`);
        if (doc.route) lines.push(`  ${doc.route.label[language]}: ${doc.route.url}`, `  ${doc.route.note[language]}`);
      }
    }
    lines.push('', plan.question[language], `${plan.source.title}: ${plan.source.url}`);
  }
  if (result.claimIds.includes('C-03')) lines.push('', data.claims.find(c => c.id === 'C-03').text[language]);
  const ids = new Set(result.claimIds.flatMap(id => data.claims.find(c => c.id === id).source_ids));
  if (ids.size) {
    lines.push('', tr('확인에 사용할 공식 자료', '確認に使う公式資料')[language]);
    for (const source of data.sources.filter(s => ids.has(s.id))) lines.push(`${source.title}: ${source.url}`);
  }
  lines.push('', tr('일본어·행정 내용은 사람 검토 전입니다. 모든 확인이 완료됐다는 뜻이 아닙니다.', '日本語・行政情報は担当者による確認前です。すべての確認が完了したことを意味しません。')[language]);
  return lines.join('\n');
}
