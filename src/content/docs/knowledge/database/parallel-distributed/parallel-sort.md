---
title: "Parallel Sort"
description: "병렬 정렬(Parallel Sort)은 대용량 릴레이션의 정렬 작업을 여러 노드에 분배하여 병렬로 수행하는 기법이다"
tags: ['Parallel Query Processing', 'Range Partitioning Sort', 'External Sort Merge', 'Intraoperation Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/parallel-sort
sidebar:
  order: 14
---

## 핵심 개념

**범위 파티셔닝 정렬(Range-Partitioning Sort)**:
1. 정렬 키에 대한 범위 파티셔닝 벡터를 생성한다. 이미 해당 키로 범위 파티셔닝되어 있으면 이 단계를 건너뛴다.
2. 파티셔닝 벡터에 따라 각 노드의 튜플을 적절한 대상 노드로 전송한다. 이 과정을 재분배(redistribution)라 한다.
3. 각 노드에서 로컬로 수신된 튜플을 정렬한다.
4. 결과를 노드 순서대로 연결하면 전체 정렬된 릴레이션을 얻는다.

파티셔닝 벡터 생성 시 데이터 분포의 스큐를 고려해야 한다. 히스토그램을 사용하여 각 노드에 거의 같은 수의 튜플이 할당되도록 균형 잡힌 벡터를 만든다.

**병렬 외부 정렬-병합(Parallel External Sort-Merge)**:
1. 각 노드에서 로컬 데이터에 대해 독립적으로 정렬 실행(run) 생성과 병합을 수행한다.
2. 결과적으로 각 노드에 로컬로 정렬된 데이터가 생성되지만, 전체적으로 정렬되지는 않는다.
3. 최종적으로 각 노드의 정렬된 결과를 범위 파티셔닝하여 재분배한 후 병합한다.

범위 파티셔닝 정렬은 범위 파티셔닝과 로컬 정렬의 두 단계만 필요하므로, 일반적으로 더 효율적이고 널리 사용된다. 특히 데이터가 이미 정렬 키로 범위 파티셔닝되어 있으면 재분배 단계를 생략할 수 있다.

## 예시

```
-- 범위 파티셔닝 정렬 예시 (4개 노드)
-- 정렬 키: salary, 파티셔닝 벡터: [30000, 60000, 90000]

Step 1: 각 노드의 데이터를 범위에 따라 재분배
  Node 0: salary < 30000     → [15000, 22000, 28000, ...]
  Node 1: 30000-59999       → [35000, 42000, 55000, ...]
  Node 2: 60000-89999       → [62000, 75000, 87000, ...]
  Node 3: salary ≥ 90000    → [92000, 95000, 120000, ...]

Step 2: 각 노드에서 로컬 정렬 (병렬 수행)
  Node 0: [15000, 22000, 28000]  (정렬 완료)
  Node 1: [35000, 42000, 55000]  (정렬 완료)
  Node 2: [62000, 75000, 87000]  (정렬 완료)
  Node 3: [92000, 95000, 120000] (정렬 완료)

Step 3: 연결
  전체 결과 = Node 0 결과 ++ Node 1 결과 ++ Node 2 결과 ++ Node 3 결과

총 비용 ≈ 재분배 통신비용 + max(각 노드 로컬 정렬 비용)
```

## 관련 개념

- [Range Partitioning](/knowledge/database/range-partitioning/)
- [Parallel Join](/knowledge/database/parallel-join/)
- [Exchange Operator](/knowledge/database/exchange-operator/)
- [Intra-Query Parallelism](/knowledge/database/intra-query-parallelism/)
- [External Sort-Merge](/knowledge/database/external-sort-merge/)
