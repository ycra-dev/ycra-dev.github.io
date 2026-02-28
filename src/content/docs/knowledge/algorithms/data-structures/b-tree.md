---
title: "B-Tree"
description: "B-트리(B-Tree)는 외부 저장장치(디스크)에서의 탐색에 최적화된 균형 다원 탐색 트리로, 각 노드가 여러 개의 키와 자식 포인터를 가지며 모든 리프 노드가 동일한 깊이에 위치한다"
tags: ["B-Tree", "External Searching", "Balanced Tree", "Multiway Tree", "Database", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/b-tree
sidebar:
  order: 33
---

## 핵심 개념

B-트리(B-Tree)는 외부 저장장치(디스크)에서의 탐색에 최적화된 균형 다원 탐색 트리로, 각 노드가 여러 개의 키와 자식 포인터를 가지며 모든 리프 노드가 동일한 깊이에 위치한다. 1972년 Bayer와 McCreight가 고안했다.

**B-트리 차수 m의 정의:**
- 루트를 제외한 모든 내부 노드는 ⌈m/2⌉~m개의 자식을 가짐
- 루트는 2~m개의 자식을 가짐 (빈 트리 제외)
- 모든 리프 노드는 동일한 레벨에 위치
- 내부 노드는 t개의 자식을 가지면 t-1개의 키를 가짐

**핵심 속성:**
1. 항상 균형 유지 (모든 리프가 같은 레벨)
2. 노드 하나 = 디스크 블록 하나 → I/O 최소화
3. 삽입/삭제 후에도 자동으로 균형 유지

## 동작 원리

**탐색:**
루트에서 시작하여 각 노드 내에서 이진 탐색으로 다음 자식 결정. 레벨 l번 접근으로 탐색 완료.

**삽입:**
1. 적절한 리프 노드에 키 삽입
2. 노드가 m개의 키를 가지면 분할(split):
   - 노드를 두 개로 분리
   - 중간 키 ⌈m/2⌉번째를 부모로 올림
   - 루트가 분할되면 트리 높이 증가 (위로 성장)
3. 삭제는 삽입의 역방향 (합병 또는 재분배)

**디스크 접근 횟수 상한:**
N개의 키가 있을 때 리프 레벨 l은:
l ≤ log_{⌈m/2⌉}((N+1)/2)

예: N=1,999,998, m=199이면 l ≤ 3 (최대 3번의 디스크 접근!)

**B+ 트리 (실무 표준):**
실제 데이터를 모두 리프에 저장하고, 내부 노드는 인덱스만 보유. 리프들이 연결 리스트로 연결되어 순차 접근에 유리. 데이터베이스 인덱스의 사실상 표준.

## 예시

```
m=3인 B-트리 (2-3 트리) 삽입 예시

삽입 10:
[10]

삽입 20:
[10 | 20]

삽입 30 → 노드 오버플로우 → 분할:
     [20]
    /    \
  [10]  [30]

삽입 5, 15:
        [20]
       /    \
  [5|10]   [15|30]

삽입 25 → 오른쪽 노드 분할:
          [20 | 30]
         /    |    \
    [5|10] [15|25] [...]

디스크 접근: N=1,000,000, m=100 → 최대 3~4번
```

## 관련 개념

- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [AVL Tree](/knowledge/algorithms/data-structures/avl-tree/)
- [2-3 Tree](/knowledge/algorithms/data-structures/2-3-tree/)
- [Trie](/knowledge/algorithms/data-structures/trie/)
- [Hash Table](/knowledge/algorithms/hash-table/)
