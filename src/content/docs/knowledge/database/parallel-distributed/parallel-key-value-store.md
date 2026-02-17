---
title: "Parallel Key-Value Store"
description: "병렬 키-값 저장소(Parallel Key-Value Store)는 수십억 개의 비교적 작은 레코드를 수천 개의 노드에 분산 저장하면서, 키를 기반으로 데이터를 저장(put)하고 검색(get)하는 기능을 제공하는 분산 데이터 저장 시스템이다"
tags: ['Key Value Store', 'Bigtable', 'Hbase', 'Cassandra', 'Wide Column Store', 'Document Store']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/parallel-key-value-store
sidebar:
  order: 13
---

## 핵심 개념

키-값 저장소는 초기 2000년대에 기존 병렬 관계형 데이터베이스가 웹 규모의 대량 소형 레코드 저장에 적합하지 않았던 문제를 해결하기 위해 개발되었다.

**데이터 모델 종류**:
- **단순 키-값**: 값을 해석하지 않는 바이트 시퀀스로 취급 (Redis, Memcached)
- **와이드 컬럼 스토어**: 개별 튜플에 컬럼을 동적으로 추가/삭제 가능 (Bigtable, HBase, Cassandra)
- **문서 저장소**: JSON 등의 복합 구조를 값으로 저장 (MongoDB, CouchDB, DynamoDB)

**아키텍처 구성 요소**:
- **태블릿(Tablet)**: 파티션 단위. 키 범위에 따라 데이터를 분할하며, 각 태블릿에 태블릿 서버가 할당된다.
- **마스터 노드**: 파티션 테이블(키 범위, 복제본 위치, 현재 태블릿 서버)을 관리하고, 노드 장애 감지 및 태블릿 서버 재할당을 담당한다.
- **라우터**: 요청을 적절한 태블릿 서버로 라우팅한다. Bigtable/HBase는 클라이언트에 파티션 정보를 복제하여 직접 라우팅하고, PNUTS는 별도 라우터 노드를 사용한다.

**인덱스 구조**: BigTable과 HBase는 불변(immutable) 파일 위에 구축되므로 B+-트리를 직접 사용할 수 없다. 대신 LSM 트리(Log-Structured Merge Tree)의 stepped-merge 변형을 사용한다. LSM 트리는 기존 트리를 업데이트하지 않고 새 트리를 생성하거나 기존 트리를 병합하므로 불변 파일과 잘 맞는다.

**탄력성(Elasticity)**: 수요에 따라 노드 수를 동적으로 조절할 수 있다. 노드 추가 시 태블릿을 이동시키고, 노드 감소 시 태블릿을 다른 노드로 옮긴 후 제거한다.

## 예시

```
-- Bigtable 스타일 데이터 모델
-- 키: (row-key, column-name, timestamp)

put("users", "user:1001", "profile:name", "Alice")
put("users", "user:1001", "profile:email", "alice@example.com")
put("users", "user:1001", "activity:last_login", "2026-02-15")

get("users", "user:1001")
→ {profile:name → "Alice",
   profile:email → "alice@example.com",
   activity:last_login → "2026-02-15"}

-- 아키텍처:
Client → Router → Tablet Server (Master Replica)
                        ↓
                   [Tablet: key range "user:0000" ~ "user:5000"]
                        ↓
                   LSM Tree Index

-- 와이드 컬럼 스토어 특성:
Row 1: {A, B, C, D}        -- 4개 컬럼
Row 2: {A, B, E}           -- 3개 컬럼 (다른 구성)
Row 3: {A, C, D, E, F, G}  -- 6개 컬럼
→ 각 행이 서로 다른 컬럼 집합을 가질 수 있음
```

## 관련 개념

- [Log-Structured Merge Tree](/knowledge/database/log-structured-merge-tree/)
- [Consistent Hashing](/knowledge/database/consistent-hashing/)
- [Distributed File System](/knowledge/database/distributed-file-system/)
- [Replication](/knowledge/database/replication/)
- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Eventual Consistency](/knowledge/database/eventual-consistency/)
