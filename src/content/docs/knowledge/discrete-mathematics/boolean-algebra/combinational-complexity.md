---
title: "Combinational Complexity"
description: "부울 함수 f를 계산하는 가장 짧은 부울 체인의 길이 C(f) — 하드웨어 게이트 수 최소화와 회로 복잡도 이론의 핵심 측도"
tags: ["Boolean Algebra", "Circuit Complexity", "Lower Bounds", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/combinational-complexity
sidebar:
  order: 12
---

## 핵심 개념

조합 복잡도(Combinational Complexity) C(f)는 부울 함수 f를 계산하는 가장 짧은 부울 체인의 길이다. 중간 계산 결과의 재사용을 허용한다. 실제 디지털 회로에서 사용하는 논리 게이트 수를 최소화하는 문제와 직접 대응한다.

## 동작 원리

**3가지 복잡도 측도 비교:**

| 측도 | 정의 | 관계 |
|------|------|------|
| C(f) | 최소 게이트 수 (재사용 허용) | 하드웨어 비용 |
| L(f) | 최소 공식 크기 (재사용 불허) | C(f) ≤ L(f) |
| D(f) | 최소 회로 깊이 | D(f) ≤ C(f) |

**4변수 함수 분포:**
- 비용 0: n+1개 (변수와 상수)
- 비용 1: 15개
- 비용 2: 약 100개
- 비용 6: 대칭 함수 S₂ (정확히 2개가 1인 경우)

**깊이와 비용의 상충:**
- 모든 대칭 4변수 함수에 대해 최소 비용과 최소 깊이를 동시에 달성 가능
- 예외: S₂,₃와 S₁,₂는 비용 6과 깊이 3을 동시에 달성 불가

**하한 증명 기법:**
- 진리표 다양도 (정보론적 하한)
- 단조 함수에 대한 하한
- Footprint 휴리스틱: 체인의 첫 번째 단계를 비트 벡터로 표현하여 최적 상한 개선

## 예시

```
대칭 함수들의 최적 비용:
S₀  = x̄₁∧x̄₂∧x̄₃∧x̄₄  비용 3
S₁  = ∨₁                비용 3
S₂  (정확히 2개가 1)    비용 6  ← 가장 복잡
S₃  (S₁의 보수)         비용 3
S₄  = x₁∧x₂∧x₃∧x₄      비용 3
S₀,₁,₂,₃,₄              비용 0 (항상 참)

mux 함수 C(mux)=3:
- 길이 2로 계산 불가: 5개 정규 연산자 각 조합 모두 시도해 보면 불가
- 최적 체인은 Boolean Chain 노트 참조

비직관적 최적 체인 예시:
DNF 표현: 11개 단계 (길이 10)
최적 체인 (비용 4): 중간 결과 재사용으로 단축 가능
```

## 관련 개념

- [Boolean Chain](/knowledge/discrete-mathematics/boolean-algebra/boolean-chain/)
- [Binary Decision Diagram](/knowledge/discrete-mathematics/boolean-algebra/binary-decision-diagram/)
- [DNF and CNF](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
- [Bitwise Operations](/knowledge/algorithms/foundations/bitwise-operations/)
