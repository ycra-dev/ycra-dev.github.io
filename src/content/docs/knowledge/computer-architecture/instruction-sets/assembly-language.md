---
title: "어셈블리어 (Assembly Language)"
description: "어셈블리 언어(Assembly Language)는 기계어 명령어를 기호적(symbolic)으로 표현한 저수준 프로그래밍 언어이다"
tags: ['Programming Language', 'Machine Instructions', 'Low Level', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/assembly-language
sidebar:
  order: 6
---

## 핵심 개념

어셈블리 언어는 이진수로 구성된 기계어를 사람이 읽을 수 있는 기호(심볼)로 표현한다. 프로그래머는 "add A, B"와 같은 기호 표기법을 사용하며, 어셈블러가 이를 "1000110010100000"과 같은 이진수 기계어로 변환한다. 어셈블리 언어는 프로세서 명령어와 1:1로 대응되므로 하드웨어를 직접 제어할 수 있지만, 프로그래머가 컴퓨터처럼 사고해야 하는 단점이 있다. 고급 프로그래밍 언어의 등장으로 대부분의 프로그래밍은 더 이상 어셈블리 언어로 이루어지지 않지만, 성능 최적화나 하드웨어 제어가 필요한 경우에는 여전히 사용된다.

어셈블리 언어는 기계어와 고급 프로그래밍 언어 사이의 중간 계층 역할을 한다. 레지스터 이름($t0, $s0 등), 레이블, 니모닉(add, sub, lw 등)을 사용하여 바이너리 코드보다 훨씬 이해하기 쉽다. UNIX에서는 어셈블리 파일에 .s 확장자를 사용하고, MS-DOS에서는 .ASM을 사용한다. 현대 최적화 컴파일러는 어셈블리 전문가에 필적하는 코드를 생성할 수 있어, 직접 어셈블리로 작성하는 것보다 고급 언어를 사용하는 것이 일반적으로 권장된다.

## 예시

```assembly
# MIPS 어셈블리 언어 예시
add  $s0, $s1, $s2    # $s0 = $s1 + $s2 (덧셈)
sub  $s3, $s0, $s4    # $s3 = $s0 - $s4 (뺄셈)
lw   $t0, 32($s3)     # 메모리에서 워드 로드
sw   $t0, 48($s3)     # 메모리에 워드 저장
```

MIPS 어셈블리 언어 예시 (분기 포함):
```assembly
add  $t0, $s1, $s2   # $t0 = $s1 + $s2
lw   $t1, 0($s3)     # $t1 = Memory[$s3]
beq  $t0, $t1, Label  # if ($t0 == $t1) goto Label
```

## 관련 개념

- [기계어 (Machine Language)](/knowledge/computer-architecture/machine-language/)
- [컴파일러 (Compiler)](/knowledge/language/compiler/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [어셈블러 (Assembler)](/knowledge/language/assembler/)
- [의사 명령어 (Pseudoinstruction)](/knowledge/computer-architecture/pseudoinstruction/)
