---
title: "Linux 커널 동기화 (Linux Kernel Synchronization)"
description: "Linux 커널의 atomic 연산, spinlock, mutex, 세마포어 및 top-half/bottom-half 인터럽트 분리 동기화 체계"
tags: ["OS", "Synchronization", "Linux"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/linux-kernel-synchronization
sidebar:
  order: 14
---

## 핵심 개념

Linux 커널은 **atomic 연산, spinlock, mutex, 세마포어**를 계층적으로 제공하며, 단일/멀티프로세서에 따라 다른 전략을 사용한다. 또한 인터럽트 처리를 **top-half/bottom-half**로 분리하여 커널 내 공유 데이터의 일관성을 보장한다.

Linux 2.6부터 **선점형 커널(preemptive kernel)**이 되어, 커널 모드에서도 높은 우선순위 태스크가 선점할 수 있으므로 더 정교한 동기화가 필요하다.

## 동작 원리

### 동기화 도구 계층

```
    ┌─────────────────────────────────────────────────────┐
    │              Linux 동기화 도구 계층                   │
    ├─────────────────────────────────────────────────────┤
    │  [가벼움]                                            │
    │    │                                                │
    │    ├── atomic_t: 단일 변수 연산, 락 없음             │
    │    │                                                │
    │    ├── spinlock: 짧은 임계구역, busy-wait            │
    │    │    └─ 단일코어: preempt_disable()로 대체        │
    │    │                                                │
    │    ├── mutex: 긴 임계구역, sleep 허용                │
    │    │                                                │
    │    └── semaphore: 카운팅, reader-writer 버전 제공    │
    │                                                     │
    │  [무거움]                                            │
    └─────────────────────────────────────────────────────┘
```

| 상황 | 권장 도구 |
|------|----------|
| 정수 변수 증감 | `atomic_t` |
| 짧은 임계 영역, 인터럽트 컨텍스트 | `spinlock` |
| 긴 임계 영역, sleep 허용 | `mutex` / `semaphore` |

### 1. Atomic Integer

인터럽트 없이 정수 연산을 수행한다. 오버헤드 최소, 단순 카운터에 적합.

```c
atomic_t counter;
int value;

atomic_set(&counter, 5);      // counter = 5
atomic_add(10, &counter);     // counter += 10
atomic_sub(4, &counter);      // counter -= 4
atomic_inc(&counter);         // counter++
value = atomic_read(&counter); // value = 12
```

### 2. Spinlock

**바쁜 대기(busy-waiting)**로 락을 획득한다. SMP에서 짧은 임계 영역에 적합.

| 환경 | spinlock 동작 |
|------|--------------|
| **단일 프로세서** | 커널 선점 비활성화 (`preempt_disable()`) |
| **멀티 프로세서** | 실제 spinlock 획득 |

비유하면, 회전문(spinlock)과 대기실 의자(mutex)의 차이다. 짧은 대기라면 회전문 앞에서 기다리는 게 빠르지만, 오래 걸리면 의자에 앉아 쉬는 게 효율적.

### 3. Mutex Lock

락 사용 불가 시 **sleep**하여 CPU를 양보한다. 긴 임계 영역에 적합.

```c
mutex_lock(&my_mutex);    // 획득 (불가능하면 sleep)
/* 임계 영역 */
mutex_unlock(&my_mutex);  // 해제 (대기자 깨움)
```

### 4. 커널 선점 관리

`preempt_count` 카운터로 선점 가능 여부를 판단한다.

```c
preempt_disable();  // 선점 비활성화 (preempt_count++)
/* 임계 영역 */
preempt_enable();   // 선점 활성화 (preempt_count--)
```

- `preempt_count > 0` → 선점 불가 (락 보유 중)
- `preempt_count == 0` → 선점 가능

### 비재귀적 특성

Linux의 spinlock과 mutex는 **비재귀적(nonrecursive)**이다. 같은 스레드가 이미 보유한 락을 다시 획득 시도하면 **교착 상태**에 빠진다.

```c
spin_lock(&lock);
spin_lock(&lock);  // 교착 상태! 영원히 대기
```

### 5. Top-half / Bottom-half 인터럽트 처리

```
┌─────────────────────────────────────────┐
│ Top-half (하드웨어 인터럽트 핸들러)       │ 우선순위 높음
│ - 인터럽트 비활성화 상태에서 실행          │ ↑
│ - 최소한의 작업만 수행                    │ │
├─────────────────────────────────────────┤ │
│ Bottom-half (지연된 작업)                │ │
│ - 모든 인터럽트 활성화 상태에서 실행       │ │
│ - 자기 자신에 의해 인터럽트되지 않음       │ │
├─────────────────────────────────────────┤ │
│ 커널 시스템 서비스 (선점 가능)            │ │
├─────────────────────────────────────────┤ │
│ 사용자 모드 프로그램 (선점 가능)          │ ↓
└─────────────────────────────────────────┘ 우선순위 낮음
```

**분리 이유**: 인터럽트 비활성화 시간을 최소화하여 I/O 성능을 유지한다. 네트워크 패킷 처리처럼 복잡한 작업은 bottom-half에서 안전하게 수행한다.

## 예시

- 네트워크 드라이버에서 패킷 카운터 증가 → `atomic_inc()` 사용
- 파일 시스템 버퍼 접근 → `mutex_lock()` 사용
- 네트워크 패킷 도착 → top-half가 패킷을 버퍼에 저장하고 bottom-half 스케줄 → bottom-half가 패킷 파싱, 라우팅, 포워딩 수행

## 관련 개념

- [임계구역 문제 (Critical Section)](/knowledge/os/critical-section/) - 동기화의 기본 문제
- [하드웨어 동기화 명령어](/knowledge/os/hardware-instructions/) - atomic 연산의 기반
- [원자적 변수 (Atomic Variable)](/knowledge/os/atomic-variable/) - 일반적인 atomic 개념
- [디스패처 객체 (Dispatcher Objects)](/knowledge/os/dispatcher-objects/) - Windows의 동기화 체계와 비교
