---
title: "원자적 메모리 연산 (Atomic Memory Operation)"
description: "원자적 메모리 연산(Atomic Memory Operation)은 중간에 다른 접근이 개입하지 않고 완료되는 메모리 읽기-수정-쓰기 연산 시퀀스이다"
tags: ['Atomic Operation', 'Memory', 'Synchronization', 'Parallel Programming']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/atomic-memory-operation
sidebar:
  order: 20
---

## 핵심 개념

CUDA에서 원자적 메모리 연산은 서로 다른 스레드 블록 간의 조율을 가능하게 하는 중요한 메커니즘이다. 블록 간에는 직접적인 통신 수단이 없으므로, 원자적 연산을 통해 전역 메모리에서 안전하게 데이터를 조율한다.

Tesla GPU 아키텍처에서 지원하는 원자적 연산 (atom.*op*.u32):
- **산술**: add, min, max
- **논리**: and, or, xor
- **교환**: exchange
- **비교 및 교환**: cas (compare-and-swap)

원자적 연산의 주요 용도:
- 병렬 리덕션의 최종 합산
- 병렬 데이터 구조 관리 (큐 포인터 증가 등)
- 카운터 업데이트
- 뮤텍스/세마포어 구현

원자적 연산은 추가적인 임시 배열과 반복적인 커널 호출을 제거하여 프로그래밍을 단순화한다 (예: atomicAdd로 여러 블록의 부분합을 하나로 합산).

## 예시

```c
// atomicAdd를 사용한 전역 히스토그램 계산
__global__ void histogram(int *data, int *hist, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        int bin = data[i];
        atomicAdd(&hist[bin], 1);
        // 여러 스레드가 동시에 같은 bin을 업데이트해도 안전
    }
}

// atomicAdd를 사용한 블록 간 리덕션 결과 합산
__global__ void reduceBlocks(float *partial, float *total, int nblocks) {
    __shared__ float sdata[256];
    // ... 블록 내 리덕션 수행 ...
    if (threadIdx.x == 0)
        atomicAdd(total, sdata[0]);
    // 별도의 커널 호출 없이 최종 합산 완료
}
```

## 관련 개념

- [동기화 장벽 (Synchronization Barrier)](/knowledge/computer-architecture/synchronization-barrier/)
- [CUDA (Compute Unified Device Architecture)](/knowledge/computer-architecture/cuda/)
- [스레드 블록 (Thread Block)](/knowledge/computer-architecture/thread-block/)
- [병렬 리덕션 (Parallel Reduction)](/knowledge/computer-architecture/parallel-reduction/)
