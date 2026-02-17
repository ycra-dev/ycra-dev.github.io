---
title: "Single-Program Multiple-Data (SPMD)"
description: "SPMD(Single-Program Multiple-Data)는 모든 스레드가 동일한 프로그램을 실행하는 병렬 프로그래밍 모델의 스타일이다"
tags: ['Spmd', 'Parallel Programming', 'Programming Model', 'Cuda']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/spmd
sidebar:
  order: 11
---

## 핵심 개념

SPMD는 CUDA 프로그래밍 모델의 기반이 되는 병렬 프로그래밍 패러다임이다. SPMD에서 프로그래머는 하나의 스레드에 대한 프로그램을 작성하고, GPU가 이를 여러 스레드에서 동시에 실행한다.

CUDA의 SPMD는 전통적인 SPMD보다 유연하다:
- 각 커널 호출이 동적으로 새로운 그리드를 생성
- 각 커널은 해당 애플리케이션 단계에 적합한 수의 스레드를 사용 가능
- 모든 단계에서 동일한 수의 스레드를 사용할 필요 없음

SPMD는 SIMD(Single-Instruction Multiple-Data)와 구별된다. SIMD는 하나의 명령어를 여러 데이터 레인에 적용하는 반면, SPMD는 각 스레드가 독립적인 코드 경로를 가질 수 있다. GPU의 SIMT 아키텍처는 SPMD 프로그래밍 모델에서 런타임에 데이터 수준 병렬성을 자동으로 찾아낸다.

그래픽 셰이딩 언어에서의 SPMD도 동일한 원리: 하나의 정점이나 픽셀을 처리하는 프로그램을 작성하면, GPU가 수천 개의 정점/픽셀을 병렬로 처리한다.

## 예시

```c
// SPMD 스타일 CUDA 코드 시퀀스
// 커널 F: 2D 그리드 (3×2 블록) × 2D 블록 (5×3 스레드)
dim3 gridF(3, 2);
dim3 blockF(5, 3);
kernelF<<<gridF, blockF>>>(params);

// 인터커널 동기화 배리어 (암시적)

// 커널 G: 1D 그리드 (4 블록) × 1D 블록 (6 스레드)
kernelG<<<4, 6>>>(params);

// 같은 프로그램이 다른 차원의 병렬성으로 실행됨
// kernelF: 30개 스레드 (3×2×5×3)
// kernelG: 24개 스레드 (4×6)
// 각 단계에서 적절한 병렬성 수준을 동적으로 선택
```

## 관련 개념

- [CUDA](/knowledge/computer-architecture/cuda/)
- [Kernel](/knowledge/computer-architecture/kernel/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
- [SIMT](/knowledge/computer-architecture/simt/)
- [Synchronization Barrier](/knowledge/computer-architecture/synchronization-barrier/)
