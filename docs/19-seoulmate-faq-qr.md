# SeoulMate: 생활 FAQ와 공문 QR

2026-09-18. 60초 녹화 제출용 프런트엔드 목업 범위.

## 가져온 흐름

[팀의 기존 SeoulMate](https://seoulmate.ai.studio/)를 직접 열어 홈, Life Events, Scan Document, For Officials 및 QR 미리보기를 확인했다. 원격 데이터 생성·수정·게시를 수행하지 않았다.

반영한 핵심은 생활 사건별 행동 안내, 한국어 문서를 쉬운 다국어 행동으로 전환하는 흐름, 공문용 QR에서 주민의 안내 화면으로 진입하는 흐름이다. 디자인을 복사하지 않고 기존 앱의 화면·탭·버튼을 사용했다. 정책 통계 대시보드·실시간 주변 Wi-Fi·기관 게시 관리·실제 OCR 등은 이번 녹화 범위에 포함하지 않는다.

## FAQ

이사, 퇴직금, 임금 체불, 이직, 체류기간 연장, 통역 지원 6개. 각 안내에 한국어·일본어·영어, 확인 시점 또는 기한, 다음 행동, 준비할 자료, 공식 근거와 문의처를 담았다. 체크는 개인 준비 상태만 나타낸다.

기존 사이트의 일괄 ‘14일’ 이사 안내는 그대로 옮기지 않았다. 등록외국인의 체류지 변경은 15일, 국내거소신고자의 거소 이전은 14일로 구분했다. 퇴직금의 일반 원칙과 출국만기보험 등 별도 지급 경로를 구분했다. 모든 퇴사자의 D-10 전환이나 모든 이직자의 동일 신고 의무도 단정하지 않는다.

## QR과 문서 안내

QR에 넣는 값은 현재 서비스 주소, 고정 안내 ID, 언어뿐이다. 식별 가능한 사용자 입력은 포함하지 않는다. QR 이미지는 기기 내에서 생성하며 외부 생성 API에 전달하지 않는다. 같은 주소·ID를 유지하는 한 본문을 바꿔도 안내 경로를 유지할 수 있다. 다만 현재는 고정 예시 자료이고 영구 게시·운영을 보장하는 서버가 아니다.

로컬 주소로 만든 QR을 다른 휴대폰에서 여는 것은 불가능하다. 영상에서는 ‘주민 화면 열기’로 전환하거나, 공개 배포 후 실제 배포 주소에서 QR을 다시 생성한다. 팀의 기존 서비스 도메인에 새 기능을 배포하지는 않았다.

문서 읽기는 한국어 이사 안내문 샘플과 미리 작성한 다국어 안내 사이의 전환이다. 사진 촬영·선택과 로컬 미리보기를 후속 추가했다. 생성형 분석·OCR은 미연결이며 분석 결과는 샘플임을 표시한다.

## 공식 자료

- [법무부 외국인 업무 지침](https://www.moj.go.kr/bbs/immigration/47/465762/download.do): 체류지·거소 변경 등.
- [법무부 각종 신고 의무사항](https://www.immigration.go.kr/bbs/immigration_eng/230/454086/download.do): 체류지 변경 기한 구분.
- [고용노동부 퇴직급여 안내](https://www.moel.go.kr/news/cardinfo/view.do?bbs_seq=20191201000): 일반 지급 요건 및 원칙.
- [고용24 외국인근로자 전용보험](https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000338&systCnntId=CI00002054&systId=SI00000362): 출국만기보험 경로.
- [고용노동부 노동포털](https://labor.moel.go.kr/minwonApply/minwonFormat.do?searchVal=SN001): 임금 체불 진정.
- [정부24 체류기간연장허가](https://m.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12700000097&HighCtgCD=A01008).
- [MY SEOUL+ 가족상담 및 통·번역](https://global.seoul.go.kr/hmpg/cinf/mari/fcns/contPageDetail.do?conts_no=008CF59C26DA4F31B62C01F238DA0BDE).
