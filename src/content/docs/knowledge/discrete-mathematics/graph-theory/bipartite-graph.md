---
title: "Bipartite Graph"
description: "이분 그래프(bipartite graph)는 정점 집합 V를 두 개의 부분집합 V1과 V2로 분할할 수 있어서, 모든 간선이 V1의 정점과 V2의 정점을 연결하는 그래프이다"
tags: ['Bipartite Graph', 'Graph', 'Matching', 'Hall Theorem', 'Graph Coloring']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/bipartite-graph
sidebar:
  order: 2
---

## 핵심 개념

이분 그래프는 두 종류의 객체 사이의 관계를 모델링할 때 유용하다. 예를 들어, 직원과 직무, 학생과 과목 간의 배정 문제를 표현할 수 있다.

**판별 조건**: 단순 그래프가 이분 그래프인 것은 홀수 길이의 순환(circuit)을 포함하지 않는 것과 동치이다. 또한 그래프의 정점을 두 가지 색으로 칠할 수 있으면(즉, 2-colorable) 이분 그래프이다.

**완전 이분 그래프(K_{m,n})**: V1에 m개, V2에 n개의 정점이 있고, V1의 모든 정점이 V2의 모든 정점과 연결된 그래프이다. 간선의 수는 m * n이다.

**홀의 결혼 정리(Hall's Marriage Theorem)**: 이분 그래프 G = (V, E)에서 이분할 (V1, V2)가 주어졌을 때, V1에서 V2로의 완전 매칭(complete matching)이 존재할 필요충분조건은 V1의 모든 부분집합 A에 대해 |N(A)| >= |A|이다. 여기서 N(A)는 A에 인접한 정점들의 집합이다.

**매칭(Matching)**: 공통 끝점을 공유하지 않는 간선들의 집합으로, 이분 그래프에서의 최대 매칭 문제는 다양한 배정 문제에 응용된다.

## 예시

```
# 완전 이분 그래프 K_{3,3}
# V1 = {1, 2, 3}, V2 = {4, 5, 6}
# 모든 간선: (1,4), (1,5), (1,6), (2,4), (2,5), (2,6), (3,4), (3,5), (3,6)
# 간선 수 = 3 * 3 = 9

# 이분 그래프 판별 (BFS 기반 2-색칠)
from collections import deque

def is_bipartite(graph):
    color = {}
    for start in graph:
        if start in color:
            continue
        queue = deque([start])
        color[start] = 0
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if neighbor not in color:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False
    return True

# C_4는 이분 그래프 (짝수 순환)
# C_5는 이분 그래프가 아님 (홀수 순환)
```

홀의 결혼 정리 예시:
- V1 = {직원1, 직원2, 직원3}, V2 = {직무A, 직무B, 직무C}
- 각 직원이 수행 가능한 직무에 간선 연결
- 모든 직원에게 서로 다른 직무를 배정할 수 있는지 판별

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 이분 그래프는 그래프의 특수한 유형
- [Planar Graph](/knowledge/mathematics/planar-graph/) - K_{3,3}은 비평면 그래프
- [Set](/knowledge/mathematics/set/) - 정점 분할에 집합 개념 사용
- [Equivalence Relation](/knowledge/mathematics/equivalence-relation/) - 이분할과 동치류의 관계
