---
title: "Intercalation Product"
description: "삽입곱(Intercalation Product) α ⊎ β는 두 멀티셋 순열을 두 줄 표기법으로 나타내 합친 후 윗 줄을 안정 정렬하여 얻는 연산으로, Foata(1965)가 도입했다"
tags: ["Intercalation Product", "Multiset Permutations", "Combinatorics", "TAOCP", "Foata"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/intercalation-product
sidebar:
  order: 27
---

## 핵심 개념

**삽입곱(Intercalation Product)** α ⊎ β는 두 멀티셋 순열 α와 β에 대해, (a) 두 줄 표기법으로 나타내고, (b) 두 표를 나란히 붙이고, (c) 윗 줄을 비내림차순으로 안정 정렬(stable sort)하여 얻는 멀티셋 순열이다. Dominique Foata(1965)가 도입한 개념이다.

## 동작 원리

**연산의 성질**:
- 결합법칙: (α ⊎ β) ⊎ γ = α ⊎ (β ⊎ γ)
- 좌소거법칙: α ⊎ β = α ⊎ γ → β = γ
- 우소거법칙: β ⊎ α = γ ⊎ α → β = γ
- 항등원: 빈 순열 ε
- **교환법칙은 일반적으로 성립하지 않음**
- 공통 원소 없는 순열들은 서로 교환 가능

**소인수 분해 (Theorem C)**: 모든 멀티셋 순열은 반복 원소 없는 사이클들의 삽입곱으로 분해된다. 이 표현은 (교환 가능한 인수들을 제외하면) 유일하다.

**소(prime) 순열**: 자신과 ε 외에 삽입곱 인수가 없는 순열. 반복 원소 없는 사이클이 바로 소 순열이다.

**Foata 대응 (Theorem B)**: 두 멀티셋 순열 사이의 일대일 대응 π ↔ π'이 존재하여 런(run)의 수와 역위 수 사이의 변환에 활용된다.

**MacMahon Master Theorem**: 행렬 (aij)에 대해, 멀티셋 {n1·x1, ..., nm·xm}의 모든 순열 π에 대한 ν(π)의 합은 det(I - A)의 역수와 관련된다.

## 예시

```
α = c a d a b,  β = b d d a d

α ⊎ β 계산:
두 줄 표기법을 합치고 위 줄 안정 정렬 →
결과: c a b d d a b d a d

소인수 분해 예 (a<b<c<d):
정준 분해: (d d b c a) ⊎ (d b b a)
```

## 관련 개념

- [Permutation Cycles](/knowledge/algorithms/sorting-selection/permutation-cycles/)
- [Involutions](/knowledge/algorithms/sorting-selection/involutions/)
- [Ascending Runs](/knowledge/algorithms/sorting-selection/ascending-runs/)
- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
