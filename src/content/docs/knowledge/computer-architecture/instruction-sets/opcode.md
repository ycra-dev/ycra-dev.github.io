---
title: "Opcode"
description: "오피코드(Opcode, Operation Code)는 명령어의 연산과 형식을 나타내는 필드로, 하드웨어가 명령어의 종류를 식별하는 데 사용된다"
tags: ['Instruction Format', 'Machine Language', 'Encoding', 'Binary', 'Decoding']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/opcode
sidebar:
  order: 4
---

## 핵심 개념

MIPS에서 오피코드는 명령어의 처음 6비트(op 필드)에 위치한다. 이 필드의 값에 따라 하드웨어는 명령어의 나머지 부분을 R-type(세 필드), I-type(단일 필드), J-type(단일 주소 필드)으로 해석한다. R-type 명령어의 경우, op 필드가 0이고 funct 필드(마지막 6비트)가 구체적인 연산(add=32, sub=34 등)을 결정한다. I-type에서는 op 필드만으로 연산이 결정된다(lw=35, sw=43, beq=4, bne=5, addi=8 등). 관련 명령어의 이진 표현을 유사하게 설계하여 하드웨어 디코딩을 단순화하는 것은 MIPS 아키텍처의 규칙성(regularity)의 예이다.

## 예시

```
MIPS 오피코드 예시:

op 필드 값 → 명령어
  0       → R-format (funct 필드로 구분)
            funct=32: add
            funct=34: sub
            funct=36: and
            funct=37: or
            funct=42: slt
  2       → j (jump)
  3       → jal (jump and link)
  4       → beq (branch if equal)
  5       → bne (branch if not equal)
  8       → addi (add immediate)
  35      → lw (load word)
  43      → sw (store word)
```

## 관련 개념

- [Instruction Format](/knowledge/computer-architecture/instruction-format/)
- [Machine Language](/knowledge/computer-architecture/machine-language/)
- [Instruction Set](/knowledge/computer-architecture/instruction-set/)
- [Central Processing Unit](/knowledge/computer-architecture/central-processing-unit/)
