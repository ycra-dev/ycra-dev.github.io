---
title: "Bellman-Ford Algorithm"
description: "벨만-포드 알고리즘은 음수 가중치 간선을 허용하는 가중치 방향 그래프에서 단일 소스 최단 경로를 구하는 알고리즘으로, 소스에서 도달 가능한 음수 가중치 사이클의 존재 여부도 감지한다"
tags: ['Bellman Ford Algorithm', 'Shortest Path', 'Negative Weight', 'Single Source', 'Relaxation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/bellman-ford-algorithm
sidebar:
  order: 12
---

## 핵심 개념

벨만-포드 알고리즘은 간단하면서도 강력한 알고리즘으로, Dijkstra가 처리할 수 없는 음수 가중치 간선을 처리할 수 있다.

**동작 원리**:
1. INITIALIZE-SINGLE-SOURCE로 모든 정점의 d 값을 infinity, s.d = 0으로 초기화
2. |V| - 1번 반복하여 모든 간선을 완화(relax)
3. 한 번 더 모든 간선을 검사하여 음수 사이클 존재 여부를 판별

**시간 복잡도**: O(VE)
- 초기화: Theta(V)
- |V|-1번 반복 x 모든 간선 완화: O(VE)
- 음수 사이클 검사: O(V + E)

**정확성 (Theorem 22.4)**:
- 음수 사이클이 없으면: v.d = delta(s, v), 선행자 부분그래프는 최단 경로 트리, TRUE 반환
- 음수 사이클이 있으면: FALSE 반환
- 핵심: 경로 완화 성질(path-relaxation property)에 의해, |V|-1번 반복 후 최단 경로의 모든 간선이 순서대로 완화됨

**음수 사이클 감지 원리**:
- |V|-1번 반복 후 v.d = delta(s, v)라면, 삼각 부등식에 의해 v.d <= u.d + w(u, v)
- 만약 v.d > u.d + w(u, v)인 간선이 있으면, 음수 사이클이 존재

## 예시

```
BELLMAN-FORD(G, w, s)
1  INITIALIZE-SINGLE-SOURCE(G, s)
2  for i = 1 to |G.V| - 1
3      for each edge (u, v) in G.E
4          RELAX(u, v, w)
5  for each edge (u, v) in G.E
6      if v.d > u.d + w(u, v)
7          return FALSE    // 음수 사이클 존재
8  return TRUE

예시 (소스 = s):
  s --6--> a --(-2)--> b
  |  \     ^           |
  |   5    |3          |(-3)
  |    \   |           v
  +--7--> c ----4----> d

Pass 1: s.d=0, a.d=6, c.d=7 (또는 5)
Pass 2: b.d=4, d.d=7
Pass 3: 변경 없으면 조기 종료 가능
Pass 4: 최종 확인
```

## 관련 개념

- [Shortest Path](/knowledge/algorithms/shortest-path/)
- [Relaxation](/knowledge/algorithms/relaxation/)
- [Negative Weight Cycle](/knowledge/algorithms/negative-weight-cycle/)
- [Dijkstra Algorithm](/knowledge/algorithms/dijkstra-algorithm/)
- [Graph](/knowledge/algorithms/graph/)
