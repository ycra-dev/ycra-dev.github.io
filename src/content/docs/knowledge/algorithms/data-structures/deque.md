---
title: "덱 (Deque)"
description: "양쪽 끝에서 삽입과 삭제가 모두 가능한 이중 종단 큐(Double-Ended Queue) 자료구조"
tags: ["Data Structures", "Algorithms", "Queue", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/deque
sidebar:
  order: 21
---

## 핵심 개념

덱(Deque, Double-Ended Queue)은 양쪽 끝(앞과 뒤)에서 삽입과 삭제가 모두 가능한 자료구조다. 스택(LIFO)과 큐(FIFO)를 일반화한 개념으로, 두 가지 제한적 형태를 모두 지원한다:

- **출력 제한 덱(Output-Restricted Deque)**: 삭제는 한 쪽 끝에서만 가능, 삽입은 양쪽 모두 가능
- **입력 제한 덱(Input-Restricted Deque)**: 삽입은 한 쪽 끝에서만 가능, 삭제는 양쪽 모두 가능

## 동작 원리

**기본 연산**:
| 연산 | 설명 | 시간 복잡도 |
|------|------|-------------|
| push_front(x) | 앞에 원소 추가 | O(1) |
| push_back(x) | 뒤에 원소 추가 | O(1) |
| pop_front() | 앞에서 원소 제거 및 반환 | O(1) |
| pop_back() | 뒤에서 원소 제거 및 반환 | O(1) |
| front() | 앞의 원소 조회 | O(1) |
| back() | 뒤의 원소 조회 | O(1) |

**배열 기반 구현**: 원형 배열(circular array)로 구현하면 모든 연산이 O(1). 앞 포인터(L)와 뒤 포인터(R)를 양방향으로 이동시킨다.

**연결 리스트 기반 구현**: 이중 연결 리스트를 사용하면 자연스럽게 양쪽 끝 연산이 O(1).

**TAOCP에서의 관점**: Knuth는 덱을 스택과 큐의 자연스러운 일반화로 소개하며, 순차 할당(sequential allocation) 방식과 연결 할당(linked allocation) 방식으로 구현할 수 있다고 설명한다.

**슬라이딩 윈도우 최대/최소**: 덱의 중요한 응용 사례. O(n) 시간에 크기 k인 모든 윈도우의 최대값을 구한다.

## 예시

```python
from collections import deque

# Python의 deque는 O(1) 양끝 연산 지원
d = deque()

# 삽입
d.append(1)        # 뒤에 추가: [1]
d.append(2)        # 뒤에 추가: [1, 2]
d.appendleft(0)    # 앞에 추가: [0, 1, 2]

# 삭제
print(d.popleft())  # 앞에서 제거: 0, d = [1, 2]
print(d.pop())      # 뒤에서 제거: 2, d = [1]

# 슬라이딩 윈도우 최대값 (O(n))
def sliding_window_max(nums, k):
    result = []
    dq = deque()  # 인덱스 저장 (감소하는 순서)

    for i, num in enumerate(nums):
        # 윈도우 밖의 인덱스 제거
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # 현재 원소보다 작은 원소 제거
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        # 윈도우가 완성되면 최대값 추가
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

print(sliding_window_max([1,3,-1,-3,5,3,6,7], 3))
# [3, 3, 5, 5, 6, 7]
```

## 관련 개념

- [큐 (Queue)](/knowledge/algorithms/data-structures/queue/)
- [스택 (Stack)](/knowledge/algorithms/data-structures/stack/)
- [원형 리스트 (Circular List)](/knowledge/algorithms/data-structures/circular-list/)
- [순차 할당 (Sequential Allocation)](/knowledge/algorithms/data-structures/sequential-allocation/)
