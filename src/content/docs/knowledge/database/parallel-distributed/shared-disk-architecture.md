---
title: "Shared-Disk Architecture"
description: "공유 디스크 아키텍처(Shared-Disk Architecture)는 각 노드가 자체 프로세서와 메모리를 갖지만, 모든 노드가 인터커넥션 네트워크를 통해 공통 디스크 집합에 접근할 수 있는 병렬 데이터베이스 아키텍처이다"
tags: ['Parallel Database', 'Shared Disk', 'Storage Area Network', 'San', 'Fault Tolerance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/shared-disk-architecture
sidebar:
  order: 3
---

## 핵심 개념

공유 디스크 아키텍처는 공유 메모리 아키텍처에 비해 두 가지 장점이 있다. 첫째, 더 많은 수의 프로세서로 확장할 수 있다. 둘째, 노드 장애 시 다른 노드가 해당 작업을 인수할 수 있어 내결함성(fault tolerance)을 저비용으로 제공한다.

**스토리지 에어리어 네트워크(SAN)**는 대규모 저장 장치 뱅크(디스크)를 데이터를 사용하는 노드에 연결하기 위해 설계된 고속 로컬 네트워크이다. SAN의 저장 장치는 물리적으로 여러 디스크의 배열로 구성되지만, 논리적 디스크의 뷰를 제공하여 물리 디스크의 세부 사항을 숨긴다. RAID 아키텍처를 사용하면 개별 디스크 장애에도 시스템이 계속 동작할 수 있으며, I/O 병렬성도 어느 정도 제공된다.

SAN은 보통 중복 경로(redundancy)를 갖추어, 링크나 네트워크 연결 요소가 실패해도 네트워크가 계속 동작하도록 설계된다.

**제한 사항**: 공유 디스크 시스템에서 스토리지 접근을 위한 네트워크 대역폭은 로컬 스토리지 접근 대역폭보다 일반적으로 작다. 따라서 스토리지 접근이 병목이 되어 확장성이 제한될 수 있다. 또한 노드 간 통신이 공유 메모리 시스템보다 느리다(전용 하드웨어 없이는 수 밀리초 수준).

## 예시

```
공유 디스크 아키텍처 구조:

Node 1 [CPU + Memory]  ──┐
Node 2 [CPU + Memory]  ──┤── SAN ──┤── Storage Array 1
Node 3 [CPU + Memory]  ──┤         ├── Storage Array 2
Node 4 [CPU + Memory]  ──┘         └── Storage Array 3

노드 장애 시 복구:
1. Node 2가 실패
2. Node 2가 처리하던 데이터는 공유 디스크에 존재
3. Node 1, 3, 4 중 하나가 해당 작업 인수
4. 서비스 지속 가능 (고가용성)

대표 시스템: Oracle RAC (Real Application Clusters)
```

## 관련 개념

- [Shared-Memory Architecture](/knowledge/database/shared-memory-architecture/)
- [Shared-Nothing Architecture](/knowledge/database/shared-nothing-architecture/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
- [Replication](/knowledge/database/replication/)
