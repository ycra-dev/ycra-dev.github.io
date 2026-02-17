---
title: "Simplex Algorithm"
description: "심플렉스 알고리즘(Simplex Algorithm)은 선형 계획법의 실현 가능 영역(심플렉스)의 꼭짓점을 따라 이동하면서 목적 함수를 개선하여 최적 해를 찾는 반복적 알고리즘이다"
tags: ['Simplex', 'Linear Programming', 'Optimization', 'Vertex', 'Pivoting']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/simplex
sidebar:
  order: 10
---

## 핵심 개념

**기본 아이디어**:
1. 심플렉스의 한 꼭짓점에서 시작
2. 각 반복에서 인접한 꼭짓점 중 목적 함수 값이 더 큰(최대화 시) 꼭짓점으로 이동
3. 모든 인접 꼭짓점의 목적 함수 값이 현재보다 작거나 같으면 종료
4. 볼록성과 선형성 때문에 지역 최적이 곧 전역 최적

**2차원 기하학적 직관**:
- 각 제약 조건은 반평면(half-space)을 정의
- 실현 가능 영역은 반평면들의 교집합 → 볼록 다각형
- 목적 함수 c^Tx = z는 기울기가 고정된 직선의 집합
- 직선을 이동시켜 실현 가능 영역과 마지막으로 만나는 점이 최적 해

**시간 복잡도**:
- 최악의 경우: 지수 시간 (특수하게 구성된 입력)
- 실제로는 매우 빠르게 수렴 (실용적으로 가장 널리 사용)

**다른 LP 알고리즘**:
- **타원체 알고리즘(Ellipsoid algorithm)**: 최초의 다항 시간 LP 알고리즘, 실용적으로 느림
- **내부점 방법(Interior-point methods)**: 다항 시간, 실현 가능 영역 내부를 이동, 대규모 문제에서 심플렉스만큼 빠르거나 더 빠름

심플렉스는 실현 가능 영역의 **외부(경계)**를 따라 이동하지만, 내부점 방법은 **내부**를 통과한다.

## 예시

2변수 LP 예시:
```
최대화: x₁ + x₂
제약조건:
  4x₁ - x₂ ≤ 8
  2x₁ + x₂ ≤ 10
  5x₁ - 2x₂ ≥ -2
  x₁, x₂ ≥ 0

기하학적 풀이:
1. 각 제약의 반평면 교집합 → 실현 가능 영역 (볼록 다각형)
2. x₁ + x₂ = z 직선을 z가 커지는 방향으로 이동
3. 마지막 접점: (x₁, x₂) = (2, 6), 최적 값 = 8

심플렉스 경로: (0,0) → (2,0) → (2,6) (꼭짓점 이동)
```

## 관련 개념

- [Linear Programming](/knowledge/algorithms/linear-programming/) - 심플렉스가 풀어야 하는 문제
- [Duality](/knowledge/algorithms/duality/) - 심플렉스의 최적성 증명에 사용
- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - LP 기반 근사 알고리즘
