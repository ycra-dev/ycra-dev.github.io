---
title: "TCP/IP 프로토콜 스위트 (TCP/IP Protocol Suite)"
description: "TCP/IP(Transmission Control Protocol/Internet Protocol)는 인터넷의 기반이 되는 네트워크 프로토콜 모음(suite)으로, 하드웨어나 운영체제에 독립적으로 동작하며 서로 다른 장치 간의 데이터 통신(상호운용성)을 가능하게 한다"
tags: ['TCP IP', 'Networking', 'Protocol', 'Internet', 'Osi Model']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/tcp-ip
sidebar:
  order: 1
---

## 핵심 개념

TCP/IP는 다섯 개의 계층(5-layer model)으로 구성되지만, 실제 TCP/IP 프로토콜은 세 개의 계층에만 존재한다. 주요 구성 프로토콜은 다음과 같다:

1. **IP (Internet Protocol)**: 데이터 패킷을 소스에서 목적지까지 라우팅 (RFC791)
2. **ICMP (Internet Control Message Protocol)**: 오류 메시지, 라우팅 지원, 디버깅을 위한 저수준 프로토콜 (RFC792)
3. **ARP (Address Resolution Protocol)**: IP 주소를 하드웨어 주소로 변환 (RFC826)
4. **UDP (User Datagram Protocol)**: 비확인, 단방향 데이터 전달 (RFC768)
5. **TCP (Transmission Control Protocol)**: 신뢰성 있는, 전이중, 흐름 제어 및 오류 정정 통신 (RFC793)

TCP/IP의 성공 요인은 개방적이고 비독점적인(nonproprietary) 프로토콜 설계에 있다. 1969년 ARPANET에서 시작되어 상용 인터넷으로 진화했으며, 인터넷 기술 표준은 RFC(Requests for Comments)라는 문서 체계로 관리된다. IETF(Internet Engineering Task Force)가 기술 개발을 총괄하고, ICANN이 IP 주소와 도메인 이름 할당을 관리한다.

## 예시

```bash
# TCP/IP 스택의 계층 구조
# 5. Application Layer   (HTTP, SMTP, SSH, DNS)
# 4. Transport Layer     (TCP, UDP)
# 3. Network Layer       (IP, ICMP)
# 2. Link Layer          (Ethernet, Wi-Fi)
# 1. Physical Layer      (케이블, 광섬유)

# 네트워크 소켓 상태 확인 (Linux)
ss -tuln

# 네트워크 연결 상태 확인 (전통적)
netstat -an

# RFC 문서 참조
# rfc-editor.org에서 RFC 번호로 검색
# 예: RFC793 - TCP 프로토콜 명세
```

## 관련 개념

- [IPv4 (인터넷 프로토콜 버전 4)](/knowledge/linux/ipv4/) - TCP/IP의 현재 주류 네트워크 계층 프로토콜
- [IPv6 (인터넷 프로토콜 버전 6)](/knowledge/linux/ipv6/) - 차세대 네트워크 계층 프로토콜
- [TCP/UDP 포트 (TCP/UDP Port)](/knowledge/linux/tcp-port/) - 전송 계층의 포트 주소 체계
- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 링크 계층 프로토콜
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - IP 계층의 패킷 전달 메커니즘
- [네트워크 패킷 캡슐화 (Network Packet Encapsulation)](/knowledge/linux/network-packet-encapsulation/) - 계층 간 데이터 포장 방식
