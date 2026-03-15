---
title: "슈트라센 알고리즘 (Strassen Algorithm)"
description: "슈트라센 알고리즘(Strassen's Algorithm)은 V"
tags: ['Strassen Algorithm', 'Matrix Multiplication', 'Divide And Conquer', 'Computational Complexity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/strassen-algorithm
sidebar:
  order: 17
---

## 핵심 개념

슈트라센 알고리즘의 핵심 아이디어는 재귀 트리의 분기 수를 줄이는 것이다. 표준 분할 정복 방식이 8번의 부분 행렬 곱셈을 수행하는 반면, 슈트라센은 추가적인 행렬 덧셈/뺄셈을 대가로 7번의 곱셈만 수행한다. 곱셈의 비용이 덧셈보다 점근적으로 크기 때문에, 상수 개의 추가 덧셈은 곱셈 한 번을 줄이는 이득에 비해 미미하다.

알고리즘은 4단계로 구성된다:
1. **분할**: n x n 행렬을 n/2 x n/2 부분 행렬로 분할 (Theta(1))
2. **보조 행렬 생성**: 10개의 합/차 행렬 S1~S10과 7개의 곱 행렬 P1~P7 생성 (Theta(n^2))
3. **정복**: 7번의 재귀적 n/2 x n/2 행렬 곱셈 수행 (7T(n/2))
4. **결합**: P 행렬들의 합/차로 C의 네 부분 행렬 갱신 (Theta(n^2))

점화식 T(n) = 7T(n/2) + Theta(n^2)의 해는 T(n) = Theta(n^lg7)이다. lg7 = 2.807...이므로 O(n^3)보다 점근적으로 빠르다.

이후 Coppersmith-Winograd (1987, O(n^2.376)), Vassilevska Williams (2012, O(n^2.37287)), Le Gall (2014, O(n^2.37286)) 등의 개선이 있었으나, 현재 알려진 하한은 Omega(n^2)이다.

## 예시

슈트라센 알고리즘의 7개 곱셈 행렬:
```
P1 = A11 * S1       (S1 = B12 - B22)
P2 = S2  * B22      (S2 = A11 + A12)
P3 = S3  * B11      (S3 = A21 + A22)
P4 = A22 * S4       (S4 = B21 - B11)
P5 = S5  * S6       (S5 = A11 + A22, S6 = B11 + B22)
P6 = S7  * S8       (S7 = A12 - A22, S8 = B21 + B22)
P7 = S9  * S10      (S9 = A11 - A21, S10 = B11 + B12)
```

결과 행렬 조합:
```
C11 = P5 + P4 - P2 + P6
C12 = P1 + P2
C21 = P3 + P4
C22 = P5 + P1 - P3 - P7
```

수행 시간 비교:
- 표준 알고리즘: Theta(n^3) = n=1000일 때 약 10^9 연산
- 슈트라센: Theta(n^2.81) = n=1000일 때 약 10^8.4 연산

## 관련 개념

- [행렬 곱셈 (Matrix Multiplication)](/knowledge/algorithms/matrix-multiplication/) - 슈트라센이 개선한 기본 행렬 곱셈 문제
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/) - 슈트라센 알고리즘의 설계 패러다임
- [점화식 (Recurrence)](/knowledge/algorithms/recurrence/) - T(n) = 7T(n/2) + Theta(n^2) 점화식 분석
- [마스터 정리 (Master Theorem)](/knowledge/algorithms/master-theorem/) - 슈트라센 점화식의 해를 구하는 방법
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/) - O(n^2.81) 수행 시간의 표현
