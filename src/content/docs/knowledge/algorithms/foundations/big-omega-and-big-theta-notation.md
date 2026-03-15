---
title: "빅오메가와 빅세타 표기법 (Big-Omega and Big-Theta Notation)"
description: "Big-Omega: f(x)가 Ω(g(x))이라 함은, x > k일 때 |f(x)| >= C|g(x)|를 만족하는 양의 상수 C와 k가 존재한다는 것으로, 점근적 하한(asymptotic lower bound)을 나타낸다"
tags: ['Big Omega', 'Big Theta', 'Asymptotic Analysis', 'Lower Bound', 'Tight Bound', 'Growth Of Functions']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/big-omega-and-big-theta-notation
sidebar:
  order: 25
---

## 핵심 개념

Donald Knuth가 1970년대에 Big-O 표기법의 오용을 방지하기 위해 Big-Omega와 Big-Theta 표기법을 도입했다.

### Big-Omega (Ω) - 점근적 하한
- f(x)가 Ω(g(x))이라는 것은 g(x)가 O(f(x))인 것과 동치이다.
- 알고리즘이 "적어도 이만큼의 연산이 필요하다"는 하한을 제시할 때 사용한다.

### Big-Theta (Θ) - 정확한 차수
- f(x)가 Θ(g(x))이려면 양의 상수 C1, C2, k가 존재하여:
  C1|g(x)| <= |f(x)| <= C2|g(x)| (x > k일 때)
- 이 조건은 f(x)가 O(g(x))이면서 Ω(g(x))인 것과 동치이다.
- f(x)가 Θ(g(x))이면 g(x)도 Θ(f(x))이다.

### 세 표기법의 관계
| 표기법 | 의미 | 한계 유형 |
|--------|------|-----------|
| O(g(x)) | 상한 | f(x)는 g(x)보다 빠르게 증가하지 않음 |
| Ω(g(x)) | 하한 | f(x)는 g(x)보다 느리게 증가하지 않음 |
| Θ(g(x)) | 정확한 차수 | f(x)와 g(x)는 같은 비율로 증가 |

**다항식 정리**: f(x) = a_n·x^n + ... + a_0 (a_n ≠ 0)이면, f(x)는 Θ(x^n)이다. 즉, 다항식의 최고차항이 정확한 차수를 결정한다.

주의: Big-O 표기법이 Big-Theta와 같은 의미인 것처럼 잘못 사용되는 경우가 많다. 엄밀하게는 상한만을 나타내므로, 정확한 차수를 표현하려면 Big-Theta를 사용해야 한다.

## 예시

**Big-Omega 예시**: f(x) = 8x³ + 5x² + 7이 Ω(x³)임을 증명

모든 양의 실수 x에 대해:
8x³ + 5x² + 7 >= 8x³

따라서 C = 8, k = 0이 증인이다.

**Big-Theta 예시**: 처음 n개 양의 정수의 합이 Θ(n²)임을 증명

상한: 1 + 2 + ... + n <= n + n + ... + n = n² → O(n²)

하한: 1 + 2 + ... + n >= ⌈n/2⌉ + ... + n >= (n/2)(n/2) = n²/4 → Ω(n²)

따라서 f(n) = 1 + 2 + ... + n은 Θ(n²)이다.

**다항식 예시**:
- 3x⁸ + 10x⁷ + 221x² + 1444는 Θ(x⁸)
- x¹⁹ - 18x⁴ - 10112는 Θ(x¹⁹)

## 관련 개념

- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/big-o-notation/) - 점근적 상한 표기법
- [시간 복잡도 (Time Complexity)](/knowledge/algorithms/time-complexity/) - 알고리즘 분석에서의 활용
- [정렬 알고리즘 (Sorting Algorithm)](/knowledge/algorithms/sorting-algorithm/) - 정렬 알고리즘의 Θ(n²), Θ(n log n) 복잡도
