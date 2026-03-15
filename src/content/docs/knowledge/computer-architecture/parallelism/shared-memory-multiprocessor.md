---
title: "공유 메모리 멀티프로세서 (SMP)"
description: "공유 메모리 멀티프로세서(SMP)는 모든 프로세서에 걸쳐 단일 물리 주소 공간을 제공하는 멀티프로세서이다"
tags: ['Multiprocessor', 'Cache Coherence', 'Uma', 'Numa', 'Synchronization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/shared-memory-multiprocessor
sidebar:
  order: 11
---

## 핵심 개념

SMP는 두 가지 스타일로 나뉜다:

1. **UMA(Uniform Memory Access):** 어떤 프로세서가 어떤 워드를 요청하든 메모리 접근 지연 시간이 동일하다.
2. **NUMA(Nonuniform Memory Access):** 프로세서에 따라 일부 메모리 접근이 다른 것보다 훨씬 빠르다. 주 메모리가 분할되어 다른 프로세서에 연결되기 때문이다. NUMA는 더 큰 규모로 확장 가능하고 가까운 메모리에 대한 지연이 낮지만, 프로그래밍이 더 어렵다.

SMP에서는 캐시 일관성(cache coherence)을 하드웨어가 제공하여 공유 메모리에 대한 일관된 뷰를 보장한다. 동기화(synchronization)와 락(lock) 메커니즘이 필수적이며, MIPS에서는 ll/sc(load linked/store conditional) 명령어가 원자적 연산을 지원한다.

OpenMP는 C/C++/Fortran에서 공유 메모리 멀티프로세싱을 위한 대표적인 API로, 컴파일러 지시문과 런타임 라이브러리를 통해 루프 병렬화와 리덕션을 간단히 수행할 수 있다.

## 예시

```c
// OpenMP를 사용한 공유 메모리 병렬 프로그래밍
#define P 64
int sum[P];

// 병렬 합산: 64개 스레드가 각각 1000개 요소 합산
#pragma omp parallel for num_threads(P)
for (i = 0; i < 64000; i++)
    sum[i/1000] += A[i];

// 리덕션: 64개 부분합을 하나로
int FinalSum = 0;
#pragma omp parallel for reduction(+:FinalSum)
for (i = 0; i < P; i++)
    FinalSum += sum[i];

// 컴파일: cc -fopenmp program.c
```

## 관련 개념

- [캐시 일관성 (Cache Coherence)](/knowledge/computer-architecture/cache-coherence/)
- [멀티프로세서 (Multiprocessor)](/knowledge/computer-architecture/multiprocessor/)
- [동기화 (Synchronization)](/knowledge/computer-architecture/synchronization/)
- [MIMD (다중 명령어 다중 데이터)](/knowledge/computer-architecture/mimd/)
- [클러스터 (Cluster)](/knowledge/computer-architecture/cluster/)
