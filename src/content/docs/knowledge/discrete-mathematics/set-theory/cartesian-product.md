---
title: "Cartesian Product"
description: "두 집합 A와 B의 데카르트 곱(Cartesian Product) A × B는 a ∈ A이고 b ∈ B인 모든 순서쌍(ordered pair) (a, b)의 집합이다"
tags: ['Cartesian Product', 'Ordered Pair', 'Tuple', 'Relation', 'Set Theory']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/cartesian-product
sidebar:
  order: 4
---

## 핵심 개념

집합은 원소의 순서가 없지만, 실제 문제에서는 순서가 중요한 경우가 많다. 데카르트 곱은 이러한 순서가 있는 구조를 집합론적으로 다루기 위한 도구이다.

**순서 n-튜플(ordered n-tuple)**: (a₁, a₂, ..., aₙ)은 순서가 있는 모음으로, 두 n-튜플이 같으려면 대응하는 모든 원소가 같아야 한다. 순서쌍(ordered pair)은 n = 2인 특수한 경우이다. (a, b) ≠ (b, a) (단, a = b가 아닌 한).

**n개 집합의 데카르트 곱**:
A₁ × A₂ × ... × Aₙ = {(a₁, a₂, ..., aₙ) | aᵢ ∈ Aᵢ, i = 1, 2, ..., n}

**크기**: |A × B| = |A| · |B|, 더 일반적으로 |A₁ × A₂ × ... × Aₙ| = |A₁| · |A₂| · ... · |Aₙ|

**교환법칙 불성립**: A × B ≠ B × A (A = B이거나 하나가 공집합인 경우를 제외)

**관계(Relation)와의 연결**: A × B의 부분집합 R을 A에서 B로의 **관계(relation)**라 한다. 관계는 데이터베이스, 그래프 이론 등 다양한 분야의 기초가 된다. 함수 역시 특별한 관계의 한 종류이다.

컴퓨터과학에서 데카르트 곱은 데이터베이스의 조인(join) 연산, 상태 공간의 모델링, 다차원 배열의 인덱싱 등에 활용된다. 관계형 데이터베이스에서 두 테이블의 cross join이 바로 데카르트 곱이다.

## 예시

```
A = {1, 2}, B = {a, b, c}

A × B = {(1,a), (1,b), (1,c), (2,a), (2,b), (2,c)}
|A × B| = 2 × 3 = 6

B × A = {(a,1), (a,2), (b,1), (b,2), (c,1), (c,2)}
→ A × B ≠ B × A

A² = A × A = {(1,1), (1,2), (2,1), (2,2)}

3개 집합의 곱:
A = {0,1}, B = {1,2}, C = {0,1,2}
A × B × C 는 2 × 2 × 3 = 12개의 순서 3-튜플을 포함
```

관계의 예시:
```
집합 {0, 1, 2, 3} 위의 "이하" 관계:
R = {(a,b) | a ≤ b} ⊆ {0,1,2,3} × {0,1,2,3}
R = {(0,0),(0,1),(0,2),(0,3),(1,1),(1,2),(1,3),(2,2),(2,3),(3,3)}
```

Python에서 데카르트 곱:
```python
from itertools import product

A = {1, 2}
B = {'a', 'b', 'c'}
cart = set(product(A, B))
print(cart)
# {(1,'a'), (1,'b'), (1,'c'), (2,'a'), (2,'b'), (2,'c')}
```

## 관련 개념

- [Set](/knowledge/mathematics/set/) - 집합의 기본 개념
- [Function](/knowledge/mathematics/function/) - 함수는 A × B의 특별한 부분집합(관계)
- [Matrix](/knowledge/mathematics/matrix/) - 행렬의 원소 인덱싱은 행 집합 × 열 집합의 데카르트 곱
- [Predicate Logic](/knowledge/mathematics/predicate-logic/) - 다변수 술어의 정의역은 데카르트 곱
