---
title: "x86 아키텍처 (x86 Architecture)"
description: "x86(80x86) 아키텍처는 Intel이 1978년 8086에서 시작하여 수십 년에 걸쳐 발전시킨 CISC 명령어 집합 아키텍처로, 세계에서 가장 널리 사용되는 데스크톱/서버 프로세서 아키텍처이다"
tags: ['X86', 'Intel', 'Cisc', 'Instruction Set', 'Backward Compatibility']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/x86-architecture
sidebar:
  order: 4
---

## 핵심 개념

x86의 발전 과정은 하위 호환성의 "황금 수갑"에 의해 형성되었다:

**주요 마일스톤**:
- **1978**: 8086 - 16비트 확장 누산기 기계
- **1980**: 8087 - 부동소수점 스택 아키텍처 추가 (~60개 FP 명령어)
- **1982**: 80286 - 24비트 주소 공간, 메모리 보호
- **1985**: 80386 - 32비트 확장, 새 주소 지정 모드, 페이징 지원
- **1997~**: MMX, SSE, SSE2 등 SIMD 멀티미디어 확장
- **2003**: AMD64 - 64비트 확장 (레지스터 16개로 확장)

**x86의 특징**:
- 가변 길이 명령어 (1~17바이트)
- 7가지 데이터 주소 지정 모드
- 레지스터-메모리 연산 지원 (순수 Load/Store 아니님)
- 세그먼트 메모리 모델 (플랫 모드로도 사용 가능)
- 부동소수점: 80비트 스택 아키텍처 + SSE2 레지스터 모델

**명령어 인코딩 복잡성**:
- 선택적 프리픽스 (세그먼트 오버라이드, 크기 오버라이드, REP 등)
- 가변 길이 opcode (1~2바이트)
- postbyte (mod/reg/r/m) + SIB 바이트
- 8/16/32비트 변위와 즉시값

x86는 아키텍처적 우아함은 부족하지만, IBM PC 선택으로 인한 거대한 소프트웨어 생태계 덕분에 지배적 위치를 유지한다.

## 예시

```
x86 명령어 형식:
[프리픽스] [opcode] [mod/reg/r/m] [SIB] [변위] [즉시값]
 0-4바이트  1-2바이트  0-1바이트  0-1바이트 0-4바이트 0-4바이트

레지스터 (32비트 모드):
EAX, ECX, EDX, EBX - 범용 (8086 유산으로 제한 있음)
ESP - 스택 포인터
EBP - 프레임 포인터
ESI, EDI - 인덱스 레지스터
EIP - 프로그램 카운터

평균 명령어 길이:
- 정수 프로그램: 2.8 바이트 (σ=1.5)
- 부동소수점 프로그램: 4.1 바이트 (σ=1.9)

MIPS와 비교 (SPEC92):
- x86가 약 2배 적은 명령어 실행 (레지스터-메모리 때문)
- 하지만 CPI가 높아서 전체 성능은 RISC가 우수
```

## 관련 개념

- [RISC 아키텍처 (RISC Architecture)](/knowledge/computer-architecture/risc-architecture/)
- [CISC (복합 명령어 집합 컴퓨터)](/knowledge/computer-architecture/cisc/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
- [SIMD 멀티미디어 확장 (SIMD Multimedia Extensions)](/knowledge/computer-architecture/simd-multimedia-extensions/)
