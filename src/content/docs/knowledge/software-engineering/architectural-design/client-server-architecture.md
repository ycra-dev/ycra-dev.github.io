---
title: "Client-Server Architecture"
description: "클라이언트-서버 아키텍처는 시스템의 기능을 서비스를 제공하는 서버와 서비스를 요청하는 클라이언트로 분리하여, 네트워크를 통해 통신하는 분산 시스템 아키텍처이다"
tags: ['Client Server', 'Distributed System', 'Network Architecture', 'Server', 'Web Application']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/client-server-architecture
sidebar:
  order: 5
---

## 핵심 개념

클라이언트-서버 모델에서 서버는 특정 서비스(프린트 서비스, 파일 관리, 컴파일 서비스 등)를 제공하고, 클라이언트는 이러한 서비스를 이용하는 프로그램이다. 클라이언트와 서버는 네트워크 프로토콜을 통해 통신하며, 서버의 서비스를 여러 클라이언트가 동시에 사용할 수 있다. 웹 애플리케이션이 가장 대표적인 예이며, 서버의 확장(스케일 아웃)을 통해 부하를 분산할 수 있다.

## 예시

영화 예약 시스템: 클라이언트(웹 브라우저) → 인터넷 → 웹 서버(영화 목록 서비스) + 예약 서버(좌석 예약 서비스) + 결제 서버(결제 처리 서비스). 각 서버는 독립적으로 운영되며 클라이언트의 요청을 처리한다.

## 관련 개념

- [Architectural Patterns](/knowledge/software-engineering/architectural-patterns/)
- [Software Architecture](/knowledge/software-engineering/software-architecture/)
- [Pipe and Filter](/knowledge/software-engineering/pipe-and-filter/)
