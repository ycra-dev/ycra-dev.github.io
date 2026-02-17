---
title: "Inductive Hypothesis"
description: "귀납 가설(Inductive Hypothesis)은 수학적 귀납법의 귀납 단계에서 임의의 정수 k에 대해 P(k)가 참이라고 가정하는 것이다"
tags: ['Inductive Hypothesis', 'Mathematical Induction', 'Proof Technique', 'Inductive Step', 'Assumption']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/inductive-hypothesis
sidebar:
  order: 2
---

## 핵심 개념

### 귀납 가설의 본질

귀납 가설은 순환 논증(circular reasoning)이 아니다. P(k)가 모든 정수에 대해 참이라고 가정하는 것이 아니라, 특정한 하나의 임의의(arbitrary) 정수 k에 대해 P(k)가 참이라고 가정하고, 이로부터 P(k+1)이 참임을 보이는 것이다. 이것은 조건문 P(k) → P(k+1)이 모든 k에 대해 참임을 증명하는 것과 같다.

### 귀납 가설의 사용 전략

귀납 단계에서 가장 어려운 부분은 귀납 가설을 어떻게 활용하여 P(k+1)을 증명할 것인가이다. 일반적인 전략:

1. **합 공식**: P(k)의 등식에 (k+1)번째 항을 양변에 더한다
2. **부등식**: P(k)의 부등식에서 출발하여 적절한 항을 더하거나 변환한다
3. **나눗셈**: (k+1)에 대한 식을 k에 대한 부분과 나머지로 분리하여, k에 대한 부분에 귀납 가설을 적용한다
4. **집합 성질**: k+1개의 원소를 가진 집합을 k개의 원소 집합과 하나의 원소로 분리한다

### 표준 귀납법 vs 강한 귀납법의 귀납 가설

| | 표준 귀납법 | 강한 귀납법 |
|---|---|---|
| **귀납 가설** | P(k) 하나만 가정 | P(1), P(2), ..., P(k) 모두 가정 |
| **증명 대상** | P(k+1) | P(k+1) |
| **사용 시기** | P(k) → P(k+1)이 직접적 | P(j) (j < k)도 필요할 때 |

### 흔한 실수

1. **기초 단계 누락**: 귀납 단계만 증명하고 기초 단계를 생략하면 거짓인 명제도 "증명"될 수 있다
2. **귀납 가설 미사용**: 귀납 단계에서 실제로 귀납 가설을 사용하지 않으면 증명이 성립하지 않을 가능성이 높다
3. **작은 값에서의 실패**: 귀납 단계가 특정 작은 값의 k에서 성립하지 않을 수 있다 (예: k=2에서 k=3으로의 전이가 실패하는 경우)

## 예시

**예시 1: 합 공식에서의 귀납 가설 사용**

P(n): 1 + 3 + 5 + ... + (2n-1) = n^2

- **귀납 가설**: 1 + 3 + 5 + ... + (2k-1) = k^2
- **P(k+1) 증명**:
  ```
  1 + 3 + 5 + ... + (2k-1) + (2k+1)
  = k^2 + (2k+1)        ← 귀납 가설 (IH) 사용
  = k^2 + 2k + 1
  = (k+1)^2              ← P(k+1) 성립
  ```

**예시 2: 부등식에서의 귀납 가설 사용**

P(n): 2^n < n! (n >= 4)

- **귀납 가설**: 2^k < k! (k >= 4)
- **P(k+1) 증명**:
  ```
  2^(k+1) = 2 * 2^k
          < 2 * k!       ← 귀납 가설 사용
          < (k+1) * k!   ← 2 < k+1 (k >= 4이므로)
          = (k+1)!       ← P(k+1) 성립
  ```

**예시 3: 잘못된 증명 - 기초 단계의 숨겨진 오류**

"모든 직선 집합에서, 평행한 쌍이 없으면 모두 한 점에서 만난다"는 거짓 명제의 "증명":
- P(2)는 참 (평행하지 않은 두 직선은 한 점에서 만남)
- 귀납 단계는 k >= 3일 때만 작동 (k=2일 때 P(2) → P(3) 전이가 실패)
- 오류: 3개의 직선에서 "처음 2개"와 "마지막 2개"의 공통 직선이 하나뿐이므로 교점이 같다고 보장할 수 없음

**예시 4: 강한 귀납법의 귀납 가설**

P(n): n > 1인 모든 정수 n은 소수들의 곱으로 표현 가능

- **귀납 가설**: 2 <= j <= k인 모든 j에 대해 P(j) 참
- k+1이 합성수이면 k+1 = a * b (2 <= a, b < k+1)
- P(a)와 P(b)가 모두 참이므로 (강한 귀납 가설) k+1도 소수 곱으로 표현 가능

## 관련 개념

- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 귀납 가설은 수학적 귀납법의 핵심 요소
- [Strong Induction](/knowledge/mathematics/strong-induction/) - 더 강력한 귀납 가설을 사용
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 귀납 가설의 올바른 사용이 증명의 관건
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 귀납 가설이 실패하는 경우 분석
- [Predicate Logic](/knowledge/mathematics/predicate-logic/) - 귀납 가설은 ∀k(P(k) → P(k+1))의 증명 과정
