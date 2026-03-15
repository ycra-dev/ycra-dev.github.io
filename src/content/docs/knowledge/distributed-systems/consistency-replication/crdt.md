---
title: "CRDT (충돌 없는 복제 데이터 타입)"
description: "CRDT(Conflict-Free Replicated Data Type)는 여러 사이트에서 복제될 수 있으며, 추가적인 조정(coordination) 없이 동시 업데이트를 허용하면서도 모든 복제본이 동일한 상태로 수렴하는 데이터 타입이다(Shapiro et al"
tags: ['Crdt', 'Conflict Free', 'Replicated Data Type', 'Strong Eventual Consistency']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/crdt
sidebar:
  order: 5
---

## 핵심 개념

CRDT는 강한 최종 일관성(strong eventual consistency)을 보장한다. 일반 최종 일관성과 달리, 충돌 업데이트가 발생해도 복제본들이 동일한 상태를 유지한다.

**핵심 원리**: 동시 업데이트의 의미(semantics)를 타입별로 정의하여, 업데이트의 적용 순서와 무관하게 동일한 최종 상태에 도달하도록 설계.

**CRDT의 종류와 예시**:
- **Last-Writer-Wins Register**: NTP 기반 근사 시간과 랜덤 수로 결정론적 선택
- **G-Counter (Grow-only Counter)**: 각 복제본이 자신의 카운터만 증가. 합계 = 모든 카운터의 합
- **PN-Counter**: 증가/감소 각각의 G-Counter를 유지. 값 = 증가 합 - 감소 합
- **G-Set (Grow-only Set)**: 요소 추가만 가능. 합집합으로 병합
- **2P-Set**: 추가 세트와 제거 세트를 분리 유지. 값 = 추가 - 제거
- **OR-Set (Observed-Remove Set)**: 태그 기반으로 추가/제거를 추적하여 add-remove 충돌 해결

**장점**: 조정 비용 제거, 가용성 극대화, 네트워크 분할에서도 동작.
**한계**: 모든 데이터 타입에 적용 가능하지 않으며, 충돌 해결 의미가 항상 애플리케이션 기대와 일치하지 않을 수 있음.

## 예시

```python
# G-Counter (Grow-only Counter) CRDT
class GCounter:
    def __init__(self, n_replicas, my_id):
        self.counts = [0] * n_replicas
        self.id = my_id

    def increment(self):
        self.counts[self.id] += 1

    def value(self):
        return sum(self.counts)

    def merge(self, other):
        """충돌 없이 병합: 각 위치의 최대값 취함"""
        for i in range(len(self.counts)):
            self.counts[i] = max(self.counts[i], other.counts[i])

# 예: 3개 복제본
# A: [5, 0, 0], B: [0, 3, 0], C: [0, 0, 2]
# 병합 후 모든 복제본: [5, 3, 2] → 값 = 10

# 2P-Set (Two-Phase Set) CRDT
class TwoPSet:
    def __init__(self):
        self.add_set = set()     # 추가된 요소
        self.remove_set = set()  # 제거된 요소

    def add(self, elem):
        self.add_set.add(elem)

    def remove(self, elem):
        if elem in self.add_set:
            self.remove_set.add(elem)

    def lookup(self):
        return self.add_set - self.remove_set

    def merge(self, other):
        self.add_set |= other.add_set
        self.remove_set |= other.remove_set
```

## 관련 개념

- [최종 일관성 (Eventual Consistency)](/knowledge/distributed-systems/eventual-consistency/)
- [인과적 일관성 (Causal Consistency)](/knowledge/distributed-systems/causal-consistency/)
- [복제 관리 (Replica Management)](/knowledge/distributed-systems/replica-management/)
