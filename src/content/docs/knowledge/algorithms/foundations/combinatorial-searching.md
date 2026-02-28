---
title: "Combinatorial Searching"
description: "이산 객체를 조합하여 특정 패턴이나 최적 배열을 찾는 알고리즘 기법의 총칭으로, 존재성·구성·열거·생성·최적화의 다섯 가지 기본 질문 유형으로 구분된다"
tags: ["Algorithms", "Combinatorics", "ProblemSolving", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/combinatorial-searching
sidebar:
  order: 101
---

## 핵심 개념

조합론적 탐색(Combinatorial Searching)이란 순열, 그래프, 집합 등의 이산 객체를 조합하여 특정 패턴이나 최적 배열을 찾는 알고리즘 기법의 총칭이다. TAOCP Volume 4A의 핵심 주제이며, 하나의 좋은 아이디어가 수백만 배의 계산량을 줄일 수 있다는 것이 Knuth의 핵심 메시지다.

## 동작 원리

조합론적 문제를 다룰 때 다섯 가지 기본 질문 유형이 등장한다:

1. **존재성(Existence)**: 조건을 만족하는 배열 X가 존재하는가?
2. **구성(Construction)**: 존재한다면, 빠르게 찾을 수 있는가?
3. **열거(Enumeration)**: 서로 다른 배열이 몇 개인가?
4. **생성(Generation)**: 모든 배열 X₁, X₂, ...를 체계적으로 방문할 수 있는가?
5. **최적화(Optimization)**: 목적함수 f(X)를 최대/최소화하는 배열은 무엇인가?

이 다섯 가지 질문은 난이도 순서로 배열되어 있기도 하다: 존재성 증명이 실제 구성보다 쉬울 수 있고, 하나의 해를 찾는 것이 모든 해를 열거하는 것보다 쉽다.

**핵심 통찰:** 10×10 Latin Square의 직교 짝(orthogonal mate)을 찾는 문제에서, Paige-Tompkins의 직접 탐색은 2×10²⁰ mem 연산을 요구하지만, Parker의 transversal 분해 방법은 1.7×10⁸ mem 연산만으로 해결한다. 알고리즘 설계가 얼마나 중요한지 보여주는 사례다.

## 예시

Langford 쌍 문제: {1,1,2,2,...,n,n}을 각 숫자 k 사이에 정확히 k개의 다른 숫자가 오도록 배열한다.

```
존재성 판단:
n mod 4 = 0 또는 n mod 4 = 3일 때만 해 존재
→ n=3: 해 존재 (231213)
→ n=4: 해 없음 (n mod 4 = 0이므로 실제로는 해 있음 — 41312432)

n=3의 유일한 해: 3 1 2 1 3 2
→ 각 숫자 k 사이에 정확히 k개의 숫자:
  1과 1 사이: 2 (1개)
  2와 2 사이: 1 3 (2개)
  3과 3 사이: 1 2 1 (3개)
```

다섯 가지 질문의 적용:
- **존재성**: n mod 4 ≡ 0, 3일 때만 해 존재 (순수 수학적 조건)
- **구성**: 백트래킹으로 하나의 해를 찾음
- **열거**: L_24 ≈ 5×10¹⁶ (직접 계산 불가, 다항식 대수 활용)
- **생성**: 모든 해를 체계적으로 열거하는 알고리즘
- **최적화**: 가장 대칭적인 해를 찾는 문제

## 관련 개념

- [Exact Cover Problem](/knowledge/discrete-mathematics/combinatorics/exact-cover-problem/)
- [Latin Square](/knowledge/discrete-mathematics/combinatorics/latin-square/)
- [Permutation Generation](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
- [NP-Completeness](/knowledge/algorithms/foundations/np-completeness/)
