---
title: "UNIX 프로세스 모델"
description: "fork()로 복제하고 execve()로 새 프로그램을 적재하는 UNIX의 프로세스 생성 모델"
tags: ["OS", "Process", "UNIX", "BSD"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/os/unix-process-model
sidebar:
  order: 9
---

## 핵심 개념

UNIX 프로세스 모델은 fork()로 호출 프로세스를 복제하고, execve()로 새 프로그램을 적재하는 방식입니다. 모든 사용자 프로세스는 init(PID 1)의 자손이며, 프로세스 생성과 프로그램 적재를 분리한 단순하고 우아한 설계입니다.

## 동작 원리

1. **fork()**: 호출 프로세스의 주소 공간을 복사하여 자식 프로세스 생성. 부모는 자식의 PID를 반환받고, 자식은 0을 반환받음
2. **execve()**: 프로세스의 가상 메모리 공간을 새 프로그램의 바이너리로 교체. 기존 메모리 이미지는 파괴됨
3. **exit()**: 프로세스 종료. 부모가 wait()으로 수집할 때까지 defunct(좀비) 상태 유지
4. **wait()/wait3()**: 부모가 자식의 종료를 대기하고 종료 상태 수집

```
shell process ──fork()──> child process
      │                        │
   wait()               execve(program)
      │                        │
      │                    [실행]
      │                        │
      └────── exit() <─────────┘
```

## 예시

fork()는 "복사기"처럼 원본 프로세스를 그대로 복제하고, execve()는 복제본의 내용물을 완전히 새 것으로 "교체"합니다.

셸에서 `ls` 명령 실행 시:
1. 셸이 fork()로 자식 프로세스 생성
2. 자식이 execve("/bin/ls")로 ls 프로그램 적재
3. 부모(셸)는 wait()으로 자식 종료 대기
4. ls 실행 완료 후 exit(), 셸이 다시 프롬프트 출력

### fork() 반환값

| 반환값 | 의미 |
|--------|------|
| **양수 (자식 PID)** | 부모 프로세스 |
| **0** | 자식 프로세스 |
| **-1** | fork 실패 |

### 실행 옵션

1. **부모-자식 동시 실행**: 부모가 자식과 병행 실행
2. **부모가 자식 대기**: `wait()` 호출로 자식 종료 대기

### Windows의 CreateProcess()

- fork()와 달리 한 번에 새 프로세스 생성 + 프로그램 로드
- 10개 매개변수 필요 (더 명시적이지만 복잡)

### 코드 예시

```c
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {          // fork 실패
        return 1;
    }
    else if (pid == 0) {    // 자식 프로세스
        execlp("/bin/ls", "ls", NULL);
        // exec 성공 시 여기 도달 안함
    }
    else {                  // 부모 프로세스
        wait(NULL);         // 자식 종료 대기
        printf("Child Complete");
    }
    return 0;
}
```

### 장단점

- fork() 시 주소 공간 복사 오버헤드 → **Copy-on-Write**로 완화
- **vfork()**: 불필요한 복사 최적화 (execve 직전에 사용)
- 부모-자식 관계로 자원 상속 및 통신 용이 (파이프, 파일 디스크립터)
- 좀비 프로세스 관리 필요 (wait() 미호출 시 자원 누수)

## Linux clone() 시스템 콜

Linux는 fork() 외에 **clone()**을 통해 프로세스와 스레드를 통합적으로 관리합니다. clone()은 자원 공유 수준을 플래그로 세밀하게 제어할 수 있습니다.

| 플래그 | 의미 |
|--------|------|
| `CLONE_VM` | 동일 메모리 공간 공유 |
| `CLONE_FS` | 파일 시스템 정보 공유 |
| `CLONE_FILES` | 열린 파일 집합 공유 |
| `CLONE_SIGHAND` | 시그널 핸들러 공유 |

- **모든 플래그 설정** → 스레드처럼 동작 (자원 공유)
- **플래그 없음** → fork()처럼 동작 (자원 복사)

### task_struct 서브컨텍스트 구조

```
task_struct (프로세스 기본 구조)
├── 스케줄링 컨텍스트 (항상 독립)
├── PID (항상 고유)
├── fs_struct → 파일 시스템 정보 (공유 가능)
├── files_struct → 파일 디스크립터 테이블 (공유 가능)
├── signal_struct → 시그널 핸들러 (공유 가능)
└── mm_struct → 가상 메모리 (공유 가능)
```

본질적으로 프로세스와 스레드는 "자원을 공유하는 정도"만 다르며, Linux는 단일 메커니즘(clone)으로 둘 다 생성할 수 있습니다.

## 관련 개념

- [프로세스 (Process)](/knowledge/os/process/)
- [프로세스 종료와 Zombie-Orphan](/knowledge/os/process-termination/)
- [파이프 (Pipe)](/knowledge/os/unix-pipe/)
- [Copy-on-Write (COW)](/knowledge/os/copy-on-write/)
- [스레드 (Thread)](/knowledge/os/thread/)
