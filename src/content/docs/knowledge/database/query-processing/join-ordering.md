---
title: "Join Ordering"
description: "조인 순서(Join Ordering)는 다중 릴레이션 조인에서 릴레이션들을 조인하는 순서를 결정하는 최적화 과정으로, 조인 순서에 따라 쿼리 실행 비용이 크게 달라질 수 있어 쿼리 최적화의 핵심 문제이다"
tags: ['Join Ordering', 'Dynamic Programming', 'Left Deep Join', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/join-ordering
sidebar:
  order: 13
---

## 핵심 개념

n개의 릴레이션을 조인할 때, 가능한 조인 순서의 수는 `(2(n-1))! / (n-1)!`로 n이 커지면 기하급수적으로 증가한다. 따라서 모든 가능한 순서를 열거하는 것은 비현실적이며, 효율적인 알고리즘이 필요하다.

**동적 프로그래밍 알고리즘:**
릴레이션 부분집합 S에 대한 최적 조인 계획을 메모이제이션하는 방식이다. S를 두 개의 비어있지 않은 부분집합 S1과 S2 = S - S1로 분할하는 모든 방법을 고려하고, FindBestPlan(S1)과 FindBestPlan(S2)를 결합하는 최적 방법을 찾는다. 전체 시간 복잡도는 O(3^n)이다.

**Left-Deep 조인 순서:**
System R 옵티마이저에서 제안된 방식으로, 조인 트리의 오른쪽 피연산자가 항상 기본 릴레이션이 되도록 제한한다. 이 제약으로 탐색 공간을 O(n * 2^n)으로 줄일 수 있다. Left-deep 조인은 파이프라인 평가에 특히 적합한데, 오른쪽 입력이 저장된 릴레이션이므로 각 조인에 하나의 입력만 파이프라인 처리하면 되기 때문이다.

**카르테시안 곱 회피:**
옵티마이저는 일반적으로 조인 조건이 없는 릴레이션 쌍의 카르테시안 곱을 포함하는 조인 순서를 배제한다. 이렇게 하면 탐색 공간이 크게 줄어든다.

**Interesting Sort Order:**
비용이 최소인 계획만 유지하는 것이 아니라, 특정 정렬 순서를 생성하는 약간 더 비싼 계획도 유지한다. 이 정렬 순서가 후속 조인이나 ORDER BY에서 유용할 수 있기 때문이다. 예를 들어, 병합 조인으로 조인을 수행하면 결과가 조인 키로 정렬되어 나오므로, 이후 다른 조인에서 추가 정렬 없이 병합 조인을 사용할 수 있다.

## 예시

r1 ⋈ r2 ⋈ r3 ⋈ r4 네 개의 릴레이션 조인에서 left-deep 순서의 예:

```
Left-deep 조인 트리:
        ⋈
       / \
      ⋈   r4
     / \
    ⋈   r3
   / \
  r1  r2

동적 프로그래밍으로 최적 순서 탐색:
  1단계: {r1}, {r2}, {r3}, {r4} 각각의 최적 접근 방법 결정
  2단계: {r1,r2}, {r1,r3}, ..., {r3,r4} 2-릴레이션 조인의 최적 방법 결정
  3단계: {r1,r2,r3}, ..., {r2,r3,r4} 3-릴레이션 조인의 최적 방법 결정
  4단계: {r1,r2,r3,r4} 전체 조인의 최적 방법 결정
```

n=4일 때:
- 전체 조인 순서 수: (2*3)! / 3! = 720 / 6 = 120
- Left-deep 순서 수: 4! = 24
- 동적 프로그래밍(전체): O(3^4) = 81 부분문제
- 동적 프로그래밍(left-deep): O(4 * 2^4) = 64 부분문제

## 관련 개념

- [Query Optimization](/knowledge/database/query-optimization/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
- [Heuristic Optimization](/knowledge/database/heuristic-optimization/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
- [Merge Join](/knowledge/database/merge-join/)
