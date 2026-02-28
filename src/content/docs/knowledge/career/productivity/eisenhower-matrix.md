---
title: "Eisenhower Matrix (아이젠하워 매트릭스)"
description: "활동을 긴급성과 중요성의 두 축으로 4사분면에 분류하여 우선순위를 결정하는 프레임워크. 핵심은 비긴급하지만 중요한 2사분면에 투자하는 것이다"
tags: ["Career", "Productivity", "Prioritization", "Time-Management"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/productivity/eisenhower-matrix
sidebar:
  order: 208
---

## 핵심 개념

아이젠하워 매트릭스(긴급-중요 매트릭스)는 Stephen Covey가 *The 7 Habits of Highly Effective People*에서 제시한 프레임워크다. 긴급성(urgency)과 중요성(importance)을 구분하여 4사분면에 활동을 분류한다.

| | 긴급 | 비긴급 |
|---|---|---|
| **중요** | Q1: 위기, 마감 | **Q2: 학습, 도구 구축, 관계** |
| **비중요** | Q3: 대부분의 이메일/회의 | Q4: 시간 낭비 |

## 동작 원리

**2사분면(Q2)이 핵심이다.** 비긴급이지만 중요한 활동들:
- 커리어 목표 계획
- 관계 구축
- 전문 서적/아티클 독서
- 워크플로우 도구 구축
- 인프라 확장성 확보
- 새로운 프로그래밍 언어 학습
- 팀원 멘토링

Q2 활동은 자연적 마감이 없어 긴급한 Q1/Q3에 밀리기 쉽다. 하지만 Q2 투자가 장기적으로 가장 큰 가치를 제공하며, Q1을 줄이는 방법이기도 하다.

**Q1 과잉의 함정:**
- 잦은 프로덕션 장애 → 자동 복구 필요(Q2)
- 고우선순위 버그 → 낮은 테스트 커버리지(Q2)
- 마감 압박 → 부실한 프로젝트 추정(Q2)

Q2에 투자하면 Q1의 양이 줄어든다.

## 예시

```
# 엔지니어의 사분면 분류 예시
Q1 (긴급+중요):
  - 프로덕션 장애 대응
  - 오늘 마감인 기능 릴리스
  - 고객 긴급 이슈

Q2 (비긴급+중요):  ← 여기에 의도적으로 투자!
  - CI/CD 파이프라인 개선
  - 테스트 커버리지 확대
  - 새로운 프로그래밍 언어 학습
  - 기술 부채 상환
  - 팀원 멘토링

Q3 (긴급+비중요):
  - 대부분의 이메일 응답
  - 불필요한 회의 참석

Q4 (비긴급+비중요):
  - 소셜 미디어 브라우징
```

Facebook의 Nimrod Hoofien: 모든 할 일에 1-4 라벨을 붙여 비중요 활동(Q3, Q4)을 걸러내는 연습을 했다.

## 관련 개념

- [Prioritization](/knowledge/career/productivity/prioritization/) - 아이젠하워 매트릭스를 활용한 우선순위화
- [Leverage](/knowledge/career/foundations/leverage/) - Q2 활동이 레버리지가 높은 이유
- [Technical Debt](/knowledge/software-engineering/foundations/technical-debt/) - Q2에서 상환하지 않으면 Q1이 된다
