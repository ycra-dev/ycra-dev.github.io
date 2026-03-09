---
title: "Functional Completeness"
description: "연산자 집합이 함수적으로 완전(functionally complete)하다는 것은, 모든 불리언 함수를 해당 연산자들만으로 표현할 수 있다는 것을 의미한다"
tags: ['Functional Completeness', 'Nand', 'Nor', 'Boolean Operators', 'Digital Logic', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/functional-completeness
sidebar:
  order: 5
---

## 핵심 개념

모든 불리언 함수는 곱의 합 전개를 가지므로, {·, +, ¯} 집합이 함수적으로 완전함이 보장된다. 핵심 질문은 더 작은 연산자 집합으로도 충분한가이다.

**두 연산자로의 축소**:

드모르간 법칙을 이용하면 세 연산자 중 하나를 나머지 둘로 표현할 수 있다:
- x + y = x̄ · ȳ의 양변에 이중 보수 → {·, ¯}가 함수적 완전
- xy = x̄ + ȳ의 양변에 이중 보수 → {+, ¯}가 함수적 완전

그러나 {+, ·}는 함수적으로 완전하지 않다. 보수 함수 F(x) = x̄를 이 두 연산만으로 표현할 수 없기 때문이다.

**단일 연산자로의 축소**:

NAND 연산자(|): x | y는 x와 y가 모두 1일 때만 0, 나머지는 1
- 정의: 1|1=0, 1|0=1, 0|1=1, 0|0=1

NOR 연산자(↓): x ↓ y는 x와 y가 모두 0일 때만 1, 나머지는 0
- 정의: 1↓1=0, 1↓0=0, 0↓1=0, 0↓0=1

**{|}의 함수적 완전성 증명**:

{·, ¯}가 함수적 완전하므로, · 와 ¯를 |로 표현하면 충분하다:
- 보수: x̄ = x | x
- 곱: xy = (x|y) | (x|y)

따라서 {|}는 함수적으로 완전하다. 마찬가지로 {↓}도 함수적으로 완전하다:
- 보수: x̄ = x ↓ x
- 합: x + y = (x↓y) ↓ (x↓y)

이 결과는 회로 설계에서 매우 중요하다. NAND 게이트나 NOR 게이트 하나의 종류만으로 모든 디지털 회로를 구성할 수 있다는 것을 의미하기 때문이다.

## 예시

**예시 1: NAND로 기본 연산 표현**

```
보수:  x̄ = x | x
       검증: 1|1 = 0 = 1̄  ✓
             0|0 = 1 = 0̄  ✓

곱:    xy = (x|y) | (x|y)
       검증: x=1, y=1 → (1|1)|(1|1) = 0|0 = 1 = 1·1  ✓
             x=1, y=0 → (1|0)|(1|0) = 1|1 = 0 = 1·0  ✓

합:    x + y = (x|x) | (y|y) = x̄ | ȳ
       (x̄ | ȳ = NOT(x̄ AND ȳ) = NOT(NOT x AND NOT y) = x OR y, 드모르간)
       검증: x=0, y=0 → (0|0)|(0|0) = 1|1 = 0 = 0+0  ✓
             x=1, y=0 → (1|1)|(0|0) = 0|1 = 1 = 1+0  ✓
```

**예시 2: NOR로 기본 연산 표현**

```
보수:  x̄ = x ↓ x
합:    x + y = (x↓y) ↓ (x↓y)
곱:    xy = (x↓x) ↓ (y↓y) = x̄ ↓ ȳ
```

**예시 3: {+, ·}가 함수적으로 불완전한 이유**

+와 ·만 사용하여 F(x) = x̄를 표현하려고 시도:
- x=1을 대입하면 +와 ·의 조합으로 0을 만들 수 없다
- 이는 F(1,...,1) = 1을 갖는 함수만 표현 가능하기 때문

## 관련 개념

- [Boolean Algebra](/knowledge/mathematics/boolean-algebra/) - 함수적 완전성의 기반이 되는 대수적 구조
- [Boolean Function](/knowledge/mathematics/boolean-function/) - 함수적 완전 집합으로 모든 불리언 함수를 표현
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - {·, +, ¯}의 함수적 완전성을 보장하는 표현
- [Logic Gate](/knowledge/mathematics/logic-gate/) - NAND/NOR 게이트만으로 모든 회로 구성 가능
- [Logical Connective](/knowledge/mathematics/logical-connective/) - 불리언 연산자와 논리 연결자의 대응
