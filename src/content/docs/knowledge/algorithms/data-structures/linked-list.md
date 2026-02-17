---
title: "Linked List"
description: "연결 리스트(Linked List)는 각 원소가 포인터를 통해 다음(또는 이전) 원소를 가리키는 방식으로 선형 순서를 유지하는 자료구조로, 배열과 달리 인덱스가 아닌 포인터에 의해 순서가 결정된다"
tags: ['Linked List', 'Data Structure', 'Pointer', 'Doubly Linked', 'Singly Linked', 'Sentinel']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/linked-list
sidebar:
  order: 3
---

## 핵심 개념

연결 리스트의 각 원소는 key 속성과 포인터 속성을 가진 객체이다. 이중 연결 리스트(doubly linked list)에서는 next와 prev 두 개의 포인터를 가지며, 단일 연결 리스트(singly linked list)에서는 next만 가진다.

**리스트의 종류:**
- 단일 연결(singly linked): next 포인터만 존재
- 이중 연결(doubly linked): next와 prev 포인터 모두 존재
- 정렬된(sorted) / 비정렬(unsorted)
- 순환(circular) / 비순환

**핵심 연산과 시간 복잡도:**
- LIST-SEARCH(L, k): 키 k를 가진 원소를 선형 탐색 - O(n) 최악의 경우
- LIST-PREPEND(L, x): 리스트 앞에 원소 삽입 - O(1)
- LIST-INSERT(x, y): y 뒤에 x 삽입 - O(1)
- LIST-DELETE(L, x): 포인터로 지정된 원소 삭제 - O(1) (이중 연결 시)

**센티넬(Sentinel):** L.nil이라는 더미 객체를 사용하여 경계 조건을 단순화할 수 있다. 센티넬을 사용하면 순환 이중 연결 리스트가 되며, L.nil.next가 머리, L.nil.prev가 꼬리를 가리킨다. 검색 시 센티넬에 키를 저장하면 비교 횟수를 줄일 수 있다.

**배열 대비 장단점:**
- 장점: 삽입/삭제가 O(1) (포인터만 변경), 동적 크기 조절
- 단점: k번째 원소 접근에 O(k) 시간, 추가 포인터 메모리 필요

## 예시

```
LIST-SEARCH(L, k)
  x = L.head
  while x != NIL and x.key != k
    x = x.next
  return x

LIST-PREPEND(L, x)        // O(1) 삽입
  x.next = L.head
  x.prev = NIL
  if L.head != NIL
    L.head.prev = x
  L.head = x

LIST-DELETE(L, x)          // O(1) 삭제 (이중 연결)
  if x.prev != NIL
    x.prev.next = x.next
  else L.head = x.next
  if x.next != NIL
    x.next.prev = x.prev

// 센티넬 사용 시 단순화된 삭제
LIST-DELETE'(x)
  x.prev.next = x.next
  x.next.prev = x.prev
```

## 관련 개념

- [Array](/knowledge/algorithms/array/)
- [Stack](/knowledge/algorithms/stack/)
- [Queue](/knowledge/algorithms/queue/)
- [Rooted Tree](/knowledge/algorithms/rooted-tree/)
- [Hash Table](/knowledge/algorithms/hash-table/)
