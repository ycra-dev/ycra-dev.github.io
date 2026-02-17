---
title: "Bernoulli Trial"
description: "베르누이 시행(Bernoulli trial)은 성공(success)과 실패(failure) 두 가지 결과만 가능한 실험이며, n번의 상호 독립적인 베르누이 시행에서 정확히 k번 성공할 확률은 C(n,k)p^k q^(n-k)이다 (p: 성공 확률, q = 1-p)"
tags: ['Bernoulli Trial', 'Binomial Distribution', 'Probability', 'Independence', 'Combinatorics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/bernoulli-trial
sidebar:
  order: 6
---

## 핵심 개념

베르누이 시행은 확률론에서 가장 기본적인 실험 모델이다. 동전 던지기, 비트 생성, 품질 검사 등 이진(binary) 결과를 갖는 모든 실험이 이에 해당한다.

**이항분포(binomial distribution)**는 n번의 독립적 베르누이 시행에서 성공 횟수의 분포이다:

$$b(k; n, p) = C(n, k) \cdot p^k \cdot q^{n-k}$$

이 공식의 유도:
1. n번 시행에서 특정 k번 성공, (n-k)번 실패하는 한 가지 순서의 확률: p^k · q^(n-k) (독립성)
2. k번 성공의 위치를 고르는 방법: C(n,k)가지
3. 따라서 총 확률: C(n,k) · p^k · q^(n-k)

**검증**: 모든 k에 대한 합:
$$\sum_{k=0}^{n} C(n,k)p^k q^{n-k} = (p+q)^n = 1^n = 1$$
이항정리에 의해 확률의 합이 1이 됨을 확인할 수 있다.

**핵심 성질:**
- 기대값: E(X) = np
- 분산: V(X) = npq

## 예시

**편향된 동전 7번 던져서 정확히 4번 앞면:**
```
p(H) = 2/3, q(T) = 1/3, n = 7, k = 4

P(X = 4) = C(7,4) × (2/3)^4 × (1/3)^3
         = 35 × 16/2187
         = 560/2187
         ≈ 0.256
```

**비트 생성 (0이 나올 확률 0.9):**
```
10비트 중 정확히 8개의 0:
b(8; 10, 0.9) = C(10,8) × (0.9)^8 × (0.1)^2
              = 45 × 0.43047 × 0.01
              ≈ 0.1937
```

**Python으로 이항분포 계산 및 시각화:**
```python
from math import comb

def binomial_prob(n, k, p):
    """n번 시행에서 정확히 k번 성공할 확률"""
    q = 1 - p
    return comb(n, k) * (p ** k) * (q ** (n - k))

# 공정한 동전 10번 던지기
n, p = 10, 0.5
print("k  |  P(X=k)")
print("-" * 20)
for k in range(n + 1):
    prob = binomial_prob(n, k, p)
    print(f"{k:2d} |  {prob:.4f}")

# 기대값과 분산 검증
expected = n * p          # 5.0
variance = n * p * (1-p)  # 2.5
print(f"\nE(X) = {expected}, V(X) = {variance}")
```

**몬테카를로 알고리즘 (확률적 소수 판별):**
```
합성수 n이 밀러 테스트를 통과할 확률 < 1/4
k번 독립 시행 후 잘못된 답 확률 < (1/4)^k

k = 10: 오류 확률 < 1/1,000,000
k = 30: 오류 확률 < 1/10^18
```

## 관련 개념

- [Independence](/knowledge/mathematics/independence/) - 베르누이 시행의 핵심 가정은 시행들의 상호 독립
- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - 이항분포의 계수 C(n,k)
- [Combination](/knowledge/mathematics/combination/) - 성공 위치를 선택하는 조합
- [Expected Value](/knowledge/mathematics/expected-value/) - 이항분포의 기대값은 np
- [Variance](/knowledge/mathematics/variance/) - 이항분포의 분산은 npq
