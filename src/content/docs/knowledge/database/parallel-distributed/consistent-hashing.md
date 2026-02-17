---
title: "Consistent Hashing"
description: "일관된 해싱(Consistent Hashing)은 키와 노드 식별자를 동일한 해시 공간에 매핑하여, 노드의 추가나 제거 시 최소한의 데이터만 재분배되도록 하는 분산 해시 기반 파티셔닝 기법이다"
tags: ['Distributed Hash Table', 'Virtual Nodes', 'Load Balancing', 'Partitioning']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/consistent-hashing
sidebar:
  order: 11
---

## 핵심 개념

일관된 해싱에서는 키가 큰 해시 공간(예: 32비트 정수)에 해싱된다. 노드(또는 가상 노드) 식별자도 동일한 해시 공간에 해싱된다. 해시 값은 시계 면과 유사한 원형(cycle)으로 취급되며, 최대 해시 값 다음에 0이 온다.

키 k_i는 해시 공간의 원에서 h(k_i)로부터 반시계 방향으로 이동했을 때 가장 가까운 노드 n_j에 매핑된다. 즉, h(n_j)가 h(k_i)보다 작거나 같은 값 중 가장 큰 노드에 할당된다.

**분산 해시 테이블(DHT)**: 마스터 노드나 라우터 없이, 각 참여 노드가 몇 개의 피어 노드를 추적하고 협력적으로 라우팅을 구현한다. 새 노드가 완전한 피어-투-피어 방식으로 시스템에 참여할 수 있다.

**노드 추가/제거 시의 장점**: 전통적 해시 파티셔닝(h(key) mod n)에서는 노드 수 n이 변경되면 거의 모든 데이터를 재분배해야 한다. 일관된 해싱에서는 노드 추가 시 인접한 노드의 키 일부만 이동하면 되므로, 재분배 비용이 O(K/n)이다(K는 전체 키 수, n은 노드 수).

**가상 노드**: 물리 노드당 여러 가상 노드를 생성하여 해시 공간에 분산 배치하면, 부하 균형이 개선된다. 물리 노드의 성능에 비례하여 가상 노드 수를 조절할 수도 있다.

## 예시

```
해시 공간: 0 ~ 31 (원형)

노드 해시값: A=5, B=12, C=22, D=28

원형 해시 공간:
         0
    28(D) . . 5(A)
  .                .
22(C)              12(B)
  .                .
    .   .   .   .

키 할당 (반시계 방향으로 가장 가까운 노드):
h(k1) = 3  → Node A (5가 가장 가까움)
h(k2) = 8  → Node B (12가 가장 가까움)
h(k3) = 15 → Node C (22가 가장 가까움)
h(k4) = 25 → Node D (28이 가장 가까움)
h(k5) = 30 → Node A (5가 가장 가까움, 원형이므로)

-- Node E(hash=18)가 추가될 때:
h(k3) = 15 → Node E로 이동 (기존 Node C → Node E)
나머지 키는 변경 없음 → 최소한의 재분배
```

## 관련 개념

- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Parallel Key-Value Store](/knowledge/database/parallel-key-value-store/)
- [Distributed File System](/knowledge/database/distributed-file-system/)
