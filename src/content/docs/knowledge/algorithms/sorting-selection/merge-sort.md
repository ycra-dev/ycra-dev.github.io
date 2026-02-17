---
title: "Merge Sort"
description: "병합 정렬(Merge Sort)은 분할 정복(divide-and-conquer) 패러다임을 따르는 정렬 알고리즘으로, 배열을 반으로 나누어 재귀적으로 정렬한 후 병합하여 최종 정렬된 배열을 생성한다"
tags: ['Sorting', 'Divide And Conquer', 'Comparison Sort', 'Stable Sort']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/merge-sort
sidebar:
  order: 2
---

## 핵심 개념

병합 정렬은 세 단계로 동작한다:
1. **분할(Divide)**: 배열 A[p:r]의 중간점 q를 계산하여 A[p:q]와 A[q+1:r]로 분할 — Θ(1)
2. **정복(Conquer)**: 두 부분 배열을 재귀적으로 병합 정렬 — 2T(n/2)
3. **결합(Combine)**: 두 정렬된 부분 배열을 하나의 정렬된 배열로 병합 — Θ(n)

**시간 복잡도:** 모든 경우에 Θ(n lg n)
- 점화식: T(n) = 2T(n/2) + Θ(n)
- 재귀 트리로 분석하면 lg n + 1개의 레벨이 있고, 각 레벨의 비용이 Θ(n)

**특성:**
- 안정(stable) 정렬
- 제자리 정렬이 아님: Θ(n)의 추가 메모리 필요 (임시 배열 L, R)
- 대규모 입력에서 삽입 정렬보다 훨씬 우수 (n² vs n lg n)

삽입 정렬이 Θ(n²)인 것에 비해, 병합 정렬은 n의 인수를 lg n으로 대체한다. n이 충분히 크면 lg n이 n보다 훨씬 작으므로 병합 정렬이 유리하다.

## 예시

```
MERGE-SORT(A, p, r)
  if p ≥ r         // 원소가 0개 또는 1개?
    return
  q = ⌊(p + r)/2⌋  // 중간점
  MERGE-SORT(A, p, q)      // 왼쪽 절반 정렬
  MERGE-SORT(A, q+1, r)    // 오른쪽 절반 정렬
  MERGE(A, p, q, r)        // 병합

실행 예시: A = ⟨12, 3, 7, 9, 14, 6, 11, 2⟩
  분할: ⟨12,3,7,9⟩ | ⟨14,6,11,2⟩
  분할: ⟨12,3⟩|⟨7,9⟩ | ⟨14,6⟩|⟨11,2⟩
  분할: ⟨12⟩|⟨3⟩|⟨7⟩|⟨9⟩ | ⟨14⟩|⟨6⟩|⟨11⟩|⟨2⟩
  병합: ⟨3,12⟩|⟨7,9⟩ | ⟨6,14⟩|⟨2,11⟩
  병합: ⟨3,7,9,12⟩ | ⟨2,6,11,14⟩
  병합: ⟨2,3,6,7,9,11,12,14⟩
```

## 관련 개념

- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/)
- [Recurrence](/knowledge/algorithms/recurrence/)
- [Insertion Sort](/knowledge/algorithms/insertion-sort/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
