---
title: "NAT (네트워크 주소 변환)"
description: "NAT(Network Address Translation)는 사설 IP 주소를 사용하는 내부 네트워크 호스트가 인터넷과 통신할 수 있도록 경계 라우터에서 패킷의 소스 주소를 공인 IP 주소로 변환하고, 내부/외부 주소 쌍의 매핑 테이블을 유지하는 기술이다"
tags: ['Nat', 'Networking', 'Firewall', 'Private Address', 'Ipv4']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nat
sidebar:
  order: 16
---

## 핵심 개념

RFC1918은 내부 네트워크 전용으로 세 가지 사설 주소 공간을 정의한다:
- **10.0.0.0/8** (Class A 1개): 16,777,216 주소
- **172.16.0.0/12** (Class B 16개): 1,048,576 주소
- **192.168.0.0/16** (Class C 256개): 65,536 주소

대부분의 가정용 라우터가 사용하는 것은 실제로 **PAT(Port Address Translation)**로, 단일 외부 IP 주소의 포트 공간에 여러 내부 클라이언트 연결을 다중화한다. 실무에서는 NAT와 PAT를 모두 "NAT"라고 부른다.

NAT의 장단점:
- **장점**: 내부 구조 은닉, ISP 변경 시 개별 호스트 재구성 불필요, 주소 공간 절약
- **한계**: 외부에서 내부 호스트로의 직접 연결 불가(포트 포워딩 필요), 일부 프로토콜(FTP, VPN, 미디어 스트리밍)과 호환성 문제, 보안 기능이 아님(방화벽 대체 불가)
- 인터넷 백본 트래픽의 0.1-0.2%가 사설 주소나 불량 체크섬을 가진 잘못된 NAT 설정으로 인한 패킷

UPnP(Universal Plug and Play)를 통해 내부 호스트가 동적 NAT 터널을 자체 설정할 수 있지만, 이는 보안 위험이 될 수 있다.

## 예시

```bash
# Linux에서 NAT 설정 (iptables)
# IP 포워딩 활성화
echo 1 > /proc/sys/net/ipv4/ip_forward

# 커널 모듈 로드
sudo modprobe iptable_nat
sudo modprobe ip_conntrack

# NAT(PAT) 규칙 설정
sudo iptables -t nat -A POSTROUTING -o eth1 \
  --to 128.138.101.4 -j SNAT

# RFC1918 사설 주소를 사용하는 dhcpd.conf 예시
# subnet 10.1.1.0 netmask 255.255.255.0 {
#   range 10.1.1.10 10.1.1.20;
#   option routers 10.1.1.1;
# }

# 잘못된 NAT 설정으로 사설 주소 패킷이 인터넷에 유출되면
# 응답 패킷이 돌아올 수 없음
```

## 관련 개념

- [IPv4 (인터넷 프로토콜 버전 4)](/knowledge/linux/ipv4/) - NAT가 주소 고갈을 완화하는 대상
- [CIDR (클래스리스 라우팅)](/knowledge/linux/cidr/) - NAT와 함께 IPv4 주소 효율성을 높이는 기술
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - Linux에서 NAT를 구현하는 도구
- [VPN (가상 사설 네트워크)](/knowledge/linux/vpn/) - NAT 환경에서 호환성 문제가 있을 수 있는 기술
- [DHCP (동적 호스트 구성 프로토콜)](/knowledge/linux/dhcp/) - NAT 내부 네트워크의 IP 주소 관리
- [VPC (가상 사설 클라우드)](/knowledge/linux/vpc/) - 클라우드 환경의 NAT 게이트웨이
