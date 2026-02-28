---
title: "Sums and Products"
description: "시그마(Σ) 합산 표기법과 파이(Π) 곱 표기법의 형식적 정의 및 조작 규칙 — 알고리즘 분석의 수학적 언어"
tags: ["Mathematics", "Algorithms", "Analysis", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/sums-and-products
sidebar:
  order: 37
---

## 핵심 개념

합산 표기법(Σ)과 곱 표기법(Π)은 알고리즘 분석의 핵심 수학 언어다. TAOCP Vol.1, Section 1.2.3에서 Knuth는 일반적인 수열 합산의 조작 규칙을 체계적으로 정리한다.

**기본 표기**:
```
Σ_{0≤k<n} f(k) = f(0) + f(1) + ... + f(n-1)
Π_{1≤k≤n} f(k) = f(1) × f(2) × ... × f(n)
```

## 동작 원리

**Iverson 표기법**: 조건 P가 참이면 [P]=1, 거짓이면 [P]=0. 합산 구간을 조건으로 표현:
```
Σ_k f(k)[k는 소수] = 소수 k에 대한 f(k)의 합
Σ_{0≤k≤n} k = Σ_k k[0≤k≤n]
```

**기본 조작 규칙**:

```
(교환): Σ_{k∈K} f(k) = Σ_{p(k)∈K} f(p(k))    (p가 K→K의 전단사)

(분배): Σ_k c·f(k) = c · Σ_k f(k)

(분리): Σ_{k∈K} (f(k) + g(k)) = Σ_{k∈K} f(k) + Σ_{k∈K} g(k)

(이중 합산):
Σ_{j∈J} Σ_{k∈K} a_{jk} = Σ_{k∈K} Σ_{j∈J} a_{jk}  (항상 교환 가능)
Σ_j Σ_k a_{jk}[j∈J][k∈K(j)] = Σ_k Σ_j a_{jk}[k∈K][j∈J(k)]

(인덱스 변환): Σ_{0≤k≤n} f(k) = Σ_{0≤k≤n} f(n-k)   (대칭)
```

**중요한 닫힌 형식**:
```
등차급수:   Σ_{k=0}^{n-1} k = n(n-1)/2
등비급수:   Σ_{k=0}^{n-1} x^k = (x^n - 1)/(x-1)   (x≠1)
제곱합:     Σ_{k=1}^{n} k² = n(n+1)(2n+1)/6
팩토리얼:  Σ_{k=0}^{n} k·k! = (n+1)! - 1
```

**곱 표기법(Π)**:
```
n! = Π_{1≤k≤n} k

이항계수: C(n,k) = Π_{j=1}^{k} (n-k+j)/j

팩토리얼 표기: n^(k↓) = Π_{j=0}^{k-1} (n-j)  (하강 팩토리얼)
```

## 예시

```python
# 닫힌 형식 검증
def arithmetic_sum(n):
    """Σ_{k=0}^{n-1} k = n(n-1)/2"""
    direct = sum(range(n))
    formula = n * (n - 1) // 2
    assert direct == formula, f"불일치: {direct} != {formula}"
    return formula

def geometric_sum(x, n):
    """Σ_{k=0}^{n-1} x^k = (x^n - 1)/(x-1)"""
    direct = sum(x**k for k in range(n))
    formula = (x**n - 1) / (x - 1) if x != 1 else n
    return direct, formula

# 텔레스코핑 (연쇄 소거): Σ_{k=0}^{n-1} (f(k+1) - f(k)) = f(n) - f(0)
def telescoping(n):
    """Σ_{k=0}^{n-1} (k² - (k-1)²) = n² - 0² = n²"""
    direct = sum((k+1)**2 - k**2 for k in range(n))  # = Σ (2k+1)
    formula = n**2
    return direct, formula

print(f"등차급수 n=100: {arithmetic_sum(100)}")          # 4950
print(f"등비급수 x=2, n=10: {geometric_sum(2, 10)}")    # 1023, 1023.0
print(f"텔레스코핑 n=5: {telescoping(5)}")              # 25, 25

# Iverson 표기법으로 조건부 합산
def prime_sum(n):
    """Σ_{k=1}^{n} k[k는 소수] — n 이하 소수의 합"""
    from sympy import isprime
    return sum(k for k in range(2, n+1) if isprime(k))
```

## 관련 개념

- [Harmonic Numbers](/knowledge/algorithms/foundations/harmonic-numbers/)
- [Generating Functions](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
- [Binomial Coefficient](/knowledge/discrete-mathematics/combinatorics/binomial-coefficient/)
- [Analysis of Algorithms](/knowledge/algorithms/foundations/analysis-of-algorithms/)
