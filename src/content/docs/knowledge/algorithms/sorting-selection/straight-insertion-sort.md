---
title: "직접 삽입 정렬 (Straight Insertion Sort)"
description: "직접 삽입 정렬(Straight Insertion Sort)은 j번째 레코드를 이미 정렬된 R1,...,Rj-1에 올바른 위치에 삽입하는 과정을 반복하는 가장 자연스러운 내부 정렬 알고리즘이다"
tags: ["Straight Insertion Sort", "Insertion Sort", "Sorting", "TAOCP", "Internal Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/straight-insertion-sort
sidebar:
  order: 28
---

## 핵심 개념

**직접 삽입 정렬(Straight Insertion Sort)**은 j번째 레코드를 이미 정렬된 R1,...,Rj-1에 올바른 위치에 삽입하는 과정을 j=2,3,...,N까지 반복하는 정렬 방법이다. 가장 자연스럽고 단순한 내부 정렬 알고리즘이다.

## 동작 원리

**Algorithm S (Straight Insertion)**:
1. j = 2부터 N까지 반복
2. Kj를 이미 정렬된 K1,...,Kj-1과 비교하여 삽입 위치 찾기
3. 삽입 위치보다 큰 레코드들을 한 칸씩 오른쪽으로 이동
4. 올바른 위치에 Rj 삽입

**시간 복잡도 분석** (TAOCP MIX 컴퓨터 기준):
- 실행 시간: (9B + 10N - 3A - 9)u
  - B = 역위(inversion)의 수
  - A+1 = 우에서 좌 최대값의 수
- **평균 실행 시간**: 약 (9N²/4)u (B_avg ≈ N²/4)
- **최선**: 이미 정렬된 경우 O(N)
- **최악**: 역순 정렬된 경우 O(N²)

**이진 삽입(Binary Insertion)**: 삽입 위치를 이진 탐색으로 찾아 비교 횟수를 N log N으로 줄이나, 이동 횟수는 여전히 N²/4이다.

**양방향 삽입(Two-way Insertion)**: 출력 영역의 양쪽 끝 중 더 가까운 쪽으로 이동하여 평균 이동 횟수를 N²/8로 줄인다.

**안정성**: **안정 정렬(Stable Sort)**이다. (Kj ≥ Ki 조건 사용 시)

삽입 정렬은 파일이 거의 정렬되어 있을 때 (역위 수가 적을 때) 매우 효율적이다.

## 예시

```python
def straight_insertion_sort(a):
    n = len(a)
    for j in range(1, n):
        key = a[j]
        i = j - 1
        # 삽입 위치를 찾으며 이동
        while i >= 0 and a[i] > key:
            a[i + 1] = a[i]
            i -= 1
        a[i + 1] = key
    return a

# 예: [3, 1, 4, 1, 5, 9, 2, 6]
# j=1: key=1, [1, 3, 4, 1, 5, 9, 2, 6] (1회 이동)
# j=3: key=1, [1, 1, 3, 4, 5, 9, 2, 6] (2회 이동)
```

## 관련 개념

- [역순쌍 (Inversions)](/knowledge/algorithms/sorting-selection/inversions/)
- [Shell's Method](/knowledge/algorithms/sorting-selection/shells-method/)
- [이진 삽입 정렬 (Binary Insertion Sort)](/knowledge/algorithms/sorting-selection/binary-insertion-sort/)
- [리스트 삽입 정렬 (List Insertion Sort)](/knowledge/algorithms/sorting-selection/list-insertion-sort/)
- [삽입 정렬 (Insertion Sort)](/knowledge/algorithms/insertion-sort/)
