---
title: "traceroute (경로 추적 도구)"
description: "traceroute는 IP 패킷이 목적지까지 도달하는 경로에 있는 게이트웨이(라우터)의 순서를 밝혀내는 네트워크 진단 도구로, Van Jacobson이 개발했으며 TTL(Time-To-Live) 필드를 조작하여 각 홉의 정보를 수집한다"
tags: ['Traceroute', 'Networking', 'Diagnostics', 'Ttl', 'Routing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/traceroute
sidebar:
  order: 22
---

## 핵심 개념

traceroute는 TTL을 인위적으로 낮은 값으로 설정한 패킷을 전송한다. 게이트웨이가 TTL을 0으로 감소시키면 패킷을 폐기하고 ICMP "time exceeded" 메시지를 원래 호스트로 반환한다. TTL을 1부터 시작하여 점차 증가시키면서 각 홉의 게이트웨이를 식별한다. 각 TTL 값에 대해 3개의 패킷을 전송하여 왕복 시간을 측정한다.

출력 해석:
- **별표(*)**: 응답 없음. 혼잡, TTL 만료 메시지 무시, 방화벽 차단 등이 원인
- **!N**: 네트워크 도달 불가 (라우팅 문제)
- **!H**: 호스트 도달 불가
- **!P**: 프로토콜 도달 불가
- **비대칭 라우팅**: 역방향 traceroute에서 다른 경로가 나타날 수 있음

실무 고려사항:
- traceroute는 root 권한이 필요 (setuid root 또는 sudo로 실행)
- DNS 장애 시 -n 옵션으로 숫자 출력 사용
- UDP 포트 33434-33534를 사용하므로 방화벽에서 허용 필요
- mtr은 traceroute의 현대적 대안으로 실시간 top-like 인터페이스 제공
- 외부에서 자신의 사이트를 보려면 traceroute.org의 웹 기반 서비스 활용

## 예시

```bash
# 기본 traceroute
traceroute google.com

# 숫자 출력 (DNS 조회 비활성화)
traceroute -n 8.8.8.8

# 출력 예시:
# traceroute to nubark (192.168.1.5), 30 hops max
#  1  lab-gw (192.168.1.1)     0.548 ms  0.451 ms  0.366 ms
#  2  cs-gw (128.138.0.1)      1.201 ms  1.124 ms  1.098 ms
#  3  nubark (192.168.1.5)     1.653 ms  1.587 ms  1.542 ms

# mtr - 실시간 traceroute 대안
mtr google.com

# Windows에서의 동등한 명령
# tracert google.com

# 방화벽 설정: traceroute에 필요한 포트 허용
sudo iptables -A OUTPUT -p udp --dport 33434:33534 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type time-exceeded -j ACCEPT
```

## 관련 개념

- [ping (핑)](/knowledge/linux/ping/) - traceroute 전 사용하는 기본 진단 도구
- [ICMP (인터넷 제어 메시지 프로토콜)](/knowledge/linux/icmp/) - traceroute가 사용하는 TTL/Time Exceeded 메커니즘
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - traceroute로 확인하는 경로 정보
- [DNS 이름 해석 (DNS Resolution)](/knowledge/linux/dns-resolution/) - traceroute의 호스트명 해석
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - traceroute 트래픽 방화벽 설정
