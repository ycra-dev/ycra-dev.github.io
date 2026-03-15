---
title: "네트워크 패킷 캡슐화 (Network Packet Encapsulation)"
description: "네트워크 패킷 캡슐화(Encapsulation)란 데이터가 프로토콜 스택을 따라 하위 계층으로 내려갈 때 각 프로토콜이 자신의 헤더 정보를 추가하고, 상위 계층의 완성된 패킷이 하위 계층 패킷의 페이로드(payload)가 되는 중첩 포장 과정이다"
tags: ['Encapsulation', 'Packet', 'Networking', 'Protocol Stack', 'TCP IP']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/network-packet-encapsulation
sidebar:
  order: 11
---

## 핵심 개념

네트워크 데이터는 패킷(packet) 형태로 전송되며, 각 패킷은 헤더(header)와 페이로드(payload)로 구성된다. 헤더에는 출발지/목적지 정보, 체크섬, 프로토콜별 처리 지침이 포함되고, 페이로드는 전송할 실제 데이터이다.

데이터 단위의 명칭은 프로토콜 계층에 따라 다르다:
- **링크 계층**: 프레임(frame)
- **IP 계층**: 패킷(packet)
- **TCP 계층**: 세그먼트(segment)

예를 들어, UDP 패킷이 이더넷을 통해 전송될 때 세 겹의 포장이 이루어진다: 이더넷 프레임이 IP 패킷을 감싸고, IP 패킷이 UDP 패킷을 감싸고, UDP 패킷이 실제 데이터를 감싼다. 수신 측에서는 이 캡슐화가 역순으로 해제(decapsulation)되면서 프로토콜 스택을 올라간다.

이 계층적 설계의 핵심 장점은 각 프로토콜이 독립적으로 동작할 수 있다는 점이다. 상위 계층은 하위 계층의 구체적인 하드웨어를 알 필요가 없고, 하위 계층은 상위 계층의 데이터 내용을 이해할 필요가 없다.

## 예시

```
이더넷을 통한 UDP 패킷 캡슐화 구조:

+--------------------------------------------------+
| Ethernet Header | IP Header | UDP Header | Data  |
| (src/dst MAC,   | (src/dst  | (src/dst   |       |
|  length, CRC)   |  IP addr) |  port)     |       |
+--------------------------------------------------+
|<-- 링크 계층 -->|<-- 네트워크 -->|<- 전송 ->|<-앱->|

# tcpdump으로 캡슐화된 패킷 확인
sudo tcpdump -i eth0 -vv -X

# 패킷의 각 계층 헤더를 볼 수 있음
```

## 관련 개념

- [TCP/IP 프로토콜 스위트 (TCP/IP Protocol Suite)](/knowledge/linux/tcp-ip/) - 캡슐화가 적용되는 프로토콜 스택
- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 링크 계층의 프레이밍
- [MTU (최대 전송 단위)](/knowledge/linux/mtu/) - 패킷 크기 제한
- [tcpdump (패킷 캡처 도구)](/knowledge/linux/tcpdump/) - 캡슐화된 패킷 분석 도구
