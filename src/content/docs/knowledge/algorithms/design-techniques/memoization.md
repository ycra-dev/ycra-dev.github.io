---
title: "Memoization"
description: "메모이제이션(Memoization)은 자연스러운 재귀적 알고리즘을 수정하여 각 부분 문제의 결과를 테이블에 저장하고, 동일한 부분 문제를 다시 만나면 저장된 값을 반환하는 기법이다"
tags: ['Memoization', 'Dynamic Programming', 'Top Down', 'Caching', 'Time Memory Tradeoff']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/memoization
sidebar:
  order: 4
---

## 핵심 개념

메모이제이션은 시간-메모리 트레이드오프(time-memory trade-off)의 대표적인 예이다. 추가 메모리를 사용하여 부분 문제의 해를 저장함으로써 재계산 시간을 절약한다.

**동작 원리**:
1. 부분 문제의 해를 저장할 테이블(배열 또는 해시 테이블)을 생성한다.
2. 각 테이블 항목을 "아직 계산되지 않음"을 나타내는 특수 값(예: -infinity, infinity)으로 초기화한다.
3. 부분 문제를 처음 만나면 정상적으로 해를 계산하고 테이블에 저장한다.
4. 이후 동일한 부분 문제를 만나면 저장된 값을 즉시 반환한다.

**Bottom-up vs Top-down (메모이제이션)**:
- 두 방식은 보통 같은 점근적 실행 시간을 갖는다.
- Bottom-up은 재귀 호출 오버헤드가 없어 상수 인자가 더 좋은 경우가 많다.
- 메모이제이션은 **모든 부분 문제를 풀 필요가 없는 경우** 유리하다 -- 실제 필요한 부분 문제만 풀기 때문이다.
- Bottom-up은 테이블 접근 패턴이 규칙적이어서 시간이나 공간을 추가로 줄일 수 있는 경우가 있다.

## 예시

**메모이제이션된 막대 자르기**:
```
MEMOIZED-CUT-ROD(p, n)
  let r[0:n] be a new array
  for i = 0 to n
    r[i] = -infinity
  return MEMOIZED-CUT-ROD-AUX(p, n, r)

MEMOIZED-CUT-ROD-AUX(p, n, r)
  if r[n] >= 0          // 이미 해를 구했는가?
    return r[n]
  if n == 0
    q = 0
  else q = -infinity
    for i = 1 to n
      q = max{q, p[i] + MEMOIZED-CUT-ROD-AUX(p, n-i, r)}
  r[n] = q              // 해를 저장
  return q
```

**메모이제이션된 행렬 체인 곱셈**: Omega(2^n) -> O(n^3)으로 개선. Theta(n^2)개의 부분 문제 각각에서 O(n) 재귀 호출을 수행한다.

## 관련 개념

- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Overlapping Subproblems](/knowledge/algorithms/overlapping-subproblems/)
- [Rod Cutting](/knowledge/algorithms/rod-cutting/)
- [Matrix Chain Multiplication](/knowledge/algorithms/matrix-chain-multiplication/)
