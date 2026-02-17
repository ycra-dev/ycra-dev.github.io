---
title: "Kruskal Algorithm"
description: "크루스칼 알고리즘은 가중치가 가장 작은 간선부터 순서대로 선택하되, 사이클을 형성하지 않는 간선만 추가하여 최소 신장 트리를 구성하는 탐욕 알고리즘이다"
tags: ['Kruskal Algorithm', 'Minimum Spanning Tree', 'Greedy Algorithm', 'Disjoint Set', 'Union Find']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/kruskal-algorithm
sidebar:
  order: 21
---

## 핵심 개념

크루스칼 알고리즘에서 집합 A는 포리스트(forest)를 형성하며, 알고리즘이 진행됨에 따라 서로 다른 트리를 병합하여 하나의 신장 트리를 완성한다.

**동작 원리**:
1. 각 정점을 독립적인 트리(집합)로 초기화
2. 모든 간선을 가중치의 오름차순으로 정렬
3. 가장 가벼운 간선부터 순서대로 검사
4. 두 끝점이 서로 다른 트리에 속하면 간선을 추가하고 두 트리를 병합
5. 같은 트리에 속하면 사이클이 생기므로 무시

**서로소 집합(Disjoint-Set) 연산 활용**:
- MAKE-SET(v): 각 정점을 단독 집합으로 생성
- FIND-SET(u): u가 속한 집합의 대표 원소 반환
- UNION(u, v): u와 v가 속한 두 집합을 병합

**시간 복잡도**: O(E lg E) = O(E lg V)
- 간선 정렬: O(E lg E)
- 서로소 집합 연산: O((V + E) * alpha(V)), 여기서 alpha는 매우 느리게 증가하는 역 Ackermann 함수
- |E| < |V|^2이므로 lg|E| = O(lg V)

**정확성**: Corollary 21.2에 의해, 서로 다른 두 컴포넌트를 연결하는 경량 간선은 항상 안전한 간선이다.

## 예시

```
MST-KRUSKAL(G, w)
1  A = empty set
2  for each vertex v in G.V
3      MAKE-SET(v)
4  create a single list of edges in G.E
5  sort the list of edges into increasing order by weight w
6  for each edge (u, v) taken from the sorted list in order
7      if FIND-SET(u) != FIND-SET(v)
8          A = A union {(u, v)}
9          UNION(u, v)
10 return A

실행 예시 (간선 정렬 후):
  (a,d,1) -> 추가, 다른 컴포넌트
  (d,b,2) -> 추가, 다른 컴포넌트
  (c,f,2) -> 추가, 다른 컴포넌트
  (a,b,4) -> 무시, 같은 컴포넌트 (a-d-b)
  (b,e,5) -> 추가, 다른 컴포넌트
  ...
```

## 관련 개념

- [Minimum Spanning Tree](/knowledge/algorithms/minimum-spanning-tree/)
- [Prim Algorithm](/knowledge/algorithms/prim-algorithm/)
- [Greedy Algorithm](/knowledge/algorithms/greedy-algorithm/)
- [Safe Edge](/knowledge/algorithms/safe-edge/)
