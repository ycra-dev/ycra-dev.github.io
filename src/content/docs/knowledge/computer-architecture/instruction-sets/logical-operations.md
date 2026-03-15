---
title: "논리 연산 (Logical Operations)"
description: "논리 연산(Logical Operations)은 워드 내의 비트 필드 또는 개별 비트를 조작하는 명령어로, AND, OR, NOT, NOR, 시프트(shift) 등이 포함된다"
tags: ['Bitwise', 'And', 'Or', 'Shift', 'Mask', 'Instruction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/logical-operations
sidebar:
  order: 14
---

## 핵심 개념

논리 연산은 비트 수준에서 데이터를 조작하는 데 사용된다. 시프트(shift) 연산은 워드의 모든 비트를 왼쪽 또는 오른쪽으로 이동시키며, 왼쪽 논리 시프트(sll)는 2^i를 곱하는 것과 같다. AND 연산은 마스크(mask)로 사용되어 특정 비트 필드를 추출하고, OR 연산은 특정 비트를 설정하는 데 사용된다. NOT 연산은 비트를 반전시키며, MIPS에서는 3-피연산자 형식을 유지하기 위해 NOR(NOT OR)을 사용한다(A NOR 0 = NOT A). 이러한 연산은 문자 처리, 비트 필드 조작, 하드웨어 제어 등에 필수적이다.

## 예시

```assembly
# 시프트 (Shift)
sll $t2, $s0, 4    # $t2 = $s0 << 4 (16을 곱하는 것과 동일)
srl $t2, $s0, 4    # $t2 = $s0 >> 4

# AND (비트 마스킹)
and $t0, $t1, $t2  # $t0 = $t1 & $t2
# $t1: 0000 0000 0000 0000 0011 1100 0000 0000
# $t2: 0000 0000 0000 0000 0000 1101 1100 0000
# $t0: 0000 0000 0000 0000 0000 1100 0000 0000

# OR (비트 설정)
or $t0, $t1, $t2   # $t0 = $t1 | $t2

# NOR (NOT 구현)
nor $t0, $t1, $zero # $t0 = ~$t1 (NOT $t1)
```

## 관련 개념

- [명령어 집합 (Instruction Set)](/knowledge/computer-architecture/instruction-set/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [명령어 형식 (Instruction Format)](/knowledge/computer-architecture/instruction-format/)
- [워드 (Word)](/knowledge/computer-architecture/word/)
