---
title: "NP-Completeness"
description: "NP-완전(NP-Complete) 문제는 NP에 속하면서 NP의 모든 문제가 다항 시간에 환원 가능한 문제로, NP에서 \"가장 어려운\" 문제 클래스이다"
tags: ['Np Completeness', 'Npc', 'Complexity Theory', 'Intractability', 'Computational Complexity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/np-completeness
sidebar:
  order: 3
---

## 핵심 개념

**NP-완전의 정의**: 언어 L ⊆ {0,1}*이 NP-완전(NPC)이려면:
1. L ∈ NP (다항 시간에 검증 가능)
2. 모든 L' ∈ NP에 대해 L' ≤_P L (다항 시간 환원 가능)

조건 2만 만족하면 **NP-hard**(NP-난해)라 한다.

**핵심 정리 (Theorem 34.4)**:
- 어떤 NP-완전 문제가 P에 속하면 → P = NP
- 어떤 NP 문제가 다항 시간에 풀리지 않으면 → 모든 NP-완전 문제가 다항 시간에 풀리지 않음

**NP-완전성 증명 방법** (Lemma 34.8):
1. L ∈ NP임을 보인다 (다항 시간 검증 알고리즘 제시)
2. 이미 알려진 NPC 문제 L'에서 L로의 다항 시간 환원을 보인다 (L' ≤_P L)
3. 환원의 전이성으로 모든 NP 문제가 L로 환원됨

**최초의 NP-완전 문제**: 회로 충족 가능성(CIRCUIT-SAT)
- Cook-Levin 정리에 해당하는 결과
- 모든 NP 언어를 직접 CIRCUIT-SAT로 환원
- 다항 시간 검증 알고리즘 A의 계산을 부울 회로 M으로 시뮬레이션

**환원 체인의 예**:
```
CIRCUIT-SAT → SAT → 3-CNF-SAT → CLIQUE
                                → VERTEX-COVER
                                → HAM-CYCLE → TSP
                                → SUBSET-SUM
```

**실용적 의미**:
- NP-완전 증명 = 효율적 알고리즘이 없을 가능성이 매우 높다는 강력한 증거
- 대안: 근사 알고리즘, 특수 케이스, 지수 시간 알고리즘

## 예시

```
대표적 NP-완전 문제:

1. HAM-CYCLE: 그래프에 해밀턴 순환이 존재하는가?
   - 검증: 주어진 정점 순열이 해밀턴 순환인지 O(V²)에 확인
   - 풀기: 모든 순열 확인 → O(V!)

2. 3-CNF-SAT: 3-CNF 부울 식을 참으로 만드는 배정이 있는가?
   - (x₁ ∨ ¬x₂ ∨ x₃) ∧ (¬x₁ ∨ x₂ ∨ x₄) ∧ ...
   - 검증: 배정 대입 → O(n)
   - 풀기: 2^n개 배정 시도

3. VERTEX-COVER: 크기 k 이하의 정점 커버가 존재하는가?

4. SUBSET-SUM: 합이 t가 되는 부분집합이 존재하는가?

유사하지만 난이도가 다른 문제 쌍:
- 최단 경로 (P) vs 최장 단순 경로 (NPC)
- 오일러 투어 (P) vs 해밀턴 순환 (NPC)
- 2-CNF-SAT (P) vs 3-CNF-SAT (NPC)
```

## 관련 개념

- [Polynomial Time](/knowledge/algorithms/polynomial-time/) - P 클래스의 정의
- [NP-Hard](/knowledge/algorithms/np-hard/) - NP-완전의 상위 개념
- [Reduction](/knowledge/algorithms/reduction/) - NPC 증명의 핵심 도구
- [P vs NP](/knowledge/algorithms/p-vs-np/) - 미해결 문제
- [Satisfiability](/knowledge/algorithms/satisfiability/) - 최초의 NPC 문제
- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - NPC 문제에 대한 실용적 접근
