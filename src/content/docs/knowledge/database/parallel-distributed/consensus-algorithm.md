---
title: "Consensus Algorithm"
description: "합의 알고리즘(Consensus Algorithm)은 블록체인의 여러 독립 노드가 블록체인의 내용과 다음에 추가될 블록에 대해 합의에 도달하는 메커니즘으로, 작업 증명(Proof of Work), 지분 증명(Proof of Stake), 비잔틴 합의(Byzanti..."
tags: ['Consensus Algorithm', 'Blockchain Consensus', 'Distributed Agreement', 'Mining', 'Block Validation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/consensus-algorithm
sidebar:
  order: 21
---

## 핵심 개념

블록체인은 모든 참여 노드에 복제되므로, 새 블록이 추가될 때마다 어떤 노드가 블록을 제안할 수 있는지, 그리고 실제 블록의 내용에 대해 합의해야 한다. 전통적인 분산 데이터베이스에서는 모든 참여자가 하나의 통제 조직에 속하므로 합의가 비교적 단순하지만, 블록체인에서는 통제 조직이 없거나 제한적이므로 더 복잡한 합의 메커니즘이 필요하다.

**합의 메커니즘의 분류**:

1. **포크를 허용하는 방식**: 여러 노드가 마지막 블록 다음에 블록을 생성할 수 있어 일시적으로 포크가 발생한다. 노드들은 가장 긴 선형 서브체인에 블록을 추가하려고 하며, 짧은 포크의 블록은 고아(orphaned) 블록이 된다. 작업 증명과 지분 증명이 이 방식을 사용한다.

2. **단일 노드 선택 방식**: 다음 블록을 추가할 하나의 노드를 합의로 결정한다. 비잔틴 합의가 이 방식을 사용한다.

**블록 검증 과정**: 블록을 체인에 추가하는 노드는 먼저 블록의 트랜잭션들을 검증해야 한다:
- 각 트랜잭션이 올바른 형식인지 확인
- 이중 지불(double-spending)이 아닌지 확인 (미사용 트랜잭션 집합 추적)
- 제출한 사용자의 서명이 올바른지 확인

**마이닝 인센티브**: 노드가 마이닝에 자원을 사용하는 이유는 두 가지 보상이 있기 때문이다:
1. 블록체인 통화의 새 코인으로 시스템이 지불하는 수수료
2. 트랜잭션 제출자가 포함하는 수수료 (마이너에게 우선적으로 트랜잭션을 포함하도록 인센티브 제공)

**성능 고려사항**: 블록체인 시스템의 트랜잭션 처리 속도는 전통적 데이터베이스 시스템보다 훨씬 낮다. Bitcoin은 초당 10건 미만, Ethereum은 초당 약 10건을 처리한다. 전통적 데이터베이스가 초당 수만 건을 처리하는 것과 대조적이다. 이는 합의 오버헤드, 특히 작업 증명에서 블록 추가 속도를 제한하기 때문이다.

트랜잭션 지연시간도 중요한 지표이다. Bitcoin은 10분마다 블록을 마이닝하고, 포크로 인한 고아 블록 가능성을 줄이려면 6블록을 기다려야 하므로 실제 지연시간은 약 1시간이다.

## 예시

블록체인 합의 메커니즘 비교:

```
┌─────────────┬─────────────┬──────────────┬─────────────┐
│   특성       │ Proof of    │ Proof of     │ Byzantine   │
│             │ Work        │ Stake        │ Consensus   │
├─────────────┼─────────────┼──────────────┼─────────────┤
│ 블록체인유형 │ 공개        │ 공개         │ 허가형      │
│ Sybil 방어  │ 계산 비용   │ 지분 비용    │ 허가 통제   │
│ 에너지 소비 │ 매우 높음   │ 낮음         │ 낮음        │
│ 처리 속도   │ 낮음        │ 중간         │ 높음        │
│ 대표 사례   │ Bitcoin     │ Cardano      │ Hyperledger │
└─────────────┴─────────────┴──────────────┴─────────────┘
```

블록 검증 흐름:

```
트랜잭션 생성 → 네트워크 브로드캐스트
       ↓
노드가 트랜잭션 수집
       ↓
블록 구성 및 검증:
  1. 형식 검증 (well-formed)
  2. 이중 지불 검사 (unspent 확인)
  3. 서명 검증 (공개키 복호화)
       ↓
합의 메커니즘으로 블록 추가
       ↓
모든 노드가 블록 검증 후 로컬 체인에 추가
```

## 관련 개념

- [Blockchain](/knowledge/database/blockchain/)
- [Proof of Work](/knowledge/database/proof-of-work/)
- [Proof of Stake](/knowledge/database/proof-of-stake/)
- [Byzantine Fault Tolerance](/knowledge/database/byzantine-fault-tolerance/)
- [Cryptographic Hash Function](/knowledge/database/cryptographic-hash-function/)
- [Merkle Tree](/knowledge/database/merkle-tree/)
