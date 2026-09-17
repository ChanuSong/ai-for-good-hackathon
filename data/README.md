# 데모 데이터 인계

- `seocho-infertility.json`: 공식 원문 대조 결과와 준비 업무 6개. 합성 프로필 전용, 사람 검토 전.
- `roadmap.schema.json`: 입력 데이터의 JSON Schema. UI/API 구현 시 동일 계약으로 검증한다.
- `acceptance-cases.json`: 실제 앱에서 수행할 12개 수용 사례. 현재 `not_executed_in_app`이며 테스트 결과가 아니다.

행정 주장은 `claims`에 한 번만 기록하고 Task는 ID로 참조한다. Task의 순서는 준비 UX를 위한 설계도 포함하므로, 각 간선 자체를 법정 순서라고 소개하지 않는다. 한국어·일본어 표현의 의미 일치는 사람이 추가 검토해야 한다.

`data_mode=official_sources`와 `review_status=human_review_pending`을 동시에 표시한다. `source_checked`는 원문 대조 수준이고 `verified`와 다르다. 모든 Task의 `applicability`는 개인별 적용을 승인하지 않았다는 의미에서 `needs_confirmation`이다.

## 검사

프로젝트 루트에서 `python3 scripts/check_data.py`를 실행한다. 표준 라이브러리로 필드·허용값·참조·의존관계·근거 상태를 검사한다. 이는 범용 JSON Schema 엔진이나 행정·번역·브라우저 검증을 대체하지 않는다.

`python3 -m unittest discover -s tests -v`는 잘못된 출처, 순환 참조, 근거 상태 승격, 충돌 기한 등 변조 데이터를 거부하는지 확인한다.

앱 수용 사례를 실제로 수행한 뒤에는 버전·환경·결과·담당자를 별도 기록한다. 데이터 검사 성공을 A-01~A-12 앱 통과로 변경하지 않는다.

## 이번 확인 결과 — 2026-09-17

- 데이터 검사 통과: 출처 2개, claim 8개, Task 6개, 앱 수용 명세 12개.
- 검증기 테스트 9개 통과: 기준 데이터, 허위 출처·URL, 근거 상태 임의 승격, 상충 근거 누락, 기한 임의 생성, 순환 참조, 번역 필드 누락, 선행 조건 없는 완료.
- 로컬 Markdown 링크의 대상 파일과 JSON 문법 확인.
- 남은 검증: 범용 JSON Schema 엔진 연동, 앱·모델 실제 수용 테스트, 일본어 의미 검토, 사람·기관의 행정정보 검토, 외부 사용자 테스트.

## 준비 점검 프로토타입 추가 자료

- `preparation-glossary.json`: 쉬운 용어 2개, 공식 출처·한일 설명, 사람 검토 전.
- `document-preparation.json`: 정부24 제출 구분 3종과 공식 준비 경로 3개. 전체 필수·면제 판정이 아니며 로그인 후 발급은 미수행.
- 현재 앱은 claim·용어·서류 자료를 사용한다. 초기 Task 수용 사례 12개는 설계 이력이며 현재 PR-01~11과 다르다.
- `node --test tests/preparation.test.mjs`로 현재 규칙을 검사한다. 실제 Chrome 점검·사용자 미검증 상태는 [실행 기록](../docs/12-comparative-validation.md)을 따른다.

앞 절의 출처 2개·9개 테스트 수는 초기 기준 데이터·Python 검사에 한정한다. 추가 자료는 초기 로드맵 스키마 검사 대상이 아니다.
