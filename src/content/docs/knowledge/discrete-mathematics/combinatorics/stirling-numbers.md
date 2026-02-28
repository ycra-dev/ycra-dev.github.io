---
title: "Stirling Numbers"
description: "다항식을 팩토리얼 거듭제곱과 일반 거듭제곱 사이에서 변환할 때 등장하는 계수 — 제1종(사이클 분해)과 제2종(집합 분할)으로 나뉨"
tags: ["Combinatorics", "Discrete Mathematics", "Permutation", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/stirling-numbers
sidebar:
  order: 14
---

## 핵심 개념

스털링 수(Stirling Numbers)는 두 종류가 있다:

- **제1종 스털링 수 s(n, k)**: n개 원소의 치환 중 정확히 k개의 순환(cycle)을 가진 치환의 수 (부호가 있는 경우 [n k] 표기)
- **제2종 스털링 수 S(n, k)**: n개 원소의 집합을 k개의 비공 부분집합으로 분할하는 방법의 수

이 두 종류는 팩토리얼 거듭제곱과 일반 거듭제곱을 상호 변환하는 "기저 변환 행렬" 역할을 한다.

## 동작 원리

**팩토리얼 거듭제곱(Factorial Powers)**:
```
하강 팩토리얼: x^(n↓) = x(x-1)(x-2)...(x-n+1)
상승 팩토리얼: x^(n↑) = x(x+1)(x+2)...(x+n-1)
```

**변환 공식**:
```
제1종: x^(n↓) = Σ_k s(n,k) x^k    (하강 팩토리얼 → 일반 거듭제곱)
제2종: x^n = Σ_k S(n,k) x^(k↓)   (일반 거듭제곱 → 하강 팩토리얼)
```

**점화식**:
```
제1종: s(n+1, k) = s(n, k-1) - n × s(n, k)
제2종: S(n+1, k) = S(n, k-1) + k × S(n, k)
```

**역관계** (두 스털링 수는 서로 역행렬 관계):
```
Σ_k s(n,k) S(k,m) = δ_{nm}   (크로네커 델타)
Σ_k S(n,k) s(k,m) = δ_{nm}
```

**제2종 스털링 삼각형**:
```
S(n,k)  k=1  k=2  k=3  k=4
n=1:     1
n=2:     1    1
n=3:     1    3    1
n=4:     1    7    6    1
```

**중요한 특수값**:
- s(n, 1) = (-1)^{n-1} (n-1)! — n개 원소 모두가 하나의 사이클
- S(n, 1) = 1 — 모든 원소가 하나의 집합
- S(n, 2) = 2^{n-1} - 1 — 두 부분집합으로 분할
- S(n, n-1) = C(n, 2) — n-1개 집합은 원소 하나와 원소 두 쌍

**조화수와의 관계**: n개 원소 치환의 평균 사이클 수 = H_n (조화수)

## 예시

변환 예시 (x³을 팩토리얼 거듭제곱으로 표현):

```python
def stirling_second(n, k):
    """제2종 스털링 수 계산"""
    if n == 0 and k == 0:
        return 1
    if n == 0 or k == 0:
        return 0
    return stirling_second(n-1, k-1) + k * stirling_second(n-1, k)

# x^3 = S(3,1)*x^(1↓) + S(3,2)*x^(2↓) + S(3,3)*x^(3↓)
#      = 1*x + 3*x(x-1) + 1*x(x-1)(x-2)
s31 = stirling_second(3, 1)  # 1
s32 = stirling_second(3, 2)  # 3
s33 = stirling_second(3, 3)  # 1

print(f"x^3 = {s31}·x + {s32}·x(x-1) + {s33}·x(x-1)(x-2)")

# 검증: x=5일 때
x = 5
lhs = x**3  # 125
rhs = s31*x + s32*x*(x-1) + s33*x*(x-1)*(x-2)  # 125
print(f"x=5: {lhs} = {rhs}")
```

집합 분할의 응용:

```
S(4, 2) = 7: {1,2,3,4}를 두 비공 부분집합으로 나누는 7가지 방법
{1} ∪ {2,3,4}
{2} ∪ {1,3,4}
{3} ∪ {1,2,4}
{4} ∪ {1,2,3}
{1,2} ∪ {3,4}
{1,3} ∪ {2,4}
{1,4} ∪ {2,3}
```

## 관련 개념

- [Binomial Coefficient](/knowledge/discrete-mathematics/combinatorics/binomial-coefficient/)
- [Permutation](/knowledge/discrete-mathematics/combinatorics/permutation/)
- [Harmonic Numbers](/knowledge/algorithms/foundations/harmonic-numbers/)
- [Generating Functions](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
