---
title: "완전순열 (Derangement)"
description: "완전순열(derangement)은 어떤 원소도 원래 위치에 남아 있지 않은 순열로, n개의 원소의 완전순열의 수 D_n은 포함-배제 원리를 사용하여 D_n = n! * [1 - 1/1! + 1/2! - 1/3! + "
tags: ['Derangement', 'Permutation', 'Inclusion Exclusion', 'Counting', 'Combinatorics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/derangement
sidebar:
  order: 8
---

## 핵심 개념

**유도 과정** (포함-배제 원리 이용):
- P_i를 "원소 i가 제자리에 있는" 성질이라 하자.
- D_n = N(P'_1 P'_2 ... P'_n), 즉 어떤 성질도 갖지 않는 순열의 수이다.
- N(P_{i_1} P_{i_2} ... P_{i_m}) = (n-m)! (m개의 원소가 고정되고 나머지는 자유)
- C(n,m)개의 m원소 부분집합이 있으므로: sum = C(n,m) * (n-m)! = n! / m!

포함-배제를 적용하면:
D_n = n! - C(n,1)(n-1)! + C(n,2)(n-2)! - ... + (-1)^n C(n,n)(0)!
    = n! [1 - 1/1! + 1/2! - ... + (-1)^n / n!]

**중요한 성질**:
- D_n/n! (완전순열이 될 확률)은 n이 커질수록 e^{-1} ≈ 0.368에 수렴한다.
- 이는 e^{-1} = sum_{k=0}^{infinity} (-1)^k / k! 이라는 급수에서 비롯된다.
- n이 아무리 커도 완전순열이 될 확률은 약 36.8%로 거의 일정하다.
- 점화식: D_n = (n-1)(D_{n-1} + D_{n-2}), n >= 2

**모자 문제 (Hatcheck Problem)**: 직원이 n명의 모자를 무작위로 돌려줄 때, 아무도 자기 모자를 받지 못할 확률은 D_n/n!이며, 이는 약 1/e ≈ 0.368이다.

## 예시

**작은 값들**:
```
D_1 = 0  (1개의 원소는 완전순열 불가)
D_2 = 1  (21)
D_3 = 2  (231, 312)
D_4 = 9  (2143, 2341, 2413, 3142, 3412, 3421, 4123, 4312, 4321)
D_5 = 44
```

**D_3 계산**:
```
D_3 = 3! [1 - 1/1! + 1/2! - 1/3!]
    = 6 [1 - 1 + 1/2 - 1/6]
    = 6 * (1/3)
    = 2
실제로 {1,2,3}의 완전순열: 231, 312
```

**확률 수렴**:
```
n=2: D_2/2! = 1/2 = 0.500
n=3: D_3/3! = 2/6 = 0.333
n=4: D_4/4! = 9/24 = 0.375
n=5: D_5/5! = 44/120 = 0.367
n=6: D_6/6! = 265/720 = 0.368
...
n→∞: e^{-1} ≈ 0.36788
```

## 관련 개념

- [Permutation](/knowledge/mathematics/permutation/) - 완전순열은 특수한 조건의 순열
- [Inclusion-Exclusion Principle](/knowledge/mathematics/inclusion-exclusion-principle/) - 완전순열 공식의 유도에 사용
- [Combination](/knowledge/mathematics/combination/) - D_n 공식에 이항 계수가 등장
- [Function](/knowledge/mathematics/function/) - 완전순열은 고정점이 없는 전단사함수
