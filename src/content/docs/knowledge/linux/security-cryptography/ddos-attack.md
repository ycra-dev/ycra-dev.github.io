---
title: "DDoS 공격 (DDoS Attack)"
description: "DDoS(Distributed Denial-of-Service) 공격은 다수의 침해된 장치(봇넷)를 이용하여 대상 서비스에 대량의 네트워크 트래픽을 보내 서비스를 중단시키거나 성능을 저하시키는 공격이다"
tags: ['Security', 'Network Attack', 'Botnet', 'Availability', 'Denial Of Service']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ddos-attack
sidebar:
  order: 4
---

## 핵심 개념

DDoS 공격은 CIA 트라이어드 중 가용성(Availability)을 직접적으로 위협한다. 공격자는 피해자 네트워크 외부의 보호되지 않은 장치에 악성 코드를 심어 원격으로 조종하는 봇넷(botnet)을 형성한다.

주요 특성:
- **공격 동기**: 금전적 이유(랜섬), 정치적 이유, 또는 보복성
- **봇넷 구성**: IP 카메라, 프린터, 베이비 모니터 등 보안이 취약한 IoT 장치들이 주로 활용됨
- **규모**: 2016년 Mirai 봇넷은 수만 개의 소스 IP에서 620 Gb/s 트래픽으로 공격

DDoS 방어 대책:
- 네트워크 관리 계층에서의 탐지 및 차단 소프트웨어/하드웨어 배치
- 퍼블릭 클라우드 프로바이더의 DDoS 방어 기능 활용
- 코로케이션 시설의 DDoS 완화 기술 활용
- 완벽한 방어는 불가능하며 위협은 지속적으로 변화함

## 예시

```bash
# DDoS 의심 징후 확인 - 비정상적 연결 수 모니터링
netstat -an | grep ESTABLISHED | wc -l

# 특정 IP에서의 과도한 연결 확인
netstat -an | grep ESTABLISHED | awk '{print $5}' | \
  cut -d: -f1 | sort | uniq -c | sort -rn | head -20

# iptables로 특정 IP 차단 (긴급 대응)
sudo iptables -A INPUT -s 192.168.1.100 -j DROP

# 초당 연결 수 제한 (rate limiting)
sudo iptables -A INPUT -p tcp --dport 80 \
  -m connlimit --connlimit-above 50 -j REJECT
```

## 관련 개념

- [방화벽 (Firewall)](/knowledge/linux/firewall/) - 네트워크 수준의 DDoS 방어
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - Linux 패킷 필터링 도구
- [CIA 삼원칙 (CIA Triad)](/knowledge/linux/cia-triad/) - 가용성 위협으로서의 DDoS
- [네트워크 모니터링 (Network Monitoring)](/knowledge/linux/network-monitoring/) - 비정상 트래픽 탐지
