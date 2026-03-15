---
title: "소켓 (Socket)"
description: "소켓(Socket)은 애플리케이션이 네트워크를 통해 데이터를 송수신할 수 있는 통신 엔드포인트(end point)이다"
tags: ['Socket', 'TCP', 'Berkeley Socket', 'Transient Communication', 'Zeromq', 'Mpi']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/socket
sidebar:
  order: 1
---

## 핵심 개념

**TCP 소켓 연산**:
| 연산 | 설명 |
|------|------|
| socket | 새 통신 엔드포인트 생성 |
| bind | 소켓에 로컬 주소(IP+포트) 바인딩 |
| listen | OS에 최대 대기 연결 수 지정 |
| accept | 연결 요청 도착까지 블로킹 |
| connect | 연결 요청 시도 (클라이언트) |
| send | 연결을 통해 데이터 전송 |
| receive | 연결을 통해 데이터 수신 |
| close | 연결 해제 |

**연결 지향 통신 패턴**:
- 서버: socket → bind → listen → accept → (recv/send 반복) → close
- 클라이언트: socket → connect → (send/recv 반복) → close
- accept는 새 소켓을 반환하여 원래 소켓은 다음 연결 대기 가능.

**ZeroMQ**: 소켓 기반 통신을 더 높은 수준으로 추상화.
- 연결 설정/유지를 자동 관리. 비동기 통신 지원.
- 다대일(many-to-one), 일대다(one-to-many) 통신 지원.
- 수신자가 아직 실행되지 않아도 메시지 큐잉 가능.
- **3가지 통신 패턴**:
  1. **요청-응답(REQ-REP)**: 전통적 클라이언트-서버. listen/accept 불필요.
  2. **발행-구독(PUB-SUB)**: 서버가 발행, 클라이언트가 구독한 메시지만 수신. 멀티캐스트 구현.
  3. **파이프라인(PUSH-PULL)**: 작업을 밀어내고 가용한 워커가 당김. 부하 분산.

**MPI(Message-Passing Interface)**: 고성능 병렬 컴퓨팅을 위한 표준화된 메시지 패싱. 일시적 통신 지원. 프로세스 그룹 기반 주소 지정 (groupID, processID). 650+ 연산 제공. MPI_BSEND(비동기), MPI_SEND(블로킹), MPI_SSEND(동기), MPI_SENDRECV(RPC 유사) 등.

## 예시

```python
# TCP 소켓 기반 클라이언트-서버
from socket import *

# 서버
class Server:
    def run(self):
        s = socket(AF_INET, SOCK_STREAM)
        s.bind((HOST, PORT))
        s.listen(1)
        (conn, addr) = s.accept()        # 연결 수락
        while True:
            data = conn.recv(1024)        # 데이터 수신
            if not data: break
            conn.send(data + b"*")        # 응답 전송
        conn.close()

# 클라이언트
class Client:
    def run(self):
        s = socket(AF_INET, SOCK_STREAM)
        s.connect((HOST, PORT))           # 서버에 연결
        s.send(b"Hello, world")           # 데이터 전송
        data = s.recv(1024)               # 응답 수신
        print(data)                       # b"Hello, world*"
        s.close()

# ZeroMQ 요청-응답 패턴
import zmq
# 서버: socket(zmq.REP), bind, recv, send
# 클라이언트: socket(zmq.REQ), connect, send, recv
# → listen, accept 불필요. 비동기 연결. 서버 미실행 시에도 큐잉.
```

## 관련 개념

- [RPC (원격 프로시저 호출)](/knowledge/distributed-systems/remote-procedure-call/)
- [메시지 지향 미들웨어 (Message-Oriented Middleware)](/knowledge/distributed-systems/message-oriented-middleware/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [계층화 아키텍처 (Layered Architecture)](/knowledge/distributed-systems/layered-architecture/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
