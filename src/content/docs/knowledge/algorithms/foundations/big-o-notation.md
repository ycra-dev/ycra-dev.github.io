---
title: "빅오 표기법 (Big-O Notation)"
description: "f(x)가 O(g(x))이라 함은, x > k일 때 |f(x)| <= C|g(x)|를 만족하는 상수 C와 k가 존재한다는 것이다"
tags: ['Big O', 'Asymptotic Analysis', 'Growth Of Functions', 'Complexity Analysis', 'Upper Bound']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/big-o-notation
sidebar:
  order: 24
---

## 핵심 개념

Big-O 표기법은 1892년 독일 수학자 Paul Bachmann이 도입하고, Donald Knuth가 컴퓨터 과학에서의 사용을 대중화했다. 이 표기법의 핵심적 의의는 다음과 같다:

**증인(Witnesses)**: 관계 f(x) is O(g(x))를 성립시키는 상수 쌍 C와 k를 증인이라 한다. 하나의 증인 쌍만 찾으면 관계가 성립한다. 하나의 증인이 존재하면 무한히 많은 증인이 존재한다(C나 k를 더 크게 잡으면 되므로).

**핵심 원리:**
- Big-O 표기법은 상수 배수와 저차항을 무시한다.
- 하드웨어/소프트웨어에 의존하지 않는 알고리즘 분석이 가능하다.
- 함수의 증가율만 비교하므로, 입력 크기가 커질 때의 효율성을 판단할 수 있다.

**다항식에 대한 Big-O 정리:**
f(x) = a_n·x^n + a_{n-1}·x^{n-1} + ... + a_1·x + a_0 이면, f(x)는 O(x^n)이다. 즉, 다항식의 차수가 점근적 증가율을 결정한다.

**함수 조합에 대한 규칙:**
- **합의 규칙**: f1이 O(g1)이고 f2가 O(g2)이면, f1+f2는 O(max(|g1|, |g2|))이다.
- **곱의 규칙**: f1이 O(g1)이고 f2가 O(g2)이면, f1·f2는 O(g1·g2)이다.

**주요 함수의 증가율 순서:**
1 < log n < n < n log n < n² < 2^n < n!

## 예시

**예시 1**: f(x) = x² + 2x + 1이 O(x²)임을 증명

x > 1일 때, x < x², 1 < x²이므로:
x² + 2x + 1 <= x² + 2x² + x² = 4x²

따라서 C = 4, k = 1이 증인이다.

**예시 2**: n²이 O(n)이 아님을 증명 (귀류법)

n² <= Cn이 n > k인 모든 n에서 성립한다고 가정하면:
양변을 n으로 나누면 n <= C가 되어야 하는데,
n은 임의로 커질 수 있으므로 모순이다.

**예시 3**: 증가율 비교

함수들을 증가율 순서로 나열:
(log n)² < 8√n < 2n log n < n² < (1.1)^n < n!

## 관련 개념

- [빅오메가와 빅세타 표기법 (Big-Omega and Big-Theta Notation)](/knowledge/algorithms/big-omega-and-big-theta-notation/) - 하한과 정확한 차수를 표현하는 표기법
- [시간 복잡도 (Time Complexity)](/knowledge/algorithms/time-complexity/) - Big-O를 활용한 알고리즘 분석
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - Big-O 분석의 대상
- [선형 탐색 (Linear Search)](/knowledge/algorithms/linear-search/) - O(n) 복잡도를 가진 탐색 알고리즘
- [이진 탐색 (Binary Search)](/knowledge/algorithms/binary-search/) - O(log n) 복잡도를 가진 탐색 알고리즘
