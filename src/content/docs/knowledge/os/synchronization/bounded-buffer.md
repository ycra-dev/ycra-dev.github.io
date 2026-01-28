---
title: "유한 버퍼 문제 (Bounded-Buffer Problem)"
description: "고정 크기 버퍼를 공유하는 생산자와 소비자 프로세스 간의 동기화 문제"
tags: ["OS", "Synchronization"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/bounded-buffer
sidebar:
  order: 15
---

## 핵심 개념

유한 버퍼 문제는 **고정 크기 n개의 버퍼 슬롯**을 두고, **생산자**(Producer)는 아이템을 채우고 **소비자**(Consumer)는 아이템을 꺼내는 상황에서의 동기화 문제이다.

비유하면 **컨베이어 벨트 도시락 공장**과 같다. 요리사(생산자)는 빈 도시락 칸에 음식을 채우고, 포장직원(소비자)은 채워진 도시락을 가져간다. 벨트가 가득 차면 요리사는 대기하고, 벨트가 비면 포장직원은 대기한다.

해결해야 하는 3가지 문제:
1. 생산자가 **가득 찬 버퍼**에 쓰려 하면 데이터 손실
2. 소비자가 **빈 버퍼**에서 읽으려 하면 잘못된 데이터 접근
3. 동시 접근 시 **경쟁 조건(Race Condition)** 발생

## 동작 원리

### 3개의 세마포어로 해결

```c
int n;                    // 버퍼 크기
semaphore mutex = 1;      // 상호 배제 (버퍼 접근 보호)
semaphore empty = n;      // 빈 슬롯 수 (초기값 n)
semaphore full = 0;       // 채워진 슬롯 수 (초기값 0)
```

| 세마포어 | 초기값 | 역할 |
|---------|--------|------|
| `mutex` | 1 | 버퍼에 대한 상호 배제 (한 번에 하나만 접근) |
| `empty` | n | 빈 슬롯 개수 추적 (생산자가 대기하는 조건) |
| `full` | 0 | 채워진 슬롯 개수 추적 (소비자가 대기하는 조건) |

### 생산자 코드

```c
while (true) {
    /* 아이템 생산 */
    wait(empty);          // 빈 슬롯 대기 (empty--)
    wait(mutex);          // 임계 영역 진입
    /* 버퍼에 아이템 추가 */
    signal(mutex);        // 임계 영역 퇴장
    signal(full);         // 채워진 슬롯 증가 (full++)
}
```

### 소비자 코드

```c
while (true) {
    wait(full);           // 채워진 슬롯 대기 (full--)
    wait(mutex);          // 임계 영역 진입
    /* 버퍼에서 아이템 제거 */
    signal(mutex);        // 임계 영역 퇴장
    signal(empty);        // 빈 슬롯 증가 (empty++)
    /* 아이템 소비 */
}
```

### 대칭적 관계

```
생산자: full 버퍼를 생산 -> 소비자에게 제공
소비자: empty 버퍼를 생산 -> 생산자에게 제공
```

생산자와 소비자는 서로의 자원을 만들어주는 **대칭적 관계**이다. 생산자는 소비자가 소비할 아이템을 만들고, 소비자는 생산자가 채울 빈 공간을 만든다.

### 전체 흐름 도식

```
         [생산자]               [소비자]
            |                      |
            v                      v
        wait(empty)            wait(full)
            |                      |
            v                      v
        wait(mutex)            wait(mutex)
            |                      |
            v                      v
    +-----------------------------------+
    |  Buffer: [*][*][ ][ ][ ]         |
    |          full=2, empty=3          |
    +-----------------------------------+
            |                      |
            v                      v
       signal(mutex)          signal(mutex)
            |                      |
            v                      v
        signal(full)          signal(empty)
```

## 예시

**프린터 스풀러**: 응용 프로그램(생산자)이 인쇄 작업을 큐에 넣고, 프린터 드라이버(소비자)가 큐에서 작업을 꺼내 인쇄한다.

**주의: wait() 순서가 중요하다!**

```c
// 올바른 순서
wait(empty);    // 먼저 빈 슬롯 확인
wait(mutex);    // 그 다음 임계 영역 진입

// 잘못된 순서 - 교착 상태(Deadlock) 발생!
wait(mutex);    // 임계 영역 먼저 잠금
wait(empty);    // 빈 슬롯이 없으면 영원히 대기
                // mutex를 잡은 채로 대기하므로
                // 소비자도 mutex를 얻지 못해 교착 상태
```

## 관련 개념

- [임계구역 문제](/knowledge/os/critical-section/) - mutex 세마포어가 보호하는 영역
- [조건 변수](/knowledge/os/condition-variable/) - 모니터 기반 대안적 해결법
- [원자적 변수](/knowledge/os/atomic-variable/) - 단일 변수 동기화 (유한 버퍼에는 부족)
