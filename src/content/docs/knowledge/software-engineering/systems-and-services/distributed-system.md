---
title: "Distributed System"
description: "분산 시스템은 사용자에게 단일한 일관성 있는 시스템으로 보이는 독립적인 컴퓨터들의 집합으로, 네트워크로 연결된 여러 컴퓨터에서 실행되는 시스템이다"
tags: ['Distributed System', 'Scalability', 'Transparency', 'Fault Tolerance', 'Concurrency', 'Network']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/distributed-system
sidebar:
  order: 7
---

## 핵심 개념

분산 시스템의 주요 이점은 자원 공유, 개방성, 동시성, 확장성, 장애 허용성이다. 설계 시 고려해야 할 핵심 이슈로는 투명성(분산 여부를 사용자에게 숨기는 정도), 개방성(표준 프로토콜 사용 여부), 확장성(크기, 분산, 관리 가능성의 세 차원), 보안(가로채기, 중단, 변조, 위조 공격에 대한 방어), 서비스 품질(응답 시간, 처리량), 장애 관리(장애 감지, 격리, 복구)가 있다. 분산 시스템에서의 상호작용 모델에는 절차적 상호작용(RPC)과 메시지 기반 상호작용이 있으며, 각각 장단점이 있다. 확장 방식에는 스케일 업(더 강력한 자원으로 교체)과 스케일 아웃(추가 자원 투입)이 있다.

## 예시

인터넷 뱅킹 시스템은 고객의 웹 브라우저(클라이언트), 웹 서버(데이터 관리 및 애플리케이션 서비스), 고객 계좌 데이터베이스(메인프레임)로 구성된 3계층 분산 시스템이다.

## 관련 개념

- [Client-Server Computing](/knowledge/software-engineering/client-server-computing/)
- [Middleware](/knowledge/software-engineering/middleware/)
- [Peer-to-Peer Architecture](/knowledge/software-engineering/peer-to-peer-architecture/)
- [Software as a Service](/knowledge/software-engineering/software-as-a-service/)
- [Service-Oriented Architecture](/knowledge/software-engineering/service-oriented-architecture/)
