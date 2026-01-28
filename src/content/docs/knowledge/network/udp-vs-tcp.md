---
title: "UDP vs TCP"
description: "UDP는 비연결형/비신뢰성 전송 프로토콜이고, TCP는 연결형/신뢰성 전송 프로토콜"
tags: ["Network", "Protocol", "Transport", "TCP", "UDP"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/network/udp-vs-tcp
sidebar:
  order: 5
---

## 핵심 개념

UDP(User Datagram Protocol)는 비연결형/비신뢰성 전송 프로토콜이고, TCP(Transmission Control Protocol)는 연결형/신뢰성 전송 프로토콜입니다. 네트워크 하위 계층(IP)은 패킷 전달만 담당하고 신뢰성을 보장하지 않기 때문에, 응용에 따라 속도(UDP)와 정확성(TCP) 중 선택합니다.

## 동작 원리

### UDP (User Datagram Protocol)

- **비연결형(Connectionless)**: 연결 설정/해제 과정 없이 바로 데이터 전송
- **비신뢰성**: 패킷 손실, 순서 뒤바뀜을 감지/복구하지 않음
- **헤더 구조**: 출발지 포트, 목적지 포트, 길이, 체크섬 (8바이트로 간단)
- **사용 사례**: DNS 조회, 실시간 스트리밍, 온라인 게임, VoIP

### TCP (Transmission Control Protocol)

- **연결형(Connection-oriented)**: 3-way handshake로 연결 설정, 4-way handshake로 종료
- **신뢰성 보장 메커니즘**:
  - **ACK(Acknowledgment)**: 수신자가 패킷 수신 확인. 타임아웃 시 재전송
  - **시퀀스 번호**: 패킷 순서 보장, 누락 감지
  - **흐름 제어(Flow Control)**: 수신자의 버퍼 상태에 맞춰 전송 속도 조절
  - **혼잡 제어(Congestion Control)**: 네트워크 상태 모니터링, 패킷 손실 시 전송 속도 감소
- **사용 사례**: HTTP/HTTPS, 파일 전송(FTP), 이메일(SMTP), SSH

### 비교표

| 특성 | UDP | TCP |
|------|-----|-----|
| 연결 | 비연결형 | 연결형 |
| 신뢰성 | 없음 | 있음 (ACK, 재전송) |
| 순서 보장 | 없음 | 있음 (시퀀스 번호) |
| 흐름 제어 | 없음 | 있음 |
| 혼잡 제어 | 없음 | 있음 |
| 헤더 크기 | 8 bytes | 20+ bytes |
| 속도 | 빠름 | 느림 |

### TCP Handshake

```
3-Way Handshake (연결 설정):
Client                Server
   |---- SYN ------->|
   |<--- SYN-ACK ----|
   |---- ACK ------->|
   |   [연결 수립]    |

4-Way Handshake (연결 종료):
Client                Server
   |---- FIN ------->|
   |<--- ACK --------|
   |<--- FIN --------|
   |---- ACK ------->|
   |   [연결 종료]    |
```

## 예시

- UDP = 엽서: 빠르게 보내지만 도착 확인 없음, 순서 보장 없음
- TCP = 등기우편: 배달 확인, 순서 보장, 분실 시 재발송, 하지만 느림

```
TCP 패킷 손실과 복구:
Client                    Server
  |--- seq=904 ------------>| ACK
  |<-- ACK for 904 ---------|
  |--- seq=126 ------------>| ACK
  |--- seq=127 --------X    | (손실!)
  |   (timeout)             |
  |--- seq=127 ------------>| (재전송)
  |<-- ACK for 127 ---------|
```

## 관련 개념

- [[TCP/IP 프로토콜 스택]]
- [[OSI 모델 (Open Systems Interconnection)]]
- [[LAN과 WAN]]
