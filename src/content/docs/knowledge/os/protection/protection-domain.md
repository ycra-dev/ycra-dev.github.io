---
title: "보호 도메인 (Protection Domain)"
description: "프로세스가 접근할 수 있는 객체들과 해당 객체에 허용된 연산들의 집합"
tags: ["OS", "Protection", "Security"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/protection-domain
sidebar:
  order: 3
---

## 핵심 개념

보호 도메인(Protection Domain)은 프로세스가 접근할 수 있는 객체들과 해당 객체에 허용된 연산들의 집합입니다. 프로세스는 현재 작업에 필요한 자원에만 접근해야 합니다(need-to-know 원칙).

## 동작 원리

### 접근 권한과 도메인

- **접근 권한(Access Right)**: `<객체-이름, 권한-집합>` 형태의 순서쌍 (예: `<파일 F, {read, write}>`)
- **도메인**: 접근 권한들의 집합. 프로세스는 도메인 내에서 실행됨

```
      O1        O2        O3        O4
D1  r,w       execute     -         -
D2   -          -       r,w       print
D3  execute     -        r        print
```

### 도메인 연관 방식

- **정적(Static)**: 프로세스 수명 동안 자원 집합 고정. 도메인 내용 변경 메커니즘 필요.
- **동적(Dynamic)**: 도메인 전환(switching) 허용. 프로세스가 다른 도메인으로 이동 가능.

### 도메인 구현 형태

- **사용자별 도메인**: 로그인한 사용자에 따라 접근 가능 객체 결정
- **프로세스별 도메인**: 프로세스 식별자에 따라 결정
- **프로시저별 도메인**: 프로시저의 지역 변수가 접근 가능 객체

### UNIX setuid 비트

파일에 setuid 비트 설정 시, 실행자가 임시로 파일 소유자의 권한을 획득합니다. 예: `passwd` 명령은 setuid-root로, 일반 사용자도 `/etc/shadow` 수정 가능합니다. 위험: setuid 바이너리의 취약점은 즉각적인 권한 상승으로 이어질 수 있습니다.

### Android 앱 ID

앱마다 고유 UID/GID를 할당하고, 개인 데이터 디렉토리를 격리합니다.

## 예시

호텔 키카드 시스템과 같습니다. 각 키카드(도메인)는 특정 방들(객체)에만 접근 가능하고, 투숙객(프로세스)은 자신의 키카드 권한 내에서만 움직입니다.

## 관련 개념

- [보호의 목표와 원칙](/knowledge/os/protection-goals/)
- [보호 링 (Protection Ring)](/knowledge/os/protection-ring/)
- [강제적 접근 제어 (MAC)](/knowledge/os/mac/)
