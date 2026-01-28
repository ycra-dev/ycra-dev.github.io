---
title: "스레드 풀 (Thread Pool)"
description: "미리 생성해둔 스레드들의 집합으로, 작업 요청 시 대기 중인 스레드에 작업을 할당하는 패턴"
tags: ["OS", "Thread", "Concurrency"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/thread-pool
sidebar:
  order: 13
---

## 핵심 개념

스레드 풀은 미리 생성해둔 스레드들의 집합으로, 작업 요청이 들어오면 대기 중인 스레드에 작업을 할당하는 패턴입니다. 요청마다 스레드를 새로 생성하면 생성 시간 오버헤드가 발생하고, 무한정 생성하면 시스템 자원이 고갈됩니다.

## 동작 원리

### 동작 방식

1. **시작 시** 미리 N개의 스레드를 생성하여 풀에 대기
2. **작업 요청** 시 풀에서 유휴 스레드를 꺼내 작업 할당
3. 유휴 스레드가 없으면 **작업 큐에 대기**
4. 스레드는 작업 완료 후 **풀로 반환** (재사용)

```
  요청 → [작업 큐: T1, T2, T3, ...]
              ↓
         ┌────────────────────────┐
         │      Thread Pool       │
         │  [t1] [t2] [t3] [t4]  │  ← 미리 생성된 스레드
         │  실행  대기  실행  대기  │
         └────────────────────────┘
              ↓
         작업 완료 → 스레드 풀로 반환
```

### 이점

| 이점 | 설명 |
|------|------|
| **빠른 응답** | 미리 생성된 스레드 사용 → 생성 대기 시간 없음 |
| **자원 제한** | 스레드 수 상한 설정 → 자원 고갈 방지 |
| **작업/스레드 분리** | 다양한 실행 전략 적용 가능 (지연, 주기적 실행 등) |

### 암시적 스레딩 (Implicit Threading)

스레드 풀은 암시적 스레딩의 대표적 패턴입니다. 개발자는 작업(task)만 정의하고, 스레드 관리는 라이브러리에 위임합니다.

### 풀 크기 결정

- CPU 바운드 작업: 코어 수와 비슷하게
- I/O 바운드 작업: 코어 수보다 많이 (I/O 대기 시간 활용)

## 예시

콜센터 상담원 풀과 같습니다. 고객 전화가 올 때마다 새 상담원을 고용하지 않고, 미리 고용된 상담원 중 대기 중인 사람이 응대합니다. 모두 통화 중이면 고객은 대기열에서 기다립니다.

### Java Executor Framework

```java
ExecutorService pool = Executors.newFixedThreadPool(10);   // 고정 크기
ExecutorService cached = Executors.newCachedThreadPool();   // 동적 크기

pool.execute(new Task());                    // Runnable 제출
Future<T> result = pool.submit(new Callable());  // Callable 제출
pool.shutdown();
```

| 유형 | 메서드 | 특징 |
|------|--------|------|
| Single | `newSingleThreadExecutor()` | 크기 1, 순차 실행 보장 |
| Fixed | `newFixedThreadPool(n)` | 고정 n개 스레드 |
| Cached | `newCachedThreadPool()` | 필요 시 생성, 유휴 시 회수 |

## 관련 개념

- [스레드 (Thread)](/knowledge/os/thread/)
- [멀티스레딩 모델](/knowledge/os/multithreading-models/)
- [데이터 병렬성 vs 태스크 병렬성](/knowledge/os/data-vs-task-parallelism/)
