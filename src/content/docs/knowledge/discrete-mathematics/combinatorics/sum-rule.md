---
title: "합의 법칙 (Sum Rule)"
description: "합의 법칙(Sum Rule)이란 어떤 작업을 n1가지 방법 또는 n2가지 방법으로 수행할 수 있고, 이 두 방법의 집합이 서로 겹치지 않을 때, 그 작업을 수행하는 총 방법의 수는 n1 + n2가지라는 계수 원리이다"
tags: ['Sum Rule', 'Counting', 'Combinatorics', 'Disjoint Sets', 'Enumeration']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/sum-rule
sidebar:
  order: 1
---

## 핵심 개념

합의 법칙은 서로 배타적인(mutually exclusive) 경우들의 수를 더하여 전체 경우의 수를 구하는 기본 원리이다. m개의 작업 방법 집합이 있을 때, 서로 쌍별 서로소(pairwise disjoint)이면:

전체 방법의 수 = n1 + n2 + ... + nm

집합론으로 표현하면, 유한 집합 A1, A2, ..., Am이 쌍별 서로소일 때:

|A1 ∪ A2 ∪ ... ∪ Am| = |A1| + |A2| + ... + |Am|

합의 법칙은 곱의 법칙과 함께 조합론의 두 가지 기본 계수 원리를 형성한다. 대부분의 복잡한 계수 문제는 이 두 법칙을 조합하여 풀 수 있다. 집합들이 서로소가 아닌 경우에는 합의 법칙을 직접 적용할 수 없으며, 이 경우 **포함-배제의 원리(Inclusion-Exclusion Principle)**를 사용해야 한다.

## 예시

**위원회 대표 선발:**
수학과 교수 37명 또는 수학 전공 학생 83명 중 대표 1명을 선택하는 방법의 수:
- 교수와 학생이 겹치지 않으므로 합의 법칙 적용
```
37 + 83 = 120가지
```

**변수명 계수 (BASIC 언어):**
1자리 또는 2자리 영숫자 변수명의 수 (첫 글자는 반드시 영문자, 예약어 5개 제외):
```
V1(1자리) = 26
V2(2자리) = 26 * 36 - 5 = 931
V = V1 + V2 = 26 + 931 = 957
```

**순차 반복문의 반복 횟수:**
```
k := 0
for i1 := 1 to n1
  k := k + 1
for i2 := 1 to n2
  k := k + 1
...
for im := 1 to nm
  k := k + 1
// 최종 k의 값 = n1 + n2 + ... + nm
```

## 관련 개념

- [Product Rule](/knowledge/mathematics/product-rule/) - 순차적 작업에 대한 기본 계수 원리
- [Inclusion-Exclusion Principle](/knowledge/mathematics/inclusion-exclusion-principle/) - 집합이 겹치는 경우의 일반화된 합의 법칙
- [Set](/knowledge/mathematics/set/) - 합의 법칙은 서로소 집합의 합집합 크기로 표현됨
