---
title: "Span"
description: "Span은 무제한 프로세서에서 병렬 계산을 수행하는 데 걸리는 최소 시간으로, 계산 trace(DAG)에서 가장 긴 경로(임계 경로, critical path)의 가중치 합이다"
tags: ['Span', 'Critical Path', 'Parallel Computing', 'Work Span Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/span
sidebar:
  order: 17
---

## 핵심 개념

Span은 병렬 알고리즘의 본질적인 직렬 의존성을 나타낸다. 아무리 많은 프로세서를 사용해도 span보다 빠르게 실행할 수 없다.

**Span Law (span 법칙)**: T_P >= T_∞

Span 분석의 핵심 원리:
- **직렬 합성**: 두 trace가 직렬로 연결되면 span은 **합산**된다
- **병렬 합성**: 두 trace가 병렬로 연결되면 span은 **최댓값**이 된다

parallel for 루프의 span:
```
T_∞(n) = Θ(lg n) + max{iter_∞(i) : 1 ≤ i ≤ n}
```
여기서 Θ(lg n)은 재귀적 spawning의 깊이이다.

탐욕적 스케줄러에서 불완전 단계(incomplete step)마다 남은 span이 1씩 감소하므로, 불완전 단계의 수는 최대 T_∞이다.

## 예시

P-FIB(n)의 span 분석:
```
T_∞(n) = max{T_∞(n-1), T_∞(n-2)} + Θ(1)
        = T_∞(n-1) + Θ(1)
        = Θ(n)
```

P-MAT-VEC의 span:
```
T_∞(n) = Θ(lg n) + Θ(n) = Θ(n)
```
(parallel for의 제어 Θ(lg n) + 내부 직렬 for 루프 Θ(n))

P-MATRIX-MULTIPLY-RECURSIVE의 span:
```
M_∞(n) = M_∞(n/2) + Θ(lg n) = Θ(lg^2 n)
```

## 관련 개념

- [Work](/knowledge/algorithms/work/) - 단일 프로세서에서의 총 작업량
- [Parallelism](/knowledge/algorithms/parallelism/) - work를 span으로 나눈 비율
- [Speedup](/knowledge/algorithms/speedup/) - 병렬화로 인한 성능 향상
- [Fork-Join Parallelism](/knowledge/algorithms/fork-join-parallelism/) - span 분석의 기반 모델
