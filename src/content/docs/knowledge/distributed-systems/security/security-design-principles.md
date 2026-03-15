---
title: "보안 설계 원칙 (Security Design Principles)"
description: "보안 설계 원칙은 분산 시스템에서 광범위한 보안 정책을 구현할 수 있도록 보안 서비스를 설계할 때 고려해야 하는 기본 원칙들로, Saltzer와 Schroeder(1975)가 제시한 8가지 원칙에 기반한다"
tags: ['Security', 'Design Principles', 'Distributed Systems', 'Saltzer Schroeder']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/security-design-principles
sidebar:
  order: 2
---

## 핵심 개념

핵심적인 5가지 설계 원칙은 다음과 같다:

1. **안전한 기본값(Fail-safe defaults)**: 기본 설정이 이미 충분한 보호를 보장해야 한다. 접근 결정은 배제가 아닌 허용 기반이어야 한다. 예를 들어, 공유기의 초기 비밀번호를 "(admin, admin)"으로 설정하는 것은 최악의 관행이다.

2. **개방 설계(Open design)**: 모호함에 의한 보안(security by obscurity)을 지양하고, 메커니즘의 설계와 구현이 공개 검토 가능해야 한다.

3. **권한 분리(Separation of privilege)**: 시스템의 중요한 부분이 단일 엔티티에 의해 완전히 제어되지 않도록 보장한다. 예: 이중 암호화로 두 명의 다른 키 보유자가 필요.

4. **최소 권한(Least privilege)**: 프로세스는 가능한 최소한의 권한으로 동작해야 한다. Unix의 sudo 메커니즘이 대표적 예시.

5. **최소 공통 메커니즘(Least common mechanism)**: 동일한 메커니즘이 필요한 여러 컴포넌트에 동일한 구현체를 제공하여 유지보수와 단순성을 확보한다.

추가적으로 완전 중재(complete mediation), 메커니즘의 경제성(economy of mechanism), 심리적 수용성(psychological acceptability)도 중요하다.

## 예시

최소 권한 원칙의 Unix 적용 예:

```bash
# 일반 사용자는 관리자 작업 불가
alice$ apt install nginx
# => Permission denied

# 명시적으로 관리자 권한 요청
alice$ sudo apt install nginx
# => 비밀번호 입력 후 실행 가능
```

보안 계층화 예: VPN(네트워크 계층) -> TLS(전송 계층) -> Kerberos(미들웨어) -> 애플리케이션 보안(WhatsApp, Signal)

## 관련 개념

- [보안 정책과 메커니즘 (Security Policy and Mechanism)](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [신뢰 컴퓨팅 기반 (Trusted Computing Base)](/knowledge/distributed-systems/trusted-computing-base/)
- [전송 계층 보안 (Transport Layer Security)](/knowledge/distributed-systems/transport-layer-security/)
- [인가 및 접근 제어 (Authorization and Access Control)](/knowledge/distributed-systems/authorization-and-access-control/)
