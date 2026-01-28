---
title: "보안 vs 보호 (Security vs Protection)"
description: "Protection은 프로세스/사용자의 자원 접근을 제어하는 내부 메커니즘, Security는 외부 위협까지 고려한 시스템 전체 안전성"
tags: ["OS", "Security"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/security-vs-protection
sidebar:
  order: 1
---

## 핵심 개념

Security는 시스템과 데이터의 무결성이 보존될 것이라는 **신뢰의 척도**이고, Protection은 프로세스와 사용자의 자원 접근을 제어하는 **메커니즘**이다. 네트워크 연결, 다중 사용자 환경에서 자원 보호와 전체 시스템 안전성 확보가 모두 필요하다.

비유하면, Protection은 집 안의 방마다 설치된 **잠금장치**이고, Security는 집 전체의 **보안 시스템**(CCTV, 경비, 울타리 포함)이다.

## 동작 원리

### Protection (보호)

- **내부 문제**(internal problem)
- OS가 제공하는 메커니즘: 접근 제어, 권한 관리
- 프로세스/사용자가 정의된 자원에 접근하는 것을 제어

### Security (보안)

- **외부 환경까지 고려** (사람, 건물, 네트워크, 위협)
- Protection 메커니즘이 올바르게 작동한다는 전제 하에 성립

### 4계층 보안 모델

```
┌─────────────────────────┐
│    Application Layer    │ ← 인증, 권한 검사
├─────────────────────────┤
│    OS Layer             │ ← 접근 제어, Protection
├─────────────────────────┤
│    Network Layer        │ ← 방화벽, 암호화
├─────────────────────────┤
│    Physical Layer       │ ← 시설 보안, 잠금장치
└─────────────────────────┘
```

Security는 **가장 약한 고리**만큼만 강하다. OS의 파일 권한 설정(Protection)이 아무리 완벽해도, 패스워드가 유출되면 보안(Security)은 무너진다.

## 예시

- **Protection만으로 부족한 경우**: 파일 접근 권한을 설정해도 공격자가 관리자 계정을 탈취하면 모든 파일에 접근 가능
- **Security가 작동하는 경우**: 다중 인증(MFA) + 접근 제어 + 네트워크 방화벽 + 물리적 서버실 잠금 → 여러 계층에서 방어

## 관련 개념

- [보안 위반 (Security Violations)](/knowledge/os/security-violations/) - 기밀성/무결성/가용성 침해 유형
- [보호의 목표와 원칙](/knowledge/os/protection-goals/) - 최소 권한, 격리, 심층 방어 원칙
- [접근 행렬 (Access Matrix)](/knowledge/os/access-matrix/) - Protection의 기본 모델
- [방화벽 (Firewall)](/knowledge/os/firewall/) - 네트워크 계층 Security 수단
