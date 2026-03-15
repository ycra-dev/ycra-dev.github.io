---
title: "신뢰 컴퓨팅 기반 (Trusted Computing Base)"
description: "신뢰 컴퓨팅 기반(TCB, Trusted Computing Base)은 분산 컴퓨터 시스템에서 보안 정책을 강제하기 위해 필요하고 충분한 모든 보안 메커니즘의 집합으로, 반드시 신뢰할 수 있어야 하는 펌웨어, 하드웨어, 소프트웨어, 그리고 인간을 포함한다"
tags: ['Security', 'Tcb', 'Trust', 'System Design', 'Dependability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/trusted-computing-base
sidebar:
  order: 12
---

## 핵심 개념

TCB의 핵심 원칙은 **작을수록 좋다**는 것이다. TCB를 명확히 식별할 수 있으면, 시스템의 보안성을 검증할 때 무엇에 집중해야 하는지 알 수 있다.

TCB를 식별하는 과정에서의 어려움:
- 관리자 권한이 필요한 프로그램은 명백히 TCB에 포함 (침해 시 공격 범위 확대)
- 권한 없이 실행되는 서비스도 사용자 관리 기능이 있다면 TCB에 포함될 수 있음 (예: ownCloud의 스크립트 세트)
- 의존성 분석이 필요: 스크립트뿐 아니라 그것이 의존하는 다른 모듈(MySQL, Apache 등)도 검사 대상

**정직하지만 호기심 많은 서버(Honest-but-curious server)**: 프로토콜대로 행동하지만 처리하는 모든 정보를 기록할 수 있는 서버 모델. 이런 가정이 정당한지, 그리고 이를 뒷받침하는 조치가 충분한지 판단해야 한다.

TCB는 보안 정책이 명시적으로 지정되지 않았거나 불완전한 경우 신뢰 모듈과 비신뢰 모듈을 분리하기 어렵다. 복잡한 컴포넌트일수록 명세 준수 여부 확인이 더욱 어렵다.

## 예시

```
# TCB 구성 요소 식별 예시: 웹 기반 파일 저장 서비스

[TCB에 포함]
├── Apache 서버 (프로세스 관리)
├── ownCloud 사용자 관리 스크립트
├── MySQL 데이터베이스 (접근 제어 데이터)
├── 파일 시스템 권한 설정
└── OS 커널의 접근 제어 모듈

[TCB 의존성 체인]
ownCloud scripts --> Apache server --> OS kernel
       └--> MySQL database --> OS file system

# TCB가 작을수록 검증 용이
# 보안 정책이 "사용자 완전 분리"이면 모든 의존성 검사 필요
```

## 관련 개념

- [보안 정책과 메커니즘 (Security Policy and Mechanism)](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [보안 설계 원칙 (Security Design Principles)](/knowledge/distributed-systems/security-design-principles/)
- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain/)
- [커베로스 인증 서비스 (Kerberos Authentication Service)](/knowledge/distributed-systems/kerberos-authentication-service/)
- [비잔틴 장애 허용 (Byzantine Fault Tolerance)](/knowledge/distributed-systems/byzantine-fault-tolerance/)
