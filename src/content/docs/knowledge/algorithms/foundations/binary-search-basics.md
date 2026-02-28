---
title: "이진 탐색 (Binary Search) - 기초 개념"
description: "정렬된 데이터에서 매 단계마다 탐색 범위의 절반을 제거하면서 찾아가는 O(log N) 알고리즘"
tags: ["Algorithm", "Search", "Divide-And-Conquer", "Logarithmic"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/binary-search-basics
sidebar:
  order: 39
---

## 핵심 개념

이진 탐색은 정렬된 데이터에서 찾고자 하는 값을 매 단계마다 탐색 범위의 **절반을 제거**하면서 찾아가는 알고리즘이다. 시간 복잡도는 O(log N)으로, 데이터의 양이 두 배가 되어도 비교 횟수는 단 1회만 증가한다.

## 동작 원리

이진 탐색은 **분할 정복(divide and conquer)** 전략의 대표적인 예시이다.

1. 정렬된 데이터의 중간 요소를 확인한다.
2. 찾는 값이 중간 값보다 작으면 앞쪽 절반만 탐색한다.
3. 찾는 값이 중간 값보다 크면 뒤쪽 절반만 탐색한다.
4. 찾을 때까지 또는 범위가 비어질 때까지 반복한다.

이진 탐색의 효율성:
- **1,000개** 항목: 최대 **10번** 비교
- **1,000,000개** 항목: 최대 **20번** 비교
- **1,000,000,000개** (10억 개) 항목: 최대 **30번** 비교

단, 이진 탐색의 전제 조건은 데이터가 **미리 정렬**되어 있어야 한다는 것이다.

## 예시

1~100 사이의 숫자 맞추기 게임 (목표: 73):

```
범위: 1 ~ 100
1단계: 중간 = 50 → 73 > 50 → 뒤쪽 절반으로
범위: 51 ~ 100
2단계: 중간 = 75 → 73 < 75 → 앞쪽 절반으로
범위: 51 ~ 74
3단계: 중간 = 62 → 73 > 62 → 뒤쪽 절반으로
범위: 63 ~ 74
4단계: 중간 = 68 → 73 > 68 → 뒤쪽 절반으로
범위: 69 ~ 74
5단계: 중간 = 71 → 73 > 71 → 뒤쪽 절반으로
범위: 72 ~ 74
6단계: 중간 = 73 → 찾음! ✓
```

100개 중에서 단 6번 만에 발견 (최대 7번 = log₂ 100)

Python 구현:

```python
def binary_search(sorted_list, target):
    low, high = 0, len(sorted_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1  # 찾지 못함
```

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm-basics/) - 이진 탐색이 속하는 개념
- [정렬 알고리즘 (Sorting Algorithm)](/knowledge/algorithms/sorting-algorithm-basics/) - 이진 탐색의 전제 조건인 정렬
- [시간 복잡도 (Time Complexity)](/knowledge/algorithms/time-complexity-basics/) - O(log N)의 의미와 중요성

## 출처

- Understanding the Digital World, Chapter 4
- The Practice of Programming, Chapter 2
