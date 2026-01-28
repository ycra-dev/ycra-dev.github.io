---
title: "Windows 스레드 스케줄링 (Windows Thread Scheduling)"
description: "32단계 우선순위 기반 선점형 스케줄링을 사용하여 스레드 단위로 CPU를 할당하는 Windows의 스케줄링 정책"
tags: ["OS", "Windows", "Scheduling"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/windows-thread-scheduling
sidebar:
  order: 15
---

## 핵심 개념

Windows는 **32단계 우선순위 기반 선점형(preemptive) 스케줄링**을 사용하며, **스레드 단위**로 CPU를 할당한다. 대화형 응답성과 실시간 처리를 동시에 지원하면서, I/O-bound와 CPU-bound 스레드 간 균형을 맞춘다.

## 동작 원리

### 32단계 우선순위

```
우선순위 31 ┌─────────────────────┐
    ...     │   Real-time class   │ ← 고정, 시간 결정적 작업
우선순위 16 └─────────────────────┘
우선순위 15 ┌─────────────────────┐
    ...     │   Variable class    │ ← 동적 조정, 일반 앱
우선순위 1  └─────────────────────┘
우선순위 0  ┌─────────────────────┐
            │   Idle thread       │
            └─────────────────────┘
```

- **0**: 시스템 예약 (idle thread)
- **1~15**: Variable class — 일반 스레드, 동적 조정 가능
- **16~31**: Real-time class — 고정 우선순위

### 동적 우선순위 조정 (Variable class만)

- **I/O 완료 시**: 우선순위 부스트 (키보드 → 큰 부스트, 디스크 → 작은 부스트)
- **Time quantum 소진 시**: 우선순위 감소
- **포그라운드 윈도우**: quantum 3배 증가

### 6가지 스레드 상태

| 상태 | 설명 |
|------|------|
| Ready | 실행 대기 중 |
| Standby | 다음 실행 예정 (프로세서당 1개) |
| Running | 현재 실행 중 |
| Waiting | 이벤트/I/O 대기 중 |
| Transition | 커널 스택 스왑 대기 |
| Terminated | 종료됨 |

## 예시

병원 응급실 트리아지에 비유할 수 있다. 위급한 환자(high priority)가 들어오면 진료 중인 환자(low priority)를 잠시 중단하고 먼저 치료한다. 같은 위급도면 순서대로 진료한다.

사용자가 문서 작업 중(포그라운드) 백그라운드에서 컴파일을 실행하는 시나리오: 문서 편집기는 quantum이 3배가 되어 더 부드럽게 반응하고, 컴파일러는 남는 CPU 시간에 실행된다.

### 장단점

- **장점**: 응답성 (I/O-bound 스레드에 부스트 → 대화형 앱이 빠르게 반응), 유연성 (동적 조정으로 다양한 워크로드 대응), 공정성 (quantum 소진 시 우선순위 낮춤 → CPU-bound 독점 방지)
- **단점**: Hard real-time 미지원 (DPC/ISR 실행 중에는 스레드 선점 불가), 우선순위 역전 가능 (낮은 우선순위가 락 보유 시 높은 우선순위 대기)

## 관련 개념

- [Windows 커널 디스패처](/knowledge/os/windows-kernel-dispatcher/) - 스케줄링을 실행하는 커널 컴포넌트
- [Windows 스레드 상태](/knowledge/os/windows-thread-state/) - 8가지 스레드 상태 상세
- [디스패처 객체 (Dispatcher Objects)](/knowledge/os/dispatcher-objects/) - 동기화 프리미티브
- [CFS 스케줄러](/knowledge/os/cfs-scheduler/) - Linux의 공정 스케줄러와 대비
