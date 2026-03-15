---
title: "이항계수 (Binomial Coefficient)"
description: "이항계수(Binomial Coefficient) (n choose r), 즉 C(n, r)은 n개의 원소를 가진 집합에서 r개의 원소를 선택하는 방법의 수이며, n! / (r! * (n-r)!)로 계산된다"
tags: ['Binomial Coefficient', 'N Choose R', 'Combinatorics', 'Pascals Triangle', 'Counting']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/binomial-coefficient
sidebar:
  order: 6
---

## 핵심 개념

이항계수는 조합론, 확률론, 대수학 등 수학의 여러 분야에서 핵심적인 역할을 한다. 이항계수가 만족하는 주요 항등식들은 다음과 같다:

**대칭 항등식:** C(n, r) = C(n, n-r)

**파스칼 항등식(Pascal's Identity):**
C(n+1, k) = C(n, k-1) + C(n, k)

이 항등식은 파스칼의 삼각형(Pascal's Triangle)의 기초이다. 삼각형의 n번째 행은 C(n, 0), C(n, 1), ..., C(n, n)으로 구성되며, 인접한 두 수를 더하면 다음 행의 가운데 수가 된다.

**이항계수의 합:**
- sum_{k=0}^{n} C(n, k) = 2^n (n개의 원소를 가진 집합의 전체 부분집합 수)
- sum_{k=0}^{n} (-1)^k * C(n, k) = 0 (홀수/짝수 크기 부분집합의 수가 같음)
- sum_{k=0}^{n} 2^k * C(n, k) = 3^n

**반데르몽드 항등식(Vandermonde's Identity):**
C(m+n, r) = sum_{k=0}^{r} C(m, r-k) * C(n, k)

이항계수의 계산 시, n과 r이 큰 경우 팩토리얼을 직접 계산하면 오버플로우가 발생할 수 있다. 실무적으로는 약분을 먼저 수행하거나, 프로그래밍 언어의 choose(n, k) 또는 binom(n, k) 함수를 사용한다.

## 예시

**파스칼의 삼각형 (처음 5행):**
```
         1
        1 1
       1 2 1
      1 3 3 1
     1 4 6 4 1
    1 5 10 10 5 1
```

**파스칼 항등식 검증:**
```
C(7, 5) = C(6, 4) + C(6, 5) = 15 + 6 = 21
```

**이항계수의 합:**
```
n = 4일 때:
C(4,0) + C(4,1) + C(4,2) + C(4,3) + C(4,4)
= 1 + 4 + 6 + 4 + 1 = 16 = 2^4
```

**반데르몽드 항등식 적용:**
m개의 원소를 가진 집합과 n개의 원소를 가진 집합의 합집합에서 r개를 선택:
```
C(m+n, r) = sum_{k=0}^{r} C(m, r-k) * C(n, k)
첫 번째 집합에서 (r-k)개, 두 번째 집합에서 k개 선택
```

**특수 경우 (m = n = r):**
```
C(2n, n) = sum_{k=0}^{n} C(n, k)^2
```

## 관련 개념

- [Combination](/knowledge/mathematics/combination/) - 이항계수는 r-조합의 수
- [Binomial Theorem](/knowledge/mathematics/binomial-theorem/) - 이항계수가 이항 전개의 계수로 등장
- [Pascal's Identity](/knowledge/mathematics/pascals-identity/) - 이항계수의 재귀적 관계
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 이항계수 항등식의 증명에 활용
- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 파스칼 항등식에 의한 재귀적 정의
