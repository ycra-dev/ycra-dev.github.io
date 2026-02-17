---
title: "Competitive Analysis"
description: "경쟁 분석(Competitive Analysis)은 온라인 알고리즘의 성능을 미래 입력을 모두 아는 최적 오프라인 알고리즘과 비교하여 최악의 경우 비율을 측정하는 분석 기법이다"
tags: ['Competitive Analysis', 'Online Algorithm', 'Worst Case', 'Approximation Ratio']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/competitive-analysis
sidebar:
  order: 13
---

## 핵심 개념

최소화 문제에서, 입력 I에 대해 온라인 알고리즘 A의 결과값이 A(I)이고 미래를 아는 최적 알고리즘 F의 결과값이 F(I)일 때, 경쟁비(competitive ratio)는:

```
경쟁비 = max{A(I)/F(I) : I ∈ U}
```

경쟁비가 c인 알고리즘을 **c-competitive**하다고 한다. 경쟁비는 항상 1 이상이며, 1에 가까울수록 좋다.

핵심 특성:
- 최악의 미래 입력에 대해서도 일정 수준의 성능을 보장
- 알고리즘이 미래를 모르는 것이 최대 얼마나 큰 불이익인지 정량화
- 결정론적 알고리즘은 적대자(adversary)가 입력을 조작할 수 있어 한계가 있음
- 무작위화를 도입하면 oblivious adversary에 대해 더 좋은 경쟁비 달성 가능

경쟁비는 근사 알고리즘의 근사비(approximation ratio)와 유사한 개념으로, 두 분야는 분석 기법을 공유한다.

## 예시

엘리베이터 문제의 세 전략 비교:
```
1. "항상 계단": 경쟁비 = k (최악: 엘리베이터 즉시 도착 시)
2. "항상 엘리베이터": 경쟁비 = B/k (최악: 엘리베이터 매우 늦게 도착)
3. "k분 대기 후 계단": 경쟁비 = 2 (k, B에 무관!)
```

캐시 문제에서의 경쟁비:
```
- LIFO: Θ(n/k) — 입력 크기에 비례 (unbounded)
- LRU: Θ(k) — 캐시 크기에만 의존
- FIFO: Θ(k) — 캐시 크기에만 의존
- 모든 결정론적 알고리즘: Ω(k) 하한
- 무작위화 MARKING: O(lg k) — 크게 개선!
```

## 관련 개념

- [Online Algorithm](/knowledge/algorithms/online-algorithm/) - 경쟁 분석의 대상
- [Online Caching](/knowledge/algorithms/online-caching/) - 경쟁 분석의 주요 적용 사례
- [Move-to-Front](/knowledge/algorithms/move-to-front/) - 4-competitive 리스트 유지 알고리즘
- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - 유사한 비율 기반 분석 기법
