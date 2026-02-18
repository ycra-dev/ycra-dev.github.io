---
title: "Graph"
description: "그래프(graph)는 정점(vertices)의 집합 V와 이 정점들을 연결하는 간선(edges)의 집합 E로 구성된 이산 구조 G = (V, E)이다"
tags: ['Graph', 'Discrete Mathematics', 'Vertices', 'Edges', 'Data Structure']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/graph
sidebar:
  order: 1
---

## 핵심 개념

그래프는 거의 모든 분야의 문제를 모델링할 수 있는 강력한 이산 구조이다. 주요 그래프 유형은 다음과 같다:

- **단순 그래프(Simple Graph)**: 다중 간선과 루프가 없는 비방향 그래프
- **다중그래프(Multigraph)**: 다중 간선은 허용하되 루프가 없는 비방향 그래프
- **의사그래프(Pseudograph)**: 다중 간선과 루프를 모두 허용하는 비방향 그래프
- **방향 그래프(Directed Graph)**: 간선이 순서쌍 (u, v)로 연결된 그래프
- **방향 다중그래프(Directed Multigraph)**: 같은 방향의 다중 간선을 허용하는 방향 그래프

**핸드셰이킹 정리(Handshaking Theorem)**: 비방향 그래프 G = (V, E)에서 간선 수가 m일 때, 2m = sum of deg(v) for all v in V. 즉, 모든 정점 차수의 합은 간선 수의 두 배이다.

특수 그래프 유형:
- **K_n (완전 그래프)**: n개의 정점이 모두 서로 연결된 그래프
- **C_n (순환 그래프)**: n개의 정점이 원형으로 연결된 그래프
- **W_n (바퀴 그래프)**: C_n에 중심 정점을 추가하여 모든 정점과 연결한 그래프
- **Q_n (n-큐브)**: 길이 n인 비트 문자열을 정점으로 하고, 정확히 한 비트만 다른 정점 쌍을 연결한 그래프

## 예시

```
# 그래프의 파이썬 표현 (인접 리스트)
graph = {
    'a': ['b', 'c', 'e'],
    'b': ['a'],
    'c': ['a', 'd', 'e'],
    'd': ['c', 'e'],
    'e': ['a', 'c', 'd']
}

# 핸드셰이킹 정리 검증
# 간선: {a,b}, {a,c}, {a,e}, {c,d}, {c,e}, {d,e} -> 6개
# 차수의 합: deg(a)=3, deg(b)=1, deg(c)=3, deg(d)=2, deg(e)=3 -> 12
# 2 * 6 = 12 ✓

# 완전 그래프 K_4의 간선 수: C(4,2) = 6
# Q_3의 정점 수: 2^3 = 8, 간선 수: 3 * 2^3 / 2 = 12
```

방향 그래프에서 각 정점의 진입 차수(in-degree)와 진출 차수(out-degree)의 합이 각각 간선의 수와 같다:
- sum of deg^-(v) = sum of deg^+(v) = |E|

## 관련 개념

- [Adjacency Matrix](/knowledge/mathematics/adjacency-matrix/) - 그래프의 행렬 표현
- [Bipartite Graph](/knowledge/mathematics/bipartite-graph/) - 특수한 그래프 유형
- [Graph Isomorphism](/knowledge/mathematics/graph-isomorphism/) - 그래프 구조의 동등성
- [Set](/knowledge/mathematics/set/) - 그래프 정의의 기초
