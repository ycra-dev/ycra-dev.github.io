---
title: "SIMD"
description: "SIMD(Single Instruction, Multiple Data)는 하나의 명령어로 여러 데이터 요소에 대해 동일한 연산을 동시에 수행하는 병렬 처리 방식이다"
tags: ['Parallelism', 'Subword Parallelism', 'Sse', 'Avx', 'Neon', 'Vector']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/simd
sidebar:
  order: 3
---

## 핵심 개념

SIMD는 데이터 수준 병렬성을 활용하는 아키텍처 분류이다. 멀티미디어 확장의 초기 형태로 Intel의 MMX(1997), SSE(1999)가 있으며, ARM의 NEON도 SIMD 확장이다. SSE2(2001)에서 8개의 128비트 XMM 레지스터가 추가되어 4개의 단정밀도 또는 2개의 배정밀도 연산을 병렬 수행한다. 데이터가 128비트 정렬 메모리에 배치되면 하나의 명령어로 여러 피연산자를 로드/스토어 가능하다. 그래픽, 오디오, 과학 계산, 행렬 연산 등에서 성능을 크게 향상시킨다.

SIMD의 장점은 모든 병렬 실행 유닛이 동기화되어 하나의 프로그램 카운터(PC)에서 나오는 단일 명령어에 응답한다는 것이다. SIMD는 for 루프의 배열 처리에서 가장 잘 동작하며, 동일하게 구조화된 데이터가 많아야 한다. SIMD의 약점은 case/switch 문에서 나타나는데, 각 실행 유닛이 데이터에 따라 다른 연산을 수행해야 하므로 n개의 분기가 있으면 피크 성능의 1/n에서 동작한다. SIMD의 원래 동기는 제어 유닛의 비용을 많은 실행 유닛에 분산시키는 것이었다.

## 예시

```
# SSE2: 2개 배정밀도 병렬 덧셈
addpd %xmm0, %xmm4    # xmm4 = xmm4 + xmm0 (2 × 64비트)

# AVX: 4개 배정밀도 병렬 덧셈
vaddpd %ymm0, %ymm1, %ymm4   # ymm4 = ymm0 + ymm1 (4 × 64비트)

# AVX-512: 8개 배정밀도 병렬 덧셈
vaddpd %zmm0, %zmm1, %zmm4   # zmm4 = zmm0 + zmm1 (8 × 64비트)
```

```
# SIMD 연산 예시 (AVX-256, 4개의 double 동시 처리)
# 일반 스칼라 코드:
for (i = 0; i < 4; i++)
    C[i] = A[i] + B[i];  // 4번의 add 명령어

# SIMD 코드 (하나의 명령어로 4개 동시 처리):
vaddpd ymm2, ymm0, ymm1  // 256비트: 4x64비트 double add

# SIMD가 약한 경우 (조건 분기)
for (i = 0; i < N; i++) {
    switch(data[i]) {
        case 0: result[i] = func_a(data[i]); break;
        case 1: result[i] = func_b(data[i]); break;
    }
}
// 2개의 분기 -> 피크 성능의 1/2
```

## 관련 개념

- [Subword Parallelism](/knowledge/computer-architecture/subword-parallelism/)
- [Advanced Vector Extensions](/knowledge/computer-architecture/advanced-vector-extensions/)
- [x86 Instruction Set](/knowledge/computer-architecture/x86-instruction-set/)
- [Data-Level Parallelism](/knowledge/computer-architecture/data-level-parallelism/)
- [Vector Architecture](/knowledge/computer-architecture/vector-architecture/)
- [MIMD](/knowledge/computer-architecture/mimd/)
- [GPU](/knowledge/computer-architecture/gpu/)
