---
title: "OpenMP"
description: "OpenMP(Open Multi-Processing)는 공유 메모리 멀티프로세서에서 병렬 프로그래밍을 지원하는 API로, 컴파일러 지시어(pragma)를 통해 루프 등의 코드 블록을 여러 스레드로 분배하여 실행한다"
tags: ['Parallel Programming', 'Thread Level Parallelism', 'Shared Memory', 'Pragma']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/openmp
sidebar:
  order: 31
---

## 핵심 개념

OpenMP는 기존 순차 프로그램에 최소한의 코드 변경만으로 병렬화를 적용할 수 있는 장점이 있다. DGEMM(행렬 곱셈) 예제에서는 단 한 줄의 OpenMP pragma만 추가하여 최외곽 for 루프를 모든 코어에 분배했다. 48코어 Intel Core i7(Skylake) 시스템에서 큰 행렬(960x960)에 대해 17배 속도 향상을 달성했으나, L1 캐시에 맞는 작은 행렬(64x64)에서는 오히려 성능이 감소했다. 이는 강한 스케일링(strong scaling) 대 약한 스케일링(weak scaling)의 과제를 보여준다. Python 버전 대비 최적화된 C 코드는 약 50,000배의 속도 향상을 달성했다.

## 예시

```c
// OpenMP를 사용한 DGEMM 병렬화
// 단 한 줄의 pragma 추가만으로 병렬화 달성

#pragma omp parallel for  // 이 한 줄이 유일한 OpenMP 코드
for (int i = 0; i < N; i += BLOCKSIZE)
    for (int j = 0; j < N; j += BLOCKSIZE)
        for (int k = 0; k < N; k += BLOCKSIZE)
            do_block(N, BLOCKSIZE, &A[i*N+k], &B[k*N+j], &C[i*N+j]);

// 결과: 960x960 행렬에서 308 GFLOPS 달성
// 원래 C 버전(2 GFLOPS) 대비 150배 속도 향상
```

## 관련 개념

- [Thread-Level Parallelism](/knowledge/computer-architecture/thread-level-parallelism/)
- [Shared Memory Multiprocessor](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [DGEMM](/knowledge/computer-architecture/dgemm/)
- [Strong Scaling](/knowledge/computer-architecture/strong-scaling/)
