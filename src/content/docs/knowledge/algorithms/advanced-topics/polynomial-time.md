---
title: "다항 시간 (Polynomial Time)"
description: "다항 시간(Polynomial Time)은 입력 크기 n에 대해 O(n^k) (상수 k) 시간 내에 해결 가능함을 의미하며, 복잡도 클래스 P는 다항 시간에 판정 가능한 모든 결정 문제의 집합이다"
tags: ['Polynomial Time', 'Complexity Class P', 'Tractability', 'Decision Problem', 'Encoding']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/polynomial-time
sidebar:
  order: 1
---

## 핵심 개념

**복잡도 클래스 P의 정의**:
```
P = {L ⊆ {0,1}* : L을 다항 시간에 판정하는 알고리즘 A가 존재}
```

**다항 시간이 "다루기 쉬운(tractable)" 기준인 이유**:
1. 실제 다항 시간 문제는 대부분 낮은 차수 — Θ(n¹⁰⁰)은 이론적이지만 실무적으로 드뭄
2. **계산 모델 독립성**: 순차 RAM, 튜링 기계, 다항 크기 병렬 컴퓨터에서 동일한 P 클래스
3. **닫힘 성질**: 다항 시간은 덧셈, 곱셈, 합성에 닫혀 있음

**추상 문제 vs 구체 문제**:
- **추상 문제**: 문제 인스턴스 집합 I에서 해집합 S로의 관계
- **결정 문제**: 답이 "예/아니오"인 문제, 함수 Q: I → {0,1}
- **구체 문제**: 이진 문자열로 인코딩된 문제

**인코딩의 중요성**:
- 정수 k의 연산이 Θ(k)라면:
  - **이진 인코딩**: 입력 크기 n = ⌊lg k⌋ + 1 → 실행 시간 Θ(2^n) (지수)
  - **단항 인코딩**: 입력 크기 n = k → 실행 시간 Θ(n) (다항)
- **다항적으로 관련된(polynomially related)** 인코딩 간에는 P 소속이 불변 (Lemma 34.1)

**형식 언어 프레임워크**:
- 결정 문제 ↔ 언어 L ⊆ Σ* (Σ = {0,1})
- 알고리즘 A가 L을 **수락(accept)**: x ∈ L이면 A(x) = 1
- 알고리즘 A가 L을 **판정(decide)**: 모든 x에 대해 올바르게 수락/거부
- Theorem 34.2: P = {다항 시간에 수락되는 언어들} = {다항 시간에 판정되는 언어들}

**P의 닫힘 성질**: 합집합, 교집합, 연결, 여집합, 클리니 폐포에 닫혀 있음

## 예시

```
P에 속하는 대표적 문제:

1. PATH = {⟨G, u, v, k⟩ : G에서 u→v 경로가 최대 k개 간선}
   → BFS로 O(V+E)에 판정

2. 최단 경로: O(VE) (벨만-포드)
3. 정렬: O(n lg n)
4. 최소 신장 트리: O(E lg V)
5. 2-CNF-SAT: O(V+E)

인코딩에 따른 차이:
정수 k를 입력받아 k번 반복하는 알고리즘:
- 이진 인코딩 → Θ(2^n): P에 속하지 않음
- 단항 인코딩 → Θ(n): P에 속함

최적화 문제 → 결정 문제 변환:
SHORTEST-PATH (최적화) → PATH (결정)
"u에서 v까지 최단 경로를 구하라"
  → "u에서 v까지 간선 k개 이하의 경로가 있는가?"
```

## 관련 개념

- [NP-완전성 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - P와 NP의 관계
- [P vs NP 문제](/knowledge/algorithms/p-vs-np/) - P = NP 여부의 미해결 문제
- [환원 (Reduction)](/knowledge/algorithms/reduction/) - 문제 간 난이도 비교 도구
- [NP-난해 (NP-Hard)](/knowledge/algorithms/np-hard/) - P에 속하지 않을 가능성이 높은 문제
