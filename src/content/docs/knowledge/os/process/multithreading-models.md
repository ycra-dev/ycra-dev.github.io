---
title: "멀티스레딩 모델 (Multithreading Models)"
description: "사용자 스레드와 커널 스레드 간의 매핑 관계를 정의하는 세 가지 모델"
tags: ["OS", "Thread", "Concurrency"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/multithreading-models
sidebar:
  order: 11
---

## 핵심 개념

멀티스레딩 모델은 사용자 스레드와 커널 스레드 간의 매핑 관계를 정의하는 방식입니다. 사용자 스레드를 어떻게 커널 스레드에 매핑하느냐에 따라 동시성, 병렬성, 성능이 달라집니다.

## 동작 원리

### Many-to-One 모델

```
User:   [T1] [T2] [T3] [T4]
              \  |  /
Kernel:       [K1]
```

다수의 사용자 스레드가 하나의 커널 스레드에 매핑됩니다. 스레드 관리가 사용자 공간에서 수행되어 효율적이지만, 하나의 스레드가 블로킹되면 전체 프로세스가 블로킹되고 멀티코어 활용이 불가합니다. 예: 초기 Solaris Green Threads

### One-to-One 모델

```
User:   [T1] [T2] [T3] [T4]
          |    |    |    |
Kernel: [K1] [K2] [K3] [K4]
```

각 사용자 스레드가 각각의 커널 스레드에 매핑됩니다. 블로킹 시 다른 스레드가 계속 실행 가능하고 멀티코어에서 병렬 실행이 가능합니다. **현대 대부분의 OS(Linux, Windows)가 사용**합니다. 단점은 커널 스레드 생성 오버헤드입니다.

### Many-to-Many 모델

```
User:   [T1] [T2] [T3] [T4] [T5]
          \   \ / |  /  /
Kernel:   [K1]  [K2]  [K3]
```

다수의 사용자 스레드가 동등 이하 수의 커널 스레드에 매핑됩니다. 유연하지만 구현이 복잡합니다.

### 비교

| 특성 | Many-to-One | One-to-One | Many-to-Many |
|------|-------------|------------|--------------|
| 멀티코어 병렬성 | 불가 | 가능 | 가능 |
| 블로킹 시스템콜 | 전체 블로킹 | 해당 스레드만 | 해당 스레드만 |
| 스레드 생성 비용 | 낮음 | 높음 | 중간 |
| 현재 사용 | 거의 없음 | **Linux, Windows** | 드물음 |

## 예시

- **Many-to-One**: 여러 학생이 한 명의 과외 선생님과 수업
- **One-to-One**: 각 학생마다 전담 선생님 배정
- **Many-to-Many**: 여러 학생에게 몇 명의 선생님이 유동적으로 지도

## 관련 개념

- [프로세스 (Process)](/knowledge/os/process/)
- [동시성 vs 병렬성](/knowledge/os/concurrency-vs-parallelism/)
- [멀티프로세서 스케줄링](/knowledge/os/multiprocessor-scheduling/)
