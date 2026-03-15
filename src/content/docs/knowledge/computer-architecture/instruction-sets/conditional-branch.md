---
title: "조건 분기 (Conditional Branch)"
description: "조건 분기(Conditional Branch)는 두 값의 비교 결과에 따라 프로그램의 제어 흐름을 새로운 주소로 전환하는 명령어이다"
tags: ['Control Flow', 'Decision', 'Loop', 'Beq', 'Bne', 'Instruction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/conditional-branch
sidebar:
  order: 15
---

## 핵심 개념

조건 분기는 컴퓨터를 단순 계산기와 구별짓는 핵심 기능인 "의사 결정" 능력을 제공한다. MIPS의 두 가지 기본 조건 분기 명령어는 beq(branch if equal)와 bne(branch if not equal)이다. 이들은 if문과 반복문(loop) 구현의 기본 구성요소이다. 보다 복잡한 비교(less than 등)를 위해 slt(set on less than) 명령어와 조합하여 사용한다. 컴파일러는 고급 언어의 if-then-else, while, for 문장을 이러한 조건 분기와 무조건 점프(j) 명령어로 변환한다. 조건 분기로 끝나는 명령어 시퀀스를 기본 블록(basic block)이라 하며, 이는 컴파일 과정의 초기 단계에서 프로그램을 분할하는 단위이다.

## 예시

```assembly
# if (i == j) f = g + h; else f = g - h;
# i=$s3, j=$s4, f=$s0, g=$s1, h=$s2

    bne $s3, $s4, Else   # i != j이면 Else로 분기
    add $s0, $s1, $s2    # f = g + h (i == j일 때)
    j   Exit             # Exit으로 점프
Else:
    sub $s0, $s1, $s2    # f = g - h (i != j일 때)
Exit:

# while 루프: while (save[i] == k) i += 1;
Loop:
    sll  $t1, $s3, 2     # $t1 = i * 4
    add  $t1, $t1, $s6   # $t1 = save 주소 + i*4
    lw   $t0, 0($t1)     # $t0 = save[i]
    bne  $t0, $s5, Exit  # save[i] != k이면 종료
    addi $s3, $s3, 1     # i = i + 1
    j    Loop            # 루프 반복
Exit:
```

## 관련 개념

- [기본 블록 (Basic Block)](/knowledge/computer-architecture/basic-block/)
- [명령어 집합 (Instruction Set)](/knowledge/computer-architecture/instruction-set/)
- [PC 상대 주소 지정 (PC-Relative Addressing)](/knowledge/computer-architecture/pc-relative-addressing/)
- [프로그램 카운터 (Program Counter)](/knowledge/computer-architecture/program-counter/)
