---
title: "Chebyshev's Inequality"
description: "체비셰프 부등식(Chebyshev's inequality)은 양의 실수 r에 대해 p(|X(s) - E(X)| ≥ r) ≤ V(X)/r²을 만족하며, 확률변수가 기대값으로부터 r 이상 벗어날 확률의 상한을 분산으로 제한하는 부등식이다"
tags: ['Chebyshev Inequality', 'Variance', 'Probability Bound', 'Random Variable', 'Law Of Large Numbers']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/chebyshevs-inequality
sidebar:
  order: 10
---

## 핵심 개념

체비셰프 부등식은 확률변수의 분포에 대한 구체적인 정보 없이도, 기대값과 분산만으로 확률의 범위를 추정할 수 있게 하는 강력한 도구이다.

**의미:** 분산이 작으면, 확률변수의 값이 기대값에서 크게 벗어날 확률이 낮다.

**증명 핵심:**
1. A = {s ∈ S : |X(s) - E(X)| ≥ r}이라 하자
2. V(X) = Σ_{s∈S} (X(s) - E(X))²p(s) ≥ Σ_{s∈A} (X(s) - E(X))²p(s)
3. s ∈ A이면 (X(s) - E(X))² ≥ r²이므로, 위 합 ≥ r² × Σ_{s∈A} p(s) = r² × p(A)
4. 따라서 V(X) ≥ r²p(A), 즉 p(A) ≤ V(X)/r²

**표준편차의 배수로 표현:**
r = kσ (σ = 표준편차)로 놓으면:
$$p(|X - E(X)| \geq k\sigma) \leq \frac{1}{k^2}$$

이는 확률변수가 평균에서 k개의 표준편차 이상 벗어날 확률이 1/k² 이하임을 의미한다:
- k=2: 최대 25%
- k=3: 최대 약 11.1%
- k=5: 최대 4%

**한계:** 체비셰프 부등식은 모든 분포에 적용 가능하지만, 특정 분포에 대해서는 실제 확률보다 훨씬 느슨한 상한을 줄 수 있다. 분포의 구체적 정보가 있으면 더 정밀한 추정이 가능하다.

## 예시

**동전 n번 던지기에서 뒷면 수의 편차:**
```
X = 뒷면의 수 (공정한 동전, n번)
E(X) = n/2
V(X) = n/4

r = √n으로 설정하면:
p(|X - n/2| ≥ √n) ≤ (n/4)/n = 1/4

→ 뒷면 수가 평균에서 √n 이상 벗어날 확률은 최대 25%
```

**주사위의 한계 사례:**
```
X = 주사위 값, E(X) = 7/2, V(X) = 35/12

X는 1~6만 가능 → |X - 7/2|의 최대값 = 5/2
따라서 r > 5/2이면 p(|X - 7/2| ≥ r) = 0 (정확한 값)

그러나 Chebyshev: r=3일 때
p(|X - 7/2| ≥ 3) ≤ (35/12)/9 = 35/108 ≈ 0.324

실제 확률은 0인데, 상한은 0.324 → 매우 느슨한 추정
```

**Python으로 체비셰프 부등식 검증:**
```python
import random

def chebyshev_demo(n_coins, n_trials=100000):
    """동전 n번 던지기에서 체비셰프 부등식 검증"""
    E_X = n_coins / 2
    V_X = n_coins / 4

    deviations = []
    for _ in range(n_trials):
        heads = sum(random.random() < 0.5 for _ in range(n_coins))
        deviations.append(abs(heads - E_X))

    for k in [1, 2, 3, 5]:
        r = k * (V_X ** 0.5)  # k × 표준편차
        actual = sum(1 for d in deviations if d >= r) / n_trials
        bound = 1 / k**2
        print(f"k={k}: 실제 확률={actual:.4f}, "
              f"Chebyshev 상한={bound:.4f}")

chebyshev_demo(100)
# k=1: 실제 ≈ 0.317, 상한 = 1.000
# k=2: 실제 ≈ 0.046, 상한 = 0.250
# k=3: 실제 ≈ 0.003, 상한 = 0.111
# k=5: 실제 ≈ 0.000, 상한 = 0.040
```

## 관련 개념

- [Variance](/knowledge/mathematics/variance/) - 체비셰프 부등식의 핵심 요소
- [Expected Value](/knowledge/mathematics/expected-value/) - 기대값으로부터의 편차를 제한
- [Random Variable](/knowledge/mathematics/random-variable/) - 임의의 확률변수에 적용 가능
- [Bernoulli Trial](/knowledge/mathematics/bernoulli-trial/) - 이항분포에서의 편차 추정에 활용
