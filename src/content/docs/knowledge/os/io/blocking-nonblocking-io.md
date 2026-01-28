---
title: "블로킹 vs 논블로킹 I/O"
description: "I/O 완료 시까지 스레드를 대기시키는 블로킹과 즉시 반환하는 논블로킹 I/O의 차이"
tags: ["OS", "I/O", "Blocking", "Non-blocking", "Async"]
created: 2026-01-23
updated: 2026-01-27
draft: false
slug: knowledge/os/blocking-nonblocking-io
sidebar:
  order: 5
---

## 핵심 개념

**Blocking I/O**는 I/O 완료까지 호출 스레드가 대기 상태로 전환되는 방식입니다.
**Non-blocking I/O**는 I/O 완료 여부와 관계없이 즉시 반환하여 스레드가 계속 실행되는 방식입니다.

I/O 장치는 CPU보다 훨씬 느려서, 두 방식은 대기 시간을 어떻게 처리할지에 대한 서로 다른 접근법을 제공합니다.

## 동작 원리

### Blocking I/O

1. 프로세스가 blocking 시스템 콜 호출 (예: read())
2. 커널이 프로세스를 run queue에서 wait queue로 이동
3. I/O 완료 후 프로세스를 다시 run queue로 이동
4. 재개 시 시스템 콜 결과값 반환

### Non-blocking I/O

1. 프로세스가 non-blocking 시스템 콜 호출
2. 즉시 반환 (현재 가능한 만큼의 데이터와 함께)
3. 프로세스가 직접 다시 확인하거나 다른 작업 수행

### 비교표

| 구분 | Blocking | Non-blocking | Asynchronous |
|------|----------|--------------|--------------|
| 반환 시점 | I/O 완료 후 | 즉시 | 즉시 |
| 반환값 | 전체 데이터 | 가능한 만큼 (0~전체) | 없음 (나중에 통보) |
| 완료 통보 | 필요 없음 | 직접 확인 필요 | 시그널/콜백으로 통보 |
| 사용 예 | 일반 파일 읽기 | select() | aio_read() |

## 예시

```c
// Blocking
read(fd, buf, size);  // 완료까지 대기
process_data(buf);    // 완료 후 실행

// Non-blocking
while ((n = read(fd, buf, size)) == -EAGAIN) {
    do_other_work();  // 데이터 없으면 다른 작업
}
process_data(buf);
```

**비유:**
- **Blocking**: 전화 통화. 상대방이 받을 때까지 전화기 앞에서 기다림
- **Non-blocking**: 문자 메시지. 보내고 바로 다른 일 할 수 있음. 답장 오면 나중에 확인

## 트레이드오프

**Blocking:**
- 장점: 프로그래밍 단순, 순차적 로직
- 단점: 스레드가 대기 상태로 묶임, 동시성 제한

**Non-blocking:**
- 장점: 스레드가 다른 작업 가능, 반응성 좋음
- 단점: 폴링 필요, 코드 복잡도 증가

## 관련 개념

- [[interrupt-driven-io|인터럽트 기반 I/O]]
- [[device-driver|디바이스 드라이버]]
- [[buffering|버퍼링]]
