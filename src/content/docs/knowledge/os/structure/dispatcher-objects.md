---
title: "디스패처 객체 (Dispatcher Objects)"
description: "Windows 커널에서 디스패칭과 동기화를 제어하는 커널 객체들의 집합"
tags: ["OS", "Windows", "Synchronization"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/dispatcher-objects
sidebar:
  order: 14
---

## 핵심 개념

Dispatcher Objects는 Windows 커널에서 디스패칭과 동기화를 제어하는 **커널 객체들의 집합**입니다. 모든 동기화 필요를 "객체가 **signaled** 상태가 될 때까지 대기"로 표현하여 통일된 인터페이스를 제공합니다.

## 동작 원리

### 디스패처 객체 종류

| 객체 | 설명 | 시그널 조건 |
|------|------|------------|
| **Event** | 이벤트 발생 통지 | `SetEvent()` 호출 시 |
| **Mutant** | 커널/유저 모드 상호 배제 (소유권 있음) | 소유자가 해제 시 |
| **Mutex** | 커널 모드 전용 상호 배제 (데드락 방지) | 소유자가 해제 시 |
| **Semaphore** | 카운터 기반 자원 접근 제어 | count > 0 일 때 |
| **Thread** | 스레드 객체 | 스레드 종료 시 |
| **Process** | 프로세스 객체 | 프로세스 종료 시 |
| **Timer** | 시간 관리 | 타이머 만료 시 |

### Event 종류

- **Notification Event**: 시그널 시 대기 중인 **모든** 스레드 깨움
- **Synchronization Event**: 시그널 시 **하나의** 스레드만 깨움

### 대기 함수

```c
WaitForSingleObject(handle, timeout);
WaitForMultipleObjects(count, handles, waitAll, timeout);
```

모든 동기화가 Wait 함수로 통일되며, 여러 객체를 동시에 대기할 수 있습니다(`WaitForMultipleObjects`). 이름으로 객체를 공유하면 프로세스 간 동기화도 가능합니다.

### 상태 전이 (Mutex 예시)

```
        스레드가 락 해제
           ↓
    ┌──────────────┐         ┌──────────────┐
    │  Nonsignaled │ ──────► │   Signaled   │
    │   (점유됨)    │         │  (사용가능)   │
    └──────────────┘ ◄────── └──────────────┘
                      ↑
              스레드가 락 획득
```

1. Nonsignaled 객체에 대기 → 스레드 상태 **ready → waiting**
2. Signaled로 전이 → 대기 큐의 스레드를 **waiting → ready**로 이동
3. Mutex: 1개 선택 / Event(Notification): **모든 대기 스레드** 선택

### Critical-Section Object

사용자 모드 mutex로 커널 개입을 최소화한다:

1. 먼저 **spinlock**으로 짧은 대기 시도
2. 오래 걸리면 **커널 mutex** 할당 후 CPU 양보

경합이 적으면 커널 mutex 할당 없이 처리하므로 매우 효율적이다.

```c
CRITICAL_SECTION cs;
InitializeCriticalSection(&cs);

EnterCriticalSection(&cs);  // 획득
/* 임계 영역 */
LeaveCriticalSection(&cs);  // 해제
```

## 예시

Event는 신호등(파란불 = signaled), Semaphore는 주차장 출입 게이트(남은 자리 수 = count), Mutex는 화장실 잠금장치(한 명만 사용)에 비유할 수 있습니다.

생산자-소비자 패턴에서 버퍼가 비어있으면 소비자는 Event를 기다리고, 생산자가 데이터를 넣으면 Event를 signal하여 소비자를 깨웁니다. 파일 다운로드 완료 시 Event를 signal하여 대기 중인 모든 처리 스레드에게 알릴 수도 있습니다.

### 장단점

- **장점**: 통일된 Wait 인터페이스, 여러 객체 동시 대기, 프로세스 간 공유 가능, Critical-Section Object로 경합이 적은 경우 효율 극대화
- **단점**: 매 대기/해제 시 커널 모드 전환 오버헤드, 객체 종류가 많아 적절한 선택 필요, Spinlock은 짧은 코드에만 적합 (커널 내부 한정)

## 관련 개념

- [객체 관리자 (Object Manager)](/knowledge/os/object-manager/)
- [임계구역 문제 (Critical Section Problem)](/knowledge/os/critical-section/)
- [APC와 DPC](/knowledge/os/apc-dpc/)
- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 일반적 뮤텍스 개념
- [세마포어 (Semaphore)](/knowledge/os/semaphore/) - 일반적 세마포어 개념
