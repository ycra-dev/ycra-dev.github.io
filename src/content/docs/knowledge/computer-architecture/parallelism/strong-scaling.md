---
title: "Strong Scaling"
description: "강한 확장(strong scaling)은 문제 크기를 고정한 채로 프로세서 수를 늘려서 달성하는 속도 향상을 측정하는 방식이다"
tags: ['Parallel Computing', 'Speedup', 'Amdahls Law', 'Multiprocessor', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/strong-scaling
sidebar:
  order: 28
---

## 핵심 개념

강한 확장에서 고정된 문제 크기로 좋은 속도 향상을 얻는 것은 암달의 법칙(Amdahl's Law)에 의해 제한된다. 프로그램의 순차적 부분이 아무리 작더라도 프로세서 수가 늘어남에 따라 속도 향상의 상한이 된다.

예를 들어, 100개의 프로세서로 90배의 속도 향상을 달성하려면 순차적 부분이 전체의 0.1%에 불과해야 한다. 이는 대부분의 실제 프로그램에서 달성하기 매우 어렵다.

반면 약한 확장(weak scaling)은 프로세서 수에 비례하여 문제 크기도 키우는 방식으로, 강한 확장보다 좋은 속도 향상을 얻기가 더 쉽다. 그러나 메모리 계층 구조가 약한 확장의 전통적 장점을 방해할 수 있다. 약하게 확장된 데이터셋이 멀티코어의 마지막 레벨 캐시에 맞지 않으면 오히려 강한 확장보다 성능이 나빠질 수 있다.

## 예시

```
# 암달의 법칙과 Strong Scaling
Speed-up = 1 / ((1 - f) + f/P)
  f = 병렬화 가능한 비율
  P = 프로세서 수

# 예시: 10개 스칼라 덧셈 + 100개 행렬 덧셈
순차 시간: 110t

10 프로세서: (100t/10) + 10t = 20t -> 속도향상 = 5.5 (55%)
40 프로세서: (100t/40) + 10t = 12.5t -> 속도향상 = 8.8 (22%)

# 행렬을 20x20으로 키우면 (Weak Scaling)
순차 시간: 410t
10 프로세서: (400t/10) + 10t = 50t -> 속도향상 = 8.2 (82%)
40 프로세서: (400t/40) + 10t = 20t -> 속도향상 = 20.5 (51%)
```

## 관련 개념

- [Weak Scaling](/knowledge/computer-architecture/weak-scaling/)
- [Multiprocessor](/knowledge/computer-architecture/multiprocessor/)
- [Shared Memory Multiprocessor](/knowledge/computer-architecture/shared-memory-multiprocessor/)
