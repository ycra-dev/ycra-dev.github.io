---
title: "결정 트리 (Decision Tree)"
description: "결정 트리(decision tree)는 각 내부 정점이 하나의 결정(decision)에 대응하고, 그 결정의 가능한 결과에 대해 서브트리가 존재하는 루트 트리이다"
tags: ['Decision Tree', 'Tree', 'Sorting Complexity', 'Lower Bound', 'Comparison Sort']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/decision-tree
sidebar:
  order: 4
---

## 핵심 개념

결정 트리는 일련의 결정을 통해 해를 찾는 과정을 모델링한다. 대표적인 활용 분야:

**1. 위조 동전 문제**:
- 천칭 저울로 8개 동전 중 가벼운 위조 동전 찾기
- 각 저울질의 결과: 왼쪽 무거움 / 균형 / 오른쪽 무거움 → 3-진 결정 트리
- 최소 저울질 횟수 = 결정 트리의 높이 >= ceil(log_3(8)) = 2

**2. 비교 기반 정렬의 하한 (핵심 응용)**:
- n개 원소의 정렬은 n!가지 순열 중 하나를 결정하는 것
- 이진 비교 기반 정렬 → 이진 결정 트리
- 잎의 수 >= n! (각 순열이 최소 하나의 잎에 대응)
- **정리 1**: 이진 비교 기반 정렬은 최소 ceil(log_2(n!))번의 비교가 필요
- **따름정리**: 비교 기반 정렬의 최악 비교 횟수는 Omega(n log n)
- 병합 정렬(merge sort)은 Theta(n log n)이므로 최적의 정렬 알고리즘

**3. 평균 복잡도**:
- 정렬의 평균 비교 횟수 = 결정 트리에서 잎의 평균 깊이
- 이진 트리에서 잎의 평균 깊이는 Omega(log N), N = n!이면 평균도 Omega(n log n)

## 예시

```
3개 원소 a, b, c 정렬의 결정 트리:

            a : b
           /     \
        a>b       a<b
        /           \
     b : c         b : c
    /     \       /     \
  b>c    b<c   b>c     b<c
   |      |     |       |
 a>b>c  a:c   c>b>a   a:c
        / \           / \
     a>c  a<c      b>a>c b>c>a
      |    |
   a>c>b c>a>b

잎 = 6개 = 3! (모든 순열)
높이 = 3
하한: ceil(log_2(6)) = ceil(2.585) = 3 ✓

n = 10일 때:
- 하한: ceil(log_2(10!)) = ceil(log_2(3628800)) = ceil(21.8) = 22
- 최소 22번 비교 필요
```

## 관련 개념

- [Rooted Tree](/knowledge/mathematics/rooted-tree/) - 결정 트리의 기반 구조
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 결정 트리로 모델링되는 알고리즘
- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/big-o-notation/) - 정렬 알고리즘의 하한 분석
- [Binary Search Tree](/knowledge/mathematics/binary-search-tree/) - 결정 트리의 특수한 경우
