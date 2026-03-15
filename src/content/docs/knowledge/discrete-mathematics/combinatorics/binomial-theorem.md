---
title: "이항정리 (Binomial Theorem)"
description: "이항정리(Binomial Theorem)란 x와 y가 변수이고 n이 음이 아닌 정수일 때, (x + y)^n을 이항계수를 사용하여 전개하는 공식이다: (x + y)^n = sum_{j=0}^{n} C(n, j) * x^(n-j) * y^j"
tags: ['Binomial Theorem', 'Polynomial Expansion', 'Binomial Coefficient', 'Combinatorial Proof', 'Algebra']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/binomial-theorem
sidebar:
  order: 7
---

## 핵심 개념

이항정리는 조합적 증명(combinatorial proof)으로 증명할 수 있다. (x + y)^n = (x+y)(x+y)...(x+y)를 전개할 때, 각 항 x^(n-j) * y^j는 n개의 인수 중 j개에서 y를 선택하고 나머지 (n-j)개에서 x를 선택하여 얻어진다. j개의 인수를 선택하는 방법의 수가 C(n, j)이므로, x^(n-j) * y^j의 계수는 C(n, j)이다.

이항정리에서 특수한 값을 대입하면 유용한 항등식들을 얻을 수 있다:

**x = 1, y = 1:** (1+1)^n = 2^n = sum_{k=0}^{n} C(n, k)
- 집합의 모든 부분집합의 수가 2^n임을 증명

**x = -1, y = 1:** 0 = sum_{k=0}^{n} (-1)^k * C(n, k)
- 짝수 크기 부분집합의 수 = 홀수 크기 부분집합의 수

**x = 1, y = 2:** 3^n = sum_{k=0}^{n} 2^k * C(n, k)

이항정리는 다항정리(Multinomial Theorem)로 일반화된다:
(x1 + x2 + ... + xm)^n = sum C(n; n1, n2, ..., nm) * x1^n1 * x2^n2 * ... * xm^nm
여기서 다항계수 C(n; n1, ..., nm) = n! / (n1! * n2! * ... * nm!)

## 예시

**(x + y)^4의 전개:**
```
(x + y)^4 = C(4,0)x^4 + C(4,1)x^3y + C(4,2)x^2y^2 + C(4,3)xy^3 + C(4,4)y^4
           = x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4
```

**(x + y)^25 전개에서 x^12 * y^13의 계수:**
```
C(25, 13) = 25! / (13! * 12!) = 5,200,300
```

**(2x - 3y)^25 전개에서 x^12 * y^13의 계수:**
```
(2x + (-3y))^25에서 j = 13일 때:
C(25, 13) * 2^12 * (-3)^13
= -(25! / (13! * 12!)) * 2^12 * 3^13
```

**Python으로 이항 전개 계수 계산:**
```python
from math import comb

# (x + y)^n 전개에서 x^(n-j) * y^j의 계수
n = 25
j = 13
coefficient = comb(n, j)  # 5200300
```

## 관련 개념

- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - 이항정리의 핵심 구성요소
- [Pascal's Identity](/knowledge/mathematics/pascals-identity/) - 이항계수의 재귀적 관계
- [Combination](/knowledge/mathematics/combination/) - 이항계수 C(n, j)는 조합의 수
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 이항정리의 귀납법 증명
