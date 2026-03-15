---
title: "불 대수 (Boolean Algebra)"
description: "불리언 대수(Boolean algebra)란 두 개의 이항 연산 ∨(합)와 ∧(곱), 원소 0과 1, 그리고 단항 연산(보수)을 갖는 집합 B로, 항등법칙, 보수법칙, 결합법칙, 교환법칙, 분배법칙을 모두 만족하는 대수적 구조이다"
tags: ['Boolean Algebra', 'Algebraic Structure', 'Duality', 'Identities', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/boolean-algebra
sidebar:
  order: 1
---

## 핵심 개념

불리언 대수는 1854년 George Boole이 제시한 논리 규칙에 기반하며, 1938년 Claude Shannon이 이를 회로 설계에 적용했다. 불리언 대수의 핵심 항등식들은 다음과 같다:

| 항등식 | 이름 |
|--------|------|
| x̄̄ = x | 이중 보수 법칙 |
| x + x = x, x · x = x | 멱등법칙 |
| x + 0 = x, x · 1 = x | 항등법칙 |
| x + 1 = 1, x · 0 = 0 | 지배법칙 |
| x + y = y + x, xy = yx | 교환법칙 |
| x + (y + z) = (x + y) + z, x(yz) = (xy)z | 결합법칙 |
| x + yz = (x + y)(x + z), x(y + z) = xy + xz | 분배법칙 |
| (xy)̄ = x̄ + ȳ, (x + y)̄ = x̄ȳ | 드모르간 법칙 |
| x + xy = x, x(x + y) = x | 흡수법칙 |
| x + x̄ = 1 | 단위 성질 |
| xx̄ = 0 | 영 성질 |

**쌍대성 원리(Duality Principle)**: 불리언 식의 쌍대(dual)는 불리언 합과 곱을 서로 교환하고, 0과 1을 서로 교환하여 얻는다. 항등식의 양변에 쌍대를 취하면 새로운 항등식을 얻을 수 있다. 예를 들어, 흡수법칙 x(x + y) = x의 쌍대는 x + xy = x이다.

**추상적 정의**: B = {0, 1}뿐만 아니라, 명제의 집합(∨, ∧, F, T, ¬)과 보편 집합의 부분집합들(∪, ∩, ∅, U, 보집합)도 불리언 대수의 구조를 만족한다. 따라서 불리언 대수에서 증명된 결과는 이 모든 구조에 적용된다.

또한, 보원(complemented)이고 분배적(distributive)인 격자(lattice)는 불리언 대수이다.

## 예시

**예시 1: 분배법칙 x(y + z) = xy + xz 검증**

| x | y | z | y+z | xy | xz | x(y+z) | xy+xz |
|---|---|---|-----|----|----|--------|-------|
| 1 | 1 | 1 | 1   | 1  | 1  | 1      | 1     |
| 1 | 1 | 0 | 1   | 1  | 0  | 1      | 1     |
| 1 | 0 | 1 | 1   | 0  | 1  | 1      | 1     |
| 1 | 0 | 0 | 0   | 0  | 0  | 0      | 0     |
| 0 | 1 | 1 | 1   | 0  | 0  | 0      | 0     |
| 0 | 1 | 0 | 1   | 0  | 0  | 0      | 0     |
| 0 | 0 | 1 | 1   | 0  | 0  | 0      | 0     |
| 0 | 0 | 0 | 0   | 0  | 0  | 0      | 0     |

마지막 두 열이 일치하므로 항등식이 성립한다.

**예시 2: 흡수법칙의 대수적 증명**

x(x + y) = x 증명:
```
x(x + y) = (x + 0)(x + y)   [항등법칙]
         = x + 0 · y         [분배법칙]
         = x + y · 0         [교환법칙]
         = x + 0             [지배법칙]
         = x                 [항등법칙]
```

**예시 3: 쌍대(dual) 구하기**

- x(y + 0)의 쌍대: x + (y · 1)
- x · 1 + (y + z)의 쌍대: (x + 0)(yz)

**예시 4: 불리언 대수에서 명제 논리로의 변환**

분배법칙 x + yz = (x + y)(x + z)를 변환하면:
- x → p, y → q, z → r
- + → ∨, · → ∧
- 결과: p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)

## 관련 개념

- [Logical Connective](/knowledge/mathematics/logical-connective/) - 불리언 연산에 대응하는 논리 연결자
- [Boolean Function](/knowledge/mathematics/boolean-function/) - 불리언 대수 위에서 정의되는 함수
- [Truth Table](/knowledge/mathematics/truth-table/) - 불리언 항등식의 검증 방법
