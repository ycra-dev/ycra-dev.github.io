---
title: "생성 함수 (Generating Functions)"
description: "수열 a_0, a_1, a_2, ...를 G(z) = Σ a_n z^n 형태의 형식적 거듭제곱급수로 표현하여 수열의 성질을 연속 함수의 도구로 분석하는 기법"
tags: ["Combinatorics", "Discrete Mathematics", "Series", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/generating-functions
sidebar:
  order: 13
---

## 핵심 개념

생성 함수(Generating Function)는 수열 a_0, a_1, a_2, ...에 대해 다음과 같이 정의되는 형식적 거듭제곱급수다:

```
G(z) = a_0 + a_1·z + a_2·z² + ... = Σ_{n≥0} a_n · z^n
```

마치 "수열을 포장하는 용기"처럼, 수열의 모든 정보를 하나의 함수에 담아 미적분학의 강력한 도구(미분, 적분, 부분분수 분해)로 분석할 수 있게 해준다.

## 동작 원리

**두 가지 주요 유형**:
- **일반(보통) 생성 함수(OGF)**: G(z) = Σ a_n z^n — 조합론 문제에 유용
- **지수 생성 함수(EGF)**: G(z) = Σ a_n z^n / n! — 순열 관련 문제에 유용

**유명한 생성 함수들**:

| 수열 | 생성 함수 |
|------|-----------|
| 1, 1, 1, 1, ... | 1/(1-z) (기하급수) |
| C(n,0), C(n,1), ..., C(n,n) | (1+z)^n (이항계수) |
| F_0, F_1, F_2, ... (피보나치) | z/(1-z-z²) |
| H_0, H_1, H_2, ... (조화수) | -ln(1-z)/(1-z) |

**점화식 풀이 과정**:
1. 점화식에 z^n을 곱하고 합산
2. G(z)에 대한 함수 방정식 수립
3. G(z) 풀기
4. 부분분수 전개 또는 알려진 급수로 분해
5. z^n의 계수 추출 → a_n의 닫힌 형식

**핵심 기법**:
- **합성곱**: G(z)H(z) = Σ_n (Σ_{k=0}^{n} a_k b_{n-k}) z^n
- **미분**: G'(z) = Σ_{n≥1} n a_n z^{n-1} → n × a_n 수열 생성
- **이항급수**: (1+z)^r = Σ C(r,k) z^k (임의의 실수 r에 대해 성립)

## 예시

피보나치 수열의 닫힌 형식(Binet 공식) 유도:

```python
# F_n = F_{n-1} + F_{n-2}, F_0=0, F_1=1

# 생성 함수 F(z) = Σ F_n z^n 로 놓으면:
# F(z) = z + z·F(z) + z²·F(z)
# F(z)(1 - z - z²) = z
# F(z) = z / (1 - z - z²)

# 부분분수 전개:
# 1 - z - z² = -(z - 1/φ)(z - 1/ψ)  (φ, ψ = 황금비율과 켤레)
# → F_n = (φ^n - ψ^n) / √5  (Binet 공식)

import math

def binet(n):
    """피보나치 수를 황금비율로 직접 계산"""
    phi = (1 + math.sqrt(5)) / 2
    psi = (1 - math.sqrt(5)) / 2
    return round((phi**n - psi**n) / math.sqrt(5))

for i in range(10):
    print(f"F_{i} = {binet(i)}")
# 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

조화수의 생성 함수로 점근 공식 유도:

```
Σ H_n z^n = -ln(1-z)/(1-z)
→ z = 1에서의 거동을 분석하면 H_n ~ ln n + γ를 유도 가능
```

## 관련 개념

- [이항계수 (Binomial Coefficient)](/knowledge/discrete-mathematics/combinatorics/binomial-coefficient/)
- [스털링 수 (Stirling Numbers)](/knowledge/discrete-mathematics/combinatorics/stirling-numbers/)
- [조화수 (Harmonic Numbers)](/knowledge/algorithms/foundations/harmonic-numbers/)
- [점화식 (Recurrence Relation)](/knowledge/discrete-mathematics/recurrence/)
