---
title: "오름차순 런 (Ascending Runs)"
description: "런(Run)은 순열에서 연속적인 오름차순 최대 구간으로, 정렬 알고리즘의 이미 정렬된 구간을 나타내며 외부 정렬에서 핵심 개념이다"
tags: ["Ascending Runs", "Permutations", "Sorting", "Combinatorics", "TAOCP", "External Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/ascending-runs
sidebar:
  order: 24
---

## 핵심 개념

순열 a1 a2 ... an에서 **런(run)**은 연속적인 오름차순 최대 구간이다. 구체적으로, aj > aj+1인 위치마다 수직선을 그어 분리되는 구간들이다.

예: |3 5 7| 1 6 8 9| 4| 2|는 4개의 런을 가진다.

런은 정렬 알고리즘의 이미 정렬된 구간을 나타내므로, 정렬 이론에서 중요한 개념이다. 외부 정렬의 replacement-selection에서도 핵심 개념이다.

## 동작 원리

**평균 런 수**: n개 원소 무작위 순열의 평균 런 수 = **(n+1)/2 ≈ n/2**

**k번째 런의 평균 길이** (Gassner, 1967):
```
k:    1      2      3      4      ...
Lk: 1.718  2.097  1.990  2.001  → 2
```
- L1 = e-1 ≈ 1.718 (첫 번째 런 평균 길이)
- 이후 런들의 평균 길이는 2로 수렴 (L_k → 2)

**Simon Newcomb 문제**: 카드 덱을 오름차순이 유지되는 동안 한 더미에 쌓다가, 더 낮은 카드가 나오면 새 더미를 시작. 형성되는 더미의 수의 분포가 바로 런의 분포.

**MacMahon 대칭성**: {p·1, p·2, ..., p·m} 멀티셋에서 k+1 런의 순열 수 = mp-p-k+1 런의 순열 수.

**오일러 수와의 관계**: 정확히 k+1개의 런을 가지는 n원소 순열의 수가 오일러 수 <n k>이다.

## 예시

```
순열: | 3 5 7 | 1 6 8 9 | 4 | 2 |
런 수: 4

무한 수열에서 k번째 런 평균 길이:
k:    1      2      3      4      ...
Lk: 1.718  2.097  1.990  2.001  → 2

Bridge 덱 예 (m=13, p=4):
  평균 더미 수 = (mp-p+2)/2 = (52-4+2)/2 = 25
```

## 관련 개념

- [오일러 수 (Eulerian Numbers)](/knowledge/algorithms/sorting-selection/eulerian-numbers/)
- [Sorting Overview](/knowledge/algorithms/sorting-selection/sorting-overview/)
- [직접 삽입 정렬 (Straight Insertion Sort)](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
