---
title: "Period Length (PRNG)"
description: "PRNG가 동일한 수열을 반복하기 전까지 생성하는 서로 다른 값의 개수 — Floyd의 토끼와 거북이 알고리즘으로 탐지"
tags: ["Algorithms", "Randomness", "Number Theory", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/period-length
sidebar:
  order: 24
---

## 핵심 개념

주기 길이(Period Length)는 PRNG가 동일한 수열을 반복하기 전까지 생성하는 서로 다른 값의 개수다. 유한 집합에서 동작하는 모든 결정론적 수열은 반드시 주기를 가진다.

**두 가지 파라미터**:
- **μ (tail length)**: 주기 시작 전의 비주기 부분 길이
- **λ (cycle length)**: 반복되는 주기의 길이

## 동작 원리

**선형 합동법의 최대 주기 조건 (Hull-Dobell)**:
X_{n+1} = (aX_n + c) mod m에서 주기 = m이 되려면:
1. gcd(c, m) = 1
2. a ≡ 1 (mod p) for all prime p | m
3. a ≡ 1 (mod 4) when 4 | m

**c = 0인 곱셈 합동법의 한계**:
- m = 2^e: 최대 주기 = 2^{e-2} = m/4 (원점 0에 도달 불가)
- m = 소수: 최대 주기 = m - 1 (primitive root 선택 시)

**Floyd의 사이클 탐지 알고리즘** (토끼와 거북이):
두 포인터로 O(μ + λ) 시간에 주기 탐지:
```
Phase 1: slow = f(x0), fast = f(f(x0))
         slow != fast이면 각 1, 2단계씩 전진
         → 만나는 지점을 찾음

Phase 2: slow = x0, 두 포인터 1단계씩 전진
         → 만나는 지점이 사이클 시작 (μ 계산)

Phase 3: slow 고정, fast만 전진
         → 다시 만나는 단계 수가 λ
```

**Brent의 사이클 탐지**: 2의 거듭제곱 위치에서 비교. 같은 시간복잡도이지만 실제로 Floyd보다 약 24% 빠름.

**실용적 주기 길이**:
- 최소 권장: 2^32 ≈ 4 × 10^9 (고전적 응용)
- 현대 권장: 2^128 이상 (대규모 시뮬레이션)
- Mersenne Twister: 2^19937 - 1

## 예시

```python
def detect_period_floyd(f, x0):
    """Floyd의 토끼와 거북이 알고리즘"""
    # Phase 1: 사이클 내 만남 지점 찾기
    slow = f(x0)
    fast = f(f(x0))
    while slow != fast:
        slow = f(slow)
        fast = f(f(fast))

    # Phase 2: μ (tail length) 계산
    mu = 0
    slow = x0
    while slow != fast:
        slow = f(slow)
        fast = f(fast)
        mu += 1

    # Phase 3: λ (cycle length) 계산
    lam = 1
    fast = f(slow)
    while slow != fast:
        fast = f(fast)
        lam += 1

    return mu, lam

# 선형 합동법 예시
m, a, c = 10, 3, 7
f = lambda x: (a * x + c) % m
mu, lam = detect_period_floyd(f, 0)
print(f"μ={mu}, λ={lam}")  # μ=0, λ=4

# Brent 알고리즘 (더 빠름)
def detect_period_brent(f, x0):
    """Brent의 사이클 탐지"""
    power = lam = 1
    slow = x0
    fast = f(x0)
    while slow != fast:
        if power == lam:
            slow = fast
            power *= 2
            lam = 0
        fast = f(fast)
        lam += 1

    # μ 계산
    slow = fast = x0
    for _ in range(lam):
        fast = f(fast)
    mu = 0
    while slow != fast:
        slow = f(slow)
        fast = f(fast)
        mu += 1
    return mu, lam

mu2, lam2 = detect_period_brent(f, 0)
print(f"Brent: μ={mu2}, λ={lam2}")  # 동일한 결과
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [Linear Congruential Method](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
- [Modular Arithmetic](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
