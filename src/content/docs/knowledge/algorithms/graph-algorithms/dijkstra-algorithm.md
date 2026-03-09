---
title: "Dijkstra Algorithm"
description: "다익스트라 알고리즘은 모든 간선 가중치가 음이 아닌 가중치 방향 그래프에서 단일 소스 최단 경로를 구하는 탐욕 알고리즘으로, 최소 우선순위 큐를 사용하여 가장 가까운 미확정 정점을 반복적으로 선택한다"
tags: ['Dijkstra Algorithm', 'Shortest Path', 'Greedy Algorithm', 'Priority Queue', 'Non Negative Weights']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/dijkstra-algorithm
sidebar:
  order: 11
---

## 핵심 개념

다익스트라 알고리즘은 BFS의 가중치 그래프 확장으로 이해할 수 있다. BFS가 단위 시간에 간선을 통과하는 "파동"이라면, Dijkstra는 간선 가중치에 비례하는 시간에 통과하는 파동이다.

**동작 원리**:
1. 최단 경로가 확정된 정점 집합 S를 유지
2. V - S에서 최소 d 값을 가진 정점 u를 추출하여 S에 추가
3. u에서 나가는 모든 간선을 완화
4. Q가 빌 때까지 반복

**시간 복잡도**:
| 우선순위 큐 | INSERT | EXTRACT-MIN | DECREASE-KEY | 총 시간 |
|---|---|---|---|---|
| 선형 배열 | O(1) | O(V) | O(1) | O(V^2 + E) = O(V^2) |
| 이진 힙 | O(lg V) | O(lg V) | O(lg V) | O((V+E) lg V) |
| 피보나치 힙 | O(1) amort. | O(lg V) amort. | O(1) amort. | O(V lg V + E) |

**정확성 (Theorem 22.6)**: 각 정점 u가 S에 추가될 때 u.d = delta(s, u)임을 귀납법으로 증명. 핵심: 음수 가중치가 없으므로 delta(s, y) <= delta(s, u)가 보장됨.

**제한사항**: 음수 가중치 간선이 있으면 정확한 결과를 보장하지 않음. 음수 가중치가 있는 경우 Bellman-Ford를 사용해야 한다.

**유사성**:
- BFS와 유사: S는 BFS의 black 정점 집합에 대응
- Prim 알고리즘과 유사: 둘 다 최소 우선순위 큐로 "가장 가벼운" 정점 선택

## 예시

```
DIJKSTRA(G, w, s)
1  INITIALIZE-SINGLE-SOURCE(G, s)
2  S = empty set
3  Q = empty
4  for each vertex u in G.V
5      INSERT(Q, u)
6  while Q != empty
7      u = EXTRACT-MIN(Q)
8      S = S union {u}
9      for each vertex v in G.Adj[u]
10         RELAX(u, v, w)
11         if the call of RELAX decreased v.d
12             DECREASE-KEY(Q, v, v.d)

실행 예시 (소스 = s):
  Step 1: S={s}, s.d=0
  Step 2: S={s,y}, y.d=5
  Step 3: S={s,y,z}, z.d=7
  Step 4: S={s,y,z,t}, t.d=8
  Step 5: S={s,y,z,t,x}, x.d=9
```

## 관련 개념

- [Shortest Path](/knowledge/algorithms/shortest-path/)
- [Relaxation](/knowledge/algorithms/relaxation/)
- [Bellman-Ford Algorithm](/knowledge/algorithms/bellman-ford-algorithm/)
- [Prim Algorithm](/knowledge/algorithms/prim-algorithm/)
- [Priority Queue](/knowledge/algorithms/priority-queue/)
- [Greedy Algorithm](/knowledge/algorithms/greedy-algorithm/)
