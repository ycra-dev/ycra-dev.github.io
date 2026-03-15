---
title: "래프트 합의 (Raft Consensus)"
description: "Raft는 충돌 장애 의미론(crash-failure semantics) 하에서 동작하는 합의 프로토콜로, Paxos의 복잡성에 대한 반응으로 Ongaro와 Ousterhout(2014)에 의해 개발되었다"
tags: ['Raft', 'Consensus', 'Leader Election', 'Log Replication', 'Fault Tolerance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/raft-consensus
sidebar:
  order: 6
---

## 핵심 개념

**기본 구조**: 보통 5개의 복제 서버로 구성. 각 서버는 커밋된 연산과 대기 중인 연산의 로그를 유지. 하나의 서버가 리더로서 연산 순서를 결정. 본질적으로 primary-backup 프로토콜이며, 리더가 primary, 나머지가 follower.

**용어(Term)**: 리더가 봉사하는 기간. 새 리더가 선출되면 term이 t에서 t+1로 증가. 각 연산은 `<o, t, k>` 튜플로 로그에 기록 (o: 연산, t: 현재 term, k: 로그 인덱스).

**정상 동작 흐름**:
1. 클라이언트가 리더에게 연산 요청 (팔로워가 수신하면 리더로 리다이렉트).
2. 리더가 로그에 `<o, t, n+1>` 추가 후 모든 팔로워에 전송.
3. 팔로워가 로그를 복사하고 ACK 반환. 인덱스 c까지의 연산 실행.
4. 리더가 **과반수** ACK 수신 시 연산 o 실행, 클라이언트에 결과 반환, c를 n+1로 갱신.
5. 다음 통신에서 팔로워에게 새 c 값 전달 → 팔로워도 o 커밋.

**리더 장애 처리**:
- 리더 충돌 시 새 리더 선출. 새 리더의 로그가 서버 그룹의 집합적 상태.
- **선거 제약**: 서버 S는 자신의 로그가 후보 S'보다 최신이면 투표하지 않음. 이는 새 리더가 반드시 모든 커밋된 연산을 포함하도록 보장.
- "더 최신"의 기준: 더 많은 커밋된 연산을 포함하거나, 더 최근 term의 연산을 포함.

**리더 충돌 후 커밋 전파**: 리더가 연산 o1을 실행(과반수 ACK 수신)했지만, 팔로워에게 커밋 사실을 알리기 전에 충돌한 경우:
- 새 리더가 o2를 처리하며 로그를 브로드캐스트하면, 팔로워가 o1도 함께 받음.
- 과반수 ACK 수신 후 새 리더가 o1과 o2 모두 커밋.

**Raft의 장점**: Paxos보다 이해와 구현이 용이. fail-noisy 장애 모델에서 동작 (최종적으로 올바른 장애 감지).

## 예시

```
# Raft 합의 프로토콜 동작 예시
# 5개 서버: S1(리더), S2, S3, S4, S5 / Term = 1

# 정상 동작:
C1 → S1: write(x, 42)
S1: log에 <write(x,42), term=1, idx=1> 추가
S1 → S2,S3,S4,S5: APP(write(x,42), term=1, idx=1)
S2 → S1: ACK    # 과반수 = 3개 (S1 포함)
S3 → S1: ACK    # 이 시점에서 과반수 달성
# S4, S5의 ACK는 아직 도착하지 않아도 커밋 가능
S1: write(x,42) 실행, c=1 설정
S1 → C1: 결과 반환

# 리더 장애 시나리오:
S1: o1 실행 후 (과반수 ACK 수신), 커밋 알림 전 충돌
# S2가 가장 최신 로그 보유 → 선거에서 승리, term=2
S2(새 리더): o2 요청 수신
S2 → S3,S4,S5: APP(o2, term=2, idx=2)  # o1도 함께 전파
S3 → S2: ACK
S4 → S2: ACK    # 과반수 달성
S2: o1 커밋, o2 커밋  # 둘 다 한꺼번에 커밋

# Heartbeat로 팔로워에 c 값 전파
S2 → S3,S4,S5: HB(term=2, c=2)
# S3, S4, S5도 o1, o2 커밋
```

## 관련 개념

- [팍소스 (Paxos)](/knowledge/distributed-systems/paxos/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [프로세스 그룹 (Process Group)](/knowledge/distributed-systems/process-group/)
- [선출 알고리즘 (Election Algorithm)](/knowledge/distributed-systems/election-algorithm/)
- [프라이머리-백업 프로토콜 (Primary Backup Protocol)](/knowledge/distributed-systems/primary-backup-protocol/)
- [전순서 멀티캐스트 (Totally Ordered Multicast)](/knowledge/distributed-systems/totally-ordered-multicast/)
