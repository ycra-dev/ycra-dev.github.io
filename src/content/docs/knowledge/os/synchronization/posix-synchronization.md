---
title: "POSIX Synchronization"
description: "Pthreads API에서 제공하는 mutex, 세마포어, 조건 변수 기반의 사용자 레벨 동기화 표준"
tags: ["OS", "Synchronization"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/posix-synchronization
sidebar:
  order: 12
---

## 핵심 개념

POSIX Synchronization은 Pthreads API에서 제공하는 **mutex, 세마포어, 조건 변수**로, 사용자 레벨 스레드 동기화의 표준이다. POSIX(Portable Operating System Interface)는 UNIX 계열 OS의 표준 API로, Linux, macOS, BSD 등에서 동일한 코드로 스레드 동기화가 가능하다.

## 동작 원리

### 1. POSIX Mutex Lock

```c
#include <pthread.h>

pthread_mutex_t mutex;
pthread_mutex_init(&mutex, NULL);

pthread_mutex_lock(&mutex);        // 획득 (불가능하면 블로킹)
/* 임계 영역 */
pthread_mutex_unlock(&mutex);      // 해제
```

### 2. POSIX Semaphore

POSIX SEM 확장에 포함되며, Named와 Unnamed 두 종류가 있다.

| 유형 | 생성 함수 | 공유 범위 | 사용 예 |
|------|----------|----------|---------|
| **Named** | `sem_open()` | 프로세스 간 | 독립 프로세스 동기화 |
| **Unnamed** | `sem_init()` | 스레드 간 | 단일 프로세스 내 동기화 |

```c
// Named Semaphore - 프로세스 간 공유
sem_t *sem = sem_open("SEM", O_CREAT, 0666, 1);
sem_wait(sem);      // wait (sem--)
/* 임계 영역 */
sem_post(sem);      // signal (sem++)

// Unnamed Semaphore - 스레드 간 공유
sem_t sem;
sem_init(&sem, 0, 1);  // 0: 스레드 간 공유
sem_wait(&sem);
/* 임계 영역 */
sem_post(&sem);
```

### 3. POSIX Condition Variable

특정 조건이 참이 될 때까지 대기한다. **반드시 mutex와 함께 사용**해야 한다.

```c
pthread_mutex_t mutex;
pthread_cond_t cond_var;

// 대기하는 스레드
pthread_mutex_lock(&mutex);
while (a != b)                             // 반드시 while 루프
    pthread_cond_wait(&cond_var, &mutex);  // 조건 대기 + mutex 해제
pthread_mutex_unlock(&mutex);

// 시그널 보내는 스레드
pthread_mutex_lock(&mutex);
a = b;                                     // 조건 충족
pthread_cond_signal(&cond_var);            // 대기 스레드 1개 깨움
pthread_mutex_unlock(&mutex);
```

### 조건 변수 동작 흐름

`pthread_cond_wait()` 호출 시:
1. mutex 해제 (다른 스레드가 공유 데이터 접근 가능)
2. 조건 변수 대기 큐에 진입
3. signal 수신 시 깨어남
4. mutex 재획득 후 반환

조건 검사는 반드시 **while 루프**를 사용해야 한다 (spurious wakeup 방지).

## 예시

멀티스레드 웹 서버에서 작업 큐가 비어있으면 worker 스레드가 `pthread_cond_wait()`로 대기하고, 새 요청 도착 시 `pthread_cond_signal()`로 깨운다.

## 관련 개념

- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - Mutex의 일반 개념
- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/) - 조건 변수의 일반 개념
- [Java Synchronization](/knowledge/os/java-synchronization/) - Java의 언어 수준 동기화
- [유한 버퍼 문제 (Bounded-Buffer)](/knowledge/os/bounded-buffer/) - 동기화 도구 활용 예
