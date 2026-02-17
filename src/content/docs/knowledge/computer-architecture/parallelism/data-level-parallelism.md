---
title: "Data-Level Parallelism"
description: "데이터 수준 병렬성(Data-Level Parallelism, DLP)은 독립적인 데이터에 대해 동일한 연산을 수행함으로써 달성되는 병렬성이다"
tags: ['Simd', 'Vector Architecture', 'Parallel Computing', 'GPU', 'Array Processing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/data-level-parallelism
sidebar:
  order: 2
---

## 핵심 개념

DLP는 SIMD 아키텍처와 벡터 프로세서가 활용하는 병렬성의 핵심 형태이다. 배열 처리, 이미지 처리, 과학 계산 등에서 자주 나타난다.

DLP가 SIMD에서 잘 동작하려면 동일하게 구조화된 대량의 데이터가 필요하다. for 루프의 배열 연산이 대표적이며, case/switch 문처럼 데이터에 따라 다른 연산이 필요한 경우에는 SIMD의 효율이 크게 떨어진다.

DLP는 명령어 수준 병렬성(ILP), 스레드 수준 병렬성(TLP), 태스크 수준 병렬성과 함께 컴퓨터 아키텍처에서 활용되는 네 가지 주요 병렬성 형태 중 하나이다. GPU는 DLP와 TLP를 모두 활용하는 대표적 아키텍처이다.

## 예시

```
# 데이터 수준 병렬성의 예

# 높은 DLP (SIMD에 적합)
for (i = 0; i < 1000; i++)
    C[i] = A[i] + B[i];     # 1000개의 독립적인 덧셈

# 높은 DLP (이미지 처리)
for (y = 0; y < height; y++)
    for (x = 0; x < width; x++)
        output[y][x] = filter(input[y][x]);  # 각 픽셀 독립 처리

# 낮은 DLP (SIMD에 부적합)
for (i = 1; i < 1000; i++)
    A[i] = A[i-1] + B[i];   # 이전 결과에 의존 -> 순차적
```

## 관련 개념

- [SIMD](/knowledge/computer-architecture/simd/)
- [Vector Architecture](/knowledge/computer-architecture/vector-architecture/)
- [GPU](/knowledge/computer-architecture/gpu/)
- [Strong Scaling](/knowledge/computer-architecture/strong-scaling/)
