---
title: "Dunning-Kruger Effect"
description: "자신의 능력을 실제보다 높게 평가하는 인지 편향"
tags: ["Software Engineering", "Psychology", "Cognitive Bias"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/dunning-kruger-effect
sidebar:
  order: 26
---

## 핵심 개념

더닝-크루거 효과(Dunning-Kruger Effect)는 자신의 능력을 실제보다 높게 평가하는 인지 편향이다. 무의식적 무능 상태의 사람들이 자신의 성과를 정확히 평가할 수 없어 발생한다. Impostor Syndrome의 반대 현상이다.

## 동작 원리

특징:
- 모든 피드백을 거부하고 기존 기술 스택을 비판한다
- 자신의 아이디어가 항상 옳다고 확신한다
- 기존 코드의 "왜"를 이해하려 하지 않는다

대처법:
- 의식적으로 호기심 개발
- 틀릴 수 있다는 열린 자세 유지
- 존경하는 엔지니어에게 솔직한 피드백 요청
- 트레이드오프 사고방식 배양 — 모든 결정에는 장단점이 있다

기존 코드의 "왜"를 먼저 이해하려는 노력이 필요하다 — 대부분의 기술적 결정에는 당시의 맥락과 제약이 있다.

## 예시

```
신입이 "이 코드 왜 이렇게 짰어요? 제가 더 잘 할 수 있어요"라고 하지만,
실제로는 분산 시스템의 복잡성을 이해하지 못한 상태이다.

건강한 접근:
"이 코드는 왜 이렇게 구현했나요? 어떤 제약이 있었나요?"
→ 맥락 이해 후 개선 방향 제안
```

더닝-크루거 곡선:
```
능력 ↑
      Mt. Stupid        Plateau of Sustainability
      (과신 정점)        (현실적 자신감)

Valley of Despair
(임포스터 신드롬 영역)
능숙함 →
```

## 관련 개념

- [Four Stages of Competence](/knowledge/software-engineering/foundations/four-stages-of-competence/)
- [Impostor Syndrome](/knowledge/software-engineering/foundations/impostor-syndrome/)
- [Dreyfus Model](/knowledge/software-engineering/foundations/dreyfus-model/)
