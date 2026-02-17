---
title: "Sequence"
description: "수열(Sequence)은 정수의 부분집합(보통 {0, 1, 2, "
tags: ['Sequence', 'Arithmetic Progression', 'Geometric Progression', 'String', 'Summation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/sequence
sidebar:
  order: 8
---

## 핵심 개념

수열은 순서가 있는 원소들의 목록을 나타내는 이산 구조로, 컴퓨터과학에서 리스트, 배열 등 순차적 데이터 구조의 수학적 기반이다.

**등비수열(Geometric Progression):**
- 형태: a, ar, ar², ..., arⁿ, ...
- 초항 a, 공비 r
- 지수 함수 f(x) = arˣ의 이산적 유사체
- 예: bₙ = (-1)ⁿ (초항 1, 공비 -1), cₙ = 2·5ⁿ (초항 2, 공비 5)

**등차수열(Arithmetic Progression):**
- 형태: a, a+d, a+2d, ..., a+nd, ...
- 초항 a, 공차 d
- 선형 함수 f(x) = dx + a의 이산적 유사체
- 예: sₙ = -1 + 4n (초항 -1, 공차 4)

**문자열(String)**: 유한 수열 a₁, a₂, ..., aₙ. 길이는 항의 수이다. 빈 문자열 λ는 길이 0이다. 비트열(bit string)은 문자열의 특수한 경우이다.

**시그마 표기법(Summation Notation):**
∑ⱼ₌ₘⁿ aⱼ = aₘ + aₘ₊₁ + ... + aₙ

**주요 합 공식:**
- 등비급수: ∑ⱼ₌₀ⁿ arʲ = a(rⁿ⁺¹ - 1)/(r - 1), r ≠ 1
- 자연수의 합: ∑ₖ₌₁ⁿ k = n(n+1)/2
- 제곱의 합: ∑ₖ₌₁ⁿ k² = n(n+1)(2n+1)/6
- 세제곱의 합: ∑ₖ₌₁ⁿ k³ = n²(n+1)²/4
- 무한 등비급수: ∑ₖ₌₀^∞ xᵏ = 1/(1-x), |x| < 1

**이중합(Double Summation)**: 중첩 루프의 분석에서 나타난다.
∑ᵢ₌₁⁴ ∑ⱼ₌₁³ ij = ∑ᵢ₌₁⁴ 6i = 6 + 12 + 18 + 24 = 60

유용한 정수 수열들: n², n³, 2ⁿ, n!, 피보나치 수 등. OEIS(On-Line Encyclopedia of Integer Sequences)에는 25만 개 이상의 수열이 등록되어 있다.

## 예시

```
등차수열: 5, 11, 17, 23, 29, ...
  aₙ = 5 + 6(n-1) = 6n - 1 (초항 5, 공차 6)

등비수열: 2, 10, 50, 250, 1250, ...
  cₙ = 2 · 5ⁿ (초항 2, 공비 5)

합 계산:
∑ⱼ₌₁⁵ j² = 1 + 4 + 9 + 16 + 25 = 55
         = 5·6·11/6 = 55 ✓ (공식 이용)

∑ₖ₌₅₀¹⁰⁰ k² = ∑ₖ₌₁¹⁰⁰ k² - ∑ₖ₌₁⁴⁹ k²
             = 100·101·201/6 - 49·50·99/6
             = 338,350 - 40,425 = 297,925
```

Python에서의 수열과 합:
```python
# 등비수열
geo = [2 * (5**n) for n in range(5)]
print(geo)  # [2, 10, 50, 250, 1250]

# 합 공식
n = 100
sum_squares = n * (n + 1) * (2*n + 1) // 6
print(sum_squares)  # 338350

# 등비급수 합
a, r, n = 3, 2, 8
geo_sum = a * (r**(n+1) - 1) // (r - 1)
print(geo_sum)  # 1533
```

## 관련 개념

- [Function](/knowledge/mathematics/function/) - 수열은 정수 부분집합에서의 함수
- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 점화식을 이용한 수열 정의
- [Set](/knowledge/mathematics/set/) - 수열의 항들로 이루어진 집합
- [Cardinality](/knowledge/mathematics/cardinality/) - 수열을 이용한 가산 집합의 나열
