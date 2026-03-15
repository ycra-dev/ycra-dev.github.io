---
title: "스택 (Stack)"
description: "스택(Stack)은 레지스터를 메모리로 스필(spill)하기 위한 LIFO(Last-In-First-Out, 후입선출) 데이터 구조로, 프로시저 호출에서 레지스터 보존과 지역 변수 저장에 사용된다"
tags: ['Data Structure', 'Procedure', 'Memory', 'Lifo', 'Stack Pointer', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/stack
sidebar:
  order: 19
---

## 핵심 개념

스택은 MIPS에서 높은 주소에서 낮은 주소로 성장한다. 스택 포인터($sp, 레지스터 29)는 스택의 최상단(가장 최근에 할당된 주소)을 가리킨다. push(데이터를 스택에 넣기)는 $sp에서 빼고, pop(데이터를 스택에서 꺼내기)는 $sp에 더한다. 프로시저 프레임(또는 활성화 레코드)은 프로시저의 저장된 레지스터와 지역 변수를 포함하는 스택 영역이다. 프레임 포인터($fp)는 프레임의 첫 번째 워드를 가리켜 안정적인 기준점을 제공한다. 스택은 힙(동적 할당)과 반대 방향으로 성장하여 메모리를 효율적으로 사용한다.

## 예시

```
MIPS 메모리 레이아웃:
높은 주소  ┌──────────────────┐ 0x7fff fffc
           │      스택        │ ← $sp (아래로 성장)
           │        ↓        │
           │                  │
           │        ↑        │
           │       힙        │ (위로 성장)
           ├──────────────────┤
           │   정적 데이터    │ ← $gp (0x1000 8000)
           ├──────────────────┤ 0x1000 0000
           │   텍스트 (코드)  │
           ├──────────────────┤ 0x0040 0000
           │      예약       │
낮은 주소  └──────────────────┘ 0x0000 0000

프로시저 호출 시 스택 동작:
1. addi $sp, $sp, -12  # 3 워드 공간 확보 (push)
2. sw   $ra, 8($sp)    # 리턴 주소 저장
3. sw   $s0, 4($sp)    # 레지스터 저장
4. sw   $s1, 0($sp)    # 레지스터 저장
```

## 관련 개념

- [프로시저 호출 (Procedure Call)](/knowledge/computer-architecture/procedure-call/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [프로그램 카운터 (Program Counter)](/knowledge/computer-architecture/program-counter/)
