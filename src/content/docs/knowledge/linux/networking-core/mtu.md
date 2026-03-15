---
title: "MTU (최대 전송 단위)"
description: "MTU(Maximum Transfer Unit)는 네트워크 링크 계층에서 단일 프레임에 담을 수 있는 최대 페이로드 크기로, 하드웨어 규격과 프로토콜 규약에 의해 결정되며 표준 이더넷의 경우 1,500바이트이다"
tags: ['Mtu', 'Networking', 'Ethernet', 'Fragmentation', 'Packet']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/mtu
sidebar:
  order: 10
---

## 핵심 개념

패킷이 MTU보다 큰 네트워크를 통과해야 할 때 단편화(fragmentation)가 발생한다. IPv4에서는 중간 라우터가 패킷을 분할할 수 있지만, IPv6에서는 발신 호스트만 단편화를 수행해야 하며 모든 IPv6 네트워크는 최소 1,280바이트 MTU를 지원해야 한다.

**경로 MTU 발견(Path MTU Discovery)**은 패킷이 통과해야 하는 가장 작은 MTU 링크를 찾아내는 메커니즘이다:
- IPv4: "do not fragment" 플래그를 설정하여 라우터가 ICMP 오류 메시지로 해당 MTU를 알려줌
- IPv6: 모든 패킷이 기본적으로 "do not fragment"이므로 자동 적용
- TCP는 자동으로 경로 MTU 발견을 수행하지만, UDP는 하지 않음

VPN 터널링 시 주의가 필요하다. 1,500바이트 패킷에 터널링 헤더(약 40바이트)가 추가되면 단편화가 발생하므로, 터널 인터페이스의 MTU를 더 작은 값으로 설정하면 성능이 향상된다.

## 예시

```bash
# 네트워크별 일반적인 MTU 값:
# 이더넷:     1,500 바이트
# 점보 프레임: 9,000 바이트
# PPPoE:      1,492 바이트
# IPv6 최소:  1,280 바이트

# 인터페이스의 현재 MTU 확인
ip link show eth0

# MTU 변경
sudo ip link set eth0 mtu 9000

# Path MTU Discovery 테스트 (큰 패킷으로 ping)
ping -s 1472 -M do target-host
# 1472 + 28(IP+ICMP 헤더) = 1500 (이더넷 MTU에 딱 맞음)

# VPN 터널의 MTU 설정 (오버헤드 고려)
sudo ip link set tun0 mtu 1400
```

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 표준 1,500바이트 MTU의 기반 기술
- [네트워크 패킷 캡슐화 (Network Packet Encapsulation)](/knowledge/linux/network-packet-encapsulation/) - MTU가 제한하는 캡슐화 크기
- [ICMP (인터넷 제어 메시지 프로토콜)](/knowledge/linux/icmp/) - 경로 MTU 발견에 사용되는 프로토콜
- [VPN (가상 사설 네트워크)](/knowledge/linux/vpn/) - MTU 설정이 중요한 터널링 환경
- [ping (핑)](/knowledge/linux/ping/) - MTU 문제 진단 도구
