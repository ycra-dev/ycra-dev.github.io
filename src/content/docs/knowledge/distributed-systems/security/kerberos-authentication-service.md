---
title: "Kerberos Authentication Service"
description: "Kerberos는 MIT에서 개발된 분산 인증 서비스로, Needham-Schroeder 프로토콜에 기반하여 클라이언트가 분산 시스템 내 모든 서버와 보안 채널을 설정할 수 있게 해주는 티켓 기반 인증 시스템이다"
tags: ['Kerberos', 'Authentication', 'Kdc', 'Ticket', 'Single Sign On', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/kerberos-authentication-service
sidebar:
  order: 10
---

## 핵심 개념

Kerberos는 두 가지 핵심 컴포넌트로 구성된다:
- **인증 서버(AS, Authentication Server)**: 사용자 로그인 처리 및 인증
- **티켓 부여 서비스(TGS, Ticket Granting Service)**: 개별 서비스에 대한 보안 채널 설정을 위한 티켓 발행

**KDC(Key Distribution Center)** 기반 접근법의 이점: N개 호스트 시스템에서 키 관리가 N(N-1)/2개에서 N개로 감소.

**로그인 과정** (Alice가 서버 Bob에 접근):
1. Alice가 워크스테이션에 이름 입력
2. 이름이 AS에 전송
3. AS가 세션키 `K_{A,TGS}`와 티켓 `K_{AS,TGS}(A, K_{A,TGS})`를 `K_{A,AS}`로 암호화하여 반환
4. 워크스테이션이 비밀번호 요청 -> `K_{A,AS}` 도출 -> 세션키 추출 후 비밀번호/공유키 즉시 폐기
5. Alice가 TGS에 Bob용 세션키 요청 (티켓 + 타임스탬프 포함)
6. TGS가 `K_{A,B}`와 Bob용 티켓 반환
7. Alice가 Bob에게 티켓 전송 -> Bob이 복호화하여 `K_{A,B}` 획득 -> 보안 채널 수립

**핵심 특징**:
- **단일 로그인(Single Sign-On)**: 한 번 인증하면 워크스테이션 변경 전까지 재인증 불필요
- 타임스탬프로 재생 공격 방지 (몇 분 이상 차이나면 요청 거부)
- 비밀번호가 네트워크를 통해 전송되지 않음
- 티켓은 일반적으로 8-24시간 동안 캐시

## 예시

```
# Kerberos 인증 흐름
Alice -> AS:        "Alice"                     # 메시지 1-2: 로그인
AS -> Alice:        K_{A,AS}(K_{A,TGS}, ticket_TGS)  # 메시지 3
Alice -> password:  derive K_{A,AS}             # 메시지 4: 비밀번호 입력

# Bob에 접근
Alice -> TGS:       ticket_TGS, K_{A,TGS}(t)   # 메시지 6: Bob용 티켓 요청
TGS -> Alice:       K_{A,TGS}(K_{A,B}, ticket_Bob)   # 메시지 7

# 보안 채널 수립
Alice -> Bob:       ticket_Bob, K_{A,B}(t)      # 메시지 1
Bob -> Alice:       K_{A,B}(t+1)                # Bob이 신원 증명
```

## 관련 개념

- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Session Key](/knowledge/distributed-systems/session-key/)
- [Trusted Computing Base](/knowledge/distributed-systems/trusted-computing-base/)
- [Transport Layer Security](/knowledge/distributed-systems/transport-layer-security/)
- [Delegation in Distributed Systems](/knowledge/distributed-systems/delegation-in-distributed-systems/)
