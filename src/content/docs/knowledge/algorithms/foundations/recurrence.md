---
title: "Recurrence"
description: "점화식(Recurrence)은 더 작은 입력에 대한 같은 함수의 값으로 전체 수행 시간 T(n)을 기술하는 수학적 등식 또는 부등식이다"
tags: ['Recurrence', 'Recursion', 'Running Time', 'Mathematical Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/recurrence
sidebar:
  order: 9
---

## 핵심 개념

알고리즘이 재귀 호출을 포함할 때, 수행 시간은 자연스럽게 점화식으로 표현된다. 분할 정복 알고리즘의 일반적 점화식 형태:

T(n) = aT(n/b) + f(n)

여기서:
- a: 부분 문제의 개수
- n/b: 각 부분 문제의 크기
- f(n): 분할과 결합에 드는 비용

**관례:**
- n/b가 정수가 아닌 경우 바닥/천장 함수를 무시해도 점근적 증가율에는 영향 없음
- 기저 사례 T(n) = Θ(1) (n < n₀)은 보통 생략
- 점화식의 해를 구하는 방법은 Chapter 4에서 상세히 다룸

## 예시

```
대표적 점화식과 그 해:

병합 정렬: T(n) = 2T(n/2) + Θ(n)
  → T(n) = Θ(n lg n)

이진 탐색: T(n) = T(n/2) + Θ(1)
  → T(n) = Θ(lg n)

스트라센 행렬 곱셈: T(n) = 7T(n/2) + Θ(n²)
  → T(n) = Θ(n^lg7)

재귀 트리로 병합 정렬 분석:
  레벨 0: c₂n          (1개 노드)
  레벨 1: c₂n/2 × 2    (2개 노드)
  레벨 2: c₂n/4 × 4    (4개 노드)
  ...
  레벨 i: c₂n/2^i × 2^i = c₂n
  → 각 레벨 비용 c₂n, 총 lg n + 1개 레벨
  → T(n) = c₂n·lg n + c₁n = Θ(n lg n)
```

## 관련 개념

- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/)
- [Merge Sort](/knowledge/algorithms/merge-sort/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
