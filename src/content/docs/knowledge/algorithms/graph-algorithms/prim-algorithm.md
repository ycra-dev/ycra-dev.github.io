---
title: "프림 알고리즘 (Prim Algorithm)"
description: "프림 알고리즘은 임의의 루트 정점에서 시작하여, 현재 트리와 트리 밖의 정점을 연결하는 가장 가벼운 간선을 반복적으로 추가하여 최소 신장 트리를 성장시키는 탐욕 알고리즘이다"
tags: ['Prim Algorithm', 'Minimum Spanning Tree', 'Greedy Algorithm', 'Priority Queue']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/prim-algorithm
sidebar:
  order: 22
---

## 핵심 개념

프림 알고리즘에서 집합 A는 항상 하나의 트리를 형성한다. Dijkstra의 최단 경로 알고리즘과 유사한 구조를 가진다.

**동작 원리**:
1. 임의의 루트 정점 r에서 시작 (r.key = 0, 나머지 정점의 key = infinity)
2. 최소 우선순위 큐 Q에서 키 값이 가장 작은 정점 u를 추출
3. u의 인접 정점 v 중 Q에 속하고 w(u,v) < v.key인 경우 v.key를 갱신
4. Q가 빌 때까지 반복

**핵심 속성**:
- v.key: 트리에 있는 어떤 정점과 v를 연결하는 간선의 최소 가중치
- v.pi: 트리에서 v의 부모 정점
- A = {(v, v.pi) : v in V - {r} - Q}

**시간 복잡도**:
| 우선순위 큐 구현 | 시간 복잡도 |
|---|---|
| 이진 힙 | O(E lg V) |
| 피보나치 힙 | O(E + V lg V) |
| 선형 배열 | O(V^2) |

피보나치 힙 구현이 |E|가 |V|보다 점근적으로 빠르게 증가할 때 유리하다.

**Corollary 21.2를 통한 정확성**: 트리 A를 떠나는 경량 간선은 항상 안전한 간선이므로, 매 단계에서 추가되는 간선은 MST의 일부이다.

## 예시

```
MST-PRIM(G, w, r)
1  for each vertex u in G.V
2      u.key = infinity
3      u.pi = NIL
4  r.key = 0
5  Q = empty
6  for each vertex u in G.V
7      INSERT(Q, u)
8  while Q != empty
9      u = EXTRACT-MIN(Q)
10     for each vertex v in G.Adj[u]
11         if v in Q and w(u,v) < v.key
12             v.pi = u
13             v.key = w(u,v)
14             DECREASE-KEY(Q, v, w(u,v))

실행 과정 (루트 = a):
  Step 1: 추출 a(key=0), 갱신 이웃
  Step 2: 추출 d(key=1), 갱신 이웃
  Step 3: 추출 b(key=2), 갱신 이웃
  ...
```

## 관련 개념

- [최소 신장 트리 (Minimum Spanning Tree)](/knowledge/algorithms/minimum-spanning-tree/)
- [크루스칼 알고리즘 (Kruskal Algorithm)](/knowledge/algorithms/kruskal-algorithm/)
- [다익스트라 알고리즘 (Dijkstra Algorithm)](/knowledge/algorithms/dijkstra-algorithm/)
- [우선순위 큐 (Priority Queue)](/knowledge/algorithms/priority-queue/)
- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
