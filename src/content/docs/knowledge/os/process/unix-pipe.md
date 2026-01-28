---
title: "UNIX 파이프 (Pipe)"
description: "두 프로세스 간 단방향 바이트 스트림을 제공하는 가장 전통적인 UNIX IPC 메커니즘"
tags: ["OS", "Process", "IPC", "Pipe"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/os/unix-pipe
sidebar:
  order: 22
---

## 핵심 개념

파이프(Pipe)는 두 프로세스 간 단방향 바이트 스트림을 제공하는 가장 전통적인 UNIX IPC 메커니즘입니다. 프로세스들이 데이터를 주고받으려면 임시 파일이나 복잡한 동기화가 필요한데, 파이프는 셸의 파이프라인(`|`)을 지원하고 부모-자식 프로세스 간 간단한 데이터 전달 수단을 제공합니다.

## 동작 원리

무명 파이프는 `fork()` 관계의 프로세스 간에만 사용할 수 있습니다.

1. **`pipe()` 시스템 콜**: 두 개의 파일 디스크립터 반환
   - `fd[0]`: 읽기 끝 (read end)
   - `fd[1]`: 쓰기 끝 (write end)
2. **`fork()` 이후 설정**:
   - 생산자(writer): `fd[0]` 닫고 `fd[1]`에 `write()`
   - 소비자(reader): `fd[1]` 닫고 `fd[0]`에서 `read()`
3. **블로킹 동작**:
   - 빈 파이프에서 `read()` → 데이터 올 때까지 블록
   - 가득 찬 파이프에 `write()` → 공간 생길 때까지 블록
4. FreeBSD에서 파이프는 소켓 메커니즘 위에 구현되어 가변 크기 버퍼를 가짐

```c
int fd[2];
pipe(fd);  // fd[0]=read, fd[1]=write

if (fork() == 0) {
    // 자식: 쓰기 역할
    close(fd[0]);
    write(fd[1], "hello", 5);
    close(fd[1]);
} else {
    // 부모: 읽기 역할
    close(fd[1]);
    char buf[10];
    read(fd[0], buf, 5);
    close(fd[0]);
}
```

## 예시

파이프는 "물 호스"와 같습니다. 한쪽에서 물을 넣으면(write) 다른 쪽에서 나옵니다(read).

셸 파이프라인 `ls | grep txt | wc -l`:

```
ls ──write──> [pipe1] ──read──> grep ──write──> [pipe2] ──read──> wc
```

셸이 각 명령 사이에 파이프를 생성하고, stdout을 파이프 쓰기 끝으로, stdin을 읽기 끝으로 리다이렉션합니다.

- 매우 간단한 API (`pipe`, `read`, `write`, `close`)
- 파일 디스크립터 인터페이스로 표준 I/O와 호환
- 데이터가 메모리에 버퍼링되어 디스크 I/O 불필요
- 단점: 단방향만 지원, `fork()` 관계 프로세스만 사용 가능, 네트워크 통신 불가

## Named Pipe (FIFO)

| 특성 | Ordinary Pipe (무명) | Named Pipe (FIFO) |
|------|---------------------|-------------------|
| **관계** | 부모-자식 필요 | 관계 불필요 |
| **방향** | 단방향 | 양방향 (half-duplex) |
| **존속** | 프로세스 종료 시 소멸 | 파일 시스템에 존재 |
| **생성** | `pipe()` | `mkfifo()` |

### UNIX vs Windows 파이프

| 특성 | UNIX | Windows |
|------|------|---------|
| **Ordinary** | 단방향 | 양방향 가능 |
| **Named** | half-duplex FIFO | full-duplex, 네트워크 지원 |
| **통신 범위** | 같은 머신 | 다른 머신 간 가능 |

## 관련 개념

- [UNIX 프로세스 모델](/knowledge/os/unix-process-model/)
- [UNIX 파일 디스크립터 (File Descriptor)](/knowledge/os/unix-file-descriptor/)
- [UNIX 소켓 (Socket)](/knowledge/os/unix-socket/) — 양방향, 네트워크 지원
