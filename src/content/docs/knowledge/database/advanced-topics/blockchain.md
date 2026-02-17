---
title: "Blockchain"
description: "블록체인(Blockchain)은 데이터 블록들이 암호학적 해시를 포함하는 포인터로 연결된 연결 리스트 구조의 분산 데이터베이스로, 탈중앙화된 방식으로 관리되며 데이터의 위변조 저항성(tamper resistance)과 부인 방지(irrefutability)를 보장..."
tags: ['Blockchain', 'Distributed Ledger', 'Decentralization', 'Tamper Resistance', 'Immutability', 'Cryptocurrency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/blockchain
sidebar:
  order: 7
---

## 핵심 개념

가장 기본적인 수준에서 블록체인은 데이터 블록의 연결 리스트이며, 데이터 갱신 로그를 구성하는 것으로 볼 수 있다. 블록체인을 흥미롭게 만드는 것은, 분산 방식으로 관리되어 어떤 한 참여자도 디지털 서명된 레코드를 추가하는 것 외에는 블록체인을 쉽게 수정하거나 조작할 수 없다는 점이다.

**블록체인의 구조**: 각 블록은 이전 블록에 대한 포인터와 함께 이전 블록의 해시값을 포함한다. 최초의 블록을 제네시스 블록(genesis block)이라 한다. 어떤 블록이 변경되면, 다음 블록에 저장된 해시값과 불일치하므로 쉽게 감지할 수 있다.

**블록체인의 핵심 속성**:
- **탈중앙화(Decentralization)**: 공개 블록체인에서는 중앙 통제 없이 다수결 합의로 제어된다. 허가형 블록체인에서는 접근 인가와 신원 관리만 중앙에서 제어한다.
- **위변조 저항성(Tamper Resistance)**: 블록체인 네트워크의 과반수를 장악하지 않는 한 블록 내용을 변경하는 것이 불가능하다.
- **부인 방지(Irrefutability)**: 사용자의 활동은 암호학적으로 서명되어 누구나 검증할 수 있다.
- **익명성(Anonymity)**: 사용자 ID가 개인 식별 정보와 직접 연결되지 않으나, 간접적으로 침해될 수 있다.

**블록체인의 두 가지 유형**:
- **공개 블록체인(Public Blockchain)**: Bitcoin처럼 누구나 참여할 수 있다.
- **허가형 블록체인(Permissioned Blockchain)**: 참여가 허가 기관에 의해 통제된다.

**포크(Fork)**: 최신 블록이 아닌 다른 블록에 새 블록을 추가하는 것을 포크라 한다. 두 노드가 거의 동시에 블록을 추가하여 발생하는 우연적 포크는 가장 긴 체인을 따르는 규칙으로 해결된다. 의도적 포크에는 소프트 포크(이전 블록 유효)와 하드 포크(이전 블록 무효화)가 있다.

블록체인의 주요 응용 분야로는 디지털 원장, 소유권 문서 관리, 공급망 추적, 학위 인증서, 의료 기록 등이 있다.

## 예시

블록체인의 기본 구조:

```
[Block 0]          [Block 1]          [Block n]
(Genesis Block)
+-----------+     +-----------+     +-----------+
|           |     | h(Block 0)|     |h(Block n-1)|
|   data    | <-- |   data    | <-- |    data    |
|           |     |           |     |            |
+-----------+     +-----------+     +-----------+
```

Bitcoin 스타일 트랜잭션 예시:

```
사용자 A가 사용자 B에게 10 단위를 지불하려면:
1. A는 과거 트랜잭션 T1, T2, ..., Tn에서 A에게 지불된
   합계가 최소 10인 트랜잭션을 찾음
2. 새 트랜잭션 T를 생성:
   - 입력: T1, T2, ..., Tn의 출력
   - 출력: B에게 10 단위, A에게 나머지(거스름돈)
3. A가 트랜잭션에 디지털 서명
4. T1, T2, ..., Tn은 "사용됨(spent)"으로 표시
```

## 관련 개념

- [Cryptographic Hash Function](/knowledge/database/cryptographic-hash-function/)
- [Merkle Tree](/knowledge/database/merkle-tree/)
- [Consensus Algorithm](/knowledge/database/consensus-algorithm/)
- [Proof of Work](/knowledge/database/proof-of-work/)
- [Proof of Stake](/knowledge/database/proof-of-stake/)
- [Smart Contract](/knowledge/database/smart-contract/)
- [Permissioned Blockchain](/knowledge/database/permissioned-blockchain/)
- [Byzantine Fault Tolerance](/knowledge/database/byzantine-fault-tolerance/)
