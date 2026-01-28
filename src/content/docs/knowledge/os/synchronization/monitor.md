---
title: "모니터 (Monitor)"
description: "공유 데이터와 연산을 캡슐화하여 자동으로 상호배제를 보장하는 고수준 추상 데이터 타입"
tags: ["OS", "Synchronization"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/monitor
sidebar:
  order: 9
---

## 핵심 개념

모니터(Monitor)는 공유 데이터와 그에 대한 연산을 하나로 **캡슐화**하여 자동으로 상호배제를 보장하는 고수준 추상 데이터 타입(ADT)이다. 세마포어는 프로그래머 실수(순서, 누락)에 취약하여 타이밍 오류가 발생하므로, 동기화 로직을 언어/컴파일러 수준에서 강제하여 실수를 방지한다.

비유하면, 은행 창구와 같다. 창구(모니터) 안에는 한 명의 고객만 들어갈 수 있고, 내부 데이터(잔액 등)는 창구 직원(모니터 함수)만 접근할 수 있다.

## 동작 원리

### 모니터 구조

```
    ┌─────────────────────────────┐
    │         Monitor             │
    │  ┌─────────────────────┐    │
    │  │   shared data       │    │
    │  └─────────────────────┘    │
    │                             │
    │  ┌─────────────────────┐    │
    │  │  operations         │    │
entry   │  P1(), P2(), ...    │    │
queue → │                     │    │
    │  └─────────────────────┘    │
    │                             │
    │  ┌─────────────────────┐    │
    │  │ initialization code │    │
    │  └─────────────────────┘    │
    └─────────────────────────────┘
```

- 공유 변수는 모니터 내부에서만 접근 가능
- 모니터 함수 호출 시 **자동으로 상호배제 적용**
- 추가 동기화를 위해 조건 변수(Condition Variable) 제공
- Entry Queue: 모니터 진입을 대기하는 프로세스들

### 의사코드

```c
monitor monitor_name {
    /* shared variable declarations */

    function P1(...) {
        ...
    }

    function P2(...) {
        ...
    }

    initialization_code(...) {
        ...
    }
}
```

### 세마포어를 이용한 구현

```c
semaphore mutex = 1;      // 모니터 진입 제어
semaphore next = 0;       // signal 후 대기
int next_count = 0;       // next에서 대기 중인 수

// 모니터 함수 F 진입/퇴출
wait(mutex);
    ...
    body of F
    ...
if (next_count > 0)
    signal(next);         // 대기 중인 signaler 깨움
else
    signal(mutex);        // 다음 진입자 허용
```

### 모니터의 한계

```c
// 올바른 사용
R.acquire(t);
access resource;
R.release();

// 잘못된 사용 (모니터가 막지 못함)
access resource;      // acquire 없이 접근!
R.release();          // 또는 release 없이 종료
```

올바른 사용 순서는 여전히 프로그래머의 책임이다.

## 예시

- **Java**: `synchronized` 키워드가 모니터를 언어 수준에서 지원
- **C#**: `lock` 키워드로 모니터 패턴 구현

## 관련 개념

- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/) - 모니터 내 추가 동기화 메커니즘
- [임계구역 문제 (Critical Section)](/knowledge/os/critical-section/) - 상호배제의 기본 문제
- [Java Synchronization](/knowledge/os/java-synchronization/) - Java의 모니터 기반 동기화
- [하드웨어 동기화 명령어](/knowledge/os/hardware-instructions/) - 저수준 동기화 기법
