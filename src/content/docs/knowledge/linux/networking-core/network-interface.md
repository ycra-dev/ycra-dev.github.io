---
title: "네트워크 인터페이스 (Network Interface)"
description: "네트워크 인터페이스(Network Interface)는 네트워크에 연결될 수 있는 하드웨어(또는 가상) 장치로, 각 인터페이스는 독립적으로 IP 주소와 네트워크 프로토콜을 구성할 수 있으며, 시스템에는 최소한 루프백(loopback)과 하나의 물리 인터페이스가 존재한다"
tags: ['Network Interface', 'Networking', 'IP Configuration', 'Ethernet', 'Linux']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/network-interface
sidebar:
  order: 12
---

## 핵심 개념

Linux에서 네트워크 인터페이스 관리의 핵심 도구는 ip 명령이다(iproute2 패키지):
- **ip link**: 인터페이스 하드웨어 구성 (MAC 주소, MTU, 상태)
- **ip address**: 인터페이스에 IP 주소 바인딩 (프로토콜별 설정)
- **ip route**: 라우팅 테이블 관리

인터페이스 명명 규칙:
- 현대 Linux: 예측 가능한 이름 (enp0s5, ens33 등)
- 전통적 Linux: 드라이버 기반 (eth0, wlan0 등)
- FreeBSD: 드라이버+인스턴스 (em0, re0 등)

IPv4와 IPv6는 완전히 분리된 세계로, 각각 독립적으로 구성된다. 하나의 인터페이스에 여러 IP 주소를 할당할 수 있다.

배포판별 정적 구성:
- **Debian/Ubuntu**: /etc/network/interfaces (iface, auto, inet/inet6 키워드)
- **Red Hat/CentOS**: /etc/sysconfig/network-scripts/ifcfg-인터페이스명
- **FreeBSD**: /etc/rc.conf (ifconfig_인터페이스명 변수)

하드웨어 옵션은 ethtool(Linux) 또는 ifconfig media/mediaopt(FreeBSD)로 설정한다. 오토네고시에이션 설정은 양쪽 모두 일치해야 한다.

## 예시

```bash
# 모든 인터페이스 확인 (Linux)
ip link show

# IP 주소 설정 (Linux)
sudo ip address add 192.168.1.10/24 broadcast 192.168.1.255 dev enp0s5

# 인터페이스 활성화/비활성화
sudo ip link set enp0s5 up
sudo ip link set enp0s5 down

# Debian/Ubuntu 정적 구성 (/etc/network/interfaces)
# auto enp0s5
# iface enp0s5 inet static
#   address 192.168.1.10
#   netmask 255.255.255.0
#   gateway 192.168.1.1

# DHCP 구성
# iface enp0s5 inet dhcp

# Red Hat/CentOS (/etc/sysconfig/network-scripts/ifcfg-eth0)
# DEVICE=eth0
# BOOTPROTO=static
# IPADDR=192.168.1.10
# NETMASK=255.255.255.0
# ONBOOT=yes

# 인터페이스 재시작
sudo ifdown enp0s5 && sudo ifup enp0s5

# ethtool로 하드웨어 상태 확인
ethtool eth0
```

## 관련 개념

- [IP 주소 (IP Address)](/knowledge/linux/ip-address/) - 인터페이스에 할당되는 주소
- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 일반적인 물리 인터페이스 기술
- [MAC 주소 (MAC Address)](/knowledge/linux/mac-address/) - 인터페이스의 하드웨어 주소
- [DHCP (동적 호스트 구성 프로토콜)](/knowledge/linux/dhcp/) - 인터페이스의 동적 구성
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - 인터페이스와 연결된 라우팅 항목
- [sysctl (커널 파라미터 설정)](/knowledge/linux/sysctl/) - 인터페이스별 커널 매개변수
