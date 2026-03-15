---
title: "서비스 지향 아키텍처 (Service-Oriented Architecture)"
description: "서비스 지향 아키텍처(SOA, Service-Oriented Architecture)는 분산 애플리케이션을 독립적인 서비스들의 조합으로 구성하는 아키텍처 스타일이다"
tags: ['Soa', 'Microservice', 'Distributed Object', 'Service Composition', 'Software Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/service-oriented-architecture
sidebar:
  order: 2
---

## 핵심 개념

SOA의 핵심 개념:

**객체 기반 스타일(Object-Based Style)**: SOA의 기초를 형성한다. 분산 객체에서 클라이언트는 프록시(proxy)를 통해 원격 객체를 호출하고, 서버 측의 스켈레톤(skeleton)이 요청을 언마샬링하여 실제 메서드를 호출한다. 분산 객체의 상태는 일반적으로 단일 머신에 위치하며, 인터페이스만 다른 머신에서 사용 가능하다.

**마이크로서비스(Microservice)**: Unix의 "작고 독립적인 프로그램의 조합" 철학에서 영감을 받은 아키텍처. 각 마이크로서비스는 별도의 네트워크 프로세스로 실행되며, 모듈화가 핵심 설계 원칙이다. 크기보다 독립성이 중요하다.

**조대립 서비스 조합(Coarse-Grained Composition)**: SOA에서 분산 시스템은 여러 서비스의 조합으로 구성된다. 서로 다른 관리 조직의 서비스를 결합할 수 있다. 예: 웹 상점이 결제를 외부 서비스에 위임. 마이크로서비스의 모음으로 하나의 큰 서비스를 구현하는 것이 일반적이다.

서비스 조합의 핵심 과제는 각 서비스가 자체 인터페이스를 제공하기 때문에 통합이 복잡해질 수 있다는 것이다.

## 예시

```python
# 분산 객체의 프록시-스켈레톤 패턴
# 클라이언트 측
class Proxy:
    """원격 객체와 동일한 인터페이스를 제공"""
    def invoke_method(self, method_name, *args):
        message = marshal(method_name, args)  # 파라미터를 메시지로 변환
        response = send_to_server(message)     # 네트워크를 통해 전송
        return unmarshal(response)              # 응답을 반환값으로 변환

# 서버 측
class Skeleton:
    """들어오는 요청을 실제 객체 메서드로 변환"""
    def handle_request(self, message):
        method_name, args = unmarshal(message)  # 메시지를 파라미터로 변환
        result = actual_object.call(method_name, *args)  # 실제 메서드 호출
        return marshal(result)                   # 결과를 메시지로 변환

# 마이크로서비스 조합 예: 전자상거래
# 주문 서비스 → 결제 서비스(외부) → 배송 서비스
# 각 서비스는 독립적으로 배포, 확장, 업데이트 가능
```

## 관련 개념

- [계층화 아키텍처 (Layered Architecture)](/knowledge/distributed-systems/layered-architecture/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [RESTful 아키텍처 (RESTful Architecture)](/knowledge/distributed-systems/restful-architecture/)
- [RPC (원격 프로시저 호출)](/knowledge/distributed-systems/remote-procedure-call/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
