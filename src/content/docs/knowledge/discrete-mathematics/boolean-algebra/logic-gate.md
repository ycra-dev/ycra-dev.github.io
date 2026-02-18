---
title: "Logic Gate"
description: "논리 게이트(logic gate)란 불리언 연산을 물리적으로 구현하는 전자 회로의 기본 요소이다"
tags: ['Logic Gate', 'Combinational Circuit', 'Inverter', 'And Gate', 'Or Gate', 'Digital Logic', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/logic-gate
sidebar:
  order: 6
---

## 핵심 개념

**기본 게이트 유형**:

1. **인버터(Inverter/NOT)**: 하나의 불리언 변수를 입력받아 그 보수를 출력
   - 입력 x → 출력 x̄

2. **OR 게이트**: 두 개 이상의 불리언 변수를 입력받아 불리언 합을 출력
   - 입력 x, y → 출력 x + y
   - n개의 입력도 가능: x₁ + x₂ + ··· + xₙ

3. **AND 게이트**: 두 개 이상의 불리언 변수를 입력받아 불리언 곱을 출력
   - 입력 x, y → 출력 xy
   - n개의 입력도 가능: x₁x₂···xₙ

4. **NAND 게이트**: x | y = (xy)̄. 단독으로 함수적 완전
5. **NOR 게이트**: x ↓ y = (x + y)̄. 단독으로 함수적 완전

**조합 회로(Combinational Circuit)**: 출력이 현재 입력에만 의존하고 회로의 이전 상태에 의존하지 않는 회로. 메모리 기능이 없다. 게이트 네트워크(gating network)라고도 한다.

**회로의 깊이(Depth)**: 입력의 깊이는 0이고, n개의 입력을 가진 게이트의 출력 깊이는 max(d₁, d₂, ..., dₙ) + 1이다. 회로의 깊이는 게이트 중 최대 깊이이다.

**회로 설계 과정**:
1. 원하는 입출력 관계를 진리표로 작성
2. 곱의 합 전개를 구함
3. 필요시 불리언 항등식으로 간소화
4. 게이트로 구현

## 예시

**예시 1: 다수결 투표 회로**

3명이 투표하여 2명 이상 찬성이면 통과하는 회로:
- F(x, y, z) = xy + xz + yz
- 구성: 3개의 AND 게이트(xy, xz, yz) → 1개의 OR 게이트

```
x ─┬─[AND]─── xy ─┐
y ─┤               │
   └─[AND]── xz ──┼─[OR]── xy + xz + yz
x ──┘              │
z ──┬─[AND]── yz ──┘
y ──┘
```

**예시 2: 반가산기(Half Adder)**

두 비트 x, y를 더하여 합(s)과 올림(c)을 출력:
- c = xy (올림 비트: AND 게이트)
- s = (x + y)(xy)̄ (합 비트: OR + AND + 인버터)

| x | y | s | c |
|---|---|---|---|
| 1 | 1 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 |
| 0 | 0 | 0 | 0 |

**예시 3: 전가산기(Full Adder)**

두 비트 x, y와 올림 cᵢ를 더하여 합(s)과 새 올림(cᵢ₊₁)을 출력:
- s = xȳc̄ᵢ + x̄yc̄ᵢ + x̄ȳcᵢ + xycᵢ
- cᵢ₊₁ = xyc̄ᵢ + xȳcᵢ + x̄ycᵢ + xycᵢ
- 실제로는 두 개의 반가산기를 연결하여 구현

**예시 4: 2개 스위치로 제어하는 조명 회로**

F(x, y) = xy + x̄ȳ (두 스위치가 같은 상태면 켜짐)

```
x ─┬─[AND]── xy ──┐
y ─┘               │
                   ├─[OR]── xy + x̄ȳ (출력)
x̄ ─┬─[AND]── x̄ȳ ──┘
ȳ ──┘
```

## 관련 개념

- [Boolean Function](/knowledge/mathematics/boolean-function/) - 논리 게이트가 구현하는 수학적 대상
- [Boolean Algebra](/knowledge/mathematics/boolean-algebra/) - 회로 설계의 이론적 기반
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - 곱의 합 전개로부터 직접 회로 구성 가능
- [Functional Completeness](/knowledge/mathematics/functional-completeness/) - NAND/NOR 게이트만으로 모든 회로 구현 가능
- [Karnaugh Map](/knowledge/mathematics/karnaugh-map/) - 최소 게이트 수의 회로를 설계하기 위한 최적화 도구
- [Algorithm](/knowledge/algorithms/algorithm/) - 가산기 등의 회로는 알고리즘의 하드웨어 구현
