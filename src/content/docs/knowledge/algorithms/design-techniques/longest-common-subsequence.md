---
title: "Longest Common Subsequence"
description: "최장 공통 부분 수열(Longest Common Subsequence, LCS) 문제는 두 수열 X와 Y가 주어졌을 때, 두 수열 모두의 부분 수열이 되는 최대 길이의 수열 Z를 찾는 문제이다"
tags: ['Longest Common Subsequence', 'Lcs', 'Dynamic Programming', 'String Matching', 'Bioinformatics']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/longest-common-subsequence
sidebar:
  order: 7
---

## 핵심 개념

**브루트 포스**: X의 모든 2^m개 부분 수열을 열거하고 각각이 Y의 부분 수열인지 검사 -> 지수 시간

**최적 부분 구조 (정리 14.1)**: X = <x1,...,xm>, Y = <y1,...,yn>, Z = <z1,...,zk>가 X와 Y의 LCS일 때:
1. x_m = y_n이면, z_k = x_m = y_n이고 Z_{k-1}은 X_{m-1}과 Y_{n-1}의 LCS이다.
2. x_m != y_n이고 z_k != x_m이면, Z는 X_{m-1}과 Y의 LCS이다.
3. x_m != y_n이고 z_k != y_n이면, Z는 X와 Y_{n-1}의 LCS이다.

**점화식**:
- c[i,j] = 0 (if i=0 or j=0)
- c[i,j] = c[i-1,j-1] + 1 (if x_i = y_j)
- c[i,j] = max{c[i-1,j], c[i,j-1]} (if x_i != y_j)

**핵심 특징**: x_i = y_j일 때는 하나의 부분 문제(c[i-1,j-1])만, x_i != y_j일 때는 두 부분 문제(c[i-1,j], c[i,j-1])를 고려한다. 조건에 따라 부분 문제를 선별적으로 고려하는 DP의 예이다.

**공간 최적화**: 실제로는 c 테이블의 두 행만 유지하면 LCS 길이를 구할 수 있다 (Theta(min{m,n}) 공간). 단, LCS 자체를 재구성하려면 전체 테이블이나 b 테이블이 필요하다.

## 예시

```
// X = <A,B,C,B,D,A,B>, Y = <B,D,C,A,B,A>
// LCS = <B,C,B,A> (길이 4)

LCS-LENGTH(X, Y, m, n)
  let b[1:m, 1:n] and c[0:m, 0:n] be new tables
  for i = 1 to m: c[i,0] = 0
  for j = 0 to n: c[0,j] = 0
  for i = 1 to m
    for j = 1 to n
      if x_i == y_j
        c[i,j] = c[i-1,j-1] + 1
        b[i,j] = "diagonal"
      elseif c[i-1,j] >= c[i,j-1]
        c[i,j] = c[i-1,j]
        b[i,j] = "up"
      else
        c[i,j] = c[i,j-1]
        b[i,j] = "left"
  return c and b

// 실행 시간: Theta(mn)
// 공간: Theta(mn) (최적화 시 Theta(min{m,n}))
```

## 관련 개념

- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Optimal Substructure](/knowledge/algorithms/optimal-substructure/)
- [Overlapping Subproblems](/knowledge/algorithms/overlapping-subproblems/)
