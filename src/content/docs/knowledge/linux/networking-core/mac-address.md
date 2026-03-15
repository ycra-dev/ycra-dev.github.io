---
title: "MAC 주소 (MAC Address)"
description: "MAC 주소(Media Access Control Address)는 네트워크 인터페이스에 제조 시 할당되는 6바이트(48비트)의 고유한 하드웨어 주소로, 물리 네트워크에서 장치를 식별하는 링크 계층 주소 체계이다"
tags: ['Mac Address', 'Ethernet', 'Hardware Address', 'Networking', 'Link Layer']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/mac-address
sidebar:
  order: 5
---

## 핵심 개념

MAC 주소는 콜론으로 구분된 2자리 16진수 바이트로 표기한다 (예: 00:50:8d:9a:3b:df). 6바이트 중 처음 3바이트는 제조사를 식별하는 OUI(Organizationally Unique Identifier)이고, 나머지 3바이트는 제조사가 할당하는 고유 일련번호이다. OUI는 IEEE 데이터베이스(standards.ieee.org/regauth/oui)에서 조회할 수 있어, 네트워크 문제를 일으키는 장치의 제조사를 파악하는 데 활용할 수 있다.

IP 주소는 네트워크 인터페이스를 식별하지 기계(machine)를 식별하지 않는다는 점이 중요하다. 마찬가지로 MAC 주소도 인터페이스 수준의 주소이다. 하나의 호스트에 여러 네트워크 인터페이스가 있으면 각각 별도의 MAC 주소를 가진다.

이론적으로 MAC 주소는 영구적이고 변경 불가능하지만, 많은 네트워크 인터페이스에서 소프트웨어적으로 재설정(spoofing)할 수 있다. 이는 고장난 네트워크 카드 교체, DHCP MAC 기반 주소 할당 유지 등에 유용하지만, 보안 위험이 될 수도 있다. IPv6에서는 MAC 주소가 modified EUI-64 알고리즘을 통해 IP 주소의 호스트 부분으로 직접 사용될 수 있다.

## 예시

```bash
# MAC 주소 구조:
# 00:50:8D:9A:3B:DF
# |--OUI--|--Serial--|
# 제조사 ID  고유번호

# 네트워크 인터페이스의 MAC 주소 확인 (Linux)
ip link show eth0

# MAC 주소 변경 (Linux)
sudo ip link set eth0 down
sudo ip link set eth0 address 02:42:ac:11:00:02
sudo ip link set eth0 up

# ARP 캐시에서 MAC 주소 확인
ip neigh show

# OUI 조회를 위한 처음 3바이트 확인
# 00:50:8D -> 제조사 확인: standards.ieee.org/regauth/oui
```

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - MAC 주소를 사용하는 링크 계층 기술
- [ARP (주소 결정 프로토콜)](/knowledge/linux/arp/) - IP 주소를 MAC 주소로 변환하는 프로토콜
- [IPv6 (인터넷 프로토콜 버전 6)](/knowledge/linux/ipv6/) - MAC 기반 자동 호스트 번호 생성 (EUI-64)
- [IP 주소 (IP Address)](/knowledge/linux/ip-address/) - MAC 위에서 동작하는 논리 주소
- [DHCP (동적 호스트 구성 프로토콜)](/knowledge/linux/dhcp/) - MAC 주소 기반 IP 주소 할당
