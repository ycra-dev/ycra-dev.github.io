---
title: "Network Troubleshooting"
description: "네트워크 트러블슈팅(Network Troubleshooting)은 TCP/IP 프로토콜 스택의 계층적 구조를 활용하여 네트워크 문제를 체계적으로 진단하고 해결하는 방법론으로, 물리 계층부터 응용 계층까지 또는 그 반대로 단계적으로 점검한다"
tags: ['Network Troubleshooting', 'Diagnostics', 'Networking', 'Methodology', 'Debugging']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/network-troubleshooting
sidebar:
  order: 28
---

## 핵심 개념

효과적인 네트워크 트러블슈팅의 핵심 원칙:
1. **한 번에 하나만 변경**: 각 변경의 효과를 테스트하고, 원치 않는 결과는 원복
2. **문서화**: 개입 전 상태와 모든 변경 사항을 기록
3. **계층적 접근**: TCP/IP 스택의 계층을 따라 문제 범위를 좁혀감

계층별 진단 체크리스트 (하위에서 상위로):
1. 물리적 연결과 링크 라이트 확인
2. 인터페이스 설정 확인 (ip link show)
3. ARP 테이블에 다른 호스트가 있는지 확인
4. 로컬 방화벽 확인
5. localhost(127.0.0.1) ping 가능?
6. 로컬 호스트를 IP 주소로 ping 가능?
7. DNS가 정상 동작? (getent hosts google.com)
8. 호스트명으로 ping 가능?
9. 다른 네트워크의 호스트 ping 가능?
10. 상위 서비스(HTTP, SSH) 동작 확인?

DNS 문제는 가장 흔한 원인 중 하나이다. 부팅 시 행이 걸리거나 SSH 연결이 느리면 DNS를 우선 의심한다. nsswitch.conf와 nscd도 확인 대상이다.

핵심 도구: ping(연결성), traceroute(경로), tcpdump/Wireshark(패킷 분석), SmokePing(장기 모니터링), iPerf(성능 측정), Cacti(SNMP 기반 그래프)

## 예시

```bash
# 체계적 진단 순서
# 1. 물리 계층
ip link show eth0            # 인터페이스 상태 확인
ethtool eth0                 # 링크 속도/이중 모드 확인

# 2. 링크 계층
ip neigh show                # ARP/ND 캐시 확인

# 3. 네트워크 계층
ping -c 3 127.0.0.1          # 루프백 테스트
ping -c 3 192.168.1.1        # 게이트웨이 테스트
ping -c 3 -n 8.8.8.8         # 외부 연결 테스트

# 4. DNS 계층
getent hosts google.com      # 이름 해석 테스트
dig google.com               # DNS 상세 조회

# 5. 전송/응용 계층
curl -v http://example.com   # HTTP 연결 테스트
ssh -v user@host              # SSH 상세 연결

# 경로 문제 진단
traceroute -n 8.8.8.8

# 패킷 캡처로 상세 분석
sudo tcpdump -i eth0 -n host 192.168.1.1

# 성능 측정
iperf3 -c target-server
```

## 관련 개념

- [ping](/knowledge/linux/ping/) - 기본 연결성 확인 도구
- [traceroute](/knowledge/linux/traceroute/) - 경로 추적 도구
- [tcpdump](/knowledge/linux/tcpdump/) - 패킷 분석 도구
- [packet-sniffing](/knowledge/linux/packet-sniffing/) - 네트워크 트래픽 분석
- [dns-resolution](/knowledge/linux/dns-resolution/) - 흔한 문제 원인인 DNS
- [arp](/knowledge/linux/arp/) - 링크 계층 문제 진단
