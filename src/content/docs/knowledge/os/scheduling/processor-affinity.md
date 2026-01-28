---
title: "프로세서 친화성 (Processor Affinity)"
description: "프로세스/스레드가 특정 프로세서에서 계속 실행되도록 하여 캐시 효율을 높이는 스케줄링 정책"
tags: ["OS", "Scheduling", "Multiprocessor"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/processor-affinity
sidebar:
  order: 11
---

## 핵심 개념

프로세서 친화성(Processor Affinity)이란 **프로세스나 스레드가 특정 CPU에서 계속 실행되도록 하는 정책**이다.

왜 필요할까? CPU마다 **캐시(cache)**가 있다. 프로세스가 CPU 0에서 실행되면, CPU 0의 캐시에 해당 프로세스의 데이터가 올라간다. 만약 다음에도 CPU 0에서 실행하면 캐시에 데이터가 남아있어 빠르다(**Warm Cache**). 하지만 CPU 1로 옮기면 캐시를 처음부터 다시 채워야 하므로 느리다(**Cold Cache**).

## 동작 원리

### Warm Cache vs Cold Cache

```
                CPU 0                          CPU 1
          ┌──────────────┐              ┌──────────────┐
          │  Cache (Warm) │              │  Cache (Cold) │
          │  프로세스 A의  │              │  (비어 있음)   │
          │  데이터 있음   │              │               │
          └──────────────┘              └──────────────┘

  프로세스 A가 CPU 0에서       프로세스 A가 CPU 1로 이동하면
  계속 실행 → 캐시 히트!       캐시 미스 → 다시 데이터 로드
```

### 소프트 친화성 vs 하드 친화성

| 구분 | 소프트 친화성 (Soft Affinity) | 하드 친화성 (Hard Affinity) |
|------|-------------------------------|------------------------------|
| **동작** | OS가 같은 CPU에서 실행하려고 **시도** | 반드시 지정된 CPU에서만 실행 |
| **보장** | 보장 안 됨 (부하 상황에 따라 이동 가능) | 보장됨 |
| **설정** | OS 기본 정책 | 명시적 시스템 콜 필요 |
| **Linux** | 기본 동작 | `sched_setaffinity()` |

### Linux에서 하드 친화성 설정

```c
#define _GNU_SOURCE
#include <sched.h>

cpu_set_t mask;
CPU_ZERO(&mask);           // 마스크 초기화
CPU_SET(0, &mask);         // CPU 0만 사용하도록 설정
CPU_SET(2, &mask);         // CPU 2도 추가

// 현재 프로세스를 CPU 0, 2에서만 실행
sched_setaffinity(0, sizeof(mask), &mask);
```

명령줄에서는 `taskset` 명령으로 설정할 수 있다:

```bash
taskset -c 0,2 ./my_program   # CPU 0, 2에서만 실행
```

### NUMA와 프로세서 친화성

**NUMA(Non-Uniform Memory Access)** 아키텍처에서 프로세서 친화성은 특히 중요하다. NUMA에서는 각 CPU가 "로컬 메모리"를 가지며, 로컬 메모리 접근이 다른 CPU의 메모리(원격 메모리) 접근보다 **훨씬 빠르다**.

프로세스가 다른 CPU로 이동하면:
1. 캐시 데이터를 잃고 (Cold Cache)
2. 기존 로컬 메모리가 원격 메모리가 되어 접근 속도 저하

### 친화성 vs 부하 균형 트레이드오프

프로세서 친화성과 부하 균형(Load Balancing)은 상충 관계에 있다:

- **친화성 우선**: 캐시 효율은 좋지만, 특정 CPU에 부하 집중 가능
- **부하 균형 우선**: 부하는 고르지만, 프로세스 이동 시 캐시 효율 저하

OS 스케줄러는 이 둘 사이에서 적절한 균형을 찾아야 한다.

## 예시

데이터베이스 서버에서의 활용:

- DB 워커 스레드를 특정 CPU에 고정 → 캐시 히트율 향상
- NUMA 노드의 로컬 메모리에 DB 버퍼 할당 → 메모리 접근 지연 최소화
- 네트워크 인터럽트 처리 CPU와 DB 워커 CPU를 분리 → 간섭 최소화

## 관련 개념

- [멀티프로세서 스케줄링](/knowledge/os/multiprocessor-scheduling/) - 다중 CPU 환경에서의 스케줄링 전략
- [캐시 (Cache)](/knowledge/os/cache/) - 프로세서 친화성이 캐시 효율에 미치는 영향
