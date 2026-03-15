---
title: "비잔틴 장애 허용 (Byzantine Fault Tolerance)"
description: "비잔틴 장애 허용(Byzantine Fault Tolerance, BFT)은 프로세스 그룹 내 일부 프로세스가 임의로(악의적이거나 예측 불가능하게) 행동하더라도 정확한 합의에 도달할 수 있는 분산 시스템의 내결함성 메커니즘이다"
tags: ['Fault Tolerance', 'Byzantine', 'Consensus', 'Pbft', 'Trust', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/byzantine-fault-tolerance
sidebar:
  order: 7
---

## 핵심 개념

비잔틴 장애 모델에서는 개별 프로세스를 신뢰할 수 없다: 올바르게 동작할 수도 있고 아닐 수도 있으며, 이를 항상 정확하게 탐지할 방법이 없다.

핵심 정리: n개의 프로세스로 구성된 그룹에서 최대 k개의 프로세스가 비잔틴 장애를 보일 때, 정상 프로세스들이 올바른 합의에 도달하려면 다음 조건이 필요하다:

```
k <= (n - 1) / 3
```

즉, 전체 프로세스의 1/3 미만만 장애가 발생해야 한다.

BFT의 흥미로운 측면은 **신뢰를 배제**할 수 있다는 점이다. 개별 프로세스를 신뢰할 필요 없이, 프로세스 그룹 전체가 명세를 충족하는지만 보면 된다. 이는 블록체인 시스템의 근간이 되는 사고방식이다.

**3k+1 프로세스가 필요한 이유(Chapter 8)**: k=1일 때 3개 프로세스로는 합의 불가능. 장애 주 서버가 B1에게 T, B2에게 F를 보내면, 두 번째 라운드 후 각 백업은 {T, F} 집합을 갖게 되어 결론 불가. 반면 4개 프로세스(3k+1=4)에서는 장애 주 서버가 불일치 값을 보내도, 3개 백업이 두 번째 라운드에서 교환하면 다수결로 합의 가능.

**PBFT(Practical Byzantine Fault Tolerance, Chapter 8 상세)**: Castro와 Liskov(2002)가 제안. 3k+1개 복제 서버로 구성. 3단계 프로토콜:
1. **Pre-prepare**: 주 서버가 타임스탬프 t와 뷰 v로 연산 o를 백업에 전파.
2. **Prepare**: 각 백업이 prepare(t, v, o) 메시지를 다른 서버에 브로드캐스트. 2k개의 일치하는 prepare 메시지를 수집하면 prepare certificate 획득 - 연산 순서에 대한 합의 성립.
3. **Commit**: prepare certificate 보유 서버가 commit(t, v, o)를 브로드캐스트. 2k개의 commit 메시지로 commit certificate 획득 후 연산 실행.

**뷰 변경(View Change)**: 주 서버 장애 시 백업이 view-change(v+1, P) 메시지를 브로드캐스트(P는 prepare certificate 집합). 새 주 서버가 2k+1개의 view-change 메시지를 수집하여 미완성 연산을 새 뷰로 이관. HotStuff(2019)가 더 효율적인 뷰 변경을 제공하여 확장성 개선.

그룹 크기가 부족하여 명세를 충족하지 못하면 (장애 프로세스가 너무 많으면), 더 이상 어떤 보장도 할 수 없다.

## 예시

```python
# BFT 기본 원칙
n = 7  # 전체 프로세스 수
k = 2  # 비잔틴 장애 프로세스 수
# k <= (n-1)/3 = 2 이므로 합의 가능

# PBFT 합의 흐름 (간략화)
class PBFTNode:
    def __init__(self, node_id, total_nodes):
        self.id = node_id
        self.n = total_nodes
        self.f = (total_nodes - 1) // 3  # 최대 허용 장애 수

    def prepare(self, request):
        """2f+1개의 prepare 메시지 수집"""
        prepare_msgs = collect_messages("prepare", request)
        if len(prepare_msgs) >= 2 * self.f + 1:
            return True  # prepare certificate 확보
        return False

    def commit(self, request):
        """2f+1개의 commit 메시지 수집"""
        commit_msgs = collect_messages("commit", request)
        if len(commit_msgs) >= 2 * self.f + 1:
            execute(request)  # 합의 달성, 요청 실행

# 3k vs 3k+1 비교 (Chapter 8)
# k=1: 3개 프로세스로 합의 불가능
# P(장애) → B1: T, B2: F
# B1 → B2: T, B2 → B1: F
# B1 sees {T, F} → 결론 불가
# B2 sees {T, F} → 결론 불가

# k=1: 4개 프로세스(3k+1)로 합의 가능
# P(장애) → B1: T, B2: F, B3: T
# 두 번째 라운드 후:
# B1 sees {T, F, T} → majority(T) ✓
# B2 sees {T, F, T} → majority(T) ✓
# B3 sees {T, F, T} → majority(T) ✓
```

## 관련 개념

- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain/)
- [시빌 공격 (Sybil Attack)](/knowledge/distributed-systems/sybil-attack/)
- [신뢰 컴퓨팅 기반 (Trusted Computing Base)](/knowledge/distributed-systems/trusted-computing-base/)
- [보안 정책과 메커니즘 (Security Policy and Mechanism)](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [인증 프로토콜 (Authentication Protocol)](/knowledge/distributed-systems/authentication-protocol/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [장애 모델 (Failure Model)](/knowledge/distributed-systems/failure-model/)
- [프로세스 그룹 (Process Group)](/knowledge/distributed-systems/process-group/)
- [팍소스 (Paxos)](/knowledge/distributed-systems/paxos/)
- [래프트 합의 (Raft Consensus)](/knowledge/distributed-systems/raft-consensus/)
