---
title: "B-Tree Search"
description: "B-트리 탐색(B-Tree Search)은 이진 탐색 트리의 탐색을 다방향(multiway) 분기 결정으로 일반화한 것이다"
tags: ['B Tree Search', 'B Tree', 'Disk Access', 'Multiway Branching', 'Search']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/b-tree-search
sidebar:
  order: 5
---

## 핵심 개념

**동작 원리**:
1. 현재 노드 x에서 키 k를 찾는다.
2. x.key1, x.key2, ..., x.key_{x.n} 중에서 k 이상인 가장 작은 인덱스 i를 찾는다 (선형 탐색 또는 이진 탐색).
3. x.key_i = k이면 (x, i)를 반환한다.
4. x가 리프이면 NIL을 반환한다 (탐색 실패).
5. 아니면 DISK-READ(x.c_i)를 수행하고, x.c_i에서 재귀적으로 탐색한다.

**성능 분석**:
- **디스크 접근**: O(h) = O(log_t n) (루트에서 리프까지의 경로 길이)
- **CPU 시간**: 각 노드에서 선형 탐색 O(t) -> 총 O(th) = O(t * log_t n)
  - 이진 탐색 사용 시: 각 노드에서 O(lg t) -> 총 O(lg t * log_t n) = O(lg n)

**규약**:
- 루트는 항상 메인 메모리에 있으므로 DISK-READ 불필요
- 자식 노드에 접근 전에 DISK-READ 수행
- 변경된 노드는 DISK-WRITE로 디스크에 저장

## 예시

```
B-TREE-SEARCH(x, k)
  i = 1
  while i <= x.n and k > x.key_i      // k 이상인 키 위치 찾기
    i = i + 1
  if i <= x.n and k == x.key_i        // 키를 찾았으면
    return (x, i)
  elseif x.leaf                         // 리프에 도달했으면 실패
    return NIL
  else DISK-READ(x.c_i)               // 적절한 자식으로 이동
    return B-TREE-SEARCH(x.c_i, k)

// 예: B-트리에서 키 R 탐색
//            [G, M, P, X]
//           /  |   |   |  \
//   [A,C,D,F] [J,K] [N,O] [R,S,T,U,V] [Y,Z]
//
// 루트 4개 키 -> 5개 자식 (c_1 ~ c_5)
// 1. 루트에서 G < R, M < R, P < R, R <= X -> c_4로 이동 (P < keys < X)
// 2. 노드 [R,S,T,U,V]에서 R 발견! -> 반환

// 디스크 접근: 1번 (루트는 메모리에 있으므로 제외)
// CPU 시간: O(t) per node
```

## 관련 개념

- [B-Tree](/knowledge/algorithms/b-tree/)
- [B-Tree Insertion](/knowledge/algorithms/b-tree-insertion/)
- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
