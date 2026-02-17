---
title: "Stars and Bars"
description: "별과 막대(Stars and Bars)는 n가지 종류의 원소에서 반복을 허용하여 r개를 선택하는 문제(반복 조합)를 해결하는 기법으로, r개의 별(stars)과 (n-1)개의 막대(bars)의 배열로 변환하여 C(n+r-1, r)가지임을 보이는 방법이다"
tags: ['Stars And Bars', 'Combination With Repetition', 'Counting', 'Integer Partition', 'Distributing Objects']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/stars-and-bars
sidebar:
  order: 10
---

## 핵심 개념

반복이 허용된 r-조합은, n개의 종류에서 반복하여 r개를 선택하는 문제이다. 이를 해결하기 위해 **별과 막대(Stars and Bars)** 기법을 사용한다.

**핵심 아이디어:** n-1개의 막대(bars, |)로 n개의 구간을 만들고, r개의 별(stars, *)을 이 구간에 배치한다. i번째 구간에 있는 별의 수는 i번째 종류의 원소를 선택한 횟수를 나타낸다.

총 (n-1+r)개의 위치에서 r개의 별 위치를 선택하면 되므로:

**C(n+r-1, r) = C(n+r-1, n-1)**

이 기법은 다음과 동치인 문제들을 해결한다:
1. n가지 종류에서 반복 허용하여 r개 선택
2. r개의 구별 불가능한 물체를 n개의 구별 가능한 상자에 분배
3. 음이 아닌 정수 해의 수: x1 + x2 + ... + xn = r

**제약 조건이 있는 경우:** xi >= qi인 조건이 추가되면, 먼저 qi개씩 배분한 후 나머지를 분배한다:
```
C(n + r - q1 - q2 - ... - qn - 1, r - q1 - q2 - ... - qn)
```

## 예시

**기본 별과 막대:**
7가지 종류의 지폐에서 5장을 선택하는 방법의 수:
```
6개의 막대(|)와 5개의 별(*)을 배열
예: **|***|||| → $100 2장, $50 3장
    |*||*|*|*|* → $50 1장, $10 1장, $5 1장, $2 1장, $1 1장

C(11, 5) = C(11, 6) = 462
```

**정수 방정식의 해:**
x1 + x2 + x3 = 11 (xi >= 0인 정수)의 해의 수:
```
3가지 종류에서 11개 선택 (반복 허용)
C(3 + 11 - 1, 11) = C(13, 11) = C(13, 2) = 78
```

**제약 조건 추가:**
x1 + x2 + x3 = 11, x1 >= 1, x2 >= 2, x3 >= 3:
```
먼저 x1에 1, x2에 2, x3에 3을 배분 → 나머지 5
y1 + y2 + y3 = 5 (yi >= 0)의 해의 수
C(3 + 5 - 1, 5) = C(7, 5) = 21
```

**구별 불가능한 물체를 구별 가능한 상자에 분배:**
10개의 같은 공을 8개의 다른 상자에 넣는 방법:
```
C(8 + 10 - 1, 10) = C(17, 10) = 19,448
```

**쿠키 선택 문제:**
4종류의 쿠키에서 6개를 선택하는 방법:
```
C(4 + 6 - 1, 6) = C(9, 6) = C(9, 3) = 84
```

## 관련 개념

- [Combination](/knowledge/mathematics/combination/) - 반복 없는 조합의 일반화
- [Permutation](/knowledge/mathematics/permutation/) - 반복 허용 순열과의 비교
- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - 별과 막대 결과가 이항계수로 표현됨
- [Product Rule](/knowledge/mathematics/product-rule/) - 분배 문제에서 곱의 법칙과 함께 사용
