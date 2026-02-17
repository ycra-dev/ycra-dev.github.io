---
title: "Proof of Work"
description: "작업 증명(Proof of Work)은 공개 블록체인에서 사용되는 합의 메커니즘으로, 노드가 계산적으로 어렵지만 불가능하지는 않은 수학적 문제를 풀어야만 블록을 체인에 추가할 수 있게 함으로써, 시빌 공격(Sybil Attack)을 방어하고 블록체인의 무결성을 보..."
tags: ['Proof Of Work', 'Mining', 'Nonce', 'Hash Target', 'Bitcoin', 'Sybil Attack', 'Energy Consumption']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/proof-of-work
sidebar:
  order: 10
---

## 핵심 개념

작업 증명은 참여 노드 수가 계속 변화하는 공개 블록체인을 위해 설계되었다. 누구든 블록체인 소프트웨어를 다운로드하여 참여할 수 있으므로, 공격자가 저비용 컴퓨터를 대량으로 설치하여 다수를 장악하는 시빌 공격에 취약할 수 있다. 작업 증명은 블록 추가에 계산 비용을 부과하여 이를 방어한다.

**마이닝 과정**: 블록 B를 다음 블록으로 마이닝하려는 노드는, B와 이전 블록의 해시에 연결(concatenate)했을 때 블록체인에 설정된 목표값(target) 미만으로 해시되는 논스(nonce)를 찾아야 한다. 논스는 보통 32비트 값이다.

- 목표값이 매우 낮으면 (예: 4), 하나의 논스로 성공할 확률은 1/2^254이다.
- 목표값이 매우 높으면 (예: 2^255), 성공 확률은 50%이다.

블록체인 구현은 전체 시스템에서의 블록 마이닝 속도를 제어하기 위해 목표값을 동적으로 조정한다. Bitcoin은 약 10분마다 블록이 마이닝되도록, Ethereum은 10-15초를 목표로 했다.

**퍼즐 친화성 속성의 역할**: 해시 함수는 효율적인 논스 탐색 알고리즘이 존재하지 않아야 한다. 즉, 각 논스 값을 하나씩 시도하는 것보다 빠른 방법이 없어야 한다. 이것이 암호학적 해시 함수의 퍼즐 친화성(puzzle friendliness) 속성이다.

**작업 증명의 장단점**:
- **장점**: 대규모 네트워크에서 공격자가 과반수의 계산 능력을 획득하는 것은 매우 비싸고 어렵다.
- **단점**: 막대한 에너지 소비가 발생한다. Bitcoin 마이닝은 전 세계적으로 미국 전력 소비의 약 1%, 아일랜드 등 일부 국가의 전체 소비보다 많은 전력을 소비한다. 이로 인해 특수 마이닝 칩 설계와 저렴한 전력원 근처에 대규모 마이닝 시설을 설치하는 인센티브가 생겼다.

이러한 우려로 인해 지분 증명(Proof of Stake)과 같은 대안이 등장했다. 메모리 집약적(memory-intensive) 방식도 연구되고 있는데, 이는 계산 비용 장벽을 유지하면서 에너지 낭비를 줄이는 것을 목표로 한다.

**마이닝 풀(Mining Pool)**: 실제로 사용자 그룹이 함께 마이닝하고 수익을 분배하는 컨소시엄인 마이닝 풀을 형성하기도 한다.

## 예시

작업 증명 마이닝 과정:

```
블록 B의 데이터:
  - 트랜잭션들
  - 이전 블록의 해시: h(Block_prev)
  - 타임스탬프
  - 논스: ?

목표값(target) = T (블록체인 시스템이 설정)

마이닝 과정:
  nonce = 0
  while hash(B || h(Block_prev) || nonce) >= T:
      nonce += 1

  성공! → 블록을 네트워크에 전파

예시 (단순화):
  목표: 해시의 처음 20비트가 0이어야 함

  nonce=0: hash = 10110... (실패)
  nonce=1: hash = 01101... (실패)
  ...
  nonce=839271: hash = 00000... (성공!)
```

Bitcoin의 난이도 조정:

```
목표: 2016 블록마다 난이도 조정
      (약 2주에 해당, 블록당 10분 기준)

실제 소요 시간 < 2주 → 난이도 증가 (목표값 감소)
실제 소요 시간 > 2주 → 난이도 감소 (목표값 증가)

이를 통해 네트워크 계산 능력이 변해도
평균 10분/블록 유지
```

에너지 소비 비교:

```
Bitcoin 마이닝 전력 소비 (추정):
  - 미국 전체 전력의 약 1%
  - 아일랜드 전체보다 많음

일반 데이터베이스 트랜잭션:
  - 수 밀리와트 수준

차이: 수백만 배
```

## 관련 개념

- [Blockchain](/knowledge/database/blockchain/)
- [Consensus Algorithm](/knowledge/database/consensus-algorithm/)
- [Cryptographic Hash Function](/knowledge/database/cryptographic-hash-function/)
- [Proof of Stake](/knowledge/database/proof-of-stake/)
- [Byzantine Fault Tolerance](/knowledge/database/byzantine-fault-tolerance/)
