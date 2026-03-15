---
title: "의사 명령어 (Pseudoinstruction)"
description: "의사명령어(Pseudoinstruction)는 실제 하드웨어에는 구현되어 있지 않지만, 어셈블러가 하나 이상의 실제 기계어 명령어로 변환하여 처리하는 어셈블리 언어 명령어이다"
tags: ['Assembly Language', 'Assembler', 'Mips', 'Instruction Set']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pseudoinstruction
sidebar:
  order: 22
---

## 핵심 개념

의사명령어는 어셈블리 프로그래밍을 단순화하기 위해 존재한다. 어셈블러는 이러한 의사명령어를 받아들이고 실제 기계어 명령어로 변환한다. 이를 위해 MIPS에서는 $at 레지스터를 어셈블러 전용으로 예약한다. 예를 들어, MIPS의 `move` 명령어는 실제 하드웨어 명령어가 아니지만 `add`로 변환되고, `blt`(branch on less than)는 `slt`와 `bne` 두 명령어로 변환된다. 의사명령어를 사용하면 MIPS가 하드웨어로 구현된 것보다 더 풍부한 어셈블리 명령어 세트를 제공하게 된다.

## 예시

```assembly
# 의사명령어: move
move $t0, $t1     # $t0 = $t1

# 어셈블러가 변환하는 실제 명령어:
add $t0, $zero, $t1   # $t0 = 0 + $t1

# 의사명령어: blt (branch on less than)
blt $s0, $s1, Label

# 어셈블러가 변환하는 실제 명령어:
slt $at, $s0, $s1     # $at = 1 if $s0 < $s1
bne $at, $zero, Label  # branch if $at != 0
```

## 관련 개념

- [어셈블리어 (Assembly Language)](/knowledge/computer-architecture/assembly-language/)
- [어셈블러 (Assembler)](/knowledge/language/assembler/)
