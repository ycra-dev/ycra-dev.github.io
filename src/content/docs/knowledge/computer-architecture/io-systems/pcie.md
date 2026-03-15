---
title: "PCIe (PCI Express)"
description: "PCIe(Peripheral Component Interconnect Express)는 프로세서와 고속 I/O 장치를 연결하는 고속 직렬 링크이다"
tags: ['Input Output', 'Interconnect', 'Serial Link', 'Dma', 'Peripheral']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pcie
sidebar:
  order: 5
---

## 핵심 개념

PCIe는 64개 와이어로 구성된 이전 PCI 병렬 버스의 후속 기술이다. 1~32개 레인을 사용하여 장치의 필요에 맞게 대역폭을 조절할 수 있다.

PCIe 버전별 레인 대역폭:
- PCIe 1.1: 2 Gbps/레인
- PCIe 2.0: 4 Gbps/레인
- PCIe 3.0: 8 Gbps/레인
- 대역폭 증가율: 약 2^(버전 번호) Gbps/초

NIC(네트워크 인터페이스 카드)은 일반적으로 8레인 PCIe 링크를 사용하여 양방향 각각 높은 대역폭을 제공한다. 무어의 법칙 덕분에 이전에 별도 칩이었던 PCIe 컨트롤러와 메모리 컨트롤러가 현대 프로세서(Intel Skylake 등)에 통합되었다.

PCIe 읽기는 응답을 기다려야 하므로 왕복 지연이 발생하지만, PCIe 쓰기는 신뢰성이 보장되므로 응답이 불필요하여 연속적으로 전송할 수 있다. 이 때문에 NIC에서 송신 시간이 수신 시간보다 긴 경향이 있다.

## 예시

```
# PCIe 링크 구성 예시
NIC <-- 8-lane PCIe 1.1 --> 프로세서
  대역폭: 8 x 2 Gbps = 16 Gbps (양방향 각각)

# PCIe vs PCI 비교
PCI (구형):   64개 병렬 와이어, 공유 버스
PCIe (현재):  레인당 4개 직렬 와이어, 포인트-투-포인트

# PCIe 송신 vs 수신 비대칭
송신 (TX):
  NIC이 PCIe 읽기로 디스크립터와 데이터 읽음
  -> 각 읽기마다 왕복 지연 발생 -> 느림

수신 (RX):
  NIC이 PCIe 쓰기로 데이터, 길이, 인터럽트 전송
  -> 쓰기는 응답 불필요 -> 연속 전송 가능 -> 빠름
```

## 관련 개념

- [DMA (직접 메모리 접근)](/knowledge/computer-architecture/direct-memory-access/)
- [메모리 맵 입출력 (Memory-Mapped I/O)](/knowledge/computer-architecture/memory-mapped-io/)
- [폴링 (Polling)](/knowledge/computer-architecture/polling/)
