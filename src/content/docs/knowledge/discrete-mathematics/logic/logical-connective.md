---
title: "논리 연결사 (Logical Connective)"
description: "논리 연결사(Logical Connective)는 기존 명제들을 결합하여 새로운 합성 명제(compound proposition)를 형성하는 논리 연산자이다"
tags: ['Logical Connective', 'Conjunction', 'Disjunction', 'Negation', 'Implication', 'Biconditional', 'Exclusive Or']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/logical-connective
sidebar:
  order: 2
---

## 핵심 개념

각 논리 연결사는 고유한 의미와 진리값 규칙을 갖는다:

1. **부정(Negation, ¬p)**: p의 진리값을 반전시킨다. "p가 아닌 경우"를 의미한다.

2. **논리곱(Conjunction, p ∧ q)**: p와 q가 모두 참일 때만 참이다. "p 그리고 q"를 의미한다.

3. **논리합(Disjunction, p ∨ q)**: p와 q 중 하나 이상이 참이면 참이다(포함적 OR). "p 또는 q"를 의미한다.

4. **배타적 논리합(Exclusive Or, p ⊕ q)**: p와 q 중 정확히 하나만 참일 때 참이다. 둘 다 참이거나 둘 다 거짓이면 거짓이다.

5. **조건문(Conditional, p → q)**: "p이면 q이다"를 의미한다. p가 참이고 q가 거짓인 경우에만 거짓이다. p를 가설(hypothesis), q를 결론(conclusion)이라 한다. 조건문의 **역(converse)**은 q → p, **대우(contrapositive)**는 ¬q → ¬p, **이(inverse)**는 ¬p → ¬q이다. 조건문과 대우는 항상 논리적으로 동치이다.

6. **쌍조건문(Biconditional, p ↔ q)**: "p이면 그리고 그때에만 q이다"(if and only if)를 의미한다. p와 q의 진리값이 같을 때 참이다.

**연산자 우선순위**: ¬(1) > ∧(2) > ∨(3) > →(4) > ↔(5)

컴퓨터 과학에서 이 연결사들은 비트 연산(bitwise OR, AND, XOR)으로 직접 대응되며, 디지털 회로의 논리 게이트(AND gate, OR gate, NOT gate)로 구현된다.

## 예시

진리표 예시 (조건문 p → q):
```
p | q | p → q
T | T |   T
T | F |   F
F | T |   T
F | F |   T
```

비트 연산 예시:
```
  01 1011 0110
∨ 11 0001 1101    (bitwise OR)
= 11 1011 1111

  01 1011 0110
∧ 11 0001 1101    (bitwise AND)
= 01 0001 0100

  01 1011 0110
⊕ 11 0001 1101    (bitwise XOR)
= 10 1010 1011
```

조건문의 다양한 표현:
- "p이면 q이다" (if p, then q)
- "p는 q에 대한 충분조건이다" (p is sufficient for q)
- "q는 p에 대한 필요조건이다" (q is necessary for p)
- "q unless ¬p"

## 관련 개념

- [Proposition](/knowledge/mathematics/proposition/) - 논리 연결사의 피연산자가 되는 기본 단위
- [Truth Table](/knowledge/mathematics/truth-table/) - 논리 연결사의 진리값을 체계적으로 나타내는 도구
- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 동일한 진리값을 갖는 합성 명제 관계
