---
title: "HBM (고대역폭 메모리)"
description: "HBM(High Bandwidth Memory)은 인터포저 기판을 통해 프로세서 칩과 DRAM 칩 스택을 연결하는 고대역폭 메모리 기술로, 기존 DRAM 대비 25배 이상의 메모리 대역폭을 제공한다"
tags: ['Dram', 'Memory Bandwidth', 'Tpuv3', 'Interposer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/high-bandwidth-memory
sidebar:
  order: 16
---

## 핵심 개념

TPUv1은 대부분의 애플리케이션에서 메모리 병목 현상이 발생했다. Google은 TPUv3에서 HBM DRAM을 채택하여 이 병목을 해결했다. HBM은 인터포저 기판을 사용하여 TPUv3 칩을 64개의 64비트 버스를 통해 4개의 짧은 DRAM 칩 스택과 연결한다. 기존 CPU 서버는 더 많은 DRAM 칩을 지원하지만 최대 8개의 64비트 버스만 사용하므로 대역폭이 훨씬 낮다. HBM은 3D 스택 구조를 통해 짧은 배선 거리와 높은 병렬성을 달성하여 대역폭을 극대화한다. TPUv3와 Volta GPU 모두 900 GB/s의 동일한 메모리 대역폭을 제공한다.

## 예시

```
메모리 대역폭 비교:
- TPUv1: 기존 DRAM → 메모리 병목 발생
- TPUv3 HBM: 64 x 64비트 버스 → ~900 GB/s
  - 4개의 DRAM 칩 스택
  - 인터포저 기판으로 연결
- 기존 CPU 서버: 최대 8 x 64비트 버스 → 대역폭 1/25

HBM 구조:
[프로세서 칩] ←인터포저→ [DRAM 스택1] [DRAM 스택2] [DRAM 스택3] [DRAM 스택4]
              64 x 64-bit buses
```

## 관련 개념

- [TPUv3 슈퍼컴퓨터 (TPUv3 Supercomputer)](/knowledge/computer-architecture/tpuv3-supercomputer/)
- [DRAM (동적 랜덤 액세스 메모리)](/knowledge/computer-architecture/dram/)
- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
