---
title: "Distributed Hash Table"
description: "분산 해시 테이블(DHT, Distributed Hash Table)은 키-값 쌍을 다수의 노드에 분산 저장하고, 키를 통해 해당 값의 위치를 O(log N) 홉으로 효율적으로 찾을 수 있는 분산 시스템이다"
tags: ['Dht', 'Chord', 'Peer To Peer', 'Consistent Hashing', 'Key Lookup']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/distributed-hash-table
sidebar:
  order: 4
---

## 핵심 개념

**Chord 시스템**:
- m-bit 식별자 공간(보통 128 또는 160비트)을 사용하여 노드와 키에 무작위 식별자 할당
- 키 k는 id ≥ k인 가장 작은 식별자를 가진 노드 succ(k)가 관리
- 노드들은 논리적 링을 형성

**핑거 테이블(Finger Table)**: 효율적인 검색의 핵심. 노드 p의 핑거 테이블의 i번째 항목: FTp[i] = succ(p + 2^(i-1)). 각 항목이 지수적으로 증가하는 거리의 노드를 가리키므로, 검색 시 한 번에 남은 거리의 절반을 건너뛸 수 있다. → O(log N) 검색.

**키 검색 과정**: 키 k를 찾기 위해, 노드 p가 핑거 테이블에서 FTp[j] ≤ k < FTp[j+1]인 q = FTp[j]를 찾아 요청을 전달. q에서 반복하여 최종적으로 k를 담당하는 노드에 도달.

**노드 합류/이탈**: 합류 시 succ(p+1)을 검색하여 링에 삽입. 각 노드는 주기적으로 후속 노드의 전임자를 확인하여 핑거 테이블을 갱신.

**네트워크 근접성 최적화**:
- 토폴로지 기반 식별자 할당 (어려움)
- 근접성 라우팅: 각 핑거 테이블 항목에 여러 후보를 유지하고 가장 가까운 노드 선택
- 근접성 이웃 선택: 조인 시 가장 가까운 노드를 이웃으로 선택

## 예시

```python
class ChordNode:
    def __init__(self, node_id, n_bits):
        self.id = node_id
        self.n_bits = n_bits
        self.finger_table = [None] * (n_bits + 1)  # FT[0]=전임자

    def finger(self, i):
        """succ(self.id + 2^(i-1)) 계산"""
        target = (self.id + pow(2, i-1)) % (2 ** self.n_bits)
        return self.find_successor(target)

    def lookup(self, key):
        """키 k를 담당하는 노드 검색"""
        if self.is_responsible(key):
            return self.id
        # 핑거 테이블에서 key에 가장 가까운 선행 노드 찾기
        for i in range(self.n_bits, 0, -1):
            if self.finger_table[i] <= key:
                return self.finger_table[i].lookup(key)

# 예: 32개 노드 링에서 k=26 검색 (노드 1에서 시작)
# 노드1 → FT[5]=18 → 노드18 → FT[2]=20 → 노드20 → FT[1]=21 → 노드28
# 4홉으로 검색 완료 (O(log 32) = O(5))
```

## 관련 개념

- [Flat Naming](/knowledge/distributed-systems/flat-naming/)
- [Name Resolution](/knowledge/distributed-systems/name-resolution/)
- [Gossip Protocol](/knowledge/distributed-systems/gossip-protocol/)
