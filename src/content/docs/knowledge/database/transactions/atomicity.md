---
title: "Atomicity"
description: "원자성(Atomicity)은 트랜잭션의 모든 연산이 하나의 불가분 단위로 실행되어야 하는 속성으로, 트랜잭션의 모든 연산이 완전히 실행되거나(commit) 전혀 실행되지 않아야(abort) 함을 의미한다"
tags: ['Atomicity', 'Transaction', 'Rollback', 'Recovery']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/atomicity
sidebar:
  order: 2
---

## 핵심 개념

원자성은 "all-or-nothing" 원칙으로 요약된다. 트랜잭션이 정상적으로 모든 연산을 완료하면 커밋하여 변경사항을 영구적으로 반영한다. 반면 트랜잭션 실행 중 장애가 발생하면, 이미 수행된 모든 변경사항을 취소(롤백)하여 트랜잭션이 시작되기 이전 상태로 데이터베이스를 복원해야 한다.

**원자성 보장 메커니즘:**

데이터베이스 시스템은 원자성을 보장하기 위해 여러 기법을 사용한다:

1. **로그 기반 복구(Log-Based Recovery):** 가장 널리 사용되는 방법이다. 트랜잭션이 데이터를 변경할 때마다 변경 전 값(undo 정보)을 로그에 기록한다. 트랜잭션이 중단되면 로그를 사용하여 모든 변경사항을 되돌린다.

2. **그림자 페이징(Shadow Paging):** 데이터의 변경을 원본이 아닌 복사본에 수행하고, 트랜잭션이 커밋될 때만 원본을 새 버전으로 교체한다. 트랜잭션이 중단되면 복사본을 버리면 된다.

**중단된 트랜잭션의 처리:**
트랜잭션이 중단(abort)되면, 이미 수행된 변경사항이 롤백된다. 이후 시스템은 해당 트랜잭션을 재시작하거나 종료할 수 있다:
- **재시작:** 하드웨어 오류나 소프트웨어 오류 등 트랜잭션 자체의 논리와 무관한 이유로 중단된 경우
- **종료:** 트랜잭션 내부의 논리적 오류나 입력 데이터 오류로 인한 경우

원자성은 동시성 제어와도 밀접한 관련이 있다. 한 트랜잭션이 쓴 데이터를 다른 트랜잭션이 읽은 후 첫 번째 트랜잭션이 중단되면, 두 번째 트랜잭션도 잘못된 데이터에 기반하여 동작하게 된다. 이를 **연쇄적 롤백(cascading rollback)**이라 하며, cascadeless 스케줄을 사용하여 방지할 수 있다.

## 예시

```
Transaction T: A에서 B로 $50 이체

Step 1: read(A)         -- A = 1000
Step 2: A := A - 50     -- A = 950 (메모리에서)
Step 3: write(A)        -- A = 950 (디스크에 기록)
  *** 시스템 장애 발생 ***
Step 4: read(B)          -- 실행되지 않음
Step 5: B := B + 50      -- 실행되지 않음
Step 6: write(B)         -- 실행되지 않음
```

원자성이 보장되지 않으면:
```
A = 950, B = 1000 → 총합 = 1950 ($50 소실)
```

원자성이 보장되면 (로그 기반 복구):
```
로그에 기록됨: <T, A, 1000, 950>  (이전 값: 1000, 새 값: 950)
복구 시: A를 1000으로 복원
결과: A = 1000, B = 1000 → 총합 = 2000 (일관성 유지)
```

## 관련 개념

- [ACID Properties](/knowledge/database/acid-properties/)
- [Transaction](/knowledge/database/transaction/)
- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [Cascadeless Schedule](/knowledge/database/cascadeless-schedule/)
