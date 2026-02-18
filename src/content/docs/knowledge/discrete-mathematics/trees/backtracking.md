---
title: "Backtracking"
description: "백트래킹(backtracking)은 가능한 모든 해를 체계적으로 탐색하는 기법으로, 결정 트리의 경로를 따라 해를 구성하다가 더 이상 유효한 해가 나올 수 없다고 판단되면 이전 결정 지점으로 되돌아가 다른 선택을 시도하는 깊이 우선 탐색 기반의 알고리즘이다"
tags: ['Backtracking', 'Depth First Search', 'Constraint Satisfaction', 'N Queens', 'Graph Coloring', 'Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/backtracking
sidebar:
  order: 10
---

## 핵심 개념

**기본 원리**:
1. 결정 트리의 루트에서 출발
2. 각 단계에서 가능한 선택지 중 하나를 선택하여 경로를 확장
3. 현재 상태에서 해가 불가능하다고 판단되면 (가지치기/pruning)
4. 마지막 결정 지점으로 되돌아가(backtrack) 다른 선택을 시도
5. 해를 찾거나 모든 가능성이 소진될 때까지 반복

**완전 탐색(exhaustive search)**이 필요한 문제들에 효과적이며, 가지치기를 통해 탐색 공간을 줄일 수 있다.

**대표적 응용**:

**1. 그래프 색칠(Graph Coloring)**:
- 첫 정점부터 순서대로 가능한 최소 번호의 색을 배정
- 어떤 정점에 n가지 색 모두 불가능하면 이전 정점으로 되돌아가 다른 색 시도

**2. n-퀸 문제(n-Queens Problem)**:
- n x n 체스판에 n개의 퀸을 서로 공격 불가능한 위치에 배치
- 열별로 퀸을 배치하면서, 같은 행/대각선 충돌 시 백트래킹

**3. 부분집합 합(Subset Sum)**:
- 주어진 정수 집합에서 합이 M인 부분집합 찾기
- 원소를 순서대로 포함/제외하면서, 합이 M을 초과하면 백트래킹

**한계**: 최악의 경우 지수적 시간 복잡도를 가질 수 있으나, 실제로는 가지치기로 인해 상당한 탐색 공간이 제거된다.

## 예시

```
4-퀸 문제 백트래킹:

Step 1: 1열 1행에 퀸 배치
  Q . . .
  . . . .
  . . . .
  . . . .

Step 2: 2열 3행에 퀸 배치
  Q . . .
  . . . .
  . Q . .
  . . . .

Step 3: 3열에 배치 불가 → 백트래킹!
Step 4: 2열 4행에 퀸 재배치
  Q . . .
  . . . .
  . . . .
  . Q . .

Step 5: 3열 2행에 퀸 배치
  Q . . .
  . . Q .
  . . . .
  . Q . .

Step 6: 4열에 배치 불가 → 1열부터 재시작
Step 7: 1열 2행에 퀸 배치 → 최종 해:
  . . Q .
  Q . . .
  . . . Q
  . Q . .

부분집합 합 문제:
집합: {31, 27, 15, 11, 7, 5}, 목표 합: 39

탐색 경로:
{31} → {31,7} = 38 → {31,5} = 36 → 백트래킹
{27} → {27,11} = 38 → {27,7} = 34 → {27,7,5} = 39 ✓
```

## 관련 개념

- [Depth-First Search](/knowledge/mathematics/depth-first-search/) - 백트래킹의 기반이 되는 탐색 방법
- [Hamilton Path](/knowledge/mathematics/hamilton-path-and-circuit/) - 백트래킹으로 탐색 가능한 경로 문제
- [Algorithm](/knowledge/algorithms/algorithm/) - 백트래킹 알고리즘의 일반적 구조
- [Decision Tree](/knowledge/mathematics/decision-tree/) - 백트래킹의 탐색 공간을 표현하는 트리
