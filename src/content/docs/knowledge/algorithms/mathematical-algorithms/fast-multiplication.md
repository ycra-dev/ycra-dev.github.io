---
title: "고속 곱셈 (Fast Multiplication)"
description: "Karatsuba, Schönhage-Strassen 등 O(n²)보다 빠른 분할 정복 및 FFT 기반 정수/다항식 곱셈 알고리즘"
tags: ["Algorithms", "Arithmetic", "Divide and Conquer", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/fast-multiplication
sidebar:
  order: 34
---

## 핵심 개념

고속 곱셈(Fast Multiplication)은 두 n자리 정수 또는 n차 다항식을 O(n²)보다 빠르게 곱하는 알고리즘이다.

**동기**: 큰 수의 곱셈(암호학, 원주율 계산)에서 O(n²) 알고리즘은 너무 느리다. 1960년대 Kolmogorov는 "n자리 곱셈의 하한은 Θ(n²)"이라 추측했지만, 즉시 반례가 나왔다.

## 동작 원리

**Karatsuba 알고리즘 (1962)**: 재귀적 분할 정복

n자리 수 x, y를 반으로 분할:
```
x = x_H × 10^m + x_L
y = y_H × 10^m + y_L
```

순진한 방법: 4번의 재귀 곱셈
Karatsuba의 통찰: **3번만** 필요하다:
```
z0 = x_L × y_L
z2 = x_H × y_H
z1 = (x_L + x_H)(y_L + y_H) - z0 - z2
x × y = z2 × 10^{2m} + z1 × 10^m + z0
```

복잡도: T(n) = 3T(n/2) + O(n) → **O(n^{log₂3}) ≈ O(n^{1.585})**

**Toom-Cook (k=3)**: 5번의 재귀 → O(n^{1.465})

**Schönhage-Strassen (1971)**: FFT 기반
- 다항식 곱셈으로 변환: p(x) × q(x) at specific points
- FFT로 O(n log n) 점 평가
- 점별 곱셈
- 역 FFT
- 복잡도: **O(n log n log log n)**

**Harvey-Hoeven (2019)**: O(n log n) — 이론적 최적

**실용적 전환점**:
| 자리수 | 권장 알고리즘 |
|--------|---------------|
| < 수십 | Classical O(n²) |
| 수십 ~ 수백 | Karatsuba |
| 수백 ~ 수만 | Toom-Cook 3,4,5 |
| > 수만 | Schönhage-Strassen / FFT |

## 예시

```python
def karatsuba(x, y):
    """Karatsuba 곱셈: O(n^1.585)"""
    # 기저 케이스
    if x < 10 or y < 10:
        return x * y

    n = max(len(str(x)), len(str(y)))
    m = n // 2  # 절반으로 분할

    x_H, x_L = divmod(x, 10**m)
    y_H, y_L = divmod(y, 10**m)

    # 3번의 재귀 (순진한 방법은 4번)
    z0 = karatsuba(x_L, y_L)
    z2 = karatsuba(x_H, y_H)
    z1 = karatsuba(x_L + x_H, y_L + y_H) - z0 - z2

    return z2 * (10**(2*m)) + z1 * (10**m) + z0

# 큰 수 곱셈 테스트
import time

def benchmark_multiplication(n_digits=200):
    """Classical vs Karatsuba 비교"""
    import random
    x = int(''.join([str(random.randint(0,9)) for _ in range(n_digits)]))
    y = int(''.join([str(random.randint(0,9)) for _ in range(n_digits)]))

    # 검증
    assert karatsuba(x, y) == x * y  # Python 내장 (Karatsuba 사용)
    print(f"n={n_digits}: Karatsuba 정확성 검증 완료")

benchmark_multiplication(100)

# FFT 기반 다항식 곱셈
import numpy as np

def fft_polynomial_multiply(u, v):
    """FFT를 이용한 다항식 곱셈: O(n log n)"""
    n = len(u) + len(v) - 1
    # 2의 거듭제곱으로 패딩
    size = 1
    while size < n:
        size *= 2

    # FFT로 점 평가
    U = np.fft.fft(u, size)
    V = np.fft.fft(v, size)

    # 점별 곱셈
    W = U * V

    # 역 FFT로 계수 복원
    w = np.fft.ifft(W)
    return np.round(w[:n].real).astype(int)

# (x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1
u = [1, 1]  # (x + 1)
u_sq = fft_polynomial_multiply(u, u)   # (x + 1)^2 = [1, 2, 1]
u_4 = fft_polynomial_multiply(u_sq, u_sq)  # (x+1)^4
print(f"(x+1)^4 계수: {u_4}")  # [1, 4, 6, 4, 1]
```

## 관련 개념

- [다중 정밀도 연산 (Multiple-Precision Arithmetic)](/knowledge/algorithms/mathematical-algorithms/multiple-precision-arithmetic/)
- [다항식 연산 (Polynomial Arithmetic)](/knowledge/algorithms/mathematical-algorithms/polynomial-arithmetic/)
- [고속 푸리에 변환 (Fast Fourier Transform)](/knowledge/algorithms/mathematical-algorithms/fast-fourier-transform/)
- [다항식 곱셈 (Polynomial Multiplication)](/knowledge/algorithms/mathematical-algorithms/polynomial-multiplication/)
