---
title: "Validation-Based Protocol"
description: "검증 기반 프로토콜(Validation-Based Protocol, Optimistic Concurrency Control)은 트랜잭션 실행 중에는 동시성 제어를 수행하지 않고, 커밋 전에 검증 단계에서 직렬 가능성 위반 여부를 검사하여 위반 시 트랜잭션을 중단하..."
tags: ['Validation Based', 'Optimistic Concurrency', 'Concurrency Control', 'Protocol']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/validation-based-protocol
sidebar:
  order: 13
---

## 핵심 개념

검증 기반 프로토콜은 대부분의 트랜잭션이 읽기 전용이거나 충돌이 드문 환경에서 효과적이다. 잠금의 오버헤드나 타임스탬프 기반의 롤백 없이 높은 동시성을 제공한다.

**세 가지 단계:**

1. **읽기 단계(Read Phase):** 트랜잭션이 데이터를 읽고 지역 변수에 저장한다. 모든 쓰기는 지역 복사본에만 수행되며, 데이터베이스에는 반영하지 않는다. 이 단계에서는 잠금이나 다른 동시성 제어가 필요 없다.

2. **검증 단계(Validation Phase):** 트랜잭션이 커밋을 요청할 때, 직렬 가능성을 위반하지 않는지 검증한다. 다른 트랜잭션과의 충돌을 검사한다.

3. **쓰기 단계(Write Phase):** 검증에 성공하면 지역 복사본의 변경사항을 데이터베이스에 반영한다. 검증에 실패하면 트랜잭션을 중단하고 재시작한다. 읽기 전용 트랜잭션은 이 단계가 필요 없다.

**타임스탬프 기반 검증:**
각 트랜잭션 Ti에 세 가지 타임스탬프를 부여한다:
- **Start(Ti):** 읽기 단계 시작 시간
- **Validation(Ti):** 검증 단계 시작 시간
- **Finish(Ti):** 쓰기 단계 완료 시간

검증 조건 (Tj가 Ti보다 먼저 검증된 모든 트랜잭션에 대해):
- Finish(Tj) < Start(Ti): Tj가 Ti 시작 전에 완료 → 충돌 없음
- 또는 Tj의 쓰기 집합과 Ti의 읽기 집합이 겹치지 않으며, Tj가 Ti의 검증 전에 쓰기를 완료

**낙관적(Optimistic) 접근의 장단점:**
- 장점: 잠금 오버헤드 없음, 교착 상태 발생하지 않음, 읽기 중심 워크로드에서 높은 성능
- 단점: 충돌이 빈번한 환경에서는 반복적인 롤백으로 성능 저하, 검증 실패 시 이미 수행한 작업이 낭비됨

## 예시

세 트랜잭션의 검증:

```
T1: Start=1, Validation=5, Finish=7
  ReadSet = {A, B}, WriteSet = {A}

T2: Start=3, Validation=8, Finish=10
  ReadSet = {B, C}, WriteSet = {B}

T3: Start=6, Validation=9, Finish=11
  ReadSet = {A, C}, WriteSet = {C}
```

T2의 검증 (T1에 대해):
```
조건 1: Finish(T1)=7 > Start(T2)=3 → 조건 1 불만족
조건 2: T1의 WriteSet = {A}, T2의 ReadSet = {B, C}
  교집합 = {} (비어 있음)
  그리고 Finish(T1)=7 < Validation(T2)=8 → 조건 2 만족
→ T2 검증 통과!
```

T3의 검증 (T1에 대해):
```
조건 1: Finish(T1)=7 > Start(T3)=6 → 조건 1 불만족
조건 2: T1의 WriteSet = {A}, T3의 ReadSet = {A, C}
  교집합 = {A} (비어 있지 않음!)
→ 조건 2 불만족 → T3 검증 실패 → T3 롤백 및 재시작
```

## 관련 개념

- [Timestamp-Based Protocol](/knowledge/database/timestamp-based-protocol/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Snapshot Isolation](/knowledge/database/snapshot-isolation/)
- [Conflict Serializability](/knowledge/database/conflict-serializability/)
