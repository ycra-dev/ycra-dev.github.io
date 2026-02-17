---
title: "Schedule"
description: "스케줄(Schedule)은 동시에 실행되는 트랜잭션들의 연산(instruction)들이 시간 순서대로 나열된 시퀀스로, 각 트랜잭션 내부의 연산 순서를 유지하면서 여러 트랜잭션의 연산이 인터리빙(interleaving)된 형태이다"
tags: ['Schedule', 'Concurrent Execution', 'Serial Schedule', 'Transaction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/schedule
sidebar:
  order: 3
---

## 핵심 개념

**스케줄의 유형:**

1. **직렬 스케줄(Serial Schedule):** 트랜잭션들이 하나씩 순차적으로 실행되는 스케줄이다. 인터리빙이 없으므로 동시성 문제가 발생하지 않지만, 성능이 낮다. n개의 트랜잭션에 대해 n!개의 직렬 스케줄이 가능하다.

2. **동시 스케줄(Concurrent Schedule):** 여러 트랜잭션의 연산이 인터리빙되어 실행되는 스케줄이다. 동시성을 통해 처리량(throughput)을 높이고 응답 시간을 줄일 수 있다.

**스케줄의 올바름:**
스케줄의 올바름은 직렬 가능성(serializability)으로 판단한다. 동시 스케줄의 결과가 어떤 직렬 스케줄의 결과와 동일하면, 해당 동시 스케줄은 올바르다고 본다.

**스케줄에서 고려하는 연산:**
스케줄에서는 주로 데이터베이스에 대한 read와 write 연산에 초점을 맞춘다. 지역 변수에 대한 연산이나 계산은 스케줄에 영향을 미치지 않으므로 무시한다.

**스케줄의 특성:**
- **완전 스케줄(Complete Schedule):** 모든 트랜잭션의 모든 연산을 포함하며, 각 트랜잭션이 커밋 또는 중단 명령으로 끝남
- **부분 스케줄(Partial Schedule):** 일부 트랜잭션이 아직 완료되지 않은 진행 중인 스케줄

**동시 실행의 이점:**
- **처리량 향상:** 한 트랜잭션이 I/O 대기 중일 때 다른 트랜잭션이 CPU를 사용
- **응답 시간 단축:** 짧은 트랜잭션이 긴 트랜잭션 뒤에서 대기하지 않아도 됨
- **자원 활용도 향상:** CPU, 디스크 등 자원의 유휴 시간 최소화

## 예시

T1(A→B로 $50 이체)과 T2(A, B에 10% 이자 적용)의 스케줄:

```
직렬 스케줄 (T1 먼저):
  T1: read(A)
  T1: A := A - 50
  T1: write(A)
  T1: read(B)
  T1: B := B + 50
  T1: write(B)
  T2: read(A)
  T2: A := A * 1.1
  T2: write(A)
  T2: read(B)
  T2: B := B * 1.1
  T2: write(B)
```

직렬 가능한 동시 스케줄 (T1→T2와 동등):
```
  T1: read(A)
  T1: A := A - 50
  T1: write(A)
  T2: read(A)
  T2: A := A * 1.1
  T2: write(A)
  T1: read(B)
  T1: B := B + 50
  T1: write(B)
  T2: read(B)
  T2: B := B * 1.1
  T2: write(B)
```

이 스케줄에서 T1의 write(A)는 T2의 read(A) 전에 실행되고,
T1의 write(B)는 T2의 read(B) 전에 실행되므로 T1→T2 직렬 스케줄과 동등하다.

## 관련 개념

- [Transaction](/knowledge/database/transaction/)
- [Serializability](/knowledge/database/serializability/)
- [Conflict Serializability](/knowledge/database/conflict-serializability/)
- [Cascadeless Schedule](/knowledge/database/cascadeless-schedule/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
