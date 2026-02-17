---
title: "tcpdump"
description: "tcpdump는 Van Jacobson이 개발한 업계 표준 명령줄 패킷 스니퍼로, libpcap 라이브러리를 기반으로 네트워크 인터페이스의 트래픽을 캡처하고 사용자가 지정한 필터 기준에 맞는 패킷을 분석하여 표시한다"
tags: ['Tcpdump', 'Packet Sniffing', 'Networking', 'Diagnostics', 'Libpcap']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/tcpdump
sidebar:
  order: 23
---

## 핵심 개념

tcpdump는 네트워크 문제 해결과 보안 분석에 필수적인 도구이다. 원시 네트워크 장치에서 데이터를 읽으므로 root 권한이 필요하며, 네트워크 인터페이스를 프로미스큐어스 모드(promiscuous mode)로 설정하여 모든 패킷을 수신한다.

주요 옵션:
- **-i**: 캡처할 네트워크 인터페이스 지정
- **-n**: DNS 역조회 비활성화 (느린 DNS가 패킷 손실 유발 방지)
- **-v/-vv**: 상세 정보 증가
- **-w**: 패킷을 파일로 저장 (libpcap 형식)
- **-r**: 저장된 파일에서 패킷 읽기
- **-s 1560**: 전체 패킷 캡처 (기본은 헤더만)

tcpdump는 DNS, HTTP, SSH 등 표준 네트워크 서비스의 패킷 형식을 이해하여 사람이 읽을 수 있는 형태로 표시한다. 복잡한 필터 표현식으로 캡처 대상을 정밀하게 제한할 수 있다.

주의: 프로토콜이 평문으로 정보를 전송하면 패킷 스니퍼로 비밀번호 등을 볼 수 있으므로, 사용자 프라이버시에 유의해야 한다. 또한 시스템의 인터페이스가 알 수 없게 프로미스큐어스 모드로 설정되어 있지 않은지 확인해야 한다.

## 예시

```bash
# 특정 호스트와 관련된 패킷만 캡처
sudo tcpdump host 192.168.1.100

# DNS 조회 비활성화, 상세 모드
sudo tcpdump -n -v host bull

# 특정 서브넷에서 오는 웹 트래픽만 캡처
sudo tcpdump src net 192.168.1.0/24 and dst port 80

# 전체 패킷을 파일로 저장
sudo tcpdump -s 1560 -w capture.pcap

# 저장된 파일에서 패킷 읽기
tcpdump -r capture.pcap

# 특정 인터페이스에서 캡처
sudo tcpdump -i eth0

# 출력 예시:
# 12:05:01.123 bull.41537 > nubark.domain: A? atrust.com
# 12:05:01.130 nubark.domain > bull.41537: A atrust.com 66.77.122.161

# 고급 필터: TCP SYN 패킷만 캡처
sudo tcpdump 'tcp[tcpflags] & (tcp-syn) != 0'
```

## 관련 개념

- [packet-sniffing](/knowledge/linux/packet-sniffing/) - tcpdump가 속하는 도구 분류
- [network-interface](/knowledge/linux/network-interface/) - tcpdump가 캡처하는 인터페이스
- [dns-resolution](/knowledge/linux/dns-resolution/) - tcpdump 출력에서 보이는 DNS 조회
- [tcp-port](/knowledge/linux/tcp-port/) - tcpdump 필터에 사용되는 포트 번호
- [iptables](/knowledge/linux/iptables/) - tcpdump로 방화벽 규칙 디버깅
