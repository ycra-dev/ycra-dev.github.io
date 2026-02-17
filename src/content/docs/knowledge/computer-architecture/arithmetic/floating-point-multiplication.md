---
title: "Floating Point Multiplication"
description: "부동소수점 곱셈은 지수 덧셈, 유효자리 곱셈, 정규화, 반올림, 부호 결정의 다섯 단계를 거쳐 두 부동소수점 수를 곱하는 연산이다"
tags: ['Floating Point', 'Arithmetic', 'Exponent', 'Significand', 'Normalization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/floating-point-multiplication
sidebar:
  order: 16
---

## 핵심 개념

5단계 알고리즘: (1) 피연산자의 지수를 더하여 새 지수를 계산(바이어스 표현 사용 시 바이어스 하나를 빼야 함), (2) 유효자리를 곱함, (3) 결과를 정규화하고 오버플로우/언더플로우 검사, (4) 필요시 결과를 반올림(반올림으로 비정규화되면 3단계 반복), (5) 원래 피연산자의 부호가 다르면 결과를 음수로 설정. 덧셈과 달리, 지수는 더하고(결합이 아닌) 유효자리는 곱한다. 바이어스 지수를 직접 더하면 바이어스가 두 번 포함되므로, 바이어스 하나를 빼야 정확한 결과를 얻는다.

## 예시

```
# 0.5 × (-0.4375) 계산
# 0.5     = 1.000 × 2^(-1)
# -0.4375 = -1.110 × 2^(-2)

# 단계 1: 지수 더하기
#   (-1) + (-2) = -3

# 단계 2: 유효자리 곱하기
#   1.000 × 1.110 = 1.110000 → 1.110 × 2^(-3)

# 단계 3: 정규화 확인
#   이미 정규화됨, -3은 범위 내 (-126 ~ 127)

# 단계 4: 반올림
#   1.110 × 2^(-3) (변경 없음)

# 단계 5: 부호 결정
#   피연산자 부호가 다르므로 → 음수

# 결과: -1.110 × 2^(-3) = -0.21875 ✓
```

## 관련 개념

- [Floating Point](/knowledge/computer-architecture/floating-point/)
- [Floating Point Addition](/knowledge/computer-architecture/floating-point-addition/)
- [Fused Multiply Add](/knowledge/computer-architecture/fused-multiply-add/)
- [IEEE 754 Standard](/knowledge/computer-architecture/ieee-754-standard/)
