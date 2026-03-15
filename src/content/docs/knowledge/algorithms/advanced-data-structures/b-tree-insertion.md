---
title: "B-트리 삽입 (B-Tree Insertion)"
description: "B-트리 삽입(B-Tree Insertion)은 새 키를 B-트리에 삽입하되, 가득 찬(full) 노드를 미리 분할(split)하여 루트에서 리프까지 단일 하향 경로(single downward pass)만으로 삽입을 완료하는 연산이다"
tags: ['B Tree Insertion', 'B Tree', 'Node Splitting', 'Preemptive Split', 'Single Pass']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/b-tree-insertion
sidebar:
  order: 6
---

## 핵심 개념

**기본 아이디어**: 새 키는 항상 리프 노드에 삽입된다. 그러나 리프가 가득 차 있을 수 있으므로, 가득 찬 노드를 분할하는 메커니즘이 필요하다.

**노드 분할 (B-TREE-SPLIT-CHILD)**:
- 가득 찬 자식 노드 y (2t-1개 키)를 중앙값(median key) y.key_t를 기준으로 분할
- 왼쪽 절반 (t-1개 키)은 y에 남기고, 오른쪽 절반 (t-1개 키)은 새 노드 z에 배치
- 중앙값은 부모 노드 x로 올려 보내어 y와 z를 분리하는 역할을 함
- CPU 시간: Theta(t), 디스크 연산: O(1)

**선제적 분할 전략**: 역추적(backtracking)을 피하기 위해, 트리를 내려가면서 만나는 모든 가득 찬 노드를 미리 분할한다.
- 분할이 필요할 때 부모가 가득 차 있지 않음이 보장됨
- 단일 하향 경로로 삽입 완료

**루트 분할**: 루트가 가득 차면 새 빈 루트를 만들고 기존 루트를 그 자식으로 설정한 뒤 분할한다. 이것이 B-트리의 높이가 증가하는 유일한 방법이다. B-트리는 위에서 자란다 (이진 탐색 트리는 아래에서 자람).

**성능**: 높이 h인 B-트리에서 O(h) = O(log_t n) 디스크 접근, O(th) = O(t log_t n) CPU 시간.

## 예시

```
B-TREE-INSERT(T, k)
  r = T.root
  if r.n == 2t - 1              // 루트가 가득 차면
    s = B-TREE-SPLIT-ROOT(T)    // 루트 분할 (높이 증가)
    B-TREE-INSERT-NONFULL(s, k)
  else B-TREE-INSERT-NONFULL(r, k)

B-TREE-INSERT-NONFULL(x, k)
  i = x.n
  if x.leaf                      // 리프에 삽입
    while i >= 1 and k < x.key_i
      x.key_{i+1} = x.key_i     // 키 오른쪽으로 이동
      i = i - 1
    x.key_{i+1} = k
    x.n = x.n + 1
    DISK-WRITE(x)
  else                           // 내부 노드
    while i >= 1 and k < x.key_i  // 적절한 자식 찾기
      i = i - 1
    i = i + 1
    DISK-READ(x.c_i)
    if x.c_i.n == 2t - 1        // 자식이 가득 차면 미리 분할
      B-TREE-SPLIT-CHILD(x, i)
      if k > x.key_i
        i = i + 1
    B-TREE-INSERT-NONFULL(x.c_i, k)

// 예 (t=3): [G,M,P,X] 루트에 B 삽입
// c1 = [A,C,D,E,F] (5개 키 = 2t-1, 가득 참)
// -> c1을 분할: [A,C]와 [E,F]로, D가 루트로 올라감
// -> 루트: [D,G,M,P,X], 왼쪽 자식 [A,C]
// -> [A,C]에 B 삽입: [A,B,C]
```

## 관련 개념

- [B-트리 (B-Tree)](/knowledge/algorithms/b-tree/)
- [B-트리 탐색 (B-Tree Search)](/knowledge/algorithms/b-tree-search/)
- [레드-블랙 트리 (Red-Black Tree)](/knowledge/algorithms/red-black-tree/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
