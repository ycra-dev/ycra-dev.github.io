---
title: "Matrix Chain Multiplication"
description: "행렬 체인 곱셈 문제(Matrix-Chain Multiplication Problem)는 n개의 행렬 <A1, A2, "
tags: ['Matrix Chain Multiplication', 'Dynamic Programming', 'Parenthesization', 'Catalan Number']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/matrix-chain-multiplication
sidebar:
  order: 6
---

## 핵심 개념

행렬 곱셈은 결합 법칙이 성립하므로 어떤 순서로 곱해도 결과는 같지만, 괄호 묶기 순서에 따라 스칼라 곱셈 횟수가 크게 달라진다.

**가능한 괄호 묶기의 수**: P(n) = Omega(4^n / n^{3/2}) (카탈란 수와 관련)으로 지수적이므로, 전수 조사는 비실용적이다.

**최적 부분 구조**: A_i..A_j를 A_k와 A_{k+1} 사이에서 분할하면, A_i..A_k와 A_{k+1}..A_j 각각도 최적으로 괄호를 묶어야 한다.

**점화식**: m[i,j] = 0 (if i=j), min{m[i,k] + m[k+1,j] + p_{i-1}*p_k*p_j} (if i<j, k=i..j-1)

여기서 행렬 A_i의 차원은 p_{i-1} x p_i이다.

**DP 접근**: 체인 길이가 짧은 것부터 긴 것 순서로 테이블을 채운다.
- 서로 다른 부분 문제: Theta(n^2)개 (i,j 쌍)
- 각 부분 문제당 선택: O(n)개 (k 값)
- 총 실행 시간: O(n^3), 공간: Theta(n^2)

**해 재구성**: 테이블 s[i,j]에 최적 분할 지점 k를 기록하여 PRINT-OPTIMAL-PARENS로 출력한다.

## 예시

```
// 6개 행렬의 차원: 30x35, 35x15, 15x5, 5x10, 10x20, 20x25
// MATRIX-CHAIN-ORDER 결과: m[1,6] = 15,125

MATRIX-CHAIN-ORDER(p, n)
  let m[1:n, 1:n] and s[1:n-1, 2:n] be new tables
  for i = 1 to n
    m[i, i] = 0
  for l = 2 to n                    // l은 체인 길이
    for i = 1 to n - l + 1
      j = i + l - 1
      m[i, j] = infinity
      for k = i to j - 1            // 분할 지점 시도
        q = m[i,k] + m[k+1,j] + p_{i-1}*p_k*p_j
        if q < m[i,j]
          m[i,j] = q
          s[i,j] = k

// 결과: ((A1(A2*A3))((A4*A5)*A6))
```

## 관련 개념

- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Optimal Substructure](/knowledge/algorithms/optimal-substructure/)
- [Overlapping Subproblems](/knowledge/algorithms/overlapping-subproblems/)
- [Memoization](/knowledge/algorithms/memoization/)
