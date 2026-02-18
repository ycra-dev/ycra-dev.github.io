---
title: "Tractability"
description: "다루기 쉬운 문제(Tractable problem)란 최악의 경우 다항 시간(polynomial time) 알고리즘이 존재하는 문제이다"
tags: ['Tractability', 'Intractability', 'P Vs Np', 'Np Complete', 'Complexity Class', 'Polynomial Time']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/tractability
sidebar:
  order: 20
---

## 핵심 개념

### 문제의 분류 체계

**1. Solvable (풀 수 있는 문제)**
- **Tractable (다루기 쉬움)**: 다항 시간 Θ(n^b) (b는 정수) 알고리즘 존재
  - 예: 정렬(Θ(n log n)), 탐색(Θ(log n)), 최단 경로
- **Intractable (다루기 어려움)**: 다항 시간 알고리즘이 존재하지 않음
  - 예: 하노이의 탑(Θ(2^n)), 순열 열거(Θ(n!))

**2. Unsolvable (풀 수 없는 문제)**
- 어떤 알고리즘으로도 해결 불가
- 예: [[Halting Problem]]

### 복잡도 클래스 P와 NP

**P 클래스**: 다항 시간 내에 해를 "찾을 수 있는" 문제들의 집합
- 예: 정렬, 최단 경로, 행렬 곱셈

**NP 클래스**: 다항 시간 내에 해를 "검증할 수 있는" 문제들의 집합 (NP = Nondeterministic Polynomial time)
- P ⊆ NP (P에 속하는 모든 문제는 NP에도 속함)
- 예: 만족가능성 문제(SAT) - 주어진 진리값 배정이 명제를 참으로 만드는지는 빠르게 검증 가능하지만, 그러한 배정을 찾는 데에는 다항 시간 알고리즘이 알려져 있지 않음

**NP-완전(NP-Complete) 문제**:
- NP에 속하면서, NP의 모든 문제가 이 문제로 다항 시간 내에 환원(reduce) 가능한 문제
- NP-완전 문제 중 하나라도 다항 시간에 풀 수 있으면, 모든 NP 문제를 다항 시간에 풀 수 있음
- 최초의 NP-완전 문제: SAT(만족가능성 문제) - Cook-Levin 정리 (1970년대 초)
- 현재 3000개 이상의 NP-완전 문제가 알려져 있음

### P vs NP 문제
"P = NP인가?" - 즉, 해를 다항 시간에 검증할 수 있는 모든 문제를 다항 시간에 풀 수도 있는가?
- 수학/CS에서 가장 유명한 미해결 문제 중 하나
- Clay Mathematics Institute의 밀레니엄 문제 7개 중 하나 (상금 100만 달러)
- 대부분의 이론 컴퓨터 과학자들은 P ≠ NP라고 믿음

### 실용적 고려사항
- 다항 시간이라도 차수가 매우 높으면(예: n^100) 실용적이지 않을 수 있음
- 다루기 어려운 문제도 평균적인 경우에는 빠르게 풀릴 수 있음
- 근사 알고리즘(approximation algorithm)으로 최적해에 가까운 해를 빠르게 구하기도 함

## 예시

**복잡도별 실행 시간 비교** (n=10^6, 10^-11초/연산 기준):

| 복잡도 | 실행 시간 |
|--------|-----------|
| Θ(log n) | 약 2×10⁻¹⁰초 |
| Θ(n) | 약 10⁻⁵초 |
| Θ(n log n) | 약 2×10⁻⁴초 |
| Θ(n²) | 약 0.17분 |
| Θ(2^n) | 천문학적 시간 (10^100년 이상) |
| Θ(n!) | 10^100년 이상 |

**NP-완전 문제의 예**: 만족가능성 문제(SAT)
- n개 변수의 복합 명제가 참이 되는 진리값 배정이 있는가?
- 모든 경우를 탐색하면 Ω(2^n)번의 연산이 필요
- 해를 검증하는 것은 다항 시간에 가능

**복잡도 분류표:**

| 복잡도 | 용어 |
|--------|------|
| Θ(1) | 상수 시간 (Constant) |
| Θ(log n) | 로그 시간 (Logarithmic) |
| Θ(n) | 선형 시간 (Linear) |
| Θ(n log n) | 선형로그 시간 (Linearithmic) |
| Θ(n^b) | 다항 시간 (Polynomial) |
| Θ(b^n), b>1 | 지수 시간 (Exponential) |
| Θ(n!) | 팩토리얼 시간 (Factorial) |

## 관련 개념

- [Time Complexity](/knowledge/algorithms/time-complexity/) - 시간 복잡도의 기본 개념
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - 복잡도 표기법
- [Halting Problem](/knowledge/mathematics/halting-problem/) - 풀 수 없는 문제의 대표적 예시
- [Algorithm](/knowledge/algorithms/algorithm/) - 알고리즘의 존재 여부와 효율성
- [Truth Table](/knowledge/mathematics/truth-table/) - 모든 진리값 배정 탐색의 지수적 비용
