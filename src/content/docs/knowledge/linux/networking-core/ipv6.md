---
title: "IPv6 (인터넷 프로토콜 버전 6)"
description: "IPv6(Internet Protocol version 6)는 16바이트(128비트) 주소 체계를 사용하는 차세대 인터넷 프로토콜로, IPv4의 주소 고갈 문제를 해결하고 보안 및 자동 구성 기능을 기본적으로 통합한다"
tags: ['Ipv6', 'IP Address', 'Networking', 'Slaac', 'TCP IP']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ipv6
sidebar:
  order: 3
---

## 핵심 개념

IPv6 주소는 8개의 16비트 그룹을 콜론으로 구분하여 16진수로 표기한다 (예: 2607:f8b0:a:806::200e). 표기 간소화 규칙으로 선행 0 생략과 연속된 0 그룹을 :: 로 축약할 수 있다(RFC5952).

네트워크/호스트 경계가 /64로 고정되어 있어 서브네팅 개념이 사실상 불필요하다. 호스트 부분(64비트)은 MAC 주소에서 modified EUI-64 알고리즘으로 자동 생성될 수 있다.

**SLAAC(StateLess Address AutoConfiguration)**는 IPv6의 핵심 기능이다:
1. fe80::/64 링크 로컬 주소를 MAC 기반으로 자동 할당
2. ICMPv6 Router Solicitation을 멀티캐스트로 전송
3. 라우터가 Router Advertisement로 네트워크 프리픽스를 응답
4. 호스트가 프리픽스 + EUI-64 호스트 부분으로 전역 주소를 자동 구성

IPv6는 브로드캐스트 대신 멀티캐스트를 사용하며, 6to4와 Teredo 같은 터널링 메커니즘으로 IPv4 네트워크를 통한 IPv6 통신이 가능하다. 그러나 2017년 기준 인터넷의 대부분은 여전히 IPv4를 사용하고 있으며, IPv6 전환은 점진적으로 진행 중이다.

## 예시

```bash
# IPv6 주소 표기법
# 전체 표기: 2607:f8b0:000a:0806:0000:0000:0000:200e
# 간소화:    2607:f8b0:a:806::200e
# 루프백:    ::1

# MAC에서 EUI-64 호스트 ID 계산
# MAC: 00:1b:21:30:e9:c7
# EUI-64: 021b:21ff:fe30:e9c7

# IPv6 주소 설정 (Linux)
sudo ip -6 address add 2001:db8::1/64 dev eth0

# IPv6 라우팅 테이블 확인
ip -6 route show

# IPv6 이웃 탐색 캐시 확인
ip -6 neigh show

# IPv6 핑 테스트
ping6 ::1
```

## 관련 개념

- [IPv4 (인터넷 프로토콜 버전 4)](/knowledge/linux/ipv4/) - IPv6의 전신 프로토콜
- [MAC 주소 (MAC Address)](/knowledge/linux/mac-address/) - EUI-64 자동 호스트 번호 생성의 기반
- [DHCP (동적 호스트 구성 프로토콜)](/knowledge/linux/dhcp/) - DHCPv6로 IPv6에서도 동적 구성 가능
- [ICMP (인터넷 제어 메시지 프로토콜)](/knowledge/linux/icmp/) - IPv6의 Neighbor Discovery에 ICMPv6 사용
- [IP 주소 (IP Address)](/knowledge/linux/ip-address/) - IP 주소 체계 일반
