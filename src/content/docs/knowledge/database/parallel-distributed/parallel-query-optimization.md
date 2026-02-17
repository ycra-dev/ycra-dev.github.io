---
title: "Parallel Query Optimization"
description: "병렬 질의 최적화(Parallel Query Optimization)는 병렬 데이터베이스 시스템에서 질의의 응답 시간을 최소화하기 위해 최적의 병렬 실행 계획을 생성하는 과정이다"
tags: ['Query Optimization', 'Response Time Cost', 'Partitioning Property', 'Parallel Execution Plan']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/parallel-query-optimization
sidebar:
  order: 18
---

## 핵심 개념

**응답 시간 비용 모델**: 순차적 질의 최적화는 총 자원 소비(total resource consumption)를 최소화하지만, 병렬 질의 최적화는 응답 시간(response time), 즉 질의 완료까지의 벽시계 시간을 최소화한다. 병렬로 실행되는 작업의 비용은 가장 느린 작업의 비용이며, 순차적으로 실행되는 작업의 비용은 합산된다.

**파티셔닝 속성(Partitioning Property)**: 병렬 질의 최적화에서는 데이터의 파티셔닝 상태가 중요한 역할을 한다. 연산자의 입력이 조인 속성에 이미 올바르게 파티셔닝되어 있다면, 재파티셔닝(교환 연산자 삽입)이 불필요하다. 최적화기는 각 중간 결과의 파티셔닝 속성을 추적하여, 불필요한 재분배를 피하고 통신 비용을 줄인다.

**최적화 접근법**:
1. 순차적 최적화 후 병렬화: 먼저 최적의 순차적 질의 계획을 생성한 다음, 교환 연산자를 삽입하여 병렬화한다. 간단하지만, 순차적으로 최적인 계획이 병렬적으로도 최적이라는 보장이 없다.
2. 통합 최적화: 병렬 실행 비용을 처음부터 고려하여 계획을 생성한다. 더 나은 계획을 생성할 수 있지만, 검색 공간이 크게 증가한다.

**스큐 고려**: 병렬 질의의 응답 시간은 가장 느린 노드에 의해 결정되므로, 데이터 스큐가 성능에 큰 영향을 미친다. 최적화기는 스큐를 고려하여 계획을 생성해야 한다.

## 예시

```
-- 응답 시간 비용 모델 예시
-- 질의: SELECT * FROM r JOIN s ON r.A = s.A WHERE r.B > 100

순차적 비용:
  Scan(r) + Filter + Join + Scan(s) = 100 + 200 + 50 = 350

병렬 비용 (4개 노드):
  Stage 1 (병렬): max(Scan(r0)+Filter, Scan(r1)+Filter, ...) = 25
  통신 (재분배):  = 30
  Stage 2 (병렬): max(Join at Node0, Join at Node1, ...) = 50/4 ≈ 13
  총 응답 시간 = 25 + 30 + 13 = 68

-- 파티셔닝 속성 추적:
Plan A: r이 A로 파티셔닝됨 → 재분배 불필요
  비용 = Scan + Join = 25 + 13 = 38

Plan B: r이 B로 파티셔닝됨 → A로 재분배 필요
  비용 = Scan + 재분배(30) + Join = 25 + 30 + 13 = 68

→ Plan A가 더 효율적 (파티셔닝 속성 활용)
```

## 관련 개념

- [Exchange Operator](/knowledge/database/exchange-operator/)
- [Parallel Join](/knowledge/database/parallel-join/)
- [Parallel Sort](/knowledge/database/parallel-sort/)
- [Intra-Query Parallelism](/knowledge/database/intra-query-parallelism/)
- [Distributed Query Processing](/knowledge/database/distributed-query-processing/)
- [Query Processing](/knowledge/database/query-processing/)
