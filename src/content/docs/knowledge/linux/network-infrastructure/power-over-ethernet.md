---
title: "Power over Ethernet (PoE)"
description: "PoE(Power over Ethernet, IEEE 802"
tags: ['Poe', 'Ethernet', '802.3af', 'Power', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/power-over-ethernet
sidebar:
  order: 9
---

## 핵심 개념

PoE는 별도의 전원 케이블 없이 네트워크 케이블 하나로 데이터와 전력을 동시에 공급한다. 전력 공급 용량은 4개 클래스로 분류되며 3.84W에서 25.5W까지 지원한다. 802.3bt 표준은 100W 이상을 제공하는 고전력 PoE를 정의한다.

**시스템 관리자를 위한 주요 고려사항:**

1. **PoE 포트 계획**: 인프라에서 PoE 장비를 식별하고 PoE 지원 스위치 포트를 적절히 배치해야 한다. PoE 포트는 일반 포트보다 비용이 높다.

2. **전력 예산 관리**: PoE 스위치가 설치된 통신 클로짓의 전력 예산에 PoE 장비의 소비 전력을 포함해야 한다. 단, PoE 전력으로 발생하는 열 대부분은 클로짓 밖(사무실 등)에서 소산되므로 냉각 예산은 동일하게 증가시킬 필요 없다.

Raspberry Pi에 PoE HAT 보드를 추가하면 PoE 포트에서 소형 Linux 시스템을 부팅하고 운영할 수 있다.

## 예시

```bash
# PoE 전력 클래스
# Class 0: 기본 (15.4W PSE / 12.95W PD)
# Class 1: 저전력 (4.0W)
# Class 2: 중전력 (7.0W)
# Class 3: 고전력 (15.4W)
# 802.3at (PoE+): 최대 25.5W
# 802.3bt (PoE++): 최대 100W+

# PoE 일반 사용 장비:
# - VoIP 전화기 (약 6-10W)
# - 무선 접속점 WAP (약 12-15W)
# - IP 카메라 (약 10-15W)
# - IoT 센서 (약 3-5W)

# Linux에서 PoE 상태 확인 (스위치에 따라 다름)
# SNMP를 통한 PoE 상태 모니터링
snmpwalk -v2c -c public switch_ip POWER-ETHERNET-MIB
```

## 관련 개념

- [ethernet](/knowledge/linux/ethernet/) - PoE가 기반으로 하는 네트워크 기술
- [utp-cabling](/knowledge/linux/utp-cabling/) - PoE 전력을 전달하는 물리적 매체
- [network-switch](/knowledge/linux/network-switch/) - PoE를 공급하는 스위치 장비
- [wireless-networking](/knowledge/linux/wireless-networking/) - PoE로 전력을 공급받는 주요 장비
