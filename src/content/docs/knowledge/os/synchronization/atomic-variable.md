---
title: "원자적 변수 (Atomic Variable)"
description: "CAS 기반으로 단일 변수에 대해 원자적 연산을 제공하는 lock-free 동기화 도구"
tags: ["OS", "Synchronization"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/atomic-variable
sidebar:
  order: 6
---

## 핵심 개념

원자적 변수(Atomic Variable)는 정수, 불린 등 **기본 데이터 타입에 대해 원자적 연산을 제공하는 특수 변수**이다. `count++` 같은 단순한 연산도 실제로는 읽기-수정-쓰기의 3단계로 이루어져 있어 Race Condition을 유발할 수 있는데, 원자적 변수는 이를 **하나의 끊기지 않는 동작**으로 수행한다.

비유하면 **은행 ATM의 잔액 업데이트**와 같다. 잔액 확인과 변경이 하나의 동작으로 일어나서, 중간에 다른 트랜잭션이 끼어들지 못한다.

핵심 특징은 **Lock을 사용하지 않는다**(lock-free)는 것이다. Mutex처럼 잠금을 걸고 푸는 과정 없이 하드웨어 수준의 원자적 명령어(CAS)를 직접 활용하므로, 오버헤드가 적고 Deadlock이 발생하지 않는다.

## 동작 원리

### CAS(Compare-And-Swap) 기반 구현

원자적 변수의 내부는 하드웨어가 제공하는 `compare_and_swap()` 명령어로 구현된다.

```c
void increment(atomic_int *v) {
    int temp;
    do {
        temp = *v;
    } while (temp != compare_and_swap(v, temp, temp + 1));
    // temp와 현재 값이 같으면 temp+1로 교체 -> 성공
    // 다르면 (다른 스레드가 중간에 값을 바꿈) -> 재시도
}
```

동작 흐름:
1. 현재 값을 읽는다 (`temp = *v`)
2. "읽은 값이 아직 그대로인지 확인"하면서 동시에 새 값으로 교체한다 (CAS)
3. 만약 다른 스레드가 중간에 값을 바꿨으면, CAS가 실패하고 **재시도**한다

### 사용 예시

```c
atomic_int sequence;

// Thread 1, 2, 3, ... 동시 실행
increment(&sequence);  // 원자적으로 증가
```

여러 스레드가 동시에 `increment()`를 호출해도, 각 호출이 정확히 1만큼 증가시킨다. 값이 누락되거나 중복되지 않는다.

## 예시

### 단일 변수에서는 완벽

카운터, 시퀀스 번호 생성기 등 **하나의 변수만 보호**하면 되는 경우에 이상적이다.

### 한계: 복합 조건은 보호 불가

유한 버퍼 문제에서 원자적 변수의 한계를 보자.

```c
atomic_int count;  // 원자적 변수

// Producer
while (count == BUFFER_SIZE);  // busy wait
buffer[in] = item;
increment(&count);  // 원자적 증가

// Consumer
while (count == 0);  // busy wait
item = buffer[out];
decrement(&count);  // 원자적 감소

// 문제: 두 consumer가 동시에 while 탈출 가능!
// count=1일 때, 두 consumer 모두 count>0 확인 후 소비 시도
```

`count` 자체의 증감은 원자적이지만, **"count 확인 -> 조건 판단 -> 소비"라는 복합 동작**은 원자적이지 않다. 이런 경우에는 Mutex나 Semaphore가 필요하다.

| 비교 | Atomic Variable | Mutex / Semaphore |
|------|----------------|-------------------|
| Lock 사용 | 없음 (lock-free) | 있음 |
| Deadlock | 발생 불가 | 발생 가능 |
| 오버헤드 | 낮음 | 상대적으로 높음 |
| 보호 범위 | **단일 변수**만 | 임의의 코드 영역 |
| 복합 조건 | 보호 불가 | 보호 가능 |

## 관련 개념

- [임계구역 문제](/knowledge/os/critical-section/) - 원자적 변수가 해결하려는 근본 문제
- [유한 버퍼 문제](/knowledge/os/bounded-buffer/) - 원자적 변수만으로는 부족한 사례
- [조건 변수](/knowledge/os/condition-variable/) - 복합 조건을 처리하는 동기화 도구
