---
title: "NP-난해 (NP-Hard)"
description: "NP-난해(NP-Hard) 문제는 NP의 모든 문제가 다항 시간에 환원 가능한 문제로, NP에서 \"가장 어려운\" 수준의 난이도를 가지지만 반드시 NP에 속할 필요는 없다"
tags: ['Np Hard', 'Complexity Theory', 'Intractability', 'Computational Hardness', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/np-hard
sidebar:
  order: 4
---

## 핵심 개념

**정의**: 언어 L이 NP-hard이려면:
```
모든 L' ∈ NP에 대해 L' ≤_P L
```
- NP-완전(NPC) = NP-hard ∩ NP
- NP-hard이지만 NP에 속하지 않는 문제도 존재 가능

**NP-hard vs NP-complete 비교**:
```
NP-hard: NP의 모든 문제 이상으로 어려움
NP-complete: NP-hard이면서 NP에 속함

NP-hard ⊇ NP-complete

NP에 속하지 않는 NP-hard 예:
- 정지 문제 (Halting Problem): 결정 불가능
- k-means 문제의 최적화 버전
- 일부 PSPACE-complete 문제
```

**NP-hard 증명 방법**:
1. 이미 알려진 NP-hard 문제 L'에서 L로의 다항 시간 환원 구성
2. L' ≤_P L이면, 환원의 전이성으로 L도 NP-hard
3. L ∈ NP를 추가로 보이면 NP-complete

**결정 문제 vs 최적화 문제**:
- NP-완전은 결정 문제에 적용
- 관련 최적화 문제는 자동으로 NP-hard
- 결정 문제가 NP-hard → 최적화 문제도 NP-hard (최적화가 최소한 결정만큼 어려움)

**실용적 의미**:
- NP-hard 증명 = 다항 시간 정확 해법을 찾으려는 노력은 무의미할 가능성 높음
- 대안 전략:
  1. 근사 알고리즘 (Chapter 35)
  2. 특수 케이스 해결
  3. 지수 시간 정확 알고리즘 (작은 입력)
  4. 휴리스틱/메타휴리스틱

## 예시

```
NP-hard 문제의 분류:

1. NP-complete (NP-hard ∩ NP):
   - SAT, 3-CNF-SAT
   - HAM-CYCLE
   - VERTEX-COVER (결정 버전)
   - SUBSET-SUM (결정 버전)
   - CLIQUE

2. NP-hard이지만 NP인지 모르는 문제:
   - TSP 최적화 버전 (최소 비용 해밀턴 순환 찾기)
   - 그래프 색칠 최적화 (최소 색 수 찾기)
   - 0-1 정수 계획법

3. 결정 불가능한 NP-hard 문제:
   - 정지 문제 (Halting Problem)

최적화 → 결정 환원 예:
VERTEX-COVER 최적화: "최소 정점 커버를 구하라" (NP-hard)
VERTEX-COVER 결정: "크기 k 이하 정점 커버가 있는가?" (NP-complete)

결정 문제를 풀 수 있으면 이진 탐색으로 최적화도 풀 수 있음
→ 최적화 ≥ 결정 난이도
```

## 관련 개념

- [NP-완전성 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - NP-hard ∩ NP
- [다항 시간 (Polynomial Time)](/knowledge/algorithms/polynomial-time/) - NP-hard와 대비되는 효율적 해결 가능 문제
- [환원 (Reduction)](/knowledge/algorithms/reduction/) - NP-hard 증명의 핵심 도구
- [근사 알고리즘 (Approximation Algorithm)](/knowledge/algorithms/approximation-algorithm/) - NP-hard 문제의 실용적 대안
- [K-평균 (K-Means)](/knowledge/algorithms/k-means/) - NP-hard 최적화 문제의 예
