---
title: "범용 해싱 (Universal Hashing)"
description: "보편 해싱(Universal Hashing)은 해시 함수를 확률적으로 선택하여 어떤 키 집합에 대해서도 최악의 경우 충돌 확률을 최소화하는 기법으로, Carter와 Wegman(1979)이 제안했다"
tags: ["Universal Hashing", "Hashing", "Randomized", "Worst Case", "Adversarial", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/universal-hashing
sidebar:
  order: 44
---

## 핵심 개념

보편 해싱(Universal Hashing)은 해시 함수를 확률적으로 선택하여 어떤 키 집합에 대해서도 최악의 경우 충돌 확률을 최소화하는 기법이다. Carter와 Wegman(1979)이 제안했으며, 적대적 입력(adversarial input)에 대한 최악 성능을 방지한다.

**동기:**
고정 해시 함수를 사용하면 악의적인 사용자가 모든 키가 같은 버킷에 해시되도록 키를 선택할 수 있다. 이 경우 모든 연산이 O(N)으로 저하된다. 보편 해싱은 이를 방지한다.

**정의 (Universal Hash Family):**
함수 집합 H = {h : U → {0,...,M-1}}가 보편(universal)이려면, 임의의 서로 다른 두 키 x ≠ y에 대해:

Pr_{h∈H}[h(x) = h(y)] ≤ 1/M

## 동작 원리

**기대 충돌 수:**
보편 해시 함수를 사용하면, 임의의 키 x에 대해 다른 N-1개의 키와의 기대 충돌 수:
E[충돌 수] ≤ (N-1)/M = α - 1/M

즉 기대 탐사 수는 O(1 + α).

**구체적 구성 (Carter-Wegman):**
소수 p > M에 대해:
h_{a,b}(K) = ((a*K + b) mod p) mod M

단 a ∈ {1,...,p-1}, b ∈ {0,...,p-1}

이 집합 H = {h_{a,b}}가 보편 해시 패밀리를 형성한다.

**강한 보편 해싱 (2-universal):**
임의의 x₁ ≠ x₂와 임의의 y₁, y₂에 대해:
Pr[h(x₁) = y₁ AND h(x₂) = y₂] ≤ 1/M²

더 강한 독립성 보장. Carter-Wegman 구성이 이를 만족한다.

**k-독립 해싱:**
임의의 k개 서로 다른 키들이 독립적으로 균등 분포되는 함수 패밀리.
k가 클수록 더 강한 보장, 더 느린 계산.

**적용:**
1. 해시 테이블: 보편 해시 함수로 최악 경우 O(N) 방지
2. 암호학: MAC(Message Authentication Code)
3. 데이터 스트리밍: 근사 카운팅
4. 조합론: Expander graph 구성

## 예시

```python
import random

class UniversalHashFunction:
    """Carter-Wegman 보편 해시 함수"""

    def __init__(self, M, max_key=10**9):
        self.M = M
        self.p = self._next_prime(max_key + 1)
        self.a = random.randint(1, self.p - 1)  # a ≠ 0
        self.b = random.randint(0, self.p - 1)

    def _next_prime(self, n):
        def is_prime(x):
            if x < 2: return False
            for i in range(2, int(x**0.5)+1):
                if x % i == 0: return False
            return True
        while not is_prime(n):
            n += 1
        return n

    def __call__(self, key):
        return ((self.a * key + self.b) % self.p) % self.M

# 보편성 검증:
# 임의의 두 키 x, y에 대해 h(x) = h(y)일 확률 ≈ 1/M
M = 100
trials = 10000
collisions = 0
for _ in range(trials):
    h = UniversalHashFunction(M)
    if h(42) == h(137):  # 임의의 두 키
        collisions += 1
# 기대: collisions/trials ≈ 1/100 = 0.01
```

## 관련 개념

- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
- [해시 함수 (Hash Function)](/knowledge/algorithms/hash-function/)
- [충돌 해결 (Collision Resolution)](/knowledge/algorithms/collision-resolution/)
- [적재율 (Load Factor)](/knowledge/algorithms/data-structures/load-factor/)
