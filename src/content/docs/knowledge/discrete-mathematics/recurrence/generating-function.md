---
title: "Generating Function"
description: "수열 a_0, a_1, a_2, "
tags: ['Generating Function', 'Power Series', 'Counting', 'Combinatorics', 'Recurrence Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/generating-function
sidebar:
  order: 6
---

## 핵심 개념

생성함수는 수열을 하나의 함수로 표현함으로써 조합론적 문제를 대수적으로 다룰 수 있게 한다. 형식적 거듭제곱 급수(formal power series)로 취급할 때 수렴 문제는 무시하고 대수적 조작에만 집중한다.

**핵심 공식들**:
- 1/(1-x) = 1 + x + x^2 + ... (수열 1, 1, 1, ...의 생성함수)
- 1/(1-ax) = 1 + ax + a^2*x^2 + ... (수열 1, a, a^2, ...의 생성함수)
- 1/(1-x)^n = sum C(n+k-1, k) * x^k (확장 이항정리에 의한)
- (1+x)^n = sum C(n,k) * x^k (이항정리)

**주요 활용**:
1. **계수 문제 해결**: 제약 조건이 있는 조합 문제에서 각 조건에 대응하는 인수를 곱하고, 원하는 x^r의 계수를 찾는다.
2. **점화식 풀기**: 점화식을 생성함수에 대한 방정식으로 변환하고, 이를 풀어 닫힌 형태를 구한 뒤, 거듭제곱 급수로 전개하여 수열의 항을 찾는다.
3. **항등식 증명**: 생성함수의 대수적 관계를 이용하여 조합적 항등식을 증명한다.

**확장 이항계수**: u가 실수, k가 음이 아닌 정수일 때
(u choose k) = u(u-1)...(u-k+1) / k!

**확장 이항정리**: |x| < 1일 때
(1+x)^u = sum_{k=0}^{infinity} (u choose k) * x^k

## 예시

**계수 문제**: 8개의 동일한 쿠키를 3명에게 나눠주되, 각 2개 이상 4개 이하
```
생성함수: (x^2 + x^3 + x^4)^3
x^8의 계수를 구하면 답은 6가지
```

**동전 교환 문제**: $1, $2, $5 토큰으로 r달러를 만드는 방법의 수 (순서 무시)
```
생성함수: (1+x+x^2+...)(1+x^2+x^4+...)(1+x^5+x^10+...)
        = 1/((1-x)(1-x^2)(1-x^5))
x^r의 계수가 답
```

**점화식 풀기**: a_k = 3a_{k-1}, a_0 = 2
```
G(x) = sum a_k * x^k로 놓으면
G(x) - 3xG(x) = a_0 = 2
G(x) = 2/(1-3x) = 2 * sum 3^k * x^k
따라서 a_k = 2 * 3^k
```

**항등식 증명**: sum_{k=0}^{n} C(n,k)^2 = C(2n, n)
```
(1+x)^{2n} = [(1+x)^n]^2
x^n의 계수를 비교하면:
좌변: C(2n, n)
우변: sum_{k=0}^{n} C(n,k) * C(n,n-k) = sum C(n,k)^2
```

## 관련 개념

- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 생성함수로 점화식을 풀 수 있음
- [Combination](/knowledge/mathematics/combination/) - 조합 계수가 생성함수의 계수로 나타남
- [Sequence](/knowledge/mathematics/sequence/) - 생성함수가 표현하는 대상
- [Catalan Number](/knowledge/mathematics/catalan-number/) - 생성함수로 카탈란 수의 닫힌 공식을 유도
- [Linear Homogeneous Recurrence Relation](/knowledge/mathematics/linear-homogeneous-recurrence-relation/) - 생성함수로 풀 수 있는 점화식 유형
