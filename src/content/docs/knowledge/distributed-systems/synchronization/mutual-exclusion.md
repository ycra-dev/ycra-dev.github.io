---
title: "상호 배제 (Mutual Exclusion)"
description: "상호 배제(Mutual Exclusion)는 분산 시스템에서 여러 프로세스가 공유 자원에 동시에 접근하는 것을 방지하여, 한 번에 하나의 프로세스만이 임계 영역(critical region)에 진입할 수 있도록 보장하는 조정 메커니즘이다"
tags: ['Mutual Exclusion', 'Distributed Algorithm', 'Coordination', 'Critical Region']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/mutual-exclusion
sidebar:
  order: 5
---

## 핵심 개념

분산 상호 배제 알고리즘은 크게 **토큰 기반**과 **허가 기반**으로 분류된다.

**1. 중앙 집중식 알고리즘**: 하나의 코디네이터가 자원 접근을 관리. 요청 → 승인 → 해제의 3개 메시지만 필요. 단순하고 효율적이나 단일 장애점(SPOF) 문제 존재.

**2. 분산 알고리즘 (Ricart-Agrawala)**: Lamport 논리 클럭 기반. 자원 접근을 원하는 프로세스가 모든 다른 프로세스에 요청 전송. 수신자는 자신이 자원을 사용 중이면 큐잉, 미사용이면 OK 응답, 자신도 원하면 타임스탬프 비교하여 낮은 쪽이 승리. 2(N-1)개의 메시지 필요.

**3. 토큰 링 알고리즘**: 논리적 링을 구성하고 토큰을 순환. 토큰 보유자만 자원 접근 가능. 메시지 수는 가변적(1~∞). 토큰 분실 시 복구가 어려움.

**4. 분산 투표 알고리즘**: 자원을 N번 복제하고 각 복제본에 코디네이터 할당. 과반수(m > N/2) 투표를 얻어야 접근 가능. 코디네이터 리셋에 의한 위반 확률은 매우 낮음(예: N=8, m=6일 때 < 10^-11).

**비교**:
| 알고리즘 | 메시지 수 | 지연(MTTU) |
|---------|----------|-----------|
| 중앙 집중 | 3 | 2 |
| 분산 | 2(N-1) | 2(N-1) |
| 토큰 링 | 1~∞ | 0~N-1 |

실제로는 중앙 집중식이 가장 널리 사용됨: 동작이 이해하기 쉽고 내결함성 증가도 비교적 용이.

## 예시

```python
# Ricart-Agrawala 분산 상호 배제 (핵심 로직)
class Process:
    def request_access(self):
        self.clock += 1
        for p in other_processes:
            send(p, REQUEST(self.clock, self.id))
        wait_for_all_ok()  # 모든 프로세스로부터 OK 수신 대기

    def on_receive_request(self, timestamp, requester_id):
        if self.using_resource:
            self.queue.append(requester_id)  # 큐에 넣고 응답 안함
        elif self.wanting_resource and (self.clock, self.id) < (timestamp, requester_id):
            self.queue.append(requester_id)  # 내 타임스탬프가 더 낮으면 큐잉
        else:
            send(requester_id, OK)  # 허용

    def release(self):
        for p in self.queue:
            send(p, OK)
        self.queue.clear()
```

## 관련 개념

- [램포트 논리 시계 (Lamport Logical Clock)](/knowledge/distributed-systems/lamport-logical-clock/)
- [주키퍼 (ZooKeeper)](/knowledge/distributed-systems/zookeeper/)
- [선출 알고리즘 (Election Algorithm)](/knowledge/distributed-systems/election-algorithm/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
