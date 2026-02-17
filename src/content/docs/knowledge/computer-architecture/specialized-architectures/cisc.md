---
title: "Complex Instruction Set Computer (CISC)"
description: "CISC(Complex Instruction Set Computer)는 강력한 명령어, 다양한 주소 지정 모드, 가변 길이 명령어를 사용하여 컴파일러를 단순화하고 코드 밀도를 높이는 것을 목표로 한 프로세서 설계 철학이다"
tags: ['Cisc', 'Vax', 'Instruction Set', 'Computer Architecture']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cisc
sidebar:
  order: 2
---

## 핵심 개념

CISC의 대표적 아키텍처는 VAX이다. CISC의 설계 철학:

1. **프로그래밍 언어에 가까운 명령어**: 루프, 프로시저 호출 등을 위한 전용 명령어
2. **코드 크기 최소화**: 가변 길이 명령어로 주소 필드 낭비 방지
3. **강력한 주소 지정 모드**: 레지스터, 변위(8/16/32비트), 간접, 인덱스, 자동증가 등 22가지 모드
4. **직교적 설계**: opcode가 주소 지정 모드와 데이터 타입에 독립적

**VAX의 특징**:
- 명령어 길이: 1~54바이트 이상 가변
- 2-operand와 3-operand 형태 모두 제공
- 정수 add만 30,000+ 변형 (주소 지정 모드 조합)
- calls/ret: 수십 사이클의 복잡한 프로시저 호출/복귀

**CISC vs RISC 성능 비교 (VAX 8700 vs MIPS M2000)**:
- MIPS가 약 2배 더 많은 명령어 실행
- 하지만 VAX의 CPI가 약 6배 → MIPS가 약 3배 빠름
- 결론: 적은 명령어 수가 반드시 빠른 성능을 의미하지 않음

CISC의 복잡한 명령어는 파이프라이닝을 어렵게 하고, 각 피연산자 디코딩에 추가 사이클이 필요하여 높은 CPI를 초래한다.

## 예시

```
VAX vs MIPS 코드 비교 (swap 프로시저):

VAX (8줄):
  .word ^m<r0,r1,r2,r3>    ; 레지스터 저장 마스크
  movl r2, 4(ap)            ; r2 = v[]
  movl r1, 8(ap)            ; r1 = k
  movl r3, (r2)[r1]         ; temp = v[k]
  addl3 r0, #1, 8(ap)       ; r0 = k+1
  movl (r2)[r1], (r2)[r0]   ; v[k] = v[k+1]
  movl (r2)[r0], r3          ; v[k+1] = temp
  ret                        ; 복원 + 복귀

MIPS (17줄):
  → load/store, 주소 계산, 레지스터 저장/복원 별도 필요

VAX 장점: 코드 밀도, 인덱스 주소 지정, 자동 레지스터 저장
MIPS 장점: 파이프라이닝 용이, 단순한 디코딩, 높은 클럭

성능 (SPEC89):
MIPS M2000: 명령어 2배 더 많지만 성능 3배 우수
```

## 관련 개념

- [RISC Architecture](/knowledge/computer-architecture/risc-architecture/)
- [x86 Architecture](/knowledge/computer-architecture/x86-architecture/)
- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
