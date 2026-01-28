---
title: "Windows 커널 디스패처 (Windows Kernel Dispatcher)"
description: "스레드 스케줄링, 컨텍스트 스위칭, 동기화 프리미티브 관리를 담당하는 Windows 커널의 핵심 컴포넌트"
tags: ["OS", "Windows", "Scheduling"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/windows-kernel-dispatcher
sidebar:
  order: 25
---

## 핵심 개념

Windows 디스패처는 **스레드 스케줄링, 컨텍스트 스위칭, 동기화 프리미티브 관리, 인터럽트/예외 처리**를 담당하는 커널의 핵심 컴포넌트이다. 별도 스케줄러 스레드가 아니라, 현재 실행 중인 스레드가 커널 모드로 전환 후 디스패처 코드를 실행한다.

## 동작 원리

### 32레벨 우선순위 체계

- **레벨 0**: 아이들 스레드 전용
- **Variable class (1-15)**: 일반 스레드, I/O 완료 시 부스트 적용/해제
- **Static class (16-31)**: 실시간 스레드, 우선순위 고정

### 디스패처 데이터베이스

우선순위별 ready 큐(연결 리스트)와 **비트맵**으로 구성된다. 비트맵에서 최상위 비트를 찾아 해당 큐의 첫 스레드를 선택하면 **O(1) 상수 시간 스케줄링**이 가능하다.

```
비트맵: [0][0][1][0][1][0]...  (비트 위치 = 우선순위)
              ↓     ↓
         Ready Queue at Priority 2
         ┌────┬────┬────┐
         │ T1 │ T2 │ T3 │ → 라운드로빈
         └────┴────┴────┘

         Ready Queue at Priority 4
         ┌────┐
         │ T4 │
         └────┘
```

### 선점 메커니즘

높은 우선순위 스레드가 ready 되면 낮은 우선순위 스레드를 즉시 선점한다. 기본 15ms 클럭 틱마다 퀀텀 소진 여부를 확인하고, 소진 시 같은 우선순위 라운드로빈을 수행한다.

### 디스패처 실행 흐름

```
Thread A (User Mode, Priority 8)
    │
    │ 시스템 콜 또는 인터럽트
    ▼
Thread A (Kernel Mode)
    │
    │ I/O 완료 → Thread B(Priority 12) 깨움
    ▼
Thread A가 디스패처 코드 실행
    │
    │ B > A 우선순위 → A를 ready 큐에 넣고 B로 컨텍스트 스위치
    ▼
Thread B (Kernel Mode)
    │
    │ 시스템 콜 반환
    ▼
Thread B (User Mode)
```

## 예시

응급실 트리아지에 비유할 수 있다. 환자(스레드)가 도착하면 긴급도(우선순위)에 따라 즉시 치료실(CPU)로 들어가거나 대기한다. 더 긴급한 환자가 오면 현재 치료 중인 환자를 밀어내고(선점) 먼저 치료한다.

### 장단점

- **장점**: 즉시 선점으로 응답성 우수, 비트맵 + 연결 리스트로 O(1) 스케줄링, 별도 스케줄러 스레드 없이 오버헤드 감소
- **단점**: 하드 리얼타임 보장 불가 (DPC/ISR이 스레드를 무기한 블록 가능), 우선순위 역전 가능, Variable class의 동적 부스트 로직이 복잡

## 관련 개념

- [디스패처 객체 (Dispatcher Objects)](/knowledge/os/dispatcher-objects/) - 디스패처의 동기화 프리미티브
- [Windows 스레드 상태](/knowledge/os/windows-thread-state/) - 디스패처가 관리하는 스레드 상태
- [Windows 스레드 스케줄링](/knowledge/os/windows-thread-scheduling/) - 스케줄링 정책 상세
- [APC와 DPC](/knowledge/os/apc-dpc/) - 소프트웨어 인터럽트 메커니즘
- [IRQL](/knowledge/os/windows-irql/) - 인터럽트 우선순위 체계
