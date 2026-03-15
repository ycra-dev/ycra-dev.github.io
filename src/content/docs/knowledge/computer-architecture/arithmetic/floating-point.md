---
title: "부동소수점 (Floating Point)"
description: "부동소수점(Floating Point)은 이진 소수점(binary point)이 정수처럼 고정되지 않고 이동할 수 있는 숫자를 표현하는 컴퓨터 산술 방식이다"
tags: ['Ieee 754', 'Real Number', 'Scientific Notation', 'Precision', 'Exponent']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/floating-point
sidebar:
  order: 7
---

## 핵심 개념

과학적 표기법(scientific notation)의 이진 버전으로, 1.xxxxxxx x 2^yyyy 형태로 수를 표현한다. IEEE 754 표준을 따르며, 단정밀도(single precision, 32비트)와 배정밀도(double precision, 64비트)를 지원한다. 단정밀도: 1비트 부호 + 8비트 지수 + 23비트 분수. 배정밀도: 1비트 부호 + 11비트 지수 + 52비트 분수. 정규화된 이진수의 선행 1을 암시적으로 표현하여 유효 비트를 하나 더 확보한다. 지수는 바이어스 표기법을 사용(단정밀도 바이어스=127, 배정밀도=1023). 실제 값: (-1)^S x (1+Fraction) x 2^(Exponent-Bias). 지수가 너무 크면 오버플로우, 너무 작으면 언더플로우가 발생한다. 특수 값으로 0, 무한대(infinity), NaN(Not a Number)을 포함한다.

## 예시

```
# -0.75를 IEEE 754 단정밀도로 표현
# -0.75 = -3/4 = -0.11 (이진) = -1.1 × 2^(-1)

# 부호: 1 (음수)
# 지수: -1 + 127 = 126 = 01111110
# 분수: 10000000000000000000000

# 결과: 1 01111110 10000000000000000000000

# 역변환 예시:
# 1 10000001 01000000000000000000000
# 부호: 1 (음수)
# 지수: 129 - 127 = 2
# 값: -1 × 1.25 × 2^2 = -5.0
```

## 관련 개념

- [IEEE 754 표준 (IEEE 754 Standard)](/knowledge/computer-architecture/ieee-754-standard/)
- [단정밀도 (Single Precision)](/knowledge/computer-architecture/single-precision/)
- [배정밀도 (Double Precision)](/knowledge/computer-architecture/double-precision/)
- [부동소수점 덧셈 (Floating Point Addition)](/knowledge/computer-architecture/floating-point-addition/)
- [부동소수점 곱셈 (Floating Point Multiplication)](/knowledge/computer-architecture/floating-point-multiplication/)
