---
title: "Mach 메시지와 IPC"
description: "타입이 지정된 데이터 객체의 집합으로 구성된 Mach 메시지와 Copy-on-Write 기반 효율적 전송"
tags: ["OS", "Mach", "IPC"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/mach-message-ipc
sidebar:
  order: 20
---

## 핵심 개념

Mach 메시지는 스레드 간 통신의 기본 방법으로, **타입이 지정된 데이터 객체의 집합**이다. 전통적 메시지 전달은 데이터를 복사하여 대용량 메시지에서 성능 저하가 심한데, Mach는 **가상 메모리 재매핑(Copy-on-Write)**을 통해 실제 복사 없이 효율적으로 전송한다.

비유하면, 책을 복사해서 주는 대신 같은 책을 함께 읽게 하고, 누군가 메모를 하려 할 때만 복사본을 만드는 것이다.

## 동작 원리

### 메시지 구조

```
┌─────────────────────────────────┐
│         Message Header          │
│  - Destination port name        │
│  - Reply port name              │
│  - Message length               │
├─────────────────────────────────┤
│         Typed Data Objects      │
│  - Simple types (numbers, chars)│
│  - Port rights                  │
│  - Out-of-line data pointers    │
└─────────────────────────────────┘
```

### Copy-on-Write 메시지 전송

1. 대용량 메시지의 경우 데이터를 복사하지 않음
2. 송신자의 주소 공간에서 데이터 영역을 copy-on-write로 설정
3. 수신자의 주소 맵에 해당 페이지를 매핑
4. 실제 복사는 어느 한쪽이 수정할 때만 발생 (lazy copy)

### Out-of-line 데이터

메시지 내 포인터가 대용량 데이터를 참조한다. 커널이 포인터를 처리하여 수신자 주소 공간에 매핑하며, 수신자 주소 공간에 새로운 가상 메모리 영역이 동적 할당된다.

### NetMsgServer (네트워크 메시지 서버)

사용자 수준 데몬으로 컴퓨터 간 메시지 전달을 담당한다:
- 원격 포트에 대한 **프록시 포트** 생성
- 이기종 시스템 간 데이터 형식 변환
- 네트워크 전체의 이름 서비스 제공

### IPC를 이용한 동기화

```c
// 세마포어처럼 사용
msg_receive(port, &msg, ...);  // 자원 획득 (없으면 대기)
msg_send(port, &msg, ...);     // 자원 반환
```

## 예시

Task A가 1MB 데이터를 Task B에게 전송:
1. 커널은 Task A의 해당 메모리 영역을 copy-on-write로 표시
2. Task B의 주소 공간에 같은 물리 페이지를 매핑
3. Task B가 데이터를 읽기만 하면 복사 없음
4. 어느 한쪽이 수정 시 해당 페이지만 복사

## 관련 개념

- [Mach Port](/knowledge/os/mach-port/) - 메시지의 목적지
- [Mach 운영체제](/knowledge/os/mach-overview/) - Mach 전체 구조
- [Copy-on-Write (COW)](/knowledge/os/copy-on-write/) - CoW 메시지 전송의 기반 기법
- [프로세스 간 통신 모델 (IPC Models)](/knowledge/os/ipc-models/) - IPC의 일반 개념
