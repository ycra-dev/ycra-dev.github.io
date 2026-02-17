---
title: "Matrix Multiplication"
description: "행렬 곱셈(Matrix Multiplication)은 두 n x n 행렬 A와 B의 곱 C = A * B를 계산하는 연산으로, 결과 행렬 C의 (i, j) 원소는 A의 i번째 행과 B의 j번째 열의 내적으로 정의된다"
tags: ['Matrix Multiplication', 'Divide And Conquer', 'Linear Algebra', 'Computational Complexity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/matrix-multiplication
sidebar:
  order: 16
---

## 핵심 개념

표준 행렬 곱셈 알고리즘(MATRIX-MULTIPLY)은 삼중 중첩 for 루프를 사용하여 Theta(n^3) 시간에 동작한다. 각 원소 c_ij를 계산하기 위해 n번의 곱셈과 덧셈이 필요하고, n^2개의 원소를 계산해야 하므로 총 n^3번의 스칼라 연산이 수행된다.

분할 정복 접근법(MATRIX-MULTIPLY-RECURSIVE)은 n x n 행렬을 네 개의 n/2 x n/2 부분 행렬로 분할하여 8번의 재귀적 곱셈을 수행한다. 이 방식의 점화식은 T(n) = 8T(n/2) + Theta(1)이며, 해는 여전히 Theta(n^3)이다. 인덱스 계산을 통한 부분 행렬 분할은 Theta(1) 시간에 가능하며, 원소 복사 방식은 Theta(n^2) 시간이 소요되지만 점근적 결과는 동일하다.

행렬이 밀집(dense) 행렬인지 희소(sparse) 행렬인지에 따라 적합한 알고리즘이 달라진다. 밀집 행렬은 대부분의 원소가 0이 아닌 행렬이고, 희소 행렬은 대부분의 원소가 0인 행렬로 더 압축된 저장 방식을 사용할 수 있다.

## 예시

표준 행렬 곱셈의 의사코드:

```
MATRIX-MULTIPLY(A, B, C, n)
  for i = 1 to n           // n개의 행에 대해
    for j = 1 to n         // 각 행의 n개 원소에 대해
      for k = 1 to n
        c_ij = c_ij + a_ik * b_kj
```

분할 정복 버전은 행렬을 4개의 부분 행렬로 분할한 후:
- C11 = A11*B11 + A12*B21
- C12 = A11*B12 + A12*B22
- C21 = A21*B11 + A22*B21
- C22 = A21*B12 + A22*B22

이 8번의 n/2 x n/2 행렬 곱셈을 재귀적으로 수행한다.

Python 예시:
```python
def matrix_multiply(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    return C
```

## 관련 개념

- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/) - 행렬 곱셈에 분할 정복 기법을 적용
- [Strassen Algorithm](/knowledge/algorithms/strassen-algorithm/) - 행렬 곱셈을 Theta(n^lg7)으로 개선한 알고리즘
- [Recurrence](/knowledge/algorithms/recurrence/) - 재귀적 행렬 곱셈의 수행 시간을 점화식으로 분석
- [Asymptotic Notation](/knowledge/algorithms/asymptotic-notation/) - Theta(n^3) 수행 시간의 표기
- [Master Theorem](/knowledge/algorithms/master-theorem/) - 점화식 T(n) = 8T(n/2) + Theta(1)의 해를 구하는 데 사용
