---
title: "LAN과 WAN"
description: "LAN은 좁은 지역의 호스트 네트워크, WAN은 넓은 지역의 시스템 네트워크"
tags: ["Network", "Infrastructure"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/network/lan-wan
sidebar:
  order: 1
---

## 핵심 개념

LAN(Local-Area Network)은 좁은 지역(건물 내)에 분산된 호스트들의 네트워크이고, WAN(Wide-Area Network)은 넓은 지역(국가, 대륙)에 분산된 시스템들의 네트워크입니다.

## 동작 원리

### LAN (Local-Area Network)

- 좁은 지역(건물, 캠퍼스) 커버
- 높은 속도, 낮은 오류율
- Ethernet(IEEE 802.3): 동축케이블, 트위스티드 페어, 광섬유 사용. 10Mbps ~ 100Gbps
- WiFi(IEEE 802.11): 무선 통신. 11Mbps ~ 400Mbps 이상
- 라우터를 통해 다른 네트워크에 접속

### WAN (Wide-Area Network)

- 넓은 지역(도시, 국가, 전 세계) 커버
- 전화선, 전용선, 광케이블, 마이크로웨이브, 위성 사용
- 라우터가 트래픽을 다른 라우터/네트워크로 전달
- 인터넷: 가장 대표적인 WAN (ARPANET에서 발전)
- 백본 연결은 40Gbps ~ 100Gbps 광섬유

### 구조

```
[LAN]
  PC --- Switch --- Server
   |        |
Laptop   Printer
   |
WiFi AP --- Smartphone
   |
Router -----> [WAN/Internet]

[WAN]
Site A (LAN) --- Router === WAN Link === Router --- Site B (LAN)
                               |
                           Router
                               |
                        Site C (LAN)
```

## 예시

- LAN = 사무실 내 인터폰 시스템 (빠르고 신뢰성 높음)
- WAN = 국제 전화망 (거리가 멀어 지연이 있고 비용 발생)

| 비교 | LAN | WAN |
|------|-----|-----|
| 범위 | 건물, 캠퍼스 | 도시, 국가, 전 세계 |
| 속도 | 고속 | 상대적으로 느림 |
| 비용 | 저비용 | 고비용 |
| 관리 | 용이 | 복잡 |
| 보안 | 상대적으로 안전 | 공격 표면 넓음 |

## 관련 개념

- [[분산 시스템 (Distributed System)]]
- [[DNS (Domain Name System)]]
- [[OSI 모델 (Open Systems Interconnection)]]
