---
title: "Fibonacci Sequence"
description: "피보나치 수열(Fibonacci Sequence)은 f(0) = 0, f(1) = 1이고, n >= 2에 대해 f(n) = f(n-1) + f(n-2)로 정의되는 재귀적 수열이다"
tags: ['Fibonacci', 'Recurrence Relation', 'Recursive Definition', 'Golden Ratio', 'Lame Theorem']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/fibonacci-sequence
sidebar:
  order: 6
---

## 핵심 개념

### 피보나치 수의 처음 몇 항

| n | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| f(n) | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 |

### 피보나치 수와 황금비

n >= 3일 때 f(n) > alpha^(n-2) 가 성립한다. 여기서 alpha = (1 + sqrt(5))/2 (약 1.618)는 황금비이다.

이 부등식의 증명은 강한 귀납법을 사용한다:
- **기초 단계**: f(3) = 2 > alpha ≈ 1.618, f(4) = 3 > alpha^2 ≈ 2.618
- **귀납 단계**: alpha^2 = alpha + 1이므로 (x^2 - x - 1 = 0의 근)
  ```
  alpha^(k-1) = alpha^(k-2) + alpha^(k-3)
  f(k+1) = f(k) + f(k-1) > alpha^(k-2) + alpha^(k-3) = alpha^(k-1)
  ```

### 라메의 정리 (Lame's Theorem)

피보나치 수열은 유클리드 알고리즘의 복잡도 분석에 핵심적으로 사용된다:

> a >= b인 양의 정수 a, b에 대해, gcd(a, b)를 구하기 위한 유클리드 알고리즘의 나눗셈 횟수는 b의 십진 자릿수의 5배 이하이다.

증명의 핵심: 유클리드 알고리즘에서 n번의 나눗셈을 사용하면 b >= f(n+1). f(n+1) > alpha^(n-1)이고 log10(alpha) > 1/5이므로 n-1 < 5 * log10(b). b가 k자리 수이면 n <= 5k.

따라서 유클리드 알고리즘의 나눗셈 횟수는 **O(log b)** 이다.

### 재귀 vs 반복 계산의 비교

피보나치 수 계산은 재귀 알고리즘과 반복 알고리즘의 효율성 차이를 극명하게 보여주는 예이다:

- **재귀적 알고리즘**: f(n) 계산에 f(n+1) - 1번의 덧셈 필요. 각 단계에서 평가해야 할 수가 두 배로 늘어나므로 지수적 시간 소요.
- **반복적 알고리즘**: f(n) 계산에 n-1번의 덧셈만 필요. 선형 시간.

## 예시

**예시 1: 재귀적 피보나치 알고리즘**

```
procedure fibonacci(n: nonneg integer)
  if n = 0 then return 0
  else if n = 1 then return 1
  else return fibonacci(n-1) + fibonacci(n-2)
```

f(4) 계산의 호출 트리:
```
        f(4)
       /    \
    f(3)    f(2)
    / \     / \
 f(2) f(1) f(1) f(0)
 / \
f(1) f(0)
```

총 덧셈 횟수: f(5) - 1 = 5 - 1 = 4회

**예시 2: 반복적 피보나치 알고리즘**

```
procedure iterative_fibonacci(n: nonneg integer)
  if n = 0 then return 0
  else
    x := 0     // f(0)
    y := 1     // f(1)
    for i := 1 to n-1
      z := x + y
      x := y
      y := z
    return y
```

f(4) 계산: 루프 3번 반복, 3회 덧셈.

**예시 3: 라메의 정리 적용**

gcd(a, b)에서 b = 999 (3자리)일 때, 유클리드 알고리즘의 나눗셈 횟수 <= 5 * 3 = 15회.

**예시 4: 피보나치 수의 성질들** (귀납법으로 증명)

- f(1)^2 + f(2)^2 + ... + f(n)^2 = f(n) * f(n+1)
- f(1) + f(3) + ... + f(2n-1) = f(2n)
- f(n+1) * f(n-1) - f(n)^2 = (-1)^n (카시니 항등식)

## 관련 개념

- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 피보나치 수열은 재귀적으로 정의
- [Strong Induction](/knowledge/mathematics/strong-induction/) - 피보나치 수의 성질 증명에 강한 귀납법 사용
- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 재귀 vs 반복의 효율성 비교 사례
- [Sequence](/knowledge/mathematics/sequence/) - 피보나치 수열은 대표적인 수열
- [Big-O Notation](/knowledge/mathematics/big-o-notation/) - 유클리드 알고리즘의 O(log b) 복잡도 유도
- [Algorithm](/knowledge/mathematics/algorithm/) - 유클리드 알고리즘 분석에 핵심 역할
