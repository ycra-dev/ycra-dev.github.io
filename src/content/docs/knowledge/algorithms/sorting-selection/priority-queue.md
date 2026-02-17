---
title: "Priority Queue"
description: "우선순위 큐(Priority Queue)는 각 원소에 키(key) 값이 연관된 원소 집합을 유지하면서, 키 값에 따른 우선순위 기반 삽입/삭제/조회 연산을 효율적으로 지원하는 자료구조이다"
tags: ['Priority Queue', 'Data Structure', 'Heap', 'Max Priority Queue', 'Min Priority Queue']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/priority-queue
sidebar:
  order: 7
---

## 핵심 개념

우선순위 큐는 힙을 기반으로 효율적으로 구현된다. 두 가지 형태가 있다:

**최대 우선순위 큐(Max-Priority Queue)** - 최대 힙 기반:
- INSERT(S, x, k): 원소 x를 키 k로 삽입 - O(lg n)
- MAXIMUM(S): 최대 키를 가진 원소 반환 - Theta(1)
- EXTRACT-MAX(S): 최대 키 원소 제거 및 반환 - O(lg n)
- INCREASE-KEY(S, x, k): 원소 x의 키를 k로 증가 - O(lg n)

**최소 우선순위 큐(Min-Priority Queue)** - 최소 힙 기반:
- INSERT, MINIMUM, EXTRACT-MIN, DECREASE-KEY 연산 지원

핵심 구현 세부사항:
- **핸들(Handle)**: 응용 객체와 힙 배열 인덱스 간의 매핑을 관리. 힙 연산 중 원소 위치 변경 시 매핑도 갱신해야 함.
- MAX-HEAP-EXTRACT-MAX: 루트를 마지막 원소로 대체 후 MAX-HEAPIFY 호출
- MAX-HEAP-INCREASE-KEY: 키 증가 후 루트 방향으로 올라가며 힙 속성 복원 (INSERTION-SORT의 내부 루프와 유사)
- MAX-HEAP-INSERT: 키 값을 -infinity로 설정한 새 리프 추가 후 INCREASE-KEY 호출

모든 연산이 O(lg n) 시간 + 객체-인덱스 매핑 오버헤드로 수행된다. 매핑은 해시 테이블로 구현하면 기대 O(1) 오버헤드.

**응용**: 작업 스케줄링(최대 우선순위 큐), 이벤트 기반 시뮬레이션(최소 우선순위 큐), Dijkstra 알고리즘, k-way 병합 등.

## 예시

```
MAX-HEAP-EXTRACT-MAX(A)
1  max = MAX-HEAP-MAXIMUM(A)
2  A[1] = A[A.heap-size]
3  A.heap-size = A.heap-size - 1
4  MAX-HEAPIFY(A, 1)
5  return max

MAX-HEAP-INSERT(A, x, n)
1  if A.heap-size == n
2      error "heap overflow"
3  A.heap-size = A.heap-size + 1
4  k = x.key
5  x.key = -infinity
6  A[A.heap-size] = x
7  map x to index heap-size in the array
8  MAX-HEAP-INCREASE-KEY(A, x, k)
```

k개의 정렬된 리스트를 병합할 때 최소 힙 기반 우선순위 큐를 사용하면 O(n lg k) 시간에 가능하다.

## 관련 개념

- [Heap](/knowledge/algorithms/heap/)
- [Max-Heapify](/knowledge/algorithms/max-heapify/)
- [Data Structure](/knowledge/algorithms/data-structure/)
- [Heapsort](/knowledge/algorithms/heapsort/)
