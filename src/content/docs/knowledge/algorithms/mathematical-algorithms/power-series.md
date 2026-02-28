---
title: "Power Series"
description: "무한 형식 급수 Σ a_n x^n으로 표현되는 수학적 구조 — 알고리즘 분석의 생성 함수와 수치 함수 계산의 핵심 도구"
tags: ["Algorithms", "Mathematics", "Analysis", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/power-series
sidebar:
  order: 37
---

## 핵심 개념

거듭제곱급수(Power Series)는 다음 형태의 무한 형식 급수다:

```
f(x) = Σ_{n≥0} a_n x^n = a_0 + a_1 x + a_2 x² + a_3 x³ + ...
```

알고리즘 분석에서는 생성 함수로, 수치 해석에서는 함수 근사로 사용된다. TAOCP Vol.2에서는 다항식 산술의 자연스러운 확장으로 다룬다.

## 동작 원리

**주요 거듭제곱급수**:
```
지수 함수:   e^x = Σ x^n / n! = 1 + x + x²/2! + x³/3! + ...
로그:       ln(1+x) = Σ (-1)^{n+1} x^n / n = x - x²/2 + x³/3 - ...
삼각함수:   sin x = Σ (-1)^n x^{2n+1}/(2n+1)! = x - x³/6 + ...
            cos x = Σ (-1)^n x^{2n}/(2n)! = 1 - x²/2 + ...
기하급수:   1/(1-x) = Σ x^n = 1 + x + x² + ...  (|x| < 1)
이항급수:   (1+x)^r = Σ C(r,n) x^n              (|x| < 1)
```

**형식적 거듭제곱급수 (Formal Power Series)**: 수렴을 신경 쓰지 않고 계수 간의 대수 관계만 다루는 방식. 생성 함수가 이 방식으로 사용된다.

**거듭제곱급수의 연산**:
- **덧셈**: 계수별 덧셈 (n차 항끼리)
- **곱셈**: 합성곱 (Cauchy product)
- **역수**: 1/f(x)의 계수는 점화식으로 계산
- **합성**: f(g(x))는 치환으로 계산

**뉴턴의 방법 (Newton's Method)**:
f(X) = 0인 X를 반복 정제:
```
X_{n+1} = X_n - f(X_n) / f'(X_n)
```
제곱 수렴(quadratic convergence): 정확도가 매 반복마다 **두 배**가 됨.

**역수 거듭제곱급수**: 1/f(x) = g(x)를 n항까지 계산:
```
g_0 = 1/a_0
g_n = -1/a_0 × Σ_{k=0}^{n-1} a_{n-k} g_k
```

## 예시

```python
# 거듭제곱급수로 e^x 계산 (수렴 확인)
def exp_series(x, n_terms=20):
    """Taylor 급수로 e^x 계산"""
    result = 0
    term = 1  # x^0 / 0! = 1
    for n in range(n_terms):
        result += term
        term *= x / (n + 1)
    return result

import math
x = 2.0
print(f"급수: {exp_series(x):.10f}")   # 7.3890560989
print(f"정확: {math.exp(x):.10f}")    # 7.3890560989

# 형식 거듭제곱급수 곱셈 (계수 배열)
def fps_multiply(a, b, n_terms):
    """형식 거듭제곱급수 곱셈 (n_terms항까지)"""
    c = [0] * n_terms
    for i in range(n_terms):
        for j in range(n_terms - i):
            if i < len(a) and j < len(b):
                c[i+j] += a[i] * b[j]
    return c

# (1 + x + x^2 + ...) × (1 - x) = 1 (기하급수 × (1-x))
geom = [1] * 10      # 기하급수 앞 10항
linear = [1, -1]     # (1 - x)
product = fps_multiply(geom, linear, 10)
print(product)  # [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] ≈ 1

# 뉴턴의 방법으로 역수 계산
def fps_inverse(a, n_terms):
    """1/a(x)의 n_terms항까지 계산 (뉴턴의 방법)"""
    g = [1 / a[0]]  # 초기 근사
    precision = 1
    while precision < n_terms:
        precision = min(2 * precision, n_terms)
        # g = 2g - a*g^2 (mod x^precision)
        ag = fps_multiply(a, fps_multiply(g, g, precision), precision)
        g = [2*gi - agi for gi, agi in zip(
            g + [0]*(precision-len(g)),
            ag + [0]*(precision-len(ag))
        )][:precision]
    return g

# 1/(1-x)의 역수 = 1 + x + x^2 + ... 확인
a = [1, -1] + [0]*8  # (1-x)의 계수
inv = fps_inverse(a, 8)
print(inv[:8])  # [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
```

## 관련 개념

- [Generating Functions](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
- [Polynomial Arithmetic](/knowledge/algorithms/mathematical-algorithms/polynomial-arithmetic/)
- [Horner's Rule](/knowledge/algorithms/mathematical-algorithms/horners-rule/)
- [Bernoulli Numbers](/knowledge/discrete-mathematics/number-theory/bernoulli-numbers/)
