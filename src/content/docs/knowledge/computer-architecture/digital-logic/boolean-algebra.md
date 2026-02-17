---
title: "Boolean Algebra"
description: "불 대수(Boolean Algebra)는 변수가 0 또는 1 값만 가지며, AND(논리곱), OR(논리합), NOT(부정)의 세 가지 연산자를 사용하여 논리 함수를 표현하는 수학적 체계이다"
tags: ['Logic Design', 'Truth Table', 'Logic Gates', 'Combinational Logic']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/boolean-algebra
sidebar:
  order: 1
---

## 핵심 개념

19세기 수학자 George Boole이 발명한 불 대수는 디지털 논리 설계의 기초이다. 주요 법칙으로는 항등 법칙(A+0=A, A*1=A), 영/일 법칙(A+1=1, A*0=0), 역원 법칙(A+A'=1, A*A'=0), 교환 법칙, 결합 법칙, 분배 법칙이 있다. 드모르간 정리(DeMorgan's theorem)는 NOT(A OR B) = NOT A AND NOT B 등의 관계를 제공하여 논리 함수의 변환과 최적화에 중요하다. 모든 논리 함수는 진리표로 완전히 기술할 수 있으며, 곱의 합(sum of products) 또는 합의 곱(product of sums) 형태의 2단계 논리 표현으로 변환할 수 있다. 이러한 표현은 PLA(Programmable Logic Array) 등의 구조화된 논리 구현에 직접 매핑된다.

## 예시

```
불 대수 기본 연산:
  AND: A · B = 1 (두 입력 모두 1일 때만 1)
  OR:  A + B = 1 (하나 이상의 입력이 1이면 1)
  NOT: A' = 1    (입력이 0일 때만 1)

드모르간 정리:
  (A + B)' = A' · B'   (NOR = NOT A AND NOT B)
  (A · B)' = A' + B'   (NAND = NOT A OR NOT B)

곱의 합 예시 (D = A'B'C + A'BC' + AB'C' + ABC):
  진리표에서 출력이 1인 각 행에 대해 곱항을 만들고 OR로 결합
```

## 관련 개념

- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Logic Gates](/knowledge/computer-architecture/logic-gates/)
- [Programmable Logic Array](/knowledge/computer-architecture/programmable-logic-array/)
- [Truth Table](/knowledge/computer-architecture/truth-table/)
