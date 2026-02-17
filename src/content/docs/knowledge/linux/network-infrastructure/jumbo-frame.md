---
title: "Jumbo Frame"
description: "점보 프레임(Jumbo Frame)은 표준 이더넷 MTU인 1,500바이트를 초과하는 비표준 대형 이더넷 패킷으로, 일반적으로 9,000바이트(프레이밍 포함 9,018바이트)의 MTU를 사용하여 기가비트 이더넷에서 처리량을 개선한다"
tags: ['Jumbo Frame', 'Mtu', 'Ethernet', 'Network Performance', 'Throughput']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/jumbo-frame
sidebar:
  order: 10
---

## 핵심 개념

표준 이더넷의 1,500바이트 패킷 크기는 네트워크가 느리고 버퍼 메모리가 부족하던 시절에 결정되었다. 기가비트 이더넷에서는 이 크기가 작아 매 패킷마다 오버헤드와 레이턴시가 발생하여 처리량에 영향을 미친다.

**성능 이점**: TCP 기반 대용량 전송(NFSv4, SMB 파일 서비스 등)에서 약 10%의 측정 가능한 처리량 향상을 기대할 수 있다.

**사용 시 주의사항:**
1. 서브넷 내의 모든 네트워크 장비(스위치, 라우터 포함)가 점보 프레임을 지원하고 사용해야 한다. 혼합 사용은 불가
2. 비표준이므로 명시적으로 활성화해야 하며, 장비가 수신은 할 수 있어도 자동으로 생성하지는 않음
3. 최대 크기에 대한 보편적 합의가 없음. 가장 일반적인 값은 9,000바이트. 9K 이상의 "슈퍼 점보 프레임"도 64K까지 유용
4. 기본 MTU로 먼저 배포하고 안정성 확인 후 점보 프레임으로 전환하는 것이 합리적

## 예시

```bash
# 점보 프레임 활성화 (Linux)
sudo ip link set eth0 mtu 9000

# 현재 MTU 확인
ip link show eth0

# 점보 프레임 테스트 (큰 패킷으로 ping)
ping -s 8972 -M do target-host
# 8972 + 28(IP+ICMP 헤더) = 9000

# 영구 설정 (Ubuntu /etc/netplan/)
# network:
#   ethernets:
#     eth0:
#       mtu: 9000

# 영구 설정 (CentOS /etc/sysconfig/network-scripts/ifcfg-eth0)
# MTU=9000
```

## 관련 개념

- [mtu](/knowledge/linux/mtu/) - 점보 프레임이 변경하는 최대 전송 단위
- [ethernet](/knowledge/linux/ethernet/) - 점보 프레임의 기반 기술
- [nfs](/knowledge/linux/nfs/) - 점보 프레임으로 성능이 향상되는 서비스
- [network-switch](/knowledge/linux/network-switch/) - 점보 프레임을 지원해야 하는 장비
