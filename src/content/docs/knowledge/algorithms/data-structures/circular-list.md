---
title: "원형 리스트 (Circular List)"
description: "마지막 노드의 링크가 첫 번째 노드를 가리켜 원형을 이루는 연결 리스트 변형"
tags: ["Data Structures", "Linked List", "Algorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/circular-list
sidebar:
  order: 25
---

## 핵심 개념

원형 리스트(Circular List)는 마지막 노드의 링크 필드가 첫 번째 노드를 가리켜 원형(circle)을 이루는 연결 리스트의 변형이다. 어느 노드에서 출발해도 모든 노드를 순회할 수 있다.

TAOCP Vol.1, Section 2.2.3에서 Knuth는 원형 리스트의 핵심 이점을 설명한다: "어떤 노드에서도 순회를 시작할 수 있으므로, 특별한 헤드 노드가 필요 없고 큐를 rear 포인터 하나만으로 구현할 수 있다."

## 동작 원리

**단방향 원형 리스트**:
```
[1] → [2] → [3] → [4] → (다시 1로)
```
포인터 하나(tail 또는 head)만으로 전체 리스트를 나타낼 수 있다.

**tail 포인터 사용의 장점**:
- tail.next → head (첫 원소) O(1)
- tail → 마지막 원소 O(1)
- head와 tail 접근 모두 O(1) → 큐 구현에 적합

**Knuth의 원형 큐 구현**:
```
초기 상태: L.LINK → 자기 자신 (L이 sentinel/head 노드)

Enqueue(x): 새 노드를 L의 바로 왼쪽에 삽입
Dequeue(): L.LINK가 가리키는 노드 제거 (L 다음 노드)
```

**이중 원형 리스트 (Doubly Circular)**:
각 노드가 LLINK(이전)와 RLINK(다음) 두 개의 링크를 가진다:
- 임의 위치 삽입/삭제: O(1) (포인터만 있으면)
- 헤더(sentinel) 노드를 두면 빈 리스트 처리가 단순해짐

**삽입 알고리즘 (노드 X를 노드 P 다음에 삽입)**:
```
X.LLINK ← P
X.RLINK ← P.RLINK
P.RLINK.LLINK ← X
P.RLINK ← X
```

**삭제 알고리즘 (노드 X 제거)**:
```
X.LLINK.RLINK ← X.RLINK
X.RLINK.LLINK ← X.LLINK
```

## 예시

```python
class CircularNode:
    def __init__(self, val):
        self.val = val
        self.next = self  # 처음에 자기 자신을 가리킴

class CircularLinkedList:
    """단방향 원형 연결 리스트 (tail 포인터)"""
    def __init__(self):
        self.tail = None

    def append(self, val):
        """뒤에 노드 추가"""
        new_node = CircularNode(val)
        if self.tail is None:
            self.tail = new_node
        else:
            new_node.next = self.tail.next  # 새 노드 → head
            self.tail.next = new_node       # 이전 tail → 새 노드
            self.tail = new_node            # tail 업데이트

    def appendleft(self, val):
        """앞에 노드 추가 (큐에서 자주 사용)"""
        new_node = CircularNode(val)
        if self.tail is None:
            self.tail = new_node
        else:
            new_node.next = self.tail.next
            self.tail.next = new_node
            # tail은 변경 없음 (head만 변경)

    def popleft(self):
        """앞에서 노드 제거 (큐 dequeue)"""
        if self.tail is None:
            raise IndexError("Empty list")
        head = self.tail.next
        if head == self.tail:  # 원소 하나
            self.tail = None
        else:
            self.tail.next = head.next
        return head.val

    def traverse(self):
        """전체 순회"""
        if self.tail is None:
            return []
        result = []
        curr = self.tail.next  # head부터 시작
        while True:
            result.append(curr.val)
            if curr == self.tail:
                break
            curr = curr.next
        return result

# 사용 예 (큐로 활용)
q = CircularLinkedList()
q.append(1); q.append(2); q.append(3)
print(q.traverse())   # [1, 2, 3]
print(q.popleft())    # 1
print(q.traverse())   # [2, 3]
```

## 관련 개념

- [연결 리스트 (Linked List)](/knowledge/algorithms/data-structures/linked-list/)
- [이중 연결 리스트 (Doubly Linked List)](/knowledge/algorithms/data-structures/doubly-linked-list/)
- [큐 (Queue)](/knowledge/algorithms/data-structures/queue/)
- [순차 할당 (Sequential Allocation)](/knowledge/algorithms/data-structures/sequential-allocation/)
