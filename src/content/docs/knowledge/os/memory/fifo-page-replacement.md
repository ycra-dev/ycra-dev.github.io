---
title: "FIFO 페이지 교체 (FIFO Page Replacement)"
description: "가장 먼저 메모리에 들어온 페이지를 가장 먼저 교체하는 알고리즘"
tags: ["OS", "Memory", "Page Replacement"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/fifo-page-replacement
sidebar:
  order: 19
---

## 핵심 개념

FIFO 페이지 교체는 가장 먼저 메모리에 들어온 페이지를 가장 먼저 교체하는 알고리즘입니다. 오래 전에 들어온 페이지는 더 이상 필요하지 않을 가능성이 높다고 가정하지만, 실제로는 항상 맞지 않습니다. 구현이 매우 단순하지만 **Belady's Anomaly** 문제가 있습니다.

## 동작 원리

1. 메모리에 있는 모든 페이지를 FIFO 큐로 관리
2. 새 페이지가 들어오면 큐의 뒤(tail)에 삽입
3. 교체가 필요하면 큐의 앞(head)에 있는 페이지를 제거
4. 페이지 도착 시간만 기록하면 됨 (참조 시간 불필요)

```c
// FIFO 페이지 교체 의사코드
Queue fifo_queue;

void page_fault(page) {
    if (queue_is_full(fifo_queue)) {
        victim = dequeue(fifo_queue);  // 가장 오래된 페이지 제거
        evict(victim);
    }
    load_page(page);
    enqueue(fifo_queue, page);  // 새 페이지를 뒤에 추가
}
```

### Belady's Anomaly (벨라디의 모순)

프레임 수를 늘렸는데 오히려 **페이지 폴트가 증가**하는 현상입니다. FIFO는 페이지의 실제 사용 패턴을 고려하지 않기 때문에 발생합니다.

예시 (reference string = `1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5`):

```
[3 프레임]           [4 프레임]
1 2 3 4 1 2 5 1 2 3 4 5    1 2 3 4 1 2 5 1 2 3 4 5
1 1 1 4 4 4 5 5 5 5 5 5    1 1 1 1 1 1 5 5 5 5 4 4
  2 2 2 1 1 1 1 1 3 3 3      2 2 2 2 2 2 1 1 1 1 5
    3 3 3 2 2 2 2 2 4 4        3 3 3 3 3 3 2 2 2 2
                                 4 4 4 4 4 4 3 3 3
─────────────────────────────────────────────────────
폴트: 9번                   폴트: 10번 (더 많음!)
```

## 예시

reference string = `7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1`, 3 프레임:

```
참조: 7  0  1  2  0  3  0  4  2  3  0  3  2  1  2  0  1  7  0  1
     ─────────────────────────────────────────────────────────
f0:  7  7  7  2  2  2  2  4  4  4  0  0  0  0  0  0  0  7  7  7
f1:     0  0  0  0  3  3  3  2  2  2  2  2  1  1  1  1  1  0  0
f2:        1  1  1  1  0  0  0  3  3  3  3  3  2  2  2  2  2  1
     ─────────────────────────────────────────────────────────
폴트: F  F  F  F     F  F  F  F  F  F     F  F     F     F  F  F

총 15번의 페이지 폴트
```

### 장단점

- **장점**: 구현이 매우 간단 (큐 하나), 오버헤드 낮음
- **단점**: 성능이 좋지 않음 (오래됐지만 자주 쓰는 페이지 교체), Belady's anomaly 발생 가능

## 관련 개념

- [페이지 교체 (Page Replacement)](/knowledge/os/page-replacement/)
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/)
- [프레임 할당 (Frame Allocation)](/knowledge/os/frame-allocation/)
