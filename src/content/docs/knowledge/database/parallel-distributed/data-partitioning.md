---
title: "Data Partitioning"
description: "데이터 파티셔닝은 릴레이션의 튜플을 여러 노드에 분배하여 각 튜플이 하나의 노드에 저장되도록 하는 기법이다"
tags: ['Horizontal Partitioning', 'Round Robin', 'Parallel Storage', 'I O Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-partitioning
sidebar:
  order: 7
---

## 핵심 개념

수평 파티셔닝의 세 가지 전략:

**라운드 로빈(Round-Robin)**: i번째 튜플을 노드 (i mod n)에 할당한다. 구현이 간단하고 데이터를 균등하게 분배하지만, 특정 값에 대한 점 질의(point query)나 범위 질의(range query)를 효율적으로 처리할 수 없다. 관계의 전체 스캔에 적합하다.

**해시 파티셔닝(Hash Partitioning)**: 해시 함수 h를 파티셔닝 속성에 적용하여 튜플을 h(값) mod n 번째 노드에 할당한다. 점 질의에 효율적이지만 범위 질의는 지원하지 못한다.

**범위 파티셔닝(Range Partitioning)**: 파티셔닝 벡터 [v0, v1, ..., v(n-1)]을 사용하여 값의 범위에 따라 튜플을 노드에 할당한다. 범위 질의와 점 질의 모두 효율적으로 처리할 수 있다.

RAID 시스템은 블록 수준의 파티셔닝을 제공하지만, 어떤 튜플이 어떤 디스크에 저장되는지 제어할 수 없다. 따라서 병렬 데이터베이스 시스템은 튜플 수준에서 파티셔닝을 수행한다.

수직 파티셔닝(vertical partitioning)은 수평 파티셔닝과 직교적 개념으로, 컬럼 기반 저장과 관련된다. 수평 파티셔닝 후 각 노드에서 수직 파티셔닝을 적용할 수 있다.

## 예시

```
student 릴레이션 (ID, name, dept, credits)에 대해:

1. 라운드 로빈 (4개 노드):
   튜플 0 → Node 0, 튜플 1 → Node 1, 튜플 2 → Node 2,
   튜플 3 → Node 3, 튜플 4 → Node 0, ...

2. 해시 파티셔닝 (ID 기준, 4개 노드):
   h(ID) = ID mod 4
   ID=101 → Node 1, ID=204 → Node 0, ID=307 → Node 3

3. 범위 파티셔닝 (ID 기준, 4개 노드):
   파티셔닝 벡터: [250, 500, 750]
   ID < 250      → Node 0
   250 ≤ ID < 500 → Node 1
   500 ≤ ID < 750 → Node 2
   ID ≥ 750      → Node 3

질의 유형별 최적 전략:
┌─────────────┬──────────┬──────┬──────┐
│ 질의 유형    │ Round-Robin│ Hash │ Range│
├─────────────┼──────────┼──────┼──────┤
│ 전체 스캔    │ ◎        │ ◎   │ ◎   │
│ 점 질의      │ ✗        │ ◎   │ ◎   │
│ 범위 질의    │ ✗        │ ✗   │ ◎   │
└─────────────┴──────────┴──────┴──────┘
```

## 관련 개념

- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Range Partitioning](/knowledge/database/range-partitioning/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
- [Replication](/knowledge/database/replication/)
- [Consistent Hashing](/knowledge/database/consistent-hashing/)
