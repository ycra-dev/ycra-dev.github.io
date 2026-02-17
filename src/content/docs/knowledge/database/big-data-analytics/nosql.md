---
title: "NoSQL"
description: "NoSQL은 SQL을 지원하지 않는 키-값 저장 시스템을 가리키는 용어로, 전통적인 관계형 데이터베이스의 완전한 기능을 제공하지 않지만 매우 높은 확장성을 달성하는 저장 시스템을 의미한다"
tags: ['NoSQL', 'Key Value Store', 'Big Data', 'Distributed Database', 'Scalability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/nosql
sidebar:
  order: 4
---

## 핵심 개념

NoSQL이라는 용어는 본래 SQL의 미지원을 긍정적인 특징으로 보아 붙여진 이름이다. 그러나 트랜잭션 지원과 SQL 지원 같은 데이터베이스 기능의 부재가 애플리케이션 개발을 더 복잡하게 만든다는 점이 곧 명확해졌다. 그래서 많은 키-값 저장소들이 SQL 언어와 트랜잭션 같은 기능을 지원하도록 발전해왔다.

NoSQL 시스템이 등장한 배경에는 전통적인 관계형 데이터베이스가 처리하기 어려운 규모의 데이터 관리 요구사항이 있었다. 수억 명의 사용자를 가진 웹 애플리케이션은 매우 많은 수의 비교적 작은 레코드(수 킬로바이트에서 수 메가바이트)를 저장해야 하며, 이러한 데이터를 수천에서 수만 대의 머신으로 확장할 수 있어야 했다.

NoSQL 시스템의 주요 특징은 다음과 같다:
- 키를 기반으로 한 레코드 저장 및 검색
- 제한적인 질의 기능 제공
- 높은 수평 확장성(horizontal scalability)
- CAP 정리에 따른 일관성과 가용성 간의 트레이드오프

현재 시장에서 NoSQL 시스템과 관계형 데이터베이스의 조합 사용이 일반적이다. 자주 조회되지만 단순한 키 기반 접근이 필요한 데이터(예: 사용자 프로필)는 NoSQL에, 복잡한 질의가 필요한 데이터는 관계형 데이터베이스에 저장한다.

## 예시

Google Cloud Spanner와 CockroachDB는 SQL과 원자적 트랜잭션을 지원하면서도 높은 확장성을 가진 데이터베이스로, 전통적인 NoSQL의 한계를 극복한 사례이다.

일반적인 구성 예시:
- 사용자 계정/프로필 데이터 → MongoDB (NoSQL 키-값 저장소)
- 복잡한 비즈니스 질의가 필요한 데이터 → PostgreSQL (관계형 DB)
- 자주 읽히는 데이터의 캐시 → Redis 또는 Memcached (인메모리 캐시)

## 관련 개념

- [Key-Value Store](/knowledge/database/key-value-store/)
- [Apache Spark](/knowledge/database/apache-spark/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [Hadoop Distributed File System](/knowledge/database/hadoop-distributed-file-system/)
