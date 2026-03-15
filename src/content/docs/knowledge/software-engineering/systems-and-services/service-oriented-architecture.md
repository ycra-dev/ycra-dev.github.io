---
title: "서비스 지향 아키텍처 (Service-Oriented Architecture)"
description: "SOA(Service-Oriented Architecture)는 실행 가능한 서비스를 애플리케이션에 포함할 수 있다는 아이디어에 기반한 아키텍처 스타일로, 서비스는 잘 정의되고 공개된 인터페이스를 가진다"
tags: ['Soa', 'Service Oriented', 'Web Service', 'Wsdl', 'Soap', 'Bpel', 'Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/service-oriented-architecture
sidebar:
  order: 11
---

## 핵심 개념

SOA에서 서비스 제공자는 서비스를 설계/구현하고 인터페이스를 명세하여 접근 가능한 레지스트리에 정보를 공개한다. 서비스 요청자는 서비스 명세를 발견하고 제공자를 찾아 애플리케이션을 바인딩한다. SOA의 핵심 표준 스택에는 SOAP(메시지 교환), WSDL(서비스 인터페이스 정의), WS-BPEL(워크플로우 언어)이 포함된다. 추가 지원 표준으로는 WS-Reliable Messaging, WS-Security, WS-Addressing, WS-Transactions 등이 있다. WSDL은 서비스가 무엇을 하는지(interface), 어떻게 통신하는지(binding), 어디에 있는지(endpoint)를 정의한다. SOA의 복잡성과 실행 오버헤드로 인해 RESTful 서비스가 대안으로 부상했다.

## 예시

WSDL 기반 날씨 정보 서비스는 장소와 날짜를 입력받아 해당 일자의 최고/최저 기온을 반환한다. 인터페이스에 PlaceAndDate(town, country, date), MaxMinTemp, InDataFault 등의 타입을 정의하고, getMaxMinTemps 연산을 in-out 패턴으로 명세한다.

## 관련 개념

- [RESTful 서비스 (RESTful Service)](/knowledge/software-engineering/restful-service/)
- [서비스 공학 (Service Engineering)](/knowledge/software-engineering/service-engineering/)
- [서비스 합성 (Service Composition)](/knowledge/software-engineering/service-composition/)
- [분산 시스템 (Distributed System)](/knowledge/software-engineering/distributed-system/)
- [서비스형 소프트웨어 (Software as a Service)](/knowledge/software-engineering/software-as-a-service/)
