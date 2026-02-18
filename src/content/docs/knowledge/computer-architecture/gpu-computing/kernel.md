---
title: "Kernel"
description: "커널(Kernel)은 하나의 스레드를 위해 설계된 프로그램 또는 함수로, 많은 스레드에 의해 병렬로 실행되도록 설계되었다"
tags: ['Kernel', 'Cuda', 'GPU Computing', 'Parallel Programming']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/kernel
sidebar:
  order: 5
---

## 핵심 개념

CUDA에서 커널은 직렬 프로그램이 호출하는 병렬 함수이다. 커널의 핵심 특성:

- `__global__` 선언 지정자로 커널 진입점을 표시
- `kernel<<<dimGrid, dimBlock>>>(params)` 구문으로 호출
- dimGrid: 블록의 3D 차원, dimBlock: 스레드의 3D 차원
- 각 스레드는 threadIdx와 blockIdx로 고유하게 식별
- CUDA는 블록당 최대 512개 스레드를 지원

커널 호출 시마다 새로운 그리드가 동적으로 생성되며, 적절한 수의 스레드 블록과 스레드가 해당 애플리케이션 단계에 맞게 할당된다. 독립적인 그리드는 충분한 하드웨어 리소스가 있으면 동시에 실행될 수 있고, 종속적인 그리드는 암시적 인터커널 배리어를 통해 순차적으로 실행된다.

커널의 텍스트는 단순히 하나의 순차적 스레드를 위한 C 함수이므로, 작성이 직관적이며 일반적으로 벡터 연산을 위한 병렬 코드를 작성하는 것보다 간단하다.

## 예시

```c
// CUDA 커널 정의
__global__ void vectorAdd(float *A, float *B, float *C, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n)
        C[i] = A[i] + B[i];
}

// 호출 코드
int threadsPerBlock = 256;
int blocksPerGrid = (n + threadsPerBlock - 1) / threadsPerBlock;
vectorAdd<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, n);

// 이 커널은:
// - 각 스레드가 하나의 벡터 원소 덧셈을 수행
// - 전체 n개의 스레드가 병렬로 실행
// - GPU가 자동으로 스레드 생성/스케줄링/종료 관리
```

## 관련 개념

- [CUDA](/knowledge/computer-architecture/cuda/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
- [Grid](/knowledge/computer-architecture/grid/)
- [SPMD](/knowledge/computer-architecture/spmd/)
