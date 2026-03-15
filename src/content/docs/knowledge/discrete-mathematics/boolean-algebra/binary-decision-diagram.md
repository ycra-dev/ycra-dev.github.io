---
title: "이진 결정 다이어그램 (Binary Decision Diagram)"
description: "부울 함수를 순서 있는 이진 결정 트리를 압축한 DAG로 표현하는 자료구조 — 각 내부 노드가 변수를 나타내고 LO/HI 두 자식을 가짐"
tags: ["Boolean Algebra", "BDD", "DAG", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/binary-decision-diagram
sidebar:
  order: 13
---

## 핵심 개념

이진 결정 다이어그램(Binary Decision Diagram, BDD)은 부울 함수를 순서가 있는 이진 결정 트리(나중에 DAG로 압축)로 표현하는 자료구조다. 각 내부 노드는 변수 xᵥ를 나타내고, 두 개의 자식 포인터(LO: 0-분기, HI: 1-분기)를 가진다.

ROBDD(Reduced Ordered BDD)는 두 가지 정규화 규칙을 적용한 정식 형태다:
1. **순서**: 루트에서 리프까지 변수가 고정된 순서로 등장
2. **축소**: 동일한 서브트리 공유, LO=HI인 중복 노드 제거

## 동작 원리

**BDD의 주요 특성:**
- 동일한 함수는 변수 순서가 같으면 **유일한** ROBDD를 가짐
- B(f): BDD의 노드 수
- 변수 순서에 따라 크기가 지수적으로 달라질 수 있음

**핵심 알고리즘:**
- **Algorithm C** (계수): 경로 수 = 함수의 true 입력 수 계산 O(B(f))
- **Algorithm B** (최적화): 가중치 합을 최대화하는 입력 벡터 탐색
- **Algorithm S** (합성): 두 BDD를 하나로 결합

**BDD Base와 Unique Table:**
- **Unique Table**: 변수별로 (LO, HI) → 노드 주소 매핑, 중복 방지
- **Memo Cache**: 이전에 계산한 f∧g=r 결과 저장 (해시 기반)

**크기 한계:**
- 단조 함수 μ₇: 155,207,320 노드
- μ₈: 69,258,301,585,604 노드 (실용 불가)
- 변수 순서 최적화가 실용성의 핵심

## 예시

```
함수 f(x₁,x₂,x₃,x₄) = x₁⊕x₂⊕x₃⊕x₄ (패리티)의 BDD:

변수 순서 x₁ < x₂ < x₃ < x₄:
     x₁
    /   \
   x₂   x₂
   / \ / \
  x₃  x₃  ...
각 수준에서 패리티 추적
→ 크기 O(n)
```

```python
# BDD 합성 알고리즘 (f ∧ g):
def AND(f, g):
    if f == 0 or g == 0: return 0
    if f == 1: return g
    if g == 1: return f
    if f == g: return f
    v = min(f.var, g.var)
    rl = AND(f.lo(v), g.lo(v))
    rh = AND(f.hi(v), g.hi(v))
    return UNIQUE(v, rl, rh)

# Memo Cache로 중복 계산 방지
# Unique Table로 동일 노드 공유
```

## 관련 개념

- [ROBDD](/knowledge/discrete-mathematics/boolean-algebra/robdd/)
- [불 체인 (Boolean Chain)](/knowledge/discrete-mathematics/boolean-algebra/boolean-chain/)
- [부울 충족 가능성 (Boolean Satisfiability)](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [단조 불 함수 (Monotone Boolean Function)](/knowledge/discrete-mathematics/boolean-algebra/monotone-boolean-function/)
