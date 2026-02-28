---
title: "Radix Conversion"
description: "한 기수(radix) b의 위치 표기법으로 표현된 수를 다른 기수 B의 표기법으로 변환하는 알고리즘 — 이진↔십진 변환이 핵심"
tags: ["Algorithms", "Arithmetic", "Number Systems", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/radix-conversion
sidebar:
  order: 30
---

## 핵심 개념

기수 변환(Radix Conversion)은 한 기수 b의 표기법으로 표현된 수를 다른 기수 B의 표기법으로 변환하는 과정이다. 컴퓨터에서 이진 ↔ 십진 변환이 가장 중요한 응용이다.

## 동작 원리

**4가지 기본 방법 (b → B 변환)**:

**정수 변환**:
- **Method 1a** (b 산술로 B로 나누기): 낮은 자릿수부터 B진 자리 추출
  ```
  u → u div B, u mod B → ... (최하위 자리부터)
  ```
- **Method 1b** (B 산술로 Horner's Rule): 가장 빠른 방법
  ```
  u = (...((u_m × b + u_{m-1}) × b + ...) × b + u_0)
  ```

**분수 변환**:
- **Method 2a**: b 산술로 B 곱하기 → 높은 자릿수부터 추출
- **Method 2b**: B 산술로 b 나누기 → 낮은 자릿수부터

**단정도 이진↔십진 변환 최적화**:
- 나눗셈 없는 변환: 역수를 곱셈으로 대체
- 약 19n + 19 사이클 (n자리 추출)

**고정밀도 변환** (O(M(n) log n)):
큰 수의 변환은 재귀적 분할 정복으로 최적화 가능:
- 절반씩 나누어 재귀 변환
- M(n) = n자리 곱셈 비용

## 예시

```python
def int_to_base_method1a(n, B=10):
    """Method 1a: b산술로 B로 나누기 (LSB first)"""
    if n == 0:
        return [0]
    digits = []
    while n > 0:
        digits.append(n % B)
        n //= B
    return digits[::-1]  # MSB first로 반환

def int_from_base_method1b(digits, b, B=10):
    """Method 1b: Horner's Rule (B산술로 b 곱하기)"""
    result = 0
    for d in digits:
        result = result * b + d
    return result

# 이진 → 십진 변환
binary = [1, 0, 1, 0, 1, 0, 0, 0]  # 10101000₂
decimal = int_from_base_method1b(binary, b=2)
print(f"10101000₂ = {decimal}₁₀")  # 168

# 분수 변환: Method 2a
def frac_to_base(frac, B, n_digits=10):
    """분수를 기수 B로 변환 (높은 자릿수부터)"""
    result = []
    for _ in range(n_digits):
        frac *= B
        digit = int(frac)
        result.append(digit)
        frac -= digit
    return result

# 1/3은 이진수로 무한 반복 소수
print(frac_to_base(1/3, 2, 12))  # [0, 1, 0, 1, 0, 1, ...]

# 고속 변환: 10^k 단위로 처리
def fast_int_to_decimal(n, chunk=9):
    """10^9 단위로 묶어 빠르게 변환"""
    mod = 10**chunk
    parts = []
    while n > 0:
        parts.append(n % mod)
        n //= mod
    if not parts:
        return "0"
    result = str(parts[-1])
    for part in reversed(parts[:-1]):
        result += str(part).zfill(chunk)
    return result

print(fast_int_to_decimal(10**18 + 999))  # 1000000000000000999
```

## 관련 개념

- [Positional Number System](/knowledge/algorithms/mathematical-algorithms/positional-number-system/)
- [Multiple-Precision Arithmetic](/knowledge/algorithms/mathematical-algorithms/multiple-precision-arithmetic/)
- [Horner's Rule](/knowledge/algorithms/mathematical-algorithms/horners-rule/)
