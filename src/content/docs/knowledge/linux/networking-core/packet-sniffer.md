---
title: "패킷 스니퍼 (Packet Sniffer)"
description: "패킷 스니퍼(Packet Sniffer)는 네트워크 링크 계층에서 전송되는 바이트를 캡처하고 네트워크 패킷을 분해하여 프로토콜 오류, 잘못된 설정, 그리고 일반적인 네트워크 문제를 진단하는 분석 도구이다"
tags: ['Packet Sniffer', 'Wireshark', 'Network Debugging', 'Protocol Analysis', 'Tcpdump']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/packet-sniffer
sidebar:
  order: 25
---

## 핵심 개념

네트워크 디버깅 도구는 크게 두 가지 유형으로 구분된다:

1. **케이블 분석기(Cable Analyzer)**: 케이블의 전기적 특성(길이, 결함, 잘못된 배선)을 측정하는 핸드헬드 장치. TDR(Time Domain Reflectometry) 기술을 사용한다. Fluke LanMeter가 대표적인 제품이다.

2. **패킷 스니퍼**: 링크 계층에서 동작하여 네트워크 패킷을 캡처하고 분석한다. 케이블 문제나 전기적 이슈는 진단할 수 없다. Wireshark가 가장 널리 사용되는 오픈소스 스니퍼이다.

**네트워크 디버깅 핵심 원칙**: 네트워크를 구성 요소로 분해하고 각 부분을 개별적으로 테스트하여 문제 장비나 케이블을 격리한다. 스위치와 허브의 상태 표시등(링크 상태, 패킷 트래픽)이 문제의 즉각적 단서를 제공한다.

Wireshark는 보안 공격의 대상이 되므로 항상 최신 버전을 유지해야 한다.

## 예시

```bash
# tcpdump로 패킷 캡처 (명령줄 스니퍼)
sudo tcpdump -i eth0 -n
sudo tcpdump -i eth0 port 53          # DNS 트래픽만
sudo tcpdump -i eth0 host 192.168.1.1 # 특정 호스트만
sudo tcpdump -i eth0 -w capture.pcap  # 파일로 저장

# Wireshark로 캡처 파일 분석 (GUI)
wireshark capture.pcap

# tshark (Wireshark CLI 버전)
tshark -i eth0 -f "port 80"
tshark -r capture.pcap -T fields -e ip.src -e ip.dst

# 네트워크 인터페이스를 프로미스큐어스 모드로 설정
sudo ip link set eth0 promisc on
```

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 스니퍼가 캡처하는 네트워크 프로토콜
- [네트워크 스위치 (Network Switch)](/knowledge/linux/network-switch/) - 디버깅 대상 네트워크 장비
- [TCP/IP 프로토콜 스위트 (TCP/IP Protocol Suite)](/knowledge/linux/tcp-ip/) - 스니퍼로 분석하는 프로토콜 스택
- [방화벽 (Firewall)](/knowledge/linux/firewall/) - 스니퍼와 함께 사용하는 보안 도구
