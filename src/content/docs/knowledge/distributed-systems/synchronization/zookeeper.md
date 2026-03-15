---
title: "주키퍼 (ZooKeeper)"
description: "ZooKeeper는 분산 시스템에서 잠금(locking), 리더 선출(leader election), 모니터링 등 다양한 조정(coordination) 작업을 지원하기 위해 설계된 중앙 집중식 조정 서비스이다"
tags: ['Zookeeper', 'Coordination Service', 'Distributed Locking', 'Leader Election']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/zookeeper
sidebar:
  order: 8
---

## 핵심 개념

**설계 원칙**: ZooKeeper는 블로킹 프리미티브를 제공하지 않는다. 클라이언트는 메시지를 보내고 항상 즉시 응답을 받으며, 잠금 획득 실패 시 재시도해야 한다.

**네임스페이스**: 트리 형태로 조직된 네임스페이스를 유지. 노드 생성/삭제, 데이터 읽기/쓰기(전체 덮어쓰기만 가능), 존재 여부 확인 등의 연산을 지원.

**노드 유형**:
- **영구(Persistent) 노드**: 명시적으로 생성/삭제
- **임시(Ephemeral) 노드**: 클라이언트 연결이 닫히거나 만료되면 자동 삭제 (잠금에 유용)

**알림(Notification) 메커니즘**: 폴링 대신 노드 변경 구독 지원. 클라이언트가 노드 상태를 읽은 후 변경을 구독하면, 변경 발생 시 알림을 받음.

**버전 기반 동시성 제어**: W(n, k)a 표기로 노드 n의 버전 k 가정 하에 값 a를 쓰기. 버전이 불일치하면 쓰기 실패하여 경쟁 조건을 방지.

**잠금 프로토콜**: /lock 노드 생성으로 잠금 획득, 삭제로 해제. 이미 존재하면 삭제 알림을 구독하고 대기. 임시 노드를 사용하면 클라이언트 crash 시 자동 해제.

**앙상블(Ensemble)**: 실제로는 여러 서버의 집합으로 구성. 하나의 리더와 여러 팔로워. 리더 장애 시 팔로워 중 하나가 새 리더로 선출(과반수 필요).

## 예시

```python
# ZooKeeper 리더 선출 (간소화)
class ZKProcess:
    def __init__(self, proc_id, tx_id):
        self.leader = proc_id      # 예상 리더
        self.lastTX = tx_id        # 최신 트랜잭션

    def receive_election(self, vote_id, vote_tx):
        if self.lastTX < vote_tx:
            self.leader = vote_id   # 더 최신 정보 반영
            self.lastTX = vote_tx
        elif self.lastTX == vote_tx and self.leader < vote_id:
            self.leader = vote_id   # 같은 TX면 높은 ID 우선

# 잠금 프로토콜:
# 1. create("/lock") → 성공하면 잠금 획득
# 2. 이미 존재하면 → 삭제 알림 구독 후 대기
# 3. 알림 받으면 → create("/lock") 재시도
# 4. 작업 완료 → delete("/lock")으로 해제
```

## 관련 개념

- [선출 알고리즘 (Election Algorithm)](/knowledge/distributed-systems/election-algorithm/)
- [상호 배제 (Mutual Exclusion)](/knowledge/distributed-systems/mutual-exclusion/)
- [래프트 합의 (Raft Consensus)](/knowledge/distributed-systems/raft-consensus/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
