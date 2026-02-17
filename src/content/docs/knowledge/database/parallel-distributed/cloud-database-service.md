---
title: "Cloud Database Service"
description: "클라우드 데이터베이스 서비스는 클라우드 컴퓨팅 모델을 기반으로 데이터베이스 기능을 원격으로 제공하는 서비스이다"
tags: ['Cloud Computing', 'Iaas', 'Paas', 'Saas', 'Database As A Service', 'Virtualization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/cloud-database-service
sidebar:
  order: 4
---

## 핵심 개념

클라우드 서비스 모델은 세 가지 계층으로 구분된다.

**Infrastructure-as-a-Service (IaaS)**: 가상 머신(VM)이나 컨테이너 형태로 컴퓨팅 인프라를 제공한다. 클라이언트가 직접 데이터베이스 시스템을 설치하고 관리해야 한다. VM은 하이퍼바이저 위에서 각각 독립된 운영 체제를 실행하며, 컨테이너는 OS 커널을 공유하므로 더 가볍다.

**Platform-as-a-Service (PaaS)**: 데이터 저장소, 데이터베이스, 애플리케이션 서버 등의 플랫폼을 제공한다. Database-as-a-Service가 여기에 해당하며, 클라이언트는 SQL 등으로 데이터베이스를 직접 사용할 수 있다. 초기에는 단일 노드 데이터베이스만 지원했으나, 최근에는 병렬 데이터베이스 시스템도 서비스로 제공된다.

**Software-as-a-Service (SaaS)**: 애플리케이션 소프트웨어 자체를 서비스로 제공한다. 클라이언트는 소프트웨어 설치나 업그레이드에 신경 쓰지 않아도 된다.

클라우드의 핵심 장점은 **탄력성(elasticity)**이다. 수요에 따라 컴퓨팅 자원을 빠르게 확장하거나 축소할 수 있다. Docker는 널리 사용되는 컨테이너 플랫폼이며, Kubernetes는 컨테이너 오케스트레이션과 마이크로서비스 아키텍처를 지원하는 플랫폼이다. Kubernetes는 선언적으로 컨테이너 요구사항을 명세하면 자동으로 배포, 연결, 로드 밸런싱을 수행한다.

보안 및 법적 이슈도 중요한 고려 사항이다. 데이터가 외부 조직에 저장되므로 보안 침해 위험이 있으며, 데이터가 다른 국가에 복제될 경우 해당 국가의 개인정보보호법이 적용될 수 있다.

## 예시

```
클라우드 서비스 모델 비교:

IaaS (예: AWS EC2, Azure VM)
├── 클라이언트가 VM 위에 직접 DB 설치
├── 장점: 완전한 제어
└── 단점: 유지보수 부담

PaaS - Database-as-a-Service (예: AWS RDS, Azure SQL Database)
├── DB 엔진이 이미 설치/관리됨
├── 장점: 백업, 패치, 스케일링 자동화
└── 단점: 제한된 커스터마이징

SaaS (예: Salesforce, Google Workspace)
├── 애플리케이션 + DB 모두 제공
├── 장점: 즉시 사용 가능
└── 단점: 최소한의 제어

컨테이너 vs VM:
VM:  [App + Libs + OS Kernel] × N → 높은 오버헤드
컨테이너: [App + Libs] × N + 공유 OS Kernel → 낮은 오버헤드
```

## 관련 개념

- [Shared-Disk Architecture](/knowledge/database/shared-disk-architecture/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
- [Replication](/knowledge/database/replication/)
