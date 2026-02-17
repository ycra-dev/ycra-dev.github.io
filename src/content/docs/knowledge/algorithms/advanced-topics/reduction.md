---
title: "Reduction"
description: "다항 시간 환원(Polynomial-Time Reduction)은 문제 A의 임의의 인스턴스를 문제 B의 인스턴스로 다항 시간에 변환하여, B의 답이 A의 답과 일치하도록 하는 기법으로, NP-완전성 증명의 핵심 도구이다"
tags: ['Reduction', 'Polynomial Time Reduction', 'Np Completeness Proof', 'Problem Transformation', 'Complexity Theory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/reduction
sidebar:
  order: 5
---

## 핵심 개념

**형식적 정의**: 언어 L₁이 언어 L₂로 다항 시간 환원 가능 (L₁ ≤_P L₂):
```
다항 시간 계산 가능 함수 f: {0,1}* → {0,1}*이 존재하여
모든 x에 대해: x ∈ L₁ ⟺ f(x) ∈ L₂
```
- f를 **환원 함수(reduction function)**
- f를 계산하는 알고리즘을 **환원 알고리즘(reduction algorithm)**이라 함

**환원의 두 가지 용도**:

1. **"쉬움" 증명** (Lemma 34.3): L₁ ≤_P L₂이고 L₂ ∈ P → L₁ ∈ P
   - B를 풀 수 있으면 A도 풀 수 있다

2. **"어려움" 증명**: L₁ ≤_P L₂이고 L₁가 어려움 → L₂도 어렵다
   - A가 어려우면 B도 어렵다
   - NP-완전성 증명에 사용

**NPC 증명 절차** (Lemma 34.8):
```
L이 NPC임을 보이려면:
1. L ∈ NP 증명 (다항 시간 검증기 제시)
2. 알려진 NPC 문제 L'에서 환원: L' ≤_P L
   - 환원 함수 f 구성
   - f의 다항 시간 계산 가능성 증명
   - x ∈ L' ⟺ f(x) ∈ L 증명 (양방향)
```

**환원의 성질**:
- **전이성**: L₁ ≤_P L₂이고 L₂ ≤_P L₃이면 L₁ ≤_P L₃
- **여집합 보존**: L ≤_P L' ⟺ L̄ ≤_P L̄'

**유명한 환원 체인**:
```
CIRCUIT-SAT ≤_P SAT ≤_P 3-CNF-SAT ≤_P CLIQUE
                                    ≤_P VERTEX-COVER ≤_P HAM-CYCLE ≤_P TSP
                                    ≤_P SUBSET-SUM
```

## 예시

```
환원 예시: VERTEX-COVER ≤_P HAM-CYCLE

입력: 그래프 G = (V,E)와 정수 k
목표: G에 크기 k의 정점 커버가 존재하는가?

환원 함수 f:
- ⟨G, k⟩ → ⟨G'⟩
- G'는 G에 크기 k 정점 커버가 있을 때만
  해밀턴 순환을 가지도록 구성

검증:
- f는 다항 시간에 계산 가능 ✓
- G에 크기 k 정점 커버 ↔ G'에 해밀턴 순환 ✓

따라서 VERTEX-COVER ≤_P HAM-CYCLE
```

더 직관적인 환원 예시:
```
일차방정식 풀기 ≤_P 이차방정식 풀기

환원: ax + b = 0 → ax² + bx + 0 = 0
- 이차방정식의 해 x = (-b ± b) / 2a
- x = 0 또는 x = -b/a
- -b/a가 원래 일차방정식의 해

→ 이차방정식을 풀 수 있으면 일차방정식도 풀 수 있다
→ 일차방정식이 이차방정식 이하로 어렵다
```

NP-완전성 증명의 구체적 흐름:
```
3-CNF-SAT ≤_P CLIQUE 환원:

φ = C₁ ∧ C₂ ∧ ... ∧ Cₖ (각 Cᵢ는 3개 리터럴)

그래프 G 구성:
- 각 절 Cᵢ의 각 리터럴에 대해 정점 생성
- 간선: 다른 절의 리터럴 중 모순 아닌 것끼리 연결
  (같은 절 내 정점 연결 안 함, xᵢ와 ¬xᵢ 연결 안 함)

φ 충족 가능 ⟺ G에 크기 k의 클리크 존재
```

## 관련 개념

- [NP-Completeness](/knowledge/algorithms/np-completeness/) - 환원이 증명하는 대상
- [NP-Hard](/knowledge/algorithms/np-hard/) - 환원으로 증명되는 난이도
- [Polynomial Time](/knowledge/algorithms/polynomial-time/) - 환원의 효율성 요구사항
- [Satisfiability](/knowledge/algorithms/satisfiability/) - 환원 체인의 시작점
