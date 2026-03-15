---
title: "융합 곱셈-덧셈 (FMA)"
description: "융합 곱셈-덧셈(Fused Multiply Add, FMA)은 곱셈과 덧셈을 수행하되 덧셈 후 한 번만 반올림하는 부동소수점 명령어이다"
tags: ['Floating Point', 'Fma', 'Precision', 'Performance', 'Ieee 754 2008']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/fused-multiply-add
sidebar:
  order: 17
---

## 핵심 개념

일반적으로 a = a + (b x c) 형태의 연산을 수행한다. 별도의 곱셈과 덧셈 명령어를 사용하면 곱셈 후와 덧셈 후 총 두 번 반올림이 발생하지만, FMA는 한 번의 반올림만 수행하여 정밀도를 향상시킨다. PowerPC, AMD SSE5, Intel AVX 아키텍처에서 지원되며, IEEE 754-2008 표준에 추가되었다. 성능적으로도 두 연산을 하나의 명령어로 수행하므로 처리량이 높아진다. 행렬 곱셈(DGEMM)과 같은 과학 계산에서 특히 유용하다.

### GPU에서의 배정밀도 FMA (Appendix C)

GPU의 배정밀도 FMA 유닛(Tesla T10P 등)은 64비트 덧셈, 곱셈, 변환, FMA 연산을 하드웨어로 구현한다. A와 B의 유효수(53비트)를 곱하여 106비트 곱을 생성(carry-save 형태)하고, 53비트 가수 C를 정렬하여 161비트 CSA로 합산한 뒤, 단일 반올림으로 결과를 생성한다. 비정규화 수를 입출력 모두에서 전속력으로 지원한다. FMA는 MAD(Multiply-Add)와 달리 중간 결과의 전체 정확도를 유지하며, 정확히 반올림된 나눗셈과 제곱근의 소프트웨어 구현을 가능하게 하여 하드웨어 나눗셈/제곱근 유닛을 불필요하게 만든다.

## 예시

```
# FMA 연산: a = a + (b × c)

# 분리된 연산 (2번 반올림):
mul.d $f16, $f18, $f16   # temp = a[i][k] * b[k][j] (1차 반올림)
add.d $f4, $f4, $f16     # c[i][j] += temp (2차 반올림)

# FMA 연산 (1번 반올림):
# AVX512:
vfmadd231pd %zmm0, %zmm1, %zmm2  # zmm2 = zmm0 * zmm1 + zmm2
# 한 번만 반올림하여 더 정밀한 결과
```

## 관련 개념

- [부동소수점 곱셈 (Floating Point Multiplication)](/knowledge/computer-architecture/floating-point-multiplication/)
- [부동소수점 덧셈 (Floating Point Addition)](/knowledge/computer-architecture/floating-point-addition/)
- [IEEE 754 표준 (IEEE 754 Standard)](/knowledge/computer-architecture/ieee-754-standard/)
- [서브워드 병렬성 (Subword Parallelism)](/knowledge/computer-architecture/subword-parallelism/)
- [DGEMM (배정밀도 행렬 곱셈)](/knowledge/computer-architecture/dgemm/)
- [SP (스트리밍 프로세서)](/knowledge/computer-architecture/streaming-processor/)
- [반정밀도 (Half Precision)](/knowledge/computer-architecture/half-precision/)
