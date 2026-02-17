---
title: "Primary Backup Protocol"
description: "주-백업 프로토콜(Primary-Backup Protocol)은 하나의 주 서버(primary)가 모든 쓰기 연산을 조정하고, 변경 사항을 백업 서버(backup/follower)들에 전파하는 복제 프로토콜이다"
tags: ['Primary Backup', 'Replication Protocol', 'Consistency', 'Fault Tolerance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/primary-backup-protocol
sidebar:
  order: 7
---

## 핵심 개념

**원격 쓰기 프로토콜**: 고정된 주 서버가 모든 쓰기를 처리. 클라이언트가 쓰기를 요청하면, (1) 주 서버가 로컬에서 업데이트 수행, (2) 모든 백업에 업데이트 전파, (3) 백업이 확인(ACK) 반환, (4) 주 서버가 클라이언트에 완료 응답. 단점: 높은 쓰기 지연.

**로컬 쓰기 프로토콜**: 주 서버의 역할이 쓰기가 발생하는 서버로 이동. 쓰기를 원하는 서버가 일시적으로 주 서버가 됨. 비연결 환경(예: 모바일)에서 유용: 로컬에서 업데이트 후 나중에 재연결 시 전파.

**주 서버 장애 처리**: 주 서버 crash 시 백업 중 하나가 선거 알고리즘으로 새 주 서버로 선출. Raft와 같은 합의 프로토콜이 이 과정을 체계화.

**활성 복제(Active Replication)와의 차이**: 활성 복제에서는 모든 복제본이 동일한 연산을 실행하여 단일 장애점 없이 동작. 주-백업은 단순하지만 주 서버가 단일 장애점.

## 예시

```
# 원격 쓰기 주-백업 프로토콜
Client → Primary: write(x, new_value)
Primary: 로컬 업데이트 수행
Primary → Backup1: update(x, new_value)
Primary → Backup2: update(x, new_value)
Backup1 → Primary: ACK
Backup2 → Primary: ACK
Primary → Client: write_complete

# 로컬 쓰기 주-백업 프로토콜
Client → Server_nearest: write(x, new_value)
Server_nearest: primary 역할 인수 → 로컬 업데이트
Server_nearest → Other_replicas: update(x, new_value)
Other_replicas → Server_nearest: ACK
Server_nearest → Client: write_complete

# 비연결 모바일 시나리오:
# 1. 모바일 기기가 로컬에서 업데이트 수행 (주 역할)
# 2. 나중에 네트워크 재연결
# 3. 변경 사항을 다른 복제본에 전파
```

## 관련 개념

- [Replica Management](/knowledge/distributed-systems/replica-management/)
- [Raft Consensus](/knowledge/distributed-systems/raft-consensus/)
- [Paxos](/knowledge/distributed-systems/paxos/)
- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
