---
title: "전순서 멀티캐스트 (Totally Ordered Multicast)"
description: "완전 순서 멀티캐스트(Totally Ordered Multicast)는 모든 메시지가 모든 수신자에게 동일한 순서로 전달되는 멀티캐스트 연산이다"
tags: ['Multicast', 'Total Order', 'State Machine Replication', 'Lamport Clock']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/totally-ordered-multicast
sidebar:
  order: 4
---

## 핵심 개념

분산 시스템에서 복제된 데이터베이스에 업데이트를 적용할 때, 모든 복제본에서 동일한 순서로 업데이트가 수행되지 않으면 불일치가 발생한다. 예를 들어, 은행 계좌에 $100 입금과 1% 이자 적용이 서로 다른 순서로 적용되면 $1,111과 $1,110이라는 다른 결과가 나온다.

**Lamport 클럭 기반 구현**:
1. 각 메시지는 송신자의 현재 논리 시간으로 타임스탬핑
2. 멀티캐스트 시 자신에게도 개념적으로 전송
3. 수신된 메시지는 타임스탬프 순으로 로컬 큐에 삽입
4. 수신자는 다른 모든 프로세스에 확인(ACK) 멀티캐스트
5. 큐의 맨 앞에 있고, 모든 프로세스로부터 확인받은 메시지만 애플리케이션에 전달

이 방식이 작동하는 이유: 메시지 손실이 없다고 가정하면, 결국 모든 프로세스는 동일한 로컬 큐를 갖게 되며, 동일한 결정론적 규칙으로 메시지를 전달한다.

이 기법은 **상태 기계 복제(State Machine Replication)**라고도 불린다: 복제본들이 동일한 유한 상태 기계의 동일한 전이를 동일한 순서로 실행한다.

**인과적 순서 멀티캐스트**와 구별: 인과적 순서는 관련 없는 메시지의 전달 순서를 강제하지 않으므로 완전 순서보다 약한 보장이다.

## 예시

```
은행 복제 데이터베이스 예시:
계좌 잔액 = $1,000

San Francisco 복제본:
  1. $100 입금 → $1,100
  2. 1% 이자 → $1,111

New York 복제본 (순서 뒤바뀜):
  1. 1% 이자 → $1,010
  2. $100 입금 → $1,110

→ 불일치 발생! 완전 순서 멀티캐스트로 해결 가능

# 의사코드: 메시지 전달 결정
def can_deliver(queue, process_count):
    msg = queue[0]  # 큐의 맨 앞 메시지
    acked_by = count_acks(msg, queue)
    return acked_by == process_count - 1  # 모든 프로세스가 확인
```

## 관련 개념

- [램포트 논리 시계 (Lamport Logical Clock)](/knowledge/distributed-systems/lamport-logical-clock/)
- [상호 배제 (Mutual Exclusion)](/knowledge/distributed-systems/mutual-exclusion/)
- [순차적 일관성 (Sequential Consistency)](/knowledge/distributed-systems/sequential-consistency/)
