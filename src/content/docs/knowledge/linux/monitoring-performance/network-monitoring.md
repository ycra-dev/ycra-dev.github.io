---
title: "네트워크 모니터링 (Network Monitoring)"
description: "네트워크 모니터링은 ICMP 핑, SNMP, 대역폭 측정 등을 통해 네트워크 장치와 경로의 가용성, 성능, 오류율을 지속적으로 감시하는 활동이다"
tags: ['Monitoring', 'Network', 'Ping', 'Icmp', 'Throughput', 'Availability']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/network-monitoring
sidebar:
  order: 8
---

## 핵심 개념

네트워크 모니터링은 많은 사이트에서 모니터링 세계로의 첫 진입점이 된다.

**ICMP Echo Request (핑):**
- 네트워크 모니터링의 기본 단위
- 응답을 받으면 중간의 모든 게이트웨이와 장치가 동작 중이며, 대상 호스트의 커널이 실행 중임을 확인
- 그러나 상위 수준 소프트웨어의 상태는 보장하지 않음
- 10초마다 핑을 보내는 것이 적절 (오버헤드 적음)

**핑 전략 설계 원칙:**
- 모든 중요 게이트웨이와 네트워크를 커버하도록 설계
- 게이트웨이가 핑에 반드시 응답할 의무가 없으므로 단일 패킷 손실로 경보를 발하지 않아야 함
- 바이너리 이벤트(성공/실패)로 수집하고 장기간의 패킷 손실률로 집계

**SNMP 기반 모니터링:**
대부분의 네트워크 장치가 SNMP를 지원하지만, 기본 네트워크 모니터링 이외의 목적에는 구식으로 간주됨

**처리량 측정:**
네트워크 두 지점 간 처리량은 iPerf로 측정 가능

## 예시

```bash
# 기본 핑 테스트
ping -c 5 gateway.example.com

# 네트워크 경로 추적
traceroute gateway.example.com

# 네트워크 처리량 측정 (iPerf)
# 서버 측
iperf3 -s
# 클라이언트 측
iperf3 -c server.example.com

# 간단한 핑 모니터링 스크립트
#!/bin/bash
HOST="gateway.example.com"
if ! ping -c 1 -W 2 $HOST > /dev/null 2>&1; then
    echo "ALERT: $HOST is unreachable" | \
      mail -s "Network Alert" admin@example.com
fi

# 네트워크 인터페이스 통계 확인
ss -s           # 연결 요약
ip -s link      # 인터페이스 통계
```

## 관련 개념

- [SNMP (네트워크 관리 프로토콜)](/knowledge/linux/snmp/) - 네트워크 장치 모니터링 프로토콜
- [Nagios (나기오스)](/knowledge/linux/nagios/) - 네트워크 상태 모니터링 플랫폼
- [Grafana (그라파나)](/knowledge/linux/grafana/) - 네트워크 메트릭 시각화
- [DDoS 공격 (DDoS Attack)](/knowledge/linux/ddos-attack/) - 네트워크 모니터링으로 탐지하는 공격
