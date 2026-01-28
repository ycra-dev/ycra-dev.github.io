---
title: "TCP/IP 프로토콜 스택"
description: "인터넷에서 사용되는 4계층 프로토콜 스택으로, OSI 모델보다 단순화된 구현"
tags: ["Network", "Protocol", "TCP/IP"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/network/tcp-ip
sidebar:
  order: 4
---

## 핵심 개념

TCP/IP 프로토콜 스택은 인터넷에서 실제로 사용되는 4계층 프로토콜 스택으로, OSI 모델보다 단순화되어 구현 효율성이 높습니다. ARPANET에서 개발되어 인터넷의 표준이 되었습니다.

## 동작 원리

물리 계층과 데이터 링크 계층은 정의하지 않아 어떤 물리 네트워크 위에서도 동작합니다.

| TCP/IP 계층 | OSI 대응 | 프로토콜 예시 | 역할 |
|-------------|----------|---------------|------|
| Application | 7,6,5 | HTTP, FTP, SSH, DNS, SMTP | 응용 서비스 |
| Transport | 4 | TCP, UDP | 프로세스 간 통신 |
| Internet | 3 | IP | 패킷 라우팅 |
| Link | 2,1 | (정의 안 함) | 하드웨어 의존 |

### OSI vs TCP/IP

```
OSI 모델               TCP/IP 모델
-----------           -------------
Application            Application
Presentation           (HTTP, DNS,
Session                 FTP, SMTP)
-----------           -------------
Transport              Transport
                       (TCP, UDP)
-----------           -------------
Network                Internet
                         (IP)
-----------           -------------
Data-Link              Link
Physical               (정의 안 함)
```

### 주요 구성 요소

- **IP (Internet Protocol)**: 데이터그램을 목적지로 라우팅. 비연결형, 비신뢰성
- **TCP/UDP**: 전송 계층 프로토콜
- **포트 번호**: 프로세스 식별. Well-known 포트: FTP(21), SSH(22), HTTP(80), HTTPS(443)
- **ARP (Address Resolution Protocol)**: IP 주소 → MAC 주소 변환

### 패킷 전송 과정

1. 응용 계층에서 메시지 생성
2. TCP/UDP가 포트 번호를 포함한 헤더 추가
3. IP가 목적지 IP 주소를 포함한 헤더 추가
4. Ethernet이 MAC 주소를 포함한 프레임 생성
5. 물리 계층에서 비트로 전송

## 예시

택배 시스템과 유사합니다:
- Application: 상품(데이터) 포장
- Transport: 송장 작성 (포트=수신인 전화번호)
- Internet: 물류 경로 결정 (IP=주소)
- Link: 실제 트럭 배송 (MAC=차량 번호판)

```
클라이언트 192.168.1.10:54321 → 서버 93.184.216.34:80

1. ARP로 게이트웨이 MAC 주소 확인
2. IP 패킷에 목적지 IP 설정
3. TCP 헤더에 목적지 포트 80 설정
4. Ethernet 프레임으로 캡슐화하여 전송
5. 라우터들이 IP 주소 보고 다음 홉으로 전달
6. 목적지 도착 시 역순으로 역캡슐화
```

## 관련 개념

- [[OSI 모델 (Open Systems Interconnection)]]
- [[LAN과 WAN]]
- [[DNS (Domain Name System)]]
