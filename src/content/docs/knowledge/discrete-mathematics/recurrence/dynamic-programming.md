---
title: "Dynamic Programming"
description: "동적 프로그래밍(dynamic programming)은 문제를 겹치는(overlapping) 부분 문제들로 재귀적으로 분해하고, 각 부분 문제의 해를 저장(memoization)하여 중복 계산을 방지하면서 점화식을 통해 전체 최적해를 구하는 알고리즘 패러다임이다"
tags: ['Dynamic Programming', 'Algorithm', 'Optimization', 'Memoization', 'Recurrence Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/dynamic-programming
sidebar:
  order: 5
---

## 핵심 개념

동적 프로그래밍의 핵심 요소:
1. **최적 부분 구조(optimal substructure)**: 전체 문제의 최적해가 부분 문제의 최적해로부터 구성될 수 있다.
2. **겹치는 부분 문제(overlapping subproblems)**: 동일한 부분 문제가 여러 번 반복하여 나타난다.
3. **점화식**: 부분 문제의 해를 결합하여 전체 해를 구하는 관계식이 존재한다.
4. **메모이제이션(memoization)**: 계산된 값을 저장하여 재계산을 방지한다.

분할 정복과의 핵심 차이점은 부분 문제의 겹침 여부이다. 분할 정복에서는 부분 문제가 서로 독립적이지만, 동적 프로그래밍에서는 부분 문제가 서로 겹친다. 메모이제이션을 사용하지 않으면 지수적 시간 복잡도를 가질 수 있는 문제를 다항 시간으로 해결할 수 있다.

Richard Bellman이 1950년대에 이 이름을 만들었는데, 군사 연구 자금을 확보하기 위해 수학이라는 단어를 피하고 "dynamic"이라는 긍정적인 단어를 선택한 것으로 알려져 있다.

## 예시

**강연 스케줄링 문제**: n개의 강연 중 총 참석자 수를 최대화하는 스케줄 선택

점화식: T(j) = max(w_j + T(p(j)), T(j-1))
- w_j: j번째 강연의 참석자 수
- p(j): j번째 강연과 양립 가능한 가장 늦게 끝나는 강연의 번호
- T(j): 처음 j개 강연에서의 최적 참석자 수

```
procedure Maximum_Attendees(s, e, w: 강연 시작/종료/참석자 정보)
  강연을 종료 시간 순으로 정렬
  for j := 1 to n
    p(j) 계산 (j와 양립 가능한 가장 늦은 강연)
  T(0) := 0
  for j := 1 to n
    T(j) := max(w_j + T(p(j)), T(j-1))  // 핵심 점화식
  return T(n)
```

두 가지 선택:
- j번째 강연을 포함: 수익 w_j + T(p(j))
- j번째 강연을 제외: 수익 T(j-1)

메모이제이션으로 T(j)를 한 번만 계산하여 효율적으로 해결한다.

## 관련 개념

- [Algorithm](/knowledge/mathematics/algorithm/) - 상위 개념
- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 동적 프로그래밍의 핵심 도구
- [Divide-and-Conquer Algorithm](/knowledge/mathematics/divide-and-conquer-algorithm/) - 부분 문제가 겹치지 않는 대안적 패러다임
- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 동적 프로그래밍은 재귀적 구조를 기반으로 함
