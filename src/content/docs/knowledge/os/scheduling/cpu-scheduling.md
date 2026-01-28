---
title: "CPU 스케줄링 (CPU Scheduling)"
description: "Ready 상태의 프로세스 중 어떤 것에 CPU를 할당할지 결정하는 메커니즘"
tags: ["OS", "Scheduling"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/cpu-scheduling
sidebar:
  order: 1
---

## 핵심 개념

CPU 스케줄링은 멀티프로그래밍 OS에서 **Ready Queue에 있는 프로세스 중 어떤 것에 CPU를 줄지 결정**하는 메커니즘이다.

단일 CPU에서는 한 번에 하나의 프로세스만 실행할 수 있다. 어떤 프로세스가 I/O를 기다리는 동안 CPU가 놀고 있으면 낭비이므로, 다른 프로세스에게 CPU를 넘겨주는 것이 효율적이다. 이 "누구에게 넘겨줄지"를 결정하는 것이 CPU 스케줄링이다.

비유하면 **은행 창구**와 같다. 고객(프로세스)이 서비스(CPU)를 받기 위해 대기하는 상황에서, 어떤 순서로 고객을 부를지 결정하는 것이 스케줄링이다.

## 동작 원리

### CPU-I/O 버스트 사이클

프로세스 실행은 **CPU burst**(CPU 실행)와 **I/O burst**(I/O 대기)의 반복 사이클로 구성된다.

```
프로세스 실행 흐름:
┌─────────┐    ┌─────────┐    ┌─────────┐
│CPU burst│───>│I/O burst│───>│CPU burst│───> ...
└─────────┘    └─────────┘    └─────────┘
```

- **I/O-bound 프로세스**: 짧은 CPU burst가 많음 (예: 웹 서버의 사용자 요청 처리)
- **CPU-bound 프로세스**: 긴 CPU burst가 적음 (예: 과학 연산, 데이터 처리)

### CPU 스케줄러

Ready Queue에서 다음에 실행할 프로세스를 **선택**하는 역할을 한다. Ready Queue는 FIFO 큐, 우선순위 큐, 트리, 연결 리스트 등 다양한 자료구조로 구현할 수 있다.

### 디스패처 (Dispatcher)

스케줄러가 선택한 프로세스에게 실제로 CPU 제어권을 넘기는 모듈이다.

디스패처의 역할:
1. **문맥 교환(Context Switch)** 수행
2. **사용자 모드**로 전환
3. 사용자 프로그램의 적절한 위치로 **점프**

```
스케줄링 흐름:
┌──────────────┐      ┌───────────┐      ┌─────────┐
│ Ready Queue  │─────>│ Scheduler │─────>│Dispatcher│─────> CPU
│ (PCB들)      │      │ (선택)     │      │ (전환)   │
└──────────────┘      └───────────┘      └─────────┘
```

**디스패치 지연(Dispatch Latency)**: 한 프로세스를 멈추고 다른 프로세스를 시작하는 데 걸리는 시간이다. 이 시간은 순수한 오버헤드이므로 가능한 짧아야 한다.

## 예시

웹 서버를 생각해 보자. 사용자 요청 처리(I/O-bound)와 데이터 분석(CPU-bound) 작업이 혼재한다.

- **스케줄링이 없으면**: 데이터 분석이 CPU를 독점하여 사용자 요청 응답이 지연됨
- **스케줄링이 있으면**: I/O-bound 작업이 I/O를 기다리는 동안 CPU-bound 작업이 실행되고, I/O가 완료되면 다시 I/O-bound 작업에 CPU를 넘김

| 지표 | 설명 |
|------|------|
| CPU 이용률 | 40~90%까지 향상 가능 |
| 처리량(Throughput) | 단위 시간당 완료되는 프로세스 수 증가 |
| 응답 시간 | 사용자 요청에 대한 반응 속도 개선 |

## 관련 개념

- [프로세스](/knowledge/os/process/) - CPU 스케줄링의 대상
- [프로세스 상태](/knowledge/os/process-state/) - Ready 상태에서 Running 상태로 전이
- [컨텍스트 스위치](/knowledge/os/context-switch/) - 디스패처가 수행하는 핵심 작업
- [선점형 스케줄링](/knowledge/os/preemptive-scheduling/) - 선점형 vs 비선점형 결정
- [스케줄링 평가 기준](/knowledge/os/scheduling-criteria/) - 스케줄링 알고리즘 평가 지표
- [CFS 스케줄러](/knowledge/os/cfs-scheduler/) - Linux의 기본 CPU 스케줄러
