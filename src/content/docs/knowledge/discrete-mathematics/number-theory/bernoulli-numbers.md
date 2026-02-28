---
title: "Bernoulli Numbers"
description: "지수 생성 함수 z/(e^z - 1)의 계수로 정의되며, 거듭제곱합 공식과 점근 전개(오일러 합산 공식)에 핵심적으로 사용되는 유리수 수열"
tags: ["Number Theory", "Mathematics", "Analysis", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/number-theory/bernoulli-numbers
sidebar:
  order: 12
---

## 핵심 개념

베르누이 수(Bernoulli Numbers) B_n은 다음 지수 생성 함수의 계수로 정의된다:

```
z/(e^z - 1) = Σ_{n≥0} B_n · z^n / n!
```

**초기값**:
```
B_0 = 1,  B_1 = -1/2,  B_2 = 1/6,  B_4 = -1/30,  B_6 = 1/42
홀수 지수 (n ≥ 3): B_{2k+1} = 0
```

모두 유리수이며, 거듭제곱합 공식, 조화수의 점근 전개, 스털링 근사 등에 반복적으로 등장한다.

## 동작 원리

**점화식**:
```
B_n = -1/(n+1) × Σ_{k=0}^{n-1} C(n+1, k) × B_k
```

**오일러 합산 공식(Euler's Summation Formula)**:

유한 합을 적분으로 근사하는 핵심 공식. 베르누이 수가 보정 항을 제공한다:

```
Σ_{k=a}^{b} f(k) = ∫_a^b f(x)dx + [f(a) + f(b)]/2
                  + Σ_{m=1}^{p} B_{2m}/(2m)! × [f^(2m-1)(b) - f^(2m-1)(a)]
                  + (나머지 항)
```

**주요 응용**:

**거듭제곱합 공식**:
```
Σ_{k=1}^{n} k   = n(n+1)/2
Σ_{k=1}^{n} k²  = n(n+1)(2n+1)/6
Σ_{k=1}^{n} k³  = [n(n+1)/2]²
Σ_{k=1}^{n} k^p = (베르누이 수를 이용한 일반 공식)
```

**조화수 점근 전개**:
```
H_n = ln n + γ + 1/(2n) - Σ_{m=1} B_{2m}/(2m × n^{2m})
    = ln n + 0.5772... + 1/(2n) - 1/(12n²) + 1/(120n⁴) - ...
```

**n!의 스털링 근사 정밀화**:
```
ln(n!) = n·ln(n) - n + (1/2)·ln(2πn) + 1/(12n) - 1/(360n³) + ...
```

## 예시

```python
from fractions import Fraction
from math import comb

def bernoulli(n):
    """베르누이 수 B_n 계산 (정확한 분수)"""
    B = [Fraction(0)] * (n + 1)
    B[0] = Fraction(1)
    for m in range(1, n + 1):
        s = Fraction(0)
        for k in range(m):
            s += comb(m + 1, k) * B[k]
        B[m] = -s / (m + 1)
    return B[n]

# 베르누이 수 출력
for n in range(10):
    b = bernoulli(n)
    if b != 0:
        print(f"B_{n} = {b}")
# B_0 = 1
# B_1 = -1/2
# B_2 = 1/6
# B_4 = -1/30
# B_6 = 1/42
# B_8 = -1/30

# 오일러 합산 공식으로 H_100 정밀 계산
import math

def harmonic_euler_maclaurin(n, terms=4):
    """오일러-매클로린 공식으로 조화수 계산"""
    # H_n ≈ ln(n) + γ + 1/(2n) - B_2/(2*n²) + B_4/(4*n⁴) - ...
    gamma = 0.5772156649015328
    result = math.log(n) + gamma + 1/(2*n)
    bernoulli_vals = [Fraction(1, 6), Fraction(-1, 30), Fraction(1, 42)]
    for m, B2m in enumerate(bernoulli_vals[:terms], start=1):
        result -= float(B2m) / (2*m * n**(2*m))
    return result

print(f"H_100 ≈ {harmonic_euler_maclaurin(100):.10f}")
print(f"H_100 정확 = {sum(1/k for k in range(1, 101)):.10f}")
```

## 관련 개념

- [Harmonic Numbers](/knowledge/algorithms/foundations/harmonic-numbers/)
- [Generating Functions](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
- [Gamma Function](/knowledge/discrete-mathematics/combinatorics/gamma-function/)
- [Modular Arithmetic](/knowledge/discrete-mathematics/number-theory/modular-arithmetic/)
