---
title: "Distributed Database System"
description: "분산 데이터베이스 시스템은 지리적으로 분리된 사이트에 위치한 노드들에 데이터베이스가 저장되며, 각 노드가 다양한 통신 매체를 통해 서로 통신하는 데이터베이스 시스템이다"
tags: ['Distributed System', 'Wan', 'Network Partition', 'Replication', 'Global Transaction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/distributed-database-system
sidebar:
  order: 6
---

## 핵심 개념

분산 데이터베이스는 공유 무(shared-nothing) 병렬 데이터베이스와 여러 면에서 차이가 있다.

**네트워크 특성**: 분산 데이터베이스의 사이트들은 WAN(Wide-Area Network)으로 연결된다. WAN은 로컬 네트워크보다 대역폭이 낮고, 지연시간(latency)이 높으며(전 세계 기준 수백 밀리초), 네트워크 링크 장애가 더 빈번하다. 특히 **네트워크 파티션(network partition)**이라는 문제가 발생할 수 있는데, 이는 두 사이트가 모두 살아있지만 서로 통신할 방법이 없는 상황이다.

**장애 내성**: 지진, 화재 등의 자연 재해로 전체 데이터 센터가 실패할 수 있으므로, 지리적으로 분리된 데이터 센터에 데이터를 복제해야 한다.

**자율성**: 분산 데이터베이스의 각 사이트는 로컬 데이터에 대해 일정 수준의 제어 자율성을 유지할 수 있다. 동종(homogeneous) 분산 데이터베이스는 공통 글로벌 스키마를 공유하고 동일 소프트웨어를 실행하지만, 연합(federated) 또는 이종(heterogeneous) 분산 데이터베이스는 각각 자체 스키마를 가진 기존 데이터베이스를 통합한 것이다.

**트랜잭션 구분**: 로컬 트랜잭션은 트랜잭션이 시작된 노드의 데이터만 접근하며, 글로벌 트랜잭션은 다른 노드의 데이터에도 접근한다.

현대 웹 규모 애플리케이션은 병렬성(데이터 센터 내 고부하 처리)과 분산(데이터 센터 간 고가용성)을 결합하여 사용한다.

## 예시

```
분산 데이터베이스 vs 병렬 데이터베이스:

           분산 DB                    병렬 DB
위치       지리적 분산                 단일 데이터 센터
네트워크   WAN (높은 지연)            고속 LAN (낮은 지연)
장애 범위  데이터 센터 전체 가능       단일 노드 수준
관리       분산/자율적 가능            중앙 집중식
노드 규모  이종적                     균일

글로벌 트랜잭션 예시:
사용자(서울) → 서울 데이터센터에서 시작
  ├── 로컬: 서울 노드의 계좌 정보 읽기
  ├── 원격: 뉴욕 노드의 계좌에 송금
  └── 2PC로 원자적 커밋 보장

네트워크 파티션:
[서울 DC] ←──X──→ [뉴욕 DC]
    ↑ 양쪽 모두 동작 중이지만 통신 불가
    → 가용성(Availability) vs 일관성(Consistency) 트레이드오프 발생
```

## 관련 개념

- [Parallel Database System](/knowledge/database/parallel-database-system/)
- [Shared-Nothing Architecture](/knowledge/database/shared-nothing-architecture/)
- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [CAP Theorem](/knowledge/database/cap-theorem/)
- [Replication](/knowledge/database/replication/)
