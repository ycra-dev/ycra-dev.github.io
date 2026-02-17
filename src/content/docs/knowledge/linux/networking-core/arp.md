---
title: "ARP (Address Resolution Protocol)"
description: "ARP(Address Resolution Protocol, RFC826)는 IPv4에서 IP 주소를 해당 네트워크 인터페이스의 하드웨어(MAC) 주소로 변환하는 링크 계층 프로토콜로, 브로드캐스트를 통해 로컬 네트워크의 장치 주소를 자동으로 발견한다"
tags: ['Arp', 'Networking', 'Mac Address', 'IP Address', 'Link Layer']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/arp
sidebar:
  order: 13
---

## 핵심 개념

호스트 A가 같은 이더넷에 있는 호스트 B에게 패킷을 보내려면, B의 MAC 주소를 알아야 한다. ARP는 "IP 주소 X의 하드웨어 주소를 아는 사람?" 이라는 브로드캐스트 패킷을 전송하고, 해당 IP를 가진 기계가 자신의 MAC 주소로 응답한다. 이 과정에서 양쪽 모두 상대방의 주소 매핑을 한 번의 패킷 교환으로 학습한다.

ARP 캐시는 최근 질의 결과를 메모리에 저장하는 테이블로, 대부분의 주소가 부팅 직후 발견되므로 ARP는 많은 네트워크 트래픽을 유발하지 않는다.

IPv6에서는 ARP 대신 **Neighbor Discovery Protocol(ND, RFC4861)**이 사용된다. 브로드캐스트 대신 멀티캐스트를 사용하는 점이 다르지만, 기본 원리는 매우 유사하다.

**보안 위험**: ARP 스푸핑(ARP cache poisoning)은 잘못된 ARP 응답을 보내 네트워크 트래픽을 가로채는 공격 기법이다. 부정확한 캐시 항목은 로컬 네트워크에 대한 트래픽 하이재킹 시도의 징후일 수 있다. 또한 같은 IP 주소를 두 호스트가 사용하면 ARP 테이블로 충돌을 추적할 수 있다.

## 예시

```bash
# ARP/ND 캐시 확인 (Linux)
ip neigh show

# 특정 ARP 항목 추가
sudo ip neigh add 192.168.1.100 lladdr 00:11:22:33:44:55 dev eth0

# ARP 항목 삭제
sudo ip neigh del 192.168.1.100 dev eth0

# ARP 캐시 플러시
sudo ip neigh flush all

# FreeBSD에서 ARP 캐시 확인
arp -a

# FreeBSD에서 ND 캐시 확인
ndp -a

# ARP 프로세스:
# 1. 호스트 A: "IP 192.168.1.5의 MAC 주소를 가진 사람?" (브로드캐스트)
# 2. 호스트 B: "그건 나야, MAC은 08:00:20:00:fb:6a" (유니캐스트 응답)
# 3. 양쪽 모두 상대방의 IP<->MAC 매핑을 캐시에 저장
```

## 관련 개념

- [mac-address](/knowledge/linux/mac-address/) - ARP가 해석하는 하드웨어 주소
- [ip-address](/knowledge/linux/ip-address/) - ARP가 변환하는 출발 주소
- [ethernet](/knowledge/linux/ethernet/) - ARP 브로드캐스트가 동작하는 네트워크
- [ipv6](/knowledge/linux/ipv6/) - ARP 대신 Neighbor Discovery 사용
- [network-interface](/knowledge/linux/network-interface/) - ARP 캐시가 인터페이스별로 관리됨
