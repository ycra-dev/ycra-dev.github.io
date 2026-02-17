---
title: "False Sharing"
description: "거짓 공유(false sharing)는 서로 관련 없는 두 공유 변수가 같은 캐시 블록에 위치하여, 프로세서들이 서로 다른 변수에 접근하더라도 전체 블록이 프로세서 간에 교환되는 현상이다"
tags: ['Cache Coherence', 'Multiprocessor', 'Cache Block', 'Performance', 'Snooping Protocol']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/false-sharing
sidebar:
  order: 17
---

## 핵심 개념

캐시 일관성 프로토콜은 캐시 블록 단위로 동작한다. 예를 들어 8워드 블록 크기의 캐시에서 두 프로세서가 같은 블록 내의 서로 다른 워드를 번갈아 쓰고 읽으면, 대부분의 프로토콜은 전체 블록을 프로세서 간에 교환하게 되어 일관성 대역폭 요구를 불필요하게 증가시킨다.

프로그래머와 컴파일러는 데이터를 신중하게 배치하여 거짓 공유를 피해야 한다. 일반적인 해결 방법은 독립적으로 접근되는 변수들이 서로 다른 캐시 라인에 위치하도록 패딩(padding)을 추가하는 것이다.

블록 크기가 클수록 거짓 공유 가능성이 높아지므로, 멀티프로세서 시스템에서의 캐시 블록 크기 결정은 성능에 중요한 영향을 미친다.

## 예시

```c
// 거짓 공유 문제 예시
struct {
    int counter_A;  // CPU 0이 자주 접근
    int counter_B;  // CPU 1이 자주 접근
} shared_data;
// counter_A와 counter_B가 같은 캐시 라인에 위치
// -> CPU 0이 counter_A를 쓸 때마다 CPU 1의 캐시 라인 무효화
// -> CPU 1이 counter_B를 쓸 때마다 CPU 0의 캐시 라인 무효화

// 해결: 패딩으로 서로 다른 캐시 라인에 배치
struct {
    int counter_A;
    char padding[60];  // 64바이트 캐시 라인 기준
    int counter_B;
} shared_data;
```

## 관련 개념

- [Cache Coherence](/knowledge/computer-architecture/cache-coherence/)
- [Snooping Protocol](/knowledge/computer-architecture/snooping-protocol/)
- [Three Cs Model](/knowledge/computer-architecture/three-cs-model/)
- [Shared Memory Multiprocessor](/knowledge/computer-architecture/shared-memory-multiprocessor/)
