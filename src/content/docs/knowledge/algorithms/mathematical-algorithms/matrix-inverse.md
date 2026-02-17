---
title: "Matrix Inverse"
description: "행렬 역(Matrix Inverse)은 비특이 n x n 행렬 A에 대해 AA^{-1} = A^{-1}A = I_n을 만족하는 유일한 행렬 A^{-1}이다"
tags: ['Matrix Inverse', 'Linear Algebra', 'Matrix Multiplication', 'Computational Complexity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/matrix-inverse
sidebar:
  order: 6
---

## 핵심 개념

**핵심 정리**: 행렬 역과 행렬 곱셈의 시간 복잡도는 동일하다.

행렬 곱셈을 M(n) 시간에 수행할 수 있다면:
- 행렬 역도 O(M(n)) 시간에 계산 가능
- 역으로, 행렬 역을 I(n) 시간에 계산할 수 있다면 행렬 곱셈도 O(I(n)) 시간에 가능

이를 통해 행렬 역, 행렬 곱셈, LU 분해 모두 점근적으로 동일한 복잡도를 가짐을 알 수 있다.

**실용적 방법**:
1. LUP 분해를 통한 역행렬 계산:
   - PA = LU를 계산 (O(n^3))
   - A^{-1} = U^{-1} L^{-1} P
   - 각 열벡터 e_i에 대해 Ax_i = e_i를 풀어 A^{-1}의 i번째 열 획득

2. 수치적 안정성:
   - 직접 역행렬을 계산하는 것보다 LUP 분해가 수치적으로 더 안정
   - Ax = b를 풀 때 A^{-1}b보다 LUP-SOLVE가 선호됨

**최소제곱법(Least Squares)**:
- 과잉 결정 시스템(m > n인 Ax = b)에 대한 근사 해
- 의사역행렬(pseudoinverse): A^+ = (A^T A)^{-1} A^T
- 최소제곱 해: x = A^+ b
- 대칭 양정치 행렬 A^T A의 성질 이용

## 예시

LUP 분해를 통한 연립방정식 풀이:
```
입력: A = [1 5 4; 2 0 3; 5 8 2], b = [12; 9; 5]

1단계: LUP 분해 → PA = LU
2단계: Ly = Pb (전방 대입)
3단계: Ux = y (후방 대입)
결과: x = [-1; 2; 1/2]
```

역행렬의 각 열 계산:
```
A^{-1}의 j번째 열 = LUP-SOLVE(L, U, π, e_j, n)
여기서 e_j = [0,...,0,1,0,...,0]^T (j번째 표준 기저 벡터)
```

## 관련 개념

- [LU Decomposition](/knowledge/algorithms/lu-decomposition/) - 역행렬 계산의 실용적 방법
- [Gaussian Elimination](/knowledge/algorithms/gaussian-elimination/) - LU 분해의 기반
- [Strassen Algorithm](/knowledge/algorithms/strassen-algorithm/) - 더 빠른 행렬 곱셈을 통한 역행렬 계산 가속
