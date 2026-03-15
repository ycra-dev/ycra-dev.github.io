---
title: "집합 분석 (Aggregate Analysis)"
description: "집합 분석(Aggregate Analysis)은 n개 연산의 시퀀스에 대해 총 최악 비용 T(n)의 상한을 구하고, 각 연산의 분할 상환 비용을 T(n)/n으로 정의하는 분할 상환 분석 기법이다"
tags: ['Aggregate Analysis', 'Amortized Analysis', 'Total Cost', 'Average Cost']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/aggregate-analysis
sidebar:
  order: 8
---

## 핵심 개념

집합 분석의 접근 방식:
1. 모든 n에 대해, n개 연산의 최악 총 비용 T(n)을 구한다.
2. 평균 비용(분할 상환 비용) = T(n)/n을 계산한다.
3. 이 분할 상환 비용을 모든 연산 유형에 동일하게 적용한다.

다른 두 방법(회계 방법, 포텐셜 방법)과 달리, 집합 분석에서는 서로 다른 유형의 연산에 서로 다른 분할 상환 비용을 부여하지 않는다.

**분석의 핵심**: 개별 연산의 최악 비용을 분석하는 대신, 시퀀스 전체의 구조적 특성을 활용하여 비싼 연산이 얼마나 자주 발생하는지를 파악한다.

## 예시

**스택 MULTIPOP 예시**:
```
// PUSH, POP: O(1), MULTIPOP(S, k): O(min{s, k})
// 개별 최악 분석: MULTIPOP은 O(n) -> n번 시퀀스 O(n^2)

// 집합 분석:
// - 객체는 push되어야만 pop할 수 있음
// - push는 최대 n번 -> pop(MULTIPOP 포함)도 최대 n번
// - 총 비용 T(n) = O(n)
// - 분할 상환 비용 = O(n)/n = O(1)
```

**이진 카운터 INCREMENT 예시**:
```
INCREMENT(A, k)
  i = 0
  while i < k and A[i] == 1
    A[i] = 0
    i = i + 1
  if i < k
    A[i] = 1

// 개별 최악 분석: 모든 비트가 1이면 O(k) -> n번 시퀀스 O(nk)

// 집합 분석:
// A[0]: 매번 뒤집힘 -> n번
// A[1]: 매 2번째 뒤집힘 -> floor(n/2)번
// A[i]: 매 2^i번째 뒤집힘 -> floor(n/2^i)번
// 총 뒤집힘 = sum_{i=0}^{k-1} floor(n/2^i) < n * sum_{i=0}^{inf} 1/2^i = 2n
// 분할 상환 비용 = O(2n)/n = O(1)
```

## 관련 개념

- [분할 상환 분석 (Amortized Analysis)](/knowledge/algorithms/amortized-analysis/)
- [회계 방법 (Accounting Method)](/knowledge/algorithms/accounting-method/)
- [퍼텐셜 방법 (Potential Method)](/knowledge/algorithms/potential-method/)
