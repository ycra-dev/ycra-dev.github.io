---
title: "Parallel Scan (Prefix Sum)"
description: "병렬 스캔(Parallel Scan), 또는 병렬 프리픽스 합(Prefix Sum)은 주어진 시퀀스와 이항 결합 연산자에 대해 모든 프리픽스 연산 결과를 계산하는 데이터 병렬 알고리즘의 핵심 빌딩 블록이다"
tags: ['Parallel Scan', 'Prefix Sum', 'Parallel Algorithm', 'Cuda']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/parallel-scan
sidebar:
  order: 23
---

## 핵심 개념

n개 원소의 시퀀스 [a0, a1, ..., an-1]과 이항 결합 연산자에 대해:
- **포함적 스캔(inclusive scan)**: [a0, a0+a1, a0+a1+a2, ..., a0+...+an-1]
- **배타적 스캔(exclusive scan)**: [0, a0, a0+a1, ..., a0+...+an-2]

직렬 구현은 O(n) 연산이지만, 병렬 구현이 가능하다. 덧셈이 결합적이므로 원소를 더하는 순서를 자유롭게 변경할 수 있다.

**Hillis-Steele 알고리즘**:
- log2(n)번의 반복으로 부분합을 수집
- O(n log n) 연산 → 작업 효율적이지 않음(직렬보다 더 많은 연산)
- 더 효율적인 work-efficient 알고리즘도 존재

병렬 스캔의 응용:
- 정렬(radix sort)의 기본 연산
- 컴팩션(compaction)
- 스트림 컴팩션
- 히스토그램 계산
- 다항식 평가

## 예시

```c
// CUDA 병렬 스캔 (Hillis-Steele, 포함적)
__global__ void scan(float *x, int n) {
    int tid = threadIdx.x;

    for (int d = 1; d < n; d *= 2) {
        __syncthreads();
        float temp;
        if (tid >= d)
            temp = x[tid] + x[tid - d];
        else
            temp = x[tid];
        __syncthreads();
        x[tid] = temp;
    }
}

// 실행 과정 (n=8):
// 입력:   [3, 1, 7, 0, 4, 1, 6, 3]
// d=1:    [3, 4, 8, 7, 4, 5, 7, 9]
// d=2:    [3, 4, 11, 11, 12, 12, 11, 14]
// d=4:    [3, 4, 11, 11, 15, 16, 22, 25]
// 결과:   [3, 4, 11, 11, 15, 16, 22, 25]
```

## 관련 개념

- [Parallel Reduction](/knowledge/computer-architecture/parallel-reduction/)
- [CUDA](/knowledge/computer-architecture/cuda/)
- [Synchronization Barrier](/knowledge/computer-architecture/synchronization-barrier/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
