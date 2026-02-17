---
title: "Weak Scaling"
description: "약한 확장(weak scaling)은 프로세서 수의 증가에 비례하여 문제 크기도 함께 키우면서 달성하는 속도 향상을 측정하는 방식이다"
tags: ['Parallel Computing', 'Speedup', 'Multiprocessor', 'Problem Size', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/weak-scaling
sidebar:
  order: 29
---

## 핵심 개념

약한 확장은 강한 확장보다 좋은 속도 향상을 달성하기 쉽다. 문제 크기가 커지면 병렬화 가능한 부분의 비율이 증가하고, 순차적 부분의 상대적 비율이 줄어들기 때문이다.

예를 들어 TPC-C 데이터베이스 벤치마크에서는 처리량이 100배 증가하면 고객 계정 수도 100배로 늘려야 의미 있는 테스트가 된다. 더 큰 문제는 보통 더 많은 데이터를 필요로 하므로 약한 확장이 적절하다.

그러나 메모리 계층 구조가 약한 확장의 장점을 상쇄할 수 있다. 약하게 확장된 데이터셋이 멀티코어의 마지막 레벨 캐시에 맞지 않으면, 결과적인 성능이 강한 확장을 사용할 때보다 오히려 나빠질 수 있다.

약한 스케일링에서는 프로그램의 직렬 부분이 상수일 때 선형 속도 향상을 보여줄 수 있어, Amdahl의 법칙의 제약을 어느 정도 극복할 수 있다. Linpack, SPECrate, NAS 벤치마크 등 많은 병렬 벤치마크가 약한 스케일링을 허용한다. 그러나 약한 스케일링은 메모리 시스템에 대한 부담이 줄어들어 강한 스케일링과는 다른 결과를 낼 수 있으므로, 서로 다른 문제 크기의 결과를 비교할 때 주의가 필요하다.

## 예시

```
# Weak Scaling vs Strong Scaling 비교

# 10개 스칼라 덧셈 + 10x10 행렬 (Strong Scaling)
40 프로세서: 속도향상 = 110t/12.5t = 8.8

# 10개 스칼라 덧셈 + 20x20 행렬 (Weak Scaling - 문제 크기 4배)
40 프로세서: 속도향상 = 410t/20t = 20.5

# 약한 확장의 효과
문제 크기 증가 -> 병렬 부분 비율 증가
10x10: 순차 10t / 전체 110t = 9.1% 순차
20x20: 순차 10t / 전체 410t = 2.4% 순차

# 메모리 계층 구조의 영향
작은 데이터: L2 캐시에 적합 -> 빠름
큰 데이터: L2 캐시 초과 -> DRAM 접근 필요 -> 느림
```

```
1000개 프로세서로 약한 스케일링:
- 같은 데이터셋에 대해 1000배 빠르게 처리하는 것이 아니라
- 비슷한 시간 내에 1000배 많은 일을 수행
- 직렬 부분이 상수이고 나머지가 완전 병렬이면 → 선형 속도 향상 가능

예: 행렬 곱셈에서 프로세서 수에 비례해 행렬 크기를 늘리면
    산술 강도가 증가하여 메모리 병목 현상이 줄어듦
```

## 관련 개념

- [Strong Scaling](/knowledge/computer-architecture/strong-scaling/)
- [Multiprocessor](/knowledge/computer-architecture/multiprocessor/)
- [Three Cs Model](/knowledge/computer-architecture/three-cs-model/)
- [Cache Blocking](/knowledge/computer-architecture/cache-blocking/)
- [Amdahl's Law](/knowledge/computer-architecture/amdahls-law/)
- [Parallel Benchmarks](/knowledge/computer-architecture/parallel-benchmarks/)
- [Thread-Level Parallelism](/knowledge/computer-architecture/thread-level-parallelism/)
