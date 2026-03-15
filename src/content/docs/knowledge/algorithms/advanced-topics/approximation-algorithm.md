---
title: "근사 알고리즘 (Approximation Algorithm)"
description: "근사 알고리즘(Approximation Algorithm)은 NP-완전 최적화 문제에 대해 다항 시간 내에 최적해에 가까운 근사해를 반환하는 알고리즘으로, 해의 품질이 근사 비율로 보장된다"
tags: ['Approximation Algorithm', 'Np Complete', 'Near Optimal', 'Polynomial Time', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/approximation-algorithm
sidebar:
  order: 10
---

## 핵심 개념

**NP-완전 문제에 대한 세 가지 접근**:
1. 입력이 작으면 지수 시간 알고리즘 사용
2. 다항 시간에 풀리는 특수 케이스 분리
3. **근사 알고리즘**: 다항 시간에 근사해 산출

**근사 비율(Approximation Ratio)** ρ(n):
```
최소화: C / C* ≤ ρ(n)
최대화: C* / C ≤ ρ(n)
```
- C: 알고리즘이 반환한 해의 비용
- C*: 최적해의 비용
- ρ(n) ≥ 1 (1이면 최적)

**근사 스킴(Approximation Scheme)**:
- **PTAS** (다항 시간 근사 스킴): 임의의 ε > 0에 대해 (1+ε)-근사, 실행 시간 n의 다항식
  - 예: O(n^{2/ε}) — ε이 줄면 급격히 느려질 수 있음
- **FPTAS** (완전 다항 시간 근사 스킴): 실행 시간이 n과 1/ε 모두의 다항식
  - 예: O((1/ε)² · n³) — ε 감소에 비례하여 느려짐

**근사 불가능성 결과 (Theorem 35.3)**:
- 일부 문제는 P ≠ NP 가정 하에 상수 근사 비율 자체가 불가능
- 예: 삼각 부등식 없는 일반 TSP — 임의 상수 ρ에 대해 ρ-근사 불가

**대표 결과 요약**:
```
┌──────────────────┬──────────────────┬────────────┐
│ 문제              │ 근사 비율         │ 기법        │
├──────────────────┼──────────────────┼────────────┤
│ Vertex Cover     │ 2                │ 극대 매칭    │
│ TSP (삼각부등식)   │ 2                │ MST + 순회  │
│ Set Cover        │ O(ln |X|)        │ 탐욕법      │
│ MAX-3-CNF-SAT    │ 8/7              │ 무작위화     │
│ Weighted VC      │ 2                │ LP 이완     │
│ Subset Sum       │ FPTAS            │ 리스트 정리  │
└──────────────────┴──────────────────┴────────────┘
```

**근사 알고리즘 설계 기법**:
1. 탐욕법 (greedy)
2. 선형 계획법 이완 + 반올림 (LP relaxation + rounding)
3. 무작위화 (randomization)
4. 동적 계획법 + 스케일링/정리

## 예시

```
Vertex Cover 2-근사:

그래프: a-b, b-c, c-d, c-e, e-f, d-g
최적 해: {b, d, e} (크기 3)
근사 해: {b,c, e,f, d,g} (크기 6)

6 ≤ 2 · 3 ✓ (근사 비율 2 이내)

FPTAS for Subset Sum:
S = {104, 102, 201, 301}, t = 308
ε = 0.40

정리(trimming) 후 리스트 크기가 O(1/ε)로 제한
→ 다항 시간에 (1+ε)-최적 해 보장
→ 해: {104, 201} = 305 ≥ 308/(1+0.40) = 220
```

## 관련 개념

- [NP-완전성 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - 근사 알고리즘이 필요한 이유
- [근사 비율 (Approximation Ratio)](/knowledge/algorithms/approximation-ratio/) - 해의 품질 보장 척도
- [정점 덮개 (Vertex Cover)](/knowledge/algorithms/vertex-cover/) - 2-근사 알고리즘의 대표 예
- [외판원 문제 (Traveling Salesperson)](/knowledge/algorithms/traveling-salesperson/) - TSP 근사 알고리즘
- [집합 덮개 (Set Cover)](/knowledge/algorithms/set-cover/) - 로그 근사 알고리즘의 예
- [선형 계획법 (Linear Programming)](/knowledge/algorithms/linear-programming/) - LP 이완 기반 근사
