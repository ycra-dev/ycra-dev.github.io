---
title: "Digital Search Tree"
description: "디지털 탐색 트리(Digital Search Tree)는 키의 비트를 사용하여 탐색 방향을 결정하는 이진 트리로, BST와 달리 키의 대소 비교 대신 비트값으로 분기한다"
tags: ["Digital Search Tree", "Digital Searching", "Binary Trie", "Radix", "Bit Comparison", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/digital-search-tree
sidebar:
  order: 36
---

## 핵심 개념

디지털 탐색 트리(Digital Search Tree)는 키의 비트(또는 디지트)를 사용하여 탐색 방향을 결정하는 이진 트리로, BST와 달리 키의 대소 비교 대신 비트값(0 또는 1)으로 분기한다. Knuth의 Section 6.3에서 다루는 핵심 자료구조다.

**BST와의 근본적 차이:**
- BST: 키 전체를 비교하여 크기로 분기 (K < root → 왼쪽, K > root → 오른쪽)
- Digital Search Tree: 키의 i번째 비트값으로 분기 (bit_i = 0 → 왼쪽, bit_i = 1 → 오른쪽)

## 동작 원리

**탐색 Algorithm D:**
1. 루트에서 시작, 비트 인덱스 b=1
2. 현재 노드의 키 K[b]번째 비트에 따라 자식 선택
3. 빈 자식(Λ)에 도달하면 탐색 실패
4. 키 전체가 일치하면 탐색 성공

**삽입:**
탐색 실패 위치에 새 노드를 삽입하면 됨. BST 삽입과 동일한 위치이지만 분기 기준이 다름.

**랜덤 분석:**
N개의 랜덤 이진 키에 대해:
- 평균 탐색 비교 수: ≈ log₂ N + 0.5 (BST의 1.386 log₂ N보다 우수)
- 디지털 탐색 트리는 BST보다 더 균형에 가까운 경향 있음
- 완전히 균등한 입력에서 완벽한 균형 달성

**트라이(Trie)와의 차이:**

| 특성 | Digital Search Tree | Trie |
|------|--------------------|----- |
| 키 저장 | 내부 노드에 저장 | 리프에 저장 |
| 비교 | 비트 + 키 전체 비교 | 비트만 사용 |
| 공간 | 더 효율적 | 포인터 더 많음 |
| 삽입 속도 | 빠름 | 약간 느림 |

## 예시

```
이진 키 집합: {0010, 0110, 1001, 1100, 1110}
삽입 순서: 0010, 0110, 1001, 1100, 1110

       [1001]        ← 루트, 비트1=1이면 오른쪽
       /     \
  [0010]   [1100]    ← 비트2
   /  \    /    \
 Λ  [0110] [1110]  Λ

탐색 1110:
1. 루트[1001], 비트1(1110)=1 → 오른쪽
2. [1100], 비트2(1110)=1 → 오른쪽
3. [1110], 키 전체 비교 → 일치! 성공

탐색 0101:
1. 루트[1001], 비트1(0101)=0 → 왼쪽
2. [0010], 비트2(0101)=1 → 오른쪽
3. [0110], 키 전체 비교 → 불일치 실패
```

## 관련 개념

- [Trie](/knowledge/algorithms/data-structures/trie/)
- [Patricia Tree](/knowledge/algorithms/data-structures/patricia-tree/)
- [Radix Search](/knowledge/algorithms/data-structures/radix-search/)
- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
