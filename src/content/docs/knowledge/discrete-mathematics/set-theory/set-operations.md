---
title: "Set Operations"
description: "집합 연산(Set Operations)은 두 개 이상의 집합을 결합하여 새로운 집합을 만드는 연산이다"
tags: ['Set Operations', 'Union', 'Intersection', 'Complement', 'Difference', 'De Morgan', 'Set Identity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/set-operations
sidebar:
  order: 2
---

## 핵심 개념

**기본 집합 연산의 정의:**
- **합집합**: A ∪ B = {x | x ∈ A ∨ x ∈ B}
- **교집합**: A ∩ B = {x | x ∈ A ∧ x ∈ B}
- **차집합**: A − B = {x | x ∈ A ∧ x ∉ B}
- **여집합**: A̅ = {x ∈ U | x ∉ A} (전체집합 U에 대해)
- **대칭차집합**: A ⊕ B = (A − B) ∪ (B − A) = (A ∪ B) − (A ∩ B)

두 집합이 **서로소(disjoint)**라 함은 A ∩ B = ∅인 경우를 말한다.

**집합 항등식(Set Identities)**: 명제 논리의 동치법칙과 정확히 대응한다.
- **항등법칙**: A ∩ U = A, A ∪ ∅ = A
- **지배법칙**: A ∪ U = U, A ∩ ∅ = ∅
- **멱등법칙**: A ∪ A = A, A ∩ A = A
- **교환법칙**: A ∪ B = B ∪ A, A ∩ B = B ∩ A
- **결합법칙**: A ∪ (B ∪ C) = (A ∪ B) ∪ C
- **분배법칙**: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)
- **드모르간 법칙**: A ∩ B의 여집합 = A̅ ∪ B̅, A ∪ B의 여집합 = A̅ ∩ B̅
- **흡수법칙**: A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A

**포함-배제 원리**: |A ∪ B| = |A| + |B| − |A ∩ B|

**컴퓨터 표현**: 유한 전체집합 U = {a₁, a₂, ..., aₙ}에 대해, 부분집합 A를 길이 n의 비트열로 표현할 수 있다. i번째 비트가 1이면 aᵢ ∈ A이다. 이 표현으로 합집합은 비트 OR, 교집합은 비트 AND, 여집합은 비트 NOT으로 효율적으로 계산된다.

**집합 항등식 증명법 3가지:**
1. 부분집합 방법: 각 변이 다른 변의 부분집합임을 증명
2. 멤버십 표: 진리표와 유사하게 모든 경우를 확인
3. 기존 항등식 적용: 이미 증명된 항등식을 연쇄적으로 사용

## 예시

```
A = {1, 3, 5}, B = {1, 2, 3}

A ∪ B = {1, 2, 3, 5}
A ∩ B = {1, 3}
A − B = {5}
B − A = {2}
A ⊕ B = {2, 5}

포함-배제: |A ∪ B| = 3 + 3 − 2 = 4 ✓
```

비트열을 이용한 집합 연산 (U = {1,2,...,10}):
```
A = {1,3,5,7,9}  → 10 1010 1010
B = {1,2,3,4,5}  → 11 1110 0000

A ∪ B → 10 1010 1010 ∨ 11 1110 0000 = 11 1110 1010 → {1,2,3,4,5,7,9}
A ∩ B → 10 1010 1010 ∧ 11 1110 0000 = 10 1010 0000 → {1,3,5}
```

Python에서의 집합 연산:
```python
A = {1, 3, 5}
B = {1, 2, 3}
print(A | B)   # {1, 2, 3, 5}  합집합
print(A & B)   # {1, 3}        교집합
print(A - B)   # {5}           차집합
print(A ^ B)   # {2, 5}        대칭차집합
```

## 관련 개념

- [Set](/knowledge/mathematics/set/) - 집합의 기본 정의와 표기법
- [Power Set](/knowledge/mathematics/power-set/) - 멱집합과 부분집합 관계
- [Propositional Equivalence](/knowledge/mathematics/propositional-equivalence/) - 집합 항등식과 대응하는 명제 동치 법칙
- [Truth Table](/knowledge/mathematics/truth-table/) - 멤버십 표와의 유사성
- [Logical Connective](/knowledge/mathematics/logical-connective/) - ∧, ∨, ¬와 ∩, ∪, 여집합의 대응 관계
