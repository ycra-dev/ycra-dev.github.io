---
title: "APC와 DPC (Asynchronous/Deferred Procedure Call)"
description: "Windows에서 인터럽트 지연 처리(DPC)와 스레드별 비동기 작업(APC)을 위한 소프트웨어 인터럽트 메커니즘"
tags: ["OS", "Windows", "Interrupt"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/apc-dpc
sidebar:
  order: 13
---

## 핵심 개념

**DPC(Deferred Procedure Call)**는 ISR(인터럽트 서비스 루틴)의 지연 처리를 위해 현재 프로세서에서 프로세스 컨텍스트 없이 실행되는 메커니즘이다.

**APC(Asynchronous Procedure Call)**는 특정 스레드 컨텍스트에서 실행되는 비동기 작업 메커니즘이다.

Windows는 인터럽트 처리를 "긴급 처리(ISR)"와 "지연 처리(DPC)"로 분리하고, 스레드 간 비동기 통신은 APC로 해결한다.

### 왜 필요한가?

- ISR은 빠르게 완료되어야 하므로 복잡한 처리를 할 수 없다
- 인터럽트 처리의 대부분은 긴급하지 않아 나중에 처리해도 된다
- 특정 스레드에게 비동기적으로 작업을 요청해야 할 때가 있다

## 동작 원리

### DPC (Deferred Procedure Call)

비유하면 응급실 의사가 환자 초기 처치(ISR) 후 "이후 검사는 간호사에게"라고 메모(DPC 큐잉)하는 것이다. 간호사(DPC 핸들러)는 의사가 다음 환자 보는 동안 검사를 수행한다.

**메커니즘:**

1. ISR이 긴급 작업만 처리 후 DPC를 큐에 등록
2. ISR 완료 후 IRQL이 DISPATCH_LEVEL(2)로 하강하면 DPC 실행
3. DPC는 IRQL 2에서 실행하므로 다른 Device ISR을 블로킹하지 않음
4. 프로세스 컨텍스트 가정 없음 (어떤 스레드가 인터럽트되었는지 모름)
5. **제약**: 페이지 폴트 불가, 디스패처 객체 대기 불가

**Windows IRQL 레벨 (높은 순):**

```
31: Machine Check
30: Power Fail
29: IPI (Inter-Processor Interrupt)
28: Clock
 3~26: Device IRQ (하드웨어 인터럽트)
 2: DPC/Dispatch  ← DPC 실행
 1: APC           ← APC 실행
 0: Passive       ← 일반 스레드 실행
```

**DPC 흐름:**

```
  Device Interrupt
        │
        v
┌───────────────────┐
│ ISR (IRQL 7)      │ <- 긴급 처리만
│ - 디바이스 ACK    │
│ - DPC 큐잉        │
└─────────┬─────────┘
          │ ISR 완료
          v
┌───────────────────┐
│ DPC (IRQL 2)      │ <- 지연 처리
│ - 데이터 복사     │
│ - 버퍼 관리       │
│ - APC 큐잉 (필요시)│
└─────────┬─────────┘
          │ DPC 완료
          v
┌───────────────────┐
│ Thread (IRQL 0)   │ <- 일반 실행 재개
└───────────────────┘
```

**용도:**
- I/O 완료 후속 처리
- 타이머 만료 처리
- 퀀텀 종료 시 스레드 재스케줄링

### APC (Asynchronous Procedure Call)

비유하면 특정 직원(스레드)에게 "네가 쉬는 시간(alertable wait)에 이 서류 처리해"라고 메모를 전달하는 것이다.

**메커니즘:**

1. APC는 특정 스레드에 큐잉됨 (DPC는 프로세서에 큐잉)
2. 두 종류:
   - **커널 모드 APC**: IRQL 1(APC_LEVEL)에서 즉시 실행. 커널 모드 대기도 중단 가능
   - **유저 모드 APC**: 스레드가 alertable 대기 상태일 때만 실행
3. 해당 스레드의 프로세스 컨텍스트에서 실행

**용도:**
- 스레드 일시 중지/재개
- 스레드 강제 종료
- 비동기 I/O 완료 콜백 (유저 모드)
- 스레드 컨텍스트(레지스터) 추출/수정

### DPC vs APC 비교

| 항목 | DPC | APC |
|------|-----|-----|
| 타겟 | 프로세서 | 특정 스레드 |
| IRQL | 2 (DISPATCH) | 1 (APC) |
| 프로세스 컨텍스트 | 없음 | 있음 |
| 페이지 폴트 | 불가 | 커널 APC: 불가, 유저 APC: 가능 |
| 대기(wait) | 불가 | 커널 APC: 제한적, 유저 APC: 가능 |
| 용도 | ISR 지연 처리 | 스레드 비동기 통신 |

## 예시

네트워크 패킷 수신 시 DPC와 APC가 함께 동작하는 시나리오:

```
Thread A: ReadFile() -> 비동기 I/O 시작 -> alertable wait
                                                │
DPC: I/O 완료 처리 -> Thread A에 유저 APC 큐잉  │
                                                │
Thread A: alertable wait 중 APC 감지 ───────────┘
        │
        v
  유저 모드 APC 실행 (콜백 함수)
        │
        v
  Thread A: wait에서 반환, 결과 처리
```

상세 단계:

1. 네트워크 카드 인터럽트 발생 -> ISR 실행 (IRQL 7)
2. ISR이 패킷 수신 확인 후 DPC 큐잉
3. IRQL이 2로 하강 -> DPC가 패킷 파싱, 소켓 버퍼에 복사
4. DPC가 I/O 완료 대기 중인 스레드에 APC 큐잉
5. 스레드가 alertable wait에서 깨어나 유저 모드 APC 실행 (콜백 호출)

### 장단점

- **장점**: DPC로 ISR 실행 시간 최소화하여 인터럽트 레이턴시 감소, APC로 프로세스 컨텍스트가 필요한 작업 처리 가능
- **단점**: DPC가 너무 길면 스레드 스케줄링 지연(IRQL 2 > 스레드). DPC가 과도하게 발생하면 일반 스레드가 기아 상태에 빠지는 **DPC storm** 문제 발생 가능. 유저 APC는 alertable wait에서만 실행되어 예측 어려움

## 관련 개념

- [인터럽트 처리](/knowledge/os/interrupt/)
- [ALPC (Advanced Local Procedure Call)](/knowledge/os/alpc/)
- [프로세스 간 통신 (IPC)](/knowledge/os/ipc-models/)
