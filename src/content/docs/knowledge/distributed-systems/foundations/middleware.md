---
title: "미들웨어 (Middleware)"
description: "미들웨어(Middleware)는 분산 시스템을 구성하는 컴퓨터들의 운영체제 위에 논리적으로 배치되는 별도의 소프트웨어 계층으로, 분산 투명성을 실현하고 애플리케이션에 동일한 인터페이스를 제공하는 역할을 한다"
tags: ['Middleware', 'Distributed Systems', 'Transparency', 'Wrapper', 'Interceptor']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/middleware
sidebar:
  order: 7
---

## 핵심 개념

미들웨어는 분산 시스템에서 운영체제가 단일 컴퓨터에서 하는 역할과 유사하다: 자원 관리자로서 애플리케이션에게 네트워크를 통해 효율적으로 자원을 공유하고 배포할 수 있게 한다.

미들웨어가 제공하는 주요 서비스:
- 애플리케이션 간 통신 기능
- 보안 서비스
- 계정/과금 서비스
- 실패 은폐 및 복구

미들웨어의 조직 방식에는 두 가지 핵심 설계 패턴이 있다:

1. **래퍼(Wrapper/Adapter)**: 레거시 컴포넌트의 인터페이스를 클라이언트가 수용 가능한 인터페이스로 변환하는 컴포넌트. N개 애플리케이션 간 직접 래핑은 O(N²)이지만, **브로커(Broker)**를 사용하면 O(N)으로 줄일 수 있다.

2. **인터셉터(Interceptor)**: 일반적인 제어 흐름을 가로채어 애플리케이션 특화 코드를 실행할 수 있게 하는 소프트웨어 구조. 예를 들어, 요청 수준 인터셉터는 복제된 객체에 대한 호출을 모든 복제본에 전달할 수 있다.

미들웨어는 **변경 가능(modifiable)**해야 한다: 런타임에 컴포넌트를 교체하거나 적응시킬 수 있어야 한다. 이를 위해 늦은 바인딩(late binding), 컴포넌트 기반 설계 등의 기법이 사용된다.

미들웨어 프로토콜의 예: DNS(이름 해석), 인증 프로토콜, 분산 커밋 프로토콜, 분산 락킹 프로토콜.

## 예시

```python
# 래퍼 패턴: Amazon S3의 RESTful 인터페이스
# 웹 서버가 HTTP 요청을 받아 S3 내부 스토리지 서비스로 변환
class S3RESTAdapter:
    def handle_request(self, http_request):
        if http_request.method == "PUT":
            return self.storage.create(http_request.uri, http_request.body)
        elif http_request.method == "GET":
            return self.storage.retrieve(http_request.uri)

# 인터셉터 패턴: 복제된 객체 호출
# 요청 수준 인터셉터가 복제본 모두에 호출 전달
def request_level_interceptor(object_ref, method, params):
    replicas = get_replicas(object_ref)
    for replica in replicas:
        invoke(replica, method, params)  # 각 복제본에 호출
```

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [분산 투명성 (Distribution Transparency)](/knowledge/distributed-systems/distribution-transparency/)
- [개방성 (Openness)](/knowledge/distributed-systems/openness/)
- [RPC (원격 프로시저 호출)](/knowledge/distributed-systems/remote-procedure-call/)
- [계층화 아키텍처 (Layered Architecture)](/knowledge/distributed-systems/layered-architecture/)
