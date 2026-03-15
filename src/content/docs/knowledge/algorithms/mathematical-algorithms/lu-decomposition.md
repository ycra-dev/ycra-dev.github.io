---
title: "LU 분해 (LU Decomposition)"
description: "LU 분해는 비특이(nonsingular) 행렬 A를 단위 하삼각행렬 L과 상삼각행렬 U의 곱 A = LU (또는 치환 행렬 P를 포함한 PA = LU, LUP 분해)로 분해하는 방법이다"
tags: ['Lu Decomposition', 'Linear Algebra', 'Matrix Factorization', 'Gaussian Elimination', 'Numerical Methods']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/lu-decomposition
sidebar:
  order: 7
---

## 핵심 개념

**LUP 분해**: PA = LU에서
- L: 대각 원소가 1인 하삼각행렬 (unit lower-triangular)
- U: 상삼각행렬 (upper-triangular)
- P: 치환 행렬 (permutation matrix)

**연립방정식 Ax = b 풀기** (O(n^2) 시간):
1. LUP 분해: PA = LU를 계산
2. 전방 대입(forward substitution): Ly = Pb를 풀어 y 획득
3. 후방 대입(back substitution): Ux = y를 풀어 x 획득

전방 대입:
```
y_i = b_{π[i]} - Σ(j=1 to i-1) l_ij * y_j
```

후방 대입:
```
x_i = (y_i - Σ(j=i+1 to n) u_ij * x_j) / u_ii
```

**LU 분해의 재귀적 구조**:
- A를 블록으로 분할: a_11, v(열벡터), w^T(행벡터), A'(부분행렬)
- Schur 보수: A' - vw^T/a_11
- 재귀적으로 Schur 보수를 LU 분해

**피벗팅(Pivoting)**: a_11 = 0이면 나눗셈 불가 → P를 사용하여 행 교환. 작은 값의 피벗은 수치 불안정성 유발 가능.

시간 복잡도: O(n^3)

## 예시

LU-DECOMPOSITION의 핵심 루프:
```
LU-DECOMPOSITION(A, n)
1  let L and U be new n × n matrices
2  initialize U with 0s below diagonal
3  initialize L with 1s on diagonal and 0s above
4  for k = 1 to n
5      u_kk = a_kk              // 피벗
6      for i = k+1 to n
7          l_ik = a_ik / a_kk   // 승수 계산
8          u_ki = a_ki           // U의 행 원소
9      for i = k+1 to n         // Schur 보수 갱신
10         for j = k+1 to n
11             a_ij = a_ij - l_ik * u_kj
```

예시: 3x3 행렬의 LUP 분해
```
A = [2 0 2; 0 8 0; 3 5 6]
PA = LU에서 (P: 1행과 3행 교환 -> PA = [3 5 6; 0 8 0; 2 0 2]):
L = [1 0 0; 0 1 0; 2/3 -5/12 1]
U = [3 5 6; 0 8 0; 0 0 -2]
π = [3, 2, 1]
```

## 관련 개념

- [가우스 소거법 (Gaussian Elimination)](/knowledge/algorithms/gaussian-elimination/) - LU 분해의 기반이 되는 방법
- [역행렬 (Matrix Inverse)](/knowledge/algorithms/matrix-inverse/) - LU 분해를 통한 역행렬 계산
- [선형 계획법 (Linear Programming)](/knowledge/algorithms/linear-programming/) - 연립 방정식 풀이에 활용
