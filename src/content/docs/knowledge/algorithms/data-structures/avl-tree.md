---
title: "AVL 트리 (AVL Tree)"
description: "AVL 트리(Adelson-Velsky and Landis Tree)는 모든 노드에서 왼쪽과 오른쪽 서브트리의 높이 차가 최대 1인 자기 균형 이진 탐색 트리로, 1962년 소련 수학자 Adelson-Velsky와 Landis가 고안했다"
tags: ["AVL Tree", "Balanced Tree", "Self-Balancing", "Rotation", "Binary Search Tree", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/avl-tree
sidebar:
  order: 31
---

## 핵심 개념

AVL 트리(Adelson-Velsky and Landis Tree)는 모든 노드에서 왼쪽과 오른쪽 서브트리의 높이 차가 최대 1인 자기 균형 이진 탐색 트리다. 1962년 소련 수학자 Adelson-Velsky와 Landis가 고안했다.

**균형 조건(Balance Condition):**
모든 노드 P에 대해:
|height(RLINK(P)) - height(LLINK(P))| ≤ 1

각 노드에 균형 인수(Balance Factor, B) 저장:
- B = +1: 오른쪽 서브트리가 1 높음
- B = 0: 양쪽 서브트리 높이 동일
- B = -1: 왼쪽 서브트리가 1 높음

**Theorem A (Adelson-Velsky & Landis):**
N개의 내부 노드를 가진 AVL 트리의 높이 h는 다음을 만족한다:
- 하한: h ≥ lg(N+1)
- 상한: h ≤ 1.4405 lg(N+2) - 0.3277

즉 최악의 경우도 최적 이진 탐색 트리보다 약 44.05% 더 깊을 뿐이다.

## 동작 원리

**재균형(Rebalancing) 회전:**
삽입 후 불균형이 발생할 때 두 가지 회전으로 복구:
1. **단일 회전(Single Rotation)**: 한쪽 방향으로만 편향될 때 (Case 1)
2. **이중 회전(Double Rotation)**: 지그재그 형태일 때 (Case 2)
   - 첫 번째: 자식 노드를 부모 방향과 반대로 회전
   - 두 번째: 전체를 부모 방향으로 회전

**Algorithm A (Knuth):**
탐색(A1-A4) → 새 노드 삽입(A5-A7) → 재균형(A8-A10)의 세 단계로 구성.
삽입 후 재균형은 루트 방향으로 올라가며 최대 한 번만 회전이 필요하다.

**지원 연산 O(log N):**
1. 키 탐색
2. k번째 항목 탐색
3. 임의 위치 삽입
4. 임의 항목 삭제
5. M+N 크기 리스트 연결: O(log(M+N))

**Fibonacci 트리와의 관계:**
최소 노드 수를 갖는 AVL 트리는 Fibonacci 트리 구조를 가진다. 높이 h인 AVL 트리의 최소 노드 수는 Fibonacci 수 F(h+2) - 1이다.

## 예시

```
단일 회전 예시 (Case 1: 오른쪽-오른쪽 편향)
Before:       After 단일 좌회전:
    A (+1)          B (0)
     \             / \
      B (+1)      A   γ
     / \         / \
    β   γ       α   β

이중 회전 예시 (Case 2: 오른쪽-왼쪽 편향)
Before:       After 이중 회전:
    A (+1)          X (0)
     \             / \
      B (-1)      A   B
     /           / \ / \
    X           α  β γ  δ
   / \

AVL 트리 높이와 노드 수 관계:
h=5인 AVL 트리: 최소 12개, 최대 2^6-1=63개 노드
```

## 관련 개념

- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [B-트리 (B-Tree)](/knowledge/algorithms/data-structures/b-tree/)
- [최적 이진 탐색 트리 (Optimal Binary Search Tree)](/knowledge/algorithms/data-structures/optimal-binary-search-tree/)
- [2-3 트리 (2-3 Tree)](/knowledge/algorithms/data-structures/2-3-tree/)
- [균형 트리 (Balanced Tree)](/knowledge/algorithms/balanced-tree/)
