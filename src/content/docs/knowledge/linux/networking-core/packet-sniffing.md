---
title: "패킷 스니핑 (Packet Sniffing)"
description: "패킷 스니핑(Packet Sniffing)은 네트워크 트래픽을 수신하여 패킷의 내용을 검사하고 분석하는 기술로, 네트워크 문제 해결, 프로토콜 분석, 보안 감사에 사용된다"
tags: ['Packet Sniffing', 'Networking', 'Security', 'Wireshark', 'Tcpdump']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/packet-sniffing
sidebar:
  order: 24
---

## 핵심 개념

패킷 스니퍼는 네트워크 인터페이스를 프로미스큐어스 모드(promiscuous mode)로 설정하여 로컬 호스트가 아닌 다른 호스트를 대상으로 한 패킷도 커널에 전달받아 분석한다. root 권한이 필요하다.

주요 도구:
- **tcpdump**: 명령줄 기반 업계 표준. libpcap 라이브러리 사용. 파일 형식이 사실상 표준
- **Wireshark**: GUI 기반의 강력한 분석 도구. 다양한 프로토콜 디세터(dissector) 내장. TCP 대화 재조립 기능
- **TShark**: Wireshark의 명령줄 버전

네트워크 스위치는 "불필요한" 패킷의 전파를 제한하도록 설계되어 있어 스니퍼의 효과를 줄일 수 있다. 그러나 브로드캐스트/멀티캐스트 패킷이나 로컬 호스트 관련 트래픽은 여전히 분석 가능하다.

Wireshark의 특징:
- **캡처 필터**: libpcap 기반, tcpdump와 동일한 문법
- **디스플레이 필터**: 별도의 더 강력한 문법, 캡처된 것 중 표시할 것만 필터링
- 다양한 SAN 프로토콜 포함 광범위한 프로토콜 디세터
- 보안 업데이트가 자주 필요하므로 최신 버전 유지 필수

## 예시

```bash
# tcpdump 기본 사용
sudo tcpdump -i eth0 -n

# Wireshark GUI 실행
sudo wireshark

# TShark (Wireshark CLI) 사용
sudo tshark -i eth0

# 캡처 필터 (libpcap 문법)
sudo tcpdump 'host 192.168.1.1 and port 80'

# Wireshark 디스플레이 필터 (별도 문법)
# http.request.method == "GET"
# tcp.port == 443
# ip.addr == 192.168.1.1

# 프로미스큐어스 모드 확인
ip link show eth0
# PROMISC 플래그가 있으면 프로미스큐어스 모드

# TCP 대화 재조립 (Wireshark)
# 패킷 우클릭 -> Follow TCP Stream
```

## 관련 개념

- [tcpdump (패킷 캡처 도구)](/knowledge/linux/tcpdump/) - 명령줄 패킷 스니퍼
- [네트워크 인터페이스 (Network Interface)](/knowledge/linux/network-interface/) - 프로미스큐어스 모드로 설정되는 인터페이스
- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 패킷 스니핑이 가능한 브로드캐스트 네트워크
- [TCP/IP 프로토콜 스위트 (TCP/IP Protocol Suite)](/knowledge/linux/tcp-ip/) - 스니퍼가 분석하는 프로토콜 스택
