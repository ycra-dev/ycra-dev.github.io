---
title: "Fractions (Rational Arithmetic)"
description: "유리수를 분자/분모 쌍으로 정확하게 표현하고 연산하는 알고리즘 — GCD를 이용한 기약 분수 유지가 핵심"
tags: ["Algorithms", "Arithmetic", "Number Theory", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/fractions
sidebar:
  order: 35
---

## 핵심 개념

분수 산술(Rational Arithmetic)은 유리수를 (분자, 분모) 쌍으로 정확하게 표현하고 연산하는 방법이다. 부동소수점 오차가 허용되지 않는 대수 계산, 컴파일러, 수론 연구에 사용된다.

**핵심**: 모든 연산 후 `gcd(분자, 분모)`로 약분하여 기약 분수 상태를 유지한다.

## 동작 원리

**기본 연산**:
```
덧셈:  a/b + c/d = (a×d + c×b) / (b×d)
       최적화: lcm(b,d)를 사용하면 계수 팽창 최소화
뺄셈:  a/b - c/d = (a×d - c×b) / (b×d)
곱셈:  a/b × c/d = (a×c) / (b×d)
       최적화: 교차 약분: gcd(a,d), gcd(b,c) 먼저 계산
나눗셈: a/b ÷ c/d = (a×d) / (b×c)
```

**LCM 최적화 (덧셈)**:
```
lcm(b, d) = b × d / gcd(b, d)

a/b + c/d = a × (lcm/b) + c × (lcm/d)
             ―――――――――――――――――――――――――
                      lcm
```
이 방법은 분모 팽창을 방지한다.

**교차 약분 최적화 (곱셈)**:
```
(a/b) × (c/d):
g1 = gcd(a, d), g2 = gcd(b, c)
= (a/g1 × c/g2) / (b/g2 × d/g1)
```
중간 계산의 자릿수가 줄어 효율적이다.

**Stern-Brocot 트리**: 모든 양의 유리수를 트리 구조로 열거하는 방법. 인접한 두 분수 a/b, c/d의 mediant = (a+c)/(b+d)는 가장 단순한 중간값이다.

**최량 근사(Best Rational Approximation)**: 실수를 단순한 분수로 근사하는 문제. 연분수(continued fraction) 전개가 핵심 도구다.

## 예시

```python
from math import gcd

class Fraction:
    """정확한 유리수 산술"""
    def __init__(self, num, den=1):
        if den == 0:
            raise ZeroDivisionError
        g = gcd(abs(num), abs(den))
        sign = -1 if (num < 0) ^ (den < 0) else 1
        self.num = sign * abs(num) // g
        self.den = abs(den) // g

    def __add__(self, other):
        # LCM 최적화
        g = gcd(self.den, other.den)
        den = self.den // g * other.den
        num = self.num * (other.den // g) + other.num * (self.den // g)
        return Fraction(num, den)

    def __mul__(self, other):
        # 교차 약분
        g1 = gcd(self.num, other.den)
        g2 = gcd(other.num, self.den)
        return Fraction(
            (self.num // g1) * (other.num // g2),
            (self.den // g2) * (other.den // g1)
        )

    def __str__(self):
        return f"{self.num}/{self.den}" if self.den != 1 else str(self.num)

# 사용 예
a = Fraction(1, 3)
b = Fraction(1, 6)
print(a + b)    # 1/2
print(a * b)    # 1/18
print(a + a + a)  # 1 (3×1/3 = 1, 기약분수 유지)

# 연분수로 최량 근사 (π 근사)
def continued_fraction_pi(n_terms=10):
    """π의 연분수 전개로 최량 근사"""
    import math
    x = math.pi
    terms = []
    for _ in range(n_terms):
        a = int(x)
        terms.append(a)
        x = 1 / (x - a) if x != a else float('inf')

    # 연분수를 분수로 변환
    num, den = 1, 0
    for a in reversed(terms):
        num, den = a * num + den, num
    return Fraction(num, den)

pi_approx = continued_fraction_pi(10)
print(f"π ≈ {pi_approx}")  # 80143857/25510582

# Python 내장 fractions 모듈
from fractions import Fraction as PyFraction
print(PyFraction(1, 3) + PyFraction(1, 6))  # 1/2
print(PyFraction('3.14159'))  # 314159/100000
```

## 관련 개념

- [Euclidean Algorithm (GCD)](/knowledge/algorithms/mathematical-algorithms/euclids-algorithm/)
- [Modular Arithmetic](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
- [Multiple-Precision Arithmetic](/knowledge/algorithms/mathematical-algorithms/multiple-precision-arithmetic/)
