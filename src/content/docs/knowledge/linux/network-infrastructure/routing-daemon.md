---
title: "라우팅 데몬 (Routing Daemon)"
description: "라우팅 데몬(Routing Daemon)은 라우팅 프로토콜을 구현하여 라우팅 테이블을 자동으로 관리하는 소프트웨어로, 설정 파일, 기존 라우팅 테이블, 다른 시스템의 라우팅 데몬으로부터 정보를 수집하여 최적 경로를 계산한다"
tags: ['Routing Daemon', 'Quagga', 'Routed', 'Zebra', 'Dynamic Routing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/routing-daemon
sidebar:
  order: 18
---

## 핵심 개념

UNIX/Linux 시스템은 프로덕션 네트워크의 라우터로 사용하지 않는 것이 권장된다. 전용 라우터가 더 단순하고, 신뢰할 수 있으며, 안전하고, 빠르다. 그러나 테스트 서브넷이나 보조 네트워크에는 적합할 수 있다.

**주요 라우팅 데몬:**

1. **routed**: 오래된 표준 라우팅 데몬. RIP만 지원하며, RIPv2 지원도 불완전. -q(quiet) 모드로 수동 수신만 가능. 4분 이내에 재수신되지 않은 경로는 제거되지만 정적 경로는 유지

2. **Quagga**: Zebra GNU 프로젝트의 개발 포크. RIP(모든 버전), OSPFv2/v3, BGP를 구현. 핵심 zebra 데몬이 커널 라우팅 테이블과 개별 프로토콜 데몬(ripd, ospfd, bgpd 등) 간의 중앙 교환소 역할. vtysh CLI를 통해 Cisco IOS와 유사한 명령어 인터페이스 제공

3. **XORP(eXtensible Open Router Platform)**: 라우팅뿐 아니라 패킷 필터링, 트래픽 관리 등 전용 라우터의 모든 기능을 에뮬레이션. 라이브 CD로도 제공되어 일반 PC를 라우팅 어플라이언스로 전환 가능

**EIGRP는 Cisco 독점 프로토콜로, 널리 사용 가능한 UNIX/Linux 구현이 없다.**

## 예시

```bash
# routed를 수동 모드로 실행
sudo routed -q

# Quagga 설치 (Ubuntu)
sudo apt install quagga

# Quagga 데몬 구조
# /etc/quagga/zebra.conf    - 핵심 데몬 설정
# /etc/quagga/ripd.conf     - RIP 데몬 설정
# /etc/quagga/ospfd.conf    - OSPF 데몬 설정
# /etc/quagga/bgpd.conf     - BGP 데몬 설정

# Quagga vtysh 접속
sudo vtysh
# enable              # 특권 모드
# config term         # 설정 모드
# write               # 설정 저장

# Quagga 데몬 제어
sudo systemctl start zebra
sudo systemctl start ospfd
```

## 관련 개념

- [라우팅 프로토콜 (Routing Protocol)](/knowledge/linux/routing-protocol/) - 데몬이 구현하는 프로토콜들
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - 데몬이 관리하는 경로 정보
- [RIP (라우팅 정보 프로토콜)](/knowledge/linux/rip/) - routed/Quagga가 구현하는 프로토콜
- [OSPF (최단 경로 우선 프로토콜)](/knowledge/linux/ospf/) - Quagga가 구현하는 프로토콜
- [BGP (경계 게이트웨이 프로토콜)](/knowledge/linux/bgp/) - Quagga가 구현하는 프로토콜
- [네트워크 라우터 (Network Router)](/knowledge/linux/network-router/) - 데몬의 대안인 전용 라우팅 장비
