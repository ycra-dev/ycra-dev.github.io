---
title: "Matrix"
description: "행렬(Matrix)은 수를 직사각형 형태로 배열한 것이다"
tags: ['Matrix', 'Matrix Multiplication', 'Transpose', 'Identity Matrix', 'Boolean Matrix', 'Linear Algebra']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/matrix
sidebar:
  order: 11
---

## 핵심 개념

행렬은 이산수학에서 관계(relation), 그래프(graph), 통신 네트워크 등 다양한 이산 구조를 표현하는 데 사용된다. 행렬 A = [aᵢⱼ]에서 aᵢⱼ는 i번째 행, j번째 열의 원소이다.

**행렬 덧셈**: A + B = [aᵢⱼ + bᵢⱼ] (같은 크기의 행렬에서만 정의)

**행렬 곱셈**: A가 m × k, B가 k × n일 때, AB는 m × n 행렬
- (AB)ᵢⱼ = aᵢ₁b₁ⱼ + aᵢ₂b₂ⱼ + ... + aᵢₖbₖⱼ = ∑ₗ₌₁ᵏ aᵢₗbₗⱼ
- A의 열 수와 B의 행 수가 같아야 정의됨
- **결합법칙 성립**: A(BC) = (AB)C
- **교환법칙 불성립**: AB ≠ BA (일반적으로)
- **분배법칙 성립**: A(B + C) = AB + AC

**단위행렬(Identity Matrix)**: Iₙ = [δᵢⱼ] (Kronecker delta)
- δᵢⱼ = 1 (i = j), δᵢⱼ = 0 (i ≠ j)
- AIₙ = IₘA = A (m × n 행렬 A에 대해)

**행렬의 거듭제곱**: 정방행렬 A에 대해 A⁰ = Iₙ, Aʳ = A·A·...·A (r번)

**전치행렬(Transpose)**: Aᵗ = [bᵢⱼ], bᵢⱼ = aⱼᵢ (행과 열을 교환)
- (Aᵗ)ᵗ = A
- (A + B)ᵗ = Aᵗ + Bᵗ
- (AB)ᵗ = BᵗAᵗ (순서 역전!)

**대칭행렬(Symmetric Matrix)**: A = Aᵗ, 즉 aᵢⱼ = aⱼᵢ

**0-1 행렬(Zero-One Matrix)**: 모든 원소가 0 또는 1인 행렬. 관계와 그래프를 표현하는 데 사용.
- **합(join)**: A ∨ B = [aᵢⱼ ∨ bᵢⱼ] (비트 OR)
- **곱(meet)**: A ∧ B = [aᵢⱼ ∧ bᵢⱼ] (비트 AND)
- **부울곱(Boolean product)**: A ⊙ B의 (i,j) 원소는 (aᵢ₁ ∧ b₁ⱼ) ∨ (aᵢ₂ ∧ b₂ⱼ) ∨ ... ∨ (aᵢₖ ∧ bₖⱼ)
  - 일반 곱에서 ×를 ∧로, +를 ∨로 대체한 것
- **부울 거듭제곱**: A[r] = A ⊙ A ⊙ ... ⊙ A (r번) - 그래프에서 경로 존재 여부 판단에 사용

## 예시

```
행렬 곱셈:
A = [1 0 4]    B = [2 4]
    [2 1 1]        [1 1]
    [3 1 0]        [3 0]
    [0 2 2]

AB의 (1,1) = 1·2 + 0·1 + 4·3 = 14
AB의 (3,1) = 3·2 + 1·1 + 0·3 = 7

AB = [14  4]
     [ 8  9]
     [ 7 13]
     [ 8  2]

전치행렬:
A = [1 2 3]     Aᵗ = [1 4]
    [4 5 6]          [2 5]
                     [3 6]
```

0-1 행렬의 부울 연산:
```
A = [1 0 1]    B = [0 1 0]
    [0 1 0]        [1 1 0]

A ∨ B = [1 1 1]    (비트 OR)
        [1 1 0]

A ∧ B = [0 0 0]    (비트 AND)
        [0 1 0]
```

부울곱 A ⊙ B:
```
A = [1 0]    B = [1 1 0]
    [0 1]        [0 1 1]
    [1 0]

A ⊙ B = [(1∧1)∨(0∧0)  (1∧1)∨(0∧1)  (1∧0)∨(0∧1)]   [1 1 0]
        [(0∧1)∨(1∧0)  (0∧1)∨(1∧1)  (0∧0)∨(1∧1)] = [0 1 1]
        [(1∧1)∨(0∧0)  (1∧1)∨(0∧1)  (1∧0)∨(0∧1)]   [1 1 0]
```

Python에서의 행렬 연산:
```python
import numpy as np

A = np.array([[1, 0], [2, 1], [3, 1]])
B = np.array([[2, 4], [1, 1]])
print(A @ B)  # 행렬 곱
# [[ 2  4]
#  [ 5  9]
#  [ 7 13]]

print(A.T)  # 전치
# [[1 2 3]
#  [0 1 1]]
```

## 관련 개념

- [Set Operations](/knowledge/mathematics/set-operations/) - 0-1 행렬과 집합의 비트열 표현
- [Function](/knowledge/mathematics/function/) - 행렬은 선형 함수(변환)를 표현
- [Cartesian Product](/knowledge/mathematics/cartesian-product/) - 행렬의 인덱스는 행 × 열의 데카르트 곱
- [Propositional Logic](/knowledge/mathematics/propositional-logic/) - 부울 행렬 연산과 논리 연산의 대응
