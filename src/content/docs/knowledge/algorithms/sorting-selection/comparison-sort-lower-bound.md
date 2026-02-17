---
title: "Comparison Sort Lower Bound"
description: "비교 정렬 하한(Comparison Sort Lower Bound)은 원소 간 비교만으로 정렬 순서를 결정하는 모든 비교 정렬 알고리즘이 최악의 경우 반드시 Omega(n lg n)번의 비교를 수행해야 함을 증명한 정보 이론적 하한이다"
tags: ['Comparison Sort Lower Bound', 'Decision Tree', 'Lower Bound', 'Sorting', 'Omega N Lg N']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/comparison-sort-lower-bound
sidebar:
  order: 11
---

## 핵심 개념

**비교 정렬(Comparison Sort)**: 원소들의 상대적 순서를 오직 원소 간 비교(<=, >=, <, >, =)를 통해서만 파악하는 정렬 알고리즘. 삽입 정렬, 병합 정렬, 힙정렬, 퀵정렬이 모두 비교 정렬이다.

**결정 트리 모델(Decision Tree Model)**:
- 비교 정렬을 완전 이진 트리로 추상화
- 내부 노드: 비교 연산 a_i <= a_j
- 리프: 정렬 결과를 나타내는 순열
- 루트에서 리프까지의 경로 = 알고리즘의 실행 과정
- 알고리즘의 최악의 경우 비교 횟수 = 결정 트리의 높이

**Theorem 8.1 증명**:
- n개 원소의 가능한 순열 = n!개
- 올바른 정렬 알고리즘은 n!개의 모든 순열을 구별해야 함 -> 최소 n!개의 도달 가능한 리프 필요
- 높이 h인 이진 트리의 최대 리프 수 = 2^h
- 따라서: n! <= l <= 2^h
- h >= lg(n!) = Omega(n lg n) (스털링 근사에 의해)

**Corollary 8.2**: 힙정렬과 병합 정렬은 점근적으로 최적인 비교 정렬이다.
- 상한 O(n lg n)이 하한 Omega(n lg n)과 일치하기 때문

이 하한은 비교 모델에만 적용된다. 원소의 실제 값을 사용하여 정렬 순서를 결정하는 알고리즘(계수 정렬, 기수 정렬, 버킷 정렬)에는 적용되지 않으므로, 이들은 특정 조건에서 선형 시간 정렬이 가능하다.

## 예시

n = 3일 때 삽입 정렬의 결정 트리:

```
              a1 <= a2?
             /        \
           yes         no
          /              \
      a2 <= a3?       a1 <= a3?
      /      \        /       \
    yes       no    yes        no
   <1,2,3>  a1<=a3? <2,1,3>  a2<=a3?
            /    \           /     \
          yes     no       yes      no
        <1,3,2> <3,1,2>  <2,3,1>  <3,2,1>
```

- 3! = 6개의 리프 (모든 순열을 표현)
- 높이 h = 3 >= lg(6) = 2.58...
- 최악의 경우 3번의 비교 필요

## 관련 개념

- [Heapsort](/knowledge/algorithms/heapsort/)
- [Merge Sort](/knowledge/algorithms/merge-sort/)
- [Quicksort](/knowledge/algorithms/quicksort/)
- [Counting Sort](/knowledge/algorithms/counting-sort/)
- [Radix Sort](/knowledge/algorithms/radix-sort/)
- [Bucket Sort](/knowledge/algorithms/bucket-sort/)
- [Asymptotic Notation](/knowledge/algorithms/asymptotic-notation/)
- [Order of Growth](/knowledge/algorithms/order-of-growth/)
