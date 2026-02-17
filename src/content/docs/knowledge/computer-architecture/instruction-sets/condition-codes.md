---
title: "Condition Codes"
description: "조건 코드(Condition Codes)는 산술/논리 연산의 부작용으로 설정되는 상태 비트로, 결과가 양수, 음수, 0인지, 또는 오버플로가 발생했는지를 나타내며, 후속 조건 분기 명령어에서 사용된다"
tags: ['Condition Codes', 'Branch', 'Control Flow', 'Isa Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/condition-codes
sidebar:
  order: 24
---

## 핵심 개념

조건 분기를 구현하는 방식은 RISC 아키텍처마다 다르며, 크게 세 가지 접근이 있다:

**1. 조건 코드 방식 (SPARC, ARM)**:
- N(Negative), Z(Zero), V(oVerflow), C(Carry) 4비트
- 산술/논리 명령어의 선택적 부작용으로 설정
- SPARC: 명령어별로 CC 설정 여부 선택 가능 (파이프라인 친화적)
- ARM: CMP, CMN, TST, TEQ로 CC 설정, B.cond로 분기
- Power: 8개의 4비트 조건 레지스터 복사본 보유 + 논리 연산(CRAND, CROR 등)

**2. 비교 후 분기 방식 (RISC-V, MIPS)**:
- RISC-V: 전체 산술 비교를 포함한 비교-분기 명령어 (beq, bne, blt, bge 등)
- MIPS: 동등성과 0 비교만 직접 분기, SLT로 기타 비교
- 별도의 CC 레지스터 불필요

**3. VAX 방식**:
- 대부분의 명령어가 CC를 자동 설정
- 별도 비교 명령어(cmp*)로도 CC 설정 가능
- 분기 명령어가 CC를 테스트

**부동소수점 비교**:
- SPARC: 별도 FP CC, FP 비교 명령어 필요
- RISC-V: 정수 레지스터에 0/1 설정 후 조건 분기
- ARM: FP 비교가 정수 CC를 설정
- Power: 별도 FP CC 레지스터

## 예시

```
조건 분기 방식 비교:

SPARC (조건 코드):
  subcc r1, r2, r0    ; r1-r2 연산, CC 설정 (r0에 결과 버림)
  bge  target          ; CC 기반으로 분기 (r1 >= r2이면)

ARM (조건 코드):
  CMP  x1, x2         ; x1-x2, CC 설정
  B.GE target          ; CC 기반 분기

RISC-V (비교-분기):
  bge  x1, x2, target ; 하나의 명령어로 비교+분기

MIPS (제한된 비교-분기):
  slt  $t0, $s1, $s2  ; $s1 < $s2이면 $t0 = 1
  bne  $t0, $zero, target  ; $t0 != 0이면 분기

Power (다중 조건 레지스터):
  cmp  cr3, r1, r2    ; cr3에 비교 결과 저장
  bge  cr3, target    ; cr3 기반 분기
  crand cr7, cr3, cr5 ; 조건 논리 연산 가능
```

## 관련 개념

- [RISC Architecture](/knowledge/computer-architecture/risc-architecture/)
- [CISC](/knowledge/computer-architecture/cisc/)
- [x86 Architecture](/knowledge/computer-architecture/x86-architecture/)
- [Control Unit](/knowledge/computer-architecture/control-unit/)
