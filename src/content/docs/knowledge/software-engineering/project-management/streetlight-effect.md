---
title: "가로등 효과 (Streetlight Effect)"
description: "측정하기 쉬운 것만 측정하고 실제로 중요한 것은 측정하지 않는 메트릭 선정의 안티패턴 — '가로등 아래에서 열쇠 찾기'에서 유래"
tags: ["Software Engineering", "Project Management", "Metrics", "Antipattern", "Cognitive Bias"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/streetlight-effect
sidebar:
  order: 25
---

## 핵심 개념

가로등 효과(Streetlight Effect)는 "가로등 아래에서 열쇠 찾기"에서 유래한 인지 편향으로, 측정하기 쉬운 것만 측정하고 실제로 중요한 것은 측정하지 않는 메트릭 선정의 안티패턴이다.

## 동작 원리

소프트웨어 엔지니어링에서 가로등 효과는 매우 흔하다. 대표적인 예는 코드 라인 수(LOC)를 생산성 메트릭으로 사용하는 것이다. LOC는 측정하기 매우 쉽지만, 실제 생산성이나 코드 품질과 상관관계가 거의 없다. Dijkstra가 말했듯이, 코드 라인은 "생산된 라인"이 아니라 "소비된 라인"으로 기록해야 한다.

가로등 효과를 방지하는 핵심 도구가 GSM(Goals/Signals/Metrics) 프레임워크이다. 목표를 먼저 정의하고, 그 목표를 달성했는지 알 수 있는 신호를 정의한 후, 마지막으로 메트릭을 도출함으로써 "쉽게 측정 가능한 것"이 아닌 "측정해야 하는 것"에 집중하도록 유도한다.

또 다른 위험은 **메트릭 편향(metrics bias)**이다. 원칙적 접근 없이 메트릭을 선택하면, 결과가 기대와 다를 때 원하는 결과를 보여줄 다른 메트릭으로 바꾸려는 유혹이 생긴다.

## 예시

한 팀이 엔지니어 생산성을 "주당 커밋 수"로 측정하기로 했다. 이는 쉽게 측정 가능하지만, 엔지니어들이 작은 변경을 여러 커밋으로 나누거나 의미 없는 커밋을 만드는 게임화(gaming)로 이어질 수 있다. GSM을 적용하면, 목표("엔지니어가 효율적으로 가치를 전달한다")에서 출발하여 더 의미 있는 메트릭(예: 기능 전달 시간, 코드 리뷰 통과율)을 도출할 수 있다.

## 관련 개념

- [목표-신호-메트릭 프레임워크 (Goals-Signals-Metrics Framework)](/knowledge/software-engineering/project-management/goals-signals-metrics-framework/)
- [엔지니어링 생산성 측정 (Measuring Engineering Productivity)](/knowledge/software-engineering/project-management/measuring-engineering-productivity/)
- [QUANTS 프레임워크 (QUANTS Framework)](/knowledge/software-engineering/project-management/quants-framework/)
