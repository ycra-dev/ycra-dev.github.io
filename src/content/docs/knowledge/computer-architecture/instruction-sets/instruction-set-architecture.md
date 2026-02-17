---
title: "Instruction Set Architecture"
description: "명령어 집합 구조(ISA, Instruction Set Architecture)는 하드웨어와 최하위 수준 소프트웨어 사이의 추상적 인터페이스로, 기계어 프로그램을 올바르게 작성하기 위해 필요한 모든 정보(명령어, 레지스터, 메모리 접근, I/O 등)를 포함한다"
tags: ['Computer Architecture', 'Isa', 'Hardware Software Interface', 'Abstraction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/instruction-set-architecture
sidebar:
  order: 1
---

## 핵심 개념

ISA는 컴퓨터 설계에서 가장 중요한 추상화 중 하나이다. 이는 컴퓨터 설계자가 하드웨어 구현과 독립적으로 기능에 대해 논의할 수 있게 해준다. ISA를 일정하게 유지하면, 비용과 성능이 다른 여러 구현(implementation)이 동일한 소프트웨어를 실행할 수 있다. 예를 들어, IBM System/360은 동일한 아키텍처의 6개 구현을 발표하여 가격/성능이 25배 차이가 났다. 대표적인 ISA로는 MIPS, ARM, x86, RISC-V가 있다. 기본 ISA와 운영체제 인터페이스의 결합을 ABI(Application Binary Interface)라 한다.

## 예시

MIPS ISA의 주요 구성 요소:
```
1. 명령어 유형: add, sub, lw, sw, beq, j 등
2. 레지스터: 32개의 32비트 범용 레지스터
3. 메모리 모델: 바이트 주소 지정, 빅 엔디안
4. 명령어 형식: R-type, I-type, J-type
5. 주소 지정 방식: 즉시값, 레지스터, 베이스, PC-상대
```

## 관련 개념

- [Abstraction](/knowledge/computer-architecture/abstraction/)
- [Application Binary Interface](/knowledge/computer-architecture/application-binary-interface/)
- [Instruction Set](/knowledge/computer-architecture/instruction-set/)
- [Instruction Format](/knowledge/computer-architecture/instruction-format/)
- [Register](/knowledge/computer-architecture/register/)
