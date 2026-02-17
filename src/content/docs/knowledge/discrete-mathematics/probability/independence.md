---
title: "Independence"
description: "두 사건 E와 F가 독립(independent)이란, p(E ∩ F) = p(E)p(F)를 만족하는 것이다"
tags: ['Independence', 'Probability', 'Pairwise Independence', 'Mutual Independence', 'Events']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/independence
sidebar:
  order: 4
---

## 핵심 개념

독립성의 핵심 의미는 한 사건에 대한 정보가 다른 사건의 확률을 변경하지 않는다는 것이다. 수학적으로, p(E|F) = p(E)이면 E와 F는 독립이며, 이는 p(E ∩ F) = p(E)p(F)와 동치이다.

**세 가지 수준의 독립:**

1. **쌍별 독립(pairwise independence)**: 모든 두 사건 쌍 Eᵢ, Eⱼ에 대해 p(Eᵢ ∩ Eⱼ) = p(Eᵢ)p(Eⱼ)

2. **상호 독립(mutual independence)**: 임의의 m개(m ≥ 2) 사건의 부분집합 Eᵢ₁, Eᵢ₂, ..., Eᵢₘ에 대해
   p(Eᵢ₁ ∩ Eᵢ₂ ∩ ... ∩ Eᵢₘ) = p(Eᵢ₁)p(Eᵢ₂)...p(Eᵢₘ)

3. **주의**: 상호 독립이면 반드시 쌍별 독립이지만, 쌍별 독립이라고 반드시 상호 독립은 아니다.

독립성은 확률론에서 매우 중요한 역할을 한다:
- 베르누이 시행에서 각 시행의 독립성
- 몬테카를로 알고리즘에서 반복 시행의 독립성
- 기대값의 곱 법칙: E(XY) = E(X)E(Y) (독립일 때만)
- 분산의 덧셈 법칙: V(X+Y) = V(X) + V(Y) (독립일 때)

## 예시

**독립인 경우:**
```
4비트 문자열(16개 동일 확률)
E = "1로 시작" → p(E) = 8/16 = 1/2
F = "짝수 개의 1을 포함" → p(F) = 8/16 = 1/2
E ∩ F = {1111, 1100, 1010, 1001} → p(E ∩ F) = 4/16 = 1/4

p(E)p(F) = (1/2)(1/2) = 1/4 = p(E ∩ F) ✓ → 독립
```

**독립이 아닌 경우:**
```
두 자녀 가정 (BB, BG, GB, GG 동일 확률)
E = "두 아이 모두 남자" = {BB} → p(E) = 1/4
F = "적어도 한 명 남자" = {BB, BG, GB} → p(F) = 3/4
E ∩ F = {BB} → p(E ∩ F) = 1/4

p(E)p(F) = (1/4)(3/4) = 3/16 ≠ 1/4 = p(E ∩ F)
→ 독립이 아님
```

**독립 사건의 여사건도 독립:**
```
E와 F가 독립이면 → Ē와 F̅도 독립

증명:
p(Ē ∩ F) = p(F) - p(E ∩ F)
           = p(F) - p(E)p(F)
           = p(F)(1 - p(E))
           = p(F)p(Ē)
```

**Python으로 독립성 검증:**
```python
from itertools import product

# 동전 3번 던지기
S = list(product(['H', 'T'], repeat=3))  # 8개 결과

# E: 홀수 개의 T, F: 첫 번째가 T
E = [s for s in S if s.count('T') % 2 == 1]
F = [s for s in S if s[0] == 'T']
E_and_F = [s for s in S if s in E and s in F]

p_E = len(E) / len(S)       # 4/8 = 0.5
p_F = len(F) / len(S)       # 4/8 = 0.5
p_EF = len(E_and_F) / len(S)  # 2/8 = 0.25

print(f"p(E) = {p_E}, p(F) = {p_F}")
print(f"p(E∩F) = {p_EF}, p(E)·p(F) = {p_E * p_F}")
print(f"독립: {abs(p_EF - p_E * p_F) < 1e-10}")  # True
```

## 관련 개념

- [Conditional Probability](/knowledge/mathematics/conditional-probability/) - 독립이면 조건부 확률이 무조건부 확률과 같음
- [Bernoulli Trial](/knowledge/mathematics/bernoulli-trial/) - 독립적인 반복 시행이 핵심 가정
- [Expected Value](/knowledge/mathematics/expected-value/) - 독립 확률변수의 곱의 기대값은 기대값의 곱
- [Variance](/knowledge/mathematics/variance/) - 독립 확률변수의 합의 분산은 분산의 합 (비에네메 공식)
