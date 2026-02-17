---
title: "Synchronization Barrier"
description: "동기화 배리어(Synchronization Barrier)는 스레드 블록 내의 모든 스레드가 배리어 지점에 도달할 때까지 각 스레드가 대기하는 동기화 메커니즘이다"
tags: ['Synchronization', 'Barrier', 'Cuda', 'Thread Coordination']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/synchronization-barrier
sidebar:
  order: 21
---

## 핵심 개념

CUDA에서 `__syncthreads()` 내장 함수는 `bar.sync` 명령어를 생성하여 블록 내 모든 스레드 간의 배리어 동기화를 수행한다. 배리어를 통과한 후에는 배리어 이전에 블록의 스레드가 수행한 모든 메모리 쓰기가 가시적임이 보장된다.

배리어 동기화의 하드웨어 구현:
1. 스레드가 `bar.sync` 명령어를 실행하면 배리어의 도착 카운터를 증가
2. SIMT 스레드 스케줄러에서 해당 스레드를 대기 상태로 표시
3. 대기 중인 스레드는 프로세서 사이클을 소비하지 않음
4. 모든 CTA 스레드가 도착하면(카운터가 기대치에 도달) 모든 대기 스레드를 해제

SIMT 워프 구조는 동기화 난이도를 32배 줄여준다 (32개 스레드가 워프 단위로 묶이므로). 블록 간 동기화는 직접 지원되지 않으며, 원자적 메모리 연산이나 별도의 커널 호출을 통해 간접적으로 수행해야 한다.

## 예시

```c
// 공유 메모리와 배리어 동기화를 사용한 병렬 리덕션
__global__ void reduce(float *input, float *output, int n) {
    __shared__ float sdata[256];

    int tid = threadIdx.x;
    int i = blockIdx.x * blockDim.x + threadIdx.x;

    // 1단계: 전역 메모리에서 공유 메모리로 로드
    sdata[tid] = (i < n) ? input[i] : 0.0f;
    __syncthreads();  // 모든 스레드가 로드 완료 대기

    // 2단계: 공유 메모리에서 리덕션 수행
    for (int s = blockDim.x / 2; s > 0; s >>= 1) {
        if (tid < s)
            sdata[tid] += sdata[tid + s];
        __syncthreads();  // 각 단계의 결과가 필요하므로 동기화
    }

    // 3단계: 결과 저장
    if (tid == 0)
        output[blockIdx.x] = sdata[0];
}
```

## 관련 개념

- [CUDA](/knowledge/computer-architecture/cuda/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
- [Warp](/knowledge/computer-architecture/warp/)
- [Atomic Memory Operation](/knowledge/computer-architecture/atomic-memory-operation/)
- [Cooperative Thread Array](/knowledge/computer-architecture/cooperative-thread-array/)
