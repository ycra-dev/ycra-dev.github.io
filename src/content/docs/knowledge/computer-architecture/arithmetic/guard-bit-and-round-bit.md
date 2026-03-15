---
title: "가드 비트와 라운드 비트 (Guard Bit and Round Bit)"
description: "가드 비트(Guard Bit)와 라운드 비트(Round Bit)는 부동소수점 중간 계산 시 오른쪽에 유지되는 두 개의 추가 비트로, 반올림 정확도를 향상시키기 위해 사용된다"
tags: ['Floating Point', 'Rounding', 'Accuracy', 'Ieee 754', 'Ulp']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/guard-bit-and-round-bit
sidebar:
  order: 19
---

## 핵심 개념

IEEE 754는 중간 덧셈 결과에 항상 두 개의 추가 비트(가드, 라운드)를 유지한다. 가드 비트는 두 추가 비트 중 첫 번째이고, 라운드 비트는 두 번째이다. 이 비트들이 없으면 반올림 기회가 없어 정확도가 떨어진다. 추가로 스티키 비트(sticky bit)가 있는데, 라운드 비트 오른쪽에 0이 아닌 비트가 있을 때 설정되어 0.50...00과 0.50...01을 구별할 수 있게 한다. IEEE 754는 4가지 반올림 모드를 제공: 양의 무한대 방향, 음의 무한대 방향, 절삭(truncate), 가장 가까운 짝수로 반올림. 정확도는 ULP(units in the last place)로 측정되며, IEEE 754는 0.5 ulp 이내를 보장한다.

## 예시

```
# 가드/라운드 비트가 있을 때와 없을 때의 비교
# 2.56 × 10^0 + 2.34 × 10^2 (3자리 유효숫자)

# 가드/라운드 비트 사용:
#   2.3400 + 0.0256 = 2.3656 → 반올림 → 2.37 × 10^2

# 가드/라운드 비트 미사용:
#   2.34 + 0.02 = 2.36 × 10^2

# 차이: 마지막 자릿수에서 1 차이 발생

# 스티키 비트 예시:
# 5.01 × 10^(-1) + 2.34 × 10^2
# 시프트 시 0이 아닌 비트가 밀려남 → sticky bit = 1
```

## 관련 개념

- [부동소수점 (Floating Point)](/knowledge/computer-architecture/floating-point/)
- [부동소수점 덧셈 (Floating Point Addition)](/knowledge/computer-architecture/floating-point-addition/)
- [IEEE 754 표준 (IEEE 754 Standard)](/knowledge/computer-architecture/ieee-754-standard/)
- [융합 곱셈-덧셈 (FMA)](/knowledge/computer-architecture/fused-multiply-add/)
