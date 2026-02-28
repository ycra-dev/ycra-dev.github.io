---
title: "Prime Factorization"
description: "양의 정수 n을 소인수의 곱 n = p₁^e₁ × p₂^e₂ × ... 로 유일하게 분해하는 과정"
tags: ["Algorithms", "Number Theory", "Cryptography", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/prime-factorization
sidebar:
  order: 32
---

## 핵심 개념

소인수분해(Prime Factorization)는 양의 정수 n을 소인수의 곱으로 분해하는 과정이다:

```
n = p₁^e₁ × p₂^e₂ × ... × pₜ^eₜ
```

**산술의 기본 정리**: 이 분해는 유일하다 (순서 무관). 따라서 정수의 "DNA"라 부를 수 있다.

**RSA 암호화의 기반**: 큰 수의 소인수분해는 어렵지만(인수분해 문제), 소수를 곱하는 것은 쉽다는 비대칭성이 현대 암호학의 토대다.

## 동작 원리

**Algorithm A (시행 나눗셈, Trial Division)**:
```
for d = 2, 3, 5, 7, 11, ...:
    if n mod d == 0:
        d는 소인수 → n ← n / d, 반복
    if n < d²:
        n은 소수 → 마지막 소인수
```

시간 복잡도: O(√n)

**더 빠른 알고리즘들**:

| 알고리즘 | 복잡도 | 적합 대상 |
|----------|--------|-----------|
| 시행 나눗셈 | O(√n) | 소인수 ≤ 10^6 |
| Pollard ρ | O(n^{1/4}) | 소인수 ≤ 10^20 |
| Lenstra ECM | O(e^{√(2 ln p ln ln p)}) | 임의 크기 |
| GNFS | O(e^{(ln n)^{1/3}(ln ln n)^{2/3}}) | 현재 최강 (300+ 자리) |

**소수 정리 π(x)**: x 이하의 소수의 수
```
π(x) ≈ x / ln(x)    (Legendre, 1799 추정; de La Vallée Poussin, 1896 증명)
```

**Pollard의 ρ 알고리즘**: Floyd 사이클 탐지를 활용한 인수분해
- f(x) = (x² + c) mod n을 반복 적용
- gcd(|x - y|, n) > 1이 되면 인수 발견

**소수성 검사 vs 인수분해**: 소수성 검사는 인수분해보다 훨씬 쉽다:
- Miller-Rabin: O((log n)^2) 확률적 소수 판정
- AKS: O((log n)^6) 결정론적 소수 판정

## 예시

```python
def trial_division(n):
    """시행 나눗셈으로 소인수분해"""
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

print(trial_division(360))  # {2: 3, 3: 2, 5: 1}

# Pollard ρ 알고리즘
import math, random

def pollard_rho(n, c=1):
    """Pollard ρ: O(n^1/4) 인수분해"""
    if n % 2 == 0:
        return 2
    x = random.randint(2, n - 1)
    y = x
    d = 1
    f = lambda x: (x*x + c) % n

    while d == 1:
        x = f(x)
        y = f(f(y))
        d = math.gcd(abs(x - y), n)

    return d if d != n else None

def factorize(n):
    """완전 소인수분해"""
    if n <= 1:
        return {}
    if all(n % p != 0 for p in range(2, min(1000, int(n**0.5)+1))):
        # 아마도 소수
        return {n: 1}

    factors = {}
    # 작은 소인수 먼저
    for p in [2, 3, 5, 7, 11, 13, 17, 19, 23]:
        while n % p == 0:
            factors[p] = factors.get(p, 0) + 1
            n //= p

    if n > 1:
        # 큰 인수에 Pollard ρ 적용
        d = None
        for c in range(1, 10):
            d = pollard_rho(n, c)
            if d and d != n:
                break
        if d:
            sub = factorize(d)
            for p, e in sub.items():
                factors[p] = factors.get(p, 0) + e
            sub = factorize(n // d)
            for p, e in sub.items():
                factors[p] = factors.get(p, 0) + e
        else:
            factors[n] = 1  # n이 소수

    return factors

# RSA 소인수분해 (작은 예시)
p, q = 1009, 1013  # 두 소수
n = p * q          # RSA 모듈러스
print(f"n = {n} = {p} × {q}")
print(f"소인수분해: {factorize(n)}")
```

## 관련 개념

- [Prime Number](/knowledge/discrete-mathematics/number-theory/prime-number/)
- [GCD](/knowledge/algorithms/mathematical-algorithms/gcd/)
- [Modular Arithmetic](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
- [RSA Cryptosystem](/knowledge/algorithms/mathematical-algorithms/rsa-cryptosystem/)
