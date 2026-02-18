---
title: "Sorting Algorithm"
description: "정렬 알고리즘(Sorting Algorithm)은 리스트의 원소들을 특정 순서(오름차순, 내림차순, 사전순 등)로 재배열하는 알고리즘이다"
tags: ['Sorting', 'Bubble Sort', 'Insertion Sort', 'Algorithm', 'Comparison Sort']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/sorting-algorithm
sidebar:
  order: 18
---

## 핵심 개념

정렬은 전화번호부 작성, 검색 엔진, 데이터베이스 관리 등 다양한 분야에서 필수적이다. 100개 이상의 정렬 알고리즘이 고안되었으며, 각각 구현 용이성, 효율성, 특정 상황에서의 성능 등에서 장단점을 가진다.

### 버블 정렬 (Bubble Sort)
**원리**: 인접한 두 원소를 비교하여 순서가 잘못되면 교환하는 과정을 반복한다.
- i번째 패스에서는 n-i번의 비교를 수행
- 총 비교 횟수: (n-1) + (n-2) + ... + 1 = n(n-1)/2
- **최악의 경우 시간 복잡도**: Θ(n²)
- 작은 원소가 위로 "떠오르고" 큰 원소가 아래로 "가라앉는" 모습에서 이름이 유래

### 삽입 정렬 (Insertion Sort)
**원리**: j번째 원소를 이미 정렬된 앞의 j-1개 원소 사이의 올바른 위치에 삽입한다.
- j번째 단계에서 최대 j번의 비교가 필요
- 총 최악 비교 횟수: 2 + 3 + ... + n = n(n+1)/2 - 1
- **최악의 경우 시간 복잡도**: Θ(n²)
- 거의 정렬된 리스트에서는 비교 횟수가 크게 줄어듦

두 알고리즘 모두 최악의 경우 Θ(n²)이지만, 가장 효율적인 정렬 알고리즘(병합 정렬, 퀵 정렬 등)은 O(n log n) 시간에 정렬할 수 있다.

## 예시

**버블 정렬**: 리스트 [3, 2, 4, 1, 5] 정렬

```
procedure bubblesort(a1, ..., an: real numbers with n >= 2)
  for i := 1 to n - 1
    for j := 1 to n - i
      if aj > aj+1 then interchange aj and aj+1
```

1차 패스: [3,2,4,1,5] → [2,3,4,1,5] → [2,3,1,4,5] → [2,3,1,4,5]
2차 패스: [2,3,1,4,5] → [2,1,3,4,5]
3차 패스: [2,1,3,4,5] → [1,2,3,4,5]
4차 패스: [1,2,3,4,5] (변경 없음, 완료)

**삽입 정렬**: 리스트 [3, 2, 4, 1, 5] 정렬

```
procedure insertion_sort(a1, a2, ..., an: real numbers with n >= 2)
  for j := 2 to n
    (aj를 a1,...,a_{j-1} 사이의 올바른 위치에 삽입)
```

j=2: 2 < 3 → [2, 3, 4, 1, 5]
j=3: 4 > 3 → [2, 3, 4, 1, 5] (변경 없음)
j=4: 1 < 2 → [1, 2, 3, 4, 5]
j=5: 5 > 4 → [1, 2, 3, 4, 5] (변경 없음)

## 관련 개념

- [Algorithm](/knowledge/algorithms/algorithm/) - 정렬 알고리즘은 알고리즘의 대표적 사례
- [Binary Search](/knowledge/algorithms/binary-search/) - 정렬된 리스트가 이진 탐색의 전제 조건
- [Time Complexity](/knowledge/algorithms/time-complexity/) - 정렬 알고리즘의 복잡도 분석
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - O(n²), O(n log n) 등의 복잡도 표기
- [Matrix](/knowledge/mathematics/matrix/) - 행렬 곱셈 알고리즘과의 복잡도 비교
