---
title: "순열 생성 (Permutation Generation)"
description: "n개의 원소로 이루어진 모든 n! 가지 순열을 체계적으로 열거하는 알고리즘 — 사전순·최소 변화(Heap)·팩토라딕 세 가지 주요 방법"
tags: ["Combinatorics", "Permutations", "Enumeration", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/permutation-generation
sidebar:
  order: 21
---

## 핵심 개념

순열 생성(Permutation Generation)은 n개의 원소로 이루어진 모든 n! 가지 순열을 체계적으로 열거하는 알고리즘이다.

조합론적 객체 열거의 핵심 문제로, 세 가지 주요 표현과 알고리즘이 있다:
- **사전순(Lexicographic)**: 순차적인 순서로 방문
- **인접 교환(Adjacent transposition)**: 순열 그레이 코드 — 최소 변화
- **팩토라딕(Factoriadic)**: k번째 순열 직접 계산

## 동작 원리

**사전순 생성 (Algorithm L):**
오른쪽에서 처음으로 a[j] < a[j+1]인 j를 찾고, a[j]보다 큰 가장 오른쪽 원소와 교환 후 j+1부터 역순으로 정렬.

**최소 변화 순열 (Heap's Algorithm):**
각 단계에서 정확히 하나의 교환만 수행. n번에 n개씩 처리하는 재귀적 구조.

**팩토라딕(Factoriadic) 수 체계:**
k번째 순열을 직접 계산. 숫자 k를 n!-혼합 기수(mixed radix)로 변환:
k = c₁·1! + c₂·2! + ...

**루프 없는(Loopless) 알고리즘:**
각 순열 방문에 O(1) 시간. 최소 변화 알고리즘을 포커스 배열로 구현.

## 예시

```python
def permutations_lex(arr):
    """사전순으로 모든 순열 생성 (Algorithm L)"""
    arr = sorted(arr)
    yield arr[:]
    n = len(arr)
    while True:
        # 오른쪽에서 첫 번째 감소 지점 찾기
        j = n - 2
        while j >= 0 and arr[j] >= arr[j+1]:
            j -= 1
        if j < 0:
            break
        # arr[j]보다 큰 가장 오른쪽 원소와 교환
        k = n - 1
        while arr[k] <= arr[j]:
            k -= 1
        arr[j], arr[k] = arr[k], arr[j]
        # j+1부터 역순 정렬
        arr[j+1:] = arr[j+1:][::-1]
        yield arr[:]

def nth_permutation(n, k):
    """n개 원소의 k번째 (0-indexed) 순열 직접 계산 (팩토라딕)"""
    import math
    elements = list(range(n))
    result = []
    for i in range(n, 0, -1):
        fact = math.factorial(i - 1)
        idx = k // fact
        result.append(elements[idx])
        elements.pop(idx)
        k %= fact
    return result

# Heap's Algorithm (최소 교환):
def heap_permutation(arr, n=None):
    if n is None:
        n = len(arr)
    if n == 1:
        yield arr[:]
        return
    for i in range(n):
        yield from heap_permutation(arr, n-1)
        if n % 2 == 0:
            arr[i], arr[n-1] = arr[n-1], arr[i]
        else:
            arr[0], arr[n-1] = arr[n-1], arr[0]

# 예시: n=3의 6가지 순열
for p in permutations_lex([1, 2, 3]):
    print(p)
# [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
```

## 관련 개념

- [그레이 코드 (Gray Code)](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [조합 생성 (Combination Generation)](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [집합 분할 (Set Partition)](/knowledge/discrete-mathematics/combinatorics/set-partition/)
- [루프 없는 알고리즘 (Loopless Algorithm)](/knowledge/algorithms/foundations/loopless-algorithm/)
