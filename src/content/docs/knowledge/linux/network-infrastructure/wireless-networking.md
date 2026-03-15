---
title: "무선 네트워킹 (Wireless Networking)"
description: "무선 네트워킹(Wireless Networking)은 IEEE 802"
tags: ['Wireless', 'Wifi', '802.11', 'Wap', 'Ssid', 'Wpa', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/wireless-networking
sidebar:
  order: 7
---

## 핵심 개념

**무선 표준의 진화:**
- **802.11g**: 2.4 GHz 대역, 최대 54 Mb/s
- **802.11n**: 2.4/5 GHz 대역, 최대 600 Mb/s (실제 약 400 Mb/s)
- **802.11ac**: 5 GHz 대역, 최대 1 Gb/s 멀티스테이션 처리량

**SSID(Service Set Identifier)**: 무선 LAN의 이름으로, WAP가 하나 이상의 SSID를 광고하고 클라이언트가 연결할 네트워크를 선택한다. 여러 SSID를 별도의 VLAN에 매핑하여 사용자 그룹을 분리할 수 있다.

**채널 관리**: 802.11b/g/n에서 채널 1, 6, 11은 상호 겹치지 않아 최적의 조합이다. WAP는 일반적으로 자동 채널 선택을 수행하며, 수동 간섭은 최소화하는 것이 좋다.

**무선 보안:**
- **WEP**: 치명적 설계 결함이 있어 1분 이내 해킹 가능. 절대 사용 금지
- **WPA2**: 현대 무선 보안 표준. 모든 신규 설치에 반드시 사용해야 함
- WPA2 없이는 무선 네트워크를 완전히 안전하지 않은 것으로 간주해야 함

**엔터프라이즈 무선**: 대규모 환경에서는 각 WAP의 상태를 모니터링하고 채널/신호 강도/클라이언트 연결을 동적으로 조정하는 관리형 시스템이 필요하다. 투명한 로밍을 지원하여 클라이언트가 WAP 간 이동 시 VLAN과 세션이 유지된다.

단일 WAP는 약 40대의 동시 클라이언트를 서비스할 수 있으며, 더 넓은 커버리지가 필요하면 여러 WAP를 배치한다.

## 예시

```bash
# Linux에서 무선 네트워크 관리
iwlist wlan0 scan                   # 사용 가능한 WAP 스캔
iwconfig wlan0 essid "MyNetwork"    # SSID 설정
wpa_supplicant -i wlan0 -c /etc/wpa_supplicant.conf  # WPA 인증

# wpa_supplicant.conf 예시
# network={
#     ssid="CorpNetwork"
#     psk="passphrase"
#     key_mgmt=WPA-PSK
#     proto=RSN
# }

# NetworkManager CLI로 무선 연결
nmcli dev wifi list
nmcli dev wifi connect "MyNetwork" password "passphrase"
```

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 무선 이더넷의 기반 기술
- [VLAN (가상 랜)](/knowledge/linux/vlan/) - SSID와 매핑되는 논리적 네트워크
- [네트워크 스위치 (Network Switch)](/knowledge/linux/network-switch/) - WAP가 연결되는 유선 인프라
- [전원 공급 이더넷 (Power over Ethernet, PoE)](/knowledge/linux/power-over-ethernet/) - WAP에 전력을 공급하는 기술
- [방화벽 (Firewall)](/knowledge/linux/firewall/) - 무선 네트워크의 보안 필터링
