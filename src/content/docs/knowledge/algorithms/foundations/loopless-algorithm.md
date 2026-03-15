---
title: "루프 없는 알고리즘 (Loopless Algorithm)"
description: "조합론적 객체를 열거할 때 각 객체 방문에 amortized가 아닌 진정한 O(1) 최악 경우 시간을 달성하는 알고리즘으로, 포커스 포인터 기법을 핵심으로 사용한다"
tags: ["Algorithms", "Combinatorics", "Enumeration", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/loopless-algorithm
sidebar:
  order: 104
---

## 핵심 개념

루프 없는 알고리즘(Loopless Algorithm)은 조합론적 객체를 열거할 때 각 객체의 방문에 O(1) 최악 경우 시간(amortized가 아닌 진정한 O(1))을 달성하는 알고리즘이다. 즉, N개의 객체를 생성할 때 총 O(N) 시간이 보장된다.

## 동작 원리

**동기:**
일반적인 역추적(backtracking) 기반 열거 알고리즘은 평균 O(1)이지만 최악의 경우 O(n)이 소요될 수 있다. 루프 없는 알고리즘은 모든 단계에서 O(1)을 보장한다.

**핵심 기법:**
1. **연결 리스트 포인터**: 변경된 위치를 포인터로 추적
2. **보조 배열**: 다음 변경 위치를 미리 계산
3. **포커스 포인터(Focus Pointer)**: 항상 변경되는 위치를 직접 추적

**알고리즘 예시들:**
- **Gray code 생성**: 각 단계에서 O(1) — 변화된 비트 = ρ(단계 수)
- **조합 생성 (Nijenhuis-Wilf)**: Gray code 유사 방법으로 O(1)/step
- **집합 분할 생성 (Ruskey)**: 각 단계 O(1) 변경

**비교:**

| 알고리즘 | 평균 시간 | 최악 시간 |
|----------|-----------|-----------|
| 일반 역추적 | O(1) | O(n) |
| 루프 없는 | O(1) | O(1) |

**포커스 배열의 역할:**
집합 분할의 경우: `focus[j]` = 다음에 변경할 위치를 미리 저장
→ 각 방문에서 포커스 배열의 한 원소만 접근하면 다음 변경 위치를 알 수 있다.

## 예시

```python
# Gray 코드 (루프없는) O(1)/step
def gray_code_loopless(n):
    """n비트 Gray 코드를 O(1)/step으로 생성"""
    g = [0] * n  # 현재 Gray 코드
    focus = list(range(n + 1))  # 포커스 포인터

    yield g[:]
    j = focus[0]
    while j < n:
        g[j] ^= 1  # 단 하나의 비트만 변경: O(1)
        yield g[:]

        # 포커스 업데이트 (O(1))
        focus[0] = 0
        if j:
            focus[j] = focus[j + 1] if j + 1 <= n else n
            focus[j + 1] = j + 1 if j + 1 <= n else n
        j = focus[0]

# 조합 생성 (루프없는, O(1)/step, Nijenhuis-Wilf 방법)
def combinations_loopless(n, t):
    """C(n,t) 조합을 O(1)/step으로 생성"""
    c = list(range(t, -1, -1))
    c.append(n)   # sentinel

    while True:
        yield c[1:t+1]  # 방문

        j = 1
        while c[j] + 1 == c[j+1]:
            c[j] = j - 1
            j += 1
        if j > t:
            break
        c[j] += 1

# 사용 예시
print("3비트 Gray 코드:")
for code in gray_code_loopless(3):
    print(code)
# [0,0,0], [1,0,0], [1,1,0], [0,1,0], [0,1,1], [1,1,1], [1,0,1], [0,0,1]
# 각 단계: 정확히 1비트만 변경 (O(1))
```

## 관련 개념

- [그레이 코드 (Gray Code)](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [순열 생성 (Permutation Generation)](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
- [조합 생성 (Combination Generation)](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [집합 분할 (Set Partition)](/knowledge/discrete-mathematics/combinatorics/set-partition/)
