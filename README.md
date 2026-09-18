# MARO — My Administrative Roadmap

> 내 상황에서 필요한 생활행정을 찾고, 지금 할 행동부터 실제 처리 확인까지 이어주는 AI 행정 실행 코파일럿

제품 방향: 상황 → 관련 업무 → 지금 할 행동 → 막힘 해결 → 처리 확인. 번역·검색 자체가 아니라 정책을 찾은 뒤 실제로 이용하기까지의 마지막 구간을 해결한다.

현재 기본 프로토타입은 금천구 난임 시술 후 약제비 청구 한 건을 합성 사례로 보여준다. 공식 자료에서 확인한 절차를 기준으로 다음 행동 → 이유 → 확인사항 → 막힘 질문 → 다음 단계를 연결한다. 실제 신청·잔액 조회·기관 처리 상태 연계는 구현하지 않았다.

통합 서비스 정의·수혜·검증 기준은 docs/15-service-definition.md를 현재 기획 기준으로 삼는다.

## 현재 상태 — 2026-09-18

- 발표용 제품 데모: 약제비 청구 5단계 실행 로드맵.
- 연구용 비교 도구: 기존 서초구 시술 전 준비 A/B 화면을 별도 URL로 보존.
- 공식 근거를 사용자 진행 상태와 분리한다. 사용자가 단계를 확인해도 기관의 접수·보완·지급 완료로 바꾸지 않는다.
- MY SEOUL+ 챗봇에 합성 질문 2건을 실행했고 질문 생성 자체를 차별성으로 주장하지 않는다.
- 직접 경험 조사는 1가구 수준이며 시장 규모·시간 절감·제품 효과는 미검증이다.
- 생성형 AI는 아직 미연결이다. 최종 제품에서 AI는 상황 이해·미확인 조건 구조화·쉬운 설명에 사용하고, 행정 요건·기관·기한은 검토된 데이터에서 가져오는 구조를 지향한다.
- 가족 역할 배정·이사·전세대출·상태 자동 연계는 후속 범위다.

## 핵심 제품 루프

Discover → Plan → Act → Unblock → Confirm

1. 사용자가 공식 사업명을 몰라도 자신의 상황을 말한다.
2. MARO가 검토된 범위에서 필요한 업무와 미확인 조건을 정리한다.
3. 가장 먼저 할 행동 하나를 보여준다.
4. 막히면 이유에 맞는 확인 질문·담당 창구로 연결한다.
5. 사용자 준비 상태와 실제 기관 처리 결과를 구분한다.

## 실행

프로젝트 루트에서:

    python3 -m http.server 8973 --bind 127.0.0.1

- 제품 데모: http://127.0.0.1:8973/prototype/
- 연구용 A/B 비교: http://127.0.0.1:8973/prototype/research.html?view=B

합성 사례만 사용하며 새로고침 시 초기화한다. 서버가 저장소 전체를 제공하므로 로컬에서만 실행한다.

## 문서

- 제품 정의: docs/01-product-requirements.md
- MVP: docs/02-mvp-spec.md
- 방향과 경쟁 근거: docs/11-positioning-and-evidence.md
- 호주·캐나다 비교: docs/14-australia-canada-lessons.md
- 검증 실행 기록: docs/12-comparative-validation.md
- 정책 제안: docs/06-policy-proposal.md
- 발표안: docs/templates/pitch-script.md

## 검증 원칙

제품의 성공을 화면 선호나 질문 생성으로 판단하지 않는다. 실제로 다음 행동을 찾는지, 준비 누락·반복 설명이 줄어드는지, 사용자가 제출한 상태와 기관이 접수한 상태를 구분하는지 확인한다. 안내만으로 충분하면 단순화하고, 핵심 장벽이 인증·권한·기관 시스템이면 정책·연계 문제로 전환한다.

검사:

    python3 scripts/check_data.py
    python3 -m unittest discover -s tests -v
    node --test tests/preparation.test.mjs

## 행사

2026-09-18 · 서울 AI 허브 · 13:30 제출.

- 참가자 안내: https://ai-impact-guide.vercel.app/
- 팀 발표 슬라이드: https://docs.google.com/presentation/d/1H8AwFjUAygR4h_0Nx5Cl-DYU-LipoeBPI1sOirr9urA/edit
- 팀 구성·제출 시트: https://docs.google.com/spreadsheets/d/1ecLzgoYdHuH76vKPhOAq8OXDws_VC0nkrkbukybozAQ/edit?usp=sharing
