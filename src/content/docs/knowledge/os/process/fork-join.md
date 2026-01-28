---
title: "Fork-Join 모델 (Fork-Join Model)"
description: "부모 스레드가 자식 스레드를 생성(fork)하고 완료를 기다려(join) 결과를 합치는 병렬 실행 패턴"
tags: ["OS", "Thread", "Parallelism"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/fork-join
sidebar:
  order: 19
---

## 핵심 개념

Fork-Join 모델은 부모 스레드가 자식 스레드를 생성(fork)하고, 자식들의 완료를 기다려(join) 결과를 합치는 병렬 실행 패턴입니다. 분할 정복(Divide and Conquer) 알고리즘을 자연스럽게 병렬화할 수 있으며, 재귀적 구조에 적합합니다.

```
Main Thread ──────────────────────────────────────►
     │
     ├─ fork ──► [Task A] ─────────────► join ─┐
     │                                          │
     ├─ fork ──► [Task B] ───► join ───────────┤
     │                                          │
     └─ fork ──► [Task C] ───────────► join ───┘
                                                │
                                        결과 결합
```

## 동작 원리

### 기본 알고리즘

```
Task(problem):
    if problem이 충분히 작으면:
        직접 해결하고 결과 반환
    else:
        subtask1 = fork(Task(problem의 일부))
        subtask2 = fork(Task(problem의 나머지))
        result1 = join(subtask1)
        result2 = join(subtask2)
        return combine(result1, result2)
```

### 재귀적 분할

```
            [Problem]
           /         \
      [fork]        [fork]
       /               \
  [SubP1]           [SubP2]
   /   \             /   \
 [a]   [b]        [c]   [d]
  ↓     ↓          ↓     ↓
solve solve      solve solve
  ↓     ↓          ↓     ↓
 [join]           [join]
    \               /
     [    join    ]
          ↓
      Final Result
```

### Work Stealing 알고리즘

`ForkJoinPool`의 각 워커 스레드는 자신만의 작업 큐를 가집니다. 자신의 큐가 비면 **다른 스레드의 큐에서 작업을 훔쳐옴**(steal)으로써 부하 균형을 동적으로 유지합니다.

```
Thread 1: [T1][T2][T3][ ][ ]    ← 작업 많음
Thread 2: [ ][ ][ ][ ][ ]       ← 빈 큐, Thread 1에서 steal
                 ↓
Thread 1: [T1][T2][ ][ ][ ]
Thread 2: [T3][ ][ ][ ][ ]      ← T3을 가져옴
```

## 예시

### Java Fork-Join 구현

```java
public class SumTask extends RecursiveTask<Integer> {
    static final int THRESHOLD = 1000;
    private int[] array;
    private int begin, end;

    protected Integer compute() {
        if (end - begin < THRESHOLD) {
            int sum = 0;
            for (int i = begin; i <= end; i++)
                sum += array[i];
            return sum;
        } else {
            int mid = (begin + end) / 2;
            SumTask left = new SumTask(begin, mid, array);
            SumTask right = new SumTask(mid + 1, end, array);
            left.fork();
            right.fork();
            return right.join() + left.join();
        }
    }
}
```

Java 클래스 구조:

```
ForkJoinTask<V> (추상)
      ├── RecursiveTask<V>   → compute() 반환값 있음
      └── RecursiveAction    → compute() 반환값 없음 (void)
```

### THRESHOLD 결정

- 너무 작으면: 태스크 생성 오버헤드가 실제 계산보다 커짐
- 너무 크면: 병렬화 이점 감소
- 실험을 통해 적절한 값 결정 필요

### 장단점

- **장점**: 분할 정복의 자연스러운 병렬화, Work stealing으로 자동 부하 균형, 라이브러리가 스레드 수 관리
- **단점**: 재귀 구조에 적합하며 모든 문제에 맞지 않음, THRESHOLD 튜닝 필요, 소규모 데이터에서 비효율적

## 관련 개념

- [스레드 (Thread)](/knowledge/os/thread/)
- [스레드 풀 (Thread Pool)](/knowledge/os/thread-pool/)
- [데이터 병렬성 vs 태스크 병렬성](/knowledge/os/data-vs-task-parallelism/)
- [암달의 법칙 (Amdahl's Law)](/knowledge/os/amdahls-law/)
