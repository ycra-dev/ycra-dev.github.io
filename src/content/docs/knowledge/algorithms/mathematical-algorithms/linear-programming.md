---
title: "선형 계획법 (Linear Programming)"
description: "선형 계획법(Linear Programming)은 유한한 선형 제약 조건(등식 또는 부등식) 하에서 선형 목적 함수를 최대화 또는 최소화하는 최적화 문제를 푸는 수학적 기법이다"
tags: ['Linear Programming', 'Optimization', 'Constraints', 'Feasibility', 'Modeling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/linear-programming
sidebar:
  order: 9
---

## 핵심 개념

**표준형(Standard Form)**:
```
최대화: c^T x
제약조건: Ax ≤ b
         x ≥ 0
```
여기서 A는 m×n 행렬, b는 m-벡터, c는 n-벡터, x는 n-벡터(결정 변수)이다.

**핵심 용어**:
- **실현 가능 해(feasible solution)**: 모든 제약을 만족하는 x
- **실현 가능 영역(feasible region)**: 모든 실현 가능 해의 집합 (볼록 다면체)
- **최적 해(optimal solution)**: 목적 함수를 최대화/최소화하는 실현 가능 해
- **실현 불가능(infeasible)**: 실현 가능 해가 없는 경우
- **비유계(unbounded)**: 유한한 최적 값이 없는 경우

**볼록성의 힘**: 실현 가능 영역이 볼록이므로 최적 해가 반드시 꼭짓점(vertex)에 존재한다.

**LP의 응용**:
- 최단 경로 문제의 LP 모델링
- 최대 유량 문제의 LP 모델링
- 최소 비용 유량
- 다품목 유량(multicommodity flow)
- 근사 알고리즘의 완화(relaxation)

**정수 선형 계획법(Integer LP)**:
- 변수가 정수값만 가능
- NP-hard 문제
- 일반 LP와 달리 다항 시간 알고리즘이 알려지지 않음

## 예시

정치인의 광고 문제:
```
최소화: x₁ + x₂ + x₃ + x₄  (총 광고비)
제약조건:
  -2x₁ + 8x₂ + 0x₃ + 10x₄ ≥ 50  (도시 표 50,000)
   5x₁ + 2x₂ + 0x₃ + 0x₄  ≥ 100 (교외 표 100,000)
   3x₁ - 5x₂ + 10x₃ - 2x₄ ≥ 25  (농촌 표 25,000)
  x₁, x₂, x₃, x₄ ≥ 0

해: x₁ = 20, x₂ = 0, x₃ = 4, x₄ = 9 → 비용 $33,000
```

최단 경로의 LP 모델:
```
최대화: d_t
제약조건: d_v ≤ d_u + w(u,v)  (∀ (u,v) ∈ E)
         d_s = 0
```

## 관련 개념

- [Simplex](/knowledge/algorithms/simplex/) - LP를 푸는 실용적 알고리즘
- [쌍대성 (Duality)](/knowledge/algorithms/duality/) - LP의 쌍대성 이론
- [최단 경로 (Shortest Path)](/knowledge/algorithms/shortest-path/) - LP로 모델링 가능한 그래프 문제
- [최대 유량 (Maximum Flow)](/knowledge/algorithms/maximum-flow/) - LP로 모델링 가능한 네트워크 문제
- [근사 알고리즘 (Approximation Algorithm)](/knowledge/algorithms/approximation-algorithm/) - LP 완화를 활용한 근사 알고리즘
