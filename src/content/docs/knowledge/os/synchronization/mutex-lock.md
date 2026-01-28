---
title: "뮤텍스 락 (Mutex Lock)"
description: "acquire(잠금)와 release(해제) 연산으로 임계구역을 보호하는 상호배제 도구"
tags: ["OS", "Synchronization"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/mutex-lock
sidebar:
  order: 7
---

## 핵심 개념

Mutex Lock은 **MUTual EXclusion**의 줄임말로, `acquire()`와 `release()` 연산으로 임계구역을 보호하는 동기화 도구이다. 하드웨어 동기화 명령어는 저수준이라 응용 프로그래머가 직접 사용하기 어려우므로, OS 설계자가 하드웨어 기반으로 더 쉬운 고수준 도구를 제공한 것이다.

비유하면, 화장실 문 잠금장치와 같다. 들어갈 때 잠그고(acquire), 나올 때 해제한다(release). 잠겨 있으면 기다린다.

## 동작 원리

### 사용 구조

```c
while (true) {
    acquire(lock);      // 진입 - lock 획득

    /* critical section */

    release(lock);      // 퇴출 - lock 반환

    /* remainder section */
}
```

### acquire()와 release() 정의

```c
acquire() {
    while (!available)
        ;  // busy wait (spinlock 방식)
    available = false;
}

release() {
    available = true;
}
```

`available` 불린 변수로 lock 상태를 관리하며, `acquire()`와 `release()`는 CAS 기반으로 원자적으로 실행된다.

### Spinlock vs Sleep Lock

| 특성 | Spinlock | Sleep Lock |
|-----|----------|------------|
| 대기 방식 | Busy waiting (반복 확인) | 프로세스를 waiting 상태로 전환 |
| CPU 사용 | 대기 중 CPU 계속 사용 | 대기 중 CPU 양보 |
| Context Switch | 없음 | 2회 필요 (sleep → wakeup) |
| 적합한 상황 | 짧은 임계구역, 멀티코어 | 긴 임계구역, 단일코어 |

**"Short Duration"의 기준**: Lock 유지 시간이 2회의 context switch 시간보다 짧으면 Spinlock이 유리하다.

### Lock Contention

| 유형 | 설명 |
|-----|------|
| **Uncontended** | Lock 획득 시 바로 사용 가능 |
| **Low Contention** | 적은 수의 스레드가 경쟁 |
| **High Contention** | 많은 스레드가 경쟁 → 성능 저하 |

## 예시

- 파일 접근 시 여러 스레드가 동시에 쓰기 방지
- 공유 자료구조(리스트, 큐 등) 수정 시 일관성 보장

## 관련 개념

- [임계구역 문제 (Critical Section)](/knowledge/os/critical-section/) - Mutex가 해결하는 기본 문제
- [하드웨어 동기화 명령어](/knowledge/os/hardware-instructions/) - Mutex의 기반이 되는 원자적 명령어
- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/) - Mutex와 함께 사용하는 동기화 도구
- [교착 상태 (Deadlock)](/knowledge/os/deadlock/) - Mutex 잘못 사용 시 발생 가능
