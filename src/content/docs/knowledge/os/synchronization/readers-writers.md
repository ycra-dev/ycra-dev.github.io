---
title: "읽기-쓰기 문제 (Readers-Writers Problem)"
description: "다수의 읽기/쓰기 프로세스가 공유 데이터에 접근할 때 동시성과 일관성을 보장하는 동기화 문제"
tags: ["OS", "Synchronization"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/readers-writers
sidebar:
  order: 16
---

## 핵심 개념

읽기-쓰기 문제(Readers-Writers Problem)는 다수의 읽기 프로세스(reader)와 쓰기 프로세스(writer)가 공유 데이터에 접근할 때 **동시성과 일관성을 보장**하는 동기화 문제이다. 여러 reader의 동시 읽기는 안전하지만, writer와 다른 프로세스가 동시에 접근하면 데이터가 손상된다. 단순 mutex를 사용하면 reader들도 순차 접근해야 하므로 불필요한 성능 저하가 발생한다.

비유하면, 도서관 열람실이다. 여러 사람이 동시에 같은 책을 읽을 수 있지만, 사서가 책 내용을 수정할 때는 모두 나가야 한다.

## 동작 원리

### 자료 구조 (1차 해법: Reader 우선)

```c
semaphore rw_mutex = 1;    // reader-writer 상호 배제
semaphore mutex = 1;       // read_count 보호
int read_count = 0;        // 현재 읽기 중인 reader 수
```

### Writer 코드

```c
while (true) {
    wait(rw_mutex);        // 독점 접근 획득
    /* 쓰기 수행 */
    signal(rw_mutex);      // 독점 접근 해제
}
```

### Reader 코드

```c
while (true) {
    wait(mutex);
    read_count++;
    if (read_count == 1)   // 첫 번째 reader가
        wait(rw_mutex);    // writer 차단
    signal(mutex);

    /* 읽기 수행 */

    wait(mutex);
    read_count--;
    if (read_count == 0)   // 마지막 reader가
        signal(rw_mutex);  // writer 허용
    signal(mutex);
}
```

### 두 가지 변형

| 변형 | 정책 | 기아 위험 |
|------|------|----------|
| **1차 문제** | Reader 우선 — reader가 있으면 새 reader 즉시 진입 | **Writer 기아** |
| **2차 문제** | Writer 우선 — writer 대기 중이면 새 reader 차단 | **Reader 기아** |

### Reader-Writer Lock

일반화된 해법으로 시스템이 **reader-writer lock**을 제공한다.

- **read mode**: 여러 스레드 동시 획득 가능
- **write mode**: 하나의 스레드만 배타적 획득

읽기/쓰기 프로세스를 명확히 구분할 수 있고, 읽기가 쓰기보다 많을 때 적합하다.

## 예시

- 데이터베이스: 대부분 읽기 쿼리, 간헐적 갱신 → 동시 읽기 허용으로 처리량 향상
- 웹 애플리케이션 캐시: 읽기 요청이 빈번하고 간헐적으로 캐시 갱신

## 관련 개념

- [유한 버퍼 문제 (Bounded-Buffer)](/knowledge/os/bounded-buffer/) - 생산자-소비자 동기화
- [식사하는 철학자 문제](/knowledge/os/dining-philosophers/) - 순환 대기 교착 상태 모델
- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 기본 상호배제 도구
- [경쟁 조건 (Race Condition)](/knowledge/os/race-condition/) - 동기화가 없을 때 발생하는 문제
