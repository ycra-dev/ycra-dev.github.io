---
title: "Optimal Substructure"
description: "최적 부분 구조(Optimal Substructure)란 어떤 문제의 최적 해가 그 부분 문제들의 최적 해를 포함하고 있는 성질을 말한다"
tags: ['Optimal Substructure', 'Dynamic Programming', 'Greedy Algorithm', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/optimal-substructure
sidebar:
  order: 2
---

## 핵심 개념

최적 부분 구조를 발견하는 일반적인 패턴은 다음과 같다:

1. 문제의 해가 어떤 선택(choice)을 포함함을 보인다 (예: 막대 자르기에서 첫 번째 자르는 위치, 행렬 곱셈에서 분할 인덱스).
2. 주어진 문제에 대해 최적 해를 이끄는 선택이 주어졌다고 가정한다.
3. 이 선택에 의해 어떤 부분 문제가 발생하는지, 부분 문제의 공간을 어떻게 특성화할지 결정한다.
4. "잘라 붙이기(cut-and-paste)" 기법으로 최적 해 내의 부분 문제 해가 반드시 최적이어야 함을 증명한다.

최적 부분 구조는 두 가지 측면에서 문제마다 다르다:
- 원래 문제의 최적 해가 사용하는 **부분 문제의 수**
- 최적 부분 문제를 결정하기 위해 고려해야 하는 **선택의 수**

**주의 사항**: 모든 최적화 문제가 최적 부분 구조를 갖는 것은 아니다. 예를 들어, 가중치 없는 최단 경로(unweighted shortest path)는 최적 부분 구조를 갖지만, 가중치 없는 최장 단순 경로(unweighted longest simple path)는 갖지 않는다. 최장 단순 경로에서는 부분 문제가 **독립적(independent)** 이지 않기 때문이다 -- 한 부분 문제의 해에서 사용된 자원(정점)이 다른 부분 문제에서 사용할 수 없게 되어 간섭이 발생한다.

## 예시

**막대 자르기(Rod Cutting)**: 길이 n인 막대의 최적 분할은 첫 조각 i와 나머지 n-i의 최적 분할을 포함한다.
- r_n = max{p_i + r_{n-i}} (1 <= i <= n)
- 부분 문제 1개, 선택지 n개 -> O(n^2)

**행렬 체인 곱셈(Matrix-Chain Multiplication)**: A_i..A_j를 A_k에서 분할하면, A_i..A_k와 A_{k+1}..A_j 모두 최적으로 괄호를 묶어야 한다.
- 부분 문제 2개, 선택지 j-i개 -> O(n^3)

**최장 공통 부분 수열(LCS)**: X_m = Y_n이면 LCS는 X_{m-1}과 Y_{n-1}의 LCS를 포함한다.

## 관련 개념

- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Greedy Algorithm](/knowledge/algorithms/greedy-algorithm/)
- [Greedy Choice Property](/knowledge/algorithms/greedy-choice-property/)
- [Rod Cutting](/knowledge/algorithms/rod-cutting/)
- [Matrix Chain Multiplication](/knowledge/algorithms/matrix-chain-multiplication/)
- [Longest Common Subsequence](/knowledge/algorithms/longest-common-subsequence/)
