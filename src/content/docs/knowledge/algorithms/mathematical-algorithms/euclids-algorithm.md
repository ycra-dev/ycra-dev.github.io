---
title: "유클리드 알고리즘 (Euclid's Algorithm)"
description: "두 양의 정수의 최대공약수(GCD)를 반복적인 나머지 연산으로 구하는 가장 오래된 알고리즘"
tags: ["Algorithms", "Number Theory", "GCD", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/euclids-algorithm
sidebar:
  order: 21
---

## 핵심 개념

유클리드 알고리즘(Euclid's Algorithm)은 두 양의 정수 m과 n이 주어졌을 때 최대공약수(GCD)를 구하는 알고리즘이다. 유클리드의 『원론』(Elements) 제7권, 명제 1과 2에 처음 등장하며 현존하는 가장 오래된 알고리즘 중 하나다.

핵심 원리: **GCD(m, n) = GCD(n, m mod n)**

m과 n의 공약수 집합과 n과 (m mod n)의 공약수 집합이 동일하기 때문이다.

## 동작 원리

**Algorithm E** (유클리드 알고리즘):

```
E1. r ← m mod n     (0 ≤ r < n)
E2. if r = 0, stop  → n이 GCD
E3. m ← n, n ← r   → E1으로 돌아간다
```

**정확성 증명**: E1 이후 m = qn + r. 따라서 m과 n의 공약수 집합 = n과 r의 공약수 집합. GCD(m, n) = GCD(n, r)이므로 E3이 답을 바꾸지 않는다.

**종료 증명**: E1 이후 r < n이므로, r ≠ 0이면 다음 반복에서 n이 감소한다. 양의 정수의 순감소 수열은 반드시 종료한다.

**성능 분석**:
- 최악의 경우: O(log min(m, n)) 단계 (연속 피보나치 수가 최악)
- 평균 단계 수: T_n ≈ (12 ln 2 / π²) × ln n ≈ 0.843 × ln n

**확장 유클리드 알고리즘**: GCD d뿐 아니라 `am + bn = d`를 만족하는 정수 a, b도 함께 구한다. RSA 암호화의 역원 계산에 필수적이다.

## 예시

m = 544, n = 119인 경우:

```
E1: r = 544 mod 119 = 68
E3: m=119, n=68
E1: r = 119 mod 68 = 51
E3: m=68, n=51
E1: r = 68 mod 51 = 17
E3: m=51, n=17
E1: r = 51 mod 17 = 0
E2: 종료, GCD = 17
```

확장 유클리드 알고리즘:

```python
def extended_gcd(m, n):
    """gcd(m,n) = u*m + v*n을 만족하는 u, v 반환"""
    if n == 0:
        return m, 1, 0
    g, u1, v1 = extended_gcd(n, m % n)
    return g, v1, u1 - (m // n) * v1

# 확인
g, u, v = extended_gcd(544, 119)
print(f"GCD = {g}, u={u}, v={v}")
print(f"검증: {u}×544 + {v}×119 = {u*544 + v*119}")
```

최악의 경우는 연속 피보나치 수다. GCD(F_{n+1}, F_n)은 정확히 n번의 나눗셈을 필요로 한다.

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/foundations/algorithm/)
- [GCD (Greatest Common Divisor)](/knowledge/algorithms/mathematical-algorithms/gcd/)
- [모듈러 연산 (Modular Arithmetic)](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
- [알고리즘 분석 (Analysis of Algorithms)](/knowledge/algorithms/foundations/analysis-of-algorithms/)
