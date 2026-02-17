---
title: "Graph"
description: "그래프(Graph)는 정점(vertex)의 집합 V와 간선(edge)의 집합 E로 구성된 자료구조 G = (V, E)로, 객체 간의 쌍별 관계를 모델링한다"
tags: ['Graph', 'Data Structure', 'Vertices', 'Edges', 'Directed Graph', 'Undirected Graph']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/graph
sidebar:
  order: 1
---

## 핵심 개념

그래프는 컴퓨터 과학에서 가장 근본적인 자료구조 중 하나로, 수백 가지 흥미로운 계산 문제가 그래프로 표현된다. 그래프 G = (V, E)에서 V는 정점의 집합, E는 간선의 집합이다.

- **방향 그래프(Directed Graph)**: 간선 (u, v)가 방향을 가지며, u에서 v로의 연결을 의미한다.
- **무방향 그래프(Undirected Graph)**: 간선 (u, v)가 방향이 없으며 (u, v)와 (v, u)가 동일하다.
- **가중치 그래프(Weighted Graph)**: 각 간선에 실수 값의 가중치 w: E -> R이 부여된 그래프다.
- **희소 그래프(Sparse Graph)**: |E|가 |V|^2보다 훨씬 작은 그래프.
- **밀집 그래프(Dense Graph)**: |E|가 |V|^2에 가까운 그래프.

그래프 알고리즘의 수행 시간은 일반적으로 |V|와 |E| 두 매개변수로 표현된다. 점근적 표기법 내에서는 관례적으로 V = |V|, E = |E|로 표기한다.

그래프의 주요 응용:
- 도로 네트워크 (최단 경로)
- 소셜 네트워크 (연결 관계)
- 의존성 분석 (위상 정렬)
- 회로 설계 (최소 신장 트리)
- 네트워크 흐름 (최대 유량)

## 예시

```
무방향 그래프 예시:
  1 --- 2
  |   / |
  |  /  |
  3 --- 4

V = {1, 2, 3, 4}
E = {(1,2), (1,3), (2,3), (2,4), (3,4)}

방향 그래프 예시:
  1 --> 2
  |     |
  v     v
  3 --> 4

V = {1, 2, 3, 4}
E = {(1,2), (1,3), (2,4), (3,4)}
```

## 관련 개념

- [Adjacency List](/knowledge/algorithms/adjacency-list/)
- [Adjacency Matrix](/knowledge/algorithms/adjacency-matrix/)
- [Breadth-First Search](/knowledge/algorithms/breadth-first-search/)
- [Depth-First Search](/knowledge/algorithms/depth-first-search/)
- [Data Structure](/knowledge/algorithms/data-structure/)
