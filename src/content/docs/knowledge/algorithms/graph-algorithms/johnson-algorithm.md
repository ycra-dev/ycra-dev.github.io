---
title: "Johnson Algorithm"
description: "존슨 알고리즘은 희소 그래프에서 모든 쌍 최단 경로를 O(V^2 lg V + VE) 시간에 계산하는 알고리즘으로, 재가중(reweighting) 기법을 통해 음수 간선을 양수로 변환한 뒤 Dijkstra를 반복 실행한다"
tags: ['Johnson Algorithm', 'All Pairs Shortest Paths', 'Reweighting', 'Bellman Ford', 'Dijkstra']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/johnson-algorithm
sidebar:
  order: 17
---

## 핵심 개념

존슨 알고리즘은 Bellman-Ford와 Dijkstra를 서브루틴으로 결합하여, 음수 가중치를 허용하면서도 Dijkstra의 효율성을 활용한다.

**동작 원리**:
1. 새 정점 s를 추가하고 s에서 모든 정점으로 가중치 0인 간선 생성 -> G'
2. G'에서 Bellman-Ford를 실행하여 h(v) = delta(s, v) 계산
   - 음수 사이클이 있으면 보고하고 종료
3. 재가중: w_hat(u, v) = w(u, v) + h(u) - h(v) >= 0
4. 각 정점 u에서 재가중된 그래프에 Dijkstra 실행
5. 원래 가중치로 복원: d_uv = delta_hat(u, v) - h(u) + h(v)

**재가중 정확성 (Lemma 23.1)**:
- w_hat(p) = w(p) + h(v_0) - h(v_k) (경로의 시작/끝 정점에만 의존)
- w를 사용한 최단 경로 = w_hat를 사용한 최단 경로 (경로 순서 보존)
- 음수 사이클도 보존됨

**비음수 보장**: 삼각 부등식 h(v) <= h(u) + w(u, v)에 의해
w_hat(u, v) = w(u, v) + h(u) - h(v) >= 0

**시간 복잡도**:
- Bellman-Ford: O(VE)
- 재가중: O(E)
- Dijkstra x |V|: O(V^2 lg V + VE) (피보나치 힙) 또는 O(VE lg V) (이진 힙)
- 총: O(V^2 lg V + VE) - 희소 그래프에서 Floyd-Warshall(Theta(V^3))보다 빠름

## 예시

```
JOHNSON(G, w)
1  compute G' with new vertex s and zero-weight edges from s
2  if BELLMAN-FORD(G', w, s) == FALSE
3      print "negative-weight cycle"
4  else for each vertex v in G'.V
5      set h(v) = delta(s, v)
6  for each edge (u, v) in G'.E
7      w_hat(u, v) = w(u, v) + h(u) - h(v)
8  let D be a new |V| x |V| matrix
9  for each vertex u in G.V
10     run DIJKSTRA(G, w_hat, u) to compute delta_hat(u, v)
11     for each vertex v in G.V
12         d_uv = delta_hat(u, v) + h(v) - h(u)
13 return D

재가중 예시:
  원래: w(a,b) = -2, h(a) = 0, h(b) = -2
  재가중: w_hat(a,b) = -2 + 0 - (-2) = 0 >= 0
```

## 관련 개념

- [All-Pairs Shortest Paths](/knowledge/algorithms/all-pairs-shortest-paths/)
- [Floyd-Warshall Algorithm](/knowledge/algorithms/floyd-warshall-algorithm/)
- [Bellman-Ford Algorithm](/knowledge/algorithms/bellman-ford-algorithm/)
- [Dijkstra Algorithm](/knowledge/algorithms/dijkstra-algorithm/)
- [Shortest Path](/knowledge/algorithms/shortest-path/)
