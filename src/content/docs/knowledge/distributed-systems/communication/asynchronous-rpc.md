---
title: "Asynchronous RPC"
description: "비동기 RPC(Asynchronous RPC)는 서버가 요청을 수신하면 즉시 확인 응답(acknowledgment)을 보낸 후 클라이언트를 블로킹하지 않고 요청을 처리하는 RPC 변형이다"
tags: ['Asynchronous Rpc', 'Deferred Synchronous', 'One Way Rpc', 'Multicast Rpc', 'Callback', 'Non Blocking']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/asynchronous-rpc
sidebar:
  order: 4
---

## 핵심 개념

**전통적 RPC의 한계**: 클라이언트가 요청 후 서버의 응답까지 블로킹됨. 결과가 불필요하거나 여러 서버에 동시 요청이 필요할 때 비효율적.

**비동기 RPC의 3가지 변형**:

1. **비동기 RPC (Asynchronous RPC)**:
   - 서버가 요청 수신 즉시 확인 응답 전송 → 클라이언트 블로킹 해제.
   - 서버는 이후 로컬에서 요청 처리.
   - 반환 값이 없는 경우에 적합.

2. **지연 동기 RPC (Deferred Synchronous RPC)**:
   - 비동기 RPC + 콜백의 결합.
   - 클라이언트가 요청을 보내고 확인을 받은 후 계속 실행.
   - 서버가 결과를 준비하면 클라이언트에 콜백(callback) 발생.
   - 콜백은 별도 스레드에서 이벤트 발생을 대기하는 방식으로 구현.
   - 대안: 클라이언트가 서버에 폴링하여 결과 확인.

3. **일방향 RPC (One-way RPC)**:
   - 확인 응답도 기다리지 않고 즉시 계속 실행.
   - 가장 빠르지만 신뢰성 보장 없음 (요청이 처리될지 알 수 없음).

**멀티캐스트 RPC**:
- 일방향 RPC를 활용하여 여러 서버에 동시에 RPC 요청 전송.
- 각 서버가 독립적으로 병렬 처리 후 결과를 콜백으로 반환.
- **사용 사례**:
  - 장애 허용: 백업 서버가 동일 작업 수행. 첫 번째 응답만 대기하거나 과반수 일치 확인.
  - 작업 분할: 동일 작업을 다른 입력 부분에 대해 수행. 결과 병합 후 클라이언트 계속.
- 서버 복제가 클라이언트에 완전히 숨겨질 수 있음 (전송 계층 멀티캐스트 주소 활용).

## 예시

```
# 전통적 RPC vs 비동기 RPC vs 지연 동기 RPC

# (a) 전통적 RPC
클라이언트: 요청 ──────────────→ 서버
           대기 (블로킹)         처리 중...
           ←────────────── 결과  처리 완료

# (b) 비동기 RPC
클라이언트: 요청 ──────────────→ 서버
           ←── 확인 (ACK)       처리 시작
           계속 실행              처리 중...

# (c) 지연 동기 RPC (콜백)
클라이언트: 요청 ──────────────→ 서버
           ←── 확인 (ACK)       처리 시작
           계속 실행              처리 중...
           ← 콜백(결과) ──────── 처리 완료

# (d) 멀티캐스트 RPC
클라이언트: 요청 ─→ 서버 A (처리 중) → 콜백
           요청 ─→ 서버 B (처리 중) → 콜백
           계속 실행
           모든 콜백 수신 후 결과 병합
```

## 관련 개념

- [Remote Procedure Call](/knowledge/distributed-systems/remote-procedure-call/)
- [Multicast Communication](/knowledge/distributed-systems/multicast-communication/)
- [Publish-Subscribe](/knowledge/distributed-systems/publish-subscribe/)
- [Socket](/knowledge/distributed-systems/socket/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
