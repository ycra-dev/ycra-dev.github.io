---
title: "다항식 연산 (Polynomial Arithmetic)"
description: "다항식의 덧셈, 곱셈, 나눗셈, GCD 등의 대수 연산 — 정수 산술과 유사하지만 계수가 다항식인 점이 핵심"
tags: ["Algorithms", "Algebra", "Polynomial", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/polynomial-arithmetic
sidebar:
  order: 33
---

## 핵심 개념

다항식 산술(Polynomial Arithmetic)은 다항식의 덧셈, 뺄셈, 곱셈, 나눗셈 및 GCD 계산을 다루는 대수적 알고리즘이다. 정수 산술과 구조적으로 유사하여 같은 알고리즘 패턴이 두 영역에 모두 적용된다.

**TAOCP에서의 위치**: Knuth는 Vol.2, Section 4.6에서 다항식 산술을 "대수적 산술의 핵심"으로 다루며, 특히 유클리드 알고리즘과의 유사성을 강조한다.

## 동작 원리

**기본 표현**: 다항식 u(x) = u_n x^n + ... + u_1 x + u_0를 계수 배열 [u_0, u_1, ..., u_n]으로 표현.

**기본 연산**:

**덧셈/뺄셈**: O(n), 동차항 계수를 더함
```
(3x² + 2x + 1) + (x² - x + 5) = 4x² + x + 6
```

**곱셈**: O(nm) 또는 O(n log n) (FFT 사용 시)
```
(a_n x^n + ...)(b_m x^m + ...) = c_{n+m} x^{n+m} + ...
c_k = Σ_{i+j=k} a_i × b_j    (합성곱)
```

**나눗셈**: O(nm), 긴 나눗셈 알고리즘
```
u(x) = q(x) × v(x) + r(x),    deg(r) < deg(v)
```

**다항식 GCD**: 유클리드 알고리즘 적용 가능
```
gcd(u, v) = gcd(v, u mod v)
```
→ 정수 GCD와 동일한 구조! (유클리드 도메인의 성질)

**FFT 기반 고속 곱셈**: O(n log n)
- n+1개의 점에서 두 다항식을 평가 (FFT 사용)
- 점별 곱셈
- 역 FFT로 계수 복원

## 예시

```python
from numpy.polynomial import polynomial as P
import numpy as np

# 다항식 표현: [계수₀, 계수₁, ...계수_n] (낮은 차수부터)
u = [1, 2, 3]   # 3x² + 2x + 1
v = [5, -1, 1]  # x² - x + 5

# 덧셈/뺄셈
def poly_add(u, v):
    n = max(len(u), len(v))
    u = u + [0] * (n - len(u))
    v = v + [0] * (n - len(v))
    return [a + b for a, b in zip(u, v)]

print(poly_add(u, v))  # [6, 1, 4] → 4x² + x + 6

# 곱셈 (합성곱)
def poly_mul(u, v):
    result = [0] * (len(u) + len(v) - 1)
    for i, a in enumerate(u):
        for j, b in enumerate(v):
            result[i + j] += a * b
    return result

print(poly_mul([1, 1], [1, 1]))  # [1, 2, 1] → (1+x)² = 1 + 2x + x²

# Horner의 방법으로 다항식 평가
def poly_eval(coeffs, x):
    """계수 [c₀, c₁, ..., cₙ], 평가점 x"""
    result = coeffs[-1]  # 최고차항
    for c in reversed(coeffs[:-1]):
        result = result * x + c
    return result

print(poly_eval([1, 2, 3], 2))  # 3×4 + 2×2 + 1 = 17

# 유클리드 GCD (다항식)
def poly_gcd(u, v):
    """다항식 GCD (유클리드 알고리즘)"""
    def poly_div(u, v):
        """u ÷ v = 몫, 나머지"""
        u = list(u)
        q = []
        while len(u) >= len(v):
            coeff = u[-1] / v[-1]
            q.insert(0, coeff)
            for i, c in enumerate(v):
                u[len(u) - len(v) + i] -= coeff * c
            u.pop()
        while u and abs(u[-1]) < 1e-10:
            u.pop()
        return q, u or [0]

    while any(abs(x) > 1e-10 for x in v):
        _, v = poly_div(u, v)
        u, v = v, u
    return u

# (x² - 1) = (x-1)(x+1)
# (x² - x) = x(x-1)
# gcd = (x-1) = [-1, 1]
u = [-1, 0, 1]  # x² - 1
v = [0, -1, 1]  # x² - x
print(poly_gcd(u, v))  # [-1, 1] → (x - 1)
```

## 관련 개념

- [호너의 법칙 (Horner's Rule)](/knowledge/algorithms/mathematical-algorithms/horners-rule/)
- [고속 곱셈 (Fast Multiplication)](/knowledge/algorithms/mathematical-algorithms/fast-multiplication/)
- [Euclidean Algorithm (GCD)](/knowledge/algorithms/mathematical-algorithms/euclids-algorithm/)
- [다항식 곱셈 (Polynomial Multiplication)](/knowledge/algorithms/mathematical-algorithms/polynomial-multiplication/)
