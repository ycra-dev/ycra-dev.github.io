---
title: "능력 기반 시스템 (Capability-Based System)"
description: "root의 전능한 권한을 세분화된 능력(capability)들로 분해하여, 프로세스에 필요한 능력만 부여하는 보호 모델"
tags: ["OS", "Security", "Protection"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/capability-based-system
sidebar:
  order: 7
---

## 핵심 개념

능력 기반 시스템(Capability-Based System)은 root의 전능한 권한을 세분화된 능력(capability)들로 분해하여, 프로세스에 필요한 능력만 부여하는 보호 모델입니다. 전통적 UNIX 모델에서 root는 모든 권한을 가지며, 이는 최소 권한 원칙 위반이고 root로 실행되는 프로세스가 침해되면 전체 시스템이 위험해집니다.

## 동작 원리

root의 권한은 독립적인 작은 권한들의 집합으로 분해 가능합니다.

### Linux Capabilities (POSIX 1003.1e)

root 권한을 비트마스크로 분해하며, 각 비트는 특정 능력을 나타냅니다.

**세 가지 비트마스크**:
- **Permitted**: 프로세스가 가질 수 있는 능력
- **Effective**: 현재 활성화된 능력
- **Inheritable**: 자식 프로세스에 상속될 능력

한번 포기한 능력은 재획득 불가 → 시작 시 전체 권한으로 시작 후 불필요 권한 포기

```
Linux Capabilities 비트마스크:
┌───┬───┬───┬───┬───┬───┬───┬───┐
│ I │ C │ W │ ... │   │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┘
  │   │   │
  │   │   └─ CAP_DAC_OVERRIDE
  │   └───── CAP_SYS_ADMIN
  └───────── CAP_NET_BIND_SERVICE
```

### Darwin Entitlements (Apple)

- XML 속성 리스트로 필요한 권한 선언
- 코드 서명에 포함되어 위조 불가
- 시스템 entitlement(com.apple.*)는 Apple 바이너리만 청구 가능

## 예시

웹 서버 프로세스 시나리오:
1. root로 시작
2. 80번 포트 바인딩 (CAP_NET_BIND_SERVICE 사용)
3. 불필요 능력 포기: CAP_SYS_ADMIN, CAP_DAC_OVERRIDE 등 제거
4. 이후 공격자가 프로세스 침해해도 네트워크 포트 열기 외에는 권한 없음

만능 마스터키(root) 대신 개별 열쇠들의 묶음과 같습니다. 웹 서버는 "80번 포트 열기" 열쇠만 받고, "파일 시스템 전체 접근" 열쇠는 받지 않습니다.

- 장점: 최소 권한 원칙의 직접적 구현, 침해 시 피해 범위 제한, 감사(audit) 용이
- 단점: Linux 비트맵 방식으로 동적 추가 어려움, 기존 프로그램 수정 필요, 능력 설계의 복잡성

## 관련 개념

- [강제적 접근 제어 (MAC)](/knowledge/os/mac/)
- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/)
- [특권 명령어 (Privileged Instructions)](/knowledge/os/privileged-instructions/)
- [Darwin](/knowledge/os/darwin/)
