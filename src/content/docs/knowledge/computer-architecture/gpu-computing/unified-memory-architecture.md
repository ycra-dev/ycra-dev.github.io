---
title: "UMA (균일 메모리 접근 아키텍처)"
description: "UMA(Unified Memory Architecture)는 CPU와 GPU가 공통 시스템 메모리를 공유하는 시스템 아키텍처이다"
tags: ['Uma', 'Memory Architecture', 'GPU', 'Shared Memory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/unified-memory-architecture
sidebar:
  order: 17
---

## 핵심 개념

UMA 시스템은 별도의 GPU 전용 메모리를 생략하고, CPU의 시스템 메모리만을 사용하여 비용을 절감한다. 이 구성은 저비용 시스템에서 일반적이다.

UMA의 장단점:
- **장점**: 별도의 GPU 메모리가 불필요하여 시스템 비용 감소, 메모리 관리 단순화
- **단점**: 시스템 메모리의 가용 대역폭에 제한되어 GPU 성능이 낮음, 전용 GPU 메모리에 비해 높은 지연 시간

전용 GPU 메모리를 가진 discrete GPU 시스템과 비교하면, UMA 시스템은 그래픽 성능이 상당히 낮다. 전용 GPU 메모리(GDDR)는 높은 대역폭과 낮은 지연 시간을 제공하도록 설계되었기 때문이다.

## 예시

```
시스템 구성 비교:

Discrete GPU 시스템:
  CPU ←→ 시스템 메모리 (DDR4, ~50 GB/s)
  GPU ←→ GPU 메모리 (GDDR6, ~500 GB/s)
  CPU ←PCIe→ GPU

UMA 시스템:
  CPU ←→ 시스템 메모리 (DDR4, ~50 GB/s)
  GPU ←→ 시스템 메모리 (DDR4, 대역폭 공유)
  → GPU가 사용할 수 있는 메모리 대역폭이 제한됨
```

## 관련 개념

- [이기종 시스템 (Heterogeneous System)](/knowledge/computer-architecture/heterogeneous-system/)
- [PCI-Express (PCIe)](/knowledge/computer-architecture/pci-express/)
