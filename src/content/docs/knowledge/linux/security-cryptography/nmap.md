---
title: "Nmap (네트워크 스캐너)"
description: "Nmap(Network Mapper)은 대상 호스트의 TCP/UDP 포트에서 리스닝 중인 서비스를 탐지하고, 운영체제 및 소프트웨어를 식별하는 네트워크 포트 스캐너이다"
tags: ['Security', 'Port Scanner', 'Network Reconnaissance', 'Vulnerability Assessment']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nmap
sidebar:
  order: 8
---

## 핵심 개념

Nmap의 주요 기능은 대상 호스트 집합에서 어떤 TCP 및 UDP 포트에 서버가 리스닝하고 있는지 확인하는 것이다. 대부분의 네트워크 서비스는 잘 알려진(well-known) 포트 번호와 연결되므로, 이 정보는 시스템에서 실행 중인 소프트웨어에 대해 많은 것을 알려준다.

**포트 상태 분류:**
- `open`: 서버가 리스닝 중
- `closed`: 서버 없음
- `filtered`: 패킷 필터에 의해 프로빙 불가
- `unfiltered`: 알 수 없는 상태 (ACK 스캔 시에만)

**주요 기능:**
- 기본 TCP 연결 스캔(`-sT`): 각 포트에 일반적인 방식으로 연결 시도
- 스텔스 스캔: 실제 연결을 시작하지 않고 포트 상태를 확인하여 방화벽 우회 또는 탐지 회피 가능
- OS 탐지(`-O`): TCP/IP 구현 특성을 분석하여 원격 운영체제 추정
- 서비스 버전 탐지(`-sV`): 열려 있는 포트에서 실행 중인 소프트웨어 식별

**주의 사항:** 다른 관리자의 네트워크에서 허가 없이 nmap을 실행하면 안 된다.

## 예시

```bash
# 기본 TCP 포트 스캔
nmap ubuntu.admin.com

# 특정 포트 범위 스캔
nmap -p 1-1024 target.example.com

# OS 탐지 및 서비스 버전 확인
nmap -O -sV target.example.com

# 스텔스(SYN) 스캔 - root 권한 필요
sudo nmap -sS target.example.com

# 출력 예시:
# PORT    STATE    SERVICE
# 22/tcp  open     ssh
# 80/tcp  open     http
# 443/tcp open     https
# 3306/tcp filtered mysql
```

## 관련 개념

- [방화벽 (Firewall)](/knowledge/linux/firewall/) - nmap으로 방화벽 규칙의 효과를 검증
- [취약점 스캐너 (Vulnerability Scanner)](/knowledge/linux/vulnerability-scanner/) - 더 심층적인 취약점 스캐닝 도구
- [침투 테스트 (Penetration Testing)](/knowledge/linux/penetration-testing/) - 보안 테스트 워크플로우의 일부
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - nmap 결과를 기반으로 방화벽 규칙 설정
