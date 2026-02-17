---
title: "Process Group"
description: "프로세스 그룹(Process Group)은 분산 시스템에서 내결함성을 달성하기 위해 동일한 프로세스를 여러 개 조직하여 하나의 논리적 프로세스처럼 동작하게 하는 메커니즘이다"
tags: ['Process Group', 'Replication', 'Fault Tolerance', 'K Fault Tolerance', 'Membership']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/process-group
sidebar:
  order: 2
---

## 핵심 개념

**그룹 조직 형태**:
- **수평(Flat) 그룹**: 모든 프로세스가 동등. 단일 장애점 없음. 의사결정에 투표 필요 → 지연 발생. P2P 시스템에 적합.
- **계층(Hierarchical) 그룹**: 코디네이터(리더) + 워커 구조. 의사결정 빠르지만 코디네이터가 단일 장애점. 코디네이터 장애 시 선거 알고리즘으로 새 코디네이터 선출. Primary-backup 방식이 대표적.

**그룹 멤버십 관리**:
- 중앙화 방식: 그룹 서버가 모든 그룹과 멤버십 데이터베이스 관리. 단순하지만 단일 장애점.
- 분산 방식: 신뢰성 있는 멀티캐스트로 참여/탈퇴 공지.
- 장애 프로세스는 "정중한 작별 인사" 없이 떠남 → 응답 없음을 실험적으로 감지하여 제거.
- 참여/탈퇴는 데이터 메시지와 동기화되어야 함 (참여 즉시 모든 그룹 메시지 수신, 탈퇴 즉시 수신 중단).

**k-fault tolerance**: 시스템이 k개의 구성요소 장애를 견디고 사양을 충족할 수 있는 능력.
- 침묵 장애(crash failure): **k+1개** 프로세스 필요. k개가 멈추면 나머지 1개가 응답.
- 임의 장애(arbitrary failure): **2k+1개** 프로세스 필요. k개가 잘못된 동일 응답을 생성할 수 있으므로, 나머지 k+1개의 다수결로 결정.

**복제 전략**:
- 주-기반(Primary-based): 계층적 그룹. 주 서버가 쓰기 조정. 장애 시 백업 중 하나가 선출.
- 복제-쓰기(Replicated-write): 수평 그룹. 활성 복제 또는 쿼럼 기반. 단일 장애점 없으나 분산 조정 비용.

## 예시

```
# k-fault tolerance 계산
# 시나리오: 5개 서버로 구성된 프로세스 그룹

# 충돌 장애만 허용하는 경우:
# k = 4 (5 - 1 = 4개까지 허용)
# 최소 1개 서버만 살아있으면 서비스 가능

# 임의(비잔틴) 장애를 허용하는 경우:
# 2k + 1 = 5 → k = 2 (최대 2개까지 허용)
# 최소 3개의 일치하는 응답으로 다수결

# 그룹 멤버십 변경 예시:
# 1. P_new가 그룹 참여 요청 → 멀티캐스트로 공지
# 2. 참여 시점 이후의 모든 그룹 메시지를 P_new도 수신
# 3. P_crash 감지: 타임아웃 만료 → 그룹에서 제거 공지
# 4. 너무 많은 프로세스 다운 시 → 그룹 재구성 프로토콜 실행

# Raft에서의 프로세스 그룹 (5서버 예시):
# - 리더 1개 + 팔로워 4개 (계층적 그룹)
# - 리더 장애 시 팔로워 중 선거로 새 리더 선출
# - 과반수(3개) 서버 동의 시 연산 커밋
```

## 관련 개념

- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
- [Failure Model](/knowledge/distributed-systems/failure-model/)
- [Raft Consensus](/knowledge/distributed-systems/raft-consensus/)
- [Paxos](/knowledge/distributed-systems/paxos/)
- [Byzantine Fault Tolerance](/knowledge/distributed-systems/byzantine-fault-tolerance/)
- [Election Algorithm](/knowledge/distributed-systems/election-algorithm/)
- [Primary Backup Protocol](/knowledge/distributed-systems/primary-backup-protocol/)
