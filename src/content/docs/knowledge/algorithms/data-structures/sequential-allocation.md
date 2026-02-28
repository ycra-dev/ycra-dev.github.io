---
title: "Sequential Allocation"
description: "데이터를 연속된 메모리 위치에 순차적으로 배치하는 방식으로, 스택·큐·덱을 배열로 구현할 때 사용하는 메모리 관리 전략"
tags: ["Data Structures", "Memory", "Algorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/sequential-allocation
sidebar:
  order: 24
---

## 핵심 개념

순차 할당(Sequential Allocation)은 데이터 구조의 원소들을 연속된 메모리 위치에 차례대로 배치하는 방식이다. 배열(array)이 가장 대표적인 구현체다.

TAOCP Vol.1, Section 2.2.2에서 Knuth는 순차 할당을 스택·큐·덱의 자연스러운 구현 방법으로 소개하며, 연결 할당(linked allocation)과 대비한다.

**연결 할당 대비 순차 할당의 특성**:
| 특성 | 순차 할당 | 연결 할당 |
|------|-----------|-----------|
| 메모리 오버헤드 | 없음 | 포인터 필드 |
| 임의 접근 | O(1) | O(n) |
| 삽입/삭제(중간) | O(n) | O(1) |
| 캐시 지역성 | 우수 | 낮음 |
| 크기 변경 | 어려움 | 용이 |

## 동작 원리

**스택의 배열 구현**:
```
배열 A[1..N]과 스택 포인터 T를 사용
- Push(x): A[++T] = x
- Pop(): return A[T--]
- 오버플로: T = N일 때 Push 불가
- 언더플로: T = 0일 때 Pop 불가
```

**큐의 배열 구현 (원형 버퍼)**:
두 개의 포인터 F(front), R(rear)를 사용:
```
- Enqueue(x): A[R] = x; R = (R + 1) mod N
- Dequeue(): x = A[F]; F = (F + 1) mod N; return x
- 공백: F = R
- 가득 참: (R + 1) mod N = F  →  최대 N-1개 원소만 저장 가능
```

**덱의 배열 구현**: 원형 버퍼에서 양쪽 포인터를 양방향으로 이동.

**다중 스택 (Garwick의 알고리즘)**: n개의 스택을 하나의 배열로 관리:
- 초기에 균등 분배
- 오버플로 발생 시 성장률에 따라 재할당
- 가비지 컬렉션 없이 공간을 동적으로 관리

**정적 할당 vs 동적 할당**:
- 정적: 크기를 컴파일 타임에 결정. 단순하지만 유연성 없음.
- 동적 (동적 배열): 용량 초과 시 2배 확장. O(1) 분할 상환 삽입.

## 예시

```python
class CircularQueueArray:
    """원형 버퍼로 구현한 큐 (순차 할당)"""
    def __init__(self, capacity):
        self.capacity = capacity + 1  # 빈 슬롯 1개 필요
        self.data = [None] * self.capacity
        self.front = 0
        self.rear = 0

    def enqueue(self, x):
        if self.is_full():
            raise OverflowError("Queue is full")
        self.data[self.rear] = x
        self.rear = (self.rear + 1) % self.capacity

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        x = self.data[self.front]
        self.front = (self.front + 1) % self.capacity
        return x

    def is_empty(self):
        return self.front == self.rear

    def is_full(self):
        return (self.rear + 1) % self.capacity == self.front

    def size(self):
        return (self.rear - self.front) % self.capacity

# 사용 예
q = CircularQueueArray(4)
q.enqueue(1); q.enqueue(2); q.enqueue(3)
print(q.dequeue())  # 1 (FIFO)
q.enqueue(4); q.enqueue(5)
print(q.size())     # 4
```

## 관련 개념

- [Array](/knowledge/algorithms/data-structures/array/)
- [Stack](/knowledge/algorithms/data-structures/stack/)
- [Queue](/knowledge/algorithms/data-structures/queue/)
- [Deque](/knowledge/algorithms/data-structures/deque/)
