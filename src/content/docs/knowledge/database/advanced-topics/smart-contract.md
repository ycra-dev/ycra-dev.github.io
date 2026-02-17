---
title: "Smart Contract"
description: "스마트 컨트랙트(Smart Contract)는 블록체인에 저장되어 실행되는 프로그래밍 가능한 코드로, 복잡한 트랜잭션과 비즈니스 합의를 자동으로 실행하며, 일부 블록체인에서는 자체 계정, 잔액, 저장소를 가진 독립적 엔티티로 배포될 수 있다"
tags: ['Smart Contract', 'Ethereum', 'Solidity', 'Gas', 'Dao', 'Turing Complete', 'Oracle', 'Evm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/smart-contract
sidebar:
  order: 12
---

## 핵심 개념

블록체인의 트랜잭션은 단순한 자금 이체를 넘어 실행 가능한 코드를 포함할 수 있다. 스마트 컨트랙트 언어의 표현력은 블록체인마다 다르다.

**언어와 표현력**:
- **Bitcoin**: 제한된 언어를 사용하며, 조건부 자금 이체 등 표준적 트랜잭션을 정의한다. `multisig` 명령으로 n명 중 m명이 승인해야 하는 에스크로 트랜잭션을 지원한다.
- **Ethereum 및 대부분의 기업용 블록체인**: 튜링 완전(Turing-complete) 언어를 지원한다.

튜링 완전 언어는 무한 루프를 작성할 수 있어, 악의적 사용자가 무한 루프 트랜잭션을 제출하여 마이너 자원을 소모시킬 위험이 있다. 이를 해결하기 위해 Ethereum은 **가스(Gas)** 개념을 도입했다.

**가스(Gas) 시스템**: 각 명령은 고정량의 가스를 소비하며, 세 가지 매개변수로 제어된다:
1. **가스 가격(Gas Price)**: 사용자가 가스 1단위당 마이너에게 지불하는 Ether 금액. 가격이 너무 낮으면 마이너가 트랜잭션을 포함하지 않아 지연된다.
2. **트랜잭션 가스 한도(Transaction Gas Limit)**: 트랜잭션의 가스 소비 상한. 초과 시 트랜잭션이 중단되며, 마이너는 수수료를 가져가지만 트랜잭션 결과는 커밋되지 않는다.
3. **블록 가스 한도(Block Gas Limit)**: 블록 내 모든 트랜잭션의 가스 한도 합계에 대한 시스템 제한.

**오라클(Oracle)**: 스마트 컨트랙트가 외부 이벤트에 의존할 때, 모든 당사자가 신뢰하는 외부 데이터 소스가 필요하다. 예를 들어, 강수량에 따른 작물 보험 스마트 컨트랙트는 강수량 데이터를 외부에서 가져와야 한다. 오라클은 블록체인의 신뢰 없음(trustlessness) 원칙에 대한 타협이지만, 계약 당사자만 오라클에 합의하면 되므로 심각한 타협은 아니다.

**자율 스마트 컨트랙트와 DAO**: Ethereum에서 스마트 컨트랙트는 자체 계정, 잔액, 저장소를 가진 독립적 엔티티로 배포될 수 있다. 무기한으로 자율적으로 운영되도록 코딩된 컨트랙트를 분산 자율 조직(DAO, Distributed Autonomous Organization)이라 한다. DAO는 버그 수정이 불가능하며, 법적/규제 문제도 미해결 상태이다.

**토큰과 ICO**: 스마트 컨트랙트를 사용하여 기존 통화 위에 새로운 통화(토큰)를 생성할 수 있다. ERC-20은 Ethereum 토큰의 널리 사용되는 표준이다. 토큰 생성 과정을 ICO(Initial Coin Offering)라 하며, 벤처 자금 조달의 중요한 방법이지만 사기 문제도 발생한다.

**교차 체인 트랜잭션(Cross-Chain Transaction)**: 서로 다른 블록체인 간의 트랜잭션은 통화가 다르고 두 블록체인이 상태에 합의해야 하는 문제가 있다. 신뢰할 수 있는 중개자를 사용하거나, 시간 잠금(time-lock) 트랜잭션, 머클 트리 헤더의 교차 체인 교환 등의 기법이 사용된다.

## 예시

Ethereum 가스 시스템의 작동 예시:

```
스마트 컨트랙트 실행:
  가스 가격: 20 Gwei (1 Gwei = 10^-9 ETH)
  트랜잭션 가스 한도: 100,000 가스
  블록 가스 한도: 8,000,000 가스

  명령 실행:
    ADD:    3 가스
    MUL:    5 가스
    SSTORE: 20,000 가스 (스토리지 쓰기)
    ...

  총 소비 가스: 75,000
  트랜잭션 비용: 75,000 × 20 Gwei = 0.0015 ETH

  가스 한도 초과 시:
    실행 중단, 모든 변경 롤백
    마이너는 수수료를 가져감 (소비된 가스만큼)
```

작물 보험 스마트 컨트랙트 (개념적):

```solidity
// Solidity 스타일 의사코드
contract CropInsurance {
    address farmer;
    address insurer;
    address rainfallOracle;  // 신뢰할 수 있는 외부 데이터 소스
    uint premium;
    uint coverageAmount;

    function checkRainfall() public {
        uint rainfall = Oracle(rainfallOracle).getRainfall();

        if (rainfall < DROUGHT_THRESHOLD) {
            // 가뭄 시 보험금 지급
            payable(farmer).transfer(coverageAmount);
        }
    }
}
```

트랜잭션 순서 제어 (Ethereum account nonce):

```
계정 A의 트랜잭션:
  T1: nonce=0, 100 ETH 전송
  T2: nonce=1, 50 ETH 전송
  T3: nonce=2, 200 ETH 전송

규칙:
  - 같은 계정에서 같은 nonce 불가
  - nonce=1 트랜잭션은 nonce=0 이후에만 수락
  → 이중 지불 및 순서 조작 방지
```

## 관련 개념

- [Blockchain](/knowledge/database/blockchain/)
- [Consensus Algorithm](/knowledge/database/consensus-algorithm/)
- [Proof of Work](/knowledge/database/proof-of-work/)
- [Proof of Stake](/knowledge/database/proof-of-stake/)
- [Cryptographic Hash Function](/knowledge/database/cryptographic-hash-function/)
- [Permissioned Blockchain](/knowledge/database/permissioned-blockchain/)
