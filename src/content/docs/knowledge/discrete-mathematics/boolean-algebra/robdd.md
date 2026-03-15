---
title: "ROBDD"
description: "순서 조건과 축소 조건을 만족하는 정식(canonical) BDD — 같은 부울 함수와 변수 순서에 대해 유일한 표현을 보장"
tags: ["Boolean Algebra", "BDD", "Canonical Form", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/robdd
sidebar:
  order: 14
---

## 핵심 개념

ROBDD(Reduced Ordered Binary Decision Diagram)는 두 가지 조건을 만족하는 정식(canonical) BDD다:
1. **순서 조건**: 루트에서 리프까지 변수가 고정된 전순서로 등장
2. **축소 조건**: 동일한 서브다이어그램 공유 및 LO=HI인 중복 노드 제거

**정식 형태의 의미:** 동일한 부울 함수 f와 동일한 변수 순서 π에 대해 ROBDD는 **유일**하다.

## 동작 원리

**정식성의 강력한 결과:**
- f = g ⟺ ROBDD(f) = ROBDD(g) (포인터 비교만으로 동치 판별)
- f = 0 ⟺ ROBDD(f) = 0 노드 (충족불가능성 즉시 판별)

**구조:**
- 내부 노드: (V, LO, HI) — 변수 인덱스, 0-분기, 1-분기
- 리프(sink): 0 또는 1

**중요 연산의 복잡도:**
- AND/OR/XOR(f, g): O(B(f) × B(g))
- NOT(f): O(B(f)) (또는 보수 에지 기법으로 O(1))
- RESTRICT(f, xᵥ=b): O(B(f))
- QUANTIFY(f, ∃xᵥ): O(B(f)²)

**보수 에지(Complemented Edges) 최적화:**
LO 또는 HI 포인터에 보수 비트를 붙여 보수 함수를 별도 노드 없이 표현한다. 메모리를 절약하고 NOT 연산을 O(1)로 줄인다.

**변수 순서의 중요성:**
- 좋은 순서: B(f) = O(n)
- 나쁜 순서: B(f) = O(2ⁿ)
- 최적 순서 찾기는 NP-hard

## 예시

```
ROBDD 구성 예시:
f(x₁,x₂,x₃) = x₁∧x₂ ∨ x̄₁∧x₃

변수 순서 x₁ < x₂ < x₃:

      x₁ (노드 1)
     /    \
   x₃     x₂  (노드 2, 3)
   / \    / \
  0   1  0   1

Unique Table: (x₃)노드와 (x₂)노드는 모두 (LO=0, HI=1) 구조
→ 구조가 같아도 변수가 다르면 다른 노드 (공유 불가)

총 노드 수: 5 (내부 3 + 리프 2 = 전체 트리 14개 노드보다 훨씬 작음)
```

```python
# ROBDD 노드 표현
class BDDNode:
    def __init__(self, var, lo, hi):
        self.var = var  # 변수 인덱스
        self.lo = lo    # 0-분기 (x_var = 0)
        self.hi = hi    # 1-분기 (x_var = 1)

# Unique Table을 이용한 노드 생성 (중복 방지)
unique_table = {}

def make_node(var, lo, hi):
    if lo == hi:  # 중복성 제거
        return lo
    key = (var, id(lo), id(hi))
    if key not in unique_table:
        unique_table[key] = BDDNode(var, lo, hi)
    return unique_table[key]
```

## 관련 개념

- [이진 결정 다이어그램 (Binary Decision Diagram)](/knowledge/discrete-mathematics/boolean-algebra/binary-decision-diagram/)
- [부울 충족 가능성 (Boolean Satisfiability)](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [조합 복잡도 (Combinational Complexity)](/knowledge/discrete-mathematics/boolean-algebra/combinational-complexity/)
- [단조 불 함수 (Monotone Boolean Function)](/knowledge/discrete-mathematics/boolean-algebra/monotone-boolean-function/)
