---
title: "Windows 10 계층 아키텍처 (Windows 10 Architecture)"
description: "프로세서 권한 레벨과 하이퍼바이저 가상 신뢰 수준(VTL)을 조합하여 이중 격리를 제공하는 Windows 10의 계층적 아키텍처"
tags: ["OS", "Windows", "Architecture", "Security"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/windows10-architecture
sidebar:
  order: 24
---

## 핵심 개념

Windows 10은 프로세서의 권한 레벨(유저/커널 모드)과 하이퍼바이저의 **가상 신뢰 수준(VTL)**을 조합하여 **이중 격리**를 제공하는 계층적 운영체제이다.

단순한 유저/커널 모드 분리만으로는 커널이 침해당했을 때 모든 보안이 무너진다. Windows 10은 **VSM(Virtual Secure Mode)**을 추가하여 커널 침해 시에도 핵심 자격 증명을 보호한다.

## 동작 원리

### 이중 격리

1. **수직적 격리 (프로세서 제공)**: 유저 모드(ring 3)와 커널 모드(ring 0)로 분리. 유저 모드 코드는 직접 하드웨어 접근 불가.
2. **수평적 격리 (하이퍼바이저 제공)**: VSM 활성화 시 Normal World(VTL 0)와 Secure World(VTL 1)로 분리.

### 전체 계층 구조

```
┌─────────────────────────────────────────────────────────────┐
│                      User Mode                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │   Apps   │ │ Services │ │  csrss   │ │ Subsystem DLLs │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘  │
│                        ntdll.dll                            │
├─────────────────────────────────────────────────────────────┤
│                     Kernel Mode                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                     Executive                          │ │
│  │  Object Mgr │ VMM │ Process Mgr │ I/O Mgr │ Cache Mgr │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌─────────────────┐  ┌────────────────────────────────┐   │
│  │     Kernel      │  │        Device Drivers          │   │
│  │   (Dispatcher)  │  │  (File System, Network, etc.)  │   │
│  └─────────────────┘  └────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│              HAL (Hardware Abstraction Layer)               │
├─────────────────────────────────────────────────────────────┤
│              Hyper-V Hypervisor (VSM 활성화 시)              │
├─────────────────────────────────────────────────────────────┤
│                       Hardware                              │
└─────────────────────────────────────────────────────────────┘
```

### VSM (Virtual Secure Mode)

VSM이 활성화되면 Hyper-V 하이퍼바이저가 SLAT(Second Level Address Translation)를 사용하여 Normal World와 Secure World를 완전히 격리한다. Credential Guard 같은 보안 기능이 VTL 1의 Trustlet에서 동작하여 커널 침해 시에도 자격 증명을 보호한다.

## 예시

은행 건물에 비유할 수 있다. 일반 고객(유저 모드)은 창구에서만 업무를 본다. 직원(커널 모드)은 금고실에 접근 가능하다. VSM은 "금고 안의 금고"를 만드는 것이다 — 직원이 털려도 최고 기밀(자격 증명)은 Secure World에서 별도 보호된다.

Credential Guard가 활성화된 시스템에서 커널 익스플로잇이 발생해도, 자격 증명은 VTL 1의 Trustlet에서 관리되므로 공격자가 탈취할 수 없다.

### 장단점

- **장점**: 이식성 (HAL 덕분에 동일 커널로 다양한 칩셋 지원), 확장성 (드라이버를 동적으로 로드/언로드), 보안 심층 방어 (VSM으로 커널 침해 시에도 핵심 자격 증명 보호)
- **단점**: 복잡성 (계층 간 호출 오버헤드), VSM 활성화 시 하이퍼바이저가 상시 동작하여 약간의 성능 저하, Secure World는 서비스 거부에 취약 (Normal World에 스케줄링 의존)

## 관련 개념

- [Windows 계층 구조](/knowledge/os/windows-layered-architecture/) - 기본 3계층 아키텍처
- [HAL (Hardware Abstraction Layer)](/knowledge/os/hal/) - 하드웨어 추상화
- [보호 링 (Protection Ring)](/knowledge/os/protection-ring/) - 동심원 계층의 하드웨어 기반 권한 분리
- [가상화 (Virtualization)](/knowledge/os/virtualization/) - VSM의 기반인 가상화 기술
