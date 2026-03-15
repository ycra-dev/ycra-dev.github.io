---
title: "순열 (Permutation)"
description: "순열(Permutation)이란 집합의 원소를 순서대로 나열한 것(ordered arrangement)이다"
tags: ['Permutation', 'R Permutation', 'Counting', 'Ordered Arrangement', 'Factorial']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/permutation
sidebar:
  order: 4
---

## 핵심 개념

r-순열의 수를 구하는 공식은 곱의 법칙으로 유도된다:

**P(n, r) = n(n-1)(n-2)...(n-r+1) = n! / (n-r)!**

첫 번째 원소는 n가지, 두 번째 원소는 (n-1)가지, ..., r번째 원소는 (n-r+1)가지 선택이 가능하기 때문이다.

특수한 경우:
- P(n, n) = n! (모든 원소의 순열)
- P(n, 0) = 1 (빈 순열은 하나)

**반복 허용 순열:** 반복이 허용되면 n개의 원소에서 r개를 선택하는 순열의 수는 n^r이다. 각 위치에서 n개 모두 선택 가능하기 때문이다.

**비구별 원소의 순열:** n개의 물체 중 n1개가 같은 종류 1, n2개가 같은 종류 2, ..., nk개가 같은 종류 k일 때, 순열의 수는:
```
n! / (n1! * n2! * ... * nk!)
```

이는 동일한 원소 간의 순서를 고려한 이중 계수를 제거하기 위해 나누는 것이다.

## 예시

**기본 순열:**
100명 중 1등, 2등, 3등을 선택하는 방법의 수:
```
P(100, 3) = 100 * 99 * 98 = 970,200
```

**문자열 내 블록 순열:**
ABCDEFGH의 순열 중 ABC가 연속으로 나타나는 것의 수:
```
ABC를 하나의 블록으로 취급 → 6개 객체의 순열
6! = 720
```

**비구별 원소 순열:**
SUCCESS의 문자를 재배열하는 방법의 수 (S 3개, C 2개, U 1개, E 1개):
```
7! / (3! * 2! * 1! * 1!) = 5040 / 12 = 420
```

**반복 허용 순열:**
영문 대문자 알파벳으로 길이 r인 문자열을 만드는 방법의 수:
```
26^r (각 위치에서 26개 문자 모두 선택 가능)
```

## 관련 개념

- [Combination](/knowledge/mathematics/combination/) - 순서를 무시하는 선택 (비순서 배열)
- [Product Rule](/knowledge/mathematics/product-rule/) - 순열 공식 유도의 기초
- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - 조합과 순열의 관계
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 사전식 순서로 순열을 생성하는 알고리즘
