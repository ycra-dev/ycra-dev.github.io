---
title: "Adjacency Matrix"
description: "인접 행렬(Adjacency Matrix)은 그래프 G = (V, E)를 |V| x |V| 행렬 A = (a_ij)로 표현하는 방식으로, 간선 (i, j)가 존재하면 a_ij = 1, 아니면 a_ij = 0이다"
tags: ['Adjacency Matrix', 'Graph Representation', 'Dense Graph', 'Data Structure']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/adjacency-matrix
sidebar:
  order: 3
---

## 핵심 개념

인접 행렬은 밀집 그래프(dense graph)나 두 정점 간 간선 존재 여부를 빠르게 확인해야 할 때 적합하다. 모든 쌍 최단 경로 알고리즘(Floyd-Warshall 등)에서 주로 사용된다.

**메모리 사용량**: Theta(V^2) - 간선 수에 무관
**간선 조회**: O(1) 시간
**모든 간선 순회**: Theta(V^2) 시간

**특성**:
- 무방향 그래프의 인접 행렬은 대칭(symmetric): A = A^T
  - 대각선 위의 원소만 저장하면 메모리를 거의 절반으로 줄일 수 있음
- 가중치 그래프에서는 a_ij에 간선 가중치 w(i, j)를 저장
  - 간선이 없는 경우 NIL, 0, 또는 무한대를 저장
- 비가중치 그래프에서는 각 원소가 1비트만 필요

**인접 리스트와 비교**:
| 항목 | 인접 리스트 | 인접 행렬 |
|------|-------------|-----------|
| 공간 | Theta(V+E) | Theta(V^2) |
| 간선 조회 | O(degree) | O(1) |
| 모든 간선 | Theta(V+E) | Theta(V^2) |
| 적합한 그래프 | 희소 | 밀집 |

## 예시

```
무방향 그래프:
  1 --- 2
  |     |
  3 --- 4

인접 행렬:
     1  2  3  4
  1 [0, 1, 1, 0]
  2 [1, 0, 0, 1]
  3 [1, 0, 0, 1]
  4 [0, 1, 1, 0]

가중치 방향 그래프 인접 행렬:
     1    2    3    4
  1 [0,   5,  10,   ∞]
  2 [∞,   0,   ∞,   3]
  3 [∞,   ∞,   0,   1]
  4 [∞,   ∞,   ∞,   0]
```

## 관련 개념

- [Graph](/knowledge/algorithms/graph/)
- [Adjacency List](/knowledge/algorithms/adjacency-list/)
- [Floyd-Warshall Algorithm](/knowledge/algorithms/floyd-warshall-algorithm/)
- [All-Pairs Shortest Paths](/knowledge/algorithms/all-pairs-shortest-paths/)
- [Data Structure](/knowledge/algorithms/data-structure/)
