---
title: "Set Cover"
description: "집합 커버(Set Cover) 문제는 유한 집합 X의 모든 원소를 포함하도록 하는 부분집합 족 F의 최소 부분족을 찾는 NP-완전 문제로, 탐욕 알고리즘이 O(ln |X|)-근사를 달성한다"
tags: ['Set Cover', 'Greedy Algorithm', 'Approximation Algorithm', 'Logarithmic Ratio', 'Np Complete']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/set-cover
sidebar:
  order: 9
---

## 핵심 개념

**문제 정의**:
- 유한 집합 X와 부분집합 족 F = {S₁, S₂, ..., Sₘ} (∪F = X)
- 목표: X의 모든 원소를 커버하는 최소 크기 부분족 C ⊆ F

**정점 커버와의 관계**: 정점 커버는 집합 커버의 특수 경우
- X = 간선 집합 E
- 각 정점 v에 대해 Sᵥ = {v에 인접한 간선들}
- 정점 커버의 NP-완전성에서 집합 커버의 NP-완전성 유도

**GREEDY-SET-COVER 알고리즘**:
```
GREEDY-SET-COVER(X, F)
1  U₀ = X                        // 미커버 원소 집합
2  C = ∅
3  i = 0
4  while Uᵢ ≠ ∅
5      |S ∩ Uᵢ|를 최대화하는 S ∈ F 선택  // 탐욕 선택
6      U_{i+1} = Uᵢ - S           // 커버된 원소 제거
7      C = C ∪ {S}
8      i = i + 1
9  return C
```
- 시간 복잡도: O(|X| · |F| · (|X| + |F|)), 개선 시 O(Σ|S|)

**근사 비율 분석 (Theorem 35.4)**: O(ln |X|)-근사

증명 핵심:
1. 최적 커버 C*의 크기 k = |C*|
2. 각 반복에서 미커버 원소 중 최소 |Uᵢ|/k개를 커버
3. |U_{i+1}| ≤ |Uᵢ| · (1 - 1/k)
4. t번 반복 후: |Uₜ| ≤ |X| · (1 - 1/k)^t ≤ |X| · e^{-t/k}
5. |X| · e^{-t/k} < 1이 되려면 t > k · ln|X|
6. → |C| ≤ |C*| · ⌈ln |X|⌉

**근사 비율의 의미**: 최적의 ln|X| 배 — 상수가 아닌 로그 비율이지만, 로그의 느린 성장으로 실용적

## 예시

```
X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12} (12개 원소)
F = {S₁, S₂, S₃, S₄, S₅, S₆}

S₁ = {1,2,3,4,5,6}     (6개)
S₂ = {5,6,8,9}          (4개)
S₃ = {1,4,7,10}         (4개)
S₄ = {2,5,7,8,11}       (5개)
S₅ = {3,6,9,10,12}      (5개)
S₆ = {7,10,11,12}       (4개)

최적 해: C* = {S₃, S₄, S₅}, |C*| = 3

GREEDY-SET-COVER 실행:
1. S₁ 선택 (6개 커버) → U₁ = {7,8,9,10,11,12}
   (S₁이 6개로 최다 커버)
2. S₆ 선택 (4개 새로 커버: 7,10,11,12) → U₂ = {8,9}
   (S₆={7,10,11,12}∩U₁=4개 > S₄={7,8,11}∩U₁=3개 > S₅={9,10,12}∩U₁=3개)
3. S₂ 선택 (2개 새로 커버: 8,9) → U₃ = ∅
   (S₂={8,9}∩U₂=2개)

결과: C = {S₁, S₆, S₂}, |C| = 3 (이 경우 최적!)

다른 예: S₄ 또는 S₅를 2단계에서 선택한다면:
1. S₁ 선택 → U₁ = {7,8,9,10,11,12}
2. S₄ 선택 (3개 새로 커버: 7,8,11) → U₂ = {9,10,12}
3. S₅ 선택 (3개 새로 커버: 9,10,12) → U₃ = ∅
→ |C| = 3 (여전히 최적, 단 2단계에서 S₆이 더 많이 커버하므로 순수 탐욕은 S₆을 선택)

근사 보장: |C| ≤ 3 · ⌈ln 12⌉ = 3 · 3 = 9
(실제 성능은 보장보다 훨씬 좋음)
```

실생활 예시:
```
스킬 커버 문제:
X = {C++, Python, SQL, React, DevOps}  (필요 스킬)
후보 5명:
  Alice: {C++, Python}
  Bob: {Python, SQL, React}
  Carol: {SQL, DevOps}
  Dave: {C++, React, DevOps}
  Eve: {Python, React}

탐욕: Bob(3개) → Dave(2개: C++, DevOps) → 2명으로 커버 완료
최적: Bob + Dave = 2명
```

## 관련 개념

- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - 집합 커버 근사의 상위 개념
- [Approximation Ratio](/knowledge/algorithms/approximation-ratio/) - 로그 근사 비율
- [Vertex Cover](/knowledge/algorithms/vertex-cover/) - 집합 커버의 특수 경우
- [NP-Completeness](/knowledge/algorithms/np-completeness/) - 집합 커버 결정 문제는 NPC
