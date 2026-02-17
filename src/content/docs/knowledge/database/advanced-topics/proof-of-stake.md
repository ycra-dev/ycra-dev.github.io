---
title: "Proof of Stake"
description: "지분 증명(Proof of Stake)은 블록체인 합의 메커니즘의 하나로, 블록체인 통화를 많이 보유하거나 예치한 노드가 다음 블록을 추가할 확률이 높아지도록 설계된 방식으로, 작업 증명(Proof of Work)의 막대한 에너지 소비 문제를 해결하는 대안이다"
tags: ['Proof Of Stake', 'Consensus', 'Blockchain Mining', 'Stake', 'Energy Efficient', 'Ethereum']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/proof-of-stake
sidebar:
  order: 11
---

## 핵심 개념

지분 증명의 핵심 개념은 블록체인 통화에 큰 지분(stake)을 가진 노드가 블록 추가에 우선적으로 선택되도록 하는 것이다. 이는 블록체인의 가치에 가장 많은 이해관계를 가진 노드가 블록체인을 올바르게 유지할 동기가 가장 크다는 논리에 기반한다.

**작동 방식**: 단순히 가장 큰 지분을 가진 자가 블록체인을 제어하면 중앙화 문제가 발생하므로, 이 규칙을 절대적으로 적용하지는 않는다. 대신, 마이닝 성공 확률이 노드의 지분에 비례하도록 작업 증명의 난이도를 조정한다. 지분 요구사항과 마이닝 난이도를 함께 조정하여 블록 마이닝 속도를 제어할 수 있다.

**다양한 지분 증명 방식**: 지분 증명에는 다양한 변형이 존재한다:
- 전체 지분(stake)뿐만 아니라 지분이 보유된 총 기간도 측정할 수 있다.
- 지분의 일부 또는 전체를 향후 일정 기간 동안 비활성(inactive) 상태로 유지하도록 요구할 수 있다.
- 이를 통해 단기 투기보다 장기적 참여를 장려한다.

**지분 증명의 도전 과제**: 적절한 튜닝이 어렵다. 작업 증명보다 고려해야 할 매개변수가 더 많다. 특히 주의해야 할 점은, 가장 긴 체인이 아닌 다른 포크에 블록을 추가하는 데 드는 비용 패널티가 너무 낮으면 안 된다는 것이다. 이른바 "Nothing at Stake" 문제로, 공격자가 비용 없이 여러 포크에 동시에 참여할 수 있으면 블록체인의 보안이 위협받는다.

**작업 증명 대비 장점**:
- 에너지 소비가 크게 감소한다.
- 특수 하드웨어(ASIC)가 필요하지 않다.
- 블록 생성 속도를 더 빠르게 할 수 있다.

**대표적 구현**: Ethereum은 원래 작업 증명을 사용했으나, 지분 증명으로 전환을 추진했다(Casper 프로토콜). Cardano 블록체인은 지분 증명을 사용하는 대표적 사례이다.

## 예시

지분 증명의 기본 원리:

```
노드 A: 1,000 ETH 보유 → 마이닝 성공 확률 ∝ 1,000
노드 B: 500 ETH 보유 → 마이닝 성공 확률 ∝ 500
노드 C: 100 ETH 보유 → 마이닝 성공 확률 ∝ 100

총 지분: 1,600 ETH
노드 A의 블록 추가 확률: 1,000/1,600 = 62.5%
노드 B의 블록 추가 확률: 500/1,600 = 31.25%
노드 C의 블록 추가 확률: 100/1,600 = 6.25%
```

작업 증명 vs 지분 증명 비교:

```
┌──────────────┬─────────────────┬──────────────────┐
│  속성         │ Proof of Work   │ Proof of Stake   │
├──────────────┼─────────────────┼──────────────────┤
│ 블록 추가 기준│ 계산 문제 해결   │ 보유 지분 비례    │
│ 에너지 소비   │ 극도로 높음      │ 매우 낮음         │
│ 특수 하드웨어 │ ASIC 필요        │ 불필요            │
│ 진입 장벽     │ 계산 능력 확보   │ 통화 보유         │
│ 공격 비용     │ 51% 계산력 필요  │ 51% 지분 필요    │
│ 블록 속도     │ 느림 (BTC: 10분) │ 더 빠름 가능      │
│ 대표 사례     │ Bitcoin          │ Cardano           │
└──────────────┴─────────────────┴──────────────────┘
```

## 관련 개념

- [Blockchain](/knowledge/database/blockchain/)
- [Consensus Algorithm](/knowledge/database/consensus-algorithm/)
- [Proof of Work](/knowledge/database/proof-of-work/)
- [Byzantine Fault Tolerance](/knowledge/database/byzantine-fault-tolerance/)
- [Cryptographic Hash Function](/knowledge/database/cryptographic-hash-function/)
