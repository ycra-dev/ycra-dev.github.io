---
title: "드 브루인 수열 (De Bruijn Sequence)"
description: "m진 알파벳에 대한 순환 수열로 길이 n인 모든 mⁿ가지 n-튜플이 정확히 한 번씩 나타나는 최소 길이(mⁿ) 수열 — 엔코더·LFSR·테스트 패턴의 핵심"
tags: ["Combinatorics", "Enumeration", "N-Tuples", "Cyclic", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/de-bruijn-sequence
sidebar:
  order: 20
---

## 핵심 개념

드 브라우인 수열(De Bruijn Sequence)은 m진 알파벳에 대한 순환 수열로, 길이 n인 모든 mⁿ가지 n-튜플(n-gram)이 정확히 한 번씩 나타나는 최소 길이(mⁿ) 수열이다.

이진 경우(m=2): 길이 2ⁿ의 순환 이진 수열로 모든 n비트 패턴이 정확히 한 번 등장.
예: n=3 → 00010111 (길이 8) → 패턴 000,001,010,101,011,111,110,100 모두 포함

## 동작 원리

**구성 방법:**

1. **드 브라우인 그래프 오일러 경로:**
   - 정점: (n-1)-튜플
   - 에지: n-튜플 (각 에지가 고유한 n-튜플)
   - 드 브라우인 수열 = 이 그래프의 오일러 경로

2. **Almost Linear Recurrence (Algorithm A):**
   원시 다항식(primitive polynomial) modulo m 기반:
   - LFSR(선형 피드백 시프트 레지스터)로 구현
   - 루프 없는(loopless) 효율적 구현

3. **재귀적 구성 (Algorithm R):**
   드 브라우인 수열 길이 mⁿ을 이용해 mⁿ⁺¹ 수열 구성

**응용:**
- 센서/엔코더: 회전 위치를 최소 비트로 인코딩
- 암호학: 선형 피드백 시프트 레지스터(LFSR)
- 테스트 패턴 생성

## 예시

```python
def debruijn(k, n):
    """k진 알파벳의 드 브라우인 수열 (Martin 알고리즘)"""
    alphabet = list(range(k))
    a = [0] * k * n
    sequence = []

    def db(t, p):
        if t > n:
            if n % p == 0:
                sequence.extend(a[1:p+1])
        else:
            a[t] = a[t - p]
            db(t + 1, p)
            for j in alphabet[a[t - p] + 1:]:
                a[t] = j
                db(t + 1, t)

    db(1, 1)
    return sequence

# 이진 n=3 드 브라우인 수열:
seq = debruijn(2, 3)
print(seq)  # [0, 0, 0, 1, 0, 1, 1, 1] (순환하면 00010111)

# 검증: 모든 3비트 패턴이 정확히 한 번 등장하는지
n = 3
cyclic_seq = seq + seq[:n-1]  # 순환을 위한 래핑
windows = [tuple(cyclic_seq[i:i+n]) for i in range(len(seq))]
assert len(set(windows)) == 2**n  # 8가지 모두 등장

# LFSR 기반 (Almost Linear, Algorithm A):
# 원시 다항식 x⁴+x+1 mod 2:
def lfsr_debruijn(n, taps):
    """선형 피드백 시프트 레지스터 기반 수열"""
    state = [1] + [0] * (n-1)
    result = []
    for _ in range(2**n - 1):
        result.append(state[0])
        feedback = 0
        for tap in taps:
            feedback ^= state[tap]
        state = state[1:] + [feedback]
    result.append(0)  # 0...0 추가하여 완전한 드 브라우인 수열
    return result
```

## 관련 개념

- [그레이 코드 (Gray Code)](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [순열 생성 (Permutation Generation)](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
- [조합 생성 (Combination Generation)](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [비트 연산 (Bitwise Operations)](/knowledge/algorithms/foundations/bitwise-operations/)
