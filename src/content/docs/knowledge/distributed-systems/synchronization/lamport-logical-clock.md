---
title: "램포트 논리 시계 (Lamport Logical Clock)"
description: "Lamport 논리 클럭은 분산 시스템에서 절대적인 물리 시간 없이도 이벤트 간의 인과적 순서를 추적하기 위해 Lamport(1978)가 제안한 논리적 시간 메커니즘이다"
tags: ['Logical Clock', 'Lamport Clock', 'Happens Before', 'Event Ordering']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/lamport-logical-clock
sidebar:
  order: 2
---

## 핵심 개념

Lamport의 핵심 통찰은 두 프로세스가 상호작용하지 않으면 클럭 동기화가 불필요하다는 것이다. 중요한 것은 절대 시간이 아니라 이벤트의 순서에 대한 합의이다.

**happens-before 관계(→)**는 두 가지 상황에서 직접 관찰된다:
1. 동일 프로세스 내에서 a가 b 이전에 발생하면 a→b
2. a가 메시지 전송이고 b가 해당 메시지 수신이면 a→b
3. 전이성: a→b이고 b→c이면 a→c

두 이벤트가 위 관계로 연결되지 않으면 **동시적(concurrent)**이라 하며, 순서를 매길 수 없다.

**알고리즘**:
1. 이벤트 실행 전에 Ci ← Ci + 1 (카운터 증가)
2. 메시지 전송 시 현재 Ci 값을 타임스탬프 ts(m)으로 첨부
3. 메시지 수신 시 Cj ← max{Cj, ts(m)} 후 Cj ← Cj + 1

타이 브레이킹: 동일 타임스탬프의 이벤트는 프로세스 ID로 구별. 예: (40, i) < (40, j) (i < j일 때).

**한계**: C(a) < C(b)라고 해서 반드시 a→b인 것은 아님. 즉, 인과관계를 완전히 포착하지 못한다 (벡터 클럭이 필요한 이유).

## 예시

```python
class LamportClock:
    def __init__(self, process_id):
        self.time = 0
        self.pid = process_id

    def local_event(self):
        self.time += 1
        return self.time

    def send_message(self):
        self.time += 1
        return (self.time, self.pid)  # 타임스탬프 첨부

    def receive_message(self, msg_timestamp):
        self.time = max(self.time, msg_timestamp) + 1
        return self.time

# P1: clock=6에서 m1 전송 → P2: clock=max(16,6)+1=17로 조정
# P3: clock=60에서 m3 전송 → P2: clock=max(56,60)+1=61로 조정
```

## 관련 개념

- [벡터 시계 (Vector Clock)](/knowledge/distributed-systems/vector-clock/)
- [전순서 멀티캐스트 (Totally Ordered Multicast)](/knowledge/distributed-systems/totally-ordered-multicast/)
- [시계 동기화 (Clock Synchronization)](/knowledge/distributed-systems/clock-synchronization/)
- [상호 배제 (Mutual Exclusion)](/knowledge/distributed-systems/mutual-exclusion/)
