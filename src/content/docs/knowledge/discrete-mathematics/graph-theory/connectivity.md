---
title: "연결성 (Connectivity)"
description: "비방향 그래프가 연결(connected)되어 있다 함은 모든 서로 다른 정점 쌍 사이에 경로가 존재하는 것이다"
tags: ['Connectivity', 'Connected Graph', 'Cut Vertex', 'Strong Connectivity', 'Graph Theory']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/connectivity
sidebar:
  order: 5
---

## 핵심 개념

**경로(Path)**: 그래프에서 정점 u에서 v까지의 길이 n인 경로는 n개의 간선 e1, ..., en으로, 순서대로 정점 x0 = u, x1, ..., xn = v를 잇는다. 같은 정점에서 시작하고 끝나며 길이가 0보다 큰 경로를 순환(circuit)이라 한다. 같은 간선을 두 번 이상 포함하지 않는 경로를 단순 경로(simple path)라 한다.

**연결 성분(Connected Component)**: 그래프 G의 극대 연결 부분그래프. 연결되지 않은 그래프는 두 개 이상의 서로소인 연결 성분의 합집합이다.

**절단 정점(Cut Vertex)과 절단 간선(Cut Edge/Bridge)**: 제거하면 연결 성분의 수가 증가하는 정점 또는 간선. 컴퓨터 네트워크에서 핵심 라우터나 핵심 링크를 나타낸다.

**정점 연결도 kappa(G)**: 그래프를 분리하기 위해 제거해야 하는 최소 정점 수. 완전 그래프 K_n에서는 kappa(K_n) = n - 1로 정의한다.

**간선 연결도 lambda(G)**: 그래프를 분리하기 위해 제거해야 하는 최소 간선 수.

**부등식**: 모든 그래프 G에 대해, kappa(G) <= lambda(G) <= min deg(v).

**k-연결(k-connected)**: kappa(G) >= k인 그래프. 예를 들어, 2-연결(biconnected) 그래프는 절단 정점이 없고 3개 이상의 정점을 가진다.

**강연결 성분(Strongly Connected Component)**: 방향 그래프에서 극대 강연결 부분그래프. 웹 그래프에서 GSCC(거대 강연결 성분)는 전체 정점의 상당 부분을 포함한다.

## 예시

```python
# 그래프 연결성 확인 (BFS)
from collections import deque

def is_connected(graph):
    if not graph:
        return True
    start = next(iter(graph))
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return len(visited) == len(graph)

# 절단 정점 찾기 예시
# G1: a-b, b-c, c-d, c-e, b-d, d-e, a가 절단 정점에 해당하지 않는 경우
# 정점 b, c, e가 절단 정점이고, 간선 {a,b}, {c,e}가 절단 간선

# 연결도 예시:
# K_5: kappa = 4, lambda = 4, min_deg = 4 (모두 동일)
# 절단 정점이 있는 그래프: kappa = 1
# 절단 간선이 있는 그래프: lambda = 1
```

방향 그래프의 강/약 연결성:
```
# G: a->b, b->c, c->a, a->d, d->e, e->a
# 강연결: a에서 모든 정점으로, 모든 정점에서 a로 경로 존재 -> 강연결

# H: a->b, b->c, c->b, a->e, e->d
# a에서 b로 경로 존재하지만 b에서 a로 경로 없음 -> 강연결 아님
# 기저 비방향 그래프는 연결 -> 약연결
# 강연결 성분: {a}, {b,c}, {d}, {e}
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 연결성이 정의되는 기본 구조
- [Adjacency Matrix](/knowledge/mathematics/adjacency-matrix/) - A^r로 경로 수 계산 및 연결성 판단
- [Euler Path and Circuit](/knowledge/mathematics/euler-path-and-circuit/) - 연결 그래프에서의 간선 순회
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - BFS/DFS로 연결성 판별
