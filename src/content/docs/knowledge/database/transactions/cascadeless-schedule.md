---
title: "Cascadeless Schedule"
description: "비연쇄 스케줄(Cascadeless Schedule)은 모든 트랜잭션이 커밋된 트랜잭션이 쓴 데이터만 읽는 스케줄로, 하나의 트랜잭션 중단이 다른 트랜잭션의 연쇄적 롤백(cascading rollback)을 유발하지 않도록 보장한다"
tags: ['Cascadeless Schedule', 'Cascading Rollback', 'Recoverable Schedule', 'Transaction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/cascadeless-schedule
sidebar:
  order: 6
---

## 핵심 개념

**연쇄적 롤백(Cascading Rollback)의 문제:**
트랜잭션 T1이 데이터를 쓰고, 아직 커밋하지 않은 상태에서 트랜잭션 T2가 그 데이터를 읽는다고 하자. T1이 중단되면 T2도 잘못된 데이터를 기반으로 동작했으므로 함께 롤백되어야 한다. T2가 쓴 데이터를 T3가 읽었다면 T3도 롤백해야 한다. 이처럼 하나의 트랜잭션 실패가 여러 트랜잭션의 연쇄적 롤백을 유발하는 것이 연쇄적 롤백이다.

연쇄적 롤백은 상당한 양의 작업을 무효화할 수 있어 바람직하지 않다.

**복구 가능한 스케줄(Recoverable Schedule):**
비연쇄 스케줄보다 약한 조건으로, 트랜잭션 Ti가 Tj가 쓴 데이터를 읽었다면 Tj의 커밋이 Ti의 커밋보다 먼저 이루어져야 한다. 복구 가능하지 않은 스케줄은 데이터베이스를 복구 불가능한 상태로 만들 수 있다.

**관계:**
```
비연쇄 스케줄 ⊂ 복구 가능한 스케줄 ⊂ 모든 스케줄
```

비연쇄 스케줄은 복구 가능한 스케줄의 부분집합이다. 비연쇄 스케줄은 커밋된 데이터만 읽으므로 연쇄적 롤백이 발생하지 않으며, 자동으로 복구 가능하다.

**구현:**
2단계 잠금에서 비연쇄 스케줄은 **엄격한 2단계 잠금(Strict Two-Phase Locking)**을 통해 보장된다. 이 프로토콜은 모든 배타적 잠금을 트랜잭션 커밋 시까지 유지하여, 미커밋 데이터를 다른 트랜잭션이 읽지 못하게 한다.

더 강한 변형인 **엄밀한 2단계 잠금(Rigorous Two-Phase Locking)**은 모든 잠금(공유 및 배타적)을 커밋 시까지 유지한다. 이 경우 트랜잭션들은 커밋 순서대로 직렬화된다.

## 예시

연쇄적 롤백이 발생하는 스케줄:
```
T1: read(A)
T1: A := A - 50
T1: write(A)
              T2: read(A)    ← T1의 미커밋 데이터를 읽음
              T2: A := A * 1.1
              T2: write(A)
                            T3: read(A)  ← T2의 미커밋 데이터를 읽음
T1: abort!
→ T2도 롤백 (T1의 미커밋 데이터에 의존)
→ T3도 롤백 (T2의 미커밋 데이터에 의존)
= 연쇄적 롤백!
```

비연쇄 스케줄:
```
T1: read(A)
T1: A := A - 50
T1: write(A)
T1: commit     ← T1이 먼저 커밋
              T2: read(A)    ← 커밋된 데이터만 읽음
              T2: A := A * 1.1
              T2: write(A)
              T2: commit
                            T3: read(A)  ← 커밋된 데이터만 읽음

T2나 T3가 중단되어도 다른 트랜잭션에 영향 없음
```

## 관련 개념

- [Schedule](/knowledge/database/schedule/)
- [Transaction](/knowledge/database/transaction/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Serializability](/knowledge/database/serializability/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
