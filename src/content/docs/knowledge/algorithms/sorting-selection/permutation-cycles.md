---
title: "Permutation Cycles"
description: "순열의 사이클(cycle)은 순열을 분리된 순환 구조로 표현하는 방법으로, 모든 순열은 서로소인 사이클들의 곱으로 유일하게 표현된다"
tags: ["Permutation Cycles", "Permutations", "Combinatorics", "TAOCP", "Group Theory"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/permutation-cycles
sidebar:
  order: 22
---

## 핵심 개념

순열의 **사이클(cycle)**은 순열을 분리된 순환 구조로 표현하는 방법이다. 순열 π에서 원소 x1은 x2로, x2는 x3로, ..., xk는 다시 x1으로 매핑될 때 (x1 x2 ... xk)를 k-사이클이라 한다. 고정점(fixed point)은 1-사이클이다.

모든 순열은 서로소인(disjoint) 사이클들의 곱으로 유일하게 표현된다 (순서 무관).

## 동작 원리

**삽입곱(Intercalation Product)**: Foata(1965)가 도입한 개념으로, 두 멀티셋 순열 α와 β의 삽입곱 α ⊎ β는:
1. 두 줄 표기법으로 나타낸 후
2. 나란히 붙이고
3. 윗 줄 기준으로 안정적으로 정렬

하여 구한다. 이 연산은 결합법칙을 만족한다.

**Foata 대응(Theorem B)**: 멀티셋 순열들 사이에는 일대일 대응이 존재하며, 이 대응은 두 줄 표기법의 컬럼 열에서 x < y인 컬럼 수를 런(run)의 수로 변환한다.

**대합(Involution)**: 자기 자신이 역원인 순열. 사이클 표현에서 1-사이클과 2-사이클만으로 구성된 순열이 대합이다.

## 예시

```
순열 π: 1→3, 2→1, 3→4, 4→2, 5→5
사이클 표현: (1 3 4 2)(5)
  - (1 3 4 2): 1→3→4→2→1
  - (5): 5→5 (고정점)

대합의 예: (1 2)(3 4)(5) - 2-사이클 두 개, 1-사이클 하나
  π = π^(-1) 을 만족

멀티셋 순열의 삽입곱 예:
c a d a b ⊎ b d d a d = c a b d d a b d a d
(두 줄 표기법을 합쳐 첫째 줄 기준 안정 정렬)
```

## 관련 개념

- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
- [Involutions](/knowledge/algorithms/sorting-selection/involutions/)
- [Young Tableau](/knowledge/algorithms/sorting-selection/young-tableau/)
- [Intercalation Product](/knowledge/algorithms/sorting-selection/intercalation-product/)
