---
title: "Compressed Sparse Row (CSR)"
description: "CSR(Compressed Sparse Row)은 일반적인 비구조적 희소 행렬을 효율적으로 저장하는 표현 방식으로, 비영 원소만을 행 우선 순서로 저장한다"
tags: ['Csr', 'Sparse Matrix', 'Data Structure', 'Parallel Computing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/compressed-sparse-row
sidebar:
  order: 24
---

## 핵심 개념

n x n 희소 행렬에서 비영 원소의 수 m이 전체의 작은 비율일 때, CSR은 O(n)의 비영 원소만 저장하여 저장 공간과 처리 시간을 절약한다.

**CSR의 세 가지 배열**:
- **Av**: m개의 비영 원소를 행 우선 순서로 저장
- **Aj**: Av의 각 항목에 대응하는 열 인덱스
- **Ap**: n+1개의 원소로, 각 행의 시작과 끝 위치를 기록. Ap[i]부터 Ap[i+1] 직전까지가 i번째 행의 원소

CSR 형식의 행렬-벡터 곱 y = Ax의 CUDA 병렬화:
- 각 스레드가 정확히 하나의 출력 행을 계산
- 직렬 루프의 반복이 독립적이므로 쉽게 병렬화
- 공유 메모리를 소프트웨어 관리 캐시로 사용하여 x 벡터의 재사용 최적화

GeForce 8800에서 CSR SpMV 성능: 약 772-920 million nonzeros/second, 단일 CPU 코어 대비 약 4.6배 속도 향상.

## 예시

```
CSR 표현 예시:

행렬 A:
[1 0 0 2]
[0 3 0 0]
[4 0 5 6]

CSR 표현:
Av = [1, 2, 3, 4, 5, 6]     (비영 원소 값)
Aj = [0, 3, 1, 0, 2, 3]     (열 인덱스)
Ap = [0, 2, 3, 6]           (행 시작 위치)
     행0  행1  행2  끝

행 0: Av[0..1] = [1, 2], Aj[0..1] = [0, 3] → a(0,0)=1, a(0,3)=2
행 1: Av[2..2] = [3],    Aj[2..2] = [1]    → a(1,1)=3
행 2: Av[3..5] = [4,5,6], Aj[3..5] = [0,2,3] → a(2,0)=4, a(2,2)=5, a(2,3)=6
```

```c
// CUDA CSR 희소 행렬-벡터 곱
__global__ void csrmul_kernel(int *Ap, int *Aj, float *Av,
                               int num_rows, float *x, float *y) {
    int row = blockIdx.x * blockDim.x + threadIdx.x;
    if (row < num_rows) {
        float sum = 0.0f;
        for (int j = Ap[row]; j < Ap[row+1]; j++)
            sum += Av[j] * x[Aj[j]];
        y[row] = sum;
    }
}
```

## 관련 개념

- [CUDA](/knowledge/computer-architecture/cuda/)
- [GPU Memory Hierarchy](/knowledge/computer-architecture/gpu-memory-hierarchy/)
- [Parallel Reduction](/knowledge/computer-architecture/parallel-reduction/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
