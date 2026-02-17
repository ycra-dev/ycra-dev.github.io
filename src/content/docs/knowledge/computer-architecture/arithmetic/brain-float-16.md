---
title: "Brain Float 16"
description: "Brain Float 16(BFloat16)은 Google의 Brain 부서에서 발명한 16비트 부동소수점 형식으로, 1비트 부호, 8비트 지수, 7비트 분수로 구성되어 머신러닝에 최적화되었다"
tags: ['Machine Learning', 'Floating Point', '16 Bit', 'Google Tpu', 'Bfloat16']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/brain-float-16
sidebar:
  order: 14
---

## 핵심 개념

머신러닝은 학습에 부동소수점을 사용하지만 과학 프로그래밍만큼의 정밀도는 필요하지 않다. 배정밀도(64비트)는 과잉이고, 32비트면 충분하며, 이상적으로는 16비트를 사용하고 싶다. 그러나 IEEE fp16(반정밀도)은 5비트 지수로 범위가 너무 좁아 머신러닝의 매우 작은 수를 다루기 어렵다. BFloat16은 IEEE fp32와 동일한 8비트 지수를 사용하여 같은 범위를 제공하면서 분수를 7비트로 줄인다. 이점: (1) 곱셈기 크기가 fp16의 약 절반(8^2 vs 11^2), (2) fp32에서 변환 시 오버플로우/언더플로우 동작이 동일하여 소프트웨어 호환성이 우수, (3) 에너지 효율이 높다. Google TPUv2/v3가 최초로 구현했다.

## 예시

```
# 세 가지 16비트 부동소수점 형식 비교:
# 형식       | 부호 | 지수 | 분수 | 최소 양수 (정규화)
# IEEE fp32  |  1   |  8   |  23  | 1.0 × 2^(-126)
# IEEE fp16  |  1   |  5   |  10  | 1.0 × 2^(-14)
# BFloat16   |  1   |  8   |   7  | 1.0 × 2^(-126)

# 곱셈기 상대 크기 (유효자리 비트²):
# fp32: 24² = 576
# fp16: 11² = 121
# BFloat16: 8² = 64  ← 가장 작고 에너지 효율적
```

## 관련 개념

- [Floating Point](/knowledge/computer-architecture/floating-point/)
- [IEEE 754 Standard](/knowledge/computer-architecture/ieee-754-standard/)
- [Single Precision](/knowledge/computer-architecture/single-precision/)
- [DGEMM](/knowledge/computer-architecture/dgemm/)
