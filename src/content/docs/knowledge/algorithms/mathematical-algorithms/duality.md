---
title: "Duality"
description: "쌍대성(Duality)은 선형 계획법에서 모든 최대화 문제(원시 문제, primal)에 대응하는 최소화 문제(쌍대 문제, dual)가 존재하며, 두 문제의 최적 목적 함수 값이 동일하다는 이론이다"
tags: ['Duality', 'Linear Programming', 'Optimization', 'Primal Dual', 'Complementary Slackness']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/duality
sidebar:
  order: 11
---

## 핵심 개념

**원시-쌍대 관계**:

원시(Primal):
```
최대화: c^T x
제약: Ax ≤ b, x ≥ 0
```

쌍대(Dual):
```
최소화: b^T y
제약: A^T y ≥ c, y ≥ 0
```

**약 쌍대성 정리(Weak Duality Theorem)**:
- 원시의 실현 가능 해 x와 쌍대의 실현 가능 해 y에 대해:
  c^T x ≤ b^T y
- 원시의 최적 값 ≤ 쌍대의 최적 값
- 따라서 쌍대의 실현 가능 해는 원시 최적 값의 상한을 제공

**강 쌍대성 정리(Strong Duality Theorem)**:
- 원시가 유한 최적 해를 가지면, 쌍대도 유한 최적 해를 가지며:
  c^T x* = b^T y*
- 원시의 최적 값 = 쌍대의 최적 값

**쌍대성의 활용**:
1. **최적성 증명**: 원시와 쌍대의 목적 값이 같으면 두 해 모두 최적
2. **심플렉스의 정확성 증명**: 심플렉스가 반환한 해가 최적임을 쌍대를 통해 입증
3. **근사 알고리즘**: LP 완화의 쌍대를 이용한 근사비 분석
4. **경제적 해석**: 쌍대 변수는 자원의 "그림자 가격(shadow price)"으로 해석

## 예시

원시 문제:
```
최대화: 3x₁ + x₂ + 2x₃
제약: x₁ + x₂ + 3x₃ ≤ 30
      2x₁ + 2x₂ + 5x₃ ≤ 24
      4x₁ + x₂ + 2x₃ ≤ 36
      x₁, x₂, x₃ ≥ 0
```

대응하는 쌍대:
```
최소화: 30y₁ + 24y₂ + 36y₃
제약: y₁ + 2y₂ + 4y₃ ≥ 3
      y₁ + 2y₂ + y₃  ≥ 1
      3y₁ + 5y₂ + 2y₃ ≥ 2
      y₁, y₂, y₃ ≥ 0

강 쌍대성: 원시 최적 값 = 쌍대 최적 값
```

## 관련 개념

- [Linear Programming](/knowledge/algorithms/linear-programming/) - 쌍대성의 기반 이론
- [Simplex](/knowledge/algorithms/simplex/) - 심플렉스 최적성의 쌍대 증명
- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - LP 쌍대를 활용한 근사비 분석
- [Maximum Flow](/knowledge/algorithms/maximum-flow/) - 최대 유량-최소 절단 정리도 쌍대성의 예
