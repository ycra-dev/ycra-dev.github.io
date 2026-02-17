---
title: "Approximation Ratio"
description: "근사 비율(Approximation Ratio) ρ(n)은 근사 알고리즘이 반환하는 해의 비용이 최적해 비용의 최대 ρ(n)배 이내임을 보장하는 성능 척도로, 값이 1에 가까울수록 최적에 가깝다"
tags: ['Approximation Ratio', 'Performance Guarantee', 'Ptas', 'Fptas', 'Optimization', 'Lower Bound']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/approximation-ratio
sidebar:
  order: 11
---

## 핵심 개념

**형식적 정의**: 크기 n의 모든 입력에 대해:
```
max(C/C*, C*/C) ≤ ρ(n)
```
- 최소화 문제: C/C* ≤ ρ(n) (C ≥ C*이므로)
- 최대화 문제: C*/C ≤ ρ(n) (C ≤ C*이므로)
- 항상 ρ(n) ≥ 1

**근사 비율의 유형**:
1. **상수 비율**: ρ(n) = c (입력 크기와 무관)
   - 정점 커버: 2-근사
   - TSP (삼각 부등식): 2-근사
   - MAX-3-CNF-SAT: 8/7-근사 (무작위)

2. **로그 비율**: ρ(n) = O(log n)
   - 집합 커버: O(ln |X|)-근사

3. **다항 비율**: ρ(n) = O(n^c)
   - 일부 문제에서 최선으로 알려진 비율

**근사 스킴**:
- **PTAS** (다항 시간 근사 스킴):
  ```
  임의의 고정 ε > 0에 대해 (1+ε)-근사
  실행 시간: n의 다항식 (ε에 따라 차수 변동 가능)
  예: O(n^{2/ε})
  ```
- **FPTAS** (완전 다항 시간 근사 스킴):
  ```
  (1+ε)-근사, 실행 시간이 n과 1/ε 모두의 다항식
  예: O((1/ε)² · n³)
  예시: 부분집합 합 문제
  ```
  FPTAS > PTAS > 상수 비율 > 로그 비율 (품질 순)

**근사 비율 증명 기법**:
1. **하한 기법**: 최적해의 크기를 모르므로, 계산 가능한 하한과 비교
   - 정점 커버: 극대 매칭 크기 ≤ |C*|
   - TSP: MST 가중치 ≤ c(H*)
   - 가중 정점 커버: LP 이완 최적값 ≤ w(C*)

2. **불가능성 증명**: 특정 비율 이하의 근사가 P ≠ NP 가정 하에 불가능
   - 일반 TSP: 임의 상수 ρ-근사 불가
   - 기법: NP-hard 결정 문제에서 갭이 있는 최적화 문제로 환원

**무작위 근사 비율**: 기대 비용에 대한 비율
```
max(E[C]/C*, C*/E[C]) ≤ ρ(n)
```

## 예시

```
근사 비율 비교:

1. ρ = 1: 최적 해 (다항 시간 정확 해법)
2. ρ = 1.01: 최적의 1% 이내 (매우 우수)
3. ρ = 2: 최적의 2배 이내 (정점 커버, TSP)
4. ρ = O(ln n): 입력에 따라 증가 (집합 커버)
5. ρ = ∞: 근사 보장 없음

정점 커버 2-근사 증명 구조:
|A|: 극대 매칭 크기
|C*| ≥ |A|        (하한: 최적해는 매칭의 각 간선에서 1개 이상)
|C| = 2|A|        (상한: 알고리즘은 각 간선의 양 끝점 선택)
|C| = 2|A| ≤ 2|C*| (비율: 2)

FPTAS 예 (부분집합 합):
S = {1, 4, 5}, t = 8
ε = 0.5 → (1+ε) = 1.5

최적: {4, 5} = 9 (> 8이므로 제외), {1, 4} = 5 or {1, 5} = 6
실제 최적: 합 ≤ 8 중 최대 = {1, 4, 5} (불가), {4, 5}(불가), {1, 5}=6
FPTAS 보장: 해 ≥ 6/1.5 = 4 이상

실행 시간: O(n²/ε) — n과 1/ε 모두에 다항
```

## 관련 개념

- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - 근사 비율을 사용하는 알고리즘
- [Vertex Cover](/knowledge/algorithms/vertex-cover/) - 2-근사의 대표 예
- [Traveling Salesperson](/knowledge/algorithms/traveling-salesperson/) - 2-근사 및 근사 불가능성
- [Set Cover](/knowledge/algorithms/set-cover/) - 로그 근사 비율의 예
- [NP-Completeness](/knowledge/algorithms/np-completeness/) - 근사가 필요한 이유
- [Linear Programming](/knowledge/algorithms/linear-programming/) - LP 이완을 통한 하한 계산
