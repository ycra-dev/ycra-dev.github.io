---
title: "Sum-of-Products Expansion"
description: "곱의 합 전개(sum-of-products expansion)란 불리언 함수를 최소항(minterm)들의 불리언 합으로 표현한 것이다"
tags: ['Sum Of Products', 'Disjunctive Normal Form', 'Boolean Function', 'Canonical Form', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/sum-of-products-expansion
sidebar:
  order: 4
---

## 핵심 개념

곱의 합 전개는 불리언 함수를 표준적인 형태로 표현하는 방법이다. 이는 회로 설계의 출발점이 되며, 이후 최소화(minimization) 과정을 통해 더 간단한 회로를 설계할 수 있다.

**구성 방법**:
1. 불리언 함수의 진리표에서 함수 값이 1인 행을 찾는다.
2. 각 행에 대해 해당하는 최소항을 만든다 (변수값이 1이면 해당 변수를, 0이면 보수를 사용).
3. 이 최소항들의 불리언 합(OR)을 구한다.

**대수적 방법**: 진리표를 사용하지 않고 불리언 항등식을 이용하여 직접 전개할 수도 있다.
- 분배법칙으로 곱을 전개
- 항등법칙(x · 1 = x)과 단위 성질(x + x̄ = 1)을 사용하여 누락된 변수를 추가
- 멱등법칙(x + x = x)으로 중복 항 제거

**곱의 합 전개의 의의**:
- 모든 불리언 함수가 ·, +, ¯ 세 연산만으로 표현 가능함을 증명
- 함수의 유일한 표준 표현을 제공 (최소항의 순서 제외)
- 회로 설계의 체계적인 시작점

**결합 정규형(Conjunctive Normal Form, CNF)**: 곱의 합 전개의 쌍대 개념으로, 최대항(maxterm)들의 불리언 곱으로 함수를 표현한다. 곱의 합 전개로부터 쌍대를 취하여 구할 수 있다.

## 예시

**예시 1: 진리표로부터 곱의 합 전개**

F(x, y, z) = (x + y)z̄ 의 곱의 합 전개를 구하기:

| x | y | z | (x+y) | z̄ | F |
|---|---|---|-------|---|---|
| 1 | 1 | 0 | 1     | 1 | 1 |
| 1 | 0 | 0 | 1     | 1 | 1 |
| 0 | 1 | 0 | 1     | 1 | 1 |

F = 1인 행에 대응하는 최소항:
- (1,1,0) → xyz̄
- (1,0,0) → xȳz̄
- (0,1,0) → x̄yz̄

따라서: F(x, y, z) = xyz̄ + xȳz̄ + x̄yz̄

**예시 2: 대수적 방법으로 곱의 합 전개**

```
F(x, y, z) = (x + y)z̄
           = xz̄ + yz̄                [분배법칙]
           = x · 1 · z̄ + 1 · y · z̄  [항등법칙]
           = x(y + ȳ)z̄ + (x + x̄)yz̄  [단위 성질]
           = xyz̄ + xȳz̄ + xyz̄ + x̄yz̄  [분배법칙]
           = xyz̄ + xȳz̄ + x̄yz̄        [멱등법칙]
```

**예시 3: 다수결 투표 함수**

3명의 투표에서 2명 이상이 찬성하면 통과하는 함수:
F(x, y, z) = xy + xz + yz

곱의 합 전개:
- F = 1인 경우: (1,1,1), (1,1,0), (1,0,1), (0,1,1)
- F(x, y, z) = xyz + xyz̄ + xȳz + x̄yz

## 관련 개념

- [Minterm](/knowledge/mathematics/minterm/) - 곱의 합 전개를 구성하는 기본 단위
- [Boolean Function](/knowledge/mathematics/boolean-function/) - 곱의 합 전개로 표현되는 대상
- [Boolean Algebra](/knowledge/mathematics/boolean-algebra/) - 전개에 사용되는 항등식의 근거
- [Functional Completeness](/knowledge/mathematics/functional-completeness/) - 곱의 합 전개가 {·, +, ¯}의 함수적 완전성을 증명
- [Karnaugh Map](/knowledge/mathematics/karnaugh-map/) - 곱의 합 전개를 최소화하는 시각적 도구
- [Logic Gate](/knowledge/mathematics/logic-gate/) - 곱의 합 전개로부터 회로를 직접 구성 가능
