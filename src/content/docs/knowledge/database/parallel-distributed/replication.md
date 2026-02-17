---
title: "Replication"
description: "복제(Replication)는 데이터의 복사본을 여러 노드에 저장하여, 노드 장애 시에도 데이터 손실 없이 시스템이 계속 동작할 수 있도록 하는 기법이다"
tags: ['Replication', 'Fault Tolerance', 'High Availability', 'Master Replica', 'Consistency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/replication
sidebar:
  order: 10
---

## 핵심 개념

대규모 병렬 시스템에서 노드 장애 확률은 노드 수에 비례하여 증가한다. 단일 노드가 5년에 한 번 실패한다면, 100노드 시스템은 약 18일마다 장애가 발생한다. 따라서 복제는 필수적이다.

**복제 수준**: 개별 튜플 수준의 복제 추적은 오버헤드가 크므로, 파티션(태블릿, 노드, 가상 노드) 수준에서 복제한다. 2-way 복제는 단일 노드 장애에 대비하고, 3-way 복제는 두 노드 장애에도 대비한다. 저비용 상용 머신은 3-way, 고신뢰성 머신은 2-way 복제를 사용한다.

**복제본 위치 전략**:
- 데이터 센터 내 복제: 같은 랙 내 복제(빠르지만 랙 장애에 취약)와 다른 랙 복제(랙 장애에도 대비)를 병행한다.
- 데이터 센터 간 복제: 지진, 화재 등 전체 데이터 센터 실패에 대비. 사용자와 가까운 데이터 센터에 복제본을 두어 지연시간도 줄인다.
- 복제본을 여러 노드에 분산 배치하여, 한 노드 실패 시 추가 부하가 여러 노드에 고르게 분배되도록 한다.

**복제본 일관성 관리**:
- **마스터 복제본**: 하나의 복제본을 마스터로 지정하여 모든 갱신과 읽기를 마스터에서 처리. 마스터 실패 시 새 마스터를 할당한다.
- **2PC(Two-Phase Commit)**: 모든 복제본에 원자적으로 업데이트를 적용한다.
- **영구 메시징(Persistent Messaging)**: 최종 일관성(eventual consistency)을 보장하면서 업데이트를 비동기적으로 전파한다.
- **합의 프로토콜(Consensus Protocols)**: 지정된 마스터 없이도 장애 상황에서 복제본 업데이트를 진행할 수 있다.

## 예시

```
-- 3-way 복제 예시 (10 노드 시스템)

Tablet T1의 복제본:
  Primary: Node 0 (마스터)
  Replica: Node 3 (같은 랙)
  Replica: Node 7 (다른 랙)

-- 장애 대응:
Node 0 실패 → Node 3 또는 Node 7이 새 마스터로 승격
              나머지 노드들은 정상 서비스 지속

-- 복제본 분산 배치:
Node 1의 파티션들의 백업 위치:
  p1 → Node 2
  p2 → Node 3
  p3 → Node 4
  ...
  p9 → Node 10

→ Node 1 장애 시, Node 2~10이 각각 하나의 파티션만 추가로 처리
→ 부하가 균등하게 분산됨 (특정 노드에 2배 부하가 걸리지 않음)
```

## 관련 개념

- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [Eventual Consistency](/knowledge/database/eventual-consistency/)
- [CAP Theorem](/knowledge/database/cap-theorem/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Paxos](/knowledge/database/paxos/)
- [Raft Consensus](/knowledge/database/raft-consensus/)
