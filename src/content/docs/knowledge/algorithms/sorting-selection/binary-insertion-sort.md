---
title: "이진 삽입 정렬 (Binary Insertion Sort)"
description: "이진 삽입 정렬(Binary Insertion Sort)은 직접 삽입 정렬에서 삽입 위치를 이진 탐색으로 찾아 비교 횟수를 O(N log N)으로 줄이지만, 이동 횟수는 여전히 O(N²)이다"
tags: ["Binary Insertion Sort", "Insertion Sort", "Binary Search", "TAOCP", "Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/binary-insertion-sort
sidebar:
  order: 33
---

## 핵심 개념

**이진 삽입 정렬(Binary Insertion Sort)**은 직접 삽입 정렬에서 삽입 위치를 찾을 때 순차 탐색 대신 **이진 탐색(binary search)**을 사용하는 방법이다. 비교 횟수를 O(N log N)으로 줄이지만 이동 횟수는 여전히 O(N²)이다.

## 동작 원리

**알고리즘**:
- j번째 원소를 삽입할 때 이미 정렬된 1..j-1 구간에서 이진 탐색
- 이진 탐색은 ceil(log2(j)) 번의 비교로 위치 결정
- 삽입 위치 결정 후, 이동 연산은 직접 삽입과 동일

**비교 횟수 분석**:
- 총 비교 횟수: Σ_{j=2}^{N} ceil(log2(j)) = N·ceil(log2(N)) - 2^{ceil(log2(N))} + 1
- ≈ N·log2(N) (직접 삽입의 N²/4 대비 크게 감소)

**이동 횟수 분석**:
- 여전히 역위(inversion) 수 B에 비례: 평균 N²/4
- 비교 횟수와 이동 횟수 간의 불균형 → 이동이 병목

**양방향 삽입(Two-way Insertion)**:
- 출력 배열의 양쪽 끝에서 삽입
- 이동 횟수를 평균 N²/8로 줄임 (반으로 감소)
- 그러나 여전히 O(N²)

**실용적 관점**:
- N이 크지 않을 때 (N < 20 정도) 직접 삽입/이진 삽입이 우수
- 비교 비용이 매우 클 때 (예: 다중 키 비교) 이진 삽입이 유리
- 이동 비용이 클 때는 리스트 삽입이 더 유리

**Tree Insertion**: 연결 리스트와 이진 트리를 결합하여 비교 O(N log N), 이동 거의 0 달성 가능.

## 예시

```python
import bisect

def binary_insertion_sort(a):
    n = len(a)
    for j in range(1, n):
        key = a[j]
        # 이진 탐색으로 삽입 위치 찾기
        pos = bisect.bisect_right(a, key, 0, j)
        # 삽입 위치까지 이동
        a[pos+1:j+1] = a[pos:j]
        a[pos] = key
    return a

# 비교 횟수 예시 (N=8):
# j=1: 0, j=2: 1, j=3: 2, j=4: 2, j=5: 3, j=6: 3, j=7: 3, j=8: 3
# 총: 17 비교 (직접 삽입 평균: 14, but 이동 횟수는 동일)
```

## 관련 개념

- [직접 삽입 정렬 (Straight Insertion Sort)](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [리스트 삽입 정렬 (List Insertion Sort)](/knowledge/algorithms/sorting-selection/list-insertion-sort/)
- [Merge Insertion (Ford-Johnson)](/knowledge/algorithms/sorting-selection/merge-insertion-ford-johnson/)
- [Shell's Method](/knowledge/algorithms/sorting-selection/shells-method/)
