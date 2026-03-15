---
title: "원자적 연산 (Atomic Operation)"
description: "원자적 연산(Atomic Operation)은 다른 연산이 중간에 개입할 수 없는, 분할 불가능한(indivisible) 메모리 읽기-수정-쓰기 연산으로, 멀티프로세서 동기화의 하드웨어 기반 기본 연산이다"
tags: ['Synchronization', 'Parallelism', 'Load Linked', 'Store Conditional', 'Mutual Exclusion']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/atomic-operation
sidebar:
  order: 19
---

## 핵심 개념

원자적 연산은 멀티프로세서 시스템에서 동기화를 구현하기 위한 핵심 하드웨어 기본 연산이다. MIPS에서는 load linked(ll)과 store conditional(sc) 명령어 쌍으로 구현된다. ll은 메모리 값을 읽고, sc는 ll 이후 해당 메모리 위치가 변경되지 않았을 때만 쓰기를 성공시킨다. sc가 실패하면(다른 프로세서가 개입했거나 컨텍스트 스위치가 발생한 경우) 반환값이 0이 되어 재시도를 유발한다. 이 메커니즘으로 원자적 교환(atomic exchange), 비교 후 교환(compare and swap), 원자적 증가(fetch-and-increment) 등의 상위 동기화 기본 연산을 구축할 수 있다. ll과 sc 사이에는 레지스터-레지스터 명령어만 안전하게 사용할 수 있으며, 명령어 수를 최소화해야 한다.

## 예시

```assembly
# MIPS에서 lock 획득 구현 (원자적 교환)
# $s1 = lock 주소, $s4 = 교환할 값 (초기값 1)

try:
    add  $t0, $zero, $s4   # $t0 = 교환할 값 (1 = locked)
    ll   $t1, 0($s1)       # load linked: lock 값 읽기
    sc   $t0, 0($s1)       # store conditional: lock에 1 쓰기
    beq  $t0, $zero, try   # sc 실패 시 (다른 프로세서 개입) 재시도
    add  $s4, $zero, $t1   # $s4 = 이전 lock 값

# $s4 == 0이면 lock 획득 성공 (이전에 free였음)
# $s4 == 1이면 lock 획득 실패 (이전에 locked였음) → 다시 시도

# lock 해제
    sw   $zero, 0($s1)     # lock = 0 (free)
```

## 관련 개념

- [데이터 경쟁 (Data Race)](/knowledge/computer-architecture/data-race/)
- [멀티코어 프로세서 (Multicore Processor)](/knowledge/computer-architecture/multicore-processor/)
- [명령어 집합 (Instruction Set)](/knowledge/computer-architecture/instruction-set/)
- [운영체제 (Operating System)](/knowledge/computer-architecture/operating-system/)
