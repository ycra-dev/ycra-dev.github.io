---
title: "다중 사이클 구현 (Multicycle Implementation)"
description: "다중 사이클 구현(Multicycle Implementation)은 명령어 실행을 여러 클록 사이클로 나누어 각 단계가 1 클록 사이클에 수행되는 프로세서 구현 방식이다"
tags: ['Processor', 'Finite State Machine', 'Datapath', 'Clock Cycle']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multicycle-implementation
sidebar:
  order: 10
---

## 핵심 개념

다중 사이클 구현의 주요 장점은 기능 유닛을 명령어 내에서 재사용할 수 있다는 것이다. 단일 메모리를 명령어와 데이터 모두에 사용하고, 하나의 ALU로 주소 계산, 연산, PC 증가를 처리한다. 명령어마다 다른 수의 클록 사이클을 사용할 수 있어 더 효율적이다(lw: 5사이클, sw: 4사이클, R-type: 4사이클, beq: 3사이클). 중간 결과를 저장하기 위해 IR, MDR, A, B, ALUOut 등의 임시 레지스터가 추가된다. 제어는 유한 상태 기계(FSM)로 구현되며, 현재 상태와 opcode에 따라 다음 상태와 제어 신호가 결정된다.

## 예시

```
5단계 실행 과정:
1. Instruction Fetch: IR <= Memory[PC]; PC <= PC + 4
2. Instruction Decode / Register Fetch: A <= Reg[rs]; B <= Reg[rt]
3. Execution / Address Calculation (명령어 유형에 따라 다름)
4. Memory Access / R-type Completion
5. Memory Read Completion (load만 해당)

CPI 계산 (SPEC2006 기준):
CPI = 0.20 x 5 + 0.08 x 4 + 0.62 x 4 + 0.10 x 3 = 4.12
```

## 관련 개념

- [단일 사이클 구현 (Single-Cycle Implementation)](/knowledge/computer-architecture/single-cycle-implementation/)
- [유한 상태 기계 (Finite-State Machine)](/knowledge/computer-architecture/finite-state-machine/)
- [파이프라이닝 (Pipelining)](/knowledge/computer-architecture/pipelining/)
- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
