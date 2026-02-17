---
title: "Multiple Issue"
description: "다중 발행(Multiple Issue)은 한 클록 사이클에 여러 명령어를 동시에 시작시키는 프로세서 설계 기법이다"
tags: ['Ilp', 'Superscalar', 'Vliw', 'Performance', 'Processor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multiple-issue
sidebar:
  order: 29
---

## 핵심 개념

다중 발행은 정적(static)과 동적(dynamic) 두 가지 접근 방식으로 구현된다. 정적 다중 발행(VLIW)에서는 컴파일러가 동시에 발행할 명령어를 미리 결정하고, 해저드 회피도 주로 컴파일러가 담당한다. 동적 다중 발행(superscalar)에서는 하드웨어가 런타임에 발행할 명령어를 결정한다. 예를 들어, 2-issue MIPS 프로세서는 하나의 ALU/분기 명령어와 하나의 load/store 명령어를 동시에 발행할 수 있다. 이를 위해 추가 레지스터 포트, 별도의 ALU 등 추가 하드웨어가 필요하다. 명령어 간의 의존성과 발행 슬롯 제약으로 인해 이론적 최대 성능을 달성하기는 어렵다.

## 예시

```
2-issue 정적 파이프라인 예시:
ALU/Branch Slot  |  Load/Store Slot
addi $s1, $s1, -16 | lw $t0, 0($s1)
nop              | lw $t1, -8($s1)
addu $t0, $t0, $s2 | nop
nop              | sw $t0, 0($s1)

4 클록 사이클 / 5 유효 명령어
CPI = 4/5 = 0.8, IPC = 1.25 (이상적 IPC = 2.0)
```

## 관련 개념

- [Instruction-Level Parallelism](/knowledge/computer-architecture/instruction-level-parallelism/)
- [Superscalar](/knowledge/computer-architecture/superscalar/)
- [VLIW](/knowledge/computer-architecture/vliw/)
- [Loop Unrolling](/knowledge/computer-architecture/loop-unrolling/)
