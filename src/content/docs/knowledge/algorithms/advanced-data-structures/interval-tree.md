---
title: "Interval Tree"
description: "구간 트리(Interval Tree)는 레드-블랙 트리를 확장하여 구간(interval)들의 동적 집합을 유지하고, 주어진 질의 구간과 겹치는(overlap) 구간을 O(lg n) 시간에 찾을 수 있도록 한 자료 구조이다"
tags: ['Interval Tree', 'Augmenting Data Structure', 'Red Black Tree', 'Interval Overlap', 'Scheduling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/interval-tree
sidebar:
  order: 3
---

## 핵심 개념

**확장 4단계**에 따라 설계된다:

**1단계 - 기본 구조**: 레드-블랙 트리. 각 노드 x는 구간 x.int = [x.int.low, x.int.high]를 저장하며, 키는 구간의 하한(low endpoint) x.int.low.

**2단계 - 추가 정보**: 각 노드 x에 x.max 저장. x.max는 x를 루트로 하는 서브트리에 포함된 모든 구간 끝점(endpoint) 중 최댓값.

**3단계 - 정보 유지**: x.max = max{x.int.high, x.left.max, x.right.max}로 O(1)에 계산 가능. 정리 17.1에 의해 삽입/삭제가 O(lg n)에 유지된다.

**4단계 - 새 연산**: INTERVAL-SEARCH(T, i): 구간 i와 겹치는 노드를 찾는다.

**구간 겹침 조건**: i.low <= i'.high AND i'.low <= i.high

**구간 삼분 법칙(Interval Trichotomy)**: 임의의 두 구간 i, i'에 대해 정확히 하나만 성립: (a) 겹침, (b) i가 i' 왼쪽, (c) i가 i' 오른쪽.

**INTERVAL-SEARCH 정당성 (정리 17.2)**:
- 오른쪽으로 갈 때: x.left가 없거나 x.left.max < i.low이므로, 왼쪽 서브트리에 겹치는 구간이 없음.
- 왼쪽으로 갈 때: 왼쪽 서브트리에 겹치는 구간이 있거나, 없더라도 오른쪽에도 없으므로 안전함. (왼쪽에 i'.high = x.left.max >= i.low인 구간 i'가 존재하고, 이것이 겹치지 않으면 i.high < i'.low <= 오른쪽 모든 구간의 low이므로)

## 예시

```
INTERVAL-SEARCH(T, i)
  x = T.root
  while x != T.nil and i does not overlap x.int
    if x.left != T.nil and x.left.max >= i.low
      x = x.left        // 왼쪽 서브트리에 겹침 가능성
    else
      x = x.right       // 왼쪽에 겹침 없음
  return x               // 겹치는 노드 또는 T.nil

// 예: i = [22, 25] 검색
// 루트 [16, 21]: 겹치지 않음, left.max=23 >= 22 -> 왼쪽
// [8, 9]: 겹치지 않음, left.max=10 < 22 -> 오른쪽
// [15, 23]: 겹침! (15 <= 25 and 22 <= 23) -> 반환

// 실행 시간: O(lg n) - 레드-블랙 트리 높이에 비례
```

**지원 연산**:
- INTERVAL-INSERT(T, x): O(lg n)
- INTERVAL-DELETE(T, x): O(lg n)
- INTERVAL-SEARCH(T, i): O(lg n)

## 관련 개념

- [Augmenting Data Structure](/knowledge/algorithms/augmenting-data-structure/)
- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [Order-Statistics Tree](/knowledge/algorithms/order-statistics-tree/)
- [Activity Selection](/knowledge/algorithms/activity-selection/)
