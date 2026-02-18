---
title: "Recursive Algorithm"
description: "재귀 알고리즘(Recursive Algorithm)은 문제를 동일한 문제의 더 작은 입력으로 환원(reduce)하여 해결하는 알고리즘이다"
tags: ['Recursive Algorithm', 'Recursion', 'Divide And Conquer', 'Base Case', 'Algorithm Correctness']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/recursive-algorithm
sidebar:
  order: 8
---

## 핵심 개념

재귀 알고리즘의 핵심 구조:
1. **기저 사례 (Base Case)**: 직접 해답을 알고 있는 가장 작은 문제
2. **재귀 호출 (Recursive Call)**: 더 작은 입력으로 동일한 문제를 호출
3. **결합 (Combination)**: 작은 문제의 해답으로부터 원래 문제의 해답을 구성

### 재귀 알고리즘의 정확성 증명

수학적 귀납법이나 강한 귀납법을 사용하여 재귀 알고리즘의 정확성을 증명한다:
- **기초 단계**: 기저 사례에서 올바른 결과를 반환함을 보인다
- **귀납 단계**: 더 작은 입력에 대해 알고리즘이 올바르다고 가정하고, 현재 입력에 대해서도 올바름을 보인다

일반적으로 강한 귀납법이 더 자주 사용되는데, 재귀 호출이 입력 크기를 1만큼이 아니라 절반 이상으로 줄일 수 있기 때문이다.

### 재귀 vs 반복 (Recursion vs Iteration)

재귀적 접근은 코드의 간결성과 이해 용이성에서 장점이 있지만, 반복적(iterative) 접근에 비해 계산량이 훨씬 클 수 있다. 대표적 예가 피보나치 수 계산이다:
- **재귀적 계산**: f(n) 계산에 f(n+1) - 1번의 덧셈 필요 (지수적)
- **반복적 계산**: f(n) 계산에 n-1번의 덧셈만 필요 (선형)

그러나 재귀가 쉽게 구현 가능하고 반복이 어려운 경우에는 재귀를 사용하는 것이 바람직하다. 또한 재귀 전용 하드웨어가 있으면 반복 대비 장점이 사라질 수 있다.

## 예시

**예시 1: 팩토리얼 계산**

```
procedure factorial(n: nonnegative integer)
  if n = 0 then return 1
  else return n * factorial(n - 1)
```

실행 추적 (n=4): 4! = 4 * 3! = 4 * 3 * 2! = 4 * 3 * 2 * 1! = 4 * 3 * 2 * 1 * 0! = 24

**예시 2: 거듭제곱 계산**

```
procedure power(a: nonzero real, n: nonneg integer)
  if n = 0 then return 1
  else return a * power(a, n - 1)
```

**예시 3: 재귀적 GCD (유클리드 알고리즘)**

```
procedure gcd(a, b: nonneg integers with a < b)
  if a = 0 then return b
  else return gcd(b mod a, a)
```

실행 추적 (a=5, b=8):
gcd(5,8) → gcd(3,5) → gcd(2,3) → gcd(1,2) → gcd(0,1) = 1

**예시 4: 재귀적 모듈러 거듭제곱**

```
procedure mpower(b, n, m: integers with b>0, m>=2, n>=0)
  if n = 0 then return 1
  else if n is even then
    return mpower(b, n/2, m)^2 mod m
  else
    return (mpower(b, floor(n/2), m)^2 mod m * b mod m) mod m
```

이 알고리즘은 O(log n) 곱셈만 사용하여 매우 효율적이다.

**예시 5: 재귀적 이진 탐색**

```
procedure binary_search(i, j, x: integers)
  m := floor((i+j)/2)
  if x = a_m then return m
  else if (x < a_m and i < m) then
    return binary_search(i, m-1, x)
  else if (x > a_m and j > m) then
    return binary_search(m+1, j, x)
  else return 0
```

## 관련 개념

- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 재귀 알고리즘의 이론적 기반
- [Algorithm](/knowledge/algorithms/algorithm/) - 재귀 알고리즘은 알고리즘의 한 분류
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 재귀 알고리즘의 정확성 증명에 사용
- [Strong Induction](/knowledge/mathematics/strong-induction/) - 재귀 알고리즘의 정확성 증명에 더 자주 사용
- [Merge Sort](/knowledge/mathematics/merge-sort/) - 대표적인 재귀 정렬 알고리즘
- [Fibonacci Sequence](/knowledge/mathematics/fibonacci-sequence/) - 재귀 vs 반복의 효율성 비교 사례
- [Complexity](/knowledge/algorithms/time-complexity/) - 재귀 알고리즘의 시간 복잡도 분석
