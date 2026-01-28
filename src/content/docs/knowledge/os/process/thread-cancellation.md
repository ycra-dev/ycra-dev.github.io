---
title: "스레드 취소 (Thread Cancellation)"
description: "스레드가 정상 완료 전에 종료되는 것으로, 비동기 취소와 지연 취소 두 가지 방식"
tags: ["OS", "Thread", "Concurrency"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/thread-cancellation
sidebar:
  order: 14
---

## 핵심 개념

스레드 취소(Thread Cancellation)는 스레드가 정상적으로 완료되기 전에 강제로 종료시키는 것으로, 비동기 취소와 지연 취소 두 가지 방식이 있습니다. 더 이상 필요 없는 스레드가 계속 실행되면 자원이 낭비됩니다.

## 동작 원리

### 비동기 취소 (Asynchronous Cancellation)

- 대상 스레드를 **즉시 종료**
- 자원 해제 기회 없이 종료 → 메모리 누수, 데이터 불일치 위험
- **비권장**

### 지연 취소 (Deferred Cancellation)

- 대상 스레드가 **주기적으로 취소 요청을 확인**
- 안전한 지점(cancellation point)에서만 종료
- 정리(cleanup) 후 종료 가능 → **권장**

```
비동기 취소:
Main ──► cancel(T) ──────────────────────►
Thread T: [작업 중...█▌ X ← 즉시 종료 (위험)

지연 취소:
Main ──► cancel(T) ──────────────────────►
Thread T: [작업 중][체크][작업][체크 → 종료]
                    ↓         ↓
              "아직 취소 안됨"  "취소 요청 확인, 정리 후 종료"
```

### Pthreads 취소 모드

| 모드 | State | Type | 동작 |
|------|-------|------|------|
| Off | Disabled | - | 취소 불가, 요청은 보류 |
| Deferred | Enabled | Deferred | 취소점에서만 취소 (기본값) |
| Asynchronous | Enabled | Asynchronous | 즉시 취소 |

```c
pthread_t tid;
pthread_create(&tid, NULL, worker, NULL);
pthread_cancel(tid);       // 취소 요청
pthread_join(tid, NULL);   // 종료 대기

// 대상 스레드 내부 (Deferred 모드)
while (1) {
    // 작업 수행
    pthread_testcancel();  // 취소점: 여기서 취소 여부 확인
}
```

### Cleanup Handler

```c
void cleanup(void *arg) {
    free(arg);  // 자원 해제
}

pthread_cleanup_push(cleanup, resource);
// 작업 수행
pthread_cleanup_pop(1);  // 핸들러 실행
```

### Java 스레드 취소

Java는 지연 취소와 유사한 `interrupt()` 방식을 사용합니다.

```java
Thread worker = new Thread(() -> {
    while (!Thread.currentThread().isInterrupted()) {
        // 작업 수행
    }
    // 정리 작업
});
worker.start();
worker.interrupt();  // 인터럽트 요청
```

## 예시

- **비동기 취소**: 전화 통화 중 갑자기 전화기를 뺏어버림 → 상대방은 갑작스럽게 끊긴 상태
- **지연 취소**: "잠시 후 끊을게요" 신호 → 상대방이 마무리 인사 후 정상 종료

| 특성 | 비동기 취소 | 지연 취소 |
|------|-------------|-----------|
| 종료 시점 | 즉시 | 취소점 도달 시 |
| 자원 정리 | 어려움 | 가능 |
| 데이터 일관성 | 위험 | 안전 |
| 권장 여부 | **비권장** | **권장** |

## 관련 개념

- [스레드 (Thread)](/knowledge/os/thread/)
- [스레드 풀 (Thread Pool)](/knowledge/os/thread-pool/)
- [프로세스 (Process)](/knowledge/os/process/)
