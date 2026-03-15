---
title: "프로시저 호출 (Procedure Call)"
description: "프로시저(Procedure)는 매개변수에 기반하여 특정 작업을 수행하는 저장된 서브루틴으로, 프로그램을 구조화하고 코드를 재사용하기 위한 소프트웨어 추상화 도구이다"
tags: ['Function', 'Subroutine', 'Jal', 'Stack', 'Calling Convention', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/procedure-call
sidebar:
  order: 17
---

## 핵심 개념

프로시저 호출은 6단계로 진행된다: (1) 매개변수를 전달 가능한 위치에 배치, (2) 프로시저로 제어 이전, (3) 필요한 저장 자원 확보, (4) 작업 수행, (5) 반환값을 호출자가 접근 가능한 위치에 배치, (6) 원래 위치로 제어 반환. MIPS에서는 jal(jump-and-link) 명령어가 프로시저 주소로 점프하면서 다음 명령어 주소를 $ra에 저장하고, jr $ra로 호출자에게 복귀한다. 인수는 $a0-$a3에, 반환값은 $v0-$v1에 전달된다. 호출 규약(calling convention)에 따라 $s0-$s7은 피호출자가 보존하고, $t0-$t9는 보존하지 않는다. 중첩(nested) 또는 재귀(recursive) 프로시저는 스택을 사용하여 레지스터와 지역 변수를 저장한다.

## 예시

```assembly
# C 함수: int leaf(int g, int h, int i, int j)
#            { int f; f = (g+h) - (i+j); return f; }

leaf_example:
    addi $sp, $sp, -4     # 스택에 공간 확보
    sw   $s0, 0($sp)       # $s0 저장 (보존 필요)

    add  $t0, $a0, $a1     # $t0 = g + h
    add  $t1, $a2, $a3     # $t1 = i + j
    sub  $s0, $t0, $t1     # f = (g+h) - (i+j)

    add  $v0, $s0, $zero   # 반환값 = f
    lw   $s0, 0($sp)       # $s0 복원
    addi $sp, $sp, 4       # 스택 해제
    jr   $ra               # 호출자에게 복귀
```

## 관련 개념

- [스택 (Stack)](/knowledge/computer-architecture/stack/)
- [프로그램 카운터 (Program Counter)](/knowledge/computer-architecture/program-counter/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [명령어 집합 (Instruction Set)](/knowledge/computer-architecture/instruction-set/)
- [추상화 (Abstraction)](/knowledge/computer-architecture/abstraction/)
