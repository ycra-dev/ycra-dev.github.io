---
title: "논리적 동치 (Logical Equivalence)"
description: "두 합성 명제 p와 q가 모든 가능한 진리값 조합에서 동일한 진리값을 가지면 논리적 동치(logically equivalent)라 하며, p ≡ q로 표기한다"
tags: ['Logical Equivalence', 'De Morgans Law', 'Tautology', 'Contradiction', 'Propositional Equivalence']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/logical-equivalence
sidebar:
  order: 4
---

## 핵심 개념

논리적 동치는 수학적 증명과 논리적 추론에서 핵심적인 역할을 한다. 합성 명제 내의 부분을 동치인 다른 식으로 대체해도 전체 명제의 진리값이 변하지 않기 때문이다.

**주요 논리 동치 법칙들:**

| 법칙 | 내용 |
|------|------|
| **항등 법칙(Identity)** | p ∧ T ≡ p, p ∨ F ≡ p |
| **지배 법칙(Domination)** | p ∨ T ≡ T, p ∧ F ≡ F |
| **멱등 법칙(Idempotent)** | p ∨ p ≡ p, p ∧ p ≡ p |
| **이중 부정 법칙(Double Negation)** | ¬(¬p) ≡ p |
| **교환 법칙(Commutative)** | p ∨ q ≡ q ∨ p, p ∧ q ≡ q ∧ p |
| **결합 법칙(Associative)** | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) |
| **분배 법칙(Distributive)** | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| **드모르간 법칙(De Morgan's)** | ¬(p ∧ q) ≡ ¬p ∨ ¬q, ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| **흡수 법칙(Absorption)** | p ∨ (p ∧ q) ≡ p, p ∧ (p ∨ q) ≡ p |
| **부정 법칙(Negation)** | p ∨ ¬p ≡ T, p ∧ ¬p ≡ F |

**조건문 관련 동치:**
- p → q ≡ ¬p ∨ q (조건문-논리합 동치)
- p → q ≡ ¬q → ¬p (대우와의 동치)
- ¬(p → q) ≡ p ∧ ¬q

**드모르간 법칙의 확장**: n개의 명제에 대해서도 적용 가능하다.
- ¬(p₁ ∨ p₂ ∨ ... ∨ pₙ) ≡ ¬p₁ ∧ ¬p₂ ∧ ... ∧ ¬pₙ
- ¬(p₁ ∧ p₂ ∧ ... ∧ pₙ) ≡ ¬p₁ ∨ ¬p₂ ∨ ... ∨ ¬pₙ

이 법칙들은 불 대수(Boolean algebra)의 항등식과 직접 대응되며, 컴퓨터 회로 최적화, 프로그래밍에서의 조건식 단순화 등에 광범위하게 활용된다.

## 예시

¬(p → q) ≡ p ∧ ¬q 증명 (동치 법칙 연쇄 적용):
```
¬(p → q) ≡ ¬(¬p ∨ q)     (조건문-논리합 동치)
           ≡ ¬(¬p) ∧ ¬q   (드모르간 법칙)
           ≡ p ∧ ¬q        (이중 부정 법칙)
```

드모르간 법칙의 실생활 활용:
- "Miguel이 휴대폰을 가지고 있고 노트북을 가지고 있다"의 부정은
- "Miguel이 휴대폰을 가지고 있지 않거나 노트북을 가지고 있지 않다"

(p ∧ q) → (p ∨ q)가 항진명제임을 증명:
```
(p ∧ q) → (p ∨ q) ≡ ¬(p ∧ q) ∨ (p ∨ q)
                    ≡ (¬p ∨ ¬q) ∨ (p ∨ q)
                    ≡ (¬p ∨ p) ∨ (¬q ∨ q)
                    ≡ T ∨ T
                    ≡ T
```

## 관련 개념

- [Truth Table](/knowledge/mathematics/truth-table/) - 논리적 동치를 확인하는 기본 도구
- [Logical Connective](/knowledge/mathematics/logical-connective/) - 동치 법칙이 적용되는 연산자들
- [Satisfiability](/knowledge/mathematics/satisfiability/) - 항진명제와 모순의 관계
- [Rules of Inference](/knowledge/mathematics/rules-of-inference/) - 동치 법칙을 활용하여 구성되는 추론 규칙
