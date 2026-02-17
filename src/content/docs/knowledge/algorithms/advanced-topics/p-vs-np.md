---
title: "P vs NP"
description: "P vs NP 문제는 \"다항 시간에 해를 검증할 수 있는 모든 문제가 다항 시간에 풀 수도 있는가?\"를 묻는 이론 컴퓨터 과학의 가장 깊고 중요한 미해결 문제이다 (1971년 이래)"
tags: ['P Vs Np', 'Complexity Theory', 'Open Problem', 'Np', 'Co Np', 'Millennium Prize']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/p-vs-np
sidebar:
  order: 2
---

## 핵심 개념

**클래스 정의**:
- **P**: 다항 시간에 **판정(decide)** 가능한 결정 문제
  ```
  P = {L ⊆ {0,1}* : 다항 시간 판정 알고리즘 존재}
  ```
- **NP**: 다항 시간에 **검증(verify)** 가능한 결정 문제
  ```
  NP = {L : |y| = O(|x|^c)인 인증서 y와 다항 시간 검증기 A(x,y) 존재}
  ```
- P ⊆ NP는 자명 (풀 수 있으면 검증도 가능)
- 핵심 질문: P = NP인가, P ⊂ NP인가?

**직관적 이해**: "풀기"와 "검증하기"의 난이도가 같은가?
- 스도쿠를 푸는 것 vs 완성된 스도쿠가 맞는지 확인하는 것
- 대부분의 연구자는 P ≠ NP라고 믿음

**co-NP와의 관계**:
```
co-NP = {L : L̄ ∈ NP}  (여집합이 NP에 속하는 언어들)
```
- P ⊆ NP ∩ co-NP (P는 여집합에 닫혀 있으므로)
- NP = co-NP인지도 미해결

**네 가지 가능한 시나리오**:
1. P = NP = co-NP (가장 가능성 낮음)
2. NP = co-NP이지만 P ≠ NP
3. P = NP ∩ co-NP이지만 NP ≠ co-NP
4. NP ≠ co-NP이고 P ≠ NP ∩ co-NP (가장 유력)

**NP-완전 문제의 역할**:
- NPC 문제 하나라도 P에 속하면 → P = NP (Theorem 34.4)
- 수십 년간 수천 개의 NPC 문제에 대해 다항 시간 알고리즘 미발견
- NPC 증명 = 해당 문제가 어려울 가능성이 높다는 강력한 간접 증거

**결과의 영향**:
- P = NP이면: 암호학 체계 붕괴, 모든 NP 문제 효율적 해결 가능
- P ≠ NP이면: 근본적 계산 한계 존재, 근사/휴리스틱 필요성 정당화

## 예시

```
P에 속하는 문제:
- 최단 경로: O(VE)
- 2-SAT: O(V+E)
- 매칭: O(V³)
- 오일러 투어: O(E)

NP에 속하지만 P인지 모르는 문제 (P ≠ NP 가정 시):
- 3-SAT
- 해밀턴 순환
- 그래프 색칠 (k ≥ 3)
- 정점 커버

유사하지만 난이도가 다른 쌍:
┌─────────────────────┬──────────────────────┐
│     P (쉬움)         │   NPC (어려움)         │
├─────────────────────┼──────────────────────┤
│ 최단 경로            │ 최장 단순 경로          │
│ 오일러 투어          │ 해밀턴 순환            │
│ 2-SAT              │ 3-SAT                │
│ 2-색칠              │ 3-색칠                │
└─────────────────────┴──────────────────────┘

검증의 예:
HAM-CYCLE: 인증서 = 정점 순열 ⟨v₁, v₂, ..., v_n⟩
검증:
1. 모든 정점이 정확히 한 번 등장? O(V)
2. 연속 간선 (vᵢ, vᵢ₊₁) ∈ E? O(V)
3. (v_n, v₁) ∈ E? O(1)
→ 다항 시간에 검증 가능 → HAM-CYCLE ∈ NP
```

## 관련 개념

- [NP-Completeness](/knowledge/algorithms/np-completeness/) - NP에서 가장 어려운 문제 클래스
- [Polynomial Time](/knowledge/algorithms/polynomial-time/) - P 클래스의 정의
- [NP-Hard](/knowledge/algorithms/np-hard/) - NP 이상의 난이도
- [Reduction](/knowledge/algorithms/reduction/) - 문제 간 난이도 비교
- [Satisfiability](/knowledge/algorithms/satisfiability/) - P vs NP의 핵심 연결 고리
