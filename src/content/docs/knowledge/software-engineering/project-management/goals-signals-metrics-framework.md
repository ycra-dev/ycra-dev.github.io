---
title: "목표-신호-메트릭 프레임워크 (Goals-Signals-Metrics Framework)"
description: "생산성 측정을 위한 메트릭을 체계적으로 설계하는 Google의 방법론 — 목표(Goal)에서 출발하여 신호(Signal)를 정의하고 측정 가능한 메트릭(Metric)을 도출한다"
tags: ["Software Engineering", "Project Management", "Metrics", "Framework"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/goals-signals-metrics-framework
sidebar:
  order: 22
---

## 핵심 개념

GSM(Goals/Signals/Metrics) 프레임워크는 생산성 측정을 위한 메트릭을 체계적으로 설계하는 Google의 방법론이다. 목표(Goal)에서 출발하여 신호(Signal)를 정의하고, 마지막으로 측정 가능한 메트릭(Metric)을 도출한다.

## 동작 원리

GSM의 세 계층:

- **목표(Goal)**: 원하는 최종 결과. 높은 수준의 이해를 표현하며 특정 측정 방법을 참조하지 않는다.
  - 예: "엔지니어가 readability 프로세스를 통해 더 높은 품질의 코드를 작성한다."

- **신호(Signal)**: 목표를 달성했음을 알 수 있는 방법. 측정하고 **싶은** 것이지만, 그 자체로 측정 불가능할 수 있다.
  - 예: "readability를 획득한 엔지니어가 자신의 코드 품질이 더 높다고 판단한다."

- **메트릭(Metric)**: 신호의 프록시(대리 지표). 실제로 측정 가능한 것.
  - 예: "분기별 설문에서 코드 품질에 만족한다고 응답한 엔지니어 비율."

GSM의 장점:
1. **가로등 효과 방지**: 쉽게 측정 가능한 것이 아니라, 목표 달성에 필요한 것을 측정하도록 유도
2. **메트릭 편향 방지**: 원칙적 접근을 통해 사전에 메트릭을 합의하므로, 결과가 기대와 다를 때 다른 메트릭으로 바꾸려는 유혹을 방지
3. **측정 공백 식별**: 측정할 수 없는 신호를 명시적으로 식별

핵심은 **추적가능성(traceability)** 유지이다. 각 메트릭이 어떤 신호의 프록시이고, 어떤 목표를 측정하려는 것인지 추적할 수 있어야 한다.

## 예시

Readability 프로세스 측정:
- **목표**: "엔지니어가 readability 프로세스를 통해 더 빠르게 작업을 완료한다"
- **신호**: "readability를 획득한 엔지니어의 코드가 더 빠르게 리뷰된다"
- **메트릭**: "readability 보유/미보유 엔지니어의 CL 중간값 리뷰 시간 비교 (로그 데이터)"

이 메트릭은 완벽하지 않으므로, 설문 데이터도 함께 사용하여 삼각측량(triangulation)한다.

## 관련 개념

- [QUANTS 프레임워크 (QUANTS Framework)](/knowledge/software-engineering/project-management/quants-framework/)
- [엔지니어링 생산성 측정 (Measuring Engineering Productivity)](/knowledge/software-engineering/project-management/measuring-engineering-productivity/)
- [가로등 효과 (Streetlight Effect)](/knowledge/software-engineering/project-management/streetlight-effect/)
