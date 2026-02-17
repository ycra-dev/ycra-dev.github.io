---
title: "Expected Value"
description: "확률변수 X의 기대값(expected value)은 E(X) = Σ_{s∈S} p(s)X(s)로 정의되며, 각 결과의 확률로 가중된 확률변수 값들의 가중 평균이다"
tags: ['Expected Value', 'Expectation', 'Mean', 'Linearity Of Expectations', 'Random Variable', 'Average Case Complexity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/expected-value
sidebar:
  order: 8
---

## 핵심 개념

기대값은 실험을 무한히 반복했을 때 확률변수의 평균적인 값을 나타낸다.

**대체 계산 공식 (Theorem 1):**
$$E(X) = \sum_{r \in X(S)} p(X = r) \cdot r$$
동일한 값을 갖는 결과들을 묶어서 계산하면 더 효율적이다.

**기대값의 선형성 (Theorem 3) - 가장 강력한 성질:**
1. E(X₁ + X₂ + ... + Xₙ) = E(X₁) + E(X₂) + ... + E(Xₙ)
2. E(aX + b) = aE(X) + b

**핵심:** 선형성은 **독립성을 요구하지 않는다!** 이는 기대값의 가장 강력한 성질이며, 복잡한 확률변수를 단순한 확률변수의 합으로 분해하여 기대값을 쉽게 구할 수 있게 한다.

**독립일 때의 추가 성질:** X와 Y가 독립이면 E(XY) = E(X)E(Y). 그러나 독립이 아니면 이 등식은 일반적으로 성립하지 않는다.

**주요 결과들:**
- 베르누이 시행: n번 시행, 성공 확률 p → E(X) = np
- 기하분포: 매개변수 p → E(X) = 1/p
- 평균 사례 복잡도: 알고리즘의 평균 연산 수 = E(X)

## 예시

**주사위 기대값:**
```
E(X) = (1+2+3+4+5+6)/6 = 21/6 = 7/2 = 3.5
```

**모자 돌려주기 문제 (Hatcheck Problem) - 선형성의 위력:**
```
n명이 모자를 맡기고, 무작위로 돌려받을 때 올바른 모자를 받는 사람 수의 기대값

X = X₁ + X₂ + ... + Xₙ  (Xᵢ = 1이면 i번째 사람이 정답)

E(Xᵢ) = 1 × (1/n) + 0 × (1-1/n) = 1/n

E(X) = E(X₁) + E(X₂) + ... + E(Xₙ) = n × (1/n) = 1

→ n에 관계없이 평균 1명이 올바른 모자를 받는다!
```

**순열의 전도(inversion) 수 기대값:**
```
Iᵢ,ⱼ = 1 (i < j인데 j가 i보다 앞에 오면), 0 (아니면)
X = Σ Iᵢ,ⱼ (모든 i < j)

E(Iᵢ,ⱼ) = 1/2 (각 쌍에서 어느 쪽이 앞에 올 확률 동일)
E(X) = C(n,2) × 1/2 = n(n-1)/4
```

**평균 사례 복잡도 - 선형 탐색:**
```python
# 선형 탐색의 평균 비교 횟수
def avg_linear_search(n, p):
    """
    n: 리스트 크기
    p: x가 리스트에 있을 확률
    q = 1-p: x가 리스트에 없을 확률
    """
    q = 1 - p
    # x가 i번째 원소일 확률: p/n, 비교 횟수: 2i+1
    E = sum((2*i + 1) * p/n for i in range(1, n+1))
    # x가 없을 때 비교 횟수: 2n+2
    E += (2*n + 2) * q
    return E

# p=1일 때 (반드시 있음): E = n+2
print(f"p=1: E = {avg_linear_search(100, 1)}")    # 102
# p=1/2일 때: E = (3n+4)/2
print(f"p=0.5: E = {avg_linear_search(100, 0.5)}")  # 152
```

**삽입 정렬의 평균 비교 횟수:**
```
E(Xᵢ) = (i+1)/2  (i번째 원소 삽입 시 평균 비교 횟수)

E(X) = Σᵢ₌₂ⁿ (i+1)/2 = (n² + 3n - 4)/4 = Θ(n²)
```

## 관련 개념

- [Random Variable](/knowledge/mathematics/random-variable/) - 기대값은 확률변수에 대해 정의
- [Variance](/knowledge/mathematics/variance/) - 분산은 기대값으로부터의 편차의 제곱의 기대값
- [Bernoulli Trial](/knowledge/mathematics/bernoulli-trial/) - 이항분포의 기대값은 np
- [Algorithm](/knowledge/mathematics/algorithm/) - 평균 사례 복잡도는 기대값으로 계산
- [Permutation](/knowledge/mathematics/permutation/) - 순열의 전도 수 기대값은 n(n-1)/4
