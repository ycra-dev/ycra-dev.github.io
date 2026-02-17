---
title: "Raft Consensus"
description: "Raft는 Paxos와 동등한 합의 기능을 제공하면서도 이해하기 쉽게 설계된 분산 합의 프로토콜이다"
tags: ['Consensus Protocol', 'Leader Election', 'Log Replication', 'Term', 'Replicated State Machine']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/raft-consensus
sidebar:
  order: 23
---

## 핵심 개념

Raft에서 각 노드는 세 가지 상태 중 하나에 있다: **리더(Leader)**, **팔로워(Follower)**, **후보자(Candidate)**.

**임기(Term)**: 시간을 연속적인 임기로 나눈다. 각 임기는 고유한 번호를 가지며, 최대 하나의 리더가 존재한다. 임기는 리더 선거로 시작된다.

**리더 선거(Leader Election)**:
1. 팔로워가 리더로부터 일정 시간 동안 메시지를 받지 못하면 후보자로 전환된다.
2. 후보자는 자신의 임기 번호를 증가시키고, 자신에게 투표한 후 다른 노드에 투표 요청을 보낸다.
3. 과반수의 투표를 받으면 리더가 된다.
4. 각 노드는 임기당 하나의 후보자에게만 투표하여, 임기당 최대 하나의 리더만 선출됨을 보장한다.

**로그 복제(Log Replication)**:
1. 클라이언트가 리더에게 명령을 보낸다.
2. 리더가 명령을 자신의 로그에 추가하고, 모든 팔로워에게 AppendEntries RPC를 통해 로그 항목을 전송한다.
3. 과반수의 팔로워가 로그 항목을 기록하면, 리더가 해당 항목을 커밋한다.
4. 커밋된 항목은 상태 머신에 적용된다.

**안전성 보장**: Raft는 리더의 로그가 항상 가장 최신이도록 보장한다. 투표 시 후보자의 로그가 투표자의 로그보다 최신이어야만 투표를 받을 수 있다. 이를 통해 커밋된 로그 항목이 절대 손실되지 않음을 보장한다.

Paxos와 비교하여 Raft의 핵심 차이는 강력한 리더의 존재이다. 리더만이 로그 항목을 추가할 수 있으며, 데이터 흐름은 항상 리더에서 팔로워로 향한다. 이 단방향 데이터 흐름은 프로토콜을 이해하고 구현하기 쉽게 만든다.

## 예시

```
-- Raft 리더 선거 과정

Term 1:
  Node A: Leader    (팔로워들에게 heartbeat 전송)
  Node B: Follower
  Node C: Follower
  Node D: Follower
  Node E: Follower

Term 2 (Node A 장애):
  Node A: ✗ (장애)
  Node B: Candidate → RequestVote(term=2) 전송
  Node C: 투표(B에게)
  Node D: 투표(B에게)
  Node E: 투표(B에게)
  → Node B가 과반수(4/5) 획득 → 새 리더

-- 로그 복제:
Client → Leader(B): "set x = 5"
  B: log = [..., {term:2, cmd:"set x=5"}]
  B → C: AppendEntries({term:2, cmd:"set x=5"})
  B → D: AppendEntries({term:2, cmd:"set x=5"})
  B → E: AppendEntries({term:2, cmd:"set x=5"})

  C → B: success
  D → B: success
  (E는 느린 응답)

  B: 과반수(B,C,D = 3/4) 확인 → 커밋!
  B → Client: "success"
  B: 다음 heartbeat에 commitIndex 업데이트 전파

-- 안전성: 로그 비교
Node B: [1:a, 1:b, 2:c, 2:d]  (최신)
Node C: [1:a, 1:b, 2:c]       (뒤처짐)
→ Node C가 리더 선거에 출마하면, B는 투표하지 않음
→ 더 최신 로그를 가진 노드만 리더 가능
```

## 관련 개념

- [Paxos](/knowledge/database/paxos/)
- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [Coordinator Selection](/knowledge/database/coordinator-selection/)
- [Replication](/knowledge/database/replication/)
- [CAP Theorem](/knowledge/database/cap-theorem/)
