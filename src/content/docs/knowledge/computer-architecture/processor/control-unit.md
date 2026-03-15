---
title: "제어 장치 (Control Unit)"
description: "제어 유닛(Control Unit)은 명령어의 opcode 필드를 입력으로 받아 데이터패스의 각 기능 유닛과 멀티플렉서를 제어하는 신호를 생성하는 프로세서 구성 요소이다"
tags: ['Processor', 'Opcode', 'Control Signal', 'Mips', 'Datapath']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/control-unit
sidebar:
  order: 3
---

## 핵심 개념

제어 유닛은 명령어의 상위 6비트(opcode)를 분석하여 9개의 제어 신호를 생성한다: RegDst, ALUSrc, MemtoReg, RegWrite, MemRead, MemWrite, Branch, ALUOp(2비트). 이 신호들은 멀티플렉서 선택, 레지스터 쓰기 여부, 메모리 읽기/쓰기 여부, 분기 결정 등을 제어한다. MIPS 명령어 집합의 규칙성 덕분에 제어 신호는 opcode에 의해 완전히 결정되며, 진리표(truth table)로 표현할 수 있다. PCSrc 신호는 Branch 신호와 ALU의 Zero 출력을 AND 연산하여 파생된다.

## 예시

```
제어 신호 설정 예:
        RegDst ALUSrc MemtoReg RegWrite MemRead MemWrite Branch ALUOp
R-type:   1      0      0        1        0        0      0     10
lw:       0      1      1        1        1        0      0     00
sw:       X      1      X        0        0        1      0     00
beq:      X      0      X        0        0        0      1     01
```

## 관련 개념

- [ALU 제어 (ALU Control)](/knowledge/computer-architecture/alu-control/)
- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
- [단일 사이클 구현 (Single-Cycle Implementation)](/knowledge/computer-architecture/single-cycle-implementation/)
- [연산 코드 (Opcode)](/knowledge/computer-architecture/opcode/)
