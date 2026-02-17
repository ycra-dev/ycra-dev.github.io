---
title: "Breadth-First Search"
description: "너비 우선 탐색(BFS)은 주어진 소스 정점 s로부터 그래프의 모든 도달 가능한 정점을 층별로(wave) 탐색하는 알고리즘으로, 각 정점까지의 최단 거리(간선 수 기준)를 계산한다"
tags: ['Breadth First Search', 'Bfs', 'Graph Traversal', 'Shortest Path', 'Queue']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/breadth-first-search
sidebar:
  order: 4
---

## 핵심 개념

BFS는 그래프 탐색의 가장 단순하면서도 중요한 알고리즘으로, Prim의 MST 알고리즘과 Dijkstra의 최단 경로 알고리즘의 원형(archetype)이다.

**동작 원리**:
1. 소스 정점 s에서 시작하여 거리 1인 모든 정점을 먼저 방문
2. 그 다음 거리 2인 정점, 거리 3인 정점 순서로 방문
3. FIFO 큐를 사용하여 탐색 경계(frontier)를 관리

**정점 색상 체계**:
- WHITE: 아직 발견되지 않은 정점
- GRAY: 발견되었으나 인접 리스트가 완전히 탐색되지 않은 정점 (경계에 있음)
- BLACK: 인접 리스트가 완전히 탐색된 정점

**시간 복잡도**: O(V + E) - 인접 리스트 표현에서 선형 시간

**정확성(Theorem 20.5)**: BFS는 소스 s로부터 모든 정점 v까지의 최단 경로 거리 delta(s, v)를 올바르게 계산하며, 너비 우선 트리(breadth-first tree)를 구성한다.

**응용**:
- 비가중치 그래프에서의 최단 경로
- 이분 그래프(bipartite graph) 판별
- 연결 성분(connected components) 찾기
- 트리의 지름(diameter) 계산

## 예시

```
BFS(G, s)
1  for each vertex u in G.V - {s}
2      u.color = WHITE
3      u.d = infinity
4      u.pi = NIL
5  s.color = GRAY
6  s.d = 0
7  s.pi = NIL
8  Q = empty
9  ENQUEUE(Q, s)
10 while Q != empty
11     u = DEQUEUE(Q)
12     for each vertex v in G.Adj[u]
13         if v.color == WHITE
14             v.color = GRAY
15             v.d = u.d + 1
16             v.pi = u
17             ENQUEUE(Q, v)
18     u.color = BLACK

탐색 예시 (소스 = s):
거리 0: {s}
거리 1: {a, b}     <- s의 이웃
거리 2: {c, d, e}  <- a, b의 이웃 중 미방문
거리 3: {f}        <- c, d, e의 이웃 중 미방문
```

## 관련 개념

- [Graph](/knowledge/algorithms/graph/)
- [Depth-First Search](/knowledge/algorithms/depth-first-search/)
- [Dijkstra Algorithm](/knowledge/algorithms/dijkstra-algorithm/)
- [Shortest Path](/knowledge/algorithms/shortest-path/)
- [Adjacency List](/knowledge/algorithms/adjacency-list/)
