---
title: "IRQL (Interrupt Request Levels)"
description: "Windows가 하드웨어/소프트웨어 인터럽트의 우선순위를 관리하는 계층적 체계"
tags: ["OS", "Windows", "Interrupt"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/windows-irql
sidebar:
  order: 16
---

## 핵심 개념

IRQL은 Windows가 하드웨어/소프트웨어 인터럽트의 **우선순위를 관리하는 체계**로, 현재 IRQL 이하의 모든 인터럽트는 마스킹(블로킹)된다. 인터럽트가 무분별하게 발생하면 중요한 처리가 방해받기 때문에, 소프트웨어적 우선순위 체계로 인터럽트를 통제한다.

비유하면, 병원 우선순위 시스템과 같다. PASSIVE_LEVEL은 일반 진료, DISPATCH_LEVEL은 응급실 트리아지, Device IRQL은 수술 중, HIGH_LEVEL은 심정지 환자. 심정지 환자(HIGH) 처리 중에는 다른 모든 환자가 대기한다.

## 동작 원리

### 16개 IRQL 레벨 (AMD64/ARM 기준)

```
HIGH_LEVEL (15) ─────────── 시스템 크래시 처리
Power (14) ─────────────── 전원 실패
IPI (13) ───────────────── 프로세서 간 통신
Clock (12) ─────────────── 타이머, 퀀텀 관리
Profile (11) ───────────── 프로파일링

Device IRQLs (3-10) ────── 하드웨어 인터럽트
                           (네트워크, 디스크, USB 등)

DISPATCH_LEVEL (2) ─────── DPC, 디스패처
APC_LEVEL (1) ──────────── APC 처리
PASSIVE_LEVEL (0) ─────── 일반 스레드 실행

        ↑ 높은 IRQL
        │
        │ 현재 IRQL 이하의 인터럽트는 블로킹
        │
        ↓ 낮은 IRQL
```

| IRQL | 이름 | 용도 |
|------|------|------|
| 0 | PASSIVE_LEVEL | 일반 스레드 실행 (유저/커널 모드) |
| 1 | APC_LEVEL | APC(비동기 프로시저 호출) 처리 |
| 2 | DISPATCH_LEVEL | DPC 처리, 디스패처 실행 |
| 3-10 | Device IRQL | 하드웨어 I/O 인터럽트 |
| 11 | Profile | 프로파일링 |
| 12 | Clock | 시스템 클럭 (퀀텀 관리) |
| 13 | IPI | 프로세서 간 인터럽트 |
| 14 | Power | 전원 실패 |
| 15 | HIGH_LEVEL | 최고 우선순위, 크래시 처리 |

### 핵심 규칙

- **마스킹**: CPU의 현재 IRQL보다 낮거나 같은 인터럽트는 블로킹. IRQL이 낮아지면 대기 중 인터럽트 서비스
- **CPU별 독립**: 멀티프로세서에서 각 CPU는 자체 IRQL을 가짐. CPU 0이 DISPATCH_LEVEL이어도 CPU 1은 PASSIVE_LEVEL일 수 있음
- **DISPATCH_LEVEL 이상에서는 페이지 폴트 불가**: 페이징 I/O가 스케줄러 호출을 필요로 하기 때문

## 예시

```
IRQL 상승/하강 흐름:

스레드 (PASSIVE)
    │
    │ 디스크 인터럽트
    ▼
ISR (Device IRQL 7)
    │
    │ DPC 큐잉
    │ ISR 완료
    ▼
DPC (DISPATCH_LEVEL 2)
    │
    │ I/O 완료 처리
    │ DPC 완료
    ▼
스레드 (PASSIVE_LEVEL 0)
```

1. 스레드가 PASSIVE_LEVEL에서 실행 중
2. 디스크 I/O 완료 → Device IRQL 인터럽트 발생
3. CPU가 Device IRQL로 상승, ISR 실행
4. ISR이 DPC 큐잉 후 완료
5. CPU가 DISPATCH_LEVEL로 하강, DPC 실행
6. DPC 완료 후 PASSIVE_LEVEL로 복귀, 원래 스레드 재개

## 관련 개념

- [APC와 DPC](/knowledge/os/apc-dpc/) - IRQL 1, 2에서 처리되는 소프트웨어 인터럽트
- [디스패처 객체 (Dispatcher Objects)](/knowledge/os/dispatcher-objects/) - DISPATCH_LEVEL에서 동작
- [HAL](/knowledge/os/hal/) - Device IRQL 할당을 관리
- [I/O Manager와 IRP](/knowledge/os/windows-io-manager/) - IRP 완료가 IRQL 전환과 연계
