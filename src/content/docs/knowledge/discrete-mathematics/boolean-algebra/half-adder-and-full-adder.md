---
title: "반가산기와 전가산기 (Half Adder and Full Adder)"
description: "반가산기(half adder)는 두 개의 비트를 더하여 합(sum) 비트 s와 올림(carry) 비트 c를 출력하는 회로이다"
tags: ['Half Adder', 'Full Adder', 'Binary Addition', 'Combinational Circuit', 'Digital Logic', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/half-adder-and-full-adder
sidebar:
  order: 9
---

## 핵심 개념

이진수 덧셈은 디지털 컴퓨터의 가장 기본적인 연산이다. 반가산기와 전가산기는 이 연산을 수행하는 핵심 회로 블록이다.

**반가산기(Half Adder)**:

입력: 비트 x, y
출력: 합 비트 s, 올림 비트 c

진리표:
| x | y | s | c |
|---|---|---|---|
| 1 | 1 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 |
| 0 | 0 | 0 | 0 |

불리언 식:
- c = xy (AND 게이트)
- s = xy̅ + x̅y = (x + y)(xy)̅ (OR, AND, 인버터로 구현)
- s는 XOR 연산과 같다: s = x ⊕ y

반가산기는 이전 자릿수의 올림을 고려하지 않으므로, 최하위 비트의 덧셈에만 사용된다.

**전가산기(Full Adder)**:

입력: 비트 x, y, 올림 비트 cᵢ
출력: 합 비트 s, 새 올림 비트 cᵢ₊₁

진리표:
| x | y | cᵢ | s | cᵢ₊₁ |
|---|---|-----|---|-------|
| 1 | 1 | 1   | 1 | 1     |
| 1 | 1 | 0   | 0 | 1     |
| 1 | 0 | 1   | 0 | 1     |
| 1 | 0 | 0   | 1 | 0     |
| 0 | 1 | 1   | 0 | 1     |
| 0 | 1 | 0   | 1 | 0     |
| 0 | 0 | 1   | 1 | 0     |
| 0 | 0 | 0   | 0 | 0     |

불리언 식 (곱의 합 전개):
- s = xȳc̄ᵢ + x̄yc̄ᵢ + x̄ȳcᵢ + xycᵢ
- cᵢ₊₁ = xyc̄ᵢ + xȳcᵢ + x̄ycᵢ + xycᵢ

전가산기는 두 개의 반가산기를 연결하여 구현할 수 있다:
1. 첫 번째 반가산기: x와 y를 더해 중간 합과 중간 올림 생성
2. 두 번째 반가산기: 중간 합과 cᵢ를 더해 최종 합 s 생성
3. 두 올림의 OR: 최종 올림 cᵢ₊₁ 생성

**다중 비트 덧셈**: n비트 정수 두 개를 더하려면 1개의 반가산기와 (n-1)개의 전가산기를 연쇄적으로 연결한다. 최하위 비트에서 반가산기를 사용하고, 나머지 비트에서 이전 올림을 전가산기에 전달한다.

## 예시

**예시 1: 반가산기 회로 구조**

```
x ─┬─[OR]──── (x+y) ─┐
   │                   ├─[AND]── s = (x+y)·(xy)̅
y ─┼─[AND]── xy ─┬────┘
   │              │    [INV]── (xy)̅
   └──────────────┴──── c = xy
```

**예시 2: 3비트 정수 덧셈 (x₂x₁x₀)₂ + (y₂y₁y₀)₂ = (s₃s₂s₁s₀)₂**

```
[반가산기]           [전가산기]           [전가산기]
x₀, y₀ → s₀, c₀ → x₁, y₁, c₀ → s₁, c₁ → x₂, y₂, c₁ → s₂, c₂
                                                            c₂ = s₃
```

구체적 예: 101₂ + 011₂ = 1000₂ (5 + 3 = 8)

| 자릿수 | x | y | cᵢ | s | cᵢ₊₁ |
|--------|---|---|-----|---|-------|
| 0 (반가산기) | 1 | 1 | - | 0 | 1 |
| 1 (전가산기) | 0 | 1 | 1 | 0 | 1 |
| 2 (전가산기) | 1 | 0 | 1 | 0 | 1 |

결과: s₃s₂s₁s₀ = 1000₂ = 8

**예시 3: 다중 출력 회로**

반가산기와 전가산기는 다중 출력 회로(multiple output circuit)의 대표적인 예이다. 하나의 회로에서 두 개의 출력(합과 올림)을 동시에 생성한다.

## 관련 개념

- [Logic Gate](/knowledge/mathematics/logic-gate/) - 반가산기와 전가산기를 구성하는 기본 요소
- [Boolean Function](/knowledge/mathematics/boolean-function/) - 합과 올림은 각각 하나의 불리언 함수
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - 전가산기의 불리언 식은 곱의 합 전개
- [Boolean Algebra](/knowledge/mathematics/boolean-algebra/) - 회로의 수학적 기반
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 이진 덧셈 알고리즘의 하드웨어 구현
