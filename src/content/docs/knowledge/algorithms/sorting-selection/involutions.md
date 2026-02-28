---
title: "Involutions"
description: "대합(Involution)은 자기 자신이 역원인 순열(π = π^(-1))로, 사이클 표현에서 1-사이클과 2-사이클만으로 구성된 순열이다"
tags: ["Involutions", "Permutations", "Combinatorics", "TAOCP", "Young Tableau"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/involutions
sidebar:
  order: 26
---

## 핵심 개념

**대합(Involution)**은 자기 자신이 역원인 순열, 즉 π = π^(-1)을 만족하는 순열이다. 사이클 표현에서 1-사이클(고정점)과 2-사이클(전위, transposition)만으로 구성된 순열이다.

## 동작 원리

**개수 점화식** (Rothe, 1800):
```
t_n = t_{n-1} + (n-1) · t_{n-2}
```
- t_{n-1}: n이 고정점인 대합의 수
- (n-1) · t_{n-2}: n과 j (j < n)이 2-사이클을 이루는 대합의 수

값: t_0=1, t_1=1, t_2=2, t_3=4, t_4=10, t_5=26, t_6=76, t_7=232, ...

**일반 공식**:
```
t_n = Σ_{k=0}^{floor(n/2)} n! / (2^k · k! · (n-2k)!)
```

**생성 함수**:
```
Σ_{n≥0} t_n · x^n/n! = exp(x + x²/2)
```

**점근 행동** (Moser-Wyman, 1955):
```
t_n ~ n^(n/2) · e^{-n/2} · e^{sqrt(n)} · C  (n → ∞)
```

**Young 타블로와의 관계 (Corollary B)**: n개 원소의 대합의 수 = n개 원소로 만들 수 있는 타블로의 수.

RSK 대응에서 순열 π가 (P,Q)에 대응될 때, π가 대합 ⟺ P = Q.

## 예시

```
{1,2,3,4}의 10개 대합:
  e (모두 고정점)
  (12), (13), (14), (23), (24), (34) (하나의 2-사이클)
  (12)(34), (13)(24), (14)(23) (두 개의 2-사이클)

점화식 검증:
  t_4 = t_3 + 3·t_2 = 4 + 3·2 = 10 ✓

생성 함수 계수:
  exp(x + x²/2) = 1 + x + x²/2·... + ...
  [x⁴/4!] 계수: 10 ✓
```

## 관련 개념

- [Young Tableau](/knowledge/algorithms/sorting-selection/young-tableau/)
- [Permutation Cycles](/knowledge/algorithms/sorting-selection/permutation-cycles/)
- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
