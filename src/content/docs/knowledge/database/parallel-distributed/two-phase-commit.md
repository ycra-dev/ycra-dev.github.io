---
title: "Two-Phase Commit"
description: "2단계 커밋 프로토콜(Two-Phase Commit, 2PC)은 분산 트랜잭션에서 모든 참여 노드가 원자적으로(모두 커밋하거나 모두 중단) 트랜잭션을 완료하도록 보장하는 분산 커밋 프로토콜이다"
tags: ['Distributed Transaction', 'Atomic Commit', 'Coordinator', 'Blocking Protocol', 'Recovery']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/two-phase-commit
sidebar:
  order: 20
---

## 핵심 개념

2PC는 하나의 코디네이터(coordinator)와 여러 참여자(participant)로 구성된다.

**Phase 1 (Prepare/투표)**:
1. 코디네이터가 모든 참여자에게 "prepare" 메시지를 보낸다.
2. 각 참여자는 트랜잭션을 커밋할 준비가 되면 "ready"를, 그렇지 않으면 "abort"를 응답한다.
3. 참여자가 ready 응답을 보내면, 해당 트랜잭션의 로그 레코드를 안정 저장소에 강제 기록(force-write)해야 한다. 이후 참여자는 독자적으로 커밋이나 중단을 결정할 수 없다.

**Phase 2 (Commit/결정)**:
1. 모든 참여자가 ready를 응답하면, 코디네이터가 "commit" 결정을 로그에 기록하고 모든 참여자에게 "commit" 메시지를 보낸다.
2. 하나라도 abort를 응답하거나 타임아웃되면, 코디네이터가 "abort" 결정을 내린다.
3. 참여자는 코디네이터의 결정에 따라 커밋 또는 중단을 수행한다.

**블로킹 문제(Blocking Problem)**: 2PC의 주요 단점이다. 참여자가 ready 상태에서 코디네이터의 결정을 기다리는 동안 코디네이터가 실패하면, 참여자는 결정을 내릴 수 없어 자원(잠금 등)을 무한정 보유하게 된다. 이를 해결하기 위해 3단계 커밋(3PC) 프로토콜이나 Paxos 기반 커밋이 사용될 수 있지만, 실제로는 코디네이터 복구를 기다리는 방식이 많이 사용된다.

**복구**: 코디네이터가 실패에서 복구되면, 로그를 확인하여 진행 중이던 트랜잭션의 결정 상태를 파악하고 참여자에게 다시 통보한다. 참여자가 실패에서 복구되면, ready 상태였던 트랜잭션에 대해 코디네이터에 결정을 문의한다.

## 예시

```
-- 2PC 정상 실행 흐름

Coordinator        Participant A       Participant B
    |                   |                   |
    |-- prepare ------->|                   |
    |-- prepare --------------------------->|
    |                   |                   |
    |<-- ready ---------|                   |
    |<-- ready -----------------------------|
    |                   |                   |
    | [모든 ready → commit 결정, 로그 기록]  |
    |                   |                   |
    |-- commit -------->|                   |
    |-- commit ---------------------------->|
    |                   |                   |
    |<-- ack -----------|                   |
    |<-- ack --------------------------------|
    |                   |                   |
    | [완료]            | [커밋 완료]        | [커밋 완료]

-- 블로킹 시나리오:
Coordinator        Participant A       Participant B
    |                   |                   |
    |-- prepare ------->|                   |
    |-- prepare --------------------------->|
    |<-- ready ---------|                   |
    |<-- ready -----------------------------|
    |                   |                   |
    | [코디네이터 장애!]  |                   |
    |   ✗               |                   |
    |                   | [ready 상태로      | [ready 상태로
    |                   |  대기 중...        |  대기 중...
    |                   |  커밋도 중단도     |  독자적 결정
    |                   |  불가]             |  불가]
```

## 관련 개념

- [Distributed Database System](/knowledge/database/distributed-database-system/)
- [Replication](/knowledge/database/replication/)
- [Paxos](/knowledge/database/paxos/)
- [Raft Consensus](/knowledge/database/raft-consensus/)
- [Distributed Deadlock Detection](/knowledge/database/distributed-deadlock-detection/)
