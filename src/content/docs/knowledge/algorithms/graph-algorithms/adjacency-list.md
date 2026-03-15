---
title: "인접 리스트 (Adjacency List)"
description: "인접 리스트(Adjacency List)는 그래프 G = (V, E)를 |V|개의 리스트 배열로 표현하는 방식으로, 각 정점 u에 대해 Adj[u]가 u에 인접한 모든 정점의 리스트를 포함한다"
tags: ['Adjacency List', 'Graph Representation', 'Sparse Graph', 'Data Structure']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/adjacency-list
sidebar:
  order: 2
---

## 핵심 개념

인접 리스트 표현은 희소 그래프(sparse graph)에 적합한 표준 그래프 표현 방식이다. 대부분의 그래프 알고리즘 교재에서 기본 입력 형식으로 가정한다.

**메모리 사용량**: Theta(V + E)
- 방향 그래프: 모든 인접 리스트 길이의 합 = |E|
- 무방향 그래프: 모든 인접 리스트 길이의 합 = 2|E| (각 간선이 양쪽 모두에 등장)

**장점**:
- 희소 그래프에서 공간 효율적
- 모든 간선 순회가 Theta(V + E) 시간
- 가중치 그래프로 쉽게 확장 가능 (가중치를 인접 리스트에 함께 저장)

**단점**:
- 특정 간선 (u, v)의 존재 여부를 확인하려면 Adj[u]를 순차 검색해야 함
- 해시 테이블로 대체하면 평균 O(1)에 간선 조회 가능 (Exercise 20.1-8)

## 예시

```
무방향 그래프:
  1 --- 2
  |   / |
  |  /  |
  3 --- 4

인접 리스트 표현:
  Adj[1] -> [2, 3]
  Adj[2] -> [1, 3, 4]
  Adj[3] -> [1, 2, 4]
  Adj[4] -> [2, 3]

가중치 방향 그래프:
  Adj[u] = [(v1, w1), (v2, w2), ...]
  예: Adj[1] = [(2, 5), (3, 10)]  // 1->2 가중치 5, 1->3 가중치 10
```

## 관련 개념

- [그래프 (Graph)](/knowledge/algorithms/graph/)
- [인접 행렬 (Adjacency Matrix)](/knowledge/algorithms/adjacency-matrix/)
- [너비 우선 탐색 (Breadth-First Search)](/knowledge/algorithms/breadth-first-search/)
- [깊이 우선 탐색 (Depth-First Search)](/knowledge/algorithms/depth-first-search/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
