---
title: "Cluster"
description: "클러스터는 표준 네트워크 스위치를 통해 I/O로 연결된 컴퓨터들의 모음으로, 메시지 전달 멀티프로세서를 구성한다"
tags: ['Message Passing', 'Distributed Computing', 'Dependability', 'Scalability', 'Cloud Computing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cluster
sidebar:
  order: 24
---

## 핵심 개념

클러스터는 각 노드가 독립적인 컴퓨터로 구성되며, 별도의 메모리와 운영체제를 가진다. 이러한 독립성은 공유 메모리 멀티프로세서 대비 여러 장점을 제공한다:

1. **높은 가용성:** 노드 장애 시 시스템을 중단하지 않고 해당 노드를 교체할 수 있다. 공유 주소 공간에서는 프로세서 격리와 교체가 매우 어렵다.
2. **점진적 확장:** 독립적이고 확장 가능한 네트워크 덕분에 시스템을 중단하지 않고 확장할 수 있다.
3. **낮은 비용:** 범용 서버와 표준 네트워크 장비를 사용한다.

Amazon, Facebook, Google, Microsoft 등이 수만 대의 서버로 구성된 클러스터를 여러 데이터센터에서 운용한다. 인터넷 서비스 제공업체들은 통신 성능이 공유 메모리보다 낮지만, 낮은 비용, 높은 가용성, 빠른 확장성 덕분에 클러스터를 선호한다.

## 예시

```
# 클러스터 구조
노드 1 [CPU + 메모리 + OS]
  |
  +--- 이더넷 스위치 ---+
  |                      |
노드 2 [CPU + 메모리 + OS]
  |
  +--- 이더넷 스위치 ---+
  |                      |
노드 N [CPU + 메모리 + OS]

# 클러스터 vs SMP
클러스터:
  - 각 노드가 별도 OS 실행
  - 메시지 전달로 통신
  - 노드 장애 시 시스템 계속 동작

SMP:
  - 단일 OS 공유
  - 공유 메모리로 통신
  - 프로세서 장애 시 전체 시스템에 영향

# 규모 예시 (2020년)
AWS: 수만 대 서버 x 여러 데이터센터
Google: ~50,000 서버/데이터센터
```

## 관련 개념

- [Message Passing](/knowledge/computer-architecture/message-passing/)
- [Warehouse Scale Computer](/knowledge/computer-architecture/warehouse-scale-computer/)
- [Shared Memory Multiprocessor](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [MapReduce](/knowledge/computer-architecture/mapreduce/)
