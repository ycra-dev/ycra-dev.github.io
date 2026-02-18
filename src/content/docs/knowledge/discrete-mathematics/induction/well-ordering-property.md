---
title: "Well-Ordering Property"
description: "정렬 원리(Well-Ordering Property)는 \"음이 아닌 정수의 모든 비어있지 않은 부분집합은 최소 원소(least element)를 가진다\"는 공리이다"
tags: ['Well Ordering', 'Axiom', 'Nonnegative Integers', 'Least Element', 'Mathematical Induction']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/well-ordering-property
sidebar:
  order: 4
---

## 핵심 개념

정렬 원리의 핵심 내용:

> **Every nonempty set of nonnegative integers has a least element.**

이 원리는 양의 정수 집합에 대한 공리(axiom)로 취급되며, 다음 세 가지 원리는 모두 동치이다:
1. **정렬 원리** (Well-Ordering Property)
2. **수학적 귀납법의 원리** (Principle of Mathematical Induction)
3. **강한 귀납법** (Strong Induction)

즉, 이 셋 중 하나를 공리로 채택하면 나머지 둘을 정리(theorem)로 증명할 수 있다.

**정렬 원리로부터 수학적 귀납법의 타당성 증명:**
P(1)이 참이고 ∀k(P(k) → P(k+1))이 참이라고 가정하자. P(n)이 거짓인 양의 정수가 존재한다고 가정하면, P(n)이 거짓인 양의 정수들의 집합 S는 비어있지 않다. 정렬 원리에 의해 S는 최소 원소 m을 가진다. m != 1 (P(1)이 참이므로), 따라서 m-1은 양의 정수이고 S에 속하지 않으므로 P(m-1)이 참이다. 그런데 P(m-1) → P(m)도 참이므로 P(m)이 참이어야 하는데, 이는 m이 S에 속한다는 가정에 모순이다.

정렬 원리는 직접 증명에도 사용될 수 있다. 특히 최소 반례(least counterexample)를 찾아 모순을 유도하는 방식으로 활용된다.

정렬 원리가 적용되는 집합에 대한 주의: 모든 집합이 정렬(well-ordered)되는 것은 아니다. 예를 들어, 정수 전체의 집합, 양의 유리수 집합 등은 정렬되지 않는다(최소 원소가 없는 비어있지 않은 부분집합이 존재한다).

## 예시

**예시 1: 나눗셈 알고리즘(Division Algorithm) 증명**

정수 a와 양의 정수 d에 대해, a = dq + r (0 <= r < d)을 만족하는 유일한 정수 q, r이 존재함을 증명한다.

- S = {a - dq | q는 정수, a - dq >= 0} 으로 정의한다.
- S는 비어있지 않다 (q를 충분히 작은 음수로 택하면 a - dq > 0).
- 정렬 원리에 의해 S는 최소 원소 r = a - dq_0를 가진다.
- r >= 0이다 (S의 원소 정의에 의해).
- r < d임을 보인다: 만약 r >= d이면, a - d(q_0 + 1) = r - d >= 0이 되어 S에 더 작은 원소가 존재하게 되어 모순이다.

**예시 2: 라운드 로빈 토너먼트에서의 3-사이클**

라운드 로빈 토너먼트에서 길이 m(m >= 3)인 사이클이 존재하면, 길이 3인 사이클도 반드시 존재함을 증명한다.

- 길이 3인 사이클이 없다고 가정한다.
- 사이클이 존재하므로, 사이클 길이의 집합은 비어있지 않다.
- 정렬 원리에 의해 최소 사이클 길이 k가 존재한다 (k > 3 가정에 의해).
- 사이클 p1, p2, ..., pk에서 p1과 p3의 경기 결과를 분석하면 길이 3 또는 k-1인 사이클이 생겨 모순이다.

## 관련 개념

- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 정렬 원리와 동치인 증명 원리
- [Strong Induction](/knowledge/mathematics/strong-induction/) - 정렬 원리와 동치인 증명 원리
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 정렬 원리를 이용한 증명은 종종 귀류법 형태
- [Set](/knowledge/mathematics/set/) - 정렬 원리는 집합의 성질에 관한 공리
