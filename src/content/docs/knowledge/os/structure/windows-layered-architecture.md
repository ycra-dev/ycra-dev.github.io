---
title: "Windows 계층 구조 (Windows Layered Architecture)"
description: "HAL, Kernel, Executive 3개 계층으로 구성된 Windows의 모듈형 운영체제 아키텍처"
tags: ["OS", "Windows", "Architecture"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/windows-layered-architecture
sidebar:
  order: 23
---

## 핵심 개념

Windows는 **HAL, Kernel, Executive** 3개 계층으로 구성된 모듈형 운영체제 아키텍처이다. 이식성(portability)과 확장성(extensibility)을 동시에 달성하기 위해 계층적 분리를 채택했다.

## 동작 원리

각 계층은 하위 계층의 서비스만 사용하고, 상위 계층에 인터페이스를 제공한다.

### 3개 계층

1. **HAL (Hardware Abstraction Layer)**: 하드웨어 칩셋 차이를 숨기고 가상 하드웨어 인터페이스 제공
2. **Kernel**: 스레드 스케줄링, 인터럽트/예외 처리, 동기화 프리미티브, 커널-유저 모드 전환
3. **Executive**: 객체 관리자, VM 관리자, 프로세스 관리자, I/O 관리자 등 고수준 서비스 제공

```
┌─────────────────────────────────────────┐
│           User Mode Subsystems          │  ← Win32, POSIX 환경 서브시스템
├─────────────────────────────────────────┤
│              Executive                  │  ← 객체/VM/프로세스/I/O 관리자
├─────────────────────────────────────────┤
│               Kernel                    │  ← 스케줄링, 동기화, 인터럽트
├─────────────────────────────────────────┤
│                 HAL                     │  ← 하드웨어 추상화
├─────────────────────────────────────────┤
│              Hardware                   │
└─────────────────────────────────────────┘
```

## 예시

건물 구조와 유사하다. HAL은 기초(어떤 땅 위에도 건물을 세울 수 있게 함), Kernel은 골조(기본 구조), Executive는 내부 설비(전기, 수도 등 실제 서비스)에 해당한다.

새로운 CPU 아키텍처로 이식할 때, HAL과 Kernel의 아키텍처 의존적 코드만 수정하면 되고, Executive와 사용자 모드 코드는 거의 수정 없이 재사용 가능하다.

### 장단점

- **장점**: 이식성 (HAL만 교체하면 다른 칩셋에서 동작), 확장성 (새 기능을 Executive에 모듈로 추가 가능), 안정성 (계층 분리로 버그 격리 용이)
- **단점**: 오버헤드 (계층 간 호출 시 간접 비용 발생), 복잡성 (계층 간 인터페이스 설계가 복잡)

## 관련 개념

- [HAL (Hardware Abstraction Layer)](/knowledge/os/hal/) - Windows HAL의 상세 구조
- [Windows 10 계층 아키텍처](/knowledge/os/windows10-architecture/) - VSM이 추가된 현대 Windows 아키텍처
- [계층적 접근 (Layered Approach)](/knowledge/os/layered-approach/) - 계층적 OS 설계의 일반적 개념
- [객체 관리자 (Object Manager)](/knowledge/os/object-manager/) - Executive의 핵심 컴포넌트
