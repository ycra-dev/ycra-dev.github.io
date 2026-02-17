---
title: "Range Partitioning"
description: "범위 파티셔닝은 파티셔닝 속성의 값 범위에 따라 튜플을 서로 다른 노드에 할당하는 데이터 분배 기법이다"
tags: ['Partitioning', 'Range Query', 'Partitioning Vector', 'Histogram', 'Skew']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/range-partitioning
sidebar:
  order: 9
---

## 핵심 개념

n개의 파티션에 대해 파티셔닝 벡터 [v1, v2, ..., v(n-1)]을 정의한다. 파티셔닝 속성 값이 v1 미만인 튜플은 파티션 0에, v1 이상 v2 미만인 튜플은 파티션 1에 할당되는 식이다.

**장점**: 범위 질의와 점 질의를 모두 효율적으로 처리할 수 있다. 범위 질의의 경우, 해당 범위를 포함하는 파티션들만 접근하면 된다.

**스큐 문제와 해결**: 범위 파티셔닝의 주요 과제는 데이터 분포 스큐이다. 특정 범위에 데이터가 집중되면 해당 파티션이 과부하된다.

- **히스토그램 기반 균형 파티셔닝**: 속성 값의 빈도 분포를 히스토그램으로 수집하고, 각 파티션에 거의 같은 수의 튜플이 할당되도록 파티셔닝 벡터를 계산한다.
- **가상 노드(Virtual Nodes)**: 물리 노드보다 훨씬 많은 수의 가상 노드(태블릿)를 생성한다. 태블릿이 너무 커지면 분할하고, 태블릿을 물리 노드에 재배치하여 부하를 균형화한다. 실행 스큐(execution skew)도 태블릿 이동으로 해결할 수 있다.

범위 파티셔닝은 B+-트리 인덱스와 유사한 특성을 가진다. 범위 질의를 지원하면서도, 데이터의 삽입/삭제에 따라 파티셔닝을 동적으로 조정해야 한다는 점도 유사하다.

## 예시

```
-- 범위 파티셔닝 예시: student 릴레이션의 ID 속성
-- 파티셔닝 벡터: [250, 500, 750]

Partition 0: ID < 250       → Node 0
Partition 1: 250 ≤ ID < 500 → Node 1
Partition 2: 500 ≤ ID < 750 → Node 2
Partition 3: ID ≥ 750       → Node 3

-- 범위 질의: WHERE ID BETWEEN 300 AND 600
→ Partition 1과 Partition 2에만 접근 (Node 1, Node 2)

-- 히스토그램 기반 균형 파티셔닝:
값 범위    | 빈도
[1-100]   | 15
[101-200] | 5
[201-300] | 20
[301-400] | 10
[401-500] | 10
[501-600] | 5
[601-700] | 5
[701-800] | 20
[801-900] | 5
[901-1000]| 5
총합 = 100, 5개 파티션 → 각 파티션 약 20개

Partition 0: [1-200]     (15+5 = 20)
Partition 1: [201-300]   (20)
Partition 2: [301-500]   (10+10 = 20)
Partition 3: [501-800]   (5+5+20 = 30) -- 약간 불균형
Partition 4: [801-1000]  (5+5 = 10)    -- 약간 불균형
```

## 관련 개념

- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Parallel Sort](/knowledge/database/parallel-sort/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
