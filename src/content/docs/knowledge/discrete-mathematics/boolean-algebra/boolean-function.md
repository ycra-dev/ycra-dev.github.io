---
title: "Boolean Function"
description: "불리언 함수(Boolean function)란 B = {0, 1}에서 B^n에서 B로의 함수로, n개의 불리언 변수를 입력으로 받아 0 또는 1의 값을 출력하는 함수이다"
tags: ['Boolean Algebra', 'Boolean Function', 'Truth Table', 'Digital Logic', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/boolean-function
sidebar:
  order: 2
---

## 핵심 개념

불리언 함수는 디지털 회로의 수학적 기반이다. 각 입력과 출력이 0 또는 1만을 가지므로, 전자 스위치의 on/off 상태를 모델링하는 데 적합하다.

불리언 함수는 세 가지 기본 연산으로 구성된다:
- **보수(complement)**: x̄로 표기. 0̄ = 1, 1̄ = 0
- **불리언 합(Boolean sum)**: +로 표기 (OR). 1+1=1, 1+0=1, 0+1=1, 0+0=0
- **불리언 곱(Boolean product)**: ·로 표기 (AND). 1·1=1, 1·0=0, 0·1=0, 0·0=0

연산자 우선순위: 보수 > 불리언 곱 > 불리언 합

불리언 변수와 이 세 연산을 사용해 재귀적으로 불리언 식(Boolean expression)을 정의할 수 있다:
1. 0, 1, x₁, x₂, ..., xₙ은 불리언 식이다.
2. E₁, E₂가 불리언 식이면 Ē₁, (E₁E₂), (E₁ + E₂)도 불리언 식이다.

차수 n인 불리언 함수의 개수는 2^(2^n)이다. 이는 2^n개의 서로 다른 입력 조합 각각에 0 또는 1을 할당할 수 있기 때문이다. 예를 들어 n=2이면 16개, n=3이면 256개의 서로 다른 불리언 함수가 존재한다.

두 불리언 식이 같은 함수를 나타내면 이를 동치(equivalent)라 한다. 예를 들어, xy, xy + 0, xy · 1은 모두 동치이다.

## 예시

**예시 1: F(x, y, z) = xy + z̄ 의 진리표**

| x | y | z | xy | z̄ | F = xy + z̄ |
|---|---|---|----|----|------------|
| 1 | 1 | 1 | 1  | 0  | 1          |
| 1 | 1 | 0 | 1  | 1  | 1          |
| 1 | 0 | 1 | 0  | 0  | 0          |
| 1 | 0 | 0 | 0  | 1  | 1          |
| 0 | 1 | 1 | 0  | 0  | 0          |
| 0 | 1 | 0 | 0  | 1  | 1          |
| 0 | 0 | 1 | 0  | 0  | 0          |
| 0 | 0 | 0 | 0  | 1  | 1          |

**예시 2: 불리언 함수의 개수**

차수 n인 불리언 함수의 개수:
- n=1: 2^(2^1) = 4개
- n=2: 2^(2^2) = 16개
- n=3: 2^(2^3) = 256개
- n=4: 2^(2^4) = 65,536개

**예시 3: 불리언 식의 계산**

```
1 · 0̄ + (0 + 1)̄
= 1 · 1 + (1)̄      (보수 계산)
= 1 + 0             (곱과 보수 계산)
= 1                  (합 계산)
```

이를 명제 논리로 변환하면: (T ∧ ¬F) ∨ ¬(F ∨ T) ≡ T

## 관련 개념

- [Truth Table](/knowledge/mathematics/truth-table/) - 불리언 함수의 값을 표로 나타내는 방법
- [Boolean Algebra](/knowledge/mathematics/boolean-algebra/) - 불리언 함수가 정의되는 대수적 구조
- [Minterm](/knowledge/mathematics/minterm/) - 불리언 함수를 표현하는 기본 단위
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - 불리언 함수의 표준 표현 방식
