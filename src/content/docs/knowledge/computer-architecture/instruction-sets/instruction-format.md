---
title: "Instruction Format"
description: "명령어 형식(Instruction Format)은 이진수 필드로 구성된 명령어의 표현 형태로, MIPS에서는 R-type(레지스터), I-type(즉시값), J-type(점프) 세 가지 형식이 있다"
tags: ['Machine Language', 'R Type', 'I Type', 'J Type', 'Binary Encoding', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/instruction-format
sidebar:
  order: 3
---

## 핵심 개념

MIPS의 모든 명령어는 32비트 길이이며, 이는 "단순성은 규칙성을 선호한다"는 설계 원칙을 따른다. R-type은 산술/논리 연산에 사용되며, op(6비트), rs(5비트), rt(5비트), rd(5비트), shamt(5비트), funct(6비트) 필드로 구성된다. I-type은 즉시값과 데이터 전송 명령어에 사용되며, op, rs, rt, address(16비트) 필드로 구성된다. J-type은 점프 명령어에 사용되며, op(6비트)과 address(26비트) 필드로 구성된다. 모든 명령어를 같은 길이로 유지하면서 다양한 종류의 명령어를 지원하기 위해 여러 형식을 사용하는 것은 "좋은 설계에는 좋은 절충이 필요하다"는 원칙의 예이다.

## 예시

```
R-type (레지스터 형식): add, sub, and, or, slt 등
  [op:6][rs:5][rt:5][rd:5][shamt:5][funct:6]
  add $t0, $s1, $s2:
  [000000][10001][10010][01000][00000][100000]

I-type (즉시값 형식): addi, lw, sw, beq, bne 등
  [op:6][rs:5][rt:5][immediate/address:16]
  lw $t0, 32($s3):
  [100011][10011][01000][0000000000100000]

J-type (점프 형식): j, jal
  [op:6][address:26]
  j 10000:
  [000010][00000000000000000010011100010000]
```

## 관련 개념

- [Machine Language](/knowledge/computer-architecture/machine-language/)
- [Opcode](/knowledge/computer-architecture/opcode/)
- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Stored-Program Concept](/knowledge/computer-architecture/stored-program-concept/)
- [Register](/knowledge/computer-architecture/register/)
