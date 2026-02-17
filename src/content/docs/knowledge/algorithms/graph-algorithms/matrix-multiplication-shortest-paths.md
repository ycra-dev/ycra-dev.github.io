---
title: "Matrix Multiplication Shortest Paths"
description: "행렬 곱셈 기반 최단 경로(Matrix Multiplication Shortest Paths)는 최단 경로 확장을 행렬 곱셈과 유사한 연산으로 정의하고, 반복 제곱법을 적용하여 Theta(V^3 lg V) 시간에 모든 쌍 최단 경로를 계산하는 방법이다"
tags: ['Matrix Multiplication Shortest Paths', 'All Pairs Shortest Paths', 'Repeated Squaring', 'Tropical Semiring']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/matrix-multiplication-shortest-paths
sidebar:
  order: 15
---

## 핵심 개념

이 접근법은 행렬 곱셈과 최단 경로 계산 사이의 깊은 구조적 유사성을 활용한다.

**핵심 점화식**:
- l_ij^(r): i에서 j까지 최대 r개 간선을 사용하는 최단 경로 가중치
- l_ij^(0) = 0 (i=j), infinity (i!=j)
- l_ij^(r) = min_k {l_ik^(r-1) + w_kj} for r >= 1
- 최종 답: L^(n-1) (단순 경로는 최대 n-1개 간선)

**행렬 곱셈과의 대응**:
| 행렬 곱셈 | 최단 경로 |
|---|---|
| c_ij = sum_k(a_ik * b_kj) | l_ij^(r) = min_k(l_ik^(r-1) + w_kj) |
| 항등원: 0 (덧셈), 1 (곱셈) | 항등원: infinity (min), 0 (+) |
| 준환: (+, *) | 열대 준환: (min, +) |

**알고리즘**:
1. **SLOW-APSP**: L^(1) = W, L^(r) = L^(r-1) * W를 n-1번 반복 -> Theta(n^4)
2. **FASTER-APSP**: 반복 제곱법 적용
   - L^(1) = W
   - L^(2) = W^2 = L^(1) * L^(1)
   - L^(4) = W^4 = L^(2) * L^(2)
   - ... -> ceil(lg(n-1))번의 곱셈 -> Theta(n^3 lg n)

**반복 제곱법의 핵심**: L^(r) = L^(n-1) for all r >= n-1 (음수 사이클 없는 경우)이므로, 2^k >= n-1인 k번의 행렬 곱셈으로 충분하다.

**실용적 의의**: 코드가 간결하고 상수 계수가 작아, 중간 크기 그래프에서 실용적이다.

## 예시

```
EXTEND-SHORTEST-PATHS(L^(r-1), W, L^(r), n)
1  // L^(r)의 원소가 infinity로 초기화되었다고 가정
2  for i = 1 to n
3      for j = 1 to n
4          for k = 1 to n
5              l_ij^(r) = min(l_ij^(r), l_ik^(r-1) + w_kj)

FASTER-APSP(W, n)
1  let L and M be new n x n matrices
2  L = W
3  r = 1
4  while r < n - 1
5      M = infinity
6      EXTEND-SHORTEST-PATHS(L, L, M, n)  // M = L^2
7      r = 2r
8      L = M
9  return L

반복 제곱 과정 (n=5):
  L = W = W^1, r=1
  M = W^2, r=2
  M = W^4, r=4 >= n-1=4 -> 종료
  총 2번의 행렬 곱셈 (SLOW-APSP는 4번)
```

## 관련 개념

- [All-Pairs Shortest Paths](/knowledge/algorithms/all-pairs-shortest-paths/)
- [Floyd-Warshall Algorithm](/knowledge/algorithms/floyd-warshall-algorithm/)
- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/)
