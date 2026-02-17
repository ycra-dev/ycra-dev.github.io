---
title: "Insertion Sort"
description: "삽입 정렬(Insertion Sort)은 배열의 각 원소를 이미 정렬된 부분 배열의 올바른 위치에 삽입하는 증분적(incremental) 정렬 알고리즘이다"
tags: ['Sorting', 'Incremental', 'In Place', 'Comparison Sort']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/insertion-sort
sidebar:
  order: 1
---

## 핵심 개념

삽입 정렬은 카드 게임에서 손에 든 카드를 정렬하는 방식과 유사하게 동작한다. 두 번째 원소부터 시작하여 각 원소를 이미 정렬된 왼쪽 부분 배열에서 적절한 위치를 찾아 삽입한다.

**시간 복잡도:**
- 최선의 경우(이미 정렬됨): Θ(n) — 각 원소가 제자리에 있어 비교만 n-1번
- 최악의 경우(역순 정렬): Θ(n²) — 각 원소를 모든 이전 원소와 비교
- 평균의 경우: Θ(n²) — 평균적으로 부분 배열의 절반을 비교

**특성:**
- 제자리(in-place) 정렬: 추가 메모리 O(1)
- 안정(stable) 정렬: 동일한 키의 상대적 순서 유지
- 소규모 입력에서 효율적이며, 거의 정렬된 데이터에 특히 유리

## 예시

```
INSERTION-SORT(A, n)
  for i = 2 to n
    key = A[i]
    // A[i]를 정렬된 부분 배열 A[1:i-1]에 삽입
    j = i - 1
    while j > 0 and A[j] > key
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key

실행 예시: A = ⟨5, 2, 4, 6, 1, 3⟩
  i=2: key=2, ⟨2, 5, 4, 6, 1, 3⟩
  i=3: key=4, ⟨2, 4, 5, 6, 1, 3⟩
  i=4: key=6, ⟨2, 4, 5, 6, 1, 3⟩
  i=5: key=1, ⟨1, 2, 4, 5, 6, 3⟩
  i=6: key=3, ⟨1, 2, 3, 4, 5, 6⟩
```

## 관련 개념

- [Algorithm](/knowledge/algorithms/algorithm/)
- [Loop Invariant](/knowledge/algorithms/loop-invariant/)
- [Merge Sort](/knowledge/algorithms/merge-sort/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
