---
title: "Integer Partition"
description: "양의 정수 n을 순서에 무관하게 하나 이상의 양의 정수들의 합으로 나타내는 방법 — 오각수 정리, Young 다이어그램, 켤레 분할이 핵심"
tags: ["Combinatorics", "Partitions", "Number Theory", "Enumeration", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/integer-partition
sidebar:
  order: 26
---

## 핵심 개념

정수 분할(Integer Partition)은 양의 정수 n을 순서에 무관하게 하나 이상의 양의 정수들의 합으로 나타내는 방법이다. p(n)은 n의 분할 수를 나타낸다.

분할 λ = (λ₁, λ₂, ..., λₖ) with λ₁ ≥ λ₂ ≥ ... ≥ λₖ ≥ 1

분할 수 p(n): p(0)=1, p(1)=1, p(2)=2, p(3)=3, p(4)=5, p(5)=7, p(6)=11, p(7)=15, p(8)=22

## 동작 원리

**Euler의 오각수 정리:**
p(n) - p(n-1) - p(n-2) + p(n-5) + p(n-7) - ... = 0
(오각수 k(3k-1)/2의 부호 교대)

**생성 함수:**
Σₙ₌₀∞ p(n)xⁿ = ∏ₖ₌₁∞ 1/(1-xᵏ)

**Young 다이어그램(Ferrers 다이어그램):**
분할 λ를 시각적으로 표현: 각 부분 λᵢ만큼의 점을 행에 나열

**켤레 분할(Conjugate Partition):**
Young 다이어그램의 전치(transpose). λ'ⱼ = |{i : λᵢ ≥ j}|

**집합 분할과의 관계:**
정수 분할은 분할의 형태(크기별 블록 수)를 나타낸다.
예: n=4 집합의 분할 형태 1+1+1+1, 2+1+1, 2+2, 3+1, 4

## 예시

```python
def integer_partitions(n):
    """n의 모든 분할을 감소 순서로 생성"""
    partition = [n]
    while True:
        yield partition[:]
        # 가장 오른쪽 1이 아닌 원소 찾기
        rightmost = len(partition) - 1
        while rightmost >= 0 and partition[rightmost] == 1:
            rightmost -= 1
        if rightmost < 0:
            return
        # 해당 원소를 1씩 줄이고 나머지를 재구성
        val = partition[rightmost] - 1
        count = (len(partition) - rightmost) + 1
        del partition[rightmost:]
        while count >= val:
            partition.append(val)
            count -= val
        if count > 0:
            partition.append(count)

def partition_count_dp(n):
    """n의 분할 수 p(n) 계산 (동적 프로그래밍)"""
    dp = [0] * (n + 1)
    dp[0] = 1
    for k in range(1, n + 1):
        for m in range(k, n + 1):
            dp[m] += dp[m - k]
    return dp[n]

def ferrers_diagram(partition):
    """분할의 Ferrers 다이어그램 출력"""
    for part in partition:
        print('*' * part)

def conjugate(partition):
    """켤레 분할 계산"""
    if not partition:
        return []
    max_len = partition[0]
    return [sum(1 for p in partition if p >= j+1) for j in range(max_len)]

# 예시: n=5의 7가지 분할
for p in integer_partitions(5):
    print(p)
# [5], [4,1], [3,2], [3,1,1], [2,2,1], [2,1,1,1], [1,1,1,1,1]

# Ferrers 다이어그램 예시: 분할 [4,3,1]
# ****
# ***
# *
```

## 관련 개념

- [Set Partition](/knowledge/discrete-mathematics/combinatorics/set-partition/)
- [Bell Number](/knowledge/discrete-mathematics/combinatorics/bell-number/)
- [Combination Generation](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [Generating Functions](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
