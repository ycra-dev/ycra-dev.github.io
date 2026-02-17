---
title: "ACID Properties"
description: "ACID 속성은 분산 시스템에서 트랜잭션이 갖추어야 할 네 가지 핵심 특성으로, 원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 지속성(Durability)을 의미한다"
tags: ['Transaction', 'Acid', 'Atomicity', 'Consistency', 'Isolation', 'Durability', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/acid-properties
sidebar:
  order: 8
---

## 핵심 개념

트랜잭션은 BEGIN_TRANSACTION과 END_TRANSACTION으로 범위가 정해지며, 그 사이의 모든 연산이 전부 실행되거나 전혀 실행되지 않는 all-or-nothing 특성을 갖는다.

- **원자성(Atomic)**: 외부 세계에서 볼 때 트랜잭션은 분할 불가능하게 발생한다.
- **일관성(Consistent)**: 트랜잭션은 시스템 불변식을 위반하지 않는다.
- **격리성(Isolated)**: 동시에 실행되는 트랜잭션들이 서로 간섭하지 않는다.
- **지속성(Durable)**: 트랜잭션이 커밋되면 변경 사항이 영구적이다.

**중첩 트랜잭션(Nested Transaction)**: 분산 시스템에서 트랜잭션은 여러 서브트랜잭션으로 구성될 수 있다. 예: 여행 예약 시 세 개의 항공편을 각각 별도 서브트랜잭션으로 처리. 서브트랜잭션이 커밋되어도 상위 트랜잭션이 중단되면 서브트랜잭션의 결과도 취소된다. 지속성은 최상위 트랜잭션에만 적용된다.

**TP 모니터(Transaction Processing Monitor)**: 분산(중첩) 트랜잭션을 처리하는 핵심 미들웨어 컴포넌트로, 분산 커밋이라는 표준 프로토콜에 따라 서브트랜잭션의 커밋을 조율한다.

## 예시

```python
# 트랜잭션 기본 연산
BEGIN_TRANSACTION()
    data = READ("account_A")       # 계좌 A 읽기
    WRITE("account_A", data - 100)  # 100 차감
    WRITE("account_B", READ("account_B") + 100)  # 계좌 B에 100 추가
END_TRANSACTION()  # 모두 성공하면 커밋, 하나라도 실패하면 롤백

# 중첩 트랜잭션 예: 여행 예약
BEGIN_TRANSACTION()  # 최상위 트랜잭션
    subtx1 = reserve_flight("SFO→LAX")  # 서브트랜잭션 1
    subtx2 = reserve_flight("LAX→ORD")  # 서브트랜잭션 2
    subtx3 = reserve_flight("ORD→JFK")  # 서브트랜잭션 3
    # subtx2가 실패하면 전체 트랜잭션 중단, subtx1의 결과도 취소
END_TRANSACTION()
```

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Middleware](/knowledge/distributed-systems/middleware/)
- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
- [Replication](/knowledge/distributed-systems/replication/)
