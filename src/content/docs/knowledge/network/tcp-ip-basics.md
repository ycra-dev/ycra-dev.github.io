---
title: "TCP/IP - 기초 개념"
description: "인터넷의 핵심 프로토콜 쌍으로 IP가 패킷의 주소 지정과 라우팅을 담당하고 TCP가 신뢰성 있는 데이터 전송을 보장한다"
tags: ["Network", "TCP", "IP", "Protocol", "Reliability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/tcp-ip-basics
sidebar:
  order: 16
---

## 핵심 개념

TCP/IP는 인터넷의 핵심 프로토콜 쌍으로, IP(Internet Protocol)가 패킷의 주소 지정과 라우팅을 담당하고, TCP(Transmission Control Protocol)가 신뢰성 있는 데이터 전송(순서 보장, 재전송, 흐름 제어)을 보장한다.

## 동작 원리

**IP (Internet Protocol) - 네트워크 계층**:
- 패킷을 출발지에서 목적지까지 전달하는 "우편 시스템"
- **비연결형(connectionless)**: 각 패킷이 독립적으로 라우팅됨
- **비신뢰(unreliable)**: 패킷 손실, 순서 뒤바뀜, 중복 가능. 보장하지 않음
- **최선 노력(best-effort)**: 전달을 시도하지만 보장하지 않음
- 네트워크 계층을 단순하게 유지하고, 신뢰성은 상위 계층에 맡기는 "end-to-end 원칙"

**TCP (Transmission Control Protocol) - 전송 계층**:
IP 위에서 동작하며 신뢰성을 추가한다.
- **연결 지향(connection-oriented)**: 통신 전 3-way handshake로 연결 수립
- **순서 보장**: 시퀀스 번호로 패킷 순서 추적, 수신 측에서 올바른 순서로 재조립
- **재전송**: ACK(확인 응답)이 일정 시간 내 오지 않으면 재전송
- **흐름 제어**: 수신자의 처리 속도에 맞춰 전송 속도 조절
- **혼잡 제어**: 네트워크 혼잡 감지 시 전송 속도 자동 축소

**UDP (User Datagram Protocol)**: TCP의 대안. 신뢰성 보장 없이 빠른 전송이 필요한 경우에 사용 (실시간 스트리밍, 온라인 게임, DNS 조회 등).

**포트 번호**: IP 주소가 컴퓨터를 식별한다면, 포트 번호는 그 컴퓨터의 특정 서비스를 식별한다.
- 80: HTTP
- 443: HTTPS
- 25: SMTP (이메일)
- 53: DNS

## 예시

TCP 3-way handshake:

```
클라이언트          서버
    │                │
    │── SYN ────────►│  (연결 요청)
    │                │
    │◄── SYN-ACK ───│  (연결 수락 + 확인)
    │                │
    │── ACK ────────►│  (확인)
    │                │
    │ ← 데이터 전송 →│
```

TCP vs UDP 선택 기준:

```
TCP 사용:                UDP 사용:
- 웹 브라우징(HTTP)      - 실시간 게임
- 파일 전송(FTP)         - 영상 스트리밍
- 이메일(SMTP)           - DNS 조회
- 신뢰성이 중요한 경우    - 빠른 응답이 중요한 경우
```

## 관련 개념

- [IP 주소 (IP Address)](/knowledge/network/ip-address/) - TCP/IP에서 사용하는 주소 체계
- [패킷 (Packet)](/knowledge/network/packet/) - TCP/IP로 전송되는 데이터 단위
- [프로토콜 스택 (Protocol Stack)](/knowledge/network/protocol-stack/) - TCP/IP가 속하는 계층적 구조
- [라우팅 (Routing)](/knowledge/network/routing/) - IP 계층에서의 경로 결정

## 출처

- Understanding the Digital World, Chapter 9
