---
title: "DHCP (동적 호스트 구성 프로토콜)"
description: "DHCP(Dynamic Host Configuration Protocol, RFC2131/2132/3315)는 네트워크 장치가 중앙 서버로부터 IP 주소, 넷마스크, 게이트웨이, DNS 서버 등 네트워크 매개변수를 자동으로 임대(lease)받을 수 있게 하는 프로..."
tags: ['Dhcp', 'Networking', 'IP Address', 'Bootp', 'Network Configuration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dhcp
sidebar:
  order: 14
---

## 핵심 개념

DHCP는 BOOTP(diskless 워크스테이션 부팅 프로토콜)의 하위 호환 확장이다. 클라이언트는 전체 1 브로드캐스트(255.255.255.255)로 "나는 누구인가?" 메시지를 보내 DHCP 서버를 찾는다(아직 서브넷 마스크를 모르므로 서브넷 브로드캐스트 사용 불가). 로컬 네트워크에 서버가 없으면 릴레이 에이전트(dhcrelay)가 다른 서브넷의 서버로 메시지를 전달한다.

임대 가능한 매개변수:
- IP 주소 및 넷마스크, 기본 게이트웨이, DNS 네임서버
- Syslog 호스트, WINS/NTP/프록시 서버, TFTP 서버(부트 이미지)

임대 기간이 절반 지나면 클라이언트는 갱신을 시도하고, 갱신되지 않으면 만료되어 서버가 해당 주소를 다른 클라이언트에게 할당할 수 있다. 서버는 할당 내역을 리부팅 간에도 유지해야 한다.

ISC(Internet Systems Consortium)의 dhcpd가 표준 구현체이며, 설정 파일(dhcpd.conf)에 서브넷, IP 범위, 임대 기간, 정적 할당 등을 정의한다. DHCP는 DNS와 상호작용하며, 동적으로 할당된 주소를 DNS에 자동 업데이트할 수도 있다.

## 예시

```bash
# dhcpd.conf 설정 예시
# subnet 10.1.1.0 netmask 255.255.255.0 {
#   range 10.1.1.10 10.1.1.20;
#   option routers 10.1.1.1;
#   option domain-name "synack.net";
#   option domain-name-servers 10.1.1.1;
#   default-lease-time 3600;
#   max-lease-time 86400;
#
#   host gandalf {
#     hardware ethernet 08:00:2b:4c:29:32;
#     fixed-address 10.1.1.25;
#   }
# }

# DHCP 클라이언트 설정 (Debian/Ubuntu)
# /etc/network/interfaces:
# auto enp0s5
# iface enp0s5 inet dhcp

# DHCP 리스 정보 확인
cat /var/lib/dhcp/dhclient-eth0.leases

# DHCP 클라이언트 수동 실행
sudo dhclient eth0

# DHCP 서버 설치 (Ubuntu)
sudo apt install isc-dhcp-server
```

## 관련 개념

- [IP 주소 (IP Address)](/knowledge/linux/ip-address/) - DHCP가 할당하는 핵심 매개변수
- [DNS 이름 해석 (DNS Resolution)](/knowledge/linux/dns-resolution/) - DHCP와 연동되는 이름 해석
- [NAT (네트워크 주소 변환)](/knowledge/linux/nat/) - DHCP가 사설 네트워크에서 주소를 관리
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - DHCP가 기본 라우트를 전달
- [네트워크 인터페이스 (Network Interface)](/knowledge/linux/network-interface/) - DHCP가 구성하는 대상
