---
title: "Parallel Reduction"
description: "병렬 리덕션(Parallel Reduction)은 배열의 모든 원소를 결합 연산자(덧셈, 최대값 등)를 사용하여 하나의 값으로 줄이는 병렬 알고리즘이다"
tags: ['Parallel Reduction', 'Parallel Algorithm', 'Cuda', 'Data Parallel']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/parallel-reduction
sidebar:
  order: 22
---

## 핵심 개념

병렬 리덕션은 스캔의 특수 케이스로, 모든 프리픽스 합이 아닌 최종 합만 필요할 때 더 효율적으로 구현할 수 있다. 암시적 합산 트리를 구축하여 O(log n) 단계로 n개의 원소를 하나로 줄인다.

**CUDA에서의 구현 전략**:
1. 각 스레드가 하나의 입력 원소를 공유 메모리에 로드
2. 트리 기반 반복으로 부분합 계산
3. 반복마다 활성 스레드 수가 절반으로 줄어듦
4. 최종적으로 스레드 0이 블록 전체의 합을 보유

**다중 블록 리덕션**:
- 각 블록이 부분합을 계산한 후, 블록 간 합산이 필요
- 방법 1: 부분합을 별도 배열에 쓰고 리덕션 커널을 재호출
- 방법 2: atomicAdd()를 사용하여 추가 임시 배열과 커널 호출 없이 합산

병렬 리덕션은 블록별 공유 메모리와 저비용 배리어의 중요성을 강조한다. 이 수준의 데이터 셔플링은 오프칩 전역 메모리에서 수행하면 비용이 매우 높다.

## 예시

```c
// CUDA 병렬 리덕션 (덧셈)
__global__ void reduce(float *input, float *total, int n) {
    __shared__ float sdata[256];
    int tid = threadIdx.x;
    int i = blockIdx.x * blockDim.x + tid;

    // 입력 로드
    sdata[tid] = (i < n) ? input[i] : 0.0f;
    __syncthreads();

    // 트리 기반 리덕션
    for (int s = blockDim.x / 2; s > 0; s >>= 1) {
        if (tid < s)
            sdata[tid] += sdata[tid + s];
        __syncthreads();
    }

    // 블록 결과를 원자적으로 합산
    if (tid == 0)
        atomicAdd(total, sdata[0]);
}

// 리덕션 트리 (8 원소 예시):
// 단계 0: [a0+a4, a1+a5, a2+a6, a3+a7, -, -, -, -]
// 단계 1: [s0+s2, s1+s3, -, -, -, -, -, -]
// 단계 2: [s0+s1, -, -, -, -, -, -, -]
// → 3단계(log2(8))로 8개 원소 합산 완료
```

## 관련 개념

- [Atomic Memory Operation](/knowledge/computer-architecture/atomic-memory-operation/)
- [CUDA](/knowledge/computer-architecture/cuda/)
- [GPU Memory Hierarchy](/knowledge/computer-architecture/gpu-memory-hierarchy/)
