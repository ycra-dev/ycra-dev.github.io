---
title: "샌드박싱 (Sandboxing)"
description: "프로세스가 수행할 수 있는 작업에 엄격한 제한을 강제하여 격리된 환경에서 실행하는 보호 기법"
tags: ["OS", "Protection", "Security"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/sandboxing
sidebar:
  order: 11
---

## 핵심 개념

샌드박싱(Sandboxing)은 프로세스가 수행할 수 있는 작업에 엄격한 제한을 강제하여, 프로세스를 격리된 환경에서 실행하는 보호 기법입니다. 대부분의 프로세스는 전체 권한이 불필요하므로, 불필요한 권한을 제거하면 침해 시 피해를 최소화할 수 있습니다.

## 동작 원리

### 적용 원칙

- **적용 시점**: 프로세스 생성 직후, main() 실행 전 또는 fork 직후
- **제거 불가**: 일단 샌드박스에 들어가면 탈출 불가

### 구현 방식

**1. 시스템 콜 필터링 (SECCOMP-BPF)**

Linux에서 Berkeley Packet Filter 언어로 프로세스별 허용 시스템 콜 집합을 정의합니다. 인자 수준 검사도 가능합니다.

**2. MAC 정책 기반**

SELinux 정책으로 프로세스를 격리합니다. Android는 SELinux + SECCOMP-BPF를 조합합니다.

**3. 프로파일 기반 (Apple Sandbox)**

Scheme 언어로 프로파일을 작성하여 연산 허용/차단 + 인자 조건을 지정합니다.

```
macOS Sandbox 프로파일 예시:
(version 1)
(deny default)                    ; 기본 모두 거부
(allow file-chroot)
(allow file-read-metadata (literal "/var"))
(allow sysctl-read)
(allow mach-lookup
  (global-name "com.apple.system.logger"))
```

- macOS 10.8+: Mac Store 앱에 강제 적용
- iOS: 모든 서드파티 앱에 강제 적용

### System Integrity Protection (SIP)

macOS 10.11+의 시스템 전체 보호:
- root조차 시스템 파일/바이너리 수정 불가
- entitlement 있는 코드 서명된 바이너리만 특권 연산 가능

```
Android 샌드박싱 구조:
┌────────────────────────────────────┐
│           Application              │
├────────────────────────────────────┤
│      Bionic (C Library)            │
│   [SECCOMP-BPF 시스템콜 필터링]     │
├────────────────────────────────────┤
│         Linux Kernel               │
│      [SELinux 정책 적용]           │
└────────────────────────────────────┘
```

## 예시

어린이 놀이터(sandbox)와 같습니다. 아이(프로세스)는 놀이터 안에서만 놀 수 있고, 울타리 밖으로 나갈 수 없습니다. 놀이터 안의 장난감(허용된 자원)만 사용 가능합니다.

- 장점: 침해 시 피해 범위 최소화, 최소 권한 원칙 구현, 신뢰할 수 없는 코드 안전 실행
- 단점: 프로파일 작성 복잡성, 기존 프로그램 호환성 문제, 성능 오버헤드

## 관련 개념

- [보호의 목표와 원칙](/knowledge/os/protection-goals/)
- [강제적 접근 제어 (MAC)](/knowledge/os/mac/)
- [능력 기반 시스템](/knowledge/os/capability-based-system/)
