---
title: "그리드 (Grid)"
description: "그리드(Grid)는 동일한 커널 프로그램을 실행하는 스레드 블록들의 집합으로, 각 블록은 독립적으로 실행될 수 있어 병렬 또는 직렬로 처리 가능하다"
tags: ['Grid', 'Cuda', 'Thread Hierarchy', 'Parallel Programming']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/grid
sidebar:
  order: 6
---

## 핵심 개념

CUDA에서 그리드는 스레드 계층의 최상위 수준이다. 커널이 호출될 때마다 새로운 그리드가 동적으로 생성된다.

**그리드의 특성**:
- 1D, 2D, 또는 3D로 구성 가능 (dim3 타입)
- 그리드 내 모든 블록은 동일한 커널 프로그램 실행
- 블록은 임의의 순서로 실행 가능 (독립성 보장)
- 블록 간 직접 통신 불가 (원자적 메모리 연산으로 간접 조율)

**그리드 간 관계**:
- 독립적 그리드: 충분한 하드웨어 리소스가 있으면 동시 실행
- 종속적 그리드: 암시적 인터커널 배리어로 순차 실행
- 첫 번째 그리드의 모든 블록이 완료된 후 두 번째 그리드 시작

그리드의 독립적 블록 구조는 스레드 블록 수를 데이터 크기에 따라 결정할 수 있게 하여, 프로세서 수와 무관한 직관적 문제 분해를 가능하게 한다. 이는 GPU의 확장성의 핵심이다.

## 예시

```c
// 2D 그리드 구성 예시
// 1920×1080 이미지의 각 픽셀을 하나의 스레드로 처리

dim3 blockDim(16, 16);     // 16×16 = 256 스레드/블록
dim3 gridDim(
    (1920 + 15) / 16,      // 120 블록 (가로)
    (1080 + 15) / 16        // 68 블록 (세로)
);
// 총 120 × 68 = 8,160 블록
// 총 8,160 × 256 = 2,088,960 스레드

processImage<<<gridDim, blockDim>>>(image, width, height);

// 스레드 계층 구조:
// Grid (8,160 블록)
//   └── Block (256 스레드)
//         └── Thread (개별 실행 단위)
//
// 각 스레드의 고유 위치:
// x = blockIdx.x * blockDim.x + threadIdx.x
// y = blockIdx.y * blockDim.y + threadIdx.y
```

## 관련 개념

- [스레드 블록 (Thread Block)](/knowledge/computer-architecture/thread-block/)
- [커널 (Kernel)](/knowledge/computer-architecture/kernel/)
- [CUDA (Compute Unified Device Architecture)](/knowledge/computer-architecture/cuda/)
- [SPMD (단일 프로그램 다중 데이터)](/knowledge/computer-architecture/spmd/)
- [동기화 장벽 (Synchronization Barrier)](/knowledge/computer-architecture/synchronization-barrier/)
