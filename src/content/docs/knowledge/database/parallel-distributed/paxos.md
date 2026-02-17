---
title: "Paxos"
description: "Paxos는 분산 시스템에서 노드 장애가 발생하더라도 복수의 노드가 하나의 값에 대해 합의(consensus)를 이룰 수 있도록 보장하는 분산 합의 프로토콜이다"
tags: ['Consensus Protocol', 'Distributed Consensus', 'Proposer', 'Acceptor', 'Learner', 'Multi Paxos']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/paxos
sidebar:
  order: 22
---

## 핵심 개념

Paxos에는 세 가지 역할이 있다:
- **제안자(Proposer)**: 값을 제안하는 노드
- **수용자(Acceptor)**: 제안을 수용하거나 거부하는 노드
- **학습자(Learner)**: 합의된 값을 학습하는 노드

실제 시스템에서는 하나의 노드가 여러 역할을 동시에 수행한다.

**기본 Paxos 프로토콜(두 단계)**:

*Phase 1 (Prepare)*:
1. 제안자가 고유한 제안 번호 n을 선택하고, 모든 수용자에게 prepare(n) 메시지를 보낸다.
2. 수용자는 n이 이전에 응답한 prepare 요청의 번호보다 크면, n보다 작은 번호의 제안을 더 이상 수용하지 않겠다고 약속하고, 이전에 수용한 제안이 있으면 그 값과 번호를 응답한다.

*Phase 2 (Accept)*:
1. 제안자가 과반수(majority)의 수용자로부터 Phase 1 응답을 받으면, accept(n, v) 메시지를 보낸다. v는 응답 중 가장 높은 번호의 제안 값이거나, 없으면 제안자가 원하는 값이다.
2. 수용자는 n보다 높은 번호의 prepare 요청에 응답하지 않았다면 제안을 수용한다.
3. 과반수의 수용자가 수용하면 합의가 이루어진다.

**Multi-Paxos**: 기본 Paxos는 단일 값에 대한 합의만 다룬다. 연속적인 결정(예: 로그 항목 시퀀스)이 필요한 경우, Multi-Paxos를 사용한다. 안정적인 리더(leader)를 선출하여, 리더가 Phase 1을 한 번만 수행하고 이후에는 Phase 2만 반복하여 효율을 높인다.

**복제된 상태 머신(Replicated State Machine)**: Paxos의 주요 응용이다. 모든 복제본이 동일한 순서로 동일한 명령을 실행하면, 동일한 상태를 유지한다. Paxos로 명령 순서에 합의함으로써 복제된 상태 머신을 구현할 수 있다.

## 예시

```
-- Paxos 기본 흐름 (5개 수용자, 과반수 = 3)

Proposer           Acceptor 1  Acceptor 2  Acceptor 3  Acceptor 4  Acceptor 5
   |                  |           |           |           |           |
   |-- prepare(1) --->|           |           |           |           |
   |-- prepare(1) --------------->|           |           |           |
   |-- prepare(1) ----------------------------->|         |           |
   |-- prepare(1) ------------------------------------->|           |
   |-- prepare(1) ------------------------------------------------>|
   |                  |           |           |           |           |
   |<-- promise(1) ---|           |           |           |           |
   |<-- promise(1) --------------|           |           |           |
   |<-- promise(1) -----------------------------|         |           |
   |                  |           |           |           |           |
   | [과반수(3개) 응답 수신 → Phase 2 진행]    |           |           |
   |                  |           |           |           |           |
   |-- accept(1,"X")->|           |           |           |           |
   |-- accept(1,"X")------------>|           |           |           |
   |-- accept(1,"X")--------------------------->|         |           |
   |                  |           |           |           |           |
   |<-- accepted -----|           |           |           |           |
   |<-- accepted --------------- |           |           |           |
   |<-- accepted -----------------------------|           |           |
   |                  |           |           |           |           |
   | [과반수 수용 → 값 "X"로 합의 완료]        |           |           |

-- 장애 시 안전성:
Proposer A가 prepare(5)를 보내고, Proposer B가 prepare(10)을 보내면:
→ 수용자들이 10에 대해 promise하므로, 5번 제안은 거부됨
→ 항상 하나의 값만 합의됨 (안전성 보장)
```

## 관련 개념

- [Raft Consensus](/knowledge/database/raft-consensus/)
- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [Replication](/knowledge/database/replication/)
- [Coordinator Selection](/knowledge/database/coordinator-selection/)
- [CAP Theorem](/knowledge/database/cap-theorem/)
