---
title: "WiFi (IEEE 802.11)"
description: "IEEE 802.11 표준에 기반한 무선 근거리 통신망 기술로 2.4GHz와 5GHz 주파수 대역의 전파를 사용한다"
tags: ["Network", "WiFi", "Wireless", "LAN", "IEEE-802.11"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/wifi-basics
sidebar:
  order: 10
---

## 핵심 개념

와이파이(WiFi)는 IEEE 802.11 표준에 기반한 무선 근거리 통신망 기술로, 2.4GHz와 5GHz 주파수 대역의 전파를 사용하여 이더넷과 유사한 방식으로 데이터를 전송한다.

## 동작 원리

와이파이는 본질적으로 "무선 이더넷"이다. 케이블 대신 전파를 매체로 사용할 뿐, 패킷 기반 통신이라는 기본 원리는 동일하다.

**주파수 대역**:
- **2.4 GHz**: 범위가 넓고 벽 투과가 좋지만, 전자레인지 등 다른 기기와 간섭 가능. 채널이 적어 혼잡
- **5 GHz**: 더 빠른 속도, 더 많은 채널, 적은 간섭. 범위가 짧고 벽 투과가 약함
- **6 GHz** (WiFi 6E): 최신 대역으로 더 넓은 채널 폭 제공

**속도 발전**:
- 802.11b: 최대 11 Mbps (1999)
- 802.11g: 최대 54 Mbps (2003)
- 802.11n (WiFi 4): 최대 600 Mbps (2009)
- 802.11ac (WiFi 5): 최대 3.5 Gbps (2014)
- 802.11ax (WiFi 6): 최대 9.6 Gbps (2020)

**충돌 처리**: 이더넷의 CSMA/CD와 유사하지만, 무선에서는 충돌을 감지하기 어려우므로 CSMA/CA(Collision Avoidance, 충돌 회피) 방식을 사용한다.

**보안**: 무선 신호는 누구나 수신할 수 있으므로 암호화가 필수적이다.
- WEP: 초기 암호화 표준, 심각한 취약점으로 더 이상 사용하지 않음
- WPA2: AES 암호화 기반의 현대적 보안 표준
- WPA3: 최신 보안 프로토콜, 더 강력한 암호화

공개 WiFi(카페, 공항)는 암호화되지 않거나 공유 비밀번호를 사용하므로, 중간자 공격(man-in-the-middle)에 취약하다.

## 예시

WiFi 세대 비교:

| 세대 | 표준 | 최대 속도 | 출시연도 |
|------|------|----------|---------|
| WiFi 4 | 802.11n | 600 Mbps | 2009 |
| WiFi 5 | 802.11ac | 3.5 Gbps | 2014 |
| WiFi 6 | 802.11ax | 9.6 Gbps | 2020 |

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/network/ethernet-basics/) - WiFi와 유사한 원리의 유선 LAN 기술
- [패킷 (Packet)](/knowledge/network/packet/) - WiFi를 통해 전송되는 데이터 단위
- [대역폭 (Bandwidth)](/knowledge/network/bandwidth/) - WiFi 성능의 핵심 지표

## 출처

- Understanding the Digital World, Chapter 8
