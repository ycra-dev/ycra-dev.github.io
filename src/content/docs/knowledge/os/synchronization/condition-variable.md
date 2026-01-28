---
title: "조건 변수 (Condition Variable)"
description: "모니터 내에서 특정 조건이 만족될 때까지 프로세스를 대기시키는 동기화 메커니즘"
tags: ["OS", "Synchronization"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/condition-variable
sidebar:
  order: 10
---

## 핵심 개념

조건 변수(Condition Variable)는 **모니터(Monitor) 내에서 특정 조건이 만족될 때까지 프로세스를 대기시키는** 동기화 메커니즘이다.

모니터의 기본 상호배제만으로는 "버퍼가 빌 때까지 기다려라" 같은 **조건 기반 대기**를 표현할 수 없다. 조건 변수가 이 역할을 한다.

비유하면 **식당 대기 호출 벨**과 같다. 손님(프로세스)이 "자리가 날 때까지" 대기(wait)하고, 자리가 나면 직원이 벨을 눌러 호출(signal)한다. 아무도 기다리고 있지 않으면 벨을 눌러도 아무 효과가 없다.

## 동작 원리

### 기본 연산

```c
condition x, y;

x.wait();    // 조건 x 대기 큐에 들어감, 모니터 해제
x.signal();  // 조건 x 대기 큐에서 하나 깨움
```

- **`x.wait()`**: 호출한 프로세스를 조건 x의 대기 큐에 넣고, 모니터 잠금을 해제한다
- **`x.signal()`**: 조건 x를 기다리는 프로세스 중 하나를 깨운다. **아무도 기다리고 있지 않으면 아무 효과 없음** (이것이 Semaphore와의 핵심 차이!)

### Semaphore와의 차이

| 특성 | Condition Variable | Semaphore |
|-----|-------------------|-----------|
| signal 시 아무도 없으면 | **아무 효과 없음** | 값 증가 (상태 변경) |
| 값 저장 | 없음 | 정수 값 유지 |
| 사용 맥락 | 모니터 내부 | 독립적 사용 가능 |

Semaphore는 signal()을 호출하면 내부 카운터가 증가하여 **나중에 wait()하는 프로세스가 즉시 통과**할 수 있다. 하지만 Condition Variable은 signal() 시점에 기다리는 프로세스가 없으면 그 신호는 사라진다.

### Signal-and-Wait vs Signal-and-Continue

signal()을 호출한 뒤, 신호를 보낸 프로세스(P)와 깨어난 프로세스(Q) 중 누가 먼저 실행하느냐의 문제이다.

| 정책 | 설명 |
|-----|------|
| **Signal-and-Wait** | P가 대기, Q가 먼저 실행 |
| **Signal-and-Continue** | P가 계속 실행, Q는 P 종료 후 실행 |
| **Immediate Resumption** | P가 signal 후 즉시 모니터 퇴출, Q 즉시 실행 |

### Conditional-Wait (우선순위 기반)

```c
x.wait(c);  // c = 우선순위 번호
```

signal() 시 **가장 작은 c 값**을 가진 프로세스가 먼저 깨어난다. 기본 FCFS 대신 우선순위 기반 스케줄링이 가능해진다.

### Semaphore로 Condition Variable 구현

```c
// 조건 x에 대한 변수
semaphore x_sem = 0;
int x_count = 0;

// x.wait() 구현
x_count++;
if (next_count > 0)
    signal(next);
else
    signal(mutex);
wait(x_sem);
x_count--;

// x.signal() 구현
if (x_count > 0) {
    next_count++;
    signal(x_sem);
    wait(next);
    next_count--;
}
```

## 예시

자원 할당기(ResourceAllocator)를 모니터로 구현하는 예시이다.

```c
monitor ResourceAllocator {
    boolean busy;
    condition x;

    void acquire(int time) {
        if (busy)
            x.wait(time);  // 우선순위 번호(time) 전달
        busy = true;
    }

    void release() {
        busy = false;
        x.signal();        // 가장 작은 time 가진 프로세스 깨움
    }

    initialization_code() {
        busy = false;
    }
}
```

- `acquire(5)`를 호출한 프로세스와 `acquire(10)`을 호출한 프로세스가 모두 대기 중이면, `release()` 시 time=5인 프로세스가 먼저 깨어난다

## 관련 개념

- [임계구역 문제](/knowledge/os/critical-section/) - 조건 변수가 해결하는 근본 문제
- [유한 버퍼 문제](/knowledge/os/bounded-buffer/) - 조건 변수를 활용하는 대표적 문제
- [원자적 변수](/knowledge/os/atomic-variable/) - 더 경량의 동기화 도구
