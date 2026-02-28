---
title: "Sorting Overview (TAOCP)"
description: "정렬(Sorting)은 N개의 레코드를 키(key) 값의 순서로 재배열하는 과정으로, 컴퓨터 과학에서 가장 기본적인 연산 중 하나이다"
tags: ["Sorting", "TAOCP", "Algorithms", "Internal Sorting", "External Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/sorting-overview
sidebar:
  order: 19
---

## 핵심 개념

정렬은 N개의 레코드 R1, R2, ..., RN을 키(key) 값의 오름차순(또는 내림차순)으로 재배열하는 과정이다. 수학적으로는 인덱스 집합 {1, 2, ..., N}의 순열 p(1) p(2) ... p(N)을 결정하여 K_p(1) ≤ K_p(2) ≤ ... ≤ K_p(N)이 되도록 하는 것이다.

1960년대 컴퓨터 제조사 추정에 따르면, 전체 컴퓨팅 시간의 25% 이상이 정렬에 사용되었다. 정렬의 주요 응용:

- **동질성 문제 해결**: 같은 식별자를 가진 항목들을 한곳에 모음
- **두 파일의 항목 매칭**: 정렬된 파일들을 순차적으로 훑어 매칭 항목 발견
- **키 값으로 정보 검색**: 이진 탐색 등 효율적 탐색의 전제 조건

## 동작 원리

**정렬의 분류**:

- **내부 정렬(Internal Sorting)**: 모든 레코드가 고속 메모리에 들어갈 때
- **외부 정렬(External Sorting)**: 레코드가 너무 많아 전부 메모리에 올릴 수 없을 때

**비교 기반 정렬의 이론적 하한**: N log N 비교. 키가 연속적 분포를 따를 경우 평균 O(N) 정렬이 가능하다.

**안정 정렬(Stable Sorting)**: 동등한 키를 가진 레코드들이 원래의 상대적 순서를 유지하는 성질.

```
파일: R1, R2, ..., RN  (각 레코드 Rj는 키 Kj를 가짐)
목표: Kp(1) ≤ Kp(2) ≤ ... ≤ Kp(N)

안정 정렬 조건:
Kp(i) = Kp(j), i < j  =>  p(i) < p(j)
```

## 예시

```
예: [5, 3, 8, 1, 9, 2, 4, 7, 6]
정렬 후: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 관련 개념

- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
- [Stable Sorting](/knowledge/algorithms/sorting-selection/stable-sorting/)
- [Straight Insertion Sort](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [Sorting Algorithm](/knowledge/algorithms/sorting-algorithm/)
- [Comparison Sort Lower Bound](/knowledge/algorithms/comparison-sort-lower-bound/)
