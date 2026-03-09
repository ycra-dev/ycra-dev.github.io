---
title: "Serializability"
description: "직렬 가능성(Serializability)은 트랜잭션들의 동시 실행(스케줄)이 어떤 직렬 실행(serial execution)과 동등한 결과를 보장하는 속성으로, 동시성 제어의 정확성 기준이 된다"
tags: ['Serializability', 'Concurrency', 'Schedule', 'Transaction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/serializability
sidebar:
  order: 4
---

## 핵심 개념

**직렬 스케줄(Serial Schedule):**
트랜잭션들이 하나씩 순차적으로 실행되는 스케줄이다. 각 트랜잭션이 일관성을 유지한다면, 직렬 스케줄은 항상 데이터베이스를 일관된 상태로 유지한다. 하지만 직렬 실행은 동시성이 없어 성능이 낮다.

**직렬 가능 스케줄(Serializable Schedule):**
동시 실행 스케줄이 어떤 직렬 스케줄과 동등한 결과를 생성하면, 해당 스케줄은 직렬 가능하다고 한다. 동등성의 기준에 따라 두 가지 유형이 있다:

1. **충돌 직렬 가능성(Conflict Serializability):** 충돌하는 연산들의 순서가 어떤 직렬 스케줄과 같은 경우. 두 연산이 같은 데이터 항목에 접근하고 적어도 하나가 쓰기 연산이면 충돌한다. 충돌하지 않는 연산들의 순서를 바꾸어(swap) 직렬 스케줄로 변환 가능하면 충돌 직렬 가능하다.

2. **뷰 직렬 가능성(View Serializability):** 더 넓은 개념으로, 각 read 연산이 동일한 write 연산의 결과를 읽고, 최종 write 연산이 동일한 경우이다. 충돌 직렬 가능한 스케줄은 항상 뷰 직렬 가능하지만, 역은 성립하지 않는다.

**직렬 가능성의 중요성:**
직렬 가능성을 보장하면 동시 실행에서도 데이터베이스의 일관성이 유지된다. 그러나 직렬 가능성 검사(특히 뷰 직렬 가능성)는 NP-hard 문제이므로, 실제 시스템에서는 직렬 가능성을 보장하는 프로토콜(예: 2단계 잠금)을 사용한다.

## 예시

두 트랜잭션 T1(A에서 B로 $50 이체)과 T2(A와 B에 각각 10% 이자 적용):

```
직렬 스케줄 1 (T1 → T2):
  T1: read(A), A:=A-50, write(A), read(B), B:=B+50, write(B)
  T2: read(A), A:=A*1.1, write(A), read(B), B:=B*1.1, write(B)

직렬 스케줄 2 (T2 → T1):
  T2: read(A), A:=A*1.1, write(A), read(B), B:=B*1.1, write(B)
  T1: read(A), A:=A-50, write(A), read(B), B:=B+50, write(B)
```

두 직렬 스케줄은 다른 최종 결과를 가지지만 둘 다 올바르다.

직렬 가능하지 않은 동시 스케줄의 예:
```
T1: read(A), A:=A-50, write(A)
                              T2: read(A), A:=A*1.1, write(A)
                              T2: read(B), B:=B*1.1, write(B)
T1: read(B), B:=B+50, write(B)
```
이 스케줄은 직렬 스케줄 1 (T1→T2)과 동등하지 않고, 직렬 스케줄 2 (T2→T1)과도 동등하지 않으므로 직렬 가능하지 않다.

## 관련 개념

- [Transaction](/knowledge/database/transaction/)
- [Schedule](/knowledge/database/schedule/)
- [Conflict Serializability](/knowledge/database/conflict-serializability/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Transaction Isolation Level](/knowledge/database/transaction-isolation-level/)
