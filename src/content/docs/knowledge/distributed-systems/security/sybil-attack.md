---
title: "Sybil Attack"
description: "시빌 공격(Sybil Attack)은 공격자가 다수의 가짜 논리적 ID를 생성하여 분산 시스템에 각각 별도로 참여함으로써, 하나의 물리적 엔티티가 하나의 논리적 ID에 대응한다는 시스템의 기본 가정을 위반하는 공격이다"
tags: ['Security', 'Sybil Attack', 'Peer To Peer', 'Identity', 'Blockchain', 'Trust']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/sybil-attack
sidebar:
  order: 15
---

## 핵심 개념

시빌 공격은 분산 시스템의 세 가지 기본 가정을 위반한다:
1. 식별자는 최대 하나의 엔티티를 가리킨다
2. 각 엔티티는 최대 하나의 식별자로 참조된다
3. 식별자는 항상 같은 엔티티를 가리킨다 (재사용되지 않는다)

**공격 원리**:
```python
while True:
    s = attacker.createNode()     # 시빌 노드 생성
    sybil_nodes.add(s)
    h = random.choice(honest_nodes)
    s.connectTo(h)                # 정직한 노드에 연결
    if len(sybil_nodes) / len(honest_nodes) > threshold:
        attacker.attack()         # 공격 실행
```

**공격 사례**:
- P2P 네트워크(Chord, Kademlia)에서 다수 노드를 생성하여 서비스 거부 공격, 데이터 삭제
- 웹 오브 트러스트에서 자동 인증을 통해 다수의 가짜 노드가 공개키를 보증

**이클립스 공격(Eclipse Attack)**: 시빌 공격의 변형. 공모하는 노드들이 특정 노드를 네트워크에서 격리시킨다. 가십 기반 서비스에서 악성 링크만 교환하여 정직한 노드의 로컬 목록을 오염시킴.

**방어 방법**:
- 중앙 인증 기관 사용 (가장 단순하지만 탈중앙화 위반)
- **PoW(Proof of Work) 블록체인**: 다수 ID 유지 비용이 높아 무의미
- **PoS(Proof of Stake)**: 토큰 기반으로 다수 ID 생성의 이점 없음
- **시빌 저항 회계 메커니즘(NetFlow)**: 노드의 기여 이력 기반 평판 시스템

## 예시

```python
# NetFlow 기반 시빌 저항 회계
# P의 관점에서 Q의 용량(capacity)
cap_Q = max(MaxFlow(Q, P) - MaxFlow(P, Q), 0)

# 시빌 공격 분석:
# Q가 n개의 시빌 노드 Q*_0, ..., Q*_n 생성
# 총 용량: Tcap(Q) = sum(cap(Q*_k) for k in range(n+1))

# P가 시빌 Q*_i에 1단위 작업 제공 시:
# MF(P, Q*_i) += 1 -> cap(Q*_i) -= 1 -> Tcap(Q) -= 1
# Tcap(Q) == 0이 되면 P는 시빌 무시

# 시빌 간 상호 작업은 무의미:
# cap(Q*_i) += 1이지만 cap(Q*_j) -= 1 -> Tcap(Q) 변함없음
```

## 관련 개념

- [Blockchain](/knowledge/distributed-systems/blockchain/)
- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Public Key Certificate](/knowledge/distributed-systems/public-key-certificate/)
- [Byzantine Fault Tolerance](/knowledge/distributed-systems/byzantine-fault-tolerance/)
- [Multiparty Computation](/knowledge/distributed-systems/multiparty-computation/)
