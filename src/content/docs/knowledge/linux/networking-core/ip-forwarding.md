---
title: "IP 포워딩 (IP Forwarding)"
description: "IP 포워딩(IP Forwarding)은 UNIX/Linux 시스템이 하나의 네트워크 인터페이스에서 수신한 제3자 패킷을 다른 인터페이스를 통해 재전송하여 라우터 역할을 할 수 있게 하는 커널 기능이다"
tags: ['IP Forwarding', 'Routing', 'Networking', 'Security', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ip-forwarding
sidebar:
  order: 18
---

## 핵심 개념

IP 포워딩이 활성화되면 시스템은 라우터처럼 동작하여 서로 다른 네트워크 인터페이스 간에 패킷을 전달할 수 있다. 그러나 여러 네트워크 인터페이스를 가진 호스트라 해도 실제로 라우터 역할을 하지 않는다면 이 기능을 비활성화하는 것이 보안상 바람직하다.

보안 위험: IP 포워딩이 활성화된 호스트는 외부 패킷이 내부 네트워크에서 온 것처럼 위장하는 데 악용될 수 있다. 이런 기법은 네트워크 스캐너와 패킷 필터를 우회하는 데 사용될 수 있다.

중요한 구분: 호스트가 여러 서브넷에 네트워크 인터페이스를 가지고 자체 트래픽에 사용하는 것과, 제3자 패킷을 포워딩하는 것은 별개이다. 전자는 IP 포워딩 없이도 가능하다.

NAT를 구현하거나 방화벽으로 사용하려면 반드시 IP 포워딩을 활성화해야 하며, 동시에 적절한 패킷 필터링(iptables 등)을 설정해야 한다.

## 예시

```bash
# IP 포워딩 상태 확인
cat /proc/sys/net/ipv4/ip_forward
# 0 = 비활성화, 1 = 활성화

# IP 포워딩 활성화 (일시적)
sudo sysctl -w net.ipv4.ip_forward=1

# IP 포워딩 비활성화 (일시적)
sudo sysctl -w net.ipv4.ip_forward=0

# 영구 설정 (/etc/sysctl.conf)
# net.ipv4.ip_forward = 0   # 일반 호스트
# net.ipv4.ip_forward = 1   # 라우터/NAT 게이트웨이

# IPv6 포워딩 설정
sudo sysctl -w net.ipv6.conf.all.forwarding=1

# uRPF(unicast Reverse Path Forwarding) 설정
# 스푸핑된 패킷을 차단하는 휴리스틱
sudo sysctl -w net.ipv4.conf.all.rp_filter=1
```

## 관련 개념

- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - 포워딩 시 참조하는 경로 정보
- [NAT (네트워크 주소 변환)](/knowledge/linux/nat/) - IP 포워딩이 필요한 NAT 구성
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - IP 포워딩과 함께 사용하는 패킷 필터링
- [sysctl (커널 파라미터 설정)](/knowledge/linux/sysctl/) - IP 포워딩 커널 매개변수 설정
- [네트워크 인터페이스 (Network Interface)](/knowledge/linux/network-interface/) - 포워딩이 이루어지는 인터페이스
