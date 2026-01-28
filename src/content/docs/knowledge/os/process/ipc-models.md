---
title: "프로세스 간 통신 모델 (IPC Models)"
description: "프로세스 간 정보 교환을 위한 두 가지 일반적 모델: 메시지 패싱 모델과 공유 메모리 모델"
tags: ["OS", "IPC", "Process"]
created: 2026-01-22
updated: 2026-01-27
draft: true
slug: knowledge/os/ipc-models
sidebar:
  order: 21
---

## 핵심 개념

프로세스 간 통신(IPC)은 한 프로세스가 다른 프로세스와 정보를 교환하는 메커니즘이다. 프로세스는 기본적으로 독립된 주소 공간을 가지므로 서로의 데이터에 직접 접근할 수 없다.

| 유형 | 설명 |
|------|------|
| **독립 프로세스** | 다른 프로세스와 데이터를 공유하지 않음 |
| **협력 프로세스** | 다른 프로세스에 영향을 주거나 받음 → IPC 필요 |

협력이 필요한 이유:
1. **정보 공유**: 여러 앱이 같은 데이터 필요 (예: 복사-붙여넣기)
2. **계산 속도 향상**: 작업을 분할하여 병렬 처리 (멀티코어 활용)
3. **모듈성**: 시스템 기능을 분리된 프로세스로 구성

## 두 가지 통신 모델

```
┌─────────────────┐    ┌─────────────────┐
│ 메시지 패싱     │    │ 공유 메모리     │
│                 │    │                 │
│  프로세스 A     │    │  프로세스 A     │
│       ↕         │    │       ↕         │
│   메시지 큐     │    │   공유 영역     │
│       ↕         │    │       ↕         │
│  프로세스 B     │    │  프로세스 B     │
└─────────────────┘    └─────────────────┘
```

### 메시지 패싱 모델

프로세스가 `send(message)`와 `receive(message)` 연산으로 메시지를 교환하여 정보를 전달합니다.

**통신 과정**:
1. `get_hostid()`, `get_processid()`로 식별자 획득
2. `open_connection()` 또는 `open()`으로 연결 열기
3. 수신 프로세스가 `accept_connection()`으로 통신 허용
4. `read_message()`, `write_message()`로 메시지 교환
5. `close_connection()`으로 연결 종료

**Naming (명명 방식)**:

| 방식 | 설명 | 특징 |
|------|------|------|
| **Direct** | 송수신자를 명시적으로 지정 | 링크 자동 설정, 두 프로세스 간 하나의 링크 |
| **Indirect** | 메일박스(포트)를 통해 통신 | 여러 프로세스 연결 가능, 유연성 향상 |

**Synchronization (동기화 방식)**:

| 방식 | send() | receive() |
|------|--------|-----------|
| **Blocking (동기)** | 수신될 때까지 대기 | 메시지 올 때까지 대기 |
| **Non-blocking (비동기)** | 보내고 바로 반환 | 메시지 없으면 null 반환 |

둘 다 blocking이면 **rendezvous**(랑데부): 송수신자가 동시에 만남

**Buffering (버퍼링)**:

| 용량 | 동작 |
|------|------|
| Zero capacity | 버퍼 없음, sender 항상 대기 |
| Bounded capacity | n개 저장 가능, 가득 차면 sender 대기 |
| Unbounded capacity | 무제한, sender 절대 대기 안 함 |

**Mach OS 메시지 패싱**: 모든 IPC가 포트(port) 기반 메시지 패싱으로 구현. macOS/iOS의 기반 기술.

### 공유 메모리 모델

프로세스가 `shared_memory_create()`와 `shared_memory_attach()`로 다른 프로세스 메모리 영역에 접근합니다. 일반적으로 운영체제가 프로세스 간 메모리 접근을 방지하지만, 공유 메모리는 이 제한 해제에 동의합니다.

**중요 사항**:
- 공유 영역에서 데이터를 읽고 쓰며 정보 교환
- 데이터 형식은 프로세스가 결정 (운영체제 제어 밖)
- **동기화 책임**: 동시에 같은 위치에 쓰지 않도록 프로세스가 보장해야 함
- 커널 개입 없이 일반 메모리 접근처럼 작동 (설정 후에는)

**POSIX 공유 메모리 API**:
```c
// 1. 공유 메모리 객체 생성
int fd = shm_open(name, O_CREAT | O_RDWR, 0666);

// 2. 크기 설정
ftruncate(fd, 4096);

// 3. 메모리 매핑
char *ptr = mmap(0, SIZE, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0);

// 4. 사용 후 해제
shm_unlink(name);
```

**Producer-Consumer 패턴** (공유 메모리의 대표적 사용):

| 버퍼 유형 | 설명 |
|-----------|------|
| Unbounded Buffer | 버퍼 크기 무제한, Producer는 항상 생산 가능 |
| Bounded Buffer | 버퍼 크기 고정, 가득 차면 Producer 대기 |

```c
#define BUFFER_SIZE 10
item buffer[BUFFER_SIZE];
int in = 0, out = 0;
// 비어있음: in == out
// 가득 참: ((in + 1) % BUFFER_SIZE) == out

// Producer
while (true) {
    while (((in + 1) % BUFFER_SIZE) == out) ;
    buffer[in] = next_produced;
    in = (in + 1) % BUFFER_SIZE;
}

// Consumer
while (true) {
    while (in == out) ;
    next_consumed = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
}
```

## 비교

| 특성 | 메시지 패싱 | 공유 메모리 |
|------|------------|------------|
| 데이터 크기 | 작은 데이터에 적합 | 대용량 데이터에 적합 |
| 충돌 회피 | 충돌 없음 | 동기화 필요 |
| 컴퓨터 간 통신 | 구현 용이 | 구현 어려움 |
| 속도 | 상대적으로 느림 | 메모리 전송 속도로 최대 속도 |
| 보호/동기화 | 운영체제가 관리 | 프로세스가 관리해야 함 |

### 시스템 콜 예시

| 카테고리 | Windows | UNIX |
|----------|---------|------|
| 파이프 생성 | CreatePipe() | pipe() |
| 공유 메모리 생성 | CreateFileMapping() | shm_open() |
| 공유 메모리 연결 | MapViewOfFile() | mmap() |

### 대표적인 IPC 구현

| 모델 | 구현 |
|------|------|
| **공유 메모리** | POSIX shared memory, mmap |
| **메시지 패싱** | 파이프, FIFO, 메시지 큐, 소켓, Mach ports, Windows ALPC |
| **클라이언트-서버** | 소켓, RPC |

## 예시

- 웹 서버가 데이터베이스 프로세스와 메시지 패싱으로 통신
- 두 프로세스가 공유 메모리 영역에서 대용량 데이터 고속 교환
- 스레드는 기본적으로 일부 메모리를 공유
- **Chrome 브라우저**: 멀티프로세스 아키텍처 사용 (탭마다 별도 프로세스). 브라우저 프로세스, 렌더러 프로세스, 플러그인 프로세스 간 IPC로 통신. 한 탭 충돌이 전체에 영향을 주지 않음

## 장단점

**메시지 패싱**:
- 장점: 충돌 없음, 네트워크 통신 용이, 구현 단순
- 단점: 속도 느림, 오버헤드

**공유 메모리**:
- 장점: 최대 속도, 대용량 데이터 효율적
- 단점: 동기화/보호 문제, 같은 컴퓨터 내에서만 용이

## 관련 개념

- [프로세스 (Process)](/knowledge/os/process/) - IPC의 주체
- [UNIX 파이프 (Pipe)](/knowledge/os/unix-pipe/) - 대표적인 메시지 패싱 구현
- [UNIX 소켓 (Socket)](/knowledge/os/unix-socket/) - 네트워크까지 확장 가능한 IPC
- [유한 버퍼 문제 (Bounded-Buffer)](/knowledge/os/bounded-buffer/) - 공유 메모리 기반 동기화 문제
- [Linux IPC](/knowledge/os/linux-ipc/) - Linux의 구체적인 IPC 메커니즘
