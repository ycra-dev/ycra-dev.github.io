---
title: "Program Correctness"
description: "프로그램 정확성(Program Correctness)은 프로그램이 모든 가능한 입력에 대해 올바른 출력을 생성함을 형식적으로 증명하는 것이다"
tags: ['Program Correctness', 'Program Verification', 'Partial Correctness', 'Hoare Triple', 'Formal Verification']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/program-correctness
sidebar:
  order: 10
---

## 핵심 개념

### 프로그램 검증의 기본 구조

프로그램 정확성 증명은 두 부분으로 구성된다:
1. **부분 정확성 (Partial Correctness)**: 프로그램이 종료하면 올바른 결과를 생성함
2. **종료성 (Termination)**: 프로그램이 반드시 종료함

이를 위해 두 가지 단언(assertion)을 사용한다:
- **초기 단언 (Initial Assertion) p**: 입력값이 만족해야 하는 조건
- **최종 단언 (Final Assertion) q**: 프로그램 출력이 만족해야 하는 조건

### Hoare 트리플

**p{S}q** 표기는 프로그램 S가 초기 단언 p와 최종 단언 q에 대해 부분 정확함을 나타낸다. 즉:
> p가 입력에 대해 참이고 S가 종료하면, q가 출력에 대해 참이다.

이 표기법은 Tony Hoare가 도입했으며, Hoare Triple이라 불린다. 부분 정확성은 종료와 무관하다는 점에 주의해야 한다.

### 추론 규칙들

**1. 합성 규칙 (Composition Rule)**
```
p{S1}q
q{S2}r
∴ p{S1; S2}r
```
프로그램을 부분 프로그램으로 분할하여 각각의 정확성을 증명하고 합성할 수 있다.

**2. 조건문 규칙 (if-then)**
```
(p ∧ condition){S}q
(p ∧ ¬condition) → q
∴ p{if condition then S}q
```

**3. 조건문 규칙 (if-then-else)**
```
(p ∧ condition){S1}q
(p ∧ ¬condition){S2}q
∴ p{if condition then S1 else S2}q
```

**4. 반복문 규칙 (while loop)**
```
(p ∧ condition){S}p
∴ p{while condition S}(¬condition ∧ p)
```
여기서 p는 루프 불변식이다.

### 복합 프로그램의 검증 전략

긴 프로그램은 여러 세그먼트 S1, S2, ..., Sn으로 분할하고, 각 세그먼트의 정확성을 개별적으로 증명한 후, 합성 규칙을 반복 적용하여 전체 프로그램의 정확성을 도출한다.

## 예시

**예시 1: 단순 프로그램의 부분 정확성**

```
y := 2
z := x + y
```
초기 단언 p: x = 1, 최종 단언 q: z = 3.

증명: p에 의해 x=1. y에 2 대입. z = x + y = 1 + 2 = 3 = q. 따라서 p{S}q 성립.

**예시 2: 조건문의 정확성**

```
if x < 0 then
    abs := -x
else
    abs := x
```
초기 단언: T (항상 참), 최종 단언: abs = |x|.

- x < 0일 때: abs = -x = |x| (정의에 의해). q 성립.
- x >= 0일 때: abs = x = |x| (정의에 의해). q 성립.
- 따라서 T{S}(abs = |x|) 성립.

**예시 3: 곱셈 프로그램의 완전한 검증**

```
procedure multiply(m, n: integers)
S1: if n < 0 then a := -n else a := n
S2: k := 0; x := 0
S3: while k < a
        x := x + m
        k := k + 1
S4: if n < 0 then product := -x else product := x
return product
```

검증 과정 (합성 규칙 적용):
- p: "m과 n은 정수" (초기 단언)
- p{S1}q, q = p ∧ (a = |n|)
- q{S2}r, r = q ∧ (k = 0) ∧ (x = 0)
- 루프 불변식: "x = mk ∧ k <= a", r{S3}s, s = "x = ma ∧ a = |n|"
- s{S4}t, t = "product = mn" (최종 단언)
- 합성 규칙에 의해 p{S}t 성립

종료성: S3의 루프에서 k가 매 반복마다 1씩 증가하여 a에 도달하므로 a번 반복 후 종료.

## 관련 개념

- [Loop Invariant](/knowledge/mathematics/loop-invariant/) - 반복문 정확성 증명의 핵심 도구
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 프로그램 검증은 형식적 증명의 응용
- [Algorithm](/knowledge/mathematics/algorithm/) - 알고리즘의 정확성 보장
- [Predicate Logic](/knowledge/mathematics/predicate-logic/) - 단언(assertion)은 술어 논리로 표현
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 재귀 프로그램 검증에 사용
- [Proposition](/knowledge/mathematics/proposition/) - 초기/최종 단언은 명제
