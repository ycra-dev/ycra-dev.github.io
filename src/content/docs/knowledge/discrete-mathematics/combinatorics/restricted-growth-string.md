---
title: "제한 성장 문자열 (Restricted Growth String)"
description: "집합 {1,...,n}의 분할을 나타내는 문자열 a₁...aₙ으로 a₁=0이고 각 aⱼ ≤ 1+max(a₁,...,aⱼ₋₁)를 만족하는 정규 표현 — Ehrlich 그레이 코드 열거의 기반"
tags: ["Combinatorics", "Set Partitions", "Encoding", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/restricted-growth-string
sidebar:
  order: 25
---

## 핵심 개념

제한 증가 문자열(Restricted Growth String, RGS)은 집합 {1,...,n}의 분할을 나타내는 문자열 a₁a₂...aₙ으로, a₁=0이고 각 aⱼ ≤ 1 + max(a₁,...,aⱼ₋₁)를 만족한다. (Hutchinson, 1963)

**집합 분할과의 1:1 대응:**
- aⱼ = aₖ ⟺ j와 k가 같은 블록에 속함
- j가 해당 블록의 최솟값이면 aⱼ에 새로운 가장 작은 숫자 사용

## 동작 원리

**제한 조건의 의미:**
"제한" = 각 자릿수가 이미 사용된 최대값보다 최대 1 크다.
블록 번호를 처음 등장 순서로 할당하는 표준 형태이다.

**보조 배열 b:**
Algorithm H에서 bⱼ₊₁ = 1 + max(a₁,...,aⱼ)를 유지:
- bⱼ는 위치 j에서 허용되는 최대 블록 번호
- 역추적 시 O(1)로 다음 유효 값 결정

**사전순 열거:**
- 0...0이 첫 번째 (전체가 하나의 블록)
- 01...n-1이 마지막 (각 원소가 별개 블록)

**그레이 코드 변형:**
- **Ehrlich**: 연속한 두 RGS가 한 자릿수만 다름 (O(1)/step)
- **Ruskey**: k-블록 분할만 다룰 때 최소 변화 열거

## 예시

```python
def is_valid_rgs(s):
    """제한 증가 문자열 검증"""
    if len(s) == 0 or s[0] != 0:
        return False
    max_so_far = 0
    for j in range(1, len(s)):
        if s[j] > max_so_far + 1:
            return False
        max_so_far = max(max_so_far, s[j])
    return True

def all_rgs(n):
    """모든 RGS 사전순 열거"""
    s = [0] * n
    b = [1] * n  # b[j] = max(s[0..j-1]) + 1

    while True:
        yield s[:]

        # 마지막 자릿수 증가 시도
        if s[n-1] < b[n-1]:
            s[n-1] += 1
            continue

        # 역추적
        j = n - 2
        while j >= 0 and s[j] >= b[j]:
            j -= 1
        if j < 0:
            break

        s[j] += 1
        new_max = b[j] if s[j] < b[j] else s[j]
        for k in range(j+1, n):
            s[k] = 0
            b[k] = new_max + 1

def rgs_to_partition(rgs):
    """RGS를 집합 분할로 변환"""
    blocks = {}
    for i, label in enumerate(rgs, 1):
        blocks.setdefault(label, []).append(i)
    return sorted(blocks.values(), key=lambda b: b[0])

# n=3의 5가지 RGS:
for rgs in all_rgs(3):
    print(rgs, "→", rgs_to_partition(rgs))
# [0,0,0] → [[1,2,3]]
# [0,0,1] → [[1,2],[3]]
# [0,1,0] → [[1,3],[2]]
# [0,1,1] → [[1],[2,3]]
# [0,1,2] → [[1],[2],[3]]
```

## 관련 개념

- [집합 분할 (Set Partition)](/knowledge/discrete-mathematics/combinatorics/set-partition/)
- [벨 수 (Bell Number)](/knowledge/discrete-mathematics/combinatorics/bell-number/)
- [그레이 코드 (Gray Code)](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [루프 없는 알고리즘 (Loopless Algorithm)](/knowledge/algorithms/foundations/loopless-algorithm/)
