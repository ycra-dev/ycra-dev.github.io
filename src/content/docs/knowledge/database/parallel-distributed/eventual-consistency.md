---
title: "Eventual Consistency"
description: "최종 일관성(Eventual Consistency)은 분산 시스템에서 일정 기간 동안 업데이트가 없으면, 궁극적으로 모든 복제본이 동일한 상태로 수렴하는 약한 일관성 모델이다"
tags: ['Weak Consistency', 'Asynchronous Replication', 'Lazy Propagation', 'Publish Subscribe', 'Base']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/eventual-consistency
sidebar:
  order: 25
---

## 핵심 개념

**비동기 복제(Asynchronous Replication)**: 최종 일관성의 핵심 구현 방식이다. 프라이머리(마스터) 노드에서 업데이트가 커밋된 후, 다른 복제본으로의 업데이트 전파는 비동기적으로 수행된다. 이를 지연 전파(lazy propagation)라 한다. 트랜잭션은 프라이머리에서 커밋되면 바로 완료되므로, 커밋 지연시간이 줄어든다.

**영구 메시징(Persistent Messaging)**: 업데이트가 프라이머리에서 커밋되면 반드시 모든 복제본에 전달되어야 한다. 영구 메시징 시스템은 메시지가 한번 전송되면 장애가 발생해도 반드시 전달됨을 보장한다. 또한 메시지의 순서 보존도 중요하다.

**발행-구독 시스템(Publish-Subscribe)**: 비동기 복제의 유연한 구현 방식이다. 각 파티션에 대한 토픽을 생성하고, 모든 복제본이 해당 토픽을 구독한다. 업데이트는 해당 토픽에 발행되며, 발행-구독 시스템이 모든 구독자에게 순서대로 전달을 보장한다. Apache Kafka가 대표적이다.

**비동기 복제의 한계**:
- 복제본에서의 읽기가 최신 값을 반환하지 않을 수 있다. 버전과 타임스탬프를 사용하여 데이터의 신선도(freshness)를 지정할 수 있다.
- 프라이머리 장애 시, 커밋되었지만 아직 복제본에 전파되지 않은 업데이트가 손실될 위험이 있다. 이를 방지하기 위해 일부 시스템은 로그 레코드를 백업 노드에 동기적으로 복제(two-safe protocol)한다.
- 트랜잭션적으로 일관된 뷰를 보장하지 못한다. 한 트랜잭션의 업데이트 중 일부만 반영된 상태를 읽을 수 있다.

**다중 마스터 복제(Multi-Master Replication)**: 모든 복제본에서 업데이트를 허용한다. 충돌하는 업데이트가 발생할 수 있으며, version vector 등으로 감지하고 해결해야 한다.

## 예시

```
-- 비동기 복제 흐름

Primary(서울)    Replica(도쿄)    Replica(뉴욕)
    |                |               |
    |← write(x=10)  |               |
    |  [커밋 완료]    |               |
    |  [응답 반환]    |               |
    |                |               |
    |-- async msg -->|               |  (수 밀리초 후)
    |-- async msg ------------------>|  (수백 밀리초 후)
    |                |               |
    | 이 시점에서:    |               |
    | Primary: x=10  | Replica: x=10 | Replica: x=? (아직 이전 값)
    |                |               |
    |                |    (전파 완료 후)
    | Primary: x=10  | Replica: x=10 | Replica: x=10 ← 최종 일관성

-- 항공사 예매 시스템 예시:
  요구사항: 가격 조회 시 약간의 지연(수 분) 허용 가능

  Primary: 가격 업데이트 (price = $350)
  ↓ 비동기 전파
  Replica 1 ~ 100: 사용자 질의 처리

  사용자가 $340(이전 가격)을 보더라도 허용 가능
  실제 예약 시점에서 Primary에서 최신 가격 확인

-- 발행-구독 기반 복제:
  Topic: "partition-42-updates"
  구독자: Replica A, Replica B, Replica C

  Primary → Kafka: publish("partition-42-updates", {op: UPDATE, key: k1, val: v1})
  Kafka → Replica A: deliver
  Kafka → Replica B: deliver
  Kafka → Replica C: deliver
  → 순서 보장, 최소 1회 전달 보장
```

## 관련 개념

- [CAP Theorem](/knowledge/database/cap-theorem/)
- [Replication](/knowledge/database/replication/)
- [Version Vector](/knowledge/database/version-vector/)
- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
