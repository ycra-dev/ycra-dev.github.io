---
title: "중복 부분 문제 (Overlapping Subproblems)"
description: "겹치는 부분 문제(Overlapping Subproblems)란 재귀적 알고리즘이 항상 새로운 부분 문제를 생성하는 대신, 동일한 부분 문제를 반복적으로 풀게 되는 성질이다"
tags: ['Overlapping Subproblems', 'Dynamic Programming', 'Recursion', 'Subproblem Graph']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/overlapping-subproblems
sidebar:
  order: 3
---

## 핵심 개념

최적화 문제에 동적 프로그래밍을 적용하려면 부분 문제의 공간이 "작아야" 한다. 즉, 서로 다른 부분 문제의 총 수가 입력 크기의 다항식이어야 하며, 재귀적 알고리즘이 동일한 부분 문제를 반복적으로 만나는 구조여야 한다.

이와 대조적으로, 분할 정복(Divide and Conquer)은 재귀의 각 단계에서 항상 새로운 부분 문제를 생성한다. 예를 들어 병합 정렬(Merge Sort)에서는 동일한 부분 배열을 다시 정렬하는 경우가 없다.

**부분 문제 그래프(Subproblem Graph)**: 부분 문제와 그 의존 관계를 나타내는 방향 그래프이다. 각 정점은 서로 다른 부분 문제에 대응하며, 재귀 트리(recursion tree)의 "축소" 버전으로 볼 수 있다 -- 동일 부분 문제에 대응하는 모든 노드가 하나의 정점으로 합쳐진다.

- Bottom-up DP는 부분 문제 그래프의 "역 위상 정렬(reverse topological sort)" 순서로 부분 문제를 해결한다.
- Top-down 메모이제이션은 부분 문제 그래프의 "깊이 우선 탐색(DFS)"으로 볼 수 있다.
- 실행 시간은 부분 문제 그래프의 정점 수와 간선 수에 비례하는 경우가 많다.

**핵심 차이**: 재귀 트리의 노드 수는 지수적일 수 있지만, 서로 다른 부분 문제의 수(부분 문제 그래프의 정점 수)는 다항식이다. DP는 이 차이를 활용한다.

## 예시

**막대 자르기**: 재귀 트리는 2^n개의 노드를 갖지만, 서로 다른 부분 문제는 n+1개(크기 0, 1, ..., n)뿐이다.

**행렬 체인 곱셈**: 나이브 재귀(RECURSIVE-MATRIX-CHAIN)는 Omega(2^n) 시간이 걸리지만, 서로 다른 부분 문제는 Theta(n^2)개에 불과하다.

```
// 재귀 트리에서 m[3,4]는 4번 참조됨: m[2,4], m[1,4], m[3,5], m[3,6] 계산 시
// DP는 m[3,4]를 한 번만 계산하고 테이블에 저장
```

**LCS**: X = <x1,...,xm>과 Y = <y1,...,yn>의 LCS에서 서로 다른 부분 문제는 Theta(mn)개이다.

## 관련 개념

- [동적 프로그래밍 (Dynamic Programming)](/knowledge/algorithms/dynamic-programming/)
- [최적 부분 구조 (Optimal Substructure)](/knowledge/algorithms/optimal-substructure/)
- [메모이제이션 (Memoization)](/knowledge/algorithms/memoization/)
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/)
