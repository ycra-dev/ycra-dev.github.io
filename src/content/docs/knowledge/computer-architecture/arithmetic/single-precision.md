---
title: "단정밀도 (Single Precision)"
description: "단정밀도(Single Precision)는 하나의 32비트 워드로 표현되는 부동소수점 값으로, 1비트 부호, 8비트 지수, 23비트 분수로 구성된다"
tags: ['Floating Point', 'Ieee 754', '32 Bit', 'Fraction', 'Exponent']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/single-precision
sidebar:
  order: 10
---

## 핵심 개념

IEEE 754 단정밀도 형식은 C 언어의 float 타입에 해당한다. 지수 바이어스는 127이며, 암시적 선행 1을 포함하면 실질적으로 24비트의 유효자리(significand)를 제공한다. 표현 가능 범위: 약 +-1.18 x 10^(-38)에서 +-3.40 x 10^(38). MIPS에서는 $f0~$f31의 부동소수점 레지스터를 사용하며, lwc1/swc1로 메모리 전송, add.s/sub.s/mul.s/div.s로 연산을 수행한다. 단정밀도 레지스터 쌍(짝수+홀수)이 하나의 배정밀도 레지스터를 형성한다.

## 예시

```
# 단정밀도 구조:
# [S|EEEEEEEE|FFFFFFFFFFFFFFFFFFFFFFF]
#  1    8              23              = 32 bits

# 값 = (-1)^S × (1 + Fraction) × 2^(Exponent - 127)

# MIPS 단정밀도 연산:
lwc1  $f4, c($sp)      # 메모리 → 부동소수점 레지스터
lwc1  $f6, a($sp)
add.s $f2, $f4, $f6    # 단정밀도 덧셈
swc1  $f2, b($sp)      # 부동소수점 레지스터 → 메모리
```

## 관련 개념

- [부동소수점 (Floating Point)](/knowledge/computer-architecture/floating-point/)
- [배정밀도 (Double Precision)](/knowledge/computer-architecture/double-precision/)
- [IEEE 754 표준 (IEEE 754 Standard)](/knowledge/computer-architecture/ieee-754-standard/)
