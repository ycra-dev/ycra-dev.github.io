---
title: "포함-배제 원리 (Inclusion-Exclusion Principle)"
description: "포함-배제의 원리(Inclusion-Exclusion Principle)란 두 방법 중 하나로 수행 가능한 작업에서, 공통되는 방법이 있을 때, 전체 방법의 수는 n1 + n2에서 공통 방법의 수를 뺀 것이라는 계수 원리이다"
tags: ['Inclusion Exclusion', 'Subtraction Rule', 'Counting', 'Set Union', 'Overcounting']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/inclusion-exclusion-principle
sidebar:
  order: 11
---

## 핵심 개념

포함-배제의 원리는 뺄셈 규칙(Subtraction Rule)이라고도 불리며, 합의 법칙만으로는 해결할 수 없는 경우, 즉 두 집합이 겹치는 경우에 적용된다. 합의 법칙을 단순히 적용하면 교집합에 속하는 원소가 **이중 계수(overcounting)**되므로, 이를 보정하기 위해 교집합의 크기를 빼준다.

두 집합에 대한 공식:
|A1 ∪ A2| = |A1| + |A2| - |A1 ∩ A2|

이 원리는 n개의 집합의 합집합으로 일반화할 수 있으며, 8장에서 더 자세히 다룬다. 일반화된 공식은 교대하는 부호로 교집합들의 크기를 더하고 빼는 형태를 가진다.

포함-배제의 원리는 비트 문자열 계수, 정수의 배수 문제, 확률 계산 등 다양한 분야에서 활용된다. **이중 계수(overcounting)**는 열거에서 가장 흔한 오류이므로, 이 원리를 올바르게 적용하는 것이 중요하다.

**일반화된 공식 (Ch.8 심화)**:
|A_1 ∪ A_2 ∪ ... ∪ A_n| = Σ|A_i| - Σ|A_i ∩ A_j| + Σ|A_i ∩ A_j ∩ A_k| - ... + (-1)^{n+1}|A_1 ∩ ... ∩ A_n|

이 공식에는 2^n - 1개의 항이 있다. **증명의 핵심**: 합집합의 임의의 원소가 정확히 r개의 집합에 속한다면, 우변에서 이 원소가 세어지는 횟수는 C(r,1) - C(r,2) + ... + (-1)^{r+1}C(r,r) = 1이다.

**대안적 형태** (성질을 이용한 표현):
N(P'_1 P'_2 ... P'_n) = N - ΣN(P_i) + ΣN(P_i P_j) - ... + (-1)^n N(P_1 P_2 ... P_n)

**주요 응용**: 에라토스테네스의 체를 이용한 소수 개수 계산, 전사함수(onto function)의 수, 완전순열(derangement)의 수, 오일러 파이 함수 계산

## 예시

**비트 문자열 문제:**
길이 8인 비트 문자열 중 1로 시작하거나 00으로 끝나는 것의 수:
```
1로 시작하는 것: 2^7 = 128
00으로 끝나는 것: 2^6 = 64
1로 시작하고 00으로 끝나는 것: 2^5 = 32

포함-배제 적용:
128 + 64 - 32 = 160
```

**지원자 문제:**
350명의 지원자 중 CS 전공 220명, 경영 전공 147명, 복수 전공 51명일 때, 두 전공 모두 아닌 지원자 수:
```
|CS ∪ Business| = 220 + 147 - 51 = 316
두 전공 모두 아닌 수 = 350 - 316 = 34
```

**비밀번호 계수:**
6~8자리 영문 대문자/숫자 비밀번호 중 숫자를 최소 1개 포함하는 것의 수:
```
P6 = 36^6 - 26^6 = 1,867,866,560  (전체에서 숫자 없는 것을 뺌)
P7 = 36^7 - 26^7 = 70,332,353,920
P8 = 36^8 - 26^8 = 2,612,282,842,880
P = P6 + P7 + P8 = 2,684,483,063,360
```

**100 이하의 소수 개수** (Ch.8 심화): 합성수는 2, 3, 5, 7 중 하나로 나누어진다
```
소수의 수 = 4 + N(P'_1 P'_2 P'_3 P'_4)
= 4 + 99 - 50 - 33 - 20 - 14 + 16 + 10 + 7 + 6 + 4 + 2
  - 3 - 2 - 1 - 0 + 0
= 4 + 21 = 25
```

**세 집합의 경우**:
```
|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|
예: 스페인어(1232명), 프랑스어(879명), 러시아어(114명) 수강생
|S∩F|=103, |S∩R|=23, |F∩R|=14, |S∪F∪R|=2092
=> |S∩F∩R| = 2092 - 1232 - 879 - 114 + 103 + 23 + 14 = 7
```

## 관련 개념

- [Sum Rule](/knowledge/mathematics/sum-rule/) - 서로소 집합에 대한 특수 경우
- [Product Rule](/knowledge/mathematics/product-rule/) - 순차적 작업에 대한 계수 원리
- [Set](/knowledge/mathematics/set/) - 합집합과 교집합 연산에 기반
- [Combination](/knowledge/mathematics/combination/) - 포함-배제 공식의 증명에 이항 계수 사용
- [Permutation](/knowledge/mathematics/permutation/) - 완전순열(derangement) 계산에 포함-배제 적용
- [Function](/knowledge/mathematics/function/) - 전사함수의 수를 포함-배제로 계산
- [Derangement](/knowledge/mathematics/derangement/) - 포함-배제의 대표적 응용
