---
title: "Polling"
description: "CPU가 장치의 상태 레지스터를 반복적으로 읽어 장치가 준비되었는지 확인하는 I/O 방식"
tags: ["OS", "I/O", "Synchronization"]
created: 2026-01-23
updated: 2026-01-27
slug: knowledge/os/polling
sidebar:
  order: 1
---

## 핵심 개념

CPU가 장치의 상태 레지스터를 반복적으로 읽어 장치가 준비되었는지 확인하는 I/O 방식입니다. CPU와 장치 간의 속도 차이로 인한 동기화 문제를 해결하는 가장 단순한 방법으로, 추가 하드웨어 없이 소프트웨어만으로 구현할 수 있습니다.

## 동작 원리 (Handshaking Protocol)

장치 컨트롤러에 상태를 나타내는 busy 비트와 명령 준비를 나타내는 command-ready 비트가 있다고 가정합니다:

1. 호스트가 busy 비트가 0이 될 때까지 반복 읽기 (busy-waiting)
2. 호스트가 command 레지스터에 쓰기 비트 설정, data-out 레지스터에 데이터 쓰기
3. 호스트가 command-ready 비트를 1로 설정
4. 컨트롤러가 command-ready를 감지하면 busy 비트를 1로 설정
5. 컨트롤러가 명령 실행 후 command-ready, error, busy 비트를 모두 0으로 클리어

## 예시

### 프린터 출력

프린터에 데이터를 보낼 때, CPU가 프린터 상태 레지스터를 계속 확인하면서 "준비됐어?"라고 묻고, 준비되면 다음 바이트를 전송합니다.

### 코드 예시

```c
while (status_register & BUSY_BIT) {
    // busy-waiting: CPU가 계속 상태 확인
}
data_out_register = data;
command_register = WRITE_COMMAND;
```

## 장단점

### 장점

- 구현이 단순함 (3개의 CPU 명령어로 가능: read, AND, branch)
- 장치가 빠르게 응답하면 오버헤드가 적음
- 추가 하드웨어(인터럽트 컨트롤러) 불필요

### 단점

- 장치가 느리면 CPU 사이클 낭비 (busy-waiting)
- 대기 중 다른 작업 수행 불가
- 고처리량 I/O에서는 인터럽트보다 효율적일 수 있음 (하이브리드 전략)

## 관련 개념

- [[Memory-Mapped I/O]]
- [[인터럽트 기반 I/O]]
