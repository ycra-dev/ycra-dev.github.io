---
title: "메모리 배리어 (Memory Barrier)"
description: "메모리 연산의 순서를 강제하여 명령어 재정렬을 방지하는 하드웨어 명령어"
tags: ["OS", "Synchronization", "Hardware"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/memory-barrier
sidebar:
  order: 5
---

## 핵심 개념

메모리 배리어(Memory Barrier)는 **메모리 연산의 순서를 강제**하여 명령어 재정렬을 방지하는 하드웨어 명령어이다. 현대 프로세서와 컴파일러는 성능 최적화를 위해 의존성 없는 명령어를 재정렬하는데, 단일 스레드에서는 문제없지만 멀티스레드 환경에서는 예상치 못한 결과가 발생한다.

비유하면, 줄서기 바리케이드와 같다. 바리케이드 전에 온 사람들이 모두 통과해야 바리케이드 뒤의 사람들이 이동할 수 있다.

## 동작 원리

Memory barrier 명령 실행 시:
- 그 이전의 모든 load/store가 **완료됨을 보장**
- Barrier 이후의 load/store는 barrier 이전 명령보다 **먼저 실행되지 않음**
- 다른 프로세서에도 메모리 변경 사항이 전파됨

### Memory Model 유형

| 유형 | 설명 |
|------|------|
| **Strongly Ordered** | 한 프로세서의 메모리 수정이 즉시 다른 모든 프로세서에 보임 |
| **Weakly Ordered** | 메모리 수정이 다른 프로세서에 즉시 보이지 않을 수 있음 |

## 예시

### 문제 상황 (barrier 없이)

```c
// Thread 2
x = 100;
flag = true;
// 프로세서가 flag = true를 먼저 실행할 수 있음!

// Thread 1
while (!flag);
print x;  // 0이 출력될 수 있음
```

### 해결 (barrier 적용)

```c
// Thread 2
x = 100;
memory_barrier();   // x=100이 완료된 후에만 다음 실행
flag = true;

// Thread 1
while (!flag)
    memory_barrier();  // flag 로드 후에만 x 로드
print x;  // 100 출력 보장
```

### Peterson's Solution에 적용

```c
flag[i] = true;
memory_barrier();    // 재정렬 방지
turn = j;
```

## 관련 개념

- [하드웨어 동기화 명령어](/knowledge/os/hardware-instructions/) - test_and_set, CAS 등 원자적 명령어
- [임계구역 문제 (Critical Section)](/knowledge/os/critical-section/) - 동기화의 기본 문제
- [캐시 일관성 (Cache Coherency)](/knowledge/os/cache-coherency/) - 멀티프로세서 캐시 동기화
