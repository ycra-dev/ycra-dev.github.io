---
title: "Java Synchronization"
description: "Java의 언어 수준 모니터(synchronized)와 API 수준 Lock/Condition을 통한 스레드 동기화"
tags: ["OS", "Synchronization", "Java"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/java-synchronization
sidebar:
  order: 13
---

## 핵심 개념

Java는 **언어 수준의 모니터(synchronized)**와 **API 수준의 Lock/Condition**을 통해 스레드 동기화를 지원한다. 모든 Java 객체는 고유의 **암묵적 락(intrinsic lock)**을 가지고 있다.

비유하면, `synchronized`는 화장실 문에 "사용중" 표시가 자동으로 붙는 것이고, `ReentrantLock`은 열쇠를 직접 관리하는 것이다. 더 번거롭지만 "VIP 먼저" 같은 규칙 설정이 가능하다.

## 동작 원리

### 1. Java Monitor (synchronized)

`synchronized` 메서드 선언 시 해당 객체의 락이 자동 획득/해제된다.

```java
public class BoundedBuffer<E> {
    private int count = 0;
    private E[] buffer;

    public synchronized void insert(E item) {
        while (count == BUFFER_SIZE) {
            try { wait(); }           // 락 해제 + 대기
            catch (InterruptedException e) { }
        }
        buffer[in] = item;
        count++;
        notify();                      // 대기 스레드 1개 깨움
    }

    public synchronized E remove() {
        while (count == 0) {
            try { wait(); }
            catch (InterruptedException e) { }
        }
        E item = buffer[out];
        count--;
        notify();
        return item;
    }
}
```

### Entry Set과 Wait Set

```
    ┌─────────────────────────────────────────┐
    │              Java Object                │
    │  ┌─────────┐          ┌─────────────┐  │
    │  │Entry Set│ ──락획득─►│  락 소유자   │  │
    │  │ (대기열) │ ◄─────── │   (실행중)   │  │
    │  └─────────┘  락해제  └──────┬──────┘  │
    │       ▲                     │         │
    │       │              wait() │         │
    │       │                     ▼         │
    │       │           ┌─────────────┐     │
    │       └─notify()──│  Wait Set   │     │
    │                   │ (조건 대기)  │     │
    │                   └─────────────┘     │
    └─────────────────────────────────────────┘
```

- **Entry Set**: 락 획득 대기 스레드들
- **Wait Set**: `wait()` 호출로 조건 대기 중인 스레드들
- `notify()`: Wait Set에서 **1개** 스레드를 Entry Set으로 이동
- `notifyAll()`: Wait Set의 **모든** 스레드를 Entry Set으로 이동

### Block Synchronization

메서드 전체가 아닌 **일부 블록만** 동기화할 수 있다.

```java
public void someMethod() {
    /* non-critical section */
    synchronized(this) {
        /* critical section */
    }
    /* remainder section */
}
```

### 2. ReentrantLock

`synchronized`보다 유연한 명시적 락으로, **재진입 가능**하고 **공정성(fairness)** 옵션을 지원한다.

```java
Lock key = new ReentrantLock();

key.lock();
try {
    /* critical section */
} finally {
    key.unlock();  // 반드시 finally에서 해제
}
```

**주의**: `lock()`은 try 블록 **밖에** 배치한다 (예외 발생 시 잘못된 unlock 방지).

### 3. Semaphore

```java
Semaphore sem = new Semaphore(1);

try {
    sem.acquire();       // wait()
    /* critical section */
} catch (InterruptedException e) { }
finally {
    sem.release();       // signal()
}
```

### 4. Condition Variable (명명된 조건 변수)

`ReentrantLock`과 결합하여 **명명된 조건 변수**를 제공한다. Java 기본 모니터의 단일 조건 한계를 극복한다.

```java
Lock lock = new ReentrantLock();
Condition[] condVars = new Condition[5];
for (int i = 0; i < 5; i++)
    condVars[i] = lock.newCondition();

lock.lock();
try {
    if (threadNumber != turn)
        condVars[threadNumber].await();  // 특정 조건 대기
    /* 작업 수행 */
    turn = (turn + 1) % 5;
    condVars[turn].signal();             // 특정 조건 시그널
} finally {
    lock.unlock();
}
```

### 동기화 도구 비교

| 도구 | 특징 | 사용 시점 |
|------|------|----------|
| `synchronized` | 간단, 자동 해제 | 기본적인 상호 배제 |
| `ReentrantLock` | 공정성, 타임아웃, 인터럽트 | 세밀한 제어 필요 시 |
| `Semaphore` | 카운팅, 자원 풀 관리 | 제한된 자원 접근 |
| `Condition` | 명명된 조건 변수 | 복수 조건 대기 필요 시 |

## 예시

철학자 문제에서 각 철학자에게 개별 조건 변수를 할당하면, 특정 철학자만 깨울 수 있어 효율적이다.

## 관련 개념

- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/) - 모니터 내 조건 대기 메커니즘
- [유한 버퍼 문제 (Bounded-Buffer)](/knowledge/os/bounded-buffer/) - synchronized 활용 대표 사례
- [식사하는 철학자 문제](/knowledge/os/dining-philosophers/) - Condition Variable 활용 사례
- [원자적 변수 (Atomic Variable)](/knowledge/os/atomic-variable/) - lock-free 동기화 도구
