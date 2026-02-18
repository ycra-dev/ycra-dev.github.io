---
title: "Basic Block"
description: "기본 블록(Basic Block)은 분기(branch)가 없는(끝에만 있을 수 있는) 명령어 시퀀스로, 분기 대상이나 분기 레이블이 없는(시작에만 있을 수 있는) 연속적인 명령어의 단위이다"
tags: ['Control Flow', 'Compilation', 'Optimization', 'Branch', 'Instruction Sequence']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/basic-block
sidebar:
  order: 16
---

## 핵심 개념

기본 블록은 컴파일러 최적화의 기본 단위이다. 컴파일의 초기 단계 중 하나는 프로그램을 기본 블록으로 분할하는 것이다. 기본 블록의 특징은 블록의 첫 번째 명령어가 실행되면 블록 내의 모든 명령어가 순차적으로 실행된다는 것이다. 이 속성 덕분에 컴파일러는 블록 내에서 명령어 재배치, 공통 부분식 제거, 레지스터 할당 등의 최적화를 안전하게 수행할 수 있다. 기본 블록들 사이의 연결 관계를 나타내는 그래프를 제어 흐름 그래프(control flow graph)라 하며, 이는 더 광범위한 최적화의 기반이 된다.

## 예시

```assembly
# 아래 코드에서 기본 블록 식별:

# 기본 블록 1 (Loop 레이블에서 bne까지):
Loop: sll  $t1, $s3, 2
      add  $t1, $t1, $s6
      lw   $t0, 0($t1)
      bne  $t0, $s5, Exit    # 블록 끝 (조건 분기)

# 기본 블록 2 (addi부터 j까지):
      addi $s3, $s3, 1
      j    Loop               # 블록 끝 (무조건 점프)

# 기본 블록 3 (Exit 이후):
Exit: ...
```

## 관련 개념

- [Conditional Branch](/knowledge/computer-architecture/conditional-branch/)
- [Compiler](/knowledge/language/compiler/)
- [Instruction-Level Parallelism](/knowledge/computer-architecture/instruction-level-parallelism/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
