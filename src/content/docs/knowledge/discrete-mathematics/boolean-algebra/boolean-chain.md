---
title: "Boolean Chain"
description: "n개의 입력 변수에 대해 각 단계가 이전 두 결과의 이진 부울 연산인 계산 시퀀스 — 게이트 네트워크와 1:1 대응하는 회로 복잡도의 기본 모델"
tags: ["Boolean Algebra", "Circuit Complexity", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/boolean-chain
sidebar:
  order: 11
---

## 핵심 개념

부울 체인(Boolean Chain)은 n개의 입력 변수 (x₁,...,xₙ)에 대해 각 단계가 이전 두 결과의 이진 부울 연산인 계산 시퀀스 (xₙ₊₁,...,xₙ₊ᵣ)다.

```
xᵢ = xⱼ₍ᵢ₎ ∘ᵢ xₖ₍ᵢ₎  (1 ≤ j(i) < i, 1 ≤ k(i) < i)
```

각 ∘ᵢ는 16가지 이진 연산 중 하나이다. 전자 회로의 게이트 네트워크와 1:1로 대응한다.

## 동작 원리

**복잡도 측도 세 가지:**

| 측도 | 의미 | 모델 |
|------|------|------|
| C(f) | 최단 체인의 길이 (중간 결과 재사용 허용) | 하드웨어 게이트 수 |
| L(f) | 최단 이진 트리 표현의 연산자 수 (재사용 불허) | 공식 크기 |
| D(f) | 트리 다이어그램의 최장 경로 | 병렬 처리 지연 시간 |

**관계:** D(f) ≤ C(f) ≤ L(f)

**정규화(Normalization):**
f(0,...,0)=0인 정규 함수만 고려해도 일반성을 잃지 않는다.
정규 이진 연산자는 {∧, NOTBUT, BUTNOT, ∨, ⊕} 5가지이다.

**4변수 함수의 최적 체인 (Algorithm L):**
- 2¹⁶=65,536가지 진리표 열거
- 길이 r=1,2,... 순서로 새로운 함수를 리스트에 추가
- 4변수 함수는 모두 최적 비용 결정 가능

## 예시

```
mux(if-then-else) 함수: x₆ = (x₁? x₂: x₃)

체인 1 (길이 3):
x₄ = x₁ NOTBUT x₃   (x₁ = 1이면 x₃, 아니면 0)
x₅ = x̄₁ ∧ x₂        (x₁ = 0이면 x₂, 아니면 0)
x₆ = x₄ ∨ x₅        = 결합

체인 2 (길이 3, 다른 방법):
x₄ = x₁ ⊕ x₂
x₅ = x₁ ⊕ x₃
x₆ = x₁ ⊕ (x₅ ∧ x₄)

비용 C(mux) = 3 (길이 2로는 불가능)

대칭 함수 S₂(x₁,x₂,x₃,x₄) = "정확히 2개가 1" 최적 체인 (비용 6):
x₅ = x₁ ⊕ x₂
x₆ = x₁ ⊕ x₃
x₇ = x₅ ⊕ x₆ ⊕ x₄
x₈ = x₅ ∨ x₆
x₉ = x₁ ⊕ x₂ ⊕ x₃ ⊕ x₄  (패리티)
x₁₀ = x₈ ∧ x₉
```

## 관련 개념

- [Combinational Complexity](/knowledge/discrete-mathematics/boolean-algebra/combinational-complexity/)
- [Binary Decision Diagram](/knowledge/discrete-mathematics/boolean-algebra/binary-decision-diagram/)
- [Bitwise Operations](/knowledge/algorithms/foundations/bitwise-operations/)
- [DNF and CNF](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
