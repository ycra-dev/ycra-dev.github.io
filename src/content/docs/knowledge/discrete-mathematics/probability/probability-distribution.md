---
title: "Probability Distribution"
description: "확률분포(probability distribution)는 표본공간 S의 각 결과 s에 확률 p(s)를 할당하는 함수로, (i) 모든 s ∈ S에 대해 0 ≤ p(s) ≤ 1이고, (ii) 모든 확률의 합 Σp(s) = 1을 만족해야 한다"
tags: ['Probability Distribution', 'Uniform Distribution', 'Probability', 'Sample Space']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/probability-distribution
sidebar:
  order: 2
---

## 핵심 개념

라플라스의 정의(모든 결과가 동일 확률)를 일반화하여, 결과마다 서로 다른 확률을 가질 수 있게 확장한 것이 확률분포이다. 두 가지 핵심 조건은:

1. **비음수 조건**: 각 결과의 확률은 0 이상 1 이하
2. **정규화 조건**: 모든 결과의 확률 합은 정확히 1

사건 E의 확률은 해당 사건에 속하는 모든 결과의 확률의 합으로 정의된다:

$$p(E) = \sum_{s \in E} p(s)$$

**균등분포(uniform distribution)**: n개의 원소를 가진 집합 S에서 각 원소에 1/n의 확률을 할당하는 특수한 분포. 이것이 라플라스의 원래 정의와 일치한다.

확률분포는 실험의 결과가 동일하게 발생하지 않는 상황(편향된 동전, 로딩된 주사위 등)을 모델링할 수 있게 해준다. 실무적으로 p(s)는 실험을 무한히 반복했을 때 결과 s가 나타나는 비율의 극한값으로 해석된다.

## 예시

**편향된 동전:**
```
공정한 동전: p(H) = p(T) = 1/2
편향된 동전 (앞면이 뒷면보다 2배 자주):
  p(H) = 2p(T), p(H) + p(T) = 1
  → p(T) = 1/3, p(H) = 2/3
```

**편향된 주사위 (3이 다른 숫자보다 2배 자주 나옴):**
```
p(1) = p(2) = p(4) = p(5) = p(6) = 1/7
p(3) = 2/7
검증: 5 × (1/7) + 2/7 = 7/7 = 1 ✓

사건 E = {홀수} = {1, 3, 5}의 확률:
p(E) = 1/7 + 2/7 + 1/7 = 4/7
```

**Python으로 확률분포 시뮬레이션:**
```python
import random

# 편향된 주사위 시뮬레이션
weights = {1: 1, 2: 1, 3: 2, 4: 1, 5: 1, 6: 1}  # 3이 2배
outcomes = list(weights.keys())
probs = [w/sum(weights.values()) for w in weights.values()]

# 10000번 시뮬레이션
results = random.choices(outcomes, weights=probs, k=10000)
for i in range(1, 7):
    print(f"p({i}) ≈ {results.count(i)/10000:.4f}")
```

## 관련 개념

- [Sample Space](/knowledge/mathematics/sample-space/) - 확률분포가 정의되는 기반 집합
- [Random Variable](/knowledge/mathematics/random-variable/) - 확률분포 위에서 정의되는 함수
- [Bernoulli Trial](/knowledge/mathematics/bernoulli-trial/) - 이항분포는 특수한 확률분포
- [Function](/knowledge/mathematics/function/) - 확률분포는 표본공간에서 실수로의 함수
