---
title: "Divide and Conquer"
description: "분할 정복(Divide and Conquer)은 문제를 동일한 유형의 더 작은 부분 문제로 나누고, 각 부분 문제를 재귀적으로 풀고, 해를 결합하여 원래 문제의 해를 구하는 알고리즘 설계 패러다임이다"
tags: ['Divide And Conquer', 'Algorithm Design', 'Recursion']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/divide-and-conquer
sidebar:
  order: 15
---

## 핵심 개념

분할 정복 알고리즘은 재귀적(recursive) 구조를 가지며 세 가지 특징적 단계를 수행한다:

1. **분할(Divide)**: 문제를 같은 유형의 더 작은 부분 문제 하나 이상으로 나눈다
2. **정복(Conquer)**: 부분 문제를 재귀적으로 풀어 해결한다
3. **결합(Combine)**: 부분 문제의 해를 합쳐 원래 문제의 해를 구성한다

문제가 충분히 작으면(기저 사례, base case) 직접 풀고, 그렇지 않으면 재귀한다.

분할 정복의 수행 시간은 점화식(recurrence)으로 자연스럽게 표현된다:
- a개의 부분 문제, 각각 크기 n/b
- D(n): 분할 비용, C(n): 결합 비용
- T(n) = aT(n/b) + D(n) + C(n)

## 예시

```
분할 정복 알고리즘 예시:

1. 병합 정렬 (Merge Sort):
   분할: 배열을 반으로 나눔 — Θ(1)
   정복: 각 절반을 재귀 정렬 — 2T(n/2)
   결합: 정렬된 절반을 병합 — Θ(n)
   → T(n) = Θ(n lg n)

2. 행렬 곱셈 (Strassen):
   분할: n×n 행렬을 (n/2)×(n/2) 부분행렬로 분할
   정복: 7번의 재귀 곱셈 (일반적 8번 대신)
   결합: 행렬 덧셈/뺄셈
   → T(n) = Θ(n^lg7) ≈ Θ(n^2.81)
```

## 관련 개념

- [Merge Sort](/knowledge/algorithms/merge-sort/)
- [Recurrence](/knowledge/algorithms/recurrence/)
- [Algorithm](/knowledge/algorithms/algorithm/)
