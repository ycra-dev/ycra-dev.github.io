---
title: "Thread"
description: "스레드(Thread)는 프로세스 내에서 독립적으로 실행되는 제어 흐름으로, 프로세스보다 가벼운 실행 단위이다"
tags: ['Thread', 'Concurrency', 'Multithreading', 'User Level Thread', 'Kernel Thread', 'Context Switch']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/thread
sidebar:
  order: 1
---

## 핵심 개념

**프로세스와 스레드의 관계**: 프로세서 컨텍스트 ⊂ 스레드 컨텍스트 ⊂ 프로세스 컨텍스트. 프로세스는 완전한 독립 주소 공간을 가지지만, 스레드는 같은 프로세스 내에서 데이터를 공유한다. 프로세스 생성과 컨텍스트 스위칭은 MMU 변경, TLB 플러시 등으로 비용이 크다.

**분산 시스템에서 스레드의 중요성**:
- **블로킹 회피**: 한 스레드가 I/O로 블로킹되어도 다른 스레드 실행 가능. 특히 네트워크 통신에서 중요.
- **멀티스레드 클라이언트**: 웹 브라우저가 HTML 파싱 후 이미지, CSS 등을 별도 스레드로 병렬 다운로드. 멀티코어 활용.
- **멀티스레드 서버**: 디스패처/워커 모델. 디스패처 스레드가 요청 수신 후 워커 스레드에 할당. 단일 스레드 서버나 유한 상태 머신 대비 프로그래밍이 단순.

**스레드 구현 모델**:
1. **다대일(Many-to-One)**: 사용자 수준 스레드. 생성/전환이 저렴하나 블로킹 시스템 콜이 전체 프로세스를 블록. Python 표준 구현이 이 모델.
2. **일대일(One-to-One)**: 커널 수준 스레드. 각 스레드가 독립적으로 스케줄 가능하나 생성/전환 비용이 높음.
3. **다대다(Many-to-Many)**: 사용자 스레드를 커널 스레드에 매핑하는 하이브리드 모델. Go 언어가 이 모델을 채택. 사용자 수준에서 스레드를 관리하면서도 블로킹 콜 문제를 해결.

**컨텍스트 스위치 비용**: 직접 오버헤드(레지스터 저장/복원, 약 0.5-1 마이크로초)보다 간접 오버헤드(캐시 교란)가 약 80%를 차지하여 성능에 더 큰 영향.

## 예시

```python
# 멀티스레드 서버의 디스패처/워커 모델
from threading import Thread

class MultithreadedServer:
    def dispatcher(self):
        while True:
            request = wait_for_request()     # 요청 수신
            worker = get_idle_worker()        # 유휴 워커 선택
            worker.assign(request)            # 요청 할당

    def worker(self):
        while True:
            request = wait_for_assignment()   # 할당 대기
            data = blocking_disk_read(request.file)  # 블로킹 I/O
            # 이 스레드가 블로킹되는 동안 다른 워커가 실행됨
            send_response(request.client, data)

# 서버 구현 방식 비교
# | 모델              | 특성                           |
# |-------------------|-------------------------------|
# | 멀티스레딩         | 병렬성 O, 블로킹 시스템 콜    |
# | 단일 스레드 프로세스 | 병렬성 X, 블로킹 시스템 콜    |
# | 유한 상태 머신      | 병렬성 O, 논블로킹 시스템 콜  |
```

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Service-Oriented Architecture](/knowledge/distributed-systems/service-oriented-architecture/)
- [Scalability](/knowledge/distributed-systems/scalability/)
- [Virtualization](/knowledge/distributed-systems/virtualization/)
