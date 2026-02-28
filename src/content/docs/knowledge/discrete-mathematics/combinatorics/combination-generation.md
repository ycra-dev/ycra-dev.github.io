---
title: "Combination Generation"
description: "n개의 원소에서 t개를 선택하는 C(n,t)가지 조합을 체계적으로 열거하는 알고리즘 — 8가지 동치 표현과 루프 없는 O(1)/step 방법 포함"
tags: ["Combinatorics", "Combinations", "Enumeration", "Binomial", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/combination-generation
sidebar:
  order: 22
---

## 핵심 개념

조합 생성(Combination Generation)은 n개의 원소에서 t개를 선택하는 C(n,t)가지 조합을 체계적으로 열거하는 알고리즘이다. (s = n-t)

같은 조합을 나타내는 8가지 동치 형태가 있으며, 각 형태는 서로 다른 알고리즘적 특성을 갖는다.

## 동작 원리

**8가지 동치 표현:**
1. **이진 문자열**: s개의 0과 t개의 1 (aₙ₋₁...a₁a₀)
2. **조합 목록**: 선택된 원소의 감소 순서 목록 cₜ>cₜ₋₁>...>c₁
3. **이중 조합**: 선택되지 않은 원소 목록 bs>...>b₁
4. **다중조합**: 반복 허용 dt≥dt₋₁≥...≥d₁
5. **조성(Composition)**: n+1을 t+1 부분으로 분할
6. **격자 경로**: s×t 격자의 한 모서리에서 다른 모서리까지 경로

**사전순 생성 (Algorithm C):**
현재 조합 cₜ>...>c₁에서 다음:
1. 가장 오른쪽으로 이동 가능한 인덱스 j 찾기
2. cⱼ를 증가시키고 그 오른쪽 모두 초기화

**최소 변화 생성:**
이진 문자열의 한 비트만 변경 (조합 그레이 코드).

**루프 없는 알고리즘:**
각 조합 방문에 O(1) 최악 경우 시간 (Nijenhuis-Wilf 방법).

## 예시

```python
def combinations_lex(n, t):
    """n개에서 t개를 사전순으로 선택 (Algorithm C)"""
    # 초기 조합: {t-1, t-2, ..., 1, 0} (감소 순서)
    c = list(range(t - 1, -1, -1))
    while True:
        yield c[:]
        # 가장 오른쪽으로 이동 가능한 위치 찾기
        j = 0
        while j < t - 1 and c[j] == c[j+1] + 1:
            j += 1
        if c[j] == n - 1 - j:  # 더 이동 불가
            if j == t - 1:
                break
            j += 1
        c[j] += 1
        for k in range(j - 1, -1, -1):
            c[k] = c[k+1] - 1

# 다중조합 (반복 허용):
def multiset_combinations(n, t):
    """n개에서 t개 중복 허용 선택: C(n+t-1, t)가지"""
    c = [0] * t
    while True:
        yield c[:]
        j = t - 1
        while j >= 0 and c[j] == n - 1:
            j -= 1
        if j < 0:
            break
        val = c[j] + 1
        for k in range(j, t):
            c[k] = val

# 루프 없는 조합 생성 (Nijenhuis-Wilf, O(1)/step):
def combinations_loopless(n, t):
    """C(n,t) 조합을 O(1)/step으로 생성"""
    c = list(range(t - 1, -1, -1)) + [n]  # sentinel 추가

    while True:
        yield c[:t]  # 방문

        # 포커스: 변경할 위치
        j = 0
        while c[j] + 1 == c[j+1]:
            c[j] = j
            j += 1
        if j >= t:
            break
        c[j] += 1

# 예시: C(5,3) = 10가지 조합
for combo in combinations_lex(5, 3):
    print(combo)
```

## 관련 개념

- [Permutation Generation](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
- [Set Partition](/knowledge/discrete-mathematics/combinatorics/set-partition/)
- [Gray Code](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [Loopless Algorithm](/knowledge/algorithms/foundations/loopless-algorithm/)
