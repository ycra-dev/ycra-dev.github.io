---
title: "강제적 접근 제어 (MAC)"
description: "시스템 정책에 의해 접근이 제어되며, root 사용자조차 우회할 수 없는 보호 메커니즘"
tags: ["OS", "Security", "Protection"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/mac
sidebar:
  order: 9
---

## 핵심 개념

강제적 접근 제어(Mandatory Access Control, MAC)는 시스템 정책에 의해 접근이 제어되며, root 사용자조차 이를 우회할 수 없는 보호 메커니즘입니다. 임의적 접근 제어(DAC)는 자원 소유자가 권한을 설정하므로 실수나 악의로 부적절한 권한 부여가 가능하며, root는 모든 제한을 무시할 수 있어 침해 시 피해가 큽니다.

## 동작 원리

시스템 정책은 개별 사용자나 root보다 상위에 있습니다.

### 메커니즘

- **레이블(Label)**: 객체(파일, 디바이스)와 주체(프로세스)에 식별자(문자열) 할당
- **정책(Policy)**: 어떤 레이블의 주체가 어떤 레이블의 객체에 어떤 연산을 수행할 수 있는지 정의
- **동작 흐름**:
  1. 프로세스가 객체에 연산 요청
  2. OS가 프로세스의 레이블과 객체의 레이블 확인
  3. 정책에 따라 허용/거부 결정
  4. root라도 정책에 어긋나면 거부

```
DAC (Discretionary):
소유자 → 권한 설정 → 다른 사용자 접근
root → 모든 접근 가능

MAC (Mandatory):
시스템 정책 → 레이블 기반 접근 제어
         ↓
root도 정책에 종속
```

### 레이블 계층

```
┌──────────────────────────────────────────┐
│              Top Secret                  │
│   ┌──────────────────────────────────┐   │
│   │           Secret                 │   │
│   │   ┌──────────────────────────┐   │   │
│   │   │      Unclassified        │   │   │
│   │   └──────────────────────────┘   │   │
│   └──────────────────────────────────┘   │
└──────────────────────────────────────────┘

→ 내부 레이블 프로세스는 외부 레이블 객체에 접근 불가
```

### 주요 구현

- **SELinux**: Linux의 MAC 구현 (NSA 개발), 대부분의 Linux 배포판에 통합
- **TrustedBSD/macOS**: FreeBSD MAC 구현, Apple이 macOS/iOS에 채택
- **Windows MIC**: Windows Vista 이후 Mandatory Integrity Control

## 예시

프로세스 P (레이블: "secret")가 파일 F (레이블: "top_secret") 읽기 시도:
- MAC 정책: "secret은 top_secret보다 낮으므로 읽기 불가"
- 결과: root 권한으로 실행해도 접근 거부
- 심지어 ls 명령으로도 top_secret 파일이 보이지 않음

- 장점: root 권한 탈취 시에도 피해 제한, 일관된 시스템 전체 정책, 규제 준수 용이
- 단점: 정책 설정 복잡성, 기존 애플리케이션 호환성 문제, 학습 곡선

## 관련 개념

- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/)
- [특권 명령어 (Privileged Instructions)](/knowledge/os/privileged-instructions/)
- [능력 기반 시스템 (Capability-Based System)](/knowledge/os/capability-based-system/)
