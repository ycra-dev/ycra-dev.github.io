---
title: "Minimum Spanning Tree"
description: "최소 신장 트리(MST)는 연결된 무방향 가중치 그래프 G = (V, E)에서 모든 정점을 연결하면서 총 간선 가중치의 합이 최소인 비순환 부분 집합 T를 구성하는 트리이다"
tags: ['Minimum Spanning Tree', 'Mst', 'Spanning Tree', 'Greedy Algorithm', 'Weighted Graph']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/minimum-spanning-tree
sidebar:
  order: 18
---

## 핵심 개념

MST 문제는 n개의 핀을 n-1개의 와이어로 연결하되 총 비용을 최소화하는 회로 설계 등 실용적 문제에 활용된다.

**일반적 MST 방법 (GENERIC-MST)**:
- 간선 집합 A를 빈 집합으로 초기화
- A가 신장 트리를 형성할 때까지, A에 "안전한 간선(safe edge)"을 반복적으로 추가
- 루프 불변식: A는 항상 어떤 MST의 부분 집합

**주요 정리 (Theorem 21.1)**:
A가 MST의 부분 집합이고, (S, V-S)가 A를 존중(respect)하는 절단(cut)이며, (u, v)가 이 절단을 횡단하는 경량 간선(light edge)이면, (u, v)는 A에 대해 안전한 간선이다.

**두 가지 주요 알고리즘**:
- **Kruskal 알고리즘**: O(E lg V) - 가장 가벼운 간선부터 추가
- **Prim 알고리즘**: O(E lg V) (이진 힙) 또는 O(E + V lg V) (피보나치 힙)

**MST의 성질**:
- 정확히 |V| - 1개의 간선을 포함
- 고유하지 않을 수 있음 (동일 가중치의 간선이 있을 경우)
- 모든 간선 가중치가 양수이면, 모든 정점을 연결하고 최소 총 가중치를 가지는 부분 집합은 반드시 트리

## 예시

```
GENERIC-MST(G, w)
1  A = empty set
2  while A does not form a spanning tree
3      find an edge (u, v) that is safe for A
4      A = A union {(u, v)}
5  return A

예시 그래프:
    4       8
 a --- b --- c
 |   / |     |
1| 2/  |7   2|
 | /   |     |
 d --- e --- f
    9       6

MST 간선 (총 가중치 = 18):
 a-d(1), d-b(2), c-f(2), e-f(6), b-e(7)
 (a-b(4)는 a와 b가 이미 a-d-b 경로로 연결되어 사이클 생성, 불가)
```

## 관련 개념

- [Kruskal Algorithm](/knowledge/algorithms/kruskal-algorithm/)
- [Prim Algorithm](/knowledge/algorithms/prim-algorithm/)
- [Cut Property](/knowledge/algorithms/cut-property/)
- [Safe Edge](/knowledge/algorithms/safe-edge/)
- [Greedy Algorithm](/knowledge/algorithms/greedy-algorithm/)
- [Graph](/knowledge/algorithms/graph/)
