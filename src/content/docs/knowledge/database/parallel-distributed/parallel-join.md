---
title: "Parallel Join"
description: "병렬 조인(Parallel Join)은 두 릴레이션의 조인 연산을 여러 노드에서 병렬로 수행하는 기법이다"
tags: ['Parallel Query Processing', 'Partitioned Join', 'Fragment And Replicate', 'Broadcast Join', 'Skew Handling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/parallel-join
sidebar:
  order: 15
---

## 핵심 개념

**파티션 조인(Partitioned Join)**:
등가 조인(equi-join)에 사용된다. 두 릴레이션 r과 s를 조인 속성에 대해 동일한 파티셔닝 함수(해시 또는 범위)로 파티셔닝한다. 이렇게 하면 r의 파티션 i와 s의 파티션 i만 조인하면 되므로, 각 노드가 독립적으로 로컬 조인을 수행할 수 있다. 이미 조인 속성으로 파티셔닝되어 있다면 재분배가 불필요하다.

**프래그먼트-앤-리플리케이트 조인(Fragment-and-Replicate Join)**:
등가 조인이 아닌 조인(비등가 조인, 세타 조인 등)에 사용된다. 하나의 릴레이션은 파티셔닝하고(fragment), 다른 릴레이션은 모든 노드에 복제한다(replicate). 각 노드는 자신의 파티션과 복제된 전체 릴레이션을 조인한다. 비대칭 방식에서는 작은 릴레이션을 복제하는 것이 효율적이다.

**브로드캐스트 조인(Broadcast Join)**:
프래그먼트-앤-리플리케이트의 특수한 경우이다. 두 릴레이션 중 하나가 매우 작을 때, 작은 릴레이션을 모든 노드에 브로드캐스트하고 각 노드에서 로컬 조인을 수행한다.

**스큐 처리**: 특정 조인 키 값이 매우 빈번하면 해당 키의 튜플이 한 노드에 집중되어 스큐가 발생한다. 해결 방법으로, 빈번한 키를 가진 튜플을 여러 노드에 범위 파티셔닝하고, 다른 릴레이션의 해당 키 튜플을 이 모든 노드에 복제한다.

## 예시

```
-- 파티션 조인: r ⋈ s ON r.A = s.A (해시 파티셔닝, 3개 노드)

Step 1: r과 s를 A에 대해 해시 파티셔닝
  Node 0: r0 = {r의 A값 hash%3=0}, s0 = {s의 A값 hash%3=0}
  Node 1: r1 = {r의 A값 hash%3=1}, s1 = {s의 A값 hash%3=1}
  Node 2: r2 = {r의 A값 hash%3=2}, s2 = {s의 A값 hash%3=2}

Step 2: 각 노드에서 로컬 조인 (병렬)
  Node 0: r0 ⋈ s0
  Node 1: r1 ⋈ s1
  Node 2: r2 ⋈ s2

-- 브로드캐스트 조인: r(100만 행) ⋈ s(100 행)

Step 1: s를 모든 노드에 브로드캐스트
  Node 0: r0 (로컬 파티션), s (전체)
  Node 1: r1 (로컬 파티션), s (전체)
  Node 2: r2 (로컬 파티션), s (전체)

Step 2: 각 노드에서 r_i ⋈ s
→ r의 재파티셔닝 불필요, 통신 비용 최소화

-- 프래그먼트-앤-리플리케이트: r ⋈θ s (세타 조인)
  r 파티셔닝 → r1, r2, r3
  s 복제 → 각 노드에 s 전체 복사
  각 노드: ri ⋈θ s (병렬)
```

## 관련 개념

- [Parallel Sort](/knowledge/database/parallel-sort/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Exchange Operator](/knowledge/database/exchange-operator/)
- [Intra-Query Parallelism](/knowledge/database/intra-query-parallelism/)
- [Distributed Query Processing](/knowledge/database/distributed-query-processing/)
