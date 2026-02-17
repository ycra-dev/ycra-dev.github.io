---
title: "Two Phase Commit"
description: "2단계 커밋(Two-Phase Commit, 2PC)은 분산 트랜잭션에서 모든 참여자가 공동으로 커밋하거나 공동으로 중단하도록 보장하는 분산 커밋 프로토콜이다(Gray, 1978)"
tags: ['Two Phase Commit', '2pc', 'Distributed Commit', 'Transaction', 'Atomicity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/two-phase-commit
sidebar:
  order: 4
---

## 핵심 개념

**2PC의 두 단계**:

**투표 단계(Voting Phase)**:
1. 코디네이터가 모든 참여자에게 `vote-request` 전송.
2. 참여자는 로컬 커밋 가능 여부에 따라 `vote-commit` 또는 `vote-abort` 반환.

**결정 단계(Decision Phase)**:
3. 코디네이터가 모든 투표 수집. 전원 커밋 투표 시 `global-commit`, 하나라도 중단 투표 시 `global-abort` 전송.
4. 참여자가 최종 결정을 수신하여 로컬 커밋 또는 중단 실행.

**타임아웃 처리**:
- 참여자가 INIT 상태에서 `vote-request` 미수신 → 로컬 중단, `vote-abort` 전송.
- 코디네이터가 WAIT 상태에서 모든 투표 미수집 → `global-abort` 전송.
- 참여자가 READY 상태에서 최종 결정 미수신 → **가장 어려운 상황**: 다른 참여자에게 문의하거나 코디네이터 복구 대기.

**블로킹 문제**: 모든 참여자가 READY 상태에 있고 코디네이터가 충돌하면, 참여자들은 자체적으로 최종 결정을 내릴 수 없음. 코디네이터 복구까지 블로킹 → "블로킹 커밋 프로토콜"이라 불림.

**참여자 간 상호 지원**: READY 상태의 참여자 P가 다른 참여자 Q에게 문의 가능:
- Q가 COMMIT 상태 → P도 커밋
- Q가 ABORT 상태 → P도 중단
- Q가 INIT 상태 → P도 안전하게 중단 가능
- Q도 READY 상태 → 다른 참여자에게 문의 (전원 READY면 블로킹)

**3단계 커밋(3PC)**: 블로킹을 회피하기 위한 변형(Skeen, 1981). PRECOMMIT 상태를 추가하여 COMMIT으로 직접 전이할 수 있는 단일 상태가 없도록 함. 실제로는 2PC의 블로킹 조건이 드물어 잘 사용되지 않음.

**RPC 의미론과 서버 충돌**: 서버 충돌 시 정확히 한 번(exactly-once) 의미론은 불가능. at-least-once(재시도), at-most-once(즉시 실패 보고), 보장 없음 중 선택. 멱등(idempotent) 연산이면 재시도 안전, 그렇지 않으면(예: 계좌 이체) 시퀀스 번호로 중복 감지 필요.

## 예시

```python
# 2PC 코디네이터 (간략화)
class Coordinator:
    def run(self):
        # Phase 1: 투표 요청
        self.log.info('WAIT')
        self.send_to(self.participants, VOTE_REQUEST)

        # 투표 수집
        votes = []
        for p in self.participants:
            vote = self.receive(p, timeout=TIMEOUT)
            if vote is None or vote == VOTE_ABORT:
                self.log.info('ABORT')
                self.send_to(self.participants, GLOBAL_ABORT)
                return
            votes.append(vote)

        # Phase 2: 전원 커밋 투표
        self.log.info('COMMIT')
        self.send_to(self.participants, GLOBAL_COMMIT)

# 2PC 참여자 (간략화)
class Participant:
    def run(self):
        self.log.info('INIT')
        msg = self.receive(self.coordinator, timeout=TIMEOUT)
        if msg is None:  # 코디네이터 충돌
            return LOCAL_ABORT

        # 로컬 작업 수행
        result = self.do_work()
        if result == FAILED:
            self.send(self.coordinator, VOTE_ABORT)
            return LOCAL_ABORT

        # READY 상태 진입
        self.log.info('READY')
        self.send(self.coordinator, VOTE_COMMIT)

        # 최종 결정 대기
        decision = self.receive(self.coordinator, timeout=TIMEOUT)
        if decision is None:  # 코디네이터 충돌 → 다른 참여자에게 문의
            decision = self.ask_other_participants()

        return decision  # GLOBAL_COMMIT 또는 GLOBAL_ABORT
```

## 관련 개념

- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
- [Failure Model](/knowledge/distributed-systems/failure-model/)
- [Atomic Multicast](/knowledge/distributed-systems/atomic-multicast/)
- [Raft Consensus](/knowledge/distributed-systems/raft-consensus/)
- [Paxos](/knowledge/distributed-systems/paxos/)
