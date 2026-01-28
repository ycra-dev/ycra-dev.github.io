---
title: "Mach Task와 Thread"
description: "자원 할당 단위인 Task와 Task 내 실행 단위인 Thread로 구성된 Mach의 실행 모델"
tags: ["OS", "Mach", "Process"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/mach-task-thread
sidebar:
  order: 21
---

## 핵심 개념

Mach는 전통적인 "프로세스" 개념을 **자원 컨테이너(Task)**와 **실행 흐름(Thread)**으로 분리한다. Task는 자원 할당의 기본 단위(가상 주소 공간 + 포트 권한)이고, Thread는 Task 내에서 실행되는 기본 실행 단위이다.

비유하면, Task는 "사무실(공간과 자원)"이고, Thread는 "그 사무실에서 일하는 직원들"이다. 직원들은 같은 사무실의 책상, 프린터를 공유하지만 각자 자신의 업무를 수행한다.

## 동작 원리

### Task

```
┌─────────────────────────────────────┐
│              Task                   │
│  ┌──────────────────────────────┐  │
│  │     Virtual Address Space     │  │
│  │  ┌────────┬────────┬───────┐ │  │
│  │  │  Text  │  Data  │ Stack │ │  │
│  │  └────────┴────────┴───────┘ │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌───────┐ │
│  │Thread 1 │ │Thread 2 │ │Thread3│ │
│  │   PC    │ │   PC    │ │  PC   │ │
│  │  Regs   │ │  Regs   │ │ Regs  │ │
│  └─────────┘ └─────────┘ └───────┘ │
│                                     │
│  Port Rights: [port1, port2, ...]   │
└─────────────────────────────────────┘
```

- 가상 주소 공간을 소유
- 포트 권한(port rights)을 통해 시스템 자원에 접근
- 하나 이상의 스레드를 포함해야 실행 가능
- `fork()` 시 부모의 주소 공간을 상속 속성에 따라 복제

### Thread

- Task의 컨텍스트 내에서만 실행 가능
- 같은 Task 내의 모든 스레드는 포트, 메모리 등 자원 공유
- 독립적인 프로그램 카운터와 레지스터 집합 보유
- **Running**: 실행 중이거나 프로세서 할당 대기 중
- **Suspended**: 실행도 대기도 하지 않는 상태

### Suspend Count

각 스레드는 suspend count를 가진다. `suspend()` 호출 시 증가, `resume()` 호출 시 감소하며, count가 0이 되어야 스레드가 재개된다.

## 예시

- **웹 서버**: 하나의 Task에 여러 Thread를 두어 다중 요청을 병렬 처리
- **전통적 UNIX 프로세스**: 하나의 Task에 하나의 Thread로 구현

## 관련 개념

- [Mach 운영체제](/knowledge/os/mach-overview/) - Mach 전체 구조
- [Mach Port](/knowledge/os/mach-port/) - Task가 보유하는 포트 권한
- [스레드 (Thread)](/knowledge/os/thread/) - 스레드의 일반 개념
- [프로세스 (Process)](/knowledge/os/process/) - 전통적 프로세스 모델
