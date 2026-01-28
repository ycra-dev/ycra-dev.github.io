---
title: "Mach 운영체제"
description: "IPC, 가상 메모리, 스케줄링만 커널에 두고 나머지를 사용자 수준 서버와 에뮬레이션 라이브러리로 구현하는 마이크로커널 운영체제"
tags: ["OS", "Mach", "Microkernel"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/mach-overview
sidebar:
  order: 18
---

## 핵심 개념

Mach는 **멀티프로세서와 분산 시스템**을 지원하기 위해 설계된 마이크로커널 기반 운영체제로, BSD UNIX와 완전한 호환성을 제공한다. Carnegie Mellon University(CMU)에서 Accent 운영체제의 후속으로 개발되었다.

핵심 설계 원칙: OS 기능 대부분은 커널 외부에서 구현해도 된다. 커널은 **최소한의 메커니즘**만 제공하고, 정책은 사용자 수준에서 결정한다.

비유하면, 마이크로커널은 "전화 교환기"와 같다. 교환기(커널)는 통화 연결(IPC)만 담당하고, 실제 대화 내용과 서비스(OS 기능)는 통화 당사자(서버)가 처리한다.

## 동작 원리

### 마이크로커널에 포함되는 것

| 컴포넌트 | 역할 |
|----------|------|
| Tasks & Threads | 실행 단위 관리 |
| IPC (Ports, Messages) | 프로세스 간 통신 |
| Virtual Memory | 주소 공간, 메모리 매핑 |
| Scheduling | CPU 할당 |

### 사용자 수준에서 구현되는 것

파일 시스템, 네트워크 프로토콜 스택, 장치 드라이버(일부), OS 인터페이스(BSD, DOS, Macintosh OS 등)

### OS 에뮬레이션 구조

```
┌──────────────────────────────────────────────────────────┐
│                    User Space                            │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │BSD App   │ │DOS App   │ │Mac App   │ │DB Server │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │
│  ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐     │          │
│  │BSD       │ │DOS       │ │Mac       │     │          │
│  │Emulation │ │Emulation │ │Emulation │     │          │
│  │Library   │ │Library   │ │Library   │     │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘     │          │
│  ┌────▼────────────▼────────────▼────────────▼───────┐ │
│  │              OS Servers (multithreaded)            │ │
│  └────────────────────────────┬──────────────────────┘ │
└───────────────────────────────┼──────────────────────────┘
                                │ IPC (messages)
┌───────────────────────────────▼──────────────────────────┐
│                    Mach Microkernel                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │Tasks/    │ │   IPC    │ │ Virtual  │ │Scheduling│   │
│  │Threads   │ │          │ │ Memory   │ │          │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└──────────────────────────────────────────────────────────┘
```

### 시스템 콜 흐름

1. Application이 시스템 콜 호출
2. Emulation Library가 가로챔 → 라이브러리에서 처리 가능하면 직접 처리
3. 불가능하면 Server로 IPC 메시지 전송
4. Server가 Mach Kernel의 시스템 콜로 처리
5. 결과 반환

### Mach 버전별 차이

| 버전 | BSD 코드 위치 | 특징 |
|------|--------------|------|
| Mach 2.5 | 커널 내부 | BSD 완전 호환, 커널 비대 |
| Mach 3.0 | 사용자 공간 서버 | 진정한 마이크로커널, 다중 OS 동시 실행 |

### MIG (Mach Interface Generator)

인터페이스 정의를 입력받아 RPC 스텁 코드를 자동 생성하여, 메시지 송수신 보일러플레이트 코드를 제거하고 타입 안전한 IPC를 제공한다.

## 예시

BSD 프로그램이 `open()` 시스템 콜을 호출하면:
1. 에뮬레이션 라이브러리가 호출을 가로챔
2. BSD 서버로 메시지 전송
3. BSD 서버가 파일 시스템 로직 수행
4. 결과를 메시지로 반환
5. 동시에 DOS 프로그램도 별도 서버를 통해 실행 가능

## 관련 개념

- [마이크로커널 (Microkernel)](/knowledge/os/microkernel/) - Mach의 설계 철학
- [Mach Port](/knowledge/os/mach-port/) - Mach의 통신 채널
- [Mach 메시지와 IPC](/knowledge/os/mach-message-ipc/) - CoW 기반 메시지 전달
- [Mach Task와 Thread](/knowledge/os/mach-task-thread/) - 실행 단위 모델
- [Mach 메모리 객체](/knowledge/os/mach-memory-object/) - 외부 메모리 관리자
- [Darwin](/knowledge/os/darwin/) - Mach를 기반으로 한 macOS/iOS 커널
