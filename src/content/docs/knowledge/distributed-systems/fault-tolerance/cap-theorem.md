---
title: "CAP 정리 (CAP Theorem)"
description: "CAP 정리는 공유 데이터를 제공하는 네트워크 시스템이 일관성(Consistency), 가용성(Availability), 분할 내성(Partition tolerance) 세 가지 속성 중 최대 두 가지만 동시에 보장할 수 있다는 정리이다(Fox and Brewer..."
tags: ['Cap Theorem', 'Consistency', 'Availability', 'Partition Tolerance', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/cap-theorem
sidebar:
  order: 8
---

## 핵심 개념

**세 가지 속성**:
- **C (Consistency)**: 공유 및 복제된 데이터 항목이 단일의 최신 복사본처럼 보임. 모든 읽기가 가장 최근 쓰기를 반환.
- **A (Availability)**: 업데이트가 항상 최종적으로 실행됨. 모든 요청에 대해 (정확한) 응답을 반환.
- **P (Partition tolerance)**: 프로세스 그룹이 네트워크 장애로 분할되어도 시스템이 동작.

**불가능성의 직관**: 두 프로세스가 네트워크 장애로 통신 불가한 상황에서:
- 한 프로세스가 업데이트를 수락하면 → 일관성 깨짐 → {A, P}만 가능
- 일관성을 유지하려면 한 프로세스가 불가용해야 → {C, P}만 가능
- 두 프로세스가 통신 가능해야만 일관성과 가용성 모두 유지 → {C, A}만 가능, P 없음

**합의와의 관계**: CAP가 불가능하면 합의도 불가능. 합의는 프로세스가 동일한 출력을 생성해야 하므로, 일관성보다 강한 요구사항.

**FLP 불가능성 결과** (Fischer et al., 1985): 메시지 전달 시간에 유한 상한이 보장되지 않으면, 단 하나의 프로세스라도 장애 발생 시 합의 불가능. 비동기 시스템에서 느린 프로세스와 충돌된 프로세스를 구분할 수 없기 때문.

**실용적 해석** (Brewer, 2012): CAP는 안전성(safety)과 활성(liveness) 간의 트레이드오프. 실제 분산 시스템에서는:
- 분할 발생 시 일관성 또는 가용성 중 선택하여 진행
- 동시에 복구 절차를 시작하여 불일치 효과를 완화
- 선택은 애플리케이션 의존적: 데이터베이스 중복 키는 쉽게 수정 가능(비일관성 허용), 대규모 금액 이체 중복은 위험(가용성 저하 허용)

**BAR fault tolerance**: 노드가 비잔틴이거나 협력적인 것만 가정하는 것은 비현실적. 다른 관리 도메인의 프로세스는 합리적(rational) 행동 가능. BAR(Byzantine, Altruism, Rationality) 모델이 이를 다룸.

## 예시

```
# CAP 정리의 실제 시스템 적용

# {C, P} 선택: 강한 일관성, 분할 내성, 가용성 포기
# 예: 전통적 관계형 데이터베이스 (분할 시 일부 노드 불가용)
# 분할 발생 시 소수파 파티션이 요청 거부
CP_system = "ZooKeeper, HBase, MongoDB(strong consistency mode)"

# {A, P} 선택: 가용성, 분할 내성, 일관성 포기
# 예: 최종 일관성 시스템 (분할 시에도 업데이트 수락)
AP_system = "Cassandra, DynamoDB, CouchDB"

# {C, A} 선택: 일관성, 가용성, 분할 내성 포기
# 분할이 없는 단일 노드 시스템 또는 완벽한 네트워크 가정
CA_system = "단일 노드 RDBMS (실질적으로 분산 시스템이 아님)"

# 합의 도달 가능 조건 (Turek and Shasha, 1992):
# 동기 시스템: 모든 경우에 합의 가능
# 비동기 시스템 + 유한 지연 + 순서 보장: 유니캐스트 가능
# 비동기 시스템 + 무한 지연 + 비순서 + 유니캐스트: 합의 불가능!
```

## 관련 개념

- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [최종 일관성 (Eventual Consistency)](/knowledge/distributed-systems/eventual-consistency/)
- [순차적 일관성 (Sequential Consistency)](/knowledge/distributed-systems/sequential-consistency/)
- [복제 관리 (Replica Management)](/knowledge/distributed-systems/replica-management/)
- [래프트 합의 (Raft Consensus)](/knowledge/distributed-systems/raft-consensus/)
- [팍소스 (Paxos)](/knowledge/distributed-systems/paxos/)
