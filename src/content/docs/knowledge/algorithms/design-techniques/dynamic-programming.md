---
title: "동적 프로그래밍 (Dynamic Programming)"
description: "동적 프로그래밍(Dynamic Programming)은 겹치는 부분 문제(overlapping subproblems)를 가진 최적화 문제를 부분 문제의 해를 테이블에 저장하여 재계산을 피하면서 해결하는 알고리즘 설계 기법이다"
tags: ['Dynamic Programming', 'Optimization', 'Algorithm Design', 'Tabulation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/dynamic-programming
sidebar:
  order: 1
---

## 핵심 개념

동적 프로그래밍은 분할 정복(Divide and Conquer)과 유사하게 문제를 부분 문제로 나누어 해결하지만, 부분 문제가 중복될 때 특히 효과적이다. 분할 정복은 독립적인 부분 문제를 생성하는 반면, 동적 프로그래밍은 동일한 부분 문제가 반복적으로 나타나는 경우에 적용된다.

DP 알고리즘 개발의 4단계:
1. 최적 해의 구조를 특성화한다 (최적 부분 구조 확인).
2. 최적 해의 값을 재귀적으로 정의한다.
3. 최적 해의 값을 보통 상향식(bottom-up)으로 계산한다.
4. 계산된 정보로부터 최적 해를 구성한다.

두 가지 핵심 요소:
- **최적 부분 구조(Optimal Substructure)**: 최적 해가 부분 문제의 최적 해를 포함하는 성질
- **겹치는 부분 문제(Overlapping Subproblems)**: 재귀적 알고리즘이 동일한 부분 문제를 반복적으로 풀게 되는 성질

구현 방식은 두 가지이다:
- **Top-down with Memoization**: 재귀적으로 풀되, 한번 풀었던 부분 문제의 해를 저장
- **Bottom-up Method**: 크기가 작은 부분 문제부터 순서대로 해결

실행 시간은 일반적으로 (부분 문제의 수) x (각 부분 문제당 선택의 수)에 비례한다. 부분 문제 그래프(subproblem graph)의 정점과 간선 수로도 분석 가능하다.

## 예시

**막대 자르기 문제(Rod Cutting)**: 길이 n인 막대를 잘라서 최대 수익을 얻는 문제.

```
// Bottom-up 방식
BOTTOM-UP-CUT-ROD(p, n)
  let r[0:n] be a new array
  r[0] = 0
  for j = 1 to n
    q = -infinity
    for i = 1 to j
      q = max{q, p[i] + r[j-i]}
    r[j] = q
  return r[n]
```

나이브 재귀는 T(n) = 2^n 이지만, DP를 적용하면 Theta(n^2)으로 줄어든다. 이는 n개의 부분 문제가 있고, 각 부분 문제에서 최대 n개의 선택을 고려하기 때문이다.

## 관련 개념

- [최적 부분 구조 (Optimal Substructure)](/knowledge/algorithms/optimal-substructure/)
- [중복 부분 문제 (Overlapping Subproblems)](/knowledge/algorithms/overlapping-subproblems/)
- [메모이제이션 (Memoization)](/knowledge/algorithms/memoization/)
- [막대 자르기 (Rod Cutting)](/knowledge/algorithms/rod-cutting/)
- [행렬 연쇄 곱셈 (Matrix Chain Multiplication)](/knowledge/algorithms/matrix-chain-multiplication/)
- [최장 공통 부분 수열 (Longest Common Subsequence)](/knowledge/algorithms/longest-common-subsequence/)
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/)
- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
