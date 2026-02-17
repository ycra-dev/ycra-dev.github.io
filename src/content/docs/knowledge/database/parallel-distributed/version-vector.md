---
title: "Version Vector"
description: "버전 벡터(Version Vector)는 분산 시스템에서 복제된 데이터 항목에 대한 독립적 업데이트(충돌하는 업데이트)를 감지하기 위한 메커니즘이다"
tags: ['Conflict Detection', 'Eventual Consistency', 'Replication', 'Merkle Tree', 'Reconciliation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/version-vector
sidebar:
  order: 27
---

## 핵심 개념

각 노드 i는 데이터 항목 d의 복사본과 함께 버전 벡터 V를 저장한다. 벡터는 {V[j]}로 구성되며, 각 엔트리 V[j]는 노드 j에서 수행된 업데이트 횟수를 나타낸다.

**업데이트 규칙**: 노드 i가 데이터 항목 d를 업데이트하면, V[i]를 1 증가시킨다.

**비교 규칙** (두 노드 i, j의 버전 벡터 V_i, V_j 비교):
1. **동일**: 모든 k에 대해 V_i[k] = V_j[k] → 두 복사본이 같다.
2. **순서 관계**: 모든 k에 대해 V_i[k] <= V_j[k]이고 적어도 하나가 다름 → j의 복사본이 i의 복사본보다 새로움. i가 j의 복사본으로 교체하면 된다.
3. **충돌**: 어떤 k에 대해 V_i[k] < V_j[k]이면서 다른 m에 대해 V_i[m] > V_j[m] → 두 복사본이 독립적으로 업데이트됨 → **충돌 감지**, 수동 또는 자동 해결(reconciliation) 필요.

**충돌 해결 후**: 버전 벡터를 병합하여 V[k] = max(V_i[k], V_j[k])로 설정하고, 병합을 수행한 노드 l의 V[l]을 1 증가시킨다.

**머클 트리(Merkle Tree)**: 대규모 데이터 항목 집합에서 불일치 항목을 효율적으로 찾기 위한 보조 데이터 구조이다. 데이터 항목의 해시 값을 이진 트리로 구성하여, 루트의 해시 값을 비교하는 것만으로 두 복제본 집합의 차이 존재 여부를 빠르게 확인할 수 있다. 차이가 있으면 트리를 내려가면서 불일치 항목을 O(log n)으로 찾는다.

버전 벡터는 분산 파일 시스템의 장애 처리에서 처음 설계되었으며, 모바일 디바이스의 오프라인 업데이트, Apache Cassandra 등의 분산 저장 시스템에서 널리 사용된다.

## 예시

```
-- 버전 벡터 예시 (노드 N1, N2, N3)

초기 상태: 데이터 d, N1에서 생성
  N1: d, V = [1, 0, 0]

N2에 복제 후, N2에서 업데이트:
  N2: d, V = [1, 1, 0]

N3에도 복제 후, N2와 N3가 동시에 업데이트:
  N2: d, V = [1, 2, 0]  (N2가 업데이트 → V[2] = 1+1 = 2)
  N3: d, V = [1, 1, 1]  (N3가 업데이트 → V[3] = 0+1 = 1)

비교:
  V_N2 = [1, 2, 0], V_N3 = [1, 1, 1]
  V_N2[2] = 2 > V_N3[2] = 1  (N2가 앞서는 부분)
  V_N2[3] = 0 < V_N3[3] = 1  (N3가 앞서는 부분)
  → 충돌 감지! 독립적 업데이트 발생

해결 후 (N1이 병합 수행):
  V = [max(1,1), max(2,1), max(0,1)] = [1, 2, 1]
  N1이 병합 기록: V[1] += 1 → V = [2, 2, 1]

-- 머클 트리로 불일치 탐지:
          Root: h(h1, h2)
         /            \
   h1: h(h3,h4)    h2: h(h5,h6)
      /    \           /    \
  h3:d1  h4:d2    h5:d3  h6:d4

Replica A Root = X, Replica B Root = X → 동일
Replica A Root = X, Replica B Root = Y → 차이 존재
  → 왼쪽 서브트리 비교 → h1이 다름 → h3가 다름 → d1이 불일치!
  O(log n)으로 불일치 데이터 항목 탐지
```

## 관련 개념

- [Eventual Consistency](/knowledge/database/eventual-consistency/)
- [CAP Theorem](/knowledge/database/cap-theorem/)
- [Replication](/knowledge/database/replication/)
- [Bloom Filter](/knowledge/database/bloom-filter/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
