---
title: "Special Function Unit (SFU)"
description: "SFU(Special Function Unit)는 GPU에서 특수 함수를 계산하고 평면 속성을 보간하는 전용 하드웨어 유닛이다"
tags: ['Sfu', 'GPU Hardware', 'Special Function', 'Floating Point']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/special-function-unit
sidebar:
  order: 14
---

## 핵심 개념

SFU는 SP 코어와 병행하여 특수 명령어를 실행하는 보조 처리 유닛이다. SM당 2개의 SFU가 있으며, 8개 SP의 1/4 속도로 특수 함수를 처리한다.

**SFU가 계산하는 특수 함수**:
- 역수(reciprocal), 역수 제곱근(reciprocal square root)
- log2x, 2^x, sin, cos 등 초월 함수

**속성 보간**:
- 픽셀 셰이더에서 색상, 깊이, 텍스처 좌표 등의 속성 보간
- 평면 방정식: U(x,y) = Au*x + Bu*y + Cu

**이차 보간 방법(Quadratic Interpolation)**:
입력 피연산자 X의 유효수 비트를 상위 m비트(Xu)와 하위 n-m비트(Xl)로 분할한다. 상위 m비트로 세 개의 룩업 테이블에서 계수 C0, C1, C2를 조회하고, 다음 식으로 함수를 근사한다:
f(X) = C0 + C1*Xl + C2*Xl^2

함수 추정의 정확도는 22~24 유효수 비트이다. SFU는 또한 mul.f32 곱셈 명령어를 실행하여 적절한 명령어 조합에서 최대 50%의 추가 연산 처리량을 제공한다.

## 예시

```
SFU 함수 근사 정확도 (GeForce 8800):

함수          | 최대 절대 오차  | 유효 비트
--------------+-----------------+----------
reciprocal    | 2^(-22.63)     | 22.63
rsqrt         | 2^(-22.51)     | 22.51
log2(x)       | 2^(-21.41)     | 21.41
2^x           | 2^(-22.16)     | 22.16
sin/cos       | 2^(-21.41)     | 21.41

처리량 비교:
- SP 산술 (add, mul): 클럭당 8 연산 (8 SP)
- SFU 특수 함수: 클럭당 2 연산 (2 SFU)
- SFU 곱셈 (추가): 클럭당 2 추가 연산
→ 특수 함수는 기본 산술의 1/4 처리량
```

## 관련 개념

- [Streaming Processor](/knowledge/computer-architecture/streaming-processor/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [MIP-map](/knowledge/computer-architecture/mip-map/)
- [Shader](/knowledge/computer-architecture/shader/)
