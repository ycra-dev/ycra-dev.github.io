---
title: "몬테카를로 방법 (Monte Carlo Method)"
description: "난수를 사용하여 확률적 샘플링으로 결정론적 문제를 수치적으로 해결하거나 시뮬레이션하는 알고리즘 총칭"
tags: ["Algorithms", "Simulation", "Numerical Analysis", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/monte-carlo-method
sidebar:
  order: 25
---

## 핵심 개념

몬테 카를로 방법(Monte Carlo Method)은 난수를 사용하는 알고리즘의 총칭이다. 카지노 도시 이름에서 유래했으며, 확률적 샘플링으로 결정론적 문제를 수치적으로 해결한다.

Monte Carlo 방법의 핵심 전제: PRNG로 생성된 수열이 통계적 테스트를 통과하면 "진정한 난수"를 대신할 수 있다.

## 동작 원리

**주요 응용 분야**:

**1. 시뮬레이션**:
- 핵물리: 임의의 충돌이 발생하는 입자 시뮬레이션
- 운영 연구: 공항·공장에서 임의 도착 간격을 가진 큐잉 시스템
- 금융: 주가 움직임, 위험 관리 (VaR 계산)

**2. 수치 적분**:
고차원 적분에서 결정론적 방법이 "차원의 저주"로 실패할 때 효과적:
- 수렴 속도: O(1/√n) — 차원에 무관함!
- d차원 격자 적분: O(1/n^{1/d}) → 차원이 높을수록 느려짐

**3. 최적화**: Simulated Annealing, 유전 알고리즘 등

**4. 확률론적 증명**: 알고리즘이 확률적으로 올바른 답을 줌

**오차 분석**:
```
Monte Carlo 적분의 오차 ≈ σ/√n
여기서 σ = 피적분함수의 표준편차
```

n을 4배 늘릴 때마다 오차가 절반으로 감소.

**분산 감소 기법**:
- **층화 샘플링(Stratified Sampling)**: 구간을 균등 분할 후 각 구간에서 샘플링
- **중요도 샘플링(Importance Sampling)**: 확률이 높은 영역에서 더 많이 샘플링
- **대위 변수법(Antithetic Variables)**: 음의 상관 쌍을 사용하여 분산 감소

## 예시

π 추정 (몬테 카를로 적분):

```python
import random
import math

def estimate_pi(n_samples):
    """단위 원 안에 떨어지는 점의 비율로 π 추정"""
    inside = 0
    for _ in range(n_samples):
        x = random.random()  # U[0, 1]
        y = random.random()
        if x*x + y*y <= 1.0:
            inside += 1
    return 4.0 * inside / n_samples

# 표본 수가 많을수록 정확해짐
for n in [1000, 10000, 100000, 1000000]:
    pi_est = estimate_pi(n)
    error = abs(pi_est - math.pi)
    print(f"n={n:8d}: π≈{pi_est:.5f}, 오차={error:.5f}")

# 고차원 적분 예시 (10차원 단위 초구의 부피)
def hypersphere_volume_mc(dim, n_samples=100000):
    """dim차원 단위 초구의 부피를 Monte Carlo로 추정"""
    count = 0
    for _ in range(n_samples):
        point = [random.uniform(-1, 1) for _ in range(dim)]
        if sum(x*x for x in point) <= 1:
            count += 1
    volume_box = 2**dim  # [-1,1]^dim의 부피
    return volume_box * count / n_samples

print(f"\n10차원 초구 부피: {hypersphere_volume_mc(10):.4f}")
# 정확값: π^5/120 ≈ 2.5502

# 분산 감소: 층화 샘플링
def stratified_pi(n_samples):
    """층화 샘플링으로 π 추정 (분산 감소)"""
    k = int(n_samples**0.5)  # k x k 층
    inside = 0
    for i in range(k):
        for j in range(k):
            x = (i + random.random()) / k
            y = (j + random.random()) / k
            if x*x + y*y <= 1:
                inside += 1
    return 4 * inside / n_samples
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [랜덤 샘플링과 셔플링 (Random Sampling and Shuffling)](/knowledge/algorithms/mathematical-algorithms/random-sampling-shuffling/)
- [Monte Carlo Algorithm (확률 알고리즘)](/knowledge/discrete-mathematics/probability/monte-carlo-algorithm/)
