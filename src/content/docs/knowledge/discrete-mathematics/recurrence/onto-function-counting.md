---
title: "Onto Function Counting"
description: "m개의 원소를 가진 집합에서 n개의 원소를 가진 집합으로의 전사함수(onto function)의 수는 포함-배제 원리를 적용하여 n^m - C(n,1)(n-1)^m + C(n,2)(n-2)^m - "
tags: ['Onto Function', 'Surjection', 'Inclusion Exclusion', 'Counting', 'Stirling Number']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/onto-function-counting
sidebar:
  order: 9
---

## 핵심 개념

**전사함수란**: 공역의 모든 원소가 적어도 하나의 정의역 원소에 의해 대응되는 함수이다. 즉, 치역(range)이 공역(codomain)과 같다.

**포함-배제를 이용한 유도**: 공역의 원소가 b_1, b_2, ..., b_n일 때
- P_i: b_i가 치역에 포함되지 않는 성질
- 전사함수의 수 = N(P'_1 P'_2 ... P'_n)
- N = n^m (정의역 m개의 원소 각각에 대해 공역의 n개 원소 중 선택)
- N(P_i) = (n-1)^m (b_i를 제외한 n-1개 중 선택)
- N(P_i P_j) = (n-2)^m (b_i, b_j 제외)
- 일반적으로 N(P_{i_1}...P_{i_k}) = (n-k)^m
- C(n,k)개의 k원소 부분집합이 있으므로 포함-배제를 적용

**스털링 수와의 관계**: 전사함수의 수 = n! * S(m, n)
여기서 S(m, n)은 제2종 스털링 수(Stirling number of the second kind)로, m개의 구별 가능한 객체를 n개의 구별 불가능한 상자에 빈 상자 없이 분배하는 방법의 수이다.

전사함수 세기는 단사함수(one-to-one) 세기보다 훨씬 어렵다. 단사함수는 단순히 P(n, m) = n!/(n-m)!이지만, 전사함수는 포함-배제 원리가 필요하다.

## 예시

**6개 원소에서 3개 원소로의 전사함수**:
```
전사함수의 수 = 3^6 - C(3,1)*2^6 + C(3,2)*1^6
             = 729 - 3*64 + 3*1
             = 729 - 192 + 3
             = 540
```

**5개의 서로 다른 직무를 4명의 직원에게 배정 (각 직원 최소 1개)**:
```
전사함수의 수 = 4^5 - C(4,1)*3^5 + C(4,2)*2^5 - C(4,3)*1^5
             = 1024 - 4*243 + 6*32 - 4*1
             = 1024 - 972 + 192 - 4
             = 240가지
```

**검증 (작은 예시)**: 2개에서 2개로의 전사함수
```
= 2^2 - C(2,1)*1^2
= 4 - 2 = 2
실제: {(1,1),(2,2)}는 비전사, {(1,2),(2,1)}는 비전사가 아님
전사함수: (1→1,2→2)와 (1→2,2→1) => 2개 맞음
```

## 관련 개념

- [Function](/knowledge/mathematics/function/) - 전사함수는 함수의 특수한 유형
- [Inclusion-Exclusion Principle](/knowledge/mathematics/inclusion-exclusion-principle/) - 전사함수 공식의 유도에 사용
- [Permutation](/knowledge/mathematics/permutation/) - 전사함수의 수는 스털링 수와 순열의 곱
- [Combination](/knowledge/mathematics/combination/) - 공식에 이항 계수가 등장
- [Set](/knowledge/mathematics/set/) - 정의역과 공역이 집합
