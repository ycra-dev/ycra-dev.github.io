---
title: "OSI 모델 (Open Systems Interconnection)"
description: "네트워크 통신을 7개 계층으로 분리하여 각 계층이 독립적으로 기능을 담당하는 참조 모델"
tags: ["Network", "Protocol", "OSI"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/network/osi-model
sidebar:
  order: 3
---

## 핵심 개념

OSI 모델(Open Systems Interconnection)은 네트워크 통신의 복잡성을 7개의 계층으로 분리하여 각 계층이 독립적으로 특정 기능을 담당하도록 설계한 참조 모델입니다. ISO에서 1970년대 후반 네트워크 설계 표준화를 위해 개발했습니다.

## 동작 원리

각 계층은 동등 계층(peer layer)끼리만 논리적으로 통신하며, 실제로는 데이터가 계층을 내려가며 헤더가 추가됩니다.

| 계층 | 이름 | 역할 | 단위 |
|------|------|------|------|
| 7 | Application | 사용자 인터페이스, 파일 전송, 이메일 | 메시지 |
| 6 | Presentation | 데이터 형식 변환, 암호화/복호화 | 메시지 |
| 5 | Session | 세션 관리, 프로세스 간 통신 프로토콜 | 메시지 |
| 4 | Transport | 노드 간 메시지 전송, 흐름/혼잡 제어 | 세그먼트 |
| 3 | Network | 패킷 라우팅, 논리 주소 처리 | 패킷 |
| 2 | Data-Link | 프레임 처리, 오류 검출, 물리 주소 | 프레임 |
| 1 | Physical | 비트 전송, 전기 신호 | 비트 |

### 캡슐화와 역캡슐화

```
[송신측]                          [수신측]
Application (7)  <----------->  Application (7)
     |                               ^
Presentation (6) <----------->  Presentation (6)
     |                               ^
Session (5)     <----------->   Session (5)
     |                               ^
Transport (4)   <----------->   Transport (4)
     |                               ^
Network (3)     <---Router--->  Network (3)
     |                               ^
Data-Link (2)   <----------->   Data-Link (2)
     |                               ^
Physical (1)    ===케이블/무선==>  Physical (1)
```

- **캡슐화(Encapsulation)**: 송신 시 위에서 아래로 내려가며 각 계층이 헤더 추가
- **역캡슐화(Decapsulation)**: 수신 시 아래에서 위로 올라가며 각 계층이 헤더 제거 및 처리

## 예시

국제 우편 시스템과 유사합니다:
- Application: 편지 내용 작성
- Presentation: 언어 번역
- Session: 대화 흐름 관리
- Transport: 우체국에서 배송 추적
- Network: 국가 간 경로 결정
- Data-Link: 지역 우체국 간 전달
- Physical: 실제 트럭/비행기 운송

## 관련 개념

- [[TCP/IP 프로토콜 스택]]
- [[LAN과 WAN]]
- [[DNS (Domain Name System)]]
