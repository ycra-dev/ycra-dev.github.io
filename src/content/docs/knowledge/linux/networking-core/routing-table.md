---
title: "Routing Table"
description: "라우팅 테이블(Routing Table)은 커널이 유지하는 네트워크 경로 정보의 집합으로, 패킷의 목적지 IP 주소를 마스크와 비교하여 가장 구체적인(가장 긴 마스크) 경로를 선택해 다음 홉(next-hop) 게이트웨이로 전달하는 규칙을 담고 있다"
tags: ['Routing Table', 'Networking', 'IP Routing', 'Gateway', 'Kernel', 'Packet Forwarding', 'Next Hop']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/routing-table
sidebar:
  order: 17
---

## 핵심 개념

IP 라우팅(IPv4와 IPv6 모두)은 "next hop" 라우팅이다. 패킷을 처리하는 각 지점에서는 패킷의 최종 목적지가 아닌 다음 호스트나 라우터만 결정하면 된다. 이는 패킷 발신 전에 전체 경로를 결정하는 소스 라우팅(source routing)과 대비되는 방식이다.

라우팅 유형:
- **정적 라우팅(Static Routing)**: ip route 또는 route 명령으로 수동 추가. 안정적이고 관리하기 쉬우나 토폴로지 변화에 자동 대응 불가
- **동적 라우팅(Dynamic Routing)**: 라우팅 데몬이 라우팅 프로토콜을 통해 테이블을 자동으로 유지 및 수정. 링크 장애 시 대체 경로를 자동 발견 가능
- **기본 라우트(Default Route)**: 명시적 경로가 없는 목적지의 패킷을 처리. 0.0.0.0/0으로 표현

**패킷 전달 과정**: 호스트 A가 호스트 B로 패킷을 보낼 때, 이더넷 헤더의 목적지 주소는 다음 홉 라우터의 MAC 주소이지만, IP 헤더의 목적지 주소는 최종 목적지인 B의 IP 주소가 유지된다. 라우터는 패킷을 수신하면 자체 라우팅 테이블을 참조하여 IP 헤더를 변경하지 않고 다음 홉으로 전달한다.

게이트웨이는 반드시 한 홉 이내에 있어야 한다. ICMP 리디렉트는 비효율적 경로를 알려주지만, 보안상 비활성화가 권장된다.

## 예시

```bash
# Linux에서 라우팅 테이블 확인
ip route show
netstat -rn

# 정적 라우트 추가
sudo ip route add 132.236.220.64/26 via 132.236.212.6 dev eth1

# 기본 라우트 설정
sudo ip route add default via 132.236.227.1

# 라우트 삭제
sudo ip route del 192.168.45.128/25

# FreeBSD에서 라우트 추가
sudo route add 132.236.220.64/26 132.236.212.6
sudo route add default 132.236.227.1

# ICMP 리디렉트 비활성화 (Linux)
sudo sysctl -w net.ipv4.conf.all.accept_redirects=0
```

## 관련 개념

- [routing-protocol](/knowledge/linux/routing-protocol/) - 라우팅 테이블을 자동으로 관리하는 프로토콜
- [network-router](/knowledge/linux/network-router/) - 라우팅 테이블을 사용하여 패킷을 전달하는 장비
- [subnet-mask](/knowledge/linux/subnet-mask/) - 라우팅 결정에 사용되는 마스크
- [cidr](/knowledge/linux/cidr/) - 라우팅 테이블 축소를 가능하게 하는 표기법
- [icmp](/knowledge/linux/icmp/) - 라우팅 리디렉트와 오류 메시지
- [ip-forwarding](/knowledge/linux/ip-forwarding/) - 라우터로서 패킷을 전달하는 기능
- [bgp](/knowledge/linux/bgp/) - 인터넷 백본 라우팅 프로토콜
- [ospf](/knowledge/linux/ospf/) - 대규모 네트워크의 내부 라우팅 프로토콜
