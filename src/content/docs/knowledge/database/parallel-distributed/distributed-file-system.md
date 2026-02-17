---
title: "Distributed File System"
description: "분산 파일 시스템은 대규모 머신 집합에 파일을 분산 저장하면서, 클라이언트에게 단일 파일 시스템의 뷰를 제공하는 시스템이다"
tags: ['HDFS', 'Gfs', 'Namenode', 'Datanode', 'Block Replication', 'Write Once Read Many']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/distributed-file-system
sidebar:
  order: 12
---

## 핵심 개념

대표적인 분산 파일 시스템은 Google File System(GFS)과 이를 기반으로 한 오픈 소스 Hadoop Distributed File System(HDFS)이다.

**HDFS 아키텍처**:
- **네임노드(NameNode)**: 파일 시스템 메타데이터(디렉토리 구조, 파일-블록 매핑, 블록-노드 매핑)를 저장하는 단일 노드이다. 전체 메타데이터를 메모리에 캐시하여 성능을 보장한다. 메모리 크기가 관리 가능한 파일/블록 수의 제한 요인이다.
- **데이터노드(DataNode)**: 실제 데이터 블록을 저장하는 노드들이다. 블록 ID를 로컬 파일 시스템의 위치에 매핑한다.
- **블록 크기**: HDFS는 보통 64MB의 대형 블록을 사용하여 네임노드가 추적해야 하는 블록 수를 줄인다. 이를 통해 수 페타바이트의 데이터를 관리할 수 있다.

**읽기 과정**: 클라이언트 → 네임노드(파일명으로 블록 ID + 복제본 위치 요청) → 클라이언트가 복제본 중 하나에 직접 블록 요청

**쓰기 과정**: 클라이언트 → 네임노드(블록 할당 요청) → 메타데이터 기록 후 클라이언트에 반환 → 클라이언트가 모든 복제본에 블록 쓰기 → 같은 랙 내 복제본에는 체인 복사 최적화 사용

**Write-Once-Read-Many**: HDFS는 파일 업데이트를 허용하지 않고, 추가(append)만 허용한다. 파일이 닫힌(closed) 후에만 읽기가 가능하다. 이 모델은 복제본 일관성 문제를 크게 단순화한다.

분산 파일 시스템은 수십 MB ~ 수백 GB의 대형 파일 수백만 개를 효율적으로 저장하도록 설계되었다. 수십억 개의 소형 데이터 항목 저장에는 적합하지 않으며, 그런 경우에는 병렬 키-값 저장소가 더 적합하다.

## 예시

```
HDFS 파일 읽기 과정:

Client                NameNode              DataNode1  DataNode2  DataNode3
  |-- open(file.txt) -->|                       |          |          |
  |<-- {block1:[DN1,DN2], block2:[DN2,DN3]} --|  |          |          |
  |                      |                       |          |          |
  |-- read(block1) ------|--------------------->|           |          |
  |<-- data -------------|----------------------|           |          |
  |                      |                       |          |          |
  |-- read(block2) ------|------------------------------>|           |
  |<-- data -------------|-------------------------------|           |

HDFS 블록 복제:
파일 A (200MB) → Block 1 (64MB) + Block 2 (64MB) + Block 3 (64MB) + Block 4 (8MB)

Block 1: DataNode 1 (Rack 1), DataNode 3 (Rack 1), DataNode 5 (Rack 2)
Block 2: DataNode 2 (Rack 1), DataNode 4 (Rack 2), DataNode 6 (Rack 2)
...
→ 각 블록이 3개 DataNode에 복제, 최소 2개 랙에 분산
```

## 관련 개념

- [Replication](/knowledge/database/replication/)
- [Parallel Key-Value Store](/knowledge/database/parallel-key-value-store/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Hadoop Distributed File System](/knowledge/database/hadoop-distributed-file-system/)
- [MapReduce](/knowledge/database/mapreduce/)
