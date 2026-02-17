---
title: "Relation Representation"
description: "유한 집합 위의 관계는 두 가지 방법으로 표현할 수 있다: (1) 영-일 행렬(zero-one matrix): 원소 (i,j)가 1이면 (a_i, b_j) in R, 0이면 관련되지 않음"
tags: ['Relation', 'Matrix', 'Directed Graph', 'Digraph', 'Zero One Matrix', 'Boolean Product']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/relation-representation
sidebar:
  order: 4
---

## 핵심 개념

**행렬 표현**: 집합 A = {a1, ..., am}에서 B = {b1, ..., bn}으로의 관계 R을 m x n 영-일 행렬 M_R = [m_{ij}]로 표현한다.
- m_{ij} = 1이면 (a_i, b_j) in R
- m_{ij} = 0이면 (a_i, b_j) not in R

행렬로 관계의 성질을 판별할 수 있다:
- **반사성**: 주대각선의 모든 원소가 1 (m_{ii} = 1)
- **대칭성**: M_R = M_R^T (전치행렬과 같음)
- **반대칭성**: i != j일 때 m_{ij} = 1이면 m_{ji} = 0

**관계 연산의 행렬 표현**:
- 합집합: M_{R1 ∪ R2} = M_{R1} ∨ M_{R2} (불리언 합)
- 교집합: M_{R1 ∩ R2} = M_{R1} ∧ M_{R2} (불리언 곱)
- 합성: M_{S∘R} = M_R ⊙ M_S (불리언 곱)
- 거듭제곱: M_{R^n} = M_R^[n] (n차 불리언 거듭제곱)

**유향 그래프 표현**: 집합 A 위의 관계 R에 대해:
- V = A (꼭짓점 집합)
- E = R (변 집합, 순서쌍으로 방향 표시)
- (a,a) 형태의 쌍은 루프(loop)로 표현

유향 그래프로 관계의 성질 판별:
- **반사성**: 모든 꼭짓점에 루프 존재
- **대칭성**: 모든 변에 대해 반대 방향 변도 존재
- **반대칭성**: 서로 다른 두 꼭짓점 사이에 양방향 변이 없음
- **추이성**: x->y, y->z이면 항상 x->z 변 존재

## 예시

집합 A = {1, 2, 3} 위의 관계 R = {(1,1), (1,2), (2,1), (2,2), (3,3)}:

행렬 표현:
```
     1  2  3
M = [1  1  0]  <- 원소 1: (1,1), (1,2) 존재
    [1  1  0]  <- 원소 2: (2,1), (2,2) 존재
    [0  0  1]  <- 원소 3: (3,3)만 존재
```
- 주대각선이 모두 1 -> 반사적
- M = M^T -> 대칭적
- m_{12}=1이고 m_{21}=1인데 1!=2 -> 반대칭적이지 않음

파이썬으로 행렬 표현과 성질 판별:
```python
import numpy as np

# 관계를 행렬로 변환
def relation_to_matrix(R, elements):
    n = len(elements)
    idx = {e: i for i, e in enumerate(elements)}
    M = np.zeros((n, n), dtype=int)
    for (a, b) in R:
        M[idx[a]][idx[b]] = 1
    return M

# 관계의 합성 (불리언 행렬 곱)
def boolean_product(M1, M2):
    n = M1.shape[0]
    result = np.zeros_like(M1)
    for i in range(n):
        for j in range(M2.shape[1]):
            result[i][j] = int(any(M1[i][k] and M2[k][j]
                                   for k in range(n)))
    return result

R = {(1,1), (1,2), (2,1), (2,2), (3,3)}
elements = [1, 2, 3]
M = relation_to_matrix(R, elements)
print(M)
# [[1 1 0]
#  [1 1 0]
#  [0 0 1]]

# R^2 계산
M2 = boolean_product(M, M)
print(M2)
# [[1 1 0]
#  [1 1 0]
#  [0 0 1]]
```

## 관련 개념

- [Binary Relation](/knowledge/mathematics/binary-relation/) - 표현의 대상이 되는 관계
- [Matrix](/knowledge/mathematics/matrix/) - 영-일 행렬을 사용한 관계 표현
- [Relation Properties](/knowledge/mathematics/relation-properties/) - 행렬/그래프를 통한 성질 판별
- [Relation Composition](/knowledge/mathematics/relation-composition/) - 불리언 행렬 곱으로 합성 계산
- [Closure of Relations](/knowledge/mathematics/closure-of-relations/) - 행렬 거듭제곱을 이용한 폐포 계산
