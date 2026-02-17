---
title: "DGEMM"
description: "DGEMM(Double precision GEneral Matrix Multiply)은 배정밀도 범용 행렬 곱셈으로, C = C + A x B 형태의 행렬 연산을 수행하는 표준 선형대수 루틴이다"
tags: ['Matrix Multiply', 'Double Precision', 'Performance', 'Optimization', 'Linear Algebra']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dgemm
sidebar:
  order: 34
---

## 핵심 개념

과학 계산에서 가장 기본적이고 중요한 연산 중 하나이다. 세 겹의 중첩 루프로 구현되며, 가장 안쪽 루프에서 곱셈-누적(multiply-accumulate) 연산이 수행된다. 성능 최적화의 대표적 벤치마크로 사용되며, 컴파일러 최적화, 서브워드 병렬성(SIMD/AVX), 캐시 최적화, 명령어 수준 병렬성 등 다양한 기법을 통해 단계적으로 성능을 향상시킬 수 있다. 파이썬보다 최적화된 C 코드가 극적으로 빠르며, AVX-512를 사용하면 약 7.5배의 추가 속도 향상을 달성한다.

## 예시

```c
// C 언어 DGEMM 구현
void dgemm(int n, double* A, double* B, double* C) {
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j) {
            double cij = C[i + j*n]; // C[i][j]
            for (int k = 0; k < n; k++)
                cij += A[i + k*n] * B[k + j*n]; // A[i][k]*B[k][j]
            C[i + j*n] = cij;
        }
}
```

```assembly
# AVX-512 최적화 핵심 루프 (x86):
vmovapd   (%r9), %zmm0           # 8개 A 요소 로드
vbroadcastsd (%rcx), %zmm1       # B 요소 브로드캐스트
vfmadd231pd %zmm1, %zmm0, %zmm2 # FMA 연산
```

## 관련 개념

- [Double Precision](/knowledge/computer-architecture/double-precision/)
- [Advanced Vector Extensions](/knowledge/computer-architecture/advanced-vector-extensions/)
- [Subword Parallelism](/knowledge/computer-architecture/subword-parallelism/)
- [Fused Multiply Add](/knowledge/computer-architecture/fused-multiply-add/)
