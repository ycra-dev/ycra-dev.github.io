---
title: "CUDA (Compute Unified Device Architecture)"
description: "CUDA(Compute Unified Device Architecture)는 C/C++ 기반의 확장 가능한 병렬 프로그래밍 모델이자 소프트웨어 플랫폼으로, GPU 및 기타 병렬 프로세서를 위한 범용 프로그래밍을 가능하게 한다"
tags: ['Cuda', 'GPU Computing', 'Parallel Programming', 'Nvidia']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cuda
sidebar:
  order: 3
---

## 핵심 개념

CUDA는 기존의 GPGPU 접근 방식과 달리, 그래픽 API를 우회하고 C/C++로 직접 GPU를 프로그래밍할 수 있게 한다. CUDA의 핵심 추상화는 세 가지이다:

1. **스레드 계층 구조**: 스레드 → 스레드 블록 → 그리드의 계층적 구조
2. **공유 메모리**: 블록 내 스레드 간 통신을 위한 저지연 온칩 메모리
3. **배리어 동기화**: 블록 내 스레드 간 동기화를 위한 `__syncthreads()`

CUDA의 SPMD(Single-Program Multiple-Data) 프로그래밍 스타일에서, 프로그래머는 하나의 스레드에 대한 프로그램을 작성하고, GPU가 이를 많은 스레드에서 병렬로 실행한다. 커널 호출 시 `kernel<<<dimGrid, dimBlock>>>(...)`형식으로 그리드와 블록의 차원을 지정한다.

CUDA 프로그램은 하드웨어의 물리적 프로세서 수와 무관하게 작성되며, 런타임 시스템만이 실제 프로세서 수를 알면 된다. 이를 통해 투명한 확장성(transparent scalability)을 달성한다.

## 예시

```c
// CUDA SAXPY 커널: y = a*x + y
__global__ void saxpy(int n, float a, float *x, float *y) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n)
        y[i] = a * x[i] + y[i];
}

// 커널 호출
int nblocks = (n + 255) / 256;
saxpy<<<nblocks, 256>>>(n, 2.0f, x, y);
// n개의 스레드가 생성되어 각각 하나의 원소를 처리
// 256개 스레드씩 블록으로 묶임
```

## 관련 개념

- [스레드 블록 (Thread Block)](/knowledge/computer-architecture/thread-block/)
- [커널 (Kernel)](/knowledge/computer-architecture/kernel/)
- [SPMD (단일 프로그램 다중 데이터)](/knowledge/computer-architecture/spmd/)
- [동기화 장벽 (Synchronization Barrier)](/knowledge/computer-architecture/synchronization-barrier/)
- [SIMT (단일 명령어 다중 스레드)](/knowledge/computer-architecture/simt/)
