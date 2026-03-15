---
title: "서비스형 소프트웨어 (Software as a Service)"
description: "SaaS(Software as a Service)는 소프트웨어를 원격으로 호스팅하고 인터넷을 통해 접근을 제공하는 소프트웨어 배포 방식으로, 소프트웨어 제공자가 소유하고 관리한다"
tags: ['Saas', 'Cloud Computing', 'Multi Tenancy', 'Scalability', 'Subscription', 'Web Service']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-as-a-service
sidebar:
  order: 7
---

## 핵심 개념

SaaS의 핵심 요소는 소프트웨어가 서버(또는 클라우드)에 배포되어 웹 브라우저를 통해 접근하고, 소프트웨어 제공자가 소유/관리하며, 사용량이나 구독 기반으로 비용을 지불하는 것이다. 비즈니스용 SaaS 구현 시 고려해야 할 세 가지 요소는 구성 가능성(configurability), 다중 테넌시(multi-tenancy), 확장성(scalability)이다. 다중 테넌시는 여러 사용자가 같은 시스템에 접근하면서도 각각 전용 시스템을 사용하는 것처럼 보이게 하는 것이다. 확장성을 위해 무상태 서비스 설계, 비동기 상호작용, 자원 풀 관리, 세밀한 데이터베이스 잠금, 클라우드 PaaS 플랫폼 활용 등의 지침이 권장된다. SaaS와 SOA는 관련되지만 같은 것이 아니며, SaaS는 기능 제공 방식이고 SOA는 구현 기술이다.

## 예시

Gmail, Google Docs, Office 365, Salesforce CRM 등이 대표적인 SaaS이다. Google Docs는 모든 사용자에게 동일한 경험을 제공하는 소비자용 SaaS이고, Salesforce는 기업 고객별로 맞춤 구성이 가능한 비즈니스용 SaaS이다.

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/software-engineering/distributed-system/)
- [서비스 지향 아키텍처 (Service-Oriented Architecture)](/knowledge/software-engineering/service-oriented-architecture/)
- [클라이언트-서버 컴퓨팅 (Client-Server Computing)](/knowledge/software-engineering/client-server-computing/)
- [피어투피어 아키텍처 (Peer-to-Peer Architecture)](/knowledge/software-engineering/peer-to-peer-architecture/)
