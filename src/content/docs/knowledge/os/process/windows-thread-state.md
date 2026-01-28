---
title: "Windows 스레드 상태 (Windows Thread State)"
description: "Windows 스레드의 8가지 상태(Initializing, Ready, Deferred-Ready, Standby, Running, Waiting, Transition, Terminated)와 전이"
tags: ["OS", "Windows", "Thread"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/windows-thread-state
sidebar:
  order: 16
---

## 핵심 개념

Windows 스레드는 생성부터 종료까지 **8가지 상태**를 거치며, 디스패처가 이 상태 전이를 관리한다. 효율적인 스케줄링을 위해 "실행 가능한 스레드"와 "대기 중인 스레드"를 구분하고, 멀티프로세서 환경에서 CPU 간 스레드 배치를 최적화한다.

## 동작 원리

### 8가지 상태

| 상태 | 설명 |
|------|------|
| **Initializing** | 스레드 생성 중. 자료구조 초기화 후 Ready로 전이 |
| **Ready** | 실행 가능. 디스패처 데이터베이스의 ready 큐에서 대기 |
| **Deferred-Ready** | 특정 프로세서에서 실행하도록 선택됨. 아직 스케줄 안 됨 |
| **Standby** | 해당 프로세서의 "다음 스레드". 선점 예정 |
| **Running** | 프로세서 코어에서 실제 실행 중 |
| **Waiting** | 디스패처 객체(이벤트, 뮤텍스, I/O 완료 등)가 시그널되기를 대기 |
| **Transition** | 실행에 필요한 리소스 대기 (예: 커널 스택이 페이지 아웃됨) |
| **Terminated** | 실행 종료. 자원 정리 후 스레드 객체 해제 가능 |

### 상태 전이 다이어그램

```
                          ┌──────────────┐
                          │ Initializing │
                          └──────┬───────┘
                                 │ 초기화 완료
                                 ▼
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ┌───────┐    선점/퀀텀소진    ┌─────────┐                    │
│   │ Ready │◄───────────────────│ Running │                    │
│   └───┬───┘                    └────┬────┘                    │
│       │                             │                         │
│       │ 프로세서 선택               │ Wait 호출                │
│       ▼                             ▼                         │
│ ┌──────────────┐             ┌─────────┐                      │
│ │Deferred-Ready│             │ Waiting │──┐                   │
│ └──────┬───────┘             └────┬────┘  │ 리소스 부족       │
│        │                          │       │                   │
│        │ 해당 CPU 스케줄          │       ▼                   │
│        ▼                          │  ┌────────────┐           │
│   ┌─────────┐                     │  │ Transition │           │
│   │ Standby │                     │  └─────┬──────┘           │
│   └────┬────┘                     │        │ 리소스 확보      │
│        │                          │        │                  │
│        │ DPC로 즉시 실행 요청     │◄───────┘                  │
│        │                          │                           │
│        └──────────────────────────┘                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 스레드 종료
                                 ▼
                          ┌────────────┐
                          │ Terminated │
                          └────────────┘
```

## 예시

공항에 비유할 수 있다:

- **Initializing**: 탑승권 발급 중
- **Ready**: 게이트 앞 대기 줄
- **Deferred-Ready**: 우선 탑승 대상으로 지정됨, 아직 안내 전
- **Standby**: "다음 탑승자"로 호명됨, 게이트 직전 대기
- **Running**: 비행기에 탑승하여 좌석에 앉음 (CPU 사용 중)
- **Waiting**: 기내식 나오기를 기다림 (I/O 대기)
- **Transition**: 수화물이 아직 안 실림 (커널 스택 페이지 인 대기)
- **Terminated**: 목적지 도착, 하기

### 장단점

- **장점**: 세분화된 상태로 정밀한 스케줄링 가능, Standby 상태로 선점 지연 최소화, Transition 상태로 리소스 부족 상황 명시적 처리
- **단점**: 상태 전이 로직 복잡성 증가, Deferred-Ready와 Standby의 미묘한 차이가 디버깅을 어렵게 함

## 관련 개념

- [Windows 커널 디스패처](/knowledge/os/windows-kernel-dispatcher/) - 상태 전이를 관리하는 컴포넌트
- [Windows 스레드 스케줄링](/knowledge/os/windows-thread-scheduling/) - 스케줄링 정책
- [디스패처 객체 (Dispatcher Objects)](/knowledge/os/dispatcher-objects/) - Waiting 상태의 대기 대상
- [프로세스 상태 (Process State)](/knowledge/os/process-state/) - 전통적 5상태 모델과 비교
