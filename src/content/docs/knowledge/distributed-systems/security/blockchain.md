---
title: "블록체인 (Blockchain)"
description: "블록체인(Blockchain)은 검증된 트랜잭션의 블록들이 암호학적으로 연결된 추가 전용(append-only) 분산 원장(distributed ledger)으로, 각 블록의 변경이 감지 가능하도록 설계되어 데이터 무결성을 보장한다"
tags: ['Blockchain', 'Distributed Ledger', 'Trust', 'Consensus', 'Smart Contract', 'Integrity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/blockchain
sidebar:
  order: 17
---

## 핵심 개념

**블록체인의 구조**:
- 제네시스 블록(genesis block): 첫 번째 블록, 널 포인터(0x00000000) 포함
- 각 블록은 트랜잭션들과 블록 데이터의 해시 값을 포함
- 해시 값이 다음 블록으로 복사되어 암호학적 연결 형성

**무결성 보장 원리**: 블록 B_i의 해시 h_i가 변경되면 후속 블록 B_{i+1}의 해시 h_{i+1}도 무효화된다. 공격 성공을 위해서는 모든 후속 블록을 수정해야 하며, 대규모 복제된 읽기 전용 데이터에서는 사실상 불가능하다.

**블록체인의 두 가지 측면**:
1. **분산 원장**: 투명성과 데이터 무결성 보장 (읽기 전용)
2. **합의 프로토콜**: 어떤 블록이 체인에 추가될지 결정 (PoW, PoS 등)

**스마트 컨트랙트(Smart Contract)**: 특정 조건 충족 시 자동 실행되는 프로그램. 명세가 의도를 정확히 반영하는지가 핵심 문제.

**블록체인과 신뢰**:
- 개별 참여자를 신뢰할 필요 없이 원장만 신뢰하면 된다는 주장이 있지만, 실제로는 중개자(intermediaries)와 시스템 구현의 정확성도 신뢰해야 한다.
- 무허가(permissionless) 블록체인도 결국 완전히 신뢰 불필요하지는 않다.

## 예시

```python
# 블록체인 무결성 검증
class Block:
    def __init__(self, transactions, prev_hash):
        self.transactions = transactions
        self.prev_hash = prev_hash
        self.hash = compute_hash(self.transactions + self.prev_hash)

# 블록체인 생성
genesis = Block([], "0x00000000")
block1 = Block([tx1, tx2], genesis.hash)
block2 = Block([tx3], block1.hash)

# 무결성 검증: block1의 트랜잭션 변조 시
# block1.hash가 달라짐 -> block2.prev_hash와 불일치 -> 변조 탐지

# e-voting 예시
# 유권자가 토큰을 후보에게 전송하는 트랜잭션
vote_tx = Transaction(voter_token, candidate_bob)
# 검증: 체인 전체를 검사하여 토큰의 이중 사용 여부 확인
```

## 관련 개념

- [시빌 공격 (Sybil Attack)](/knowledge/distributed-systems/sybil-attack/)
- [디지털 서명과 해시 함수 (Digital Signature and Hash Function)](/knowledge/distributed-systems/digital-signature-and-hash-function/)
- [신뢰 컴퓨팅 기반 (Trusted Computing Base)](/knowledge/distributed-systems/trusted-computing-base/)
- [비잔틴 장애 허용 (Byzantine Fault Tolerance)](/knowledge/distributed-systems/byzantine-fault-tolerance/)
- [보안 정책과 메커니즘 (Security Policy and Mechanism)](/knowledge/distributed-systems/security-policy-and-mechanism/)
