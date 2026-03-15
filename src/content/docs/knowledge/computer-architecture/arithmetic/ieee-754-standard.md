---
title: "IEEE 754 표준 (IEEE 754 Standard)"
description: "IEEE 754는 1980년 이후 만들어진 거의 모든 컴퓨터에서 사용되는 부동소수점 산술의 국제 표준으로, 부동소수점 수의 표현 형식과 연산 규칙을 정의한다"
tags: ['Floating Point', 'Standard', 'Precision', 'Rounding', 'Nan', 'Infinity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/ieee-754-standard
sidebar:
  order: 9
---

## 핵심 개념

이 표준은 부동소수점 프로그램의 이식성과 컴퓨터 산술의 품질을 크게 향상시켰다. 주요 설계 결정: (1) 부호 비트를 최상위에 배치하여 빠른 양/음 판별, (2) 지수를 유효자리 앞에 배치하여 정수 비교로 부동소수점 정렬 가능, (3) 바이어스 표기법으로 음수 지수가 큰 수처럼 보이는 문제 해결, (4) 암시적 선행 1로 유효 비트 확보. 특수 값: 0(지수=0, 분수=0), 무한대(지수=모두 1, 분수=0), NaN(지수=모두 1, 분수!=0). 2008년 개정판(IEEE 754-2008)에서 16비트 반정밀도(half precision)와 128비트 4배 정밀도(quad precision), 십진 부동소수점이 추가되었다.

## 예시

```
# IEEE 754 인코딩 형식
# 단정밀도 (32비트): 1 + 8 + 23
# 배정밀도 (64비트): 1 + 11 + 52
# 반정밀도 (16비트): 1 + 5 + 10

# 특수 값:
# +0:       0 00000000 00000000000000000000000
# -0:       1 00000000 00000000000000000000000
# +∞:       0 11111111 00000000000000000000000
# -∞:       1 11111111 00000000000000000000000
# NaN:      x 11111111 non-zero fraction

# 범위 (단정밀도):
# 최소 양수: ±1.0 × 2^(-126) ≈ ±1.18 × 10^(-38)
# 최대:      ±1.111...1 × 2^(127) ≈ ±3.40 × 10^(38)
```

## 관련 개념

- [부동소수점 (Floating Point)](/knowledge/computer-architecture/floating-point/)
- [단정밀도 (Single Precision)](/knowledge/computer-architecture/single-precision/)
- [배정밀도 (Double Precision)](/knowledge/computer-architecture/double-precision/)
- [가드 비트와 라운드 비트 (Guard Bit and Round Bit)](/knowledge/computer-architecture/guard-bit-and-round-bit/)
