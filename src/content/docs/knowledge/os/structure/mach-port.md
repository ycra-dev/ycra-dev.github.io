---
title: "Mach Port"
description: "Mach에서 객체를 참조하는 기본 메커니즘으로, 커널이 보호하는 통신 채널이자 메시지 큐"
tags: ["OS", "Mach", "IPC"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/mach-port
sidebar:
  order: 19
---

## 핵심 개념

Port는 Mach에서 **객체를 참조하는 기본 메커니즘**으로, 커널이 보호하는 통신 채널이자 메시지 큐이다. Mach는 모든 것을 객체로 취급하고, 포트를 통해 객체에 접근하여 **위치 독립적이고 안전한 통신**을 제공한다.

비유하면, Port는 "우편함"과 같다. 객체(사람)마다 우편함이 있고, 메시지를 보내려면 해당 우편함의 주소와 접근 권한(열쇠)이 필요하다.

## 동작 원리

### Port 구조

커널 내부에서 **보호된 유한 큐(bounded queue)**로 구현된다. 큐가 가득 차면 송신자는 abort, 대기, 또는 커널에 전달 위임을 선택할 수 있다.

```
┌─────────────────────────────────────────────────┐
│                    Kernel                        │
│   Port (Bounded Queue)                          │
│   ┌─────────────────────────────┐               │
│   │ msg1 │ msg2 │ msg3 │  ...  │               │
│   └─────────────────────────────┘               │
│          ↑                    ↓                 │
└──────────┼────────────────────┼─────────────────┘
           │                    │
    ┌──────┴──────┐      ┌──────┴──────┐
    │   Task A    │      │   Task B    │
    │ Send Right  │      │Receive Right│
    └─────────────┘      └─────────────┘
```

### Port Rights (포트 권한)

| 권한 | 설명 |
|------|------|
| **Send Right** | 포트에 메시지를 보낼 수 있는 권한 (여러 Task 가능) |
| **Receive Right** | 포트에서 메시지를 받을 수 있는 권한 (**단 하나의 Task만**) |

- 권한은 **메시지를 통해서만** 다른 Task로 전달 가능
- Receive Right 파괴 시 모든 Send Right 무효화 → 권한 회수 용이

### 특수 포트

- `task_self()`: Task를 커널에 표현하는 포트
- `thread_self()`: Thread의 커널 포트
- `task_notify()`: 커널이 이벤트 알림을 보내는 포트

### Port Set

여러 포트가 공통 메시지 큐를 공유하는 그룹이다. 하나의 스레드가 여러 포트의 요청을 처리할 때 유용하다.

## 예시

1. Task A가 객체 생성 → 포트 할당 + 모든 권한 획득
2. Task A가 Task B에게 Send Right를 메시지로 전달
3. Task B는 해당 포트로 메시지를 보내 객체 연산 요청
4. Task A(Receive Right 보유)가 메시지 수신 후 처리

## 관련 개념

- [Mach 운영체제](/knowledge/os/mach-overview/) - Mach 전체 구조
- [Mach 메시지와 IPC](/knowledge/os/mach-message-ipc/) - 포트를 통한 메시지 전달
- [ALPC](/knowledge/os/alpc/) - Windows의 유사한 IPC 메커니즘
- [능력 기반 시스템](/knowledge/os/capability-based-system/) - 포트 권한과 유사한 개념
