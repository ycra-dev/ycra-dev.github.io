---
title: "Monotone Boolean Function"
description: "임의의 두 입력 x ⊆ y이면 f(x) ≤ f(y)인 부울 함수 — AND/OR만으로 표현 가능하며 Dedekind 수열로 개수가 정의됨"
tags: ["Boolean Algebra", "Monotone", "Antichain", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/monotone-boolean-function
sidebar:
  order: 16
---

## 핵심 개념

단조 부울 함수(Monotone Boolean Function)는 임의의 두 입력 벡터 x, y에 대해 x ⊆ y (모든 비트 xⱼ ≤ yⱼ)이면 f(x) ≤ f(y)인 부울 함수다. 즉, 어떤 변수도 0→1로 바꿀 때 함수값이 1→0으로 되지 않는다.

## 동작 원리

**동치 조건 (세 가지가 모두 동치):**
1. f(x) ≤ f(y) whenever x ⊆ y
2. f는 {∧, ∨}만으로 표현 가능 (부정 없이)
3. 모든 소 함축식(prime implicant)에 보완된(complemented) 리터럴 없음

**Theorem Q (Quine):**
단조 함수의 최단 DNF = 소 함축식들의 선언적 소형식(disjunctive prime form).
→ 단조 함수의 경우 최소 DNF 구성이 쉬워짐

**단조 부울 함수의 수 (Dedekind 수열):**

| n | 단조 함수 수 |
|---|------------|
| 0 | 2 |
| 1 | 3 |
| 2 | 6 |
| 3 | 20 |
| 4 | 168 |
| 5 | 7,581 |
| 6 | 7,828,354 |
| 7 | 2,414,682,040,998 |

이 수열의 일반항은 아직 알려진 공식이 없다 (Dedekind 수열). D(8) = 56130437228687557907788이 최근 계산됨.

**BDD 크기와의 관계:**
- μ₆의 BDD 노드 수: 103,924
- μ₇의 BDD 노드 수: 155,207,320
- μ₈: 69,258,301,585,604 (실용 불가)

## 예시

```python
def is_monotone(truth_table, n):
    """부울 함수가 단조인지 확인"""
    for x in range(1 << n):
        for y in range(1 << n):
            # x ⊆ y (x는 y의 부분집합)?
            if (x & y) == x:  # 모든 비트에서 xⱼ ≤ yⱼ
                if truth_table[x] > truth_table[y]:
                    return False
    return True

# 단조 함수 예시들:
# AND: f(x) = x₁ ∧ x₂ ∧ ... ∧ xₙ → 단조
# OR: f(x) = x₁ ∨ x₂ ∨ ... ∨ xₙ → 단조
# 다수결: f(x) = S₂(x₁,x₂,x₃) = "2개 이상이 1" → 단조
# XOR: f(x) = x₁⊕x₂ → 비단조! (0,1→1 이지만 1,1→0)

# 단조 함수를 AND/OR만으로 표현:
# 다수결 median(x₁,x₂,x₃) = (x₁∧x₂) ∨ (x₁∧x₃) ∨ (x₂∧x₃)
```

**단조 함수의 응용:**
- 임계 함수(threshold function): w₁x₁+...+wₙxₙ ≥ t
- 신뢰성 다항식 계산
- 격자 이론에서 반사슬(antichain)

## 관련 개념

- [Prime Implicant](/knowledge/discrete-mathematics/boolean-algebra/prime-implicant/)
- [Binary Decision Diagram](/knowledge/discrete-mathematics/boolean-algebra/binary-decision-diagram/)
- [DNF and CNF](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
- [Boolean Chain](/knowledge/discrete-mathematics/boolean-algebra/boolean-chain/)
