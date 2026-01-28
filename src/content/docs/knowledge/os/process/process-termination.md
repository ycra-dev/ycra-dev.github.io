---
title: "프로세스 종료와 Zombie/Orphan"
description: "프로세스 종료 방식과 Zombie(좀비), Orphan(고아) 프로세스의 처리"
tags: ["OS", "Process"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/process-termination
sidebar:
  order: 5
---

## 핵심 개념

프로세스는 정상적으로 끝나기도 하고, 비정상적으로 종료되기도 한다. 문제는 **종료 이후에도 남아있는 프로세스**가 생길 수 있다는 것이다. 대표적으로 **Zombie(좀비)**와 **Orphan(고아)** 프로세스가 있다.

## 동작 원리

### 프로세스 종료 방식

| 구분 | 방식 | 설명 |
|------|------|------|
| **정상 종료** | `exit()` 시스템 콜 | 프로세스가 스스로 종료 요청 |
| **비정상 종료** | 부모에 의한 강제 종료 | 부모가 `kill()`로 자식 종료 |
| | 신호(Signal) | SIGKILL, SIGSEGV 등 |
| | 자원 초과 | 메모리, 파일 수 등 한계 초과 |

### Zombie 프로세스와 Orphan 프로세스

| 항목 | Zombie (좀비) | Orphan (고아) |
|------|---------------|---------------|
| **정의** | 자식이 종료됨 + 부모가 `wait()` 미호출 | 부모가 먼저 종료됨 |
| **상태** | Terminated (but still in process table) | Running 또는 다른 상태 |
| **유지 정보** | PID와 종료 상태(exit status)만 남음 | 모든 정보 유지 |
| **해결** | 부모가 `wait()` 호출 | init/systemd(PID 1)가 새 부모가 되어 주기적으로 `wait()` 호출 |

### Zombie가 생기는 이유

자식 프로세스가 `exit()`으로 종료하면, 부모가 종료 상태를 확인(`wait()`)할 때까지 **프로세스 테이블에 항목이 남아있어야 한다**. 부모가 `wait()`을 호출하지 않으면 이 항목이 영원히 남게 되어 좀비가 된다.

### Orphan의 처리

부모가 자식보다 먼저 종료되면, 자식은 고아가 된다. 이때 **init 프로세스(PID 1)**가 새 부모로 입양하여 자식이 종료될 때 `wait()`을 대신 호출해준다.

### Cascading Termination

일부 시스템에서는 부모 프로세스가 종료되면 **모든 자식 프로세스도 연쇄적으로 종료**된다. 이를 Cascading Termination이라 한다.

## 예시

### 좀비를 만드는 잘못된 패턴

```c
// BAD: wait() 없이 fork → 좀비 생성
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // 자식: 즉시 종료
        printf("자식 종료 (PID: %d)\n", getpid());
        exit(0);
    } else {
        // 부모: wait() 호출 안 함 → 자식은 좀비!
        printf("부모 계속 실행 (PID: %d)\n", getpid());
        sleep(60);  // 60초 동안 좀비 존재
    }
    return 0;
}
```

### 올바른 패턴

```c
// GOOD: fork + wait → 정상 회수
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // 자식
        printf("자식 실행 (PID: %d)\n", getpid());
        exit(42);
    } else {
        // 부모: 자식 종료를 기다림
        int status;
        wait(&status);  // 자식의 종료 상태를 회수
        if (WIFEXITED(status)) {
            printf("자식 종료 코드: %d\n", WEXITSTATUS(status));
        }
    }
    return 0;
}
```

### 좀비 프로세스 확인

```bash
ps aux | grep Z
# 상태(STAT) 컬럼에 'Z' 또는 'Z+'가 표시되면 좀비
```

## 관련 개념

- [UNIX 프로세스 모델](/knowledge/os/unix-process-model/) - fork/exec/wait 기반의 프로세스 생성과 종료 흐름
- [프로세스 상태](/knowledge/os/process-state/) - Terminated 상태와의 관계
