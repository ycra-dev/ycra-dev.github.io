---
title: "Queue"
description: "큐(Queue)는 선입선출(FIFO, First-In First-Out) 정책을 따르는 동적 집합으로, 가장 오래된 원소가 가장 먼저 삭제되는 자료구조이다"
tags: ['Queue', 'Data Structure', 'Fifo', 'Elementary', 'Enqueue', 'Dequeue', 'Circular Buffer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/queue
sidebar:
  order: 5
---

## 핵심 개념

큐는 한쪽 끝(tail)에서 삽입(ENQUEUE)이, 다른 쪽 끝(head)에서 삭제(DEQUEUE)가 이루어지는 자료구조이다. 배열 Q[1:n]을 사용하여 최대 n-1개의 원소를 저장할 수 있으며, 원형 배열(circular array) 방식으로 구현된다.

**속성:**
- Q.head: 큐의 머리(첫 번째 원소) 인덱스
- Q.tail: 다음 삽입 위치 인덱스
- Q.size: 배열의 크기 n

**순환 구조:** 배열의 끝에 도달하면 위치 1로 되돌아가는 순환 방식을 사용한다. 이를 통해 배열 공간을 효율적으로 재활용한다.

**핵심 연산과 시간 복잡도:**
- ENQUEUE(Q, x): tail 위치에 x를 저장하고 tail을 순환적으로 증가 - O(1)
- DEQUEUE(Q): head 위치의 원소를 반환하고 head를 순환적으로 증가 - O(1)

**경계 조건:**
- Q.head = Q.tail이면 큐는 비어 있다
- Q.head = Q.tail + 1 또는 (Q.head = 1이고 Q.tail = Q.size)이면 큐가 가득 찼다
- 덱(deque, double-ended queue)은 양쪽 끝에서 삽입과 삭제가 모두 가능한 확장 형태이다

## 예시

```
ENQUEUE(Q, x)
  Q[Q.tail] = x
  if Q.tail == Q.size
    Q.tail = 1
  else Q.tail = Q.tail + 1

DEQUEUE(Q)
  x = Q[Q.head]
  if Q.head == Q.size
    Q.head = 1
  else Q.head = Q.head + 1
  return x

// 실행 예시: Q[1:6], head=1, tail=1 (빈 큐)
// ENQUEUE(Q, 4) -> Q = [4, _, _, _, _, _], head=1, tail=2
// ENQUEUE(Q, 1) -> Q = [4, 1, _, _, _, _], head=1, tail=3
// DEQUEUE(Q)    -> returns 4, head=2, tail=3
// ENQUEUE(Q, 8) -> Q = [_, 1, 8, _, _, _], head=2, tail=4
```

## 관련 개념

- [Array](/knowledge/algorithms/array/)
- [Stack](/knowledge/algorithms/stack/)
- [Linked List](/knowledge/algorithms/linked-list/)
- [Data Structure](/knowledge/algorithms/data-structure/)
