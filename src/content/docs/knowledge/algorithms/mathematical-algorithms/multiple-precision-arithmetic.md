---
title: "Multiple-Precision Arithmetic"
description: "임의의 정밀도로 정수를 표현하고 연산하는 방법 — 기수 w의 위치 표기법으로 다자릿수 수를 처리하여 하드웨어 한계를 초월"
tags: ["Algorithms", "Arithmetic", "Big Integer", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/multiple-precision-arithmetic
sidebar:
  order: 29
---

## 핵심 개념

다중 정밀도 산술(Multiple-Precision Arithmetic)은 임의의 정밀도(arbitrary precision)로 정수를 표현하고 연산하는 방법이다. n자리 정수를 워드 크기 w를 기수로 하는 w진 수로 처리한다.

**핵심 아이디어**: 10워드 × 워드 크기 10^10 → 100자리 십진수와 동일한 표현력

## 동작 원리

**기본 연산 (primitive operations)**:
- **a0**: 1자리 덧셈/뺄셈 → 1자리 결과 + carry
- **b0**: 1자리 × 1자리 → 2자리 결과 (필수 하드웨어 연산)
- **c0**: 2자리 ÷ 1자리 → 1자리 몫 + 나머지

**Classical 알고리즘들**:

**Algorithm A (n자리 덧셈)**: O(n), carry 전파
```
j = 0, carry = 0
while j < n:
    w[j] = (u[j] + v[j] + carry) mod b
    carry = (u[j] + v[j] + carry) / b
    j += 1
w[n] = carry
```

**Algorithm M (m+n자리 곱셈)**: O(mn), 자릿수별 곱하고 carry 전파

**Algorithm D (나눗셈)**: (m+n)자리 ÷ n자리 = (m+1)자리 몫 + n자리 나머지

**고속 곱셈 알고리즘**:

| 알고리즘 | 복잡도 | 전환점 |
|----------|--------|--------|
| Classical | O(n²) | < ~수십 자리 |
| Karatsuba (1962) | O(n^{log₂3}) ≈ O(n^{1.585}) | ~수십~수백 자리 |
| Toom-Cook | O(n^{1.465}) | ~수백 자리 |
| Schönhage-Strassen | O(n log n log log n) | ~수만 자리 |
| Harvey-Hoeven (2019) | O(n log n) | 이론적 최적 |

**활용 사례**:
- RSA 암호화: 2048~4096비트 정수 연산
- 원주율 계산: 수십억 자리
- 수론 연구

## 예시

```python
def multi_add(u, v, base=10**9):
    """다중 정밀도 덧셈 (LSB first)"""
    n = max(len(u), len(v))
    u = u + [0] * (n - len(u))
    v = v + [0] * (n - len(v))

    w, carry = [], 0
    for i in range(n):
        total = u[i] + v[i] + carry
        w.append(total % base)
        carry = total // base
    w.append(carry)

    while len(w) > 1 and w[-1] == 0:
        w.pop()
    return w

def multi_mul_classical(u, v, base=10**9):
    """다중 정밀도 곱셈 (O(mn))"""
    m, n = len(u), len(v)
    w = [0] * (m + n)
    for j in range(n):
        carry = 0
        for i in range(m):
            t = u[i] * v[j] + w[i+j] + carry
            w[i+j] = t % base
            carry = t // base
        w[m+j] = carry
    while len(w) > 1 and w[-1] == 0:
        w.pop()
    return w

def karatsuba(x, y):
    """Karatsuba 알고리즘 O(n^1.585)"""
    if x < 10000 or y < 10000:
        return x * y

    n = max(len(str(x)), len(str(y)))
    m = n // 2

    x_high, x_low = divmod(x, 10**m)
    y_high, y_low = divmod(y, 10**m)

    z0 = karatsuba(x_low, y_low)
    z2 = karatsuba(x_high, y_high)
    z1 = karatsuba(x_low + x_high, y_low + y_high) - z0 - z2

    return z2 * (10**(2*m)) + z1 * (10**m) + z0

# Python의 int는 기본적으로 다중 정밀도
big = 2**1000
print(f"2^1000 = ...{str(big)[-10:]}")  # 마지막 10자리
print(f"자릿수: {len(str(big))}")       # 302자리

# 속도 비교
import time
x = int("9" * 1000)  # 1000자리 수
start = time.time()
_ = x * x  # Python 내장 (Karatsuba 사용)
print(f"Python 내장: {time.time()-start:.4f}s")
```

## 관련 개념

- [Positional Number System](/knowledge/algorithms/mathematical-algorithms/positional-number-system/)
- [Fast Multiplication](/knowledge/algorithms/mathematical-algorithms/fast-multiplication/)
- [Euclidean Algorithm (GCD)](/knowledge/algorithms/mathematical-algorithms/euclids-algorithm/)
