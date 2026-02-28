---
title: "Feedback Loops (피드백 루프)"
description: "행동의 결과를 관찰하고 그 정보를 다음 행동에 반영하는 반복적 프로세스로, 개인, 제품, 팀, 조직 모든 수준의 개선을 가능하게 한다"
tags: ["Career", "Foundations", "Validation", "Continuous-Improvement"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/feedback-loops
sidebar:
  order: 227
---

## 핵심 개념

피드백 루프는 행동의 결과를 관찰하고 그 정보를 다음 행동에 반영하는 반복적 프로세스다. 검증과 학습의 근간으로, 짧은 피드백 루프가 더 빠른 학습을 가능하게 한다.

MIT 로봇 공학 대회의 비유: 로봇이 직진하면 마찰, 타이어 마모 등으로 점점 경로를 이탈한다. 해결책은 조금 이동 → 카메라 확인 → 방향 보정 → 반복이다. 짧은 반복 사이클이 핵심이다.

## 동작 원리

피드백 루프는 모든 의사결정에 일반화된다:

| 수준 | 예시 |
|------|------|
| 코드 레벨 | 유닛 테스트 → 즉시 결과 확인 → 수정 |
| 기능 레벨 | MVP → 사용자 데이터 → 방향 조정 |
| 프로젝트 레벨 | 주간 체크인 → 진행 상황 검증 → 일정 조정 |
| 팀 레벨 | 포스트모템 → 교훈 문서화 → 프로세스 개선 |
| 조직 레벨 | 팀 구성 실험 → 성과 관찰 → 구조 조정 |

Facebook의 Nimrod Hoofien: "모든 결정에 피드백 루프가 있어야 한다. 채용, 팀 설계, 문화 구축, 보상 구조. 피드백 루프가 없으면 추측일 뿐이다."

피드백 확보 전략: 코드 조기 커밋, 엄격한 리뷰어 요청, 동료에게 아이디어 논의, API/인터페이스 먼저 설계, 디자인 문서 공유, 논란적 기능의 사전 동의 확보.

## 예시

Wozniak-Jobs 파트너십: Wozniak이 Apple I/II를 혼자 설계했지만, Jobs가 비전과 피드백을 제공하는 counterbalance 역할을 했다. 고립된 작업도 외부 피드백 채널이 있으면 성공 확률이 크게 높아진다.

Ooyala의 Hoofien: 보너스를 엔지니어링 메트릭에 연동 → 엔지니어가 통제 불가에 불만 → 한 분기 후 롤백. 피드백 루프가 없었다면 계속 실패했을 것이다.

```
# 피드백 루프가 없는 경우
일년 후 "뭔가 잘못 됐네..." (너무 늦은 발견)

# 피드백 루프가 있는 경우
2주 후 "방향이 잘못됐네. 수정하자." (조기 수정 가능)
```

## 관련 개념

- [A/B Testing](/knowledge/career/foundations/ab-testing/) - 제품 수준의 피드백 루프 구현 방법
- [Minimum Viable Product](/knowledge/career/foundations/minimum-viable-product/) - 빠른 피드백을 얻기 위한 최소 투자 전략
- [Iteration Speed](/knowledge/career/productivity/iteration-speed/) - 반복 속도를 높여 피드백 루프를 단축
- [Post-Mortems](/knowledge/career/workplace/post-mortems/) - 팀 수준의 피드백 루프 메커니즘
