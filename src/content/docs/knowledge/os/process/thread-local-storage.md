---
title: "스레드 로컬 저장소 (Thread-Local Storage)"
description: "각 스레드가 자신만의 고유한 데이터 복사본을 가질 수 있게 하는 저장 메커니즘"
tags: ["OS", "Thread"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/thread-local-storage
sidebar:
  order: 15
---

## 핵심 개념

Thread-Local Storage(TLS)는 각 스레드가 자신만의 **고유한 데이터 복사본**을 가질 수 있게 하는 저장 메커니즘이다. 스레드는 기본적으로 전역 데이터를 공유하지만, 트랜잭션 ID, 에러 코드(`errno`) 등 스레드마다 독립적이어야 하는 데이터가 있다.

비유하면, 회사 사무실(프로세스)에서 공용 프린터(전역 변수)는 모두 공유하지만, 각 직원의 개인 서랍(TLS)은 본인만 사용하는 것이다.

## 동작 원리

### TLS vs 지역 변수 vs 전역 변수

| 종류 | 범위 | 스레드 간 공유 |
|------|------|----------------|
| 지역 변수 | 함수 내 | X (스택, 함수 종료 시 소멸) |
| 전역 변수 | 프로세스 전체 | O (모든 스레드 공유) |
| **TLS** | 스레드 전체 | **X (각 스레드마다 독립적 복사본)** |

### TLS 특징

- 전역 변수처럼 **함수 호출을 넘어 유지**됨
- static 변수와 유사하나, **각 스레드마다 별도 인스턴스**
- 스레드 생성 시 초기화, 스레드 종료 시 소멸

```
┌──────────────────────────────────────────────┐
│                  Process                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Thread 1 │  │ Thread 2 │  │ Thread 3 │   │
│  │ TLS:     │  │ TLS:     │  │ TLS:     │   │
│  │  txID=1  │  │  txID=2  │  │  txID=3  │   │
│  │  errno=0 │  │  errno=5 │  │  errno=0 │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│        ┌─────────────────────────┐           │
│        │  공유 전역 데이터 영역   │           │
│        └─────────────────────────┘           │
└──────────────────────────────────────────────┘
```

### 언어별 구현

**C/C++ (gcc):**
```c
static __thread int threadID;
```

**Java:**
```java
ThreadLocal<Integer> txId = new ThreadLocal<>();
txId.set(123);
int id = txId.get();  // 현재 스레드의 값
```

**Pthreads:**
```c
pthread_key_t key;
pthread_key_create(&key, NULL);
pthread_setspecific(key, (void*)value);
void* val = pthread_getspecific(key);
```

### TLS가 필요한 경우

1. **암시적 스레딩(스레드 풀)** 사용 시 — 스레드 생성을 직접 제어하지 않음
2. **라이브러리 수준 상태 관리** — `errno` 같은 전역 상태
3. **스레드별 캐시/버퍼** — 독립적 임시 저장소

## 예시

```
지역 변수:                    TLS:
function A() {                __thread int x;
    int x = 1;               function A() {
    call B();                     x = 1;
}                                 call B();
function B() {                }
    // x 접근 불가            function B() {
}                                 // x 접근 가능 (여전히 1)
                              }
```

## 관련 개념

- [스레드 (Thread)](/knowledge/os/thread/) - TLS를 사용하는 실행 단위
- [스레드 풀 (Thread Pool)](/knowledge/os/thread-pool/) - TLS가 특히 유용한 암시적 스레딩 패턴
- [프로세스 메모리 구조](/knowledge/os/process-memory/) - 스레드가 공유하는 메모리 레이아웃
- [경쟁 조건 (Race Condition)](/knowledge/os/race-condition/) - TLS로 회피 가능한 동기화 문제
