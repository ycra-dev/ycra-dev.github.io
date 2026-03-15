---
title: "RESTful 서비스 (RESTful Service)"
description: "RESTful 서비스는 REST(Representational State Transfer) 아키텍처 스타일에 기반한 경량 웹 서비스 접근 방식으로, 리소스에 대한 표준 HTTP 연산(POST, GET, PUT, DELETE)을 사용한다"
tags: ['REST', 'Restful', 'HTTP', 'JSON', 'Stateless', 'Crud', 'Web API', 'Resource']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/restful-service
sidebar:
  order: 13
---

## 핵심 개념

RESTful 아키텍처에서는 모든 것이 리소스로 표현되며, 각 리소스는 고유한 URL을 가진다. 리소스에 대한 네 가지 기본 연산은 Create(POST), Read(GET), Update(PUT), Delete(DELETE)이다. SOAP 기반 서비스와 달리 RESTful 서비스는 XML에 국한되지 않고 JSON 등 더 효율적인 표현을 사용할 수 있다. 무상태성(statelessness)이 핵심 설계 원칙으로, 리소스 자체는 상태 정보를 포함하지 않는다. 모바일 기기의 제한된 처리 능력에서 더 나은 성능을 제공하여 널리 사용되고 있다. 단, 복잡한 인터페이스의 서비스 설계 어려움, 인터페이스 표준 부재, QoS/신뢰성 인프라 부재 등의 한계가 있다.

## 예시

날씨 데이터 조회를 RESTful 방식으로 구현하면:

```
GET http://weather-info-example.net/temperatures/boston?date=20140226&country=USA&state="Mass"
```

JSON 응답:
```json
{
  "place": "Boston",
  "country": "USA",
  "state": "Mass",
  "date": "26 Feb 2014",
  "units": "Fahrenheit",
  "max temp": 41,
  "min temp": 29
}
```

## 관련 개념

- [서비스 지향 아키텍처 (Service-Oriented Architecture)](/knowledge/software-engineering/service-oriented-architecture/)
- [서비스 공학 (Service Engineering)](/knowledge/software-engineering/service-engineering/)
- [서비스 합성 (Service Composition)](/knowledge/software-engineering/service-composition/)
- [서비스형 소프트웨어 (Software as a Service)](/knowledge/software-engineering/software-as-a-service/)
