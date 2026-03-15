---
title: "분할 (Partition)"
description: "PARTITION은 배열의 부분 배열 A[p:r]을 피벗 원소를 기준으로 제자리에서 재배열하여, 피벗보다 작거나 같은 원소들을 왼쪽에, 큰 원소들을 오른쪽에 배치하고 피벗의 최종 인덱스를 반환하는 프로시저이다"
tags: ['Partition', 'Quicksort', 'Pivot', 'In Place', 'Loop Invariant']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/partition
sidebar:
  order: 9
---

## 핵심 개념

PARTITION은 퀵정렬의 핵심 서브루틴이다. Lomuto의 분할 방식을 사용하며, 항상 마지막 원소 A[r]을 피벗으로 선택한다.

```
PARTITION(A, p, r)
1  x = A[r]             // the pivot
2  i = p - 1            // highest index into the low side
3  for j = p to r - 1   // process each element other than the pivot
4      if A[j] <= x     // does this element belong on the low side?
5          i = i + 1    // index of a new slot in the low side
6          exchange A[i] with A[j]   // put this element there
7  exchange A[i + 1] with A[r]       // pivot goes just to the right of the low side
8  return i + 1         // new index of the pivot
```

**네 개의 영역을 유지**:
1. A[p:i] - 피벗 이하의 원소들 (저쪽)
2. A[i+1:j-1] - 피벗 초과의 원소들 (고쪽)
3. A[j:r-1] - 아직 미처리 원소들
4. A[r] - 피벗

**루프 불변식(Loop Invariant)**:
for 루프의 각 반복 시작 시:
1. p <= k <= i이면, A[k] <= x
2. i+1 <= k <= j-1이면, A[k] > x
3. k = r이면, A[k] = x

**정확성 증명**:
- 초기화: i = p-1, j = p이므로 저쪽과 고쪽 모두 비어 있어 자명하게 만족
- 유지: A[j] > x이면 j만 증가, A[j] <= x이면 i 증가 후 교환 -> 불변식 유지
- 종료: j = r일 때, 미처리 영역이 비고 모든 원소가 분류됨

**시간 복잡도**: Theta(n) - n = r - p + 1 크기의 부분 배열에 대해 정확히 r - p번의 비교 수행.

Hoare의 원본 PARTITION은 양쪽 끝에서 안쪽으로 탐색하는 방식으로, 모든 원소가 같은 경우에 더 나은 성능을 보인다.

## 예시

A = [2, 8, 7, 1, 3, 5, 6, 4], 피벗 x = A[8] = 4:

```
j=1: A[1]=2 <= 4 -> i=1, swap(A[1],A[1]) -> [2, 8, 7, 1, 3, 5, 6, 4]
j=2: A[2]=8 > 4  -> 변화 없음
j=3: A[3]=7 > 4  -> 변화 없음
j=4: A[4]=1 <= 4 -> i=2, swap(A[2],A[4]) -> [2, 1, 7, 8, 3, 5, 6, 4]
j=5: A[5]=3 <= 4 -> i=3, swap(A[3],A[5]) -> [2, 1, 3, 8, 7, 5, 6, 4]
j=6: A[6]=5 > 4  -> 변화 없음
j=7: A[7]=6 > 4  -> 변화 없음
최종: swap(A[4],A[8]) -> [2, 1, 3, 4, 7, 5, 6, 8]
return 4  (피벗의 새 인덱스)
```

## 관련 개념

- [퀵 정렬 (Quicksort)](/knowledge/algorithms/quicksort/)
- [랜덤 퀵 정렬 (Randomized Quicksort)](/knowledge/algorithms/randomized-quicksort/)
- [루프 불변량 (Loop Invariant)](/knowledge/algorithms/loop-invariant/)
- [정확성 (Correctness)](/knowledge/algorithms/correctness/)
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/)
