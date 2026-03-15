---
title: "순서 통계 트리 (Order-Statistics Tree)"
description: "순서 통계 트리(Order-Statistics Tree)는 레드-블랙 트리에 각 노드 x에 대해 x를 루트로 하는 서브트리의 내부 노드 수인 x"
tags: ['Order Statistics Tree', 'Augmenting Data Structure', 'Red Black Tree', 'Rank', 'Selection']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/order-statistics-tree
sidebar:
  order: 2
---

## 핵심 개념

**저장 정보**: 각 노드 x에 x.size = x.left.size + x.right.size + 1 저장. 센티넬의 size는 0.

**두 가지 핵심 연산**:

1. **OS-SELECT(x, i)**: x를 루트로 하는 서브트리에서 i번째로 작은 원소를 찾는다.
   - r = x.left.size + 1 (x의 서브트리 내 순위)
   - i = r이면 x 반환
   - i < r이면 왼쪽 서브트리에서 재귀
   - i > r이면 오른쪽 서브트리에서 (i-r)번째 원소를 재귀적으로 찾음

2. **OS-RANK(T, x)**: 트리 T에서 x의 순위(중위 순회에서의 위치)를 반환한다.
   - r = x.left.size + 1로 시작
   - 루트까지 올라가면서, 오른쪽 자식인 경우 부모의 왼쪽 서브트리 크기 + 1을 더함
   - 실행 시간: O(lg n)

**size 속성 유지**:
- **삽입 1단계**: 루트에서 리프까지 내려가며 경로상 노드의 size를 1씩 증가
- **삽입 2단계 (회전)**: 회전 시 O(1)에 size 갱신 가능 (y.size = x.size; x.size = x.left.size + x.right.size + 1)
- **삭제**: 유사하게 O(lg n)에 유지

삽입과 삭제 모두 O(lg n) 시간 유지.

## 예시

```
OS-SELECT(x, i)
  r = x.left.size + 1         // x의 서브트리 내 순위
  if i == r
    return x
  elseif i < r
    return OS-SELECT(x.left, i)
  else return OS-SELECT(x.right, i - r)

OS-RANK(T, x)
  r = x.left.size + 1
  y = x
  while y != T.root
    if y == y.p.right          // 오른쪽 자식이면
      r = r + y.p.left.size + 1   // 부모와 왼쪽 서브트리 추가
    y = y.p
  return r

// 예: 키 26을 루트로 하는 트리에서 17번째 원소 찾기
// 루트 순위 = 13 (왼쪽 서브트리 크기 12 + 1)
// 17 > 13 -> 오른쪽 서브트리에서 4번째 원소 찾기
// 41의 순위 = 6 -> 왼쪽 서브트리에서 4번째
// 30의 순위 = 2 -> 오른쪽 서브트리에서 2번째
// 38의 순위 = 2 -> 38 반환!
```

## 관련 개념

- [보강 자료구조 (Augmenting Data Structure)](/knowledge/algorithms/augmenting-data-structure/)
- [레드-블랙 트리 (Red-Black Tree)](/knowledge/algorithms/red-black-tree/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [구간 트리 (Interval Tree)](/knowledge/algorithms/interval-tree/)
