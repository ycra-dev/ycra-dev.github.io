---
title: "인접 행렬 (Adjacency Matrix)"
description: "인접 행렬(adjacency matrix)은 그래프 G = (V, E)의 정점들을 v1, v2, "
tags: ['Adjacency Matrix', 'Graph Representation', 'Matrix', 'Incidence Matrix', 'Sparse Graph']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/adjacency-matrix
sidebar:
  order: 3
---

## 핵심 개념

그래프의 표현 방법은 크게 세 가지가 있으며, 인접 행렬은 그 중 가장 핵심적인 방법이다:

**1. 인접 리스트(Adjacency List)**: 각 정점에 인접한 정점들의 목록. 희소 그래프에 효율적 (공간: O(V + E)).

**2. 인접 행렬(Adjacency Matrix)**: n x n 행렬로 표현.
- 단순 그래프: 0-1 대칭 행렬, 대각선은 0
- 다중그래프/의사그래프: 원소가 간선의 수 (대칭)
- 방향 그래프: 비대칭 가능, a_ij = 1이면 (vi, vj) 간선 존재
- 공간: O(V^2)

**3. 근접 행렬(Incidence Matrix)**: n x m 행렬 M = [m_ij], m_ij = 1이면 간선 e_j가 정점 v_i에 근접

**희소 vs 밀집 그래프에서의 선택**:
- 희소 그래프(간선이 적음): 인접 리스트가 효율적 (O(cn) vs O(n^2))
- 밀집 그래프(간선이 많음): 인접 행렬이 효율적 (간선 존재 확인 O(1) vs O(V))

**정점 간 경로 수 계산(정리 2)**: 그래프의 인접 행렬 A에 대해, A^r의 (i, j) 원소는 vi에서 vj로의 길이 r인 경로의 수이다. 이는 두 정점 간 최단 경로의 길이를 찾거나 그래프의 연결성을 판단하는 데 사용된다.

## 예시

```
# 단순 그래프의 인접 행렬 (정점: a, b, c, d)
# 간선: {a,b}, {a,c}, {a,d}, {b,c}
import numpy as np

A = np.array([
    [0, 1, 1, 1],  # a
    [1, 0, 1, 0],  # b
    [1, 1, 0, 0],  # c
    [1, 0, 0, 0],  # d
])

# 대칭 행렬 확인 (비방향 그래프)
assert np.array_equal(A, A.T)  # True

# 길이 2인 경로의 수
A2 = A @ A
# A2[0][3] = a에서 d로의 길이 2 경로 수

# 길이 4인 경로의 수
A4 = np.linalg.matrix_power(A, 4)
print(f"a에서 d까지 길이 4인 경로 수: {A4[0][3]}")

# 방향 그래프의 인접 행렬 (비대칭)
# 간선: (a,b), (a,c), (b,d), (c,a)
A_directed = np.array([
    [0, 1, 1, 0],  # a -> b, c
    [0, 0, 0, 1],  # b -> d
    [1, 0, 0, 0],  # c -> a
    [0, 0, 0, 0],  # d -> (없음)
])
```

근접 행렬(Incidence Matrix) 예시:
```
# 5개 정점 (v1~v5), 6개 간선 (e1~e6)
M = np.array([
    [1, 1, 0, 0, 0, 0],  # v1
    [0, 0, 1, 1, 0, 1],  # v2
    [0, 0, 0, 0, 1, 1],  # v3
    [1, 0, 1, 0, 0, 0],  # v4
    [0, 1, 0, 1, 1, 0],  # v5
])
# 각 열의 합은 2 (간선의 양 끝점)
# 각 행의 합은 해당 정점의 차수
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 그래프의 기본 구조
- [Matrix](/knowledge/mathematics/matrix/) - 행렬의 수학적 기초
- [Graph Isomorphism](/knowledge/mathematics/graph-isomorphism/) - 인접 행렬을 이용한 동형 판별
- [Connectivity](/knowledge/mathematics/connectivity/) - A^r로 연결성 판단
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 그래프 알고리즘에서 행렬 활용
