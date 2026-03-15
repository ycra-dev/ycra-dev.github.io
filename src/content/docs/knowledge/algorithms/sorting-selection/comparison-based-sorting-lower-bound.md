---
title: "비교 기반 정렬 하한 (Comparison-Based Sorting Lower Bound)"
description: "비교 기반 정렬은 임의 순서의 N개 레코드를 정렬할 때 최소한 Ω(N log N)번의 비교가 필요하다는 정보 이론적 하한이다"
tags: ["Sorting Lower Bound", "Information Theory", "Complexity", "TAOCP", "Decision Tree", "Comparison Sort"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/comparison-based-sorting-lower-bound
sidebar:
  order: 35
---

## 핵심 개념

**비교 기반 정렬의 하한(Lower Bound)**은 임의 순서의 N개 레코드를 키 비교만으로 정렬할 때, 최소한 Ω(N log N)번의 비교가 필요하다는 정보 이론적 결과이다.

## 동작 원리

**정보 이론적 논증**:
- N개 원소의 가능한 순열 수: N!
- 각 비교는 최대 1비트 정보 제공 (두 가지 결과)
- N!가지 경우를 구분하려면 최소 ceil(log2(N!)) ≈ N log2(N) - N log2(e) 비교 필요

**Decision Tree 논증**:
- 비교 기반 정렬 알고리즘은 이진 결정 트리로 표현 가능
- N! 개의 잎 노드 (각각 하나의 순열에 대응)
- 이진 트리의 높이 ≥ ceil(log2(N!)) ≥ N log2(N) - O(N)
- 최악의 경우 비교 횟수 ≥ 트리의 높이

**하한 공식**:
```
최소 비교 횟수 ≥ log2(N!) = N log2(N) - N/ln2 + O(log N)
              ≈ N log2(N) - 1.4427N
```

**Stirling 근사**: `log2(N!) ≈ N log2(N) - N/ln2`

**상한과 비교**:
- 병합 정렬: 최악 N·ceil(log2(N)) - 2^{ceil(log2(N))} + 1 ≈ N log2(N)
- 힙 정렬: 최악 ≈ 2N log2(N)
- 퀵 정렬: 평균 2N ln N ≈ 1.386N log2(N), 최악 N²/2

**비교 이외의 연산**:
- 키가 정수이고 범위가 제한될 경우 기수 정렬(Radix Sort)이 O(N) 달성 가능
- 키가 균등 분포이면 주소 계산 정렬이 평균 O(N) 달성 가능

**최적 정렬**: N개 원소에 대한 최소 비교 횟수 문제는 아직 완전히 해결되지 않은 열린 문제. N ≤ 11에 대해서는 알려져 있음.

## 예시

```
N=4 하한 계산:
  log2(4!) = log2(24) ≈ 4.58
  따라서 최소 5번 비교 필요

실제:
  삽입 정렬: 최대 C(4,2)=6, 평균 4.5비교
  최적: 5번 비교로 4원소 정렬 가능 ✓

N=10 하한:
  log2(10!) = log2(3628800) ≈ 21.8
  따라서 최소 22번 비교 필요

N=1000000:
  log2(N!) ≈ 1000000 × 20 - 1.44 × 1000000 ≈ 18.56 × 10^6
  병합 정렬: ≈ 20 × 10^6 비교 (거의 최적)
```

## 관련 개념

- [비교 정렬 하한 (Comparison Sort Lower Bound)](/knowledge/algorithms/comparison-sort-lower-bound/)
- [최소 비교 정렬 (Minimum-Comparison Sorting)](/knowledge/algorithms/sorting-selection/minimum-comparison-sorting/)
- [정렬 복잡도 이론 (Sorting Complexity Theory)](/knowledge/algorithms/sorting-selection/sorting-complexity-theory/)
- [Sorting Overview](/knowledge/algorithms/sorting-selection/sorting-overview/)
