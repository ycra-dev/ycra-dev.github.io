---
title: "Gamma Function"
description: "팩토리얼을 실수(및 복소수)로 확장한 함수 Γ(n) = (n-1)!로, 확률 분포와 점근 공식에 광범위하게 사용됨"
tags: ["Mathematics", "Combinatorics", "Analysis", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/gamma-function
sidebar:
  order: 15
---

## 핵심 개념

감마 함수(Gamma Function) Γ(x)는 팩토리얼 함수를 양의 정수에서 실수(또는 복소수) 전체로 확장한 것이다:

```
Γ(n) = (n-1)!    (양의 정수 n)
Γ(n+1) = n · Γ(n)    (점화 관계)
Γ(1/2) = √π
Γ(1) = 1
```

TAOCP Vol.1, Section 1.2.11.3에서 Knuth는 감마 함수를 이항계수와 스털링 수의 점근적 분석을 위한 핵심 도구로 소개한다.

## 동작 원리

**적분 표현** (실수 x > 0에서):
```
Γ(x) = ∫₀^∞ t^{x-1} e^{-t} dt
```

**스털링 근사 (Stirling's Approximation)**: 큰 n에 대한 n!의 점근적 공식:
```
n! ≈ √(2πn) · (n/e)^n

더 정밀한 형태:
ln(n!) = n·ln(n) - n + (1/2)·ln(2πn) + 1/(12n) - 1/(360n³) + ...
```

**이항계수와의 관계**:
```
C(n, k) = Γ(n+1) / [Γ(k+1) · Γ(n-k+1)]

일반화된 이항계수 (실수 r, 정수 k):
C(r, k) = Γ(r+1) / [k! · Γ(r-k+1)]
```

**베타 함수(Beta Function)**와의 관계:
```
B(x, y) = Γ(x) · Γ(y) / Γ(x+y) = ∫₀¹ t^{x-1}(1-t)^{y-1} dt
```

**주요 응용**:
- 확률 분포: 감마 분포, 베타 분포, 카이제곱 분포의 정규화 상수
- 이항계수 점근: C(2n, n) ~ 4^n / √(πn)
- 피보나치 수의 점근: F_n ~ φ^n / √5

**점화 공식의 위력**: Γ(x+1) = x·Γ(x) 덕분에 비정수 팩토리얼을 재귀적으로 계산 가능:
```
Γ(3/2) = (1/2)·Γ(1/2) = (1/2)·√π = √π/2
Γ(5/2) = (3/2)·Γ(3/2) = (3/2)·(√π/2) = 3√π/4
```

## 예시

```python
import math

# 감마 함수 (Python의 math.gamma)
print(math.gamma(1))    # 1.0  = 0! = 1
print(math.gamma(2))    # 1.0  = 1! = 1
print(math.gamma(5))    # 24.0 = 4! = 24
print(math.gamma(0.5))  # √π ≈ 1.7724538

# 스털링 근사로 팩토리얼 추정
def stirling_approx(n):
    """스털링 근사: n! ≈ √(2πn) × (n/e)^n"""
    return math.sqrt(2 * math.pi * n) * (n / math.e) ** n

n = 20
exact = math.factorial(n)
approx = stirling_approx(n)
print(f"20! = {exact}")
print(f"스털링 근사 = {approx:.0f}")
print(f"상대 오차 = {abs(exact - approx)/exact:.4%}")  # ≈ 0.0042%

# 일반화된 이항계수 (실수 r, 음수 n도 가능)
def generalized_binom(r, k):
    """C(r, k) = r(r-1)...(r-k+1) / k!"""
    if k < 0:
        return 0
    result = 1
    for i in range(k):
        result *= (r - i) / (i + 1)
    return result

# C(1/2, 2) = (1/2)(1/2 - 1)/2! = (1/2)(-1/2)/2 = -1/8
print(generalized_binom(0.5, 2))  # -0.125
```

## 관련 개념

- [Binomial Coefficient](/knowledge/discrete-mathematics/combinatorics/binomial-coefficient/)
- [Stirling Numbers](/knowledge/discrete-mathematics/combinatorics/stirling-numbers/)
- [Bernoulli Numbers](/knowledge/discrete-mathematics/number-theory/bernoulli-numbers/)
- [Generating Functions](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
