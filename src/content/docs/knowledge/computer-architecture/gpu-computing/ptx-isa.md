---
title: "PTX ISA (병렬 스레드 실행 명령어 집합)"
description: "PTX(Parallel Thread Execution)는 NVIDIA가 정의한 레지스터 기반 스칼라 명령어 집합으로, 컴파일러의 안정적인 타겟 ISA를 제공하며 여러 세대의 GPU에 걸쳐 호환성을 보장한다"
tags: ['Ptx', 'Instruction Set', 'GPU', 'Nvidia', 'Intermediate Representation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/ptx-isa
sidebar:
  order: 4
---

## 핵심 개념

PTX는 고수준 언어 컴파일러와 GPU 바이너리 마이크로명령어 사이의 중간 표현(IR) 역할을 한다.

**PTX ISA의 특징**:
- 레지스터 기반 load/store 스칼라 명령어 집합
- 단일 스레드의 동작을 기술
- 가상 레지스터를 사용하여 옵티마이저가 실제 레지스터 할당 수행
- 여러 세대의 GPU에 걸쳐 호환성 보장

**명령어 형식**: `opcode.type d, a, b, c;`
- d: 목적지 피연산자, a/b/c: 소스 피연산자
- .type: .b8/.u32/.s64/.f32 등 다양한 데이터 타입

**PTX 명령어 범주**:
- 부동소수점: add.f32, mul.f32, mad.f32, min.f32, max.f32
- 정수/논리: add, sub, mul, and, or, xor, shl, shr
- 변환: cvt (타입 간 변환)
- 특수 함수: rcp, rsqrt, sin, cos, lg2, ex2
- 흐름 제어: @p bra, call, ret, exit, bar.sync
- 메모리: ld.global, st.global, ld.shared, st.shared, ld.local, st.local
- 텍스처: tex

PTX 명령어는 GPU별 바이너리 마이크로명령어로 최적화 및 변환되므로, 하드웨어 명령어가 빠르게 발전해도 컴파일러 도구에 영향을 주지 않는다.

## 예시

```
// PTX 어셈블리 예시: SAXPY (y = a*x + y)
.reg .f32 %f<4>;
.reg .u32 %r<3>;

ld.param.u32 %r0, [n];
ld.param.f32 %f0, [a];
ld.global.f32 %f1, [x + %r1];   // x[i] 로드
ld.global.f32 %f2, [y + %r1];   // y[i] 로드
mad.f32 %f3, %f0, %f1, %f2;     // a*x[i] + y[i]
st.global.f32 [y + %r1], %f3;   // 결과 저장

// PTX → GPU 바이너리 변환 과정:
// 1. 가상 레지스터 → 물리 레지스터 할당
// 2. 데드 코드 제거
// 3. 명령어 폴딩 (여러 PTX → 하나의 바이너리)
// 4. SIMT 분기 분기/합류 지점 최적화
```

## 관련 개념

- [CUDA (Compute Unified Device Architecture)](/knowledge/computer-architecture/cuda/)
- [SIMT (단일 명령어 다중 스레드)](/knowledge/computer-architecture/simt/)
- [SP (스트리밍 프로세서)](/knowledge/computer-architecture/streaming-processor/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
