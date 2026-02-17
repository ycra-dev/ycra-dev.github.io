---
title: "GPU Memory Hierarchy"
description: "GPU 메모리 계층은 스레드별 로컬 메모리, 블록별 공유 메모리, 애플리케이션 전체 전역 메모리로 구성된 다층 메모리 구조로, 각 수준은 서로 다른 범위와 지연 시간을 가진다"
tags: ['GPU Memory', 'Local Memory', 'Shared Memory', 'Global Memory', 'Cuda']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/gpu-memory-hierarchy
sidebar:
  order: 15
---

## 핵심 개념

CUDA 프로그래밍 모델은 다섯 가지 메모리 공간을 제공한다:

1. **로컬 메모리(Local Memory)**: 스레드 전용 사적 메모리. 레지스터에 맞지 않는 변수와 스택 프레임 저장. 외부 DRAM에 위치하여 지연 시간이 높음
2. **공유 메모리(Shared Memory)**: 블록 내 모든 스레드가 공유. SM의 온칩 SRAM으로 구현되어 저지연. 블록의 수명과 동일한 수명
3. **전역 메모리(Global Memory)**: 모든 스레드가 접근 가능. 외부 DRAM에 위치. CTA 간 통신에 사용. 순차 일관성 보장 안 됨(완화된 메모리 순서 모델)
4. **상수 메모리(Constant Memory)**: 읽기 전용. 외부 DRAM에 저장되고 SM에 캐싱. 워프 내 스레드에 스칼라 값 브로드캐스트
5. **텍스처 메모리(Texture Memory)**: 대규모 읽기 전용 배열. 스트리밍 캐시 계층에 캐싱. 보간 및 필터링 하드웨어 지원

공유 메모리는 16개의 독립적으로 주소 지정 가능한 SRAM 뱅크로 구성되어, 16-by-16 상호 연결 네트워크를 통해 접근한다. 로컬/전역 load/store 명령어는 동일한 SIMT 워프의 개별 스레드 요청을 하나의 메모리 블록 요청으로 병합(coalescing)하여 대역폭을 향상시킨다.

## 예시

```c
// CUDA 메모리 공간 사용 예시
__constant__ float coeff[256];         // 상수 메모리 (읽기 전용)
__device__ float globalArray[1024];     // 전역 메모리

__global__ void example(float *input, float *output) {
    __shared__ float cache[256];        // 공유 메모리 (블록 전용)
    float localVar;                     // 로컬 메모리 (스레드 전용)

    int tid = threadIdx.x;
    int gid = blockIdx.x * blockDim.x + tid;

    // 전역 → 공유 메모리 로드
    cache[tid] = input[gid];
    __syncthreads();

    // 공유 메모리에서 계산 (저지연)
    localVar = cache[tid] * coeff[tid];

    // 결과를 전역 메모리에 저장
    output[gid] = localVar;
}

// 메모리 지연 시간 비교:
// 레지스터: 0 사이클 (추가 지연 없음)
// 공유 메모리: ~수 사이클
// 전역/로컬 메모리: 수백 사이클 (DRAM 접근)
```

## 관련 개념

- [CUDA](/knowledge/computer-architecture/cuda/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
- [Texture](/knowledge/computer-architecture/texture/)
- [Synchronization Barrier](/knowledge/computer-architecture/synchronization-barrier/)
