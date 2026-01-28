---
title: "UNIX 소켓 (Socket)"
description: "통신의 양 끝점을 추상화한 것으로, 로컬 및 네트워크 프로세스 간 통신을 위한 범용 인터페이스"
tags: ["OS", "Process", "IPC", "Socket", "Network"]
created: 2026-01-23
updated: 2026-01-27

draft: true
slug: knowledge/os/unix-socket
sidebar:
  order: 23
---

## 핵심 개념

소켓(Socket)은 통신의 양 끝점(endpoint)을 추상화한 것으로, 로컬 및 네트워크 프로세스 간 통신을 위한 범용 인터페이스입니다. 파이프는 로컬의 관련 프로세스 간에만 단방향 통신이 가능하므로, 분산 시스템과 네트워크 애플리케이션 지원을 위해 범용 IPC 메커니즘이 필요했습니다.

## 동작 원리

소켓은 통신 도메인, 소켓 유형, 프로토콜로 특성화됩니다.

### 통신 도메인

- `AF_UNIX`: 같은 머신 내 통신 (경로명 주소)
- `AF_INET`: 인터넷 통신 (IP 주소 + 포트)

### 소켓 유형

| 유형 | 특성 | 프로토콜 |
|------|------|----------|
| `SOCK_STREAM` | 신뢰성, 순서 보장, 양방향 | TCP |
| `SOCK_DGRAM` | 비신뢰성, 레코드 경계 보존 | UDP |
| `SOCK_RAW` | 프로토콜 직접 접근 | - |

### 클라이언트-서버 모델

- **서버**: `socket()` → `bind()` → `listen()` → `accept()`
- **클라이언트**: `socket()` → `connect()`
- **연결 후**: `read()`/`write()` 또는 `send()`/`recv()`

```c
// 서버
int server_fd = socket(AF_INET, SOCK_STREAM, 0);
bind(server_fd, &addr, sizeof(addr));
listen(server_fd, 5);
int client_fd = accept(server_fd, NULL, NULL);
read(client_fd, buf, size);
write(client_fd, response, len);
close(client_fd);

// 클라이언트
int sock = socket(AF_INET, SOCK_STREAM, 0);
connect(sock, &server_addr, sizeof(server_addr));
write(sock, request, len);
read(sock, buf, size);
close(sock);
```

### Well-known Ports

| 포트 | 서비스 |
|------|--------|
| 22 | SSH |
| 21 | FTP |
| 80 | HTTP |
| 443 | HTTPS |

- 클라이언트는 1024 이상의 임의 포트를 할당받음
- 각 연결은 **고유한 소켓 쌍**(클라이언트 IP:포트, 서버 IP:포트)으로 식별

### Loopback 주소

- `127.0.0.1`: 자기 자신을 가리키는 특수 IP
- 같은 호스트의 클라이언트-서버 테스트에 사용

## 예시

소켓은 "전화기"와 같습니다. 전화번호(주소)로 연결을 시도하고, 연결되면 양방향 대화가 가능합니다.

웹 서버 시나리오:

```
서버 (port 80)              클라이언트
     │                           │
 socket()                    socket()
 bind(80)                        │
 listen()                        │
     │<─────── connect() ────────│
 accept()                        │
     │<─────── GET /index ───────│
     │──────── HTML ────────────>│
 close()                     close()
```

- 로컬과 네트워크 통신 모두 지원
- 무관한 프로세스 간 통신 가능 (well-known 포트)
- `select()`로 멀티플렉싱 가능
- 단점: 파이프보다 복잡한 API, 연결 설정 오버헤드(특히 TCP)

### Java 소켓 클래스

| 클래스 | 프로토콜 | 특성 |
|--------|----------|------|
| `Socket` | TCP | 연결 지향, 신뢰성 보장 |
| `DatagramSocket` | UDP | 비연결, 빠름, 신뢰성 낮음 |
| `MulticastSocket` | UDP | 여러 수신자에게 전송 |

```java
// Server
ServerSocket sock = new ServerSocket(6013);
while (true) {
    Socket client = sock.accept();
    PrintWriter out = new PrintWriter(client.getOutputStream(), true);
    out.println(new java.util.Date().toString());
    client.close();
}

// Client
Socket sock = new Socket("127.0.0.1", 6013);
BufferedReader in = new BufferedReader(
    new InputStreamReader(sock.getInputStream()));
String line = in.readLine();
System.out.println(line);
sock.close();
```

## 관련 개념

- [UNIX 파이프 (Pipe)](/knowledge/os/unix-pipe/) — 단순하지만 제한적
- [UNIX 파일 디스크립터 (File Descriptor)](/knowledge/os/unix-file-descriptor/)
- [TCP/IP 프로토콜](/knowledge/network/tcp-ip/)
- [UDP vs TCP](/knowledge/network/udp-vs-tcp/)
