---
title: "Shared-Memory Architecture"
description: "공유 메모리 아키텍처(Shared-Memory Architecture)는 여러 프로세서가 공통 메모리 공간에 접근하여 데이터를 공유하는 병렬 데이터베이스 시스템 구조이다"
tags: ['Shared Memory', 'Parallel Database', 'Database Architecture', 'Numa']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/shared-memory-architecture
sidebar:
  order: 1
---

## 핵심 개념

공유 메모리 아키텍처에서 모든 프로세서는 인터커넥션 네트워크를 통해 공통 메모리에 접근한다. 디스크 역시 모든 프로세서가 공유한다. 이 구조의 가장 큰 장점은 프로세서 간 매우 효율적인 통신이 가능하다는 점이다. 공유 메모리에 있는 데이터는 소프트웨어 수준의 이동 없이 어떤 프로세스든 바로 접근할 수 있다.

현대의 공유 메모리 아키텍처는 각 프로세서에 메모리를 직접 연결하는 방식을 사용한다. 각 프로세서는 로컬 메모리에 매우 빠르게 접근할 수 있지만, 다른 프로세서에 연결된 메모리에도 접근이 가능하다. 메모리 접근 속도가 위치에 따라 달라지므로 이를 비균일 메모리 접근(NUMA, Non-Uniform Memory Access) 아키텍처라 한다.

공유 메모리 시스템은 특수한 고속 인터커넥트가 필요하기 때문에 확장성이 수백 개 코어 수준으로 제한된다. 그러나 멀티코어 프로세서의 보급과 대용량 메모리의 저렴화로 인해 공유 메모리 병렬 처리의 중요성은 점점 커지고 있다.

캐시 일관성(Cache Coherency)은 공유 메모리 아키텍처의 핵심 과제이다. 한 코어에서 수행한 업데이트가 다른 코어의 캐시에 즉시 반영되지 않을 수 있으므로, MESI 프로토콜과 같은 하드웨어 수준 프로토콜과 메모리 배리어 명령어(sfence, lfence, mfence)를 사용하여 캐시 일관성을 보장한다.

현대 병렬 데이터베이스 시스템은 대개 계층적 아키텍처를 사용하여, 각 노드 내부에서는 공유 메모리 병렬 처리를, 노드 간에는 공유 비공유(Shared-Nothing) 방식을 적용한다.

## 예시

Intel Xeon 프로세서 기반 서버 시스템은 대표적인 공유 메모리 아키텍처이다. 예를 들어, 8개의 CPU(각각 28코어)가 하나의 보드에 장착되어 공유 메모리에 접근할 수 있다. 각 코어에는 L1, L2 캐시가 있고, 프로세서 수준에서 L3 캐시를 공유한다.

데이터베이스 시스템에서 공유 메모리를 활용하면, 비대칭 fragment-and-replicate 조인 시 작은 릴레이션을 각 프로세서마다 복제할 필요 없이 하나의 복사본만 공유 메모리에 유지하면 모든 프로세서가 접근할 수 있다.

## 관련 개념

- [Shared-Nothing Architecture](/knowledge/database/shared-nothing-architecture/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
- [Cloud-Based Database Services](/knowledge/database/cloud-based-database-services/)
