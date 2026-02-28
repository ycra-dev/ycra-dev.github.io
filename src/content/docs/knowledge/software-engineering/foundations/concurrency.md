---
title: "Concurrency"
description: "여러 작업이 시간적으로 겹쳐서 실행되는 프로그래밍 모델"
tags: ["Software Engineering", "Threading", "Parallel Programming"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/concurrency
sidebar:
  order: 13
---

## 핵심 개념

동시성(Concurrency)은 여러 작업이 시간적으로 겹쳐서 실행되는 프로그래밍 모델이다. 멀티스레딩, 비동기 프로그래밍, 병렬 처리 등을 포함한다. 소프트웨어 개발에서 가장 어려운 영역 중 하나이다.

## 동작 원리

주요 동시성 문제:
- **경쟁 조건(Race Condition)**: 여러 스레드가 공유 자원에 동시 접근하여 예측 불가능한 결과 발생
- **교착 상태(Deadlock)**: 두 이상의 스레드가 서로의 자원을 기다리며 영원히 대기
- **하이젠버그(Heisenbug)**: 관찰(디버깅)하면 사라지는 동시성 버그. 타이밍에 의존하므로 재현이 어려움
- **메모리 가시성(Memory Visibility)**: 한 스레드의 변경이 다른 스레드에서 즉시 보이지 않을 수 있음

방어 전략:
- 가능하면 공유 상태를 피한다 (불변 객체, 메시지 패싱)
- 공유가 불가피하면 적절한 동기화 메커니즘 사용 (뮤텍스, 세마포어)
- 동시성 코드는 가능한 한 단순하게 유지

## 예시

```python
import threading

# 경쟁 조건 예시
counter = 0

def increment():
    global counter
    for _ in range(100000):
        counter += 1  # 원자적이지 않음! read-modify-write

# 해결: Lock 사용
lock = threading.Lock()
counter = 0

def safe_increment():
    global counter
    for _ in range(100000):
        with lock:
            counter += 1
```

## 관련 개념

- [Defensive Programming](/knowledge/software-engineering/foundations/defensive-programming/)
- [Debugging](/knowledge/software-engineering/foundations/debugging/)
- [Heisenbug](/knowledge/software-engineering/foundations/heisenbug/)
- [Immutability](/knowledge/software-engineering/foundations/immutability/)
