---
title: "Key-Value Store"
description: "키-값 저장 시스템(Key-Value Store)은 키와 연관된 레코드(값)를 저장하거나 갱신하고, 주어진 키로 레코드를 검색하는 기능을 제공하는 시스템이다"
tags: ['Key Value Store', 'Big Data', 'Distributed Systems', 'NoSQL', 'Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/key-value-store
sidebar:
  order: 5
---

## 핵심 개념

키-값 저장 시스템의 핵심은 두 가지 원시 함수에 기반한다: 키와 연관된 값을 저장하는 put(key, value)와, 지정된 키에 연관된 저장된 값을 검색하는 get(key)이다. Bigtable 같은 일부 시스템은 키 값에 대한 범위 질의도 추가로 지원하며, 문서 저장소(document store)는 데이터 값에 대한 제한된 형태의 질의도 지원한다.

병렬 키-값 저장소는 키를 여러 머신에 걸쳐 파티셔닝하고, 갱신과 조회를 올바른 머신으로 라우팅한다. 또한 복제(replication)를 지원하여 복제본의 일관성을 보장한다. 시스템에 더 많은 머신을 추가할 수 있는 기능을 제공하고, 로드가 자동으로 균형을 이루도록 보장한다.

널리 사용되는 병렬 키-값 저장소로는 Google의 Bigtable, Apache HBase, Amazon의 Dynamo, Facebook의 Cassandra, MongoDB, Microsoft의 Azure cloud storage, Yahoo의 Sherpa/PNUTS 등이 있다.

키-값 저장소의 주요 동기는 매우 많은 양의 데이터와 질의를 처리하는 능력이다. 레코드를 클러스터의 여러 머신에 분산시키고, 각 머신이 해당 레코드의 조회와 갱신을 처리한다. 이러한 접근법은 수천에서 수만 대의 머신으로 확장 가능하다.

## 예시

소셜 네트워킹 애플리케이션에서의 키-값 저장소 활용 예시:

사용자 프로필 데이터를 사용자 식별자를 키로 하여 저장한다. 사용자가 시스템에 접속하면, 해당 사용자의 키를 통해 프로필 데이터를 즉시 조회할 수 있다.

Bigtable에서는 키가 실제로 세 부분으로 구성된다:
- (record-identifier, attribute-name, timestamp)

예를 들어, 웹 크롤 데이터를 저장할 때 URL을 역순으로 변환하여:
- `www.cs.yale.edu/people/silberschatz.html` → `edu.yale.cs.www/people/silberschatz.html`

이렇게 하면 같은 도메인의 모든 URL이 연속된 키 범위에 저장되어 효율적인 범위 질의가 가능하다.

## 관련 개념

- [NoSQL](/knowledge/database/nosql/)
- [Hadoop Distributed File System](/knowledge/database/hadoop-distributed-file-system/)
- [Storage Area Network](/knowledge/database/storage-area-network/)
- [Apache Spark](/knowledge/database/apache-spark/)
