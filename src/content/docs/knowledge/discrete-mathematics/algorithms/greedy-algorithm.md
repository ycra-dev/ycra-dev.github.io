---
title: "Greedy Algorithm"
description: "탐욕 알고리즘(Greedy Algorithm)은 최적화 문제에서 각 단계마다 그 순간에 가장 좋아 보이는 선택(locally optimal choice)을 하여 전체 문제의 해를 구하는 알고리즘 패러다임이다"
tags: ['Greedy Algorithm', 'Optimization', 'Algorithmic Paradigm', 'Cashier Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/greedy-algorithm
sidebar:
  order: 6
---

## 핵심 개념

탐욕 알고리즘은 가능한 모든 단계의 조합을 고려하는 대신, 각 단계에서 지역적으로 최선의 선택을 한다. 이 접근법의 핵심 장점은 단순성과 효율성이다.

**탐욕 알고리즘의 사용 절차:**
1. 탐욕적 선택 기준을 정의한다.
2. 알고리즘이 유효한 해(feasible solution)를 생성하는지 확인한다.
3. 그 해가 최적해(optimal solution)인지 증명하거나, 반례를 통해 최적이 아님을 보인다.

**주의사항**: 탐욕 알고리즘이 최적해를 주는지 반드시 증명해야 한다. "탐욕적"이라는 명칭은 최적 여부와 무관하게 붙인다.

### 예시 문제: 거스름돈 문제 (Cashier's Algorithm)
25센트, 10센트, 5센트, 1센트 동전으로 n센트를 거슬러 줄 때, 가장 큰 단위의 동전부터 사용하는 탐욕 알고리즘이다. 미국 동전 체계에서는 이 알고리즘이 항상 최적해를 준다(Lemma 1과 Theorem 1로 증명됨). 그러나 다른 동전 체계(예: 25센트, 10센트, 1센트만 있을 때)에서는 최적이 아닐 수 있다.

### 예시 문제: 강연 스케줄링
여러 강연의 시작/종료 시간이 주어졌을 때, 최대한 많은 강연을 스케줄링하는 문제이다.
- **가장 빨리 시작하는 강연 선택** → 반례 존재 (최적 아님)
- **가장 짧은 강연 선택** → 반례 존재 (최적 아님)
- **가장 빨리 끝나는 강연 선택** → 최적해 보장 (수학적 귀납법으로 증명 가능)

이처럼 같은 문제에 대해 여러 탐욕적 기준이 가능하며, 올바른 기준 선택이 중요하다.

## 예시

**거스름돈 알고리즘 의사코드:**

```
procedure change(c1, c2, ..., cr: denominations, c1 > c2 > ... > cr; n: positive integer)
  for i := 1 to r
    di := 0
    while n >= ci
      di := di + 1
      n := n - ci
```

67센트를 거슬러 줄 때 (25, 10, 5, 1센트):
- 25센트 1개 (남은 42센트)
- 25센트 1개 (남은 17센트)
- 10센트 1개 (남은 7센트)
- 5센트 1개 (남은 2센트)
- 1센트 2개 → 총 6개 동전 (최적)

30센트를 거슬러 줄 때 (25, 10, 1센트만 가능, 5센트 없음):
- 탐욕: 25센트 1개 + 1센트 5개 = 6개 동전
- 최적: 10센트 3개 = 3개 동전 → 탐욕이 최적이 아닌 반례

**강연 스케줄링 의사코드:**

```
procedure schedule(s1,...,sn: start times, e1,...,en: end times)
  sort talks by finish time: e1 <= e2 <= ... <= en
  S := empty set
  for j := 1 to n
    if talk j is compatible with S then
      S := S union {talk j}
  return S
```

## 관련 개념

- [Algorithm](/knowledge/mathematics/algorithm/) - 알고리즘의 기본 개념
- [Time Complexity](/knowledge/mathematics/time-complexity/) - 탐욕 알고리즘의 효율성 분석
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 최적성 증명의 중요성
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 탐욕 알고리즘의 최적성을 귀류법으로 증명
- [Sorting Algorithm](/knowledge/mathematics/sorting-algorithm/) - 스케줄링 문제에서 정렬이 전처리로 사용됨
