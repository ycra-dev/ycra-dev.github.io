---
title: "활동 선택 (Activity Selection)"
description: "활동 선택 문제(Activity-Selection Problem)는 공유 자원을 사용하려는 n개의 활동 중에서 서로 호환되는(compatible) 활동의 최대 크기 부분 집합을 선택하는 문제이다"
tags: ['Activity Selection', 'Greedy Algorithm', 'Scheduling', 'Interval Scheduling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/activity-selection
sidebar:
  order: 10
---

## 핵심 개념

**DP 접근**: S_ij를 a_i 종료 후 시작하고 a_j 시작 전에 종료하는 활동들의 집합으로 정의하면, c[i,j] = c[i,k] + c[k,j] + 1의 점화식이 성립한다. 이 방법은 가능하지만, 그리디로 더 효율적으로 풀 수 있다.

**그리디 접근**: 종료 시간이 가장 빠른 활동을 선택한다. 이는 자원을 가능한 빨리 비워 다른 활동에 최대한 사용할 수 있게 하기 위함이다.

**정리 15.1 (그리디 선택의 안전성)**: 부분 문제 S_k에서 종료 시간이 가장 빠른 활동 a_m은 S_k의 최대 크기 호환 집합에 반드시 포함될 수 있다. (증명: 교환 논증 -- 최적 해의 첫 활동을 a_m으로 교체해도 호환성이 유지됨)

**핵심 특징**: 그리디 선택 후 단 하나의 부분 문제만 남는다 -- a_m 이후에 시작하는 활동들의 집합 S_m.

**실행 시간**: 활동이 종료 시간 순으로 정렬되어 있다면 Theta(n). 정렬이 필요하면 O(n lg n).

## 예시

```
// 11개 활동 (종료 시간 순 정렬):
// a1:[1,4) a2:[3,5) a3:[0,6) a4:[5,7) a5:[3,9) a6:[5,9)
// a7:[6,10) a8:[8,11) a9:[8,12) a10:[2,14) a11:[12,16)

// 최적 해: {a1, a4, a8, a11} (크기 4)

GREEDY-ACTIVITY-SELECTOR(s, f, n)
  A = {a1}                    // 첫 활동 선택 (가장 빨리 종료)
  k = 1
  for m = 2 to n
    if s[m] >= f[k]            // a_m이 S_k에 속하는가?
      A = A + {a_m}           // 선택
      k = m                   // 이후부터 계속
  return A

// 재귀 버전
RECURSIVE-ACTIVITY-SELECTOR(s, f, k, n)
  m = k + 1
  while m <= n and s[m] < f[k]  // S_k에서 가장 먼저 끝나는 활동 찾기
    m = m + 1
  if m <= n
    return {a_m} + RECURSIVE-ACTIVITY-SELECTOR(s, f, m, n)
  else return empty set
```

## 관련 개념

- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
- [탐욕 선택 속성 (Greedy Choice Property)](/knowledge/algorithms/greedy-choice-property/)
- [동적 프로그래밍 (Dynamic Programming)](/knowledge/algorithms/dynamic-programming/)
- [구간 트리 (Interval Tree)](/knowledge/algorithms/interval-tree/)
