---
title: "Software Prefetching"
description: "소프트웨어 프리페칭(Software Prefetching)은 프로그래머 또는 컴파일러가 명시적인 프리페치 명령어를 삽입하여 데이터가 실제로 필요하기 전에 미리 캐시로 가져오는 메모리 최적화 기법이다"
tags: ['Memory Optimization', 'Cache', 'Memory Hierarchy', 'Roofline Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/software-prefetching
sidebar:
  order: 24
---

## 핵심 개념

최고 성능을 달성하려면 많은 메모리 접근 연산을 동시에 처리(in-flight) 상태로 유지해야 한다. 소프트웨어 프리페치 명령어를 사용하면 예측 가능한 접근 패턴에 대해 데이터를 사전에 요청하여, 실제 연산이 해당 데이터를 필요로 할 때 이미 캐시에 존재하도록 할 수 있다. 루프라인 모델에서 소프트웨어 프리페칭은 메모리 대역폭 최적화의 핵심 기법 중 하나로, 이 기법이 없으면 실질적인 메모리 대역폭이 크게 감소할 수 있다. Opteron X2 사례에서 소프트웨어 프리페칭이 없으면 메모리 대역폭 천장이 16 GB/s에서 11 GB/s로 떨어졌다.

## 예시

```c
// 프리페칭 없는 코드
for (int i = 0; i < N; i++) {
    sum += A[i] * B[i];
}

// 소프트웨어 프리페칭 적용
for (int i = 0; i < N; i++) {
    __builtin_prefetch(&A[i + 16], 0, 0);  // 16개 앞의 데이터를 미리 로드
    __builtin_prefetch(&B[i + 16], 0, 0);
    sum += A[i] * B[i];
}
```

## 관련 개념

- [Roofline Model](/knowledge/computer-architecture/roofline-model/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Cache Blocking](/knowledge/computer-architecture/cache-blocking/)
- [Memory Affinity](/knowledge/computer-architecture/memory-affinity/)
