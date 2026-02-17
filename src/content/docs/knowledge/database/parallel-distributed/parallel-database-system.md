---
title: "Parallel Database System"
description: "병렬 데이터베이스 시스템은 다수의 프로세서와 디스크를 고속 인터커넥션 네트워크로 연결하여, 대규모 데이터베이스 질의 및 트랜잭션을 병렬로 처리하는 데이터베이스 시스템이다"
tags: ['Parallel Processing', 'Speedup', 'Scaleup', 'Amdahls Law', 'Interconnection Network']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/parallel-database-system
sidebar:
  order: 5
---

## 핵심 개념

병렬 데이터베이스 시스템의 성능은 두 가지 지표로 측정된다.

**스피드업(Speedup)**: 자원을 N배 늘렸을 때 동일 작업의 실행 시간이 1/N로 줄어드는 정도이다. Speedup = T_S / T_L로 정의되며, N배 자원에서 speedup이 N이면 선형 스피드업이라 한다.

**스케일업(Scaleup)**: 문제 크기와 자원을 동일 비율로 늘렸을 때 실행 시간이 일정하게 유지되는 정도이다. 배치 스케일업(데이터베이스 크기 증가에 따른)과 트랜잭션 스케일업(트랜잭션 비율 증가에 따른)으로 구분된다.

병렬 처리의 효율성을 저해하는 요인:
- **순차적 계산(Sequential computation)**: Amdahl의 법칙에 의하면, 병렬화 가능한 비율이 p이고 n개 노드를 사용할 때 speedup = 1/((1-p) + p/n)이다. p = 0.9이면 최대 speedup은 10이다. Gustafson의 법칙은 문제 크기 확장 시의 스케일업을 다루며, scaleup = 1/(n(1-p) + p)이다.
- **시작 비용(Start-up costs)**: 수천 개 프로세스를 시작하는 오버헤드
- **간섭(Interference)**: 공유 자원(버스, 디스크, 잠금)에 대한 경쟁
- **스큐(Skew)**: 작업이 균등하게 분배되지 않아 가장 느린 단계가 전체 시간을 결정

**인터커넥션 네트워크**: 버스, 링, 메시, 하이퍼큐브, 트리형 등의 토폴로지가 있다. 현대 데이터 센터에서는 트리형(fat-tree) 토폴로지가 주로 사용되며, 에지 스위치 → 집계 스위치 → 코어 스위치의 3계층 구조로 수만 대의 노드를 연결한다.

## 예시

```
Amdahl의 법칙 예시:
- 전체 작업 중 병렬화 가능 비율 p = 0.9
- 노드 수 n = 100

Speedup = 1 / ((1 - 0.9) + (0.9 / 100))
        = 1 / (0.1 + 0.009)
        = 1 / 0.109
        ≈ 9.17

→ 100개 노드로도 speedup은 약 9.17배에 불과
→ 10%의 순차 부분이 병렬화의 큰 장벽

트리형 네트워크 토폴로지:
        [Core Switches]
       /      |       \
[Aggr SW]  [Aggr SW]  [Aggr SW]
  / | \     / | \      / | \
[ToR] [ToR] [ToR] [ToR] [ToR] ...
 |||   |||   |||   |||   |||
서버들  서버들  서버들  서버들  서버들
```

## 관련 개념

- [Shared-Memory Architecture](/knowledge/database/shared-memory-architecture/)
- [Shared-Nothing Architecture](/knowledge/database/shared-nothing-architecture/)
- [Shared-Disk Architecture](/knowledge/database/shared-disk-architecture/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
