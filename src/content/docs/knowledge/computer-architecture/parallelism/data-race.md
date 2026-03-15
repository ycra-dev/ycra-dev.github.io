---
title: "데이터 경쟁 (Data Race)"
description: "데이터 레이스(Data Race)는 서로 다른 스레드에서 동일한 메모리 위치에 대해, 최소 하나가 쓰기인 두 개의 메모리 접근이 순서 없이 발생하여 프로그램 결과가 이벤트 발생 순서에 따라 달라질 수 있는 상황이다"
tags: ['Parallelism', 'Synchronization', 'Concurrency', 'Multithreading', 'Shared Memory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/data-race
sidebar:
  order: 21
---

## 핵심 개념

데이터 레이스는 병렬 프로그래밍에서 가장 흔하고 위험한 버그 중 하나이다. 협력하는 병렬 작업들이 새로운 값을 쓰고 읽어야 할 때, 적절한 동기화 없이는 프로그램의 정확성을 보장할 수 없다. 이를 방지하기 위해 하드웨어는 동기화 기본 연산(synchronization primitives)을 제공하며, 시스템 프로그래머가 이를 사용하여 동기화 라이브러리를 구축한다. 핵심 요구사항은 메모리 위치를 원자적(atomically)으로 읽고 수정할 수 있는 능력이다. MIPS는 load linked(ll)과 store conditional(sc) 명령어 쌍을 제공하여 원자적 연산을 구현한다.

## 예시

```
데이터 레이스 예시:
스레드 1: x = x + 1     스레드 2: x = x + 1
  (1) 읽기: x = 0        (1) 읽기: x = 0
  (2) 계산: 0 + 1 = 1    (2) 계산: 0 + 1 = 1
  (3) 쓰기: x = 1        (3) 쓰기: x = 1

결과: x = 1 (기대값 2와 다름!)

MIPS에서 원자적 교환 구현:
try:  add  $t0, $zero, $s4   # 교환할 값
      ll   $t1, 0($s1)       # load linked
      sc   $t0, 0($s1)       # store conditional
      beq  $t0, $zero, try   # 실패 시 재시도
      add  $s4, $zero, $t1   # 교환 완료
```

## 관련 개념

- [원자적 연산 (Atomic Operation)](/knowledge/computer-architecture/atomic-operation/)
- [멀티코어 프로세서 (Multicore Processor)](/knowledge/computer-architecture/multicore-processor/)
- [명령어 집합 (Instruction Set)](/knowledge/computer-architecture/instruction-set/)
