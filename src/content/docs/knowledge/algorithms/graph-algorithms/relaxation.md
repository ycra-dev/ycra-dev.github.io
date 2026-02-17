---
title: "Relaxation"
description: "완화(Relaxation)는 간선 (u, v)에 대해 u를 경유하여 v에 도달하는 것이 현재까지 알려진 v까지의 최단 경로보다 더 짧은지 검사하고, 더 짧다면 v"
tags: ['Relaxation', 'Shortest Path', 'Upper Bound', 'Edge Relaxation', 'Convergence']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/relaxation
sidebar:
  order: 10
---

## 핵심 개념

완화는 단일 소스 최단 경로 알고리즘(Bellman-Ford, Dijkstra, DAG-SHORTEST-PATHS)의 핵심 기법이다. 모든 알고리즘은 초기화 후 간선을 반복적으로 완화하며, 알고리즘 간 차이는 완화 순서와 횟수에 있다.

**완화의 기본 동작 (O(1) 시간)**:
- v.d > u.d + w(u, v)이면: v.d를 u.d + w(u, v)로 갱신, v.pi = u로 설정
- 그렇지 않으면: 변경 없음

**완화의 핵심 성질들**:
1. **삼각 부등식(Triangle inequality)**: delta(s, v) <= delta(s, u) + w(u, v)
2. **상한 성질(Upper-bound property)**: 항상 v.d >= delta(s, v), 한번 달성되면 변하지 않음
3. **무경로 성질(No-path property)**: s에서 v까지 경로가 없으면 v.d = delta(s, v) = infinity
4. **수렴 성질(Convergence property)**: u.d = delta(s, u)인 상태에서 (u, v) 완화 -> v.d = delta(s, v)
5. **경로 완화 성질(Path-relaxation property)**: 최단 경로의 간선을 순서대로 완화하면 최종적으로 올바른 값
6. **선행자 부분그래프 성질**: v.d = delta(s, v) for all v이면, 선행자 부분그래프가 최단 경로 트리

**각 알고리즘에서의 완화**:
- **Bellman-Ford**: 모든 간선을 |V|-1번 완화
- **DAG-SHORTEST-PATHS**: 각 간선을 정확히 한 번 완화 (위상 순서)
- **Dijkstra**: 각 간선을 정확히 한 번 완화 (탐욕적 순서)

## 예시

```
RELAX(u, v, w)
1  if v.d > u.d + w(u, v)
2      v.d = u.d + w(u, v)
3      v.pi = u

INITIALIZE-SINGLE-SOURCE(G, s)
1  for each vertex v in G.V
2      v.d = infinity
3      v.pi = NIL
4  s.d = 0

완화 예시:
  (a) v.d = 9, u.d = 5, w(u,v) = 2
      5 + 2 = 7 < 9 이므로 v.d = 7로 갱신

  (b) v.d = 6, u.d = 5, w(u,v) = 2
      5 + 2 = 7 > 6 이므로 변경 없음
```

## 관련 개념

- [Shortest Path](/knowledge/algorithms/shortest-path/)
- [Bellman-Ford Algorithm](/knowledge/algorithms/bellman-ford-algorithm/)
- [Dijkstra Algorithm](/knowledge/algorithms/dijkstra-algorithm/)
- [Negative Weight Cycle](/knowledge/algorithms/negative-weight-cycle/)
