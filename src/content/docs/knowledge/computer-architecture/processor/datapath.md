---
title: "Datapath"
description: "데이터패스(Datapath)는 프로세서 내에서 산술 연산을 수행하는 구성요소로, CPU의 \"근육(brawn)\" 역할을 한다"
tags: ['Processor', 'Alu', 'Arithmetic', 'Hardware', 'CPU']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/datapath
sidebar:
  order: 1
---

## 핵심 개념

데이터패스는 프로세서의 두 가지 주요 논리적 구성요소 중 하나이다(다른 하나는 제어부). ALU(산술 논리 연산 장치), 레지스터 파일, 멀티플렉서, 시프터 등의 하드웨어 요소로 구성되며, 덧셈, 뺄셈, 곱셈, 비교 등의 연산을 실제로 수행한다. 제어부가 프로그램의 명령어에 따라 데이터패스에 어떤 연산을 수행할지 지시하면, 데이터패스가 해당 연산을 실행한다. 파이프라인 설계에서는 데이터패스가 여러 단계로 나뉘어 각 단계가 동시에 서로 다른 명령어를 처리한다.

데이터패스는 명령어 메모리, 데이터 메모리, 레지스터 파일, ALU, 가산기 등의 기능 유닛으로 구성된다. MIPS 구현에서 데이터패스는 명령어를 가져오고(instruction fetch), 레지스터를 읽고, ALU 연산을 수행하며, 메모리에 접근하고, 결과를 레지스터에 기록하는 일련의 과정을 지원한다. 멀티플렉서(multiplexor)를 사용하여 여러 데이터 소스 중 하나를 선택하고, 제어 신호에 의해 각 기능 유닛의 동작이 결정된다. 데이터패스 설계는 ISA(명령어 집합 아키텍처)에 의해 크게 영향을 받으며, MIPS의 규칙성과 단순성은 데이터패스 구현을 간소화한다.

## 예시

간단한 MIPS 데이터패스에서 `add $s0, $s1, $s2` 명령어 실행:
```
1. 레지스터 파일에서 $s1과 $s2의 값을 읽음
2. ALU가 두 값을 더함
3. 결과를 $s0 레지스터에 기록
```

MIPS의 기본 데이터패스는 다음과 같은 주요 요소로 구성된다:
- 명령어 메모리: PC가 가리키는 주소에서 명령어를 읽음
- 레지스터 파일: 두 개의 읽기 포트와 하나의 쓰기 포트
- ALU: 산술/논리 연산, 주소 계산, 비교 수행
- 데이터 메모리: load/store 명령어를 위한 메모리 접근

```
PC -> Instruction Memory -> Register File -> ALU -> Data Memory -> Register File
```

## 관련 개념

- [Register](/knowledge/computer-architecture/register/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
- [Clock Cycle](/knowledge/computer-architecture/clock-cycle/)
- [Program Counter](/knowledge/computer-architecture/program-counter/)
- [ALU Control](/knowledge/computer-architecture/alu-control/)
- [Register File](/knowledge/computer-architecture/register-file/)
- [Control Unit](/knowledge/computer-architecture/control-unit/)
- [Single-Cycle Implementation](/knowledge/computer-architecture/single-cycle-implementation/)
