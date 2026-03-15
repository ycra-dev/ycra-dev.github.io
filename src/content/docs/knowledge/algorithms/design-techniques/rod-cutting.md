---
title: "막대 자르기 (Rod Cutting)"
description: "막대 자르기 문제(Rod Cutting Problem)는 길이 n인 막대와 각 길이 i에 대한 가격표 p_i가 주어졌을 때, 막대를 잘라서 얻을 수 있는 최대 수익 r_n을 결정하는 동적 프로그래밍의 고전적 예제이다"
tags: ['Rod Cutting', 'Dynamic Programming', 'Optimization', 'Bottom Up']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rod-cutting
sidebar:
  order: 5
---

## 핵심 개념

길이 n인 막대는 n-1개 지점에서 자를 수 있으며, 각 지점에서 자르거나 자르지 않으므로 총 2^{n-1}가지 분할이 존재한다. 나이브 재귀는 이 모든 경우를 탐색하여 지수 시간이 걸린다.

**최적 부분 구조**: 최적 분할에서 첫 조각 크기를 i로 고정하면, 나머지 n-i 길이의 막대도 최적으로 잘라야 한다.

**점화식**: r_n = max{p_i + r_{n-i}} (1 <= i <= n), r_0 = 0

**부분 문제 그래프**: n+1개의 정점(크기 0, 1, ..., n), 각 정점에서 최대 n개의 간선 -> O(n^2) 시간

**해 재구성**: EXTENDED-BOTTOM-UP-CUT-ROD는 추가 배열 s[1:n]을 유지하여 각 크기 j에 대해 최적의 첫 조각 크기 s[j]를 기록한다.

## 예시

```
// 가격표 예시
i:    1  2  3  4  5  6  7  8  9  10
p[i]: 1  5  8  10 13 17 18 22 25 30

// 최적 수익
r[4]  = 10 (2+2 분할)
r[7]  = 18 (1+6 또는 2+2+3 분할)
r[10] = 30 (자르지 않음)

BOTTOM-UP-CUT-ROD(p, n)
  let r[0:n] be a new array
  r[0] = 0
  for j = 1 to n          // 크기 순으로 해결
    q = -infinity
    for i = 1 to j         // 첫 조각 크기 i를 시도
      q = max{q, p[i] + r[j-i]}
    r[j] = q
  return r[n]

// 실행 시간: Theta(n^2) (이중 루프의 산술 급수)
// 나이브 재귀 CUT-ROD: T(n) = 2^n
```

## 관련 개념

- [동적 프로그래밍 (Dynamic Programming)](/knowledge/algorithms/dynamic-programming/)
- [최적 부분 구조 (Optimal Substructure)](/knowledge/algorithms/optimal-substructure/)
- [중복 부분 문제 (Overlapping Subproblems)](/knowledge/algorithms/overlapping-subproblems/)
- [메모이제이션 (Memoization)](/knowledge/algorithms/memoization/)
