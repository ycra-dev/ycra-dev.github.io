---
title: "트라이 (Trie)"
description: "트라이(Trie)는 문자열 집합을 표현하는 트리 자료구조로, 각 노드가 문자를 나타내며 루트에서 특정 노드까지의 경로가 하나의 문자열을 형성한다"
tags: ["Trie", "Digital Searching", "String", "Prefix Tree", "Radix", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/trie
sidebar:
  order: 35
---

## 핵심 개념

트라이(Trie)는 문자열 집합을 표현하는 트리 자료구조로, 각 노드가 문자(digit)를 나타내며 루트에서 특정 노드까지의 경로가 하나의 문자열(또는 키의 접두사)을 형성한다. "Retrieval"에서 유래한 이름이다.

**기본 구조:**
- M진 트라이(M-ary Trie): 알파벳 크기 M에 대해 각 노드가 M개의 링크를 가짐
- 이진 트라이(Binary Trie): 각 노드가 0과 1 두 개의 자식만 가짐
- 각 노드는 키 문자 하나를 대표하며, 분기는 다음 문자에 따라 결정됨

## 동작 원리

**탐색 과정:**
1. 루트에서 시작
2. 키의 첫 번째 비트(또는 문자)에 따라 자식 선택
3. 다음 비트/문자로 이동하며 반복
4. 리프 노드에 도달하면 실제 키 비교로 확인

**BST와의 비교:**
- BST: 키 전체를 비교 → O(log N) 번의 완전 비교
- 트라이: 키의 각 비트/문자를 순서대로 처리 → O(log N) 비트 검사

**성능 분석 (랜덤 이진 키 N개):**
- 성공 탐색 평균: 약 log₂ N 비트 검사
- 실패 탐색 평균: 약 log₂ N 비트 검사
- 내부 노드 수 평균: N - 1개 (이진 트라이)
- 전체 노드 수 평균: 약 N/ln 2 ≈ 1.44N

**메모리 효율:**
- 포인터 방식: 각 노드에 M개의 포인터 → 희소 알파벳에서 낭비
- 링크드 트라이: 있는 자식만 저장 (절약하지만 느림)
- 컷오프 파라미터(Cutoff s): 키가 s개 이하인 서브트리에서는 순차 탐색으로 전환

**응용:**
- 사전(Dictionary) 구현
- 자동 완성(Autocomplete)
- IP 라우팅 테이블
- 문자열 정렬 (radix sort)

## 예시

```
문자열 {"the", "their", "there", "them", "ten", "than"}의 트라이 (단순화)

           [root]
           /
          [t]
          /
         [h]
        /    \
      [e]    [a]
     / | \     \
  [re][ir][m]  [n]

이진 트라이 탐색:
- 'A'=65=01000001, 'B'=66=01000010
- 비트 0(MSB)부터 검사하여 분기 결정

def trie_search(root, key):
    node = root
    for bit in bits_of(key):
        node = node.children[bit]
        if node is None:
            return NOT_FOUND
    return node.data if node.is_leaf else NOT_FOUND
```

## 관련 개념

- [패트리샤 트리 (Patricia Tree)](/knowledge/algorithms/data-structures/patricia-tree/)
- [디지털 탐색 트리 (Digital Search Tree)](/knowledge/algorithms/data-structures/digital-search-tree/)
- [기수 탐색 (Radix Search)](/knowledge/algorithms/data-structures/radix-search/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
