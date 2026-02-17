---
title: "Memory Affinity"
description: "메모리 친화성(Memory Affinity)은 데이터와 해당 데이터를 처리하는 스레드를 동일한 메모리-프로세서 쌍에 할당하여 원격 메모리 접근을 최소화하는 최적화 기법이다"
tags: ['Numa', 'Memory Optimization', 'Multiprocessor', 'Roofline Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/memory-affinity
sidebar:
  order: 30
---

## 핵심 개념

현대 마이크로프로세서는 칩 내에 메모리 컨트롤러를 통합하여 로컬 DRAM에 대한 성능을 향상시킨다. 다중 칩 시스템에서는 일부 주소가 한 칩의 로컬 DRAM에 있고, 나머지는 다른 칩의 DRAM에 위치하여 칩 간 인터커넥트를 통해 접근해야 한다. 이러한 불균일 메모리 접근(NUMA) 구조에서 원격 메모리 접근은 성능을 저하시킨다. 메모리 친화성 최적화는 프로세서가 다른 칩의 메모리에 접근하는 빈도를 줄여 메모리 대역폭을 향상시킨다. 루프라인 모델에서 메모리 친화성은 메모리 대역폭 최적화 중 가장 큰 효과를 가져올 수 있는 기법 중 하나이다.

## 예시

```
NUMA 시스템에서의 메모리 친화성:

최적화 전:
  스레드 0 (CPU 0) → 데이터 A (CPU 1의 로컬 메모리) → 원격 접근 발생

최적화 후:
  스레드 0 (CPU 0) → 데이터 A (CPU 0의 로컬 메모리) → 로컬 접근

Opteron X2 예시:
  메모리 친화성 없이: 메모리 대역폭 천장 4.8 GB/s
  메모리 친화성 적용: 메모리 대역폭 천장 11 GB/s
```

## 관련 개념

- [NUMA](/knowledge/computer-architecture/numa/)
- [Roofline Model](/knowledge/computer-architecture/roofline-model/)
- [Software Prefetching](/knowledge/computer-architecture/software-prefetching/)
- [Multiprocessor](/knowledge/computer-architecture/multiprocessor/)
