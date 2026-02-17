---
title: "Coordinator Selection"
description: "코디네이터 선출(Coordinator Selection)은 분산 시스템에서 특정 역할(마스터, 리더, 코디네이터)을 담당할 노드를 선택하는 과정이다"
tags: ['Election Algorithm', 'Bully Algorithm', 'Lease', 'Zookeeper', 'Backup Coordinator']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/coordinator-selection
sidebar:
  order: 28
---

## 핵심 개념

**백업 코디네이터(Backup Coordinator)**: 코디네이터가 수행하는 모든 작업을 백업 노드가 미러링한다. 코디네이터 장애 시 백업이 즉시 인수한다. 단점은 하나의 노드가 항상 전담되어야 한다는 것과, 장애 감지 자체가 어려울 수 있다는 점이다.

**선거 알고리즘(Election Algorithm)**: 여러 노드 중 하나를 코디네이터로 선출하는 분산 알고리즘이다.

- **불리 알고리즘(Bully Algorithm)**: 모든 노드에 고유 번호가 부여된다. 노드가 코디네이터 장애를 감지하면, 자신보다 높은 번호의 노드에 선거 메시지를 보낸다. 높은 번호의 노드가 응답하면, 해당 노드가 선거를 이어받는다. 가장 높은 번호의 활성 노드가 코디네이터가 된다. 이름 그대로, 가장 "강한"(번호가 높은) 노드가 선거를 "억지로" 이긴다.

- **무작위 재시도(Randomized Retry)**: 가장 간단한 접근법이다. 코디네이터 장애를 감지한 노드가 자신이 코디네이터가 되겠다고 선언한다. 여러 노드가 동시에 선언하면 충돌이 발생하므로, 랜덤한 지연 후 재시도하여 결국 하나만 성공하도록 한다.

**임대(Lease)**: 코디네이터 역할을 영구적이 아닌 제한된 시간(임대 기간) 동안만 부여하는 메커니즘이다. 임대가 만료되면 코디네이터는 다시 임대를 갱신해야 한다. 코디네이터가 장애로 갱신하지 못하면, 다른 노드가 새 임대를 획득하여 코디네이터가 된다. 임대는 코디네이터의 정확한 장애 감지 없이도 안전한 코디네이터 전환을 가능하게 한다.

**ZooKeeper**: Apache ZooKeeper는 분산 시스템에서 코디네이터 선출, 설정 관리, 동기화 등을 위한 코디네이션 서비스이다. 내부적으로 Paxos와 유사한 합의 프로토콜(ZAB)을 사용하여, 장애에도 안정적으로 동작한다. 많은 분산 시스템(HBase, Kafka 등)이 코디네이터 선출에 ZooKeeper를 활용한다.

## 예시

```
-- 불리 알고리즘 예시 (5개 노드: N1(1), N2(2), N3(3), N4(4), N5(5))
-- 현재 코디네이터: N5

N5 장애 발생 → N2가 장애 감지

1. N2 → N3, N4, N5: "ELECTION" 메시지 전송
2. N3 → N2: "OK" (나보다 번호 높은 N3가 응답)
   N4 → N2: "OK" (나보다 번호 높은 N4가 응답)
   N5: 응답 없음 (장애)
3. N3 → N4, N5: "ELECTION" 메시지 전송
4. N4 → N3: "OK"
   N5: 응답 없음
5. N4 → N5: "ELECTION" 메시지 전송
6. N5: 응답 없음
7. N4: 자신보다 높은 번호의 노드 없음 → 코디네이터로 선언
8. N4 → N1, N2, N3: "COORDINATOR" 메시지

→ N4가 새 코디네이터

-- 임대(Lease) 메커니즘:
코디네이터 N4가 lease_duration = 30초로 임대 획득

시간 0초:  N4 임대 획득, 코디네이터로 동작
시간 25초: N4가 임대 갱신 → 새 만료: 55초
시간 40초: N4 장애 발생, 갱신 불가
시간 55초: 임대 만료 → 다른 노드가 새 임대 획득 가능
시간 56초: N3가 새 임대 획득 → 새 코디네이터
```

## 관련 개념

- [Paxos](/knowledge/database/paxos/)
- [Raft Consensus](/knowledge/database/raft-consensus/)
- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [Distributed Deadlock Detection](/knowledge/database/distributed-deadlock-detection/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
