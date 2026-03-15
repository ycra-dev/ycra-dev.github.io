---
title: "선형 동차 점화식 (Linear Homogeneous Recurrence Relation)"
description: "상수 계수 선형 동차 점화식(linear homogeneous recurrence relation with constant coefficients)은 a_n = c_1 * a_{n-1} + c_2 * a_{n-2} + "
tags: ['Recurrence Relation', 'Linear Recurrence', 'Characteristic Equation', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/linear-homogeneous-recurrence-relation
sidebar:
  order: 1
---

## 핵심 개념

이 점화식이 "선형(linear)"인 이유는 우변이 이전 항들의 1차식이기 때문이고, "동차(homogeneous)"인 이유는 상수항이나 n에만 의존하는 항이 없기 때문이며, "상수 계수"인 이유는 계수 c_1, ..., c_k가 n에 의존하지 않는 상수이기 때문이다. 차수(degree)는 k로, a_n이 직전 k개의 항으로 표현됨을 의미한다.

**풀이 방법 (특성근 이용)**:
1. 특성 방정식 r^k - c_1 * r^{k-1} - ... - c_k = 0을 세운다.
2. 특성근 r_1, r_2, ..., r_t를 구한다.
3. 특성근이 모두 다른 경우: a_n = alpha_1 * r_1^n + alpha_2 * r_2^n + ... + alpha_k * r_k^n
4. 중복근이 있는 경우(중복도 m인 근 r_0): (alpha_{0} + alpha_{1}*n + ... + alpha_{m-1}*n^{m-1}) * r_0^n
5. 초기 조건을 이용하여 상수 alpha_i를 결정한다.

**비동차 점화식**: a_n = c_1*a_{n-1} + ... + c_k*a_{n-k} + F(n) 형태에서는 특수해(particular solution)와 동차해를 더하여 일반해를 구한다.

## 예시

**차수 2, 상이한 특성근**: a_n = a_{n-1} + 2a_{n-2}, a_0 = 2, a_1 = 7
- 특성 방정식: r^2 - r - 2 = 0 => r = 2, r = -1
- 일반해: a_n = alpha_1 * 2^n + alpha_2 * (-1)^n
- 초기 조건 적용: alpha_1 = 3, alpha_2 = -1
- 해: a_n = 3 * 2^n - (-1)^n

**피보나치 수의 명시적 공식**: f_n = f_{n-1} + f_{n-2}
- 특성 방정식: r^2 - r - 1 = 0
- 특성근: r = (1 +/- sqrt(5)) / 2
- 해: f_n = (1/sqrt(5)) * ((1+sqrt(5))/2)^n - (1/sqrt(5)) * ((1-sqrt(5))/2)^n

**중복근**: a_n = 6a_{n-1} - 9a_{n-2}, a_0 = 1, a_1 = 6
- 특성 방정식: (r-3)^2 = 0, 중복근 r = 3
- 일반해: a_n = alpha_1 * 3^n + alpha_2 * n * 3^n
- 해: a_n = 3^n + n * 3^n

## 관련 개념

- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 상위 개념
- [Characteristic Equation](/knowledge/mathematics/characteristic-equation/) - 선형 동차 점화식을 푸는 핵심 도구
- [Sequence](/knowledge/mathematics/sequence/) - 점화식이 정의하는 수열
- [Generating Function](/knowledge/mathematics/generating-function/) - 점화식을 푸는 대안적 방법
