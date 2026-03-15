---
title: "이중 연결 리스트 (Doubly Linked List)"
description: "각 노드가 다음 노드와 이전 노드를 가리키는 두 개의 포인터를 가져 양방향 순회가 가능한 연결 리스트"
tags: ["Data Structures", "Linked List", "Algorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/doubly-linked-list
sidebar:
  order: 26
---

## 핵심 개념

이중 연결 리스트(Doubly Linked List)는 각 노드가 두 개의 포인터 — 다음 노드(RLINK/next)와 이전 노드(LLINK/prev) — 를 가지는 연결 리스트다. 임의 노드의 포인터만 있으면 O(1)에 삽입/삭제가 가능하다.

TAOCP Vol.1, Section 2.2.5에서 Knuth는 이중 연결 리스트를 "노드 T의 포인터만으로 T를 리스트에서 삭제할 수 있는 구조"로 정의하며, 이것이 단방향 연결 리스트 대비 핵심 이점임을 강조한다.

## 동작 원리

**노드 구조**:
```
[LLINK | INFO | RLINK]
```

**헤더(Sentinel) 노드**: 빈 리스트도 일관되게 처리하기 위한 더미 노드. 삽입/삭제 코드에서 경계 조건(NULL 체크)을 없앤다.

**삽입 (노드 Y를 노드 X 다음에 삽입)**:
```
Y.LLINK ← X
Y.RLINK ← X.RLINK
X.RLINK.LLINK ← Y
X.RLINK ← Y
```
4번의 포인터 변경으로 O(1) 삽입.

**삭제 (노드 X 제거)**:
```
X.LLINK.RLINK ← X.RLINK
X.RLINK.LLINK ← X.LLINK
```
2번의 포인터 변경으로 O(1) 삭제. **복원도 가능**:
```
X.LLINK.RLINK ← X
X.RLINK.LLINK ← X
```
이 성질이 Dancing Links 알고리즘의 핵심이다.

**Dancing Links (Knuth, 2000)**: 이중 원형 연결 리스트에서 제거한 노드를 나중에 정확하게 복원할 수 있는 성질을 활용하여, Exact Cover 문제를 효율적으로 해결하는 알고리즘.

**단방향 vs 이중 연결 리스트**:
| 연산 | 단방향 | 이중 |
|------|--------|------|
| 노드 X 삭제 | O(n) (전임자 탐색 필요) | O(1) |
| 역방향 순회 | 불가능 | O(n) |
| 메모리 | 1 포인터 | 2 포인터 |

## 예시

```python
class DNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        # 헤더(sentinel) 노드
        self.head = DNode(None)
        self.tail = DNode(None)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def insert_after(self, node, val):
        """node 다음에 새 노드 삽입 O(1)"""
        new_node = DNode(val)
        new_node.prev = node
        new_node.next = node.next
        node.next.prev = new_node
        node.next = new_node
        self.size += 1
        return new_node

    def delete(self, node):
        """임의 노드 삭제 O(1) (포인터만 있으면 됨)"""
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1

    def restore(self, node):
        """삭제된 노드 복원 (Dancing Links의 핵심!)"""
        node.prev.next = node
        node.next.prev = node
        self.size += 1

    def append(self, val):
        return self.insert_after(self.tail.prev, val)

    def traverse(self):
        result = []
        curr = self.head.next
        while curr != self.tail:
            result.append(curr.val)
            curr = curr.next
        return result

# 사용 예
dll = DoublyLinkedList()
a = dll.append(1); b = dll.append(2); c = dll.append(3)
print(dll.traverse())  # [1, 2, 3]

dll.delete(b)          # b 삭제
print(dll.traverse())  # [1, 3]

dll.restore(b)         # b 복원 (Dancing Links!)
print(dll.traverse())  # [1, 2, 3]
```

## 관련 개념

- [연결 리스트 (Linked List)](/knowledge/algorithms/data-structures/linked-list/)
- [원형 리스트 (Circular List)](/knowledge/algorithms/data-structures/circular-list/)
- [정확 덮개 문제 (Exact Cover Problem)](/knowledge/discrete-mathematics/combinatorics/exact-cover-problem/)
