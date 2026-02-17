---
title: "Floating Point Addition"
description: "부동소수점 덧셈은 지수 정렬, 유효자리 덧셈, 정규화, 반올림의 네 단계를 거쳐 두 부동소수점 수를 더하는 연산이다"
tags: ['Floating Point', 'Arithmetic', 'Normalization', 'Rounding', 'Alignment']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/floating-point-addition
sidebar:
  order: 15
---

## 핵심 개념

4단계 알고리즘: (1) 작은 지수를 가진 수의 유효자리를 오른쪽으로 시프트하여 지수를 맞춤(정렬), (2) 유효자리를 더함, (3) 결과를 정규화하고 오버플로우/언더플로우 검사, (4) 결과를 반올림(반올림으로 비정규화되면 3단계 반복). 전용 하드웨어는 작은 ALU(지수 차이 계산)와 큰 ALU(유효자리 덧셈)를 포함한다. 정수 덧셈과 달리, 부동소수점 덧셈은 결합법칙(associativity)이 성립하지 않는다. 즉, (a+b)+c != a+(b+c)일 수 있다. 이는 제한된 정밀도 때문이며, 병렬 프로그래밍에서 특히 문제가 된다.

## 예시

```
# 0.5 + (-0.4375) 를 이진수로 계산
# 0.5     = 1.000 × 2^(-1)
# -0.4375 = -1.110 × 2^(-2)

# 단계 1: 지수 정렬
#   -1.110 × 2^(-2) = -0.111 × 2^(-1)

# 단계 2: 유효자리 덧셈
#   1.000 + (-0.111) = 0.001 × 2^(-1)

# 단계 3: 정규화
#   0.001 × 2^(-1) = 1.000 × 2^(-4)

# 단계 4: 반올림
#   1.000 × 2^(-4) (변경 없음)

# 결과: 1/16 = 0.0625 ✓ (0.5 + (-0.4375) = 0.0625)
```

## 관련 개념

- [Floating Point](/knowledge/computer-architecture/floating-point/)
- [Floating Point Multiplication](/knowledge/computer-architecture/floating-point-multiplication/)
- [Guard Bit and Round Bit](/knowledge/computer-architecture/guard-bit-and-round-bit/)
- [IEEE 754 Standard](/knowledge/computer-architecture/ieee-754-standard/)
