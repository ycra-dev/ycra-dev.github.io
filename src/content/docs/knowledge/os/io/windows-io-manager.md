---
title: "I/O Manager와 IRP (Windows)"
description: "Windows Executive의 I/O Manager가 IRP(I/O Request Packet)로 드라이버 스택을 통해 I/O를 처리하는 구조"
tags: ["OS", "IO", "Windows"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/windows-io-manager
sidebar:
  order: 13
---

## 핵심 개념

I/O Manager는 **Windows Executive**의 구성 요소로, 모든 I/O 요청을 **IRP(I/O Request Packet)**로 변환하여 드라이버 스택을 통해 처리한다. 파일 시스템, 네트워크, 장치 드라이버 등 다양한 I/O 컴포넌트를 일관되게 관리하기 위해 설계되었다.

비유하면, IRP는 **운송장이 붙은 택배 상자**와 같다. 배송 센터(드라이버)를 거칠 때마다 처리되고, 최종 목적지까지 전달된 후 수령 확인(완료 통지)이 발신자에게 돌아온다.

## 동작 원리

### 드라이버 스택 구조

```
┌──────────────────────────────────────┐
│           응용 프로그램               │
└──────────────────┬───────────────────┘
                   │ I/O 요청
                   ▼
┌──────────────────────────────────────┐
│           I/O Manager                │
│         (IRP 생성 및 관리)            │
└──────────────────┬───────────────────┘
                   │ IRP
                   ▼
┌──────────────────────────────────────┐
│     File System Filter Driver        │ (예: 안티바이러스)
└──────────────────┬───────────────────┘
                   │ IRP
                   ▼
┌──────────────────────────────────────┐
│         File System Driver           │ (예: NTFS)
└──────────────────┬───────────────────┘
                   │ IRP
                   ▼
┌──────────────────────────────────────┐
│          Volume Manager              │ (예: FtDisk)
└──────────────────┬───────────────────┘
                   │ IRP
                   ▼
┌──────────────────────────────────────┐
│           Disk Driver                │ (예: disk.sys)
└──────────────────┬───────────────────┘
                   │ IRP
                   ▼
┌──────────────────────────────────────┐
│         Port/Miniport Driver         │ (예: AHCI)
└──────────────────┬───────────────────┘
                   │
                   ▼
               Hardware
```

### 비동기 I/O 완료 과정

1. 앱이 비동기 I/O 요청
2. I/O Manager가 IRP 생성, 드라이버 스택 전달
3. 디스크 드라이버가 DMA 시작, `STATUS_PENDING` 반환
4. 앱은 다른 작업 수행
5. DMA 완료 → ISR → DPC 큐잉
6. DPC가 IRP 완료 처리
7. APC로 앱에 완료 통지 또는 I/O Completion Port 시그널

### 드라이버 모델

| 모델 | 설명 |
|------|------|
| **WDM** | Windows Driver Model - 전체 스펙 구현 |
| **KMDF** | Kernel-Mode Driver Framework - WDM 위 단순화 |
| **UMDF** | User-Mode Driver Framework - 유저 모드 드라이버 |
| **Port/Miniport** | 클래스 드라이버 + 디바이스별 미니포트 |

## 예시

파일 읽기 시:
1. 안티바이러스 필터가 먼저 IRP를 검사
2. NTFS가 클러스터 매핑 수행
3. 디스크 드라이버가 실제 읽기 수행
4. 완료 후 역순으로 IRP가 올라가며 각 드라이버가 완료 처리

## 관련 개념

- [DMA (Direct Memory Access)](/knowledge/os/dma/) - 디스크 드라이버가 사용하는 전송 방식
- [APC와 DPC](/knowledge/os/apc-dpc/) - IRP 완료 처리에 사용되는 메커니즘
- [HAL](/knowledge/os/hal/) - 하드웨어 추상화 계층
- [IRQL](/knowledge/os/windows-irql/) - 인터럽트 우선순위 관리 체계
