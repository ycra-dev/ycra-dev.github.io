---
title: "Gaussian Elimination"
description: "가우스 소거법(Gaussian Elimination)은 연립 일차방정식을 풀기 위해 행 연산을 사용하여 계수 행렬을 상삼각 형태로 변환하는 방법으로, LU 분해의 기반이 되는 핵심 알고리즘이다"
tags: ['Gaussian Elimination', 'Linear Algebra', 'Pivoting', 'Numerical Stability', 'Matrix Operations']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/gaussian-elimination
sidebar:
  order: 8
---

## 핵심 개념

**기본 과정**:
1. 첫 번째 방정식의 배수를 나머지 방정식에서 빼서 첫 번째 변수를 소거
2. 두 번째 방정식의 배수를 세 번째 이후 방정식에서 빼서 두 번째 변수를 소거
3. 이 과정을 반복하여 상삼각(upper-triangular) 형태의 행렬 U를 획득
4. 소거에 사용된 행 승수(multiplier)들이 하삼각 행렬 L을 구성

**피벗팅(Pivoting)의 필요성**:
- 피벗(대각 원소)이 0이면 나눗셈 불가
- 피벗이 매우 작으면 수치 불안정성(numerical instability) 발생
- **부분 피벗팅**: 각 단계에서 현재 열의 최대 절대값 원소를 피벗으로 선택 (행 교환)
- 치환 행렬 P가 행 교환을 기록 → LUP 분해

**Schur 보수(Schur Complement)**:
- 행렬 A를 블록으로 분할할 때, 첫 번째 원소 a_11에 대한 Schur 보수는:
  A' - vw^T/a_11
- A가 비특이이면 Schur 보수도 비특이

**시간 복잡도**: O(n^3)
- 주 루프: n번 반복
- 각 반복에서 Schur 보수 갱신: O((n-k)^2) 연산

**수치 안정성**:
- 부동소수점 연산의 반올림 오차 누적 가능
- 피벗팅으로 수치 안정성 크게 개선
- 대칭 양정치(symmetric positive-definite) 행렬은 피벗팅 없이 안정

## 예시

3x3 연립방정식:
```
2x₁ + 3x₂ + x₃ = 1
4x₁ + 7x₂ + 5x₃ = 2
6x₁ + 18x₂ + 17x₃ = 1

1단계: 행2 -= 2×행1, 행3 -= 3×행1
[2  3  1  | 1]      승수: l₂₁=2, l₃₁=3
[0  1  3  | 0]
[0  9  14 | -2]

2단계: 행3 -= 9×행2
[2  3  1  | 1]      승수: l₃₂=9
[0  1  3  | 0]
[0  0  -13| -2]

후방 대입: x₃ = 2/13, x₂ = -6/13, x₁ = 11/13
```

## 관련 개념

- [LU Decomposition](/knowledge/algorithms/lu-decomposition/) - 가우스 소거법의 행렬 분해 형태
- [Matrix Inverse](/knowledge/algorithms/matrix-inverse/) - 가우스 소거법을 통한 역행렬 계산
- [Linear Programming](/knowledge/algorithms/linear-programming/) - 연립 부등식 풀이와의 관련
