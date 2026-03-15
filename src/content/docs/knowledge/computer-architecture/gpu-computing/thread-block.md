---
title: "스레드 블록 (Thread Block)"
description: "스레드 블록(Thread Block)은 동일한 스레드 프로그램을 실행하고 결과를 계산하기 위해 서로 협력할 수 있는 동시 실행 스레드의 집합이다"
tags: ['Thread Block', 'Cuda', 'GPU Computing', 'Parallel Programming']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/thread-block
sidebar:
  order: 7
---

## 핵심 개념

CUDA 프로그래밍 모델에서 스레드 블록은 중간 수준의 병렬성 단위이다:

- **블록 내 협력**: 배리어 동기화(`__syncthreads()`)와 공유 메모리를 통해 스레드 간 통신 가능
- **블록 간 독립성**: 서로 다른 블록은 독립적으로 실행되어야 하며, 임의의 순서로 실행 가능
- **크기 제한**: 최대 512개 스레드 (아키텍처에 따라 다름)
- **차원**: 1D, 2D, 3D 구성 가능 (.x, .y, .z 인덱스)

스레드 블록의 독립성 요구사항은 확장성의 핵심이다. 블록이 임의의 순서로 실행될 수 있으므로, 프로세서 수와 관계없이 동일한 프로그램이 동작한다. GPU 하드웨어에서 스레드 블록은 CTA(Cooperative Thread Array)로 구현되며, 하나 이상의 워프로 구성된다.

블록 내 스레드들은 공유 메모리와 동기화를 통해 협력하므로 동일한 물리적 멀티프로세서(SM)에서 실행된다. 블록 수는 프로세서 수를 크게 초과할 수 있어 가상화를 제공한다.

## 예시

```c
// 2D 스레드 블록을 사용한 행렬 곱셈의 타일 처리
#define TILE_SIZE 16

__global__ void matMul(float *A, float *B, float *C, int N) {
    // 2D 스레드 블록에서의 위치
    int row = blockIdx.y * TILE_SIZE + threadIdx.y;
    int col = blockIdx.x * TILE_SIZE + threadIdx.x;

    __shared__ float tileA[TILE_SIZE][TILE_SIZE];
    __shared__ float tileB[TILE_SIZE][TILE_SIZE];

    float sum = 0.0f;
    for (int t = 0; t < N/TILE_SIZE; t++) {
        tileA[threadIdx.y][threadIdx.x] = A[row*N + t*TILE_SIZE + threadIdx.x];
        tileB[threadIdx.y][threadIdx.x] = B[(t*TILE_SIZE + threadIdx.y)*N + col];
        __syncthreads();  // 블록 내 모든 스레드가 타일 로드 완료 대기

        for (int k = 0; k < TILE_SIZE; k++)
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        __syncthreads();
    }
    C[row*N + col] = sum;
}

// 호출: 16x16 스레드 블록으로 N×N 행렬 처리
dim3 block(TILE_SIZE, TILE_SIZE);
dim3 grid(N/TILE_SIZE, N/TILE_SIZE);
matMul<<<grid, block>>>(A, B, C, N);
```

## 관련 개념

- [CUDA (Compute Unified Device Architecture)](/knowledge/computer-architecture/cuda/)
- [커널 (Kernel)](/knowledge/computer-architecture/kernel/)
- [그리드 (Grid)](/knowledge/computer-architecture/grid/)
- [동기화 장벽 (Synchronization Barrier)](/knowledge/computer-architecture/synchronization-barrier/)
- [CTA (협력 스레드 배열)](/knowledge/computer-architecture/cooperative-thread-array/)
- [워프 (Warp)](/knowledge/computer-architecture/warp/)
