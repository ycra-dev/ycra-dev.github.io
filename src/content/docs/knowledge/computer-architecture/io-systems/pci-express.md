---
title: "PCI-Express"
description: "PCI-Express(PCIe)는 점대점(point-to-point) 링크를 사용하는 표준 시스템 I/O 상호 연결 기술로, 구성 가능한 수의 레인과 대역폭을 가진다"
tags: ['Pci Express', 'Pcie', 'Interconnect', 'System Bus', 'I/O']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pci-express
sidebar:
  order: 4
---

## 핵심 개념

PCIe는 이전의 PCI 버스와 AGP를 대체하는 고속 I/O 인터커넥트이다. GPU를 CPU에 연결하는 주요 인터페이스로 사용된다.

PCIe의 주요 특징:
- **점대점 링크**: 공유 버스가 아닌 전용 링크로 각 장치 연결
- **레인(lane) 구성**: x1, x4, x8, x16 등 다양한 레인 수 지원
- **양방향 통신**: 각 방향으로 독립적인 데이터 전송

GPU 시스템에서 PCIe 2.0 x16 링크는 각 방향으로 8 GB/s, 총 16 GB/s의 최대 전송률을 제공한다. GPU와 CPU는 PCIe를 통해 상대방의 메모리에 접근할 수 있지만, 직접 연결된 메모리에 비해 대역폭이 제한된다.

AGP(Accelerated Graphics Port)는 PCIe 이전에 그래픽 서브시스템을 PC에 연결하는 데 사용된 확장 PCI 버스로, 원래 PCI 버스의 최대 8배 대역폭을 제공했다.

## 예시

```
PCIe 대역폭 비교:
PCIe 2.0 x16: 8 GB/s (단방향), 16 GB/s (양방향)
PCIe 3.0 x16: 16 GB/s (단방향), 32 GB/s (양방향)

GPU 메모리 대역폭 vs PCIe 대역폭:
GeForce 8800 GPU 메모리: ~86 GB/s
PCIe 2.0 x16:           ~8 GB/s (단방향)
→ GPU 내부 메모리 대역폭이 PCIe보다 ~10배 높음
→ 데이터 전송 오버헤드를 최소화하는 것이 중요
```

## 관련 개념

- [Heterogeneous System](/knowledge/computer-architecture/heterogeneous-system/)
- [Graphics Processing Unit (GPU)](/knowledge/computer-architecture/graphics-processing-unit-gpu/)
- [Unified Memory Architecture](/knowledge/computer-architecture/unified-memory-architecture/)
