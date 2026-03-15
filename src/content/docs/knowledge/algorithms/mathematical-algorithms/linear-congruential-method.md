---
title: "선형 합동법 (Linear Congruential Method)"
description: "X_{n+1} = (aX_n + c) mod m 으로 정의되는 현대 PRNG의 근간이 되는 선형 합동 수열 생성법"
tags: ["Algorithms", "Randomness", "Number Theory", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/linear-congruential-method
sidebar:
  order: 23
---

## 핵심 개념

선형 합동법(Linear Congruential Method)은 D. H. Lehmer(1949)가 도입한 현대 PRNG의 근간이다. 네 개의 정수로 정의된다:

```
X_{n+1} = (a × X_n + c) mod m
```

- **m**: 모듈러스 (0 < m)
- **a**: 승수(multiplier) (0 < a < m)
- **c**: 증분(increment) (0 ≤ c < m)
- **X₀**: 시드(seed)

## 동작 원리

**세 가지 변종**:
- **혼합 합동법(Mixed)**: c ≠ 0
- **곱셈 합동법(Multiplicative)**: c = 0 (약간 빠르지만 최대 주기 불가)
- **Lehmer 원래 방법**: c = 0

**최대 주기 조건 (Hull-Dobell 정리, Theorem A)**:
주기 길이 m을 달성하는 충분필요 조건:
1. gcd(c, m) = 1 (c와 m이 서로소)
2. a ≡ 1 (mod p) for all prime p dividing m
3. a ≡ 1 (mod 4) when 4 | m

**모듈러스 m의 선택**:
- m = 2^{워드 크기}: 나눗셈 불필요 (overflow 자동 처리)
- **주의**: m = 2^e일 때 하위 비트(LSB)가 훨씬 덜 무작위함
  - X_n mod 2^k는 최대 주기 2^k를 가짐 (상위 비트는 OK)
  - 따라서 결과를 정수 난수로 쓸 때 하위 비트를 피할 것

**스펙트럼 테스트(Spectral Test)**: 선형 합동 수열의 t차원 점이 격자(lattice) 위에 놓이는 성질(Marsaglia 현상)을 이용한 품질 검정. 현재 가장 신뢰할 수 있는 LCG 평가 방법.

**효력(Potency)**: b = a-1이라 할 때 b^s ≡ 0 (mod m)의 최소 s. s ≥ 5이어야 허용 가능.

## 예시

```python
class LinearCongruential:
    """선형 합동 난수 생성기"""
    def __init__(self, seed, m=2**32, a=1664525, c=1013904223):
        # Numerical Recipes 추천 파라미터 (Knuth 검증)
        self.x = seed
        self.m = m; self.a = a; self.c = c

    def next_int(self):
        self.x = (self.a * self.x + self.c) % self.m
        return self.x

    def random(self):
        return self.next_int() / self.m

# 최대 주기 조건 검증
def check_hull_dobell(a, c, m):
    from math import gcd
    from sympy import factorint

    cond1 = gcd(c, m) == 1
    prime_factors = factorint(m).keys()
    cond2 = all((a - 1) % p == 0 for p in prime_factors)
    cond3 = True if m % 4 != 0 else (a - 1) % 4 == 0
    return all([cond1, cond2, cond3])

# 표준 파라미터 검증
print(check_hull_dobell(1664525, 1013904223, 2**32))  # True

# LCG 하위 비트 문제 시연
lcg = LinearCongruential(seed=1)
lower_bits = [lcg.next_int() & 1 for _ in range(20)]
print("하위 1비트:", lower_bits)  # 0,1,0,1,0,1... (주기 2!)
upper_bits = [lcg.next_int() >> 16 & 1 for _ in range(20)]
print("상위 비트:", upper_bits)   # 훨씬 더 무작위

# m=10, 작은 예시로 주기 확인
def show_period(a=3, c=7, m=10):
    x = 0
    seq = [x]
    while True:
        x = (a * x + c) % m
        if x in seq:
            period = len(seq) - seq.index(x)
            return seq, period
        seq.append(x)

seq, period = show_period()
print(f"수열: {seq[:15]}, 주기: {period}")
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [주기 길이 (Period Length)](/knowledge/algorithms/mathematical-algorithms/period-length/)
- [모듈러 연산 (Modular Arithmetic)](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
- [Chi-Square Test](/knowledge/discrete-mathematics/probability/chi-square-test/)
