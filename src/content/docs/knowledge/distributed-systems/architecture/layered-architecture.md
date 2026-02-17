---
title: "Layered Architecture"
description: "계층 구조(Layered Architecture)는 소프트웨어 컴포넌트를 계층적으로 조직하여, 상위 계층의 컴포넌트가 하위 계층의 컴포넌트에 대해 다운콜(downcall)을 수행하고 응답을 받는 분산 시스템의 대표적인 아키텍처 스타일이다"
tags: ['Architectural Style', 'Layered Design', 'Software Architecture', 'Protocol Stack']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/layered-architecture
sidebar:
  order: 1
---

## 핵심 개념

계층 구조에는 세 가지 일반적인 형태가 있다:

1. **순수 계층 구조(Pure Layered)**: 바로 아래 계층에만 다운콜을 수행. 네트워크 통신에서 일반적.
2. **혼합 계층 구조(Mixed Layered)**: 하위의 여러 계층에 대해 다운콜 가능. 예: 애플리케이션이 수학 라이브러리와 OS 라이브러리를 동시에 사용.
3. **업콜 계층 구조(Layered with Upcalls)**: 하위 계층이 상위 계층을 호출하는 예외적 경우. 예: OS의 이벤트 발생 시 사용자 정의 핸들러 호출.

애플리케이션 계층화에서는 대부분의 분산 애플리케이션을 세 가지 논리적 수준으로 구분한다:
- **애플리케이션 인터페이스 수준**: 사용자 또는 외부 애플리케이션과의 상호작용
- **처리 수준**: 애플리케이션의 핵심 기능
- **데이터 수준**: 데이터베이스 또는 파일 시스템 운영

통신 프로토콜 스택이 계층 구조의 가장 잘 알려진 예이며, 각 계층은 서비스(service), 인터페이스(interface), 프로토콜(protocol)의 세 가지 개념으로 구성된다. 계층 구조는 다른 아키텍처 스타일과 결합되어 사용되는 것이 보편적이다.

## 예시

```
# 3계층 애플리케이션 구조 예: 인터넷 부동산 검색 엔진

[사용자 인터페이스 계층]
  - 도시, 가격대, 주택 유형 등 검색 조건 입력 폼

[처리 계층]
  - 입력된 조건을 데이터베이스 질의로 변환
  - 결과를 관련성에 따라 정렬
  - HTML 페이지 생성

[데이터 계층]
  - 현재 매물 중인 주택 정보를 저장하는 대규모 데이터베이스

# 통신 프로토콜 스택의 계층 구조
# 각 계층은 아래 계층의 서비스를 사용하여 상위 계층에 서비스를 제공
# 예: TCP는 IP 위에서 신뢰할 수 있는 연결 지향 서비스를 제공
```

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Middleware](/knowledge/distributed-systems/middleware/)
- [Service-Oriented Architecture](/knowledge/distributed-systems/service-oriented-architecture/)
- [Publish-Subscribe](/knowledge/distributed-systems/publish-subscribe/)
