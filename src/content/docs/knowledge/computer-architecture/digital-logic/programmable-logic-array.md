---
title: "Programmable Logic Array"
description: "PLA(Programmable Logic Array)는 입력과 보수 입력의 집합과 두 단계 논리(AND 평면과 OR 평면)로 구성되는 구조화된 논리 소자로, 곱의 합(sum of products) 형태의 논리 함수를 구현한다"
tags: ['Combinational Logic', 'Sum Of Products', 'And Plane', 'Or Plane', 'Structured Logic']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/programmable-logic-array
sidebar:
  order: 8
---

## 핵심 개념

PLA는 진리표에서 출력이 참인 항목만 논리 게이트에 대응시키므로, 모든 입력 조합에 대해 출력을 저장하는 ROM보다 일반적으로 더 효율적이다. AND 평면은 입력의 곱항(minterm)을 생성하고, OR 평면은 이 곱항들의 논리합을 계산한다. PLA의 크기는 AND 평면(입력 수 x 곱항 수)과 OR 평면(출력 수 x 곱항 수)의 합이다. 같은 곱항이 여러 출력에서 공유될 수 있어 효율적이다. ROM은 완전히 디코딩되어 모든 입력 조합에 대한 출력을 포함하지만, PLA는 부분적으로만 디코딩한다. 입력 수가 증가하면 ROM은 지수적으로 커지지만, 실제 논리 함수에서 곱항 수는 훨씬 느리게 증가한다. Don't care를 활용하면 곱항 수를 더 줄일 수 있다. 유한 상태 기계의 다음 상태와 출력 함수를 구현하는 데 널리 사용된다.

## 예시

```
3입력 3출력 PLA 예시:

진리표:
  A B C | D E F
  0 0 1 | 1 0 0    → 곱항: A'B'C
  0 1 0 | 1 0 0    → 곱항: A'BC'
  0 1 1 | 1 1 0    → 곱항: A'BC
  1 0 0 | 1 0 0    → 곱항: AB'C'
  1 0 1 | 1 1 0    → 곱항: AB'C
  1 1 0 | 1 1 0    → 곱항: ABC'
  1 1 1 | 1 0 1    → 곱항: ABC

AND 평면: 3 입력 x 7 곱항
OR 평면: 3 출력 x 7 곱항
총 크기: 3*7 + 3*7 = 42
```

## 관련 개념

- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Boolean Algebra](/knowledge/computer-architecture/boolean-algebra/)
- [Finite-State Machine](/knowledge/computer-architecture/finite-state-machine/)
- [Sum of Products Expansion](/knowledge/mathematics/sum-of-products-expansion/)
