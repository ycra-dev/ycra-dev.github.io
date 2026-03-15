---
title: "주소 지정 방식 (Addressing Mode)"
description: "주소 지정 방식(Addressing Mode)은 피연산자 및/또는 주소의 다양한 사용에 따라 구분되는 여러 가지 주소 체계로, 명령어가 피연산자를 참조하는 방법을 결정한다"
tags: ['Instruction Encoding', 'Operand', 'Memory Access', 'Mips', 'Addressing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/addressing-mode
sidebar:
  order: 11
---

## 핵심 개념

MIPS는 5가지 주소 지정 방식을 제공한다: (1) 즉시 주소 지정(Immediate) - 피연산자가 명령어 내의 상수, (2) 레지스터 주소 지정(Register) - 피연산자가 레지스터, (3) 베이스/변위 주소 지정(Base/Displacement) - 레지스터와 상수의 합이 메모리 주소, (4) PC-상대 주소 지정(PC-relative) - PC와 상수의 합이 분기 주소, (5) 의사직접 주소 지정(Pseudodirect) - 명령어의 26비트에 PC 상위 비트를 연결하여 점프 주소 생성. 하나의 연산이 여러 주소 지정 방식을 사용할 수 있다(예: add는 즉시 주소와 레지스터 주소 모두 사용). 주소 지정 방식의 다양성은 명령어 길이의 제약과 유연성 사이의 절충이다.

## 예시

```
MIPS 5가지 주소 지정 방식:

1. 즉시값: addi $s0, $s1, 100
   피연산자 = 명령어 내 상수 100

2. 레지스터: add $s0, $s1, $s2
   피연산자 = 레지스터 내용

3. 베이스/변위: lw $t0, 32($s3)
   주소 = $s3 + 32

4. PC-상대: beq $s0, $s1, L1
   주소 = (PC + 4) + (오프셋 × 4)

5. 의사직접: j 10000
   주소 = PC[31:28] | (26비트 주소 << 2)
```

## 관련 개념

- [PC 상대 주소 지정 (PC-Relative Addressing)](/knowledge/computer-architecture/pc-relative-addressing/)
- [데이터 전송 명령어 (Data Transfer Instruction)](/knowledge/computer-architecture/data-transfer-instruction/)
- [명령어 형식 (Instruction Format)](/knowledge/computer-architecture/instruction-format/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
