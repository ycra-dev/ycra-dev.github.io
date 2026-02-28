---
title: "Graph Theory Basics"
description: "정점과 간선으로 이루어진 수학적 구조 G=(V,E)의 기본 개념 — 이분 그래프 판별, 연결 성분, SGB 링크드 리스트 표현까지"
tags: ["Graph Theory", "Algorithms", "Combinatorics"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/graph-algorithms/graph-theory-basics
sidebar:
  order: 31
---

## 핵심 개념

그래프(Graph) G = (V, E)는 정점(vertex)의 집합 V와 서로 다른 두 정점을 잇는 간선(edge)의 집합 E로 이루어진 수학적 구조다. 방향 그래프(digraph)는 방향이 있는 호(arc)를 사용한다.

## 동작 원리

**기본 개념:**
- **차수(degree)**: 정점의 이웃 수. 핸드셰이크 보조정리: Σ d(v) = 2|E|
- **경로(path)**: 정점이 중복 없이 연결된 시퀀스
- **사이클(cycle)**: 처음과 끝이 같은 경로
- **연결 성분(connected component)**: 거리가 유한한 정점들의 집합
- **직경(diameter)**: max{d(u,v)} over all u,v

**주요 그래프 종류:**

| 이름 | 표기 | 특징 |
|------|------|------|
| 완전 그래프 | Kₙ | 모든 쌍 연결 |
| 경로 | Pₙ | 선형 배열 |
| 순환 | Cₙ | 사이클 |
| 완전 이분 | Kₘ,ₙ | 두 그룹 간 모든 연결 |

**이분 그래프(Bipartite Graph) 정리 B (König):**
그래프가 이분이다 ⟺ 홀수 길이 사이클이 없다
→ BFS/DFS로 선형 시간 O(m+n) 판별 가능

**그래프 표현:**
- 인접 행렬: n×n 행렬, 공간 O(n²)
- SGB 링크드 리스트 형식: 희소 그래프에 효율 O(m+n)
  - 각 정점 노드: NAME, ARCS 필드
  - 각 호 노드: TIP, NEXT 필드

**특수 그래프:**
- Petersen 그래프: 3-정규, 비평면, 비해밀턴 최소 그래프
- Ramanujan 확장 그래프: 고 거리, 저 직경 정규 그래프

## 예시

```python
class Graph:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]

    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.adj[v].append(u)

# Algorithm B: 이분 그래프 판별 (BFS 기반)
from collections import deque

def is_bipartite(graph):
    color = [-1] * graph.n
    for start in range(graph.n):
        if color[start] != -1:
            continue
        color[start] = 0
        queue = deque([start])
        while queue:
            u = queue.popleft()
            for v in graph.adj[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    queue.append(v)
                elif color[v] == color[u]:
                    return False  # 홀수 사이클 발견
    return True

# 그래프 거리 계산 (BFS)
def bfs_distance(graph, source):
    dist = [-1] * graph.n
    dist[source] = 0
    queue = deque([source])
    while queue:
        u = queue.popleft()
        for v in graph.adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                queue.append(v)
    return dist
```

## 관련 개념

- [Hamiltonian Path](/knowledge/algorithms/graph-algorithms/hamiltonian-path/)
- [Graph Coloring](/knowledge/algorithms/graph-algorithms/graph-coloring/)
- [Breadth First Search](/knowledge/algorithms/graph-algorithms/breadth-first-search/)
- [Depth First Search](/knowledge/algorithms/graph-algorithms/depth-first-search/)
