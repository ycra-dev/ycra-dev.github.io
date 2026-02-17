---
title: "ALU Control"
description: "ALU 제어(ALU Control)는 명령어의 기능 필드(funct field)와 ALUOp 제어 신호를 입력으로 받아 ALU가 수행할 연산을 지정하는 4비트 제어 신호를 생성하는 유닛이다"
tags: ['Control Unit', 'Alu', 'Funct Field', 'Aluop', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/alu-control
sidebar:
  order: 4
---

## 핵심 개념

ALU 제어는 다단계 디코딩(multiple levels of decoding) 방식을 사용한다. 주 제어 유닛이 ALUOp 비트를 생성하고, 이를 ALU 제어 유닛이 명령어의 funct 필드와 함께 사용하여 실제 ALU 제어 신호를 결정한다. ALUOp가 00이면 덧셈(load/store), 01이면 뺄셈(beq), 10이면 funct 필드에 의해 결정된다. 이 다단계 제어 방식은 주 제어 유닛의 크기를 줄이고 속도를 향상시킬 수 있다.

## 예시

```
ALU 제어 입력과 연산 매핑:
ALUOp | Funct Field | ALU Control | 연산
  00  |  XXXXXX     |   0010      | add (lw/sw)
  01  |  XXXXXX     |   0110      | subtract (beq)
  10  |  100000     |   0010      | add
  10  |  100010     |   0110      | subtract
  10  |  100100     |   0000      | AND
  10  |  100101     |   0001      | OR
  10  |  101010     |   0111      | set on less than
```

## 관련 개념

- [Control Unit](/knowledge/computer-architecture/control-unit/)
- [Datapath](/knowledge/computer-architecture/datapath/)
- [R-Format Instruction](/knowledge/computer-architecture/r-format-instruction/)
- [Truth Table](/knowledge/computer-architecture/truth-table/)
