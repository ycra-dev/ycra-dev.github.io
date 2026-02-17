---
title: "Instruction Set"
description: "명령어 집합(Instruction Set)은 주어진 아키텍처가 이해하는 명령어들의 어휘(vocabulary)로, 컴퓨터 하드웨어에 명령을 내리기 위한 언어이다"
tags: ['Isa', 'Mips', 'Arm', 'X86', 'Risc V', 'Computer Architecture']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/instruction-set
sidebar:
  order: 2
---

## 핵심 개념

명령어 집합은 컴퓨터 언어의 단어에 해당한다. 서로 다른 컴퓨터의 언어는 인간 언어처럼 다양하지 않고 지역 방언(regional dialect) 수준의 유사성을 보인다. 이는 모든 컴퓨터가 유사한 하드웨어 기술에 기반하고, 동일한 기본 연산을 제공해야 하기 때문이다. 대표적인 명령어 집합으로는 MIPS(1980년대 이후 설계된 RISC ISA의 우아한 예), ARMv7(세계에서 가장 많이 사용되는 ISA), ARMv8(64비트 확장), Intel x86(PC와 클라우드), RISC-V(오픈소스 ISA) 등이 있다. 컴퓨터 설계자의 공통 목표는 하드웨어와 컴파일러를 쉽게 구현하면서 성능을 최대화하고 비용과 에너지를 최소화하는 언어를 찾는 것이다.

## 예시

```
MIPS 명령어 집합의 주요 카테고리:
1. 산술: add, sub, addi, mul
2. 데이터 전송: lw, sw, lb, sb, lh, sh
3. 논리: and, or, nor, sll, srl
4. 조건 분기: beq, bne, slt, slti
5. 무조건 점프: j, jal, jr

설계 원칙:
- 원칙 1: 단순성은 규칙성을 선호한다
- 원칙 2: 작은 것이 빠르다
- 원칙 3: 좋은 설계에는 좋은 절충이 필요하다
```

## 관련 개념

- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Assembly Language](/knowledge/computer-architecture/assembly-language/)
- [Machine Language](/knowledge/computer-architecture/machine-language/)
- [Compiler](/knowledge/computer-architecture/compiler/)
- [Register](/knowledge/computer-architecture/register/)
