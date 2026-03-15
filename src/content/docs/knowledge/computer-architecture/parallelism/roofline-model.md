---
title: "루프라인 모델 (Roofline Model)"
description: "루프라인 모델(Roofline Model)은 부동소수점 성능, 산술 강도, 메모리 대역폭을 2차원 그래프에 결합하여 프로그램의 성능 상한을 시각적으로 보여주는 성능 모델이다"
tags: ['Performance Model', 'Arithmetic Intensity', 'Memory Bandwidth', 'Floating Point Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/roofline-model
sidebar:
  order: 35
---

## 핵심 개념

루프라인 모델은 Williams, Waterman, Patterson(2009)이 제안한 것으로, 컴퓨터의 최대 달성 가능 성능을 다음 공식으로 나타낸다: `달성 가능 GFLOPS/s = Min(최대 메모리 대역폭 x 산술 강도, 최대 부동소수점 성능)`. 그래프에서 수평선은 컴퓨팅 성능 한계를, 대각선은 메모리 대역폭 한계를 나타내며, 이 두 선이 만나는 지점을 "능선점(ridge point)"이라 한다. 능선점이 오른쪽에 있으면 높은 산술 강도의 커널만 최대 성능을 달성할 수 있고, 왼쪽에 있으면 대부분의 커널이 최대 성능에 도달할 수 있다. 이 모델은 한 번 컴퓨터에 대해 구성하면 모든 커널에 반복 적용할 수 있다는 장점이 있다. 또한 "천장(ceiling)" 개념을 추가하여 최적화 우선순위를 결정하는 데 도움을 준다.

## 예시

```
AMD Opteron X2 예시:
- 최대 부동소수점 성능: 16 GFLOPS/sec
- 최대 메모리 대역폭: 16 GB/sec (Stream 벤치마크 기준)
- 능선점: 산술 강도 = 1 FLOPs/byte

커널 1 (산술 강도 0.5 FLOPs/byte):
  달성 가능 = Min(16 * 0.5, 16) = Min(8, 16) = 8 GFLOPS/sec (메모리 제한)

커널 2 (산술 강도 4 FLOPs/byte):
  달성 가능 = Min(16 * 4, 16) = Min(64, 16) = 16 GFLOPS/sec (연산 제한)
```

## 관련 개념

- [산술 강도 (Arithmetic Intensity)](/knowledge/computer-architecture/arithmetic-intensity/)
- [소프트웨어 프리페칭 (Software Prefetching)](/knowledge/computer-architecture/software-prefetching/)
- [메모리 친화성 (Memory Affinity)](/knowledge/computer-architecture/memory-affinity/)
- [SIMD (단일 명령어 다중 데이터)](/knowledge/computer-architecture/simd/)
