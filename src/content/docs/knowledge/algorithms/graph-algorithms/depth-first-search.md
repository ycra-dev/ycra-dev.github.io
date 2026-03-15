---
title: "깊이 우선 탐색 (Depth-First Search)"
description: "깊이 우선 탐색(DFS)은 그래프를 가능한 한 \"깊이\" 탐색하는 알고리즘으로, 가장 최근에 발견된 정점에서 아직 탐색하지 않은 간선을 따라 진행하다가 더 이상 진행할 수 없으면 역추적(backtrack)한다"
tags: ['Depth First Search', 'Dfs', 'Graph Traversal', 'Timestamp', 'Back Edge', 'Tree Edge']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/depth-first-search
sidebar:
  order: 5
---

## 핵심 개념

DFS는 그래프의 구조적 정보를 파악하는 핵심 알고리즘으로, 위상 정렬과 강연결 요소 분해 등 다양한 알고리즘의 서브루틴으로 활용된다.

**시간 복잡도**: Theta(V + E)

**타임스탬프**:
- v.d (discovery time): 정점 v가 처음 발견된 시간
- v.f (finish time): v의 인접 리스트 탐색이 완료된 시간
- 모든 타임스탬프는 1부터 2|V|까지의 정수

**간선 분류**:
1. **트리 간선(Tree edge)**: DFS 포리스트의 간선. v가 (u,v) 탐색으로 처음 발견될 때.
2. **역간선(Back edge)**: 정점 u를 DFS 트리의 조상 v에 연결. 방향 그래프에서 사이클의 존재를 나타냄.
3. **순방향 간선(Forward edge)**: u를 DFS 트리에서의 자손 v에 연결하는 비트리 간선.
4. **교차 간선(Cross edge)**: 같은 DFS 트리 내 조상-자손 관계가 아닌 정점 간 또는 다른 DFS 트리 간 간선.

**핵심 정리**:
- **괄호 정리(Theorem 20.7)**: 두 정점 u, v의 구간 [u.d, u.f]와 [v.d, v.f]는 완전히 분리되거나 하나가 다른 하나를 완전히 포함한다.
- **백색 경로 정리(Theorem 20.9)**: DFS 포리스트에서 v가 u의 자손이 되려면, u.d 시점에서 u에서 v까지 모든 백색 정점으로 이루어진 경로가 존재해야 한다.
- **무방향 그래프에서는 순방향/교차 간선이 존재하지 않는다** (Theorem 20.10).

## 예시

```
DFS(G)
1  for each vertex u in G.V
2      u.color = WHITE
3      u.pi = NIL
4  time = 0
5  for each vertex u in G.V
6      if u.color == WHITE
7          DFS-VISIT(G, u)

DFS-VISIT(G, u)
1  time = time + 1
2  u.d = time
3  u.color = GRAY
4  for each vertex v in G.Adj[u]
5      if v.color == WHITE
6          v.pi = u
7          DFS-VISIT(G, v)
8  time = time + 1
9  u.f = time
10 u.color = BLACK

간선 색상으로 분류:
- v가 WHITE -> 트리 간선
- v가 GRAY  -> 역간선 (사이클!)
- v가 BLACK -> 순방향 또는 교차 간선
```

## 관련 개념

- [그래프 (Graph)](/knowledge/algorithms/graph/)
- [너비 우선 탐색 (Breadth-First Search)](/knowledge/algorithms/breadth-first-search/)
- [위상 정렬 (Topological Sort)](/knowledge/algorithms/topological-sort/)
- [강한 연결 요소 (Strongly Connected Component)](/knowledge/algorithms/strongly-connected-component/)
