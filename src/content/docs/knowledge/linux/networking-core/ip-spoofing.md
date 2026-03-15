---
title: "IP 스푸핑 (IP Spoofing)"
description: "IP 스푸핑(IP Spoofing)은 IP 패킷의 소스 주소를 실제 발신자가 아닌 다른 주소로 위조하는 기법으로, 원시 소켓(raw socket)을 사용하여 커널의 정상적인 주소 할당을 우회하며, 주로 악의적 네트워크 행위에 사용된다"
tags: ['IP Spoofing', 'Security', 'Networking', 'Ddos', 'Firewall']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ip-spoofing
sidebar:
  order: 27
---

## 핵심 개념

IP 스푸핑의 주요 악용 사례:
- **DDoS 공격(분산 서비스 거부 공격)**: 다수의 외부 기계에서 위조된 소스 주소로 대량의 패킷을 전송하여 피해자의 네트워크를 마비
- **반사 공격**: 위조된 소스 주소(피해자 주소)로 요청을 보내 응답이 피해자에게 쏟아지게 함
- **방화벽 우회**: 외부 패킷이 내부 네트워크에서 발신된 것처럼 위장하여 방화벽의 소스 기반 필터링을 우회

방어 메커니즘:
1. **경계 라우터에서의 이그레스 필터링**: 자신의 주소 공간에 속하지 않는 소스 주소를 가진 나가는 패킷 차단
2. **인그레스 필터링**: 내부 네트워크 주소를 소스로 가진 외부 유입 패킷 차단
3. **uRPF(unicast Reverse Path Forwarding)**: 패킷이 도착한 인터페이스가 해당 소스 주소로의 라우팅 인터페이스와 같은지 검증. Linux 커널에서 기본 활성화
4. **RFC1918 주소 이탈 방지**: 사설 주소가 인터넷으로 빠져나가는 것을 경계 라우터에서 필터링

uRPF는 인바운드/아웃바운드 경로가 다른 멀티홈(multi-homed) 환경에서는 비활성화가 필요할 수 있다.

## 예시

```bash
# uRPF 활성화 확인 (Linux)
cat /proc/sys/net/ipv4/conf/all/rp_filter
# 1 = 활성화

# uRPF 설정
sudo sysctl -w net.ipv4.conf.all.rp_filter=1

# 경계 라우터에서 안티스푸핑 iptables 규칙
# 외부 인터페이스(eth1)에서 내부 주소를 소스로 가진 패킷 차단
sudo iptables -t nat -A PREROUTING -i eth1 \
  -s 10.0.0.0/8 -j DROP
sudo iptables -t nat -A PREROUTING -i eth1 \
  -s 172.16.0.0/12 -j DROP
sudo iptables -t nat -A PREROUTING -i eth1 \
  -s 192.168.0.0/16 -j DROP

# 나가는 패킷의 소스 주소 검증
# 자신의 네트워크 주소가 아닌 소스를 가진 패킷 차단
sudo iptables -A OUTPUT -o eth1 \
  ! -s 128.138.101.0/24 -j DROP
```

## 관련 개념

- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - 안티스푸핑 규칙 설정 도구
- [IP 포워딩 (IP Forwarding)](/knowledge/linux/ip-forwarding/) - 스푸핑 공격에 악용될 수 있는 기능
- [NAT (네트워크 주소 변환)](/knowledge/linux/nat/) - 스푸핑된 사설 주소 패킷의 인터넷 유출
- [ICMP (인터넷 제어 메시지 프로토콜)](/knowledge/linux/icmp/) - 스푸핑된 패킷의 오류 메시지 전달
