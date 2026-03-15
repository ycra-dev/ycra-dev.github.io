---
title: "분산 (Variance)"
description: "확률변수 X의 분산(variance)은 V(X) = Σ_{s∈S} (X(s) - E(X))² p(s)로, 기대값으로부터의 편차의 제곱의 가중 평균이다"
tags: ['Variance', 'Standard Deviation', 'Random Variable', 'Bienayme Formula', 'Probability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/variance
sidebar:
  order: 9
---

## 핵심 개념

기대값이 확률변수의 "중심"을 나타낸다면, 분산은 값들이 중심으로부터 얼마나 "퍼져 있는지"를 측정한다.

**계산용 공식 (Theorem 6):**
$$V(X) = E(X^2) - [E(X)]^2$$

이 공식이 정의보다 계산이 편리하므로 실무에서 주로 사용된다.

**분산의 의미 (Corollary 1):**
$$V(X) = E((X - \mu)^2), \quad \mu = E(X)$$
분산은 "편차의 제곱의 평균"(mean of the square of the deviation)이다.

**비에네메 공식 (Bienayme's Formula, Theorem 7):**
X와 Y가 독립이면:
$$V(X + Y) = V(X) + V(Y)$$

일반적으로, X₁, X₂, ..., Xₙ이 쌍별 독립이면:
$$V(X_1 + X_2 + \cdots + X_n) = V(X_1) + V(X_2) + \cdots + V(X_n)$$

**주의:** 기대값의 선형성과 달리, 분산의 덧셈 법칙은 **독립성을 요구**한다! 독립이 아닌 확률변수의 합의 분산은 공분산(covariance) 항을 포함한다:
$$V(X+Y) = V(X) + V(Y) + 2\text{Cov}(X,Y)$$

**주요 분산 결과:**
- 베르누이 시행 (단일): V(X) = pq
- n번 베르누이 시행: V(X) = npq
- V(aX + b) = a²V(X)

## 예시

**주사위 분산:**
```
E(X) = 7/2
E(X²) = (1² + 2² + 3² + 4² + 5² + 6²)/6 = 91/6

V(X) = E(X²) - [E(X)]²
     = 91/6 - (7/2)²
     = 91/6 - 49/4
     = 35/12 ≈ 2.917

σ(X) = √(35/12) ≈ 1.708
```

**두 주사위 합의 분산 (비에네메 공식 활용):**
```
X₁, X₂ 독립, 각각의 V = 35/12

V(X₁ + X₂) = V(X₁) + V(X₂) = 35/12 + 35/12 = 35/6
σ = √(35/6) ≈ 2.415
```

**베르누이 시행의 분산:**
```
단일 시행: X = 1(성공) or 0(실패)
E(X) = p, E(X²) = p (∵ X² = X)
V(X) = p - p² = p(1-p) = pq

n번 시행 (합의 분산):
V(X₁ + X₂ + ... + Xₙ) = n × pq = npq
```

**Python으로 분산 계산:**
```python
import random

def compute_stats(random_var_func, n_trials=100000):
    """확률변수의 기대값, 분산, 표준편차를 시뮬레이션으로 계산"""
    values = [random_var_func() for _ in range(n_trials)]
    mean = sum(values) / n_trials
    variance = sum((x - mean)**2 for x in values) / n_trials
    std_dev = variance ** 0.5
    return mean, variance, std_dev

# 공정한 주사위
mean, var, std = compute_stats(lambda: random.randint(1, 6))
print(f"주사위: E={mean:.3f}(이론:3.5), V={var:.3f}(이론:{35/12:.3f})")

# 동전 10번 던지기 (앞면 수)
def coin_flips():
    return sum(random.random() < 0.5 for _ in range(10))

mean, var, std = compute_stats(coin_flips)
print(f"동전10: E={mean:.3f}(이론:5.0), V={var:.3f}(이론:2.5)")
```

## 관련 개념

- [Expected Value](/knowledge/mathematics/expected-value/) - 분산은 기대값으로부터의 편차를 측정
- [Random Variable](/knowledge/mathematics/random-variable/) - 분산은 확률변수의 성질
- [Chebyshev's Inequality](/knowledge/mathematics/chebyshevs-inequality/) - 분산을 이용해 확률의 상한을 추정
- [Independence](/knowledge/mathematics/independence/) - 비에네메 공식은 독립성을 필요로 함
- [Bernoulli Trial](/knowledge/mathematics/bernoulli-trial/) - 이항분포의 분산은 npq
