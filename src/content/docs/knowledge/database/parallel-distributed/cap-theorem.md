---
title: "CAP Theorem"
description: "CAP 정리는 분산 데이터베이스 시스템이 일관성(Consistency), 가용성(Availability), 파티션 내성(Partition-tolerance) 세 가지 속성 중 최대 두 가지만 동시에 만족할 수 있다는 이론적 결과이다"
tags: ['Distributed System', 'Consistency', 'Availability', 'Partition Tolerance', 'Base Properties']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/cap-theorem
sidebar:
  order: 24
---

## 핵심 개념

**세 가지 속성**:
- **일관성(Consistency)**: 복제된 데이터에 대한 읽기/쓰기 실행 결과가 단일 노드에서 순차적으로 실행한 것과 동일한 결과를 보장한다. 모든 읽기가 가장 최근 쓰기의 결과를 반환한다.
- **가용성(Availability)**: 장애가 발생하지 않은 모든 노드가 합리적인 시간 내에 모든 요청에 응답한다.
- **파티션 내성(Partition-tolerance)**: 네트워크 파티션(일부 노드 간 통신 불가)이 발생해도 시스템이 계속 동작한다.

대규모 분산 시스템에서 네트워크 파티션은 방지할 수 없으므로, 실질적으로 **일관성과 가용성 사이의 트레이드오프**가 된다.

**CP 시스템(일관성 + 파티션 내성)**: 파티션 발생 시 소수 파티션의 노드가 응답을 거부하여 일관성을 보장한다. 과반수 프로토콜, Paxos, Raft 등이 이 접근을 사용한다. 은행 시스템 등 일관성이 필수적인 응용에 적합하다.

**AP 시스템(가용성 + 파티션 내성)**: 파티션 발생 시에도 모든 접근 가능한 노드가 응답하여 가용성을 보장한다. 대신 충돌하는 업데이트가 발생할 수 있어 나중에 해결해야 한다. 소셜 네트워크 등 일시적 불일치를 허용할 수 있는 응용에 적합하다.

**BASE 속성**: ACID의 대안으로, AP 시스템이 추구하는 속성이다.
- **Basically Available**: 파티션 발생 시에도 기본적으로 가용하다.
- **Soft state**: 복제본마다 상태가 약간 다를 수 있다.
- **Eventually consistent**: 파티션이 해소되면 궁극적으로 모든 복제본이 일관된 상태로 수렴한다.

실제 시스템 설계에서는 CAP을 절대적 이분법이 아니라 연속적 스펙트럼으로 본다. Cassandra와 MongoDB 등은 읽기/쓰기 연산별로 필요한 복제본 수를 설정하여, 연산 수준에서 일관성과 가용성의 균형을 조절할 수 있다.

## 예시

```
-- 네트워크 파티션 시나리오

3개 복제본: N1, N2, N3
데이터: x = 10 (모든 복제본)

네트워크 파티션 발생: {N1} | {N2, N3}

Client A → N1: write(x = 20)  -- N1만 접근 가능

== CP 시스템 선택 ==
N1: 과반수(2/3) 확보 불가 → 쓰기 거부
→ 일관성 유지, 가용성 포기
→ Client A는 쓰기 실패

== AP 시스템 선택 ==
N1: x = 20으로 업데이트 (로컬만)
동시에 Client B → N2: write(x = 30)
N2: x = 30으로 업데이트

파티션 해소 후:
N1: x = 20, N2: x = 30, N3: x = 10
→ 충돌 감지 및 해결 필요 (version vector 등 사용)

== 실용적 설정 (Cassandra) ==
W = 2 (쓰기에 2개 복제본 필요)
R = 2 (읽기에 2개 복제본 필요)
W + R > N (2 + 2 > 3) → 강한 일관성 보장

W = 1로 설정하면 → 파티션 시에도 쓰기 가능, 하지만 일관성 위험
```

## 관련 개념

- [Eventual Consistency](/knowledge/database/eventual-consistency/)
- [Replication](/knowledge/database/replication/)
- [Paxos](/knowledge/database/paxos/)
- [Raft Consensus](/knowledge/database/raft-consensus/)
- [Version Vector](/knowledge/database/version-vector/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
