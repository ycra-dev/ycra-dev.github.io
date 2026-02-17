---
title: "Parallelism"
description: "Parallelism(병렬성)은 병렬 계산의 work와 span의 비율 T_1/T_∞로 정의되며, 임계 경로의 각 단계에서 평균적으로 수행 가능한 병렬 작업량을 나타낸다"
tags: ['Parallelism', 'Parallel Computing', 'Work Span Analysis', 'Scalability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/parallelism
sidebar:
  order: 19
---

## 핵심 개념

Parallelism은 세 가지 관점에서 해석할 수 있다:

1. **비율로서**: 임계 경로의 각 단계당 평균 병렬 작업량
2. **상한으로서**: 어떤 수의 프로세서에서도 달성 가능한 최대 speedup
3. **한계로서**: 프로세서 수가 parallelism을 초과하면 완벽한 선형 speedup 불가

Greedy 스케줄러는 다음을 보장한다 (Theorem 26.1):
```
T_P <= T_1/P + T_∞
```

Corollary 26.2: greedy 스케줄러는 항상 최적의 2배 이내 성능을 달성한다.

Corollary 26.3: slackness가 충분히 크면 (P << T_1/T_∞), T_P ≈ T_1/P로 거의 완벽한 선형 speedup을 달성한다.

## 예시

P-FIB(n)의 parallelism:
```
T_1(n)/T_∞(n) = Θ(φ^n/n)
```
n이 커질수록 parallelism이 기하급수적으로 증가한다.

P-MAT-VEC의 parallelism:
```
T_1/T_∞ = Θ(n^2)/Θ(n) = Θ(n)
```

P-MATRIX-MULTIPLY-RECURSIVE의 parallelism:
```
M_1/M_∞ = Θ(n^3)/Θ(lg^2 n) = Θ(n^3/lg^2 n)
```
매우 높은 parallelism을 보인다.

병렬 Strassen의 parallelism:
```
Θ(n^{lg 7}/lg^2 n)
```

## 관련 개념

- [Work](/knowledge/algorithms/work/) - parallelism의 분자
- [Span](/knowledge/algorithms/span/) - parallelism의 분모
- [Speedup](/knowledge/algorithms/speedup/) - parallelism이 상한을 결정
- [Fork-Join Parallelism](/knowledge/algorithms/fork-join-parallelism/) - parallelism 분석의 기반
- [Parallel Merge Sort](/knowledge/algorithms/parallel-merge-sort/) - 높은 parallelism을 달성하는 알고리즘
