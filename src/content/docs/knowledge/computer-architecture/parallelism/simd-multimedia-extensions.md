---
title: "SIMD Multimedia Extensions"
description: "SIMD(Single-Instruction Multiple-Data) 멀티미디어 확장은 하나의 레지스터를 여러 개의 좁은 데이터 항목으로 취급하여 병렬로 산술/논리 연산을 수행하는 명령어 집합 확장이다"
tags: ['Simd', 'Multimedia', 'Sse', 'Neon', 'Vector Processing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/simd-multimedia-extensions
sidebar:
  order: 4
---

## 핵심 개념

1996년부터 데스크톱/서버 RISC 아키텍처에 멀티미디어 및 그래픽 지원을 위한 SIMD 확장이 추가되었다. "packed SIMD"라고도 불리는 이 방식은 넓은 레지스터를 여러 좁은 데이터 레인으로 분할하여 병렬 처리한다.

**주요 SIMD 확장**:
- ARM: NEON (128비트 레지스터, FP 레지스터 확장)
- MIPS: MSA (128비트, 별도 32개 레지스터)
- Power: AltiVec/VMX (128비트, 별도 32개 레지스터)
- SPARC: VIS (64비트, FP 레지스터 재활용)
- Intel: MMX → SSE → SSE2 → AVX
- RISC-V: 별도 벡터 확장(RV64V) 선택 (packed SIMD 대신)

**지원하는 데이터 타입**:
- 8비트 바이트, 16비트 하프워드, 32비트 워드, 64비트 더블워드
- 단정밀도/배정밀도 부동소수점

**특별 기능**:
- **포화 연산(Saturating operations)**: 오버플로 시 최대/최소값으로 클램핑 (필터링에 유용)
- **도트 프로덕트**: 곱셈-누적 연산
- **인터리브/셔플**: 데이터 재배치
- **Pack/Unpack**: 데이터 크기 변환

RISC-V 설계자들은 packed SIMD 대신 진정한 벡터 확장(RV64V)을 선택했는데, 벡터 ISA가 더 일반적이고 SIMD 확장의 기능을 벡터 연산으로 처리할 수 있기 때문이다.

## 예시

```
128비트 SIMD 레지스터의 데이터 해석:

16 × 8비트 바이트:  [b15|b14|...|b1|b0]
 8 × 16비트 하프:   [h7 |h6 |...|h1|h0]
 4 × 32비트 워드:   [w3 |w2 |w1 |w0]
 2 × 64비트 더블:   [d1      |d0     ]
 4 × 32비트 float:  [f3 |f2 |f1 |f0]
 2 × 64비트 double: [d1      |d0     ]

SIMD 덧셈 예시 (4 × 32비트):
레지스터 A: [10, 20, 30, 40]
레지스터 B: [ 1,  2,  3,  4]
결과:       [11, 22, 33, 44]  ← 4개 덧셈이 동시에 수행

포화 연산 예시 (8비트 unsigned):
  200 + 100 = 255 (포화)  vs  44 (모듈러)
  0 - 50   = 0   (포화)  vs  206 (모듈러)
```

## 관련 개념

- [RISC Architecture](/knowledge/computer-architecture/risc-architecture/)
- [x86 Architecture](/knowledge/computer-architecture/x86-architecture/)
- [Graphics Processing Unit (GPU)](/knowledge/computer-architecture/graphics-processing-unit-gpu/)
- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
