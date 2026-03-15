---
title: "재귀적 정의 (Recursive Definition)"
description: "재귀적 정의(Recursive Definition)는 객체를 자기 자신을 이용하여 정의하는 방법으로, 초기값을 지정하는 기초 단계(Basis Step)와 이전에 정의된 값으로부터 새로운 값을 구하는 규칙을 제공하는 재귀 단계(Recursive Step)로 구성된다"
tags: ['Recursive Definition', 'Recursion', 'Basis Step', 'Recursive Step', 'Recurrence Relation', 'Inductive Definition']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/recursive-definition
sidebar:
  order: 5
---

## 핵심 개념

재귀적 정의는 이산수학과 컴퓨터 과학 전반에서 광범위하게 사용된다. 세 가지 주요 영역에서 재귀적 정의가 활용된다:

### 1. 함수의 재귀적 정의

음이 아닌 정수를 정의역으로 하는 함수를 정의할 때:
- **기초 단계**: f(0)의 값을 지정
- **재귀 단계**: f(n+1)을 f의 이전 값들로부터 구하는 규칙 제공

재귀적으로 정의된 함수는 잘 정의(well-defined)되어 있다. 즉, 모든 양의 정수에 대해 함수값이 유일하게 결정된다. 이것은 수학적 귀납법의 원리로 보장된다.

### 2. 집합의 재귀적 정의

- **기초 단계**: 집합의 초기 원소를 지정
- **재귀 단계**: 이미 집합에 속한 원소들로부터 새로운 원소를 생성하는 규칙 제공
- **배제 규칙(Exclusion Rule)**: 기초 단계와 재귀 단계로 생성된 원소만 집합에 속함 (암묵적으로 가정)

### 3. 구조의 재귀적 정의

문자열(string), 정형식(well-formed formula), 이진 트리(binary tree), 근트리(rooted tree) 등의 구조가 재귀적으로 정의된다.

재귀적 정의의 중요한 성질은 기초 단계에서 시작하여 재귀 단계를 유한 번 적용함으로써 모든 원소에 도달할 수 있다는 것이다. 이 성질이 수학적 귀납법을 사용한 증명의 근거가 된다.

## 예시

**예시 1: 팩토리얼 함수의 재귀적 정의**

```
f(0) = 1                    (기초 단계)
f(n+1) = (n+1) * f(n)       (재귀 단계, n >= 0)
```

**예시 2: 피보나치 수열**

```
f(0) = 0, f(1) = 1          (기초 단계)
f(n) = f(n-1) + f(n-2)      (재귀 단계, n >= 2)
```

**예시 3: 집합의 재귀적 정의 - 3의 양의 배수 집합**

```
기초 단계: 3 ∈ S
재귀 단계: x ∈ S ∧ y ∈ S → x + y ∈ S
```

이 정의로 생성되는 원소: 3, 6, 9, 12, ... 즉 S = {3k | k는 양의 정수}

**예시 4: 문자열 집합 Sigma*의 재귀적 정의**

알파벳 Sigma에 대한 문자열 집합:
```
기초 단계: λ ∈ Σ* (λ는 빈 문자열)
재귀 단계: w ∈ Σ* ∧ x ∈ Σ → wx ∈ Σ*
```

**예시 5: 정형식(Well-Formed Formula) - 명제 논리**

```
기초 단계: T, F, 명제 변수 s는 정형식
재귀 단계: E, F가 정형식이면 (¬E), (E∧F), (E∨F), (E→F), (E↔F)도 정형식
```

**예시 6: 풀 이진 트리(Full Binary Tree)**

```
기초 단계: 단일 꼭짓점 r은 풀 이진 트리
재귀 단계: T1, T2가 서로소인 풀 이진 트리이면, 루트 r에서 T1, T2의 루트로
           간선을 추가한 T1 · T2도 풀 이진 트리
```

## 관련 개념

- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 재귀적 정의에 기반한 알고리즘
- [Structural Induction](/knowledge/mathematics/structural-induction/) - 재귀적으로 정의된 집합에 대한 증명 기법
- [Fibonacci Sequence](/knowledge/mathematics/fibonacci-sequence/) - 대표적인 재귀적 수열
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 재귀적 정의의 잘 정의됨을 보장
- [Sequence](/knowledge/mathematics/sequence/) - 수열은 재귀적으로 정의 가능
- [Function](/knowledge/mathematics/function/) - 함수는 재귀적으로 정의 가능
- [Set](/knowledge/mathematics/set/) - 집합은 재귀적으로 정의 가능
