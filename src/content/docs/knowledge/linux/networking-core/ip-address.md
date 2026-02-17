---
title: "IP Address"
description: "IP 주소(Internet Protocol Address)는 하드웨어에 독립적인 소프트웨어 수준의 네트워크 주소로, 특정 네트워크 컨텍스트 내에서 고유한 목적지를 식별하며 네트워크 인터페이스를 가리킨다(기계가 아님)"
tags: ['IP Address', 'Networking', 'Ipv4', 'Ipv6', 'Addressing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ip-address
sidebar:
  order: 6
---

## 핵심 개념

IP 주소는 네트워크 부분(network portion)과 호스트 부분(host portion)으로 구성된다. IPv4에서는 4바이트(32비트)이고 경계가 관리적으로 설정되며, IPv6에서는 16바이트(128비트)이고 경계가 /64로 고정되어 있다.

IP 주소는 네 가지 유형이 있다:
- **유니캐스트(Unicast)**: 단일 네트워크 인터페이스를 지칭
- **멀티캐스트(Multicast)**: 호스트 그룹을 동시에 대상으로 함
- **브로드캐스트(Broadcast)**: 로컬 서브넷의 모든 호스트 포함
- **애니캐스트(Anycast)**: 호스트 그룹 중 가장 가까운 하나로 해석

IP 주소는 전역적으로 고유하다고 하지만, 몇 가지 예외가 있다: NAT는 하나의 인터페이스 IP로 여러 기계의 트래픽을 처리하고, RFC1918 사설 주소 공간은 여러 사이트가 동시에 사용 가능하며, 애니캐스트는 하나의 IP를 여러 기계가 공유한다.

IP 주소와 하드웨어 주소 간의 매핑은 이더넷 등에서 ARP(IPv4) 또는 Neighbor Discovery(IPv6) 프로토콜을 통해 자동으로 이루어진다.

## 예시

```bash
# IP 주소 설정 (Linux)
sudo ip address add 192.168.1.10/24 dev enp0s5

# 모든 인터페이스의 IP 주소 확인
ip address show

# 특정 인터페이스의 IP 확인
ip address show dev eth0

# /etc/hosts 파일로 호스트명-IP 매핑
# 127.0.0.1       localhost
# ::1             localhost
# 192.168.1.10    myhost.example.com myhost

# 주소 유형별 예시
# 유니캐스트:  192.168.1.10
# 브로드캐스트: 192.168.1.255
# 멀티캐스트:  224.0.0.1
# 루프백:      127.0.0.1 (IPv4), ::1 (IPv6)

# 호스트명 설정
sudo hostnamectl set-hostname myhost.example.com
```

## 관련 개념

- [ipv4](/knowledge/linux/ipv4/) - 32비트 IP 주소 체계
- [ipv6](/knowledge/linux/ipv6/) - 128비트 IP 주소 체계
- [subnet-mask](/knowledge/linux/subnet-mask/) - IP 주소의 네트워크/호스트 경계 정의
- [mac-address](/knowledge/linux/mac-address/) - IP 주소가 매핑되는 하드웨어 주소
- [dns-resolution](/knowledge/linux/dns-resolution/) - 호스트명을 IP 주소로 변환
- [dhcp](/knowledge/linux/dhcp/) - IP 주소 자동 할당
