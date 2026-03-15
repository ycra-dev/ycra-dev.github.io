---
title: "정규 표현식 (Regular Expression)"
description: "정규 표현식(regular expression)은 공집합 기호, 공문자열 기호, 단일 기호로부터 결합(concatenation), 합집합(union), 클리네 폐포(Kleene closure) 연산을 재귀적으로 적용하여 구성되는 표현식으로, 이에 의해 표현되는 집..."
tags: ['Regular Expression', 'Regular Set', 'Kleene Closure', 'Concatenation', 'Union', 'Pattern Matching']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/regular-expression
sidebar:
  order: 8
---

## 핵심 개념

### 재귀적 정의

입력 알파벳 I 위의 정규 표현식은 다음과 같이 재귀적으로 정의된다:
1. **공집합**: 문자열이 없는 집합을 나타냄
2. **lambda**: 공문자열만 포함하는 집합 {lambda}
3. **x** (x in I): 단일 기호 문자열 집합 {x}
4. **(AB)**: A와 B가 나타내는 집합의 **결합(concatenation)**
5. **(A ∪ B)**: A와 B가 나타내는 집합의 **합집합(union)**
6. **A***: A가 나타내는 집합의 **클리네 폐포(Kleene closure)**

### 클리네 폐포 (Kleene Closure)

집합 A의 클리네 폐포 A*는 A에서 임의로 많은 문자열을 결합하여 만들 수 있는 모든 문자열의 집합이다:

A* = A^0 ∪ A^1 ∪ A^2 ∪ ... = 무한 합집합(k=0부터 무한대) A^k

여기서:
- A^0 = {lambda} (공문자열)
- A^(n+1) = A^n · A

### 정규 표현식과 정규 집합의 동치

정규 표현식이 나타내는 집합(정규 집합)은 클리네의 정리에 의해 유한 상태 오토마타가 인식하는 집합과 정확히 일치한다. 이는 정규 표현식이 형식 언어 이론의 핵심 도구임을 의미한다.

### 실용적 응용

정규 표현식은 텍스트 검색, 패턴 매칭, 어휘 분석 등에서 광범위하게 사용된다. Unix의 grep, sed 등의 도구와 프로그래밍 언어의 regex 라이브러리가 이 개념에 기반한다.

## 예시

기본 정규 표현식의 의미:

| 정규 표현식 | 나타내는 집합 |
|------------|-------------|
| `10*` | 1 뒤에 0이 0개 이상: {1, 10, 100, 1000, ...} |
| `(10)*` | 10의 반복: {lambda, 10, 1010, 101010, ...} |
| `0 ∪ 01` | 문자열 0 또는 01: {0, 01} |
| `0(0 ∪ 1)*` | 0으로 시작하는 모든 문자열 |
| `(0*1)*` | 0으로 끝나지 않는 모든 문자열 |

복잡한 예시:

```
짝수 길이 비트 문자열: (00 ∪ 01 ∪ 10 ∪ 11)*

11을 포함하지 않고 0으로 끝나는 비트 문자열: (0 ∪ 10)*(0 ∪ 10)

홀수 개의 0을 포함하는 비트 문자열: 1*01*(01*01*)*
```

클리네 폐포 예시:
```
A = {0}    => A* = {lambda, 0, 00, 000, ...} = {0^n | n >= 0}
B = {0, 1} => B* = 모든 비트 문자열 집합
C = {11}   => C* = {lambda, 11, 1111, ...} = {1^(2n) | n >= 0}
```

## 관련 개념

- [Kleene's Theorem](/knowledge/mathematics/kleenes-theorem/): 정규 집합과 유한 상태 오토마타의 동치 증명
- [Finite-State Automaton](/knowledge/mathematics/finite-state-automaton/): 정규 집합을 인식하는 기계 모델
- [Regular Grammar and Regular Language](/knowledge/mathematics/regular-grammar-and-regular-language/): 정규 문법에 의해 생성되는 언어 = 정규 집합
- [Set](/knowledge/mathematics/set/): 정규 표현식의 연산은 집합 연산의 특수한 경우
- [Recursive Definition](/knowledge/mathematics/recursive-definition/): 정규 표현식 자체가 재귀적으로 정의됨
