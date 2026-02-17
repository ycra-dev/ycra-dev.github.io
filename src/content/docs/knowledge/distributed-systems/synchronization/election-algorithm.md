---
title: "Election Algorithm"
description: "선거 알고리즘(Election Algorithm)은 분산 시스템에서 여러 프로세스 중 하나를 코디네이터(리더)로 선출하는 알고리즘이다"
tags: ['Election Algorithm', 'Bully Algorithm', 'Ring Election', 'Leader Election']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/election-algorithm
sidebar:
  order: 6
---

## 핵심 개념

**불리 알고리즘(Bully Algorithm, Garcia-Molina 1982)**:
1. 코디네이터 미응답 감지 시, Pk가 더 높은 ID를 가진 모든 프로세스에 ELECTION 전송
2. 아무도 응답하지 않으면 Pk가 승리하여 코디네이터로 선언
3. 더 높은 프로세스가 OK로 응답하면 해당 프로세스가 선거를 이어받음
4. 최종 승자가 COORDINATOR 메시지를 모든 프로세스에 브로드캐스트
- "가장 큰 놈이 항상 이긴다" → 불리(bully) 명칭의 유래

**링 알고리즘(Ring Algorithm)**:
1. 코디네이터 미응답 감지 시, 프로세스가 자신의 ID를 담은 ELECTION 메시지를 후속 노드에 전달
2. 각 중간 노드는 자신의 ID를 목록에 추가하고 전달
3. 메시지가 원래 프로세스로 돌아오면, 가장 높은 ID를 가진 프로세스를 코디네이터로 선언
4. COORDINATOR 메시지를 한 바퀴 더 순환

**대규모 시스템에서의 선거**: 블록체인에서는 Proof of Work(계산 경쟁)나 Proof of Stake(토큰 소유 비례 확률)를 사용. PoW는 SHA-256 해시의 선행 0 비트 수로 난이도 조절(64개 선행 0: 평균 180억 억 개의 nonce 시도 필요). PoS는 계산 자원 낭비를 줄이지만 보안 공격에 더 취약.

## 예시

```
불리 알고리즘 예시 (프로세스 0-7, P7이 이전 코디네이터, 현재 crash):

P4가 P7 미응답 감지 → P5, P6, P7에 ELECTION 전송
P5, P6이 OK 응답 → P4는 대기
P5가 P6, P7에 ELECTION 전송
P6이 P7에 ELECTION 전송
P6에 응답 없음 → P6이 승리
P6이 모든 프로세스에 COORDINATOR 브로드캐스트

# 링 알고리즘 예시:
# P3 시작: [3] → P4: [3,4] → P5: [3,4,5] → P6: [3,4,5,6] → ... → P3
# P3이 max([3,4,5,6,...]) = P6을 코디네이터로 선언
```

## 관련 개념

- [ZooKeeper](/knowledge/distributed-systems/zookeeper/)
- [Raft Consensus](/knowledge/distributed-systems/raft-consensus/)
- [Mutual Exclusion](/knowledge/distributed-systems/mutual-exclusion/)
- [Paxos](/knowledge/distributed-systems/paxos/)
