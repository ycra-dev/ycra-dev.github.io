---
title: "Remote Procedure Call"
description: "원격 프로시저 호출(RPC, Remote Procedure Call)은 다른 머신에 위치한 프로시저를 로컬 프로시저 호출처럼 투명하게 호출할 수 있게 하는 통신 메커니즘이다"
tags: ['Rpc', 'Client Stub', 'Server Stub', 'Idl', 'Access Transparency', 'Distributed Computing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/remote-procedure-call
sidebar:
  order: 2
---

## 핵심 개념

**RPC의 동작 원리**:
호출자(클라이언트)와 피호출자(서버)가 다른 주소 공간에서 실행되므로, 스텁(stub)이 메시지 패싱을 숨긴다.

**RPC 10단계 실행 과정**:
1. 클라이언트가 클라이언트 스텁을 정상적으로 호출
2. 클라이언트 스텁이 메시지를 구성하고 로컬 OS 호출
3. 클라이언트 OS가 메시지를 원격 OS로 전송
4. 원격 OS가 메시지를 서버 스텁에 전달
5. 서버 스텁이 파라미터를 언팩하고 서버 호출
6. 서버가 작업을 수행하고 결과를 스텁에 반환
7. 서버 스텁이 결과를 메시지로 포장하고 로컬 OS 호출
8. 서버 OS가 메시지를 클라이언트 OS로 전송
9. 클라이언트 OS가 메시지를 클라이언트 스텁에 전달
10. 스텁이 결과를 언팩하고 클라이언트에 반환

**IDL(Interface Definition Language)**: 클라이언트와 서버 간의 인터페이스를 명세하는 언어. IDL로 인터페이스를 정의하면 클라이언트 스텁과 서버 스텁이 자동 생성됨. 클라이언트와 서버를 다른 언어로 작성 가능.

**언어 기반 RPC**: Java의 RMI(Remote Method Invocation)가 대표적. 프로그래밍 언어에 원격 호출이 완전히 내장되어, 로컬 객체와 원격 객체 호출을 소스 코드에서 구분하기 어려움.

**RPC의 핵심 과제**:
- 호출자와 피호출자가 다른 주소 공간 → 포인터/참조 전달이 복잡
- 다른 머신 아키텍처(엔디안, 데이터 표현) → 마샬링 필요
- 양쪽 머신의 크래시 가능성 → 장애 처리 복잡

## 예시

```python
# Python RPyC를 사용한 RPC 예시

# 서버
import rpyc
from rpyc.utils.server import ForkingServer

class DBList(rpyc.Service):
    value = []

    def exposed_append(self, data):
        self.value.extend(str(data))
        return self.value

server = ForkingServer(DBList, hostname=SERVER, port=PORT)
server.start()

# 클라이언트
conn = rpyc.connect(SERVER, PORT)
conn.root.exposed_append(2)      # 원격 호출이 로컬 호출처럼 보임
conn.root.exposed_append(4)
print(conn.root.exposed_value()) # 결과: ['2', '4']

# 스텁 기반 RPC 구조
# 클라이언트 프로세스:  [호출 코드] → [클라이언트 스텁] → [OS]
#                                                         ↓ 네트워크
# 서버 프로세스:       [구현 코드] ← [서버 스텁]      ← [OS]
```

## 관련 개념

- [Parameter Marshaling](/knowledge/distributed-systems/parameter-marshaling/)
- [Asynchronous RPC](/knowledge/distributed-systems/asynchronous-rpc/)
- [Service-Oriented Architecture](/knowledge/distributed-systems/service-oriented-architecture/)
- [Middleware](/knowledge/distributed-systems/middleware/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
