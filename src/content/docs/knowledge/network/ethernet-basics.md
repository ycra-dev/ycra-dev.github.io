---
title: "이더넷 (Ethernet)"
description: "1970년대 Xerox PARC에서 발명된 근거리 통신망(LAN) 기술로 패킷 기반으로 동작하며 48비트 MAC 주소를 사용한다"
tags: ["Network", "Ethernet", "LAN", "Protocol", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/ethernet-basics
sidebar:
  order: 8
---

## 핵심 개념

이더넷(Ethernet)은 1970년대 Xerox PARC에서 발명된 근거리 통신망(LAN) 기술로, 패킷 기반으로 동작하며 48비트 MAC 주소를 사용하여 같은 네트워크 내 장치들을 연결한다.

## 동작 원리

**MAC 주소**: 모든 이더넷 장치는 48비트(6바이트)의 고유한 물리적 주소를 가진다. 제조 시 하드웨어에 기록되며, `00:1A:2B:3C:4D:5E`와 같은 형태이다. 앞 24비트는 제조사 식별, 뒤 24비트는 장치 고유 번호이다.

**CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**: 초기 이더넷의 충돌 처리 메커니즘이다.
1. **Carrier Sense**: 전송 전 다른 장치가 전송 중인지 확인
2. **Multiple Access**: 여러 장치가 같은 매체를 공유
3. **Collision Detection**: 충돌 발생 시 감지하고, 임의의 시간만큼 대기 후 재전송

**속도의 발전**:
- 초기: 2.94 Mbps (1973)
- 표준 이더넷: 10 Mbps (1980년대)
- Fast Ethernet: 100 Mbps (1995)
- Gigabit Ethernet: 1 Gbps (1999)
- 10 Gigabit Ethernet: 10 Gbps (2002)

**패킷 구조**: 이더넷 프레임은 목적지 MAC 주소, 출발지 MAC 주소, 타입/길이 필드, 데이터(최대 약 1500바이트), 그리고 오류 검출용 CRC를 포함한다.

## 예시

이더넷 프레임의 기본 구조:

```
+------------------+------------------+------+----------------+-----+
| 목적지 MAC (6B)  | 출발지 MAC (6B)  | 타입 | 데이터 (≤1500B)| CRC |
+------------------+------------------+------+----------------+-----+
```

MAC 주소 확인:

```bash
# Linux
$ ip link show
  link/ether 00:1A:2B:3C:4D:5E
```

## 관련 개념

- [패킷 (Packet)](/knowledge/network/packet/) - 이더넷을 통해 전송되는 데이터 단위
- [WiFi](/knowledge/network/wifi-basics/) - 이더넷과 유사한 무선 LAN 기술
- [오류 검출 (Error Detection)](/knowledge/network/error-detection/) - CRC를 통한 이더넷 프레임 오류 검출

## 출처

- Understanding the Digital World, Chapter 8
