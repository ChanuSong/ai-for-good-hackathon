# MARO — My Administrative Roadmap

> 내 상황에 맞는 지원과 행정업무를 찾고, 필요한 일을 쉽게 처리하도록 돕는 서비스

**제품 방향:** 내 상황 → 관련 지원사업·행정업무 → 쉬운 실행·막힘 해결 → 처리 확인. 외부 포스트는 선택 입력이다. 첫 검증은 디지털 도구를 사용할 수 있지만 한국 행정에 익숙하지 않은 사람의 직접 수행에 집중한다. [상황 중심 흐름과 대상 구분](docs/13-discovery-to-application.md)

**현재 구현:** 서류 구분 → 공식 준비 경로 → 미확인 조건·근거 → 문의 준비서. 서초구 시술 전 합성 사례이며 약제비 청구·잔액 조회는 미구현이다.

[통합 서비스 정의·수혜·검증 기준](docs/15-service-definition.md)을 현재 기획 기준으로 삼는다. 첫 실행 검증은 약제비 청구 한 건이며 실제 경로·구현·효과 검증은 남아 있다.

## 현재 상태 — 2026-09-17

- 한국어·일본어 로컬 비교 프로토타입 구현. 동일 자료를 A 안내형 / B 점검형으로 제공한다.
- 직접 제출·공무원 조회·본인정보 제공 요구 구분과 공식 준비 경로 3개를 연결했다. 전부 필수이거나 전부 생략 가능하다고 판정하지 않는다.
- MY SEOUL+ 챗봇에 합성 질문 2건 실행. 질문 생성 기능이 이미 있어 그것만으로 차별성을 주장하지 않는다.
- 직접 경험 조사: 응답자 1명. 본인 가구의 난임·전세대출과 부모님 업무 지원 경험을 설명함. 부모님 세부 사례는 미확인. 화면 사용성·시간 절감·시장 수요는 미검증.
- **AI 미연결, 공개 배포 전, 행정·일본어 사람 검토 전.** 현재는 규칙 기반 검증 도구다.
- 가족 역할 배정·Task 완료·이사·전세대출 기능은 후속 후보로 내렸다.

## 실행

프로젝트 루트에서:

```sh
python3 -m http.server 8973 --bind 127.0.0.1
```

[로컬 A](http://127.0.0.1:8973/prototype/) · [로컬 B](http://127.0.0.1:8973/prototype/?view=B)

합성 선택만 사용하며 새로고침 시 초기화한다. 서버가 저장소 전체를 제공하므로 로컬에서만 실행한다. 내부 조사 기록을 외부 배포에 포함하지 않는다. [실행 안내](prototype/README.md)

## 문서

| 문서 | 내용 |
| --- | --- |
| [제품 정의](docs/01-product-requirements.md) · [MVP](docs/02-mvp-spec.md) | 문제·가설·범위 |
| [방향과 경쟁 근거](docs/11-positioning-and-evidence.md) · [호주·캐나다 비교](docs/14-australia-canada-lessons.md) | 기존 서비스·해외 운영 방식과 추가 가치 가설 |
| [검증 실행 기록](docs/12-comparative-validation.md) · [검증 계획](docs/04-validation.md) | 실제 관찰·기술 검사·미검증 효과 |
| [공식 출처](docs/08-source-register.md) | 근거·상충·확인 필요 항목 |
| [AI·데이터](docs/03-ai-and-data.md) · [구현 계약](docs/10-implementation-contract.md) · [데이터](data/README.md) | 규칙 엔진과 후속 AI |
| [실행 보드](docs/09-execution-board.md) · [해커톤 운영](docs/05-hackathon-playbook.md) | 남은 작업·제출 |
| [정책 제안](docs/06-policy-proposal.md) · [발화안](docs/templates/pitch-script.md) | 로컬 제출 초안 |
| [결정 이력](docs/07-references-and-decisions.md) | 범위 변경·접근 상태 |

## 다음 검증

실제 제출 경험과 정보제공 동의 여부를 구분하고, 같은 자료의 두 화면에서 서류를 모두 발급해야 한다는 오해 없이 다음 행동을 찾는지 확인한다. 안내만으로 충분하면 단순화한다. 인증·권한 문제를 안내 개선으로 해결했다고 하지 않는다.

```sh
python3 scripts/check_data.py
python3 -m unittest discover -s tests -v
node --test tests/preparation.test.mjs
```

## 행사 원본

2026-09-18(금) · 서울 AI 허브 · 13:30 제출. 사전 개발은 같은 주최 측의 이전 행사에 대한 사용자 경험을 근거로 진행한다.

- [참가자 안내](https://ai-impact-guide.vercel.app/)
- [팀 발표 슬라이드](https://docs.google.com/presentation/d/1H8AwFjUAygR4h_0Nx5Cl-DYU-LipoeBPI1sOirr9urA/edit)
- [팀 구성·제출 시트](https://docs.google.com/spreadsheets/d/1ecLzgoYdHuH76vKPhOAq8OXDws_VC0nkrkbukybozAQ/edit?usp=sharing)

외부 슬라이드 편집·게시·팀 시트 제출은 아직 하지 않았다.
