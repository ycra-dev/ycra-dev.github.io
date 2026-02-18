---
title: "Shared-Nothing Architecture"
description: "공유 비공유 아키텍처(Shared-Nothing Architecture)는 각 노드가 자체 프로세서, 메모리, 디스크를 보유하며, 노드 간에 공통 메모리나 디스크를 공유하지 않는 병렬 데이터베이스 시스템 구조이다"
tags: ['Shared Nothing', 'Parallel Database', 'Database Architecture', 'Scalability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/shared-nothing-architecture
sidebar:
  order: 2
---

## 핵심 개념

공유 비공유 시스템에서 각 노드는 자신이 보유한 디스크의 데이터에 대한 서버 역할을 수행한다. 로컬 디스크 참조가 각 노드의 로컬 디스크에서 처리되므로, 모든 I/O가 단일 인터커넥션 네트워크를 통과해야 하는 단점을 극복한다.

공유 비공유 아키텍처의 인터커넥션 네트워크(예: 트리형 인터커넥션 네트워크)는 확장 가능하도록 설계되어, 노드가 추가될수록 전송 용량도 증가한다. 따라서 공유 비공유 아키텍처는 매우 높은 확장성을 가지며, 수천 개의 노드까지 쉽게 지원할 수 있다.

주요 단점은 통신 비용과 비로컬 디스크 접근 비용이 공유 메모리나 공유 디스크 아키텍처보다 높다는 점이다. 데이터 전송 시 양쪽 끝에서 소프트웨어 상호작용이 필요하기 때문이다.

높은 확장성 덕분에, 공유 비공유 아키텍처는 매우 큰 데이터 볼륨을 처리하는 데 널리 사용되며, 수천 개 노드 규모까지 확장할 수 있다. 극단적인 경우에는 수만 개 노드까지 지원 가능하다.

현대 병렬 데이터베이스 시스템은 대개 계층적(hierarchical) 아키텍처를 사용한다. 최상위 레벨에서는 공유 비공유 방식으로 노드를 연결하고, 각 노드 내부에서는 공유 메모리 병렬 처리를 사용하는 하이브리드 구조이다.

## 예시

대규모 데이터 센터의 서버 클러스터가 대표적인 공유 비공유 아키텍처의 예이다. 각 서버(노드)는 자체 CPU, RAM, SSD를 가지고 있으며, 트리형 네트워크 스위치를 통해 상호 연결된다. 예를 들어, 48-포트 스위치로 랙 내 서버들을 연결하고, 집약 스위치로 여러 랙을 연결하며, 코어 스위치로 전체를 통합하는 3-tier 토폴로지를 사용한다.

Hadoop MapReduce, Apache Spark 같은 빅데이터 처리 프레임워크와 Teradata, Greenplum 같은 상용 병렬 데이터베이스 시스템이 공유 비공유 아키텍처 위에 구축된다.

## 관련 개념

- [Shared-Memory Architecture](/knowledge/database/shared-memory-architecture/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
