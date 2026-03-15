---
title: "탐욕 알고리즘 (Greedy Algorithm)"
description: "그리디 알고리즘(Greedy Algorithm)은 각 단계에서 그 순간에 가장 좋아 보이는 선택(locally optimal choice)을 하여 전역적으로 최적인 해(globally optimal solution)를 구하는 알고리즘 설계 기법이다"
tags: ['Greedy Algorithm', 'Optimization', 'Algorithm Design', 'Locally Optimal']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/greedy-algorithm
sidebar:
  order: 8
---

## 핵심 개념

그리디 알고리즘은 동적 프로그래밍과 마찬가지로 최적화 문제에 적용되지만, DP보다 더 단순하고 효율적인 경우가 많다. 모든 문제에 적용 가능한 것은 아니며, 두 가지 핵심 성질이 필요하다:

1. **그리디 선택 성질(Greedy-Choice Property)**: 지역적으로 최적인 선택이 전역적으로 최적인 해의 일부가 될 수 있다.
2. **최적 부분 구조(Optimal Substructure)**: 그리디 선택 후 남은 부분 문제의 최적 해와 그리디 선택을 결합하면 원래 문제의 최적 해가 된다.

**DP와의 핵심 차이**:
- DP: 부분 문제를 먼저 풀고, 그 결과에 기반하여 선택한다 (bottom-up).
- 그리디: 먼저 선택하고, 그 결과로 남는 부분 문제를 푼다 (top-down).
- DP: 각 단계에서 여러 부분 문제를 고려한다.
- 그리디: 그리디 선택 후 단 하나의 부분 문제만 남는다.

**그리디 알고리즘 설계 과정**:
1. 최적화 문제를 선택 후 하나의 부분 문제가 남는 형태로 변환한다.
2. 그리디 선택이 항상 안전함(safe)을 증명한다 -- 즉, 그리디 선택을 포함하는 최적 해가 반드시 존재한다.
3. 최적 부분 구조를 보인다 -- 그리디 선택과 부분 문제의 최적 해를 결합하면 원래 문제의 최적 해가 된다.

**주의**: 그리디 알고리즘이 항상 최적 해를 보장하지는 않는다. 예를 들어, 0-1 배낭 문제에서는 그리디가 실패하지만, 분수 배낭 문제에서는 성공한다.

## 예시

**0-1 배낭 vs 분수 배낭**:
- 물건: (10파운드, $60), (20파운드, $100), (30파운드, $120), 용량=50파운드
- 그리디 (단위 무게당 가치): 물건1($6/lb) 먼저 선택
- 0-1 배낭: 그리디로 물건1 선택 시 최적이 아님 (최적은 물건2+3=$220)
- 분수 배낭: 그리디가 최적 (물건1 전부 + 물건2 전부 + 물건3의 2/3)

**그리디가 작동하는 대표적 문제들**: 활동 선택, 허프만 코딩, 최소 신장 트리(Prim, Kruskal), 최단 경로(Dijkstra)

## 관련 개념

- [탐욕 선택 속성 (Greedy Choice Property)](/knowledge/algorithms/greedy-choice-property/)
- [활동 선택 (Activity Selection)](/knowledge/algorithms/activity-selection/)
- [허프만 코딩 (Huffman Coding)](/knowledge/algorithms/huffman-coding/)
- [동적 프로그래밍 (Dynamic Programming)](/knowledge/algorithms/dynamic-programming/)
- [최적 부분 구조 (Optimal Substructure)](/knowledge/algorithms/optimal-substructure/)
