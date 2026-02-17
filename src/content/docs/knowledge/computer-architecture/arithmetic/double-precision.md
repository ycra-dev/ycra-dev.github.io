---
title: "Double Precision"
description: "배정밀도(Double Precision)는 두 개의 32비트 워드(64비트)로 표현되는 부동소수점 값으로, 1비트 부호, 11비트 지수, 52비트 분수로 구성된다"
tags: ['Floating Point', 'Ieee 754', '64 Bit', 'Precision', 'Range']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/double-precision
sidebar:
  order: 11
---

## 핵심 개념

단정밀도보다 넓은 범위와 더 높은 정밀도를 제공한다. 지수 바이어스는 1023이며, 암시적 선행 1을 포함하면 53비트의 유효자리를 제공한다. 표현 가능 범위: 약 +-2.0 x 10^(-308)에서 +-2.0 x 10^(308). 배정밀도의 주요 장점은 지수 범위 확장보다 훨씬 큰 분수 필드로 인한 높은 정밀도이다. MIPS에서 배정밀도 레지스터는 짝수번 단정밀도 레지스터 쌍으로 구성된다(예: $f2와 $f3이 배정밀도 $f2). add.d/sub.d/mul.d/div.d로 연산을 수행한다. 대부분의 과학적 부동소수점 계산은 배정밀도로 수행된다.

## 예시

```
# 배정밀도 구조:
# [S|EEEEEEEEEEE|FFFF...FFFFFFFFFFFFFFFFFF]
#  1     11                52              = 64 bits

# 값 = (-1)^S × (1 + Fraction) × 2^(Exponent - 1023)

# MIPS 배정밀도 연산 (행렬 곱셈):
l.d   $f4, 0($t2)       # 배정밀도 로드
mul.d $f16, $f18, $f16   # a[i][k] * b[k][j]
add.d $f4, $f4, $f16     # c[i][j] += a[i][k]*b[k][j]
s.d   $f4, 0($t2)        # 배정밀도 스토어
```

## 관련 개념

- [Floating Point](/knowledge/computer-architecture/floating-point/)
- [Single Precision](/knowledge/computer-architecture/single-precision/)
- [IEEE 754 Standard](/knowledge/computer-architecture/ieee-754-standard/)
- [DGEMM](/knowledge/computer-architecture/dgemm/)
