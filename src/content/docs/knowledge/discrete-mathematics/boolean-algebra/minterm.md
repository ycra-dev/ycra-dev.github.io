---
title: "Minterm"
description: "리터럴(literal)은 불리언 변수 또는 그 보수를 말하며, 최소항(minterm)은 불리언 변수 x₁, x₂, "
tags: ['Minterm', 'Maxterm', 'Boolean Algebra', 'Normal Form', 'Literal', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/minterm
sidebar:
  order: 3
---

## 핵심 개념

최소항은 불리언 함수를 체계적으로 표현하는 데 핵심적인 역할을 한다.

**최소항의 핵심 성질**: 최소항은 변수들의 값의 조합 중 정확히 하나에 대해서만 값이 1이다. 구체적으로, 최소항 y₁y₂···yₙ이 1이 되려면 각 yᵢ가 1이어야 하며, 이는 yᵢ = xᵢ일 때 xᵢ = 1이고, yᵢ = x̄ᵢ일 때 xᵢ = 0인 경우에만 성립한다.

예를 들어, 변수 x, y, z에 대해:
- xyz는 x=1, y=1, z=1일 때만 1
- xȳz는 x=1, y=0, z=1일 때만 1
- x̄yz̄는 x=0, y=1, z=0일 때만 1

**리터럴과 최소항의 관계**:
- n개의 변수에 대해 2n개의 리터럴이 존재 (각 변수와 그 보수)
- n개의 변수에 대해 2ⁿ개의 최소항이 존재

**최대항(Maxterm)**: 최소항의 쌍대 개념으로, y₁ + y₂ + ··· + yₙ 형태의 불리언 합이다. 최대항은 정확히 하나의 값 조합에서만 0을 갖는다. 최대항의 불리언 곱으로 함수를 표현한 것이 곱의 합(product-of-sums) 전개 또는 결합 정규형(conjunctive normal form)이다.

**비트 문자열 표현**: 최소항은 비트 문자열로 표현할 수 있다. 변수 xᵢ가 나타나면 i번째 비트는 1, x̄ᵢ가 나타나면 0으로 표시한다. 이 표현은 Quine-McCluskey 방법에서 중요하게 활용된다.

## 예시

**예시 1: 특정 값 조합에 대한 최소항 찾기**

x₁ = 0, x₂ = 1, x₃ = 0, x₄ = 1, x₅ = 1일 때 값이 1인 최소항:
- xᵢ = 0이면 x̄ᵢ를 사용, xᵢ = 1이면 xᵢ를 사용
- 결과: x̄₁x₂x̄₃x₄x₅

**예시 2: 3변수 최소항의 전체 목록**

| 최소항 | 비트 문자열 | x=1, y=1, z=1일 때의 값 |
|--------|-------------|------------------------|
| xyz    | 111         | x=1, y=1, z=1 → 1     |
| xȳz   | 101         | x=1, y=0, z=1 → 1     |
| xyz̄   | 110         | x=1, y=1, z=0 → 1     |
| xȳz̄   | 100         | x=1, y=0, z=0 → 1     |
| x̄yz   | 011         | x=0, y=1, z=1 → 1     |
| x̄ȳz   | 001         | x=0, y=0, z=1 → 1     |
| x̄yz̄   | 010         | x=0, y=1, z=0 → 1     |
| x̄ȳz̄   | 000         | x=0, y=0, z=0 → 1     |

**예시 3: 최소항의 불리언 합으로 함수 표현**

G(x, y, z)가 x=y=1, z=0일 때와 x=z=0, y=1일 때 값이 1인 경우:
- 첫 번째 조건 → xyz̄
- 두 번째 조건 → x̄yz̄
- G(x, y, z) = xyz̄ + x̄yz̄

## 관련 개념

- [Boolean Function](/knowledge/mathematics/boolean-function/) - 최소항은 불리언 함수를 구성하는 기본 요소
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - 최소항의 불리언 합으로 함수를 표현
- [Truth Table](/knowledge/mathematics/truth-table/) - 진리표의 각 행은 하나의 최소항에 대응
- [Karnaugh Map](/knowledge/mathematics/karnaugh-map/) - K-맵의 각 셀이 하나의 최소항을 나타냄
- [Quine-McCluskey Method](/knowledge/mathematics/quine-mccluskey-method/) - 최소항의 비트 문자열 표현을 활용
