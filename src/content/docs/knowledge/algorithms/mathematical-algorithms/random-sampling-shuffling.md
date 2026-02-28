---
title: "Random Sampling and Shuffling"
description: "균일 난수를 이용하여 편향 없는 무작위 표본을 추출하거나 배열을 완전히 무작위로 섞는 알고리즘"
tags: ["Algorithms", "Randomness", "Combinatorics", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/random-sampling-shuffling
sidebar:
  order: 26
---

## 핵심 개념

랜덤 샘플링(Random Sampling)과 셔플링(Shuffling)은 난수의 가장 기본적인 실용 응용이다. 핵심은 **모든 가능한 결과가 동일한 확률**로 나타나야 한다는 것이다.

## 동작 원리

**Fisher-Yates 셔플링 (Knuth Shuffle)**:
n개의 원소를 균일한 확률로 임의 순열로 만드는 알고리즘:

```
Algorithm P:
for j = n downto 2:
    k = random integer in [1, j]   (균일 분포)
    swap(A[k], A[j])
```

- 시간: O(n), 공간: O(1) 추가
- 정확히 n! 가지 순열을 동일한 확률로 생성
- 나쁜 방법: 각 위치에 독립적으로 난수를 부여하고 정렬 → O(n log n) + 편향 발생

**랜덤 샘플링 (Algorithm S)**:
N개 원소 중 n개를 선택 (복원 없이, 순서 유지):

```
m = 0  # 이미 선택한 수
t = 0  # 이미 처리한 원소 수
while m < n:
    if (N - t) × random() < (n - m):
        선택
        m += 1
    t += 1
```

- 정확한 균일 분포 보장
- 시간: O(N), 공간: O(n)

**Walker의 별명 방법 (Alias Method)**:
임의의 이산 분포에서 O(1) 시간에 샘플링 (전처리 O(n)):
- 각 범주에 확률과 별명(alias)을 미리 계산
- 샘플링: 균일 정수 k와 균일 수 V로 k 또는 Y[k] 선택

**카드 셔플링의 수학**: 실제 카드를 손으로 리플 셔플할 때 균일한 분포를 얻으려면 **약 7번**이 필요하다 (Diaconis-Bayer 연구). Fisher-Yates는 **한 번**에 완벽히 균일한 결과를 얻는다.

## 예시

```python
import random

def fisher_yates_shuffle(arr):
    """완벽히 균일한 랜덤 셔플 (Fisher-Yates/Knuth)"""
    n = len(arr)
    for i in range(n - 1, 0, -1):
        j = random.randint(0, i)  # [0, i] 범위에서 균일하게
        arr[i], arr[j] = arr[j], arr[i]
    return arr

def random_sample(population, k):
    """N개 중 k개 선택 (Algorithm S)"""
    n = len(population)
    selected = []
    m, t = 0, 0
    while m < k:
        if random.random() < (k - m) / (n - t):
            selected.append(population[t])
            m += 1
        t += 1
    return selected

# 균일성 검증
from collections import Counter

def test_shuffle_uniformity(n=3, trials=100000):
    """셔플이 균일한지 확인"""
    original = list(range(n))
    counts = Counter()
    for _ in range(trials):
        arr = original.copy()
        fisher_yates_shuffle(arr)
        counts[tuple(arr)] += 1

    import math
    expected = trials / math.factorial(n)
    print(f"기대 빈도: {expected:.0f}")
    for perm, cnt in sorted(counts.items()):
        deviation = (cnt - expected) / expected * 100
        print(f"  {perm}: {cnt} ({deviation:+.1f}%)")

test_shuffle_uniformity()
# 모든 순열이 약 16667 ± 3% 빈도 → 균일

# 나쁜 방법 비교
def bad_shuffle(arr):
    """나쁜 셔플 (편향 발생)"""
    n = len(arr)
    for i in range(n):
        j = random.randint(0, n-1)  # 범위가 잘못됨
        arr[i], arr[j] = arr[j], arr[i]
    return arr

# Walker의 Alias Method
def build_alias_table(probs):
    n = len(probs)
    p = [n * p for p in probs]
    alias = list(range(n))
    small, large = [], []
    for i, pi in enumerate(p):
        (small if pi < 1 else large).append(i)
    while small and large:
        s, l = small.pop(), large.pop()
        alias[s] = l
        p[l] = p[l] + p[s] - 1
        (small if p[l] < 1 else large).append(l)
    return p, alias

def alias_sample(p, alias):
    i = random.randrange(len(p))
    return i if random.random() < p[i] else alias[i]
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [Monte Carlo Method](/knowledge/algorithms/mathematical-algorithms/monte-carlo-method/)
- [Permutation](/knowledge/discrete-mathematics/combinatorics/permutation/)
