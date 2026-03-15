---
title: "B-트리 (B-Tree)"
description: "B-트리(B-Tree)는 디스크 또는 기타 직접 접근 보조 기억 장치에서 효율적으로 작동하도록 설계된 균형 탐색 트리이다"
tags: ['B Tree', 'Balanced Search Tree', 'Disk Access', 'Database', 'Secondary Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/b-tree
sidebar:
  order: 4
---

## 핵심 개념

**B-트리의 정의** (최소 차수 t >= 2):
1. 각 노드 x는 x.n개의 키를 오름차순으로 저장하고, x.leaf 속성으로 리프 여부를 표시한다.
2. 내부 노드 x는 x.n + 1개의 자식 포인터를 가진다.
3. 키는 서브트리의 키 범위를 분리한다: k1 <= x.key1 <= k2 <= x.key2 <= ... <= x.key_{x.n} <= k_{x.n+1}.
4. **모든 리프는 같은 깊이**에 있다.
5. 루트를 제외한 모든 노드는 최소 t-1개, 최대 2t-1개의 키를 가진다. 따라서 내부 노드는 최소 t개, 최대 2t개의 자식을 가진다.

**높이 제한 (정리 18.1)**: h <= log_t((n+1)/2). n >= 1인 B-트리의 높이는 O(log_t n).
- 레드-블랙 트리 대비 약 lg t 배 더 낮은 높이
- t = 1001이면, 높이 2인 B-트리에 10억 개 이상의 키 저장 가능 (루트가 메모리에 있으면 2번의 디스크 접근으로 탐색)

**디스크 접근 최적화**: B-트리 노드는 보통 디스크 블록 크기에 맞추어 설계된다. 블록 크기가 크면 하나의 디스크 접근으로 많은 키를 읽을 수 있어, 접근 횟수가 줄어든다.

**변형**:
- **B+-트리**: 모든 위성 데이터를 리프에만 저장하고, 내부 노드에는 키와 자식 포인터만 저장하여 분기 인수를 최대화.
- **B*-트리**: 내부 노드가 최소 2/3 이상 차도록 요구.
- **2-3-4 트리**: t = 2인 B-트리의 특수 경우.

## 예시

```
// t = 2인 B-트리 (2-3-4 트리): 각 노드는 1~3개 키, 2~4개 자식
// t = 1001인 B-트리: 높이 2에서 10억 개 이상의 키
// 각 내부 노드: 1000~2000개 키, 1001~2001개 자식

// B-트리의 성질 (t=3 예시):
//        [H, N]                     (루트: 2개 키, 3개 자식)
//       /   |   \
//  [B,D] [J,K,L] [Q,R,S,V]         (리프: 2~4개 키)
//
// 모든 리프가 같은 깊이 (높이 1)
// 루트를 제외한 모든 노드: 최소 t-1=2개, 최대 2t-1=5개 키
```

## 관련 개념

- [B-트리 탐색 (B-Tree Search)](/knowledge/algorithms/b-tree-search/)
- [B-트리 삽입 (B-Tree Insertion)](/knowledge/algorithms/b-tree-insertion/)
- [레드-블랙 트리 (Red-Black Tree)](/knowledge/algorithms/red-black-tree/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
