---
title: "ping"
description: "ping은 ICMP ECHO_REQUEST 패킷을 대상 호스트에 전송하고 ECHO_REPLY 응답을 기다려 네트워크 연결성, 패킷 손실률, 왕복 시간(RTT)을 측정하는 가장 기본적인 네트워크 진단 도구이다"
tags: ['Ping', 'Networking', 'Icmp', 'Diagnostics', 'Troubleshooting']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ping
sidebar:
  order: 21
---

## 핵심 개념

ping은 단순하지만 네트워크 디버깅에서 가장 먼저 사용하는 도구이다. 라우팅 테이블, 물리 네트워크, 게이트웨이가 모두 관여하므로, ping이 실패하면 더 복잡한 서비스도 동작하지 않을 가능성이 높다.

핵심 진단 정보:
- **ICMP 시퀀스 번호**: 불연속성은 패킷 손실을 의미
- **왕복 시간(RTT)**: 일관된 RTT에 가끔 지연이 있는 것은 정상; 라우터는 ICMP 응답에 낮은 우선순위를 부여
- **패킷 손실률**: 건강한 네트워크는 거의 패킷을 손실하지 않음. 손실 문제는 상위 프로토콜의 재전송으로 가려지지만 성능을 크게 저하

주의사항:
- 방화벽이 ICMP를 차단하면 ping이 실패해도 네트워크가 정상일 수 있음 (Windows는 기본적으로 ping 차단)
- ping 성공은 기계가 전원이 켜져 있고 커널 패닉이 없다는 것만 보장; 개별 서비스 가용성은 확인 불가
- DNS 문제를 피하려면 숫자 IP 주소와 -n 옵션 사용
- ping -s 옵션으로 MTU보다 큰 패킷을 보내 단편화 테스트 가능

네트워크 문제 해결 순서: ping localhost -> ping 로컬 호스트 -> ping 게이트웨이 -> ping 원격 호스트

## 예시

```bash
# 기본 ping (무한 루프, Ctrl+C로 종료)
ping 192.168.1.1

# 5개 패킷만 전송
ping -c 5 google.com

# DNS 역조회 비활성화 (네트워크 장애 시 유용)
ping -n 192.168.1.1

# MTU 테스트 (1500바이트 패킷)
ping -s 1472 192.168.1.1

# IPv6 ping
ping6 ::1

# 출력 해석:
# 64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.5 ms
# - icmp_seq: 시퀀스 번호 (불연속 = 패킷 손실)
# - ttl: Time To Live
# - time: 왕복 시간 (RTT)

# 패킷 손실 추적 순서:
# 1. traceroute로 경로 확인
# 2. 중간 게이트웨이를 순서대로 ping
# 3. 손실 없는 마지막 게이트웨이와 그 다음 사이가 문제 구간
```

## 관련 개념

- [icmp](/knowledge/linux/icmp/) - ping의 기반 프로토콜
- [traceroute](/knowledge/linux/traceroute/) - ping 다음 단계의 진단 도구
- [mtu](/knowledge/linux/mtu/) - ping으로 MTU 문제 진단
- [dns-resolution](/knowledge/linux/dns-resolution/) - DNS 문제 시 ping 동작에 영향
- [iptables](/knowledge/linux/iptables/) - ICMP 차단이 ping에 미치는 영향
