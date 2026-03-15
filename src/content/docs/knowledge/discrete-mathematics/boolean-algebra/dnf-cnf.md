---
title: "DNF와 CNF (DNF and CNF)"
description: "부울 함수를 리터럴들의 AND인 단항식들의 OR(DNF)이나 리터럴들의 OR인 절들의 AND(CNF)로 표현하는 정규형 — SAT와 논리 최소화의 기반"
tags: ["Boolean Algebra", "Normal Forms", "Logic", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/dnf-cnf
sidebar:
  order: 15
---

## 핵심 개념

**선언적 정규형(Disjunctive Normal Form, DNF)**: 부울 함수를 리터럴들의 연언(AND)인 단항식(term)들의 논리합(OR)으로 표현한 형식이다.

**연언적 정규형(Conjunctive Normal Form, CNF)**: 리터럴들의 논리합인 절(clause)들의 연언(AND)으로 표현한 형식이다.

| 개념 | 정의 |
|------|------|
| 리터럴(literal) | xₖ 또는 x̄ₖ (변수 또는 그 부정) |
| 단항식(term/minterm) | 리터럴들의 AND |
| 절(clause/maxterm) | 리터럴들의 OR |
| DNF | (l₁∧l₂∧...) ∨ (l₃∧l₄∧...) ∨ ... |
| CNF | (l₁∨l₂∨...) ∧ (l₃∨l₄∧...) ∧ ... |

## 동작 원리

**Shannon 전개(Shannon Expansion):**
```
f(x₁,...,xₙ) = (x₁ ∧ f|_{x₁=1}) ∨ (x̄₁ ∧ f|_{x₁=0})
             = (x₁ ∨ f|_{x₁=0}) ∧ (x̄₁ ∨ f|_{x₁=1})
```
이 전개식은 BDD(Binary Decision Diagram)의 이론적 기반이다.

**함축식(Implicant):**
단항식 t가 함수 f의 함축식 ⟺ t=1이면 f=1.

**완전 DNF/CNF:**
- 완전 DNF: 모든 단항식이 모든 변수를 포함 → 최대 2ⁿ개 단항식
- 완전 CNF: 모든 절이 모든 변수를 포함 → 최대 2ⁿ개 절

**크기와 복잡도:**
- 최단 DNF 구성은 NP-hard
- 단조 함수: 최단 DNF = 소 함축식들의 논리합 (Quine의 Theorem Q)

**쌍대(Duality):**
DNF를 CNF로 변환: 모든 AND↔OR, x↔x̄ 교환

## 예시

```
f(x,y,z)의 진리표:
x y z | f
0 0 0 | 0
0 0 1 | 1
0 1 0 | 1
0 1 1 | 0
1 0 0 | 0
1 0 1 | 1
1 1 0 | 1
1 1 1 | 0

완전 DNF:
f = (x̄∧ȳ∧z) ∨ (x̄∧y∧z̄) ∨ (x∧ȳ∧z) ∨ (x∧y∧z̄)

소 DNF (최소화):
f = (ȳ∧z) ∨ (y∧z̄)  ← z와 ȳ만, 또는 y와 z̄만
= y⊕z  (XOR!)

Shannon 전개:
f(x,y,z) = (x ∧ f(1,y,z)) ∨ (x̄ ∧ f(0,y,z))
         = (x ∧ (y⊕z)) ∨ (x̄ ∧ (y⊕z))
         = y⊕z  (이 경우 x에 독립)
```

```python
def full_dnf(truth_table, n):
    """진리표로부터 완전 DNF 생성"""
    terms = []
    for i, val in enumerate(truth_table):
        if val:
            bits = format(i, f'0{n}b')
            term = []
            for j, b in enumerate(bits):
                if b == '0':
                    term.append(f'x̄{j+1}')
                else:
                    term.append(f'x{j+1}')
            terms.append('∧'.join(term))
    return ' ∨ '.join(f'({t})' for t in terms)
```

## 관련 개념

- [주항 (Prime Implicant)](/knowledge/discrete-mathematics/boolean-algebra/prime-implicant/)
- [부울 충족 가능성 (Boolean Satisfiability)](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [이진 결정 다이어그램 (Binary Decision Diagram)](/knowledge/discrete-mathematics/boolean-algebra/binary-decision-diagram/)
- [단조 불 함수 (Monotone Boolean Function)](/knowledge/discrete-mathematics/boolean-algebra/monotone-boolean-function/)
