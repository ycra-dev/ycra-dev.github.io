---
title: "보호 링 (Protection Ring)"
description: "실행 권한을 동심원 형태의 계층으로 분리하여 안쪽 링일수록 더 많은 권한을 가지는 하드웨어 보호 모델"
tags: ["OS", "Protection", "Hardware"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/protection-ring
sidebar:
  order: 4
---

## 핵심 개념

보호 링(Protection Ring)은 실행 권한을 동심원 형태의 계층으로 분리하여, 안쪽 링일수록 더 많은 권한을 가지는 하드웨어 기반 보호 모델입니다. 권한 분리를 구현하려면 하드웨어 지원이 필수적이며, 소프트웨어만으로는 악의적 코드가 권한 상승을 시도할 수 있습니다.

## 동작 원리

### 링 구조

링 i는 링 j(j < i)의 기능의 부분집합만 제공합니다. 가장 안쪽 링(Ring 0)이 전체 권한을 가집니다.

```
        ┌─────────────────┐
        │   Ring 3 (User) │  ← 애플리케이션
        │  ┌───────────┐  │
        │  │ Ring 0    │  │  ← 커널
        │  │ (Kernel)  │  │
        │  │ ┌───────┐ │  │
        │  │ │Ring -1│ │  │  ← 하이퍼바이저
        │  │ └───────┘ │  │
        │  └───────────┘  │
        └─────────────────┘
```

### 링 간 전환

- 높은 권한 링으로 진입: **게이트(gate)** 명령어 사용 (syscall, trap, interrupt)
- 미리 정의된 주소로만 점프 가능 → 임의의 커널 주소 실행 불가

### Intel 아키텍처

- Ring 3: 사용자 모드
- Ring 0: 커널 모드
- Ring -1: 하이퍼바이저 (가상화 도입 후 추가)
- EFLAGS 레지스터의 2비트로 구분

### ARM 아키텍처

- **ARMv7**: USR(사용자), SVC(커널), TrustZone(최고 권한)
- **ARMv8**: EL0(사용자) → EL1(커널) → EL2(하이퍼바이저) → EL3(Secure Monitor)

### TrustZone

- 하드웨어 기반 암호화 기능에 독점 접근
- 커널조차 온칩 키에 직접 접근 불가 → **SMC 명령어**로 암호화 서비스 요청만 가능
- Android 5.0+에서 키 저장, 패스워드 검증 등에 활용

## 예시

회사 건물의 출입 등급과 같습니다. 일반 직원(Ring 3)은 로비만, 관리자(Ring 0)는 서버실까지, 최고 보안 담당(Ring -1/EL3)은 금고까지 접근 가능합니다. 등급 상승은 보안 게이트를 통해서만 가능합니다.

- 장점: 하드웨어 수준의 강력한 권한 분리, 악의적 코드의 권한 상승 방지
- 단점: 링 전환 오버헤드, 아키텍처별 구현 차이로 이식성 문제

## 관련 개념

- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/)
- [특권 명령어 (Privileged Instructions)](/knowledge/os/privileged-instructions/)
- [보호 도메인 (Protection Domain)](/knowledge/os/protection-domain/)
- [가상화 (Virtualization)](/knowledge/os/virtualization/)
