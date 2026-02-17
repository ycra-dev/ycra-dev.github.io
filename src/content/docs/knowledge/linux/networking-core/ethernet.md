---
title: "Ethernet"
description: "이더넷(Ethernet)은 전 세계 LAN 시장의 95% 이상을 점유하는 가장 보편적인 네트워크 기술로, 링크 계층에서 패킷의 프레이밍, MAC 주소 기반 주소 지정, 물리적 미디어 접근 제어를 담당하며, 3 Mb/s에서 시작하여 현재 400 Gb/s까지 진화한 ..."
tags: ['Ethernet', 'Link Layer', 'Networking', 'Mac', 'Framing', 'Physical Networking', 'Csma Cd']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ethernet
sidebar:
  order: 4
---

## 핵심 개념

이더넷의 링크 계층은 두 부분으로 나뉜다:
- **MAC(Media Access Control) 서브레이어**: 물리 미디어를 다루고 패킷을 와이어에 전송
- **LLC(Logical Link Control) 서브레이어**: 프레이밍을 처리

**CSMA/CD(Carrier Sense Multiple Access / Collision Detection)**: 이더넷의 기본 신호 방식으로, 전송 전 회선을 감지(Carrier Sense)하고, 다중 접근(Multiple Access)을 허용하며, 충돌 발생 시 감지(Collision Detection)하여 임의의 시간 후 재전송한다. 현대의 스위칭 환경에서는 충돌 도메인이 두 호스트로 제한되어 CSMA/CD의 중요성이 감소하였다.

**이더넷 토폴로지**: 루프가 없는 분기 버스(branching bus) 구조이다. 패킷 유형은 유니캐스트, 멀티캐스트, 브로드캐스트 세 가지이며, 하나의 논리적 세그먼트가 하나의 브로드캐스트 도메인을 정의한다. 스위치의 등장으로 물리적 세그먼트와 논리적 세그먼트가 분리되었다.

**이더넷의 진화**: 10BASE5 -> 10BASE-T -> 100BASE-TX -> 1000BASE-T -> 10GBASE-T -> 40GBASE-T -> 100GBASE -> 400GBASE로 발전하였다. 1 Gb/s 이상의 인터페이스에서는 반드시 오토네고시에이션을 사용해야 하며 이는 IEEE 표준 요구사항이다.

프레이밍(framing)은 패킷에 헤더를 추가하고 패킷 간 구분자를 삽입하는 과정이다. 표준 MTU는 1,500바이트(프레이밍 포함 1,518바이트)이다.

## 예시

```bash
# 네트워크 인터페이스 확인 (Linux)
ip link show

# ethtool로 인터페이스 상태 확인
ethtool eth0

# 속도와 이중 모드 수동 설정
sudo ethtool -s eth0 speed 100 duplex full autoneg off

# 오토네고시에이션 강제 재협상
sudo ethtool -r eth0

# 이더넷 프레임 구조:
# | Preamble | Dst MAC | Src MAC | Type | Payload | CRC |
# | 8 bytes  | 6 bytes | 6 bytes | 2B   | 46-1500 | 4B  |

# 이더넷 속도 진화:
# 10BASE-T   : 10 Mb/s   (Cat 3)
# 100BASE-TX : 100 Mb/s  (Cat 5)
# 1000BASE-T : 1 Gb/s    (Cat 5e/6)
# 10GBASE-T  : 10 Gb/s   (Cat 6a/7)
```

## 관련 개념

- [mac-address](/knowledge/linux/mac-address/) - 이더넷의 하드웨어 주소 체계
- [mtu](/knowledge/linux/mtu/) - 이더넷 프레임의 최대 전송 단위
- [network-packet-encapsulation](/knowledge/linux/network-packet-encapsulation/) - 이더넷 프레이밍과 캡슐화
- [arp](/knowledge/linux/arp/) - 이더넷에서의 주소 해석
- [network-switch](/knowledge/linux/network-switch/) - 이더넷 패킷을 전달하는 장비
- [vlan](/knowledge/linux/vlan/) - 스위치 포트의 논리적 분할
- [utp-cabling](/knowledge/linux/utp-cabling/) - 이더넷의 물리적 전송 매체
- [jumbo-frame](/knowledge/linux/jumbo-frame/) - 표준 MTU를 초과하는 이더넷 프레임
- [wireless-networking](/knowledge/linux/wireless-networking/) - 무선 이더넷(Wi-Fi)
