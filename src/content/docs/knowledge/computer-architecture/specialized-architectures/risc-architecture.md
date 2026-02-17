---
title: "RISC Architecture"
description: "RISC(Reduced Instruction Set Computer) 아키텍처는 단순한 명령어, 제한된 주소 지정 모드, 고정 길이 명령어 형식, 그리고 많은 수의 범용 레지스터를 특징으로 하는 프로세서 설계 철학이다"
tags: ['Risc', 'Instruction Set', 'Computer Architecture', 'Isa Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/risc-architecture
sidebar:
  order: 1
---

## 핵심 개념

RISC 아이디어는 1980년대에 등장한 이후 컴퓨터 아키텍처에 전례 없는 합의를 이끌어냈다. 현재 주요 데스크톱/서버 RISC 아키텍처:

- **ARMv8 (AArch64)**: 64비트 ISA, 모바일 및 서버
- **MIPS64 R6**: 64비트 ISA
- **Power v3.0**: IBM Power와 PowerPC 통합
- **RISC-V (RV64G)**: 오픈소스 64비트 ISA
- **SPARCv9**: 64비트 ISA

**RISC 아키텍처의 공통 특성**:
- 32개 64비트 범용 정수 레지스터 (ARM은 31개)
- 32개 64비트 부동소수점 레지스터
- Load/Store 아키텍처 (메모리 접근은 load/store 명령어만)
- 4가지 주요 명령어 형식: 레지스터-레지스터, ALU 즉시값, 분기, 점프/호출
- 대부분 32비트 고정 길이 명령어

**16비트 확장 (임베디드용)**:
- Thumb-2 (ARM), microMIPS64 (MIPS), RV64GC (RISC-V)
- 코드 크기를 32비트 ISA의 약 73%로 축소
- 주로 8개 레지스터만 접근 가능한 제한된 명령어

90% 이상의 실행 명령어가 모든 RISC 아키텍처에서 공통으로 발견된다.

## 예시

```
5개 RISC 아키텍처 비교:

특성          | ARM  | MIPS | Power | RISC-V | SPARC
--------------+------+------+-------+--------+------
정수 레지스터  | 31   | 32   | 32    | 32     | 32
FP 레지스터   | 32   | 32   | 32    | 32     | 32
주소 지정 모드 | 9    | 3    | 4     | 3      | 2
명령어 길이   | 32   | 32   | 32    | 32     | 32
조건 분기 방식 | CC   | Cmp  | CC    | Cmp+Br | CC

4가지 기본 명령어 형식:
1. Register-Register: op rd, rs1, rs2
2. ALU Immediate:     op rd, rs1, imm
3. Branch:            beq rs1, rs2, offset
4. Jump/Call:         jal rd, target
```

## 관련 개념

- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Register Windows](/knowledge/computer-architecture/register-windows/)
- [x86 Architecture](/knowledge/computer-architecture/x86-architecture/)
- [CISC](/knowledge/computer-architecture/cisc/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
