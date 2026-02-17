---
title: "Product Rule"
description: "곱의 법칙(Product Rule)이란 어떤 절차가 연속적인 작업들로 구성될 때, 첫 번째 작업을 수행하는 방법이 n1가지이고 각각에 대해 두 번째 작업을 수행하는 방법이 n2가지이면, 전체 절차를 수행하는 방법의 수는 n1 x n2가지라는 계수 원리이다"
tags: ['Product Rule', 'Counting', 'Combinatorics', 'Cartesian Product', 'Enumeration']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/product-rule
sidebar:
  order: 2
---

## 핵심 개념

곱의 법칙은 조합론에서 가장 기본적인 계수 원리 중 하나이다. 절차가 m개의 독립적인 작업 T1, T2, ..., Tm으로 구성되고, 각 작업 Ti를 ni가지 방법으로 수행할 수 있을 때, 전체 절차를 수행하는 방법의 수는 n1 * n2 * ... * nm이다.

집합론의 관점에서 곱의 법칙은 유한 집합의 **카르테시안 곱(Cartesian product)**의 원소 수를 구하는 것과 동일하다:

|A1 x A2 x ... x Am| = |A1| * |A2| * ... * |Am|

이 법칙은 [[Mathematical Induction]]을 사용하여 두 작업에 대한 곱의 법칙으로부터 일반적인 경우를 증명할 수 있다. 곱의 법칙은 비트 문자열의 수, 함수의 수, 번호 체계의 용량 등 다양한 계수 문제에 적용된다.

## 예시

**비트 문자열 수 계산:**
길이가 7인 비트 문자열의 수는? 각 비트는 0 또는 1의 2가지 선택이 가능하므로:
```
2 * 2 * 2 * 2 * 2 * 2 * 2 = 2^7 = 128
```

**함수의 수 계산:**
m개의 원소를 가진 집합에서 n개의 원소를 가진 집합으로의 함수의 수:
- 각 m개의 원소에 대해 n개의 선택지가 있으므로
- 함수의 총 수 = n^m

예: |A| = 3, |B| = 5일 때 함수의 수 = 5^3 = 125

**번호판 계산:**
영문 대문자 3자리 + 숫자 3자리로 이루어진 번호판의 수:
```
26 * 26 * 26 * 10 * 10 * 10 = 17,576,000
```

**중첩 반복문의 반복 횟수:**
```
k := 0
for i1 := 1 to n1
  for i2 := 1 to n2
    ...
    for im := 1 to nm
      k := k + 1
// 최종 k의 값 = n1 * n2 * ... * nm
```

## 관련 개념

- [Sum Rule](/knowledge/mathematics/sum-rule/) - 배타적 경우를 합산하는 또 다른 기본 계수 원리
- [Set](/knowledge/mathematics/set/) - 곱의 법칙은 카르테시안 곱의 크기로 표현됨
- [Function](/knowledge/mathematics/function/) - 함수의 수를 곱의 법칙으로 계산
- [Permutation](/knowledge/mathematics/permutation/) - 순열의 수를 곱의 법칙으로 유도
