---
title: "Cryptographic Hash Function"
description: "암호학적 해시 함수(Cryptographic Hash Function)는 임의 크기의 입력 데이터를 고정 길이의 비트 문자열로 변환하는 함수로, 충돌 저항성(collision resistance), 비가역성(irreversibility), 퍼즐 친화성(puzzle..."
tags: ['Cryptographic Hash Function', 'Sha 256', 'Collision Resistance', 'Irreversibility', 'Puzzle Friendliness', 'Digital Signature']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/cryptographic-hash-function
sidebar:
  order: 8
---

## 핵심 개념

암호학적 해시 함수는 데이터베이스 인덱싱에 사용되는 일반 해시 함수와 근본적으로 다른 목적과 속성을 갖는다. 일반 해시 함수는 데이터 접근을 위한 것이지만, 암호학적 해시 함수는 데이터 무결성과 보안을 보장하기 위한 것이다.

**세 가지 핵심 속성**:

1. **충돌 저항성(Collision Resistance)**: h(x) = h(y)가 되는 두 개의 서로 다른 값 x와 y를 찾는 것이 사실상 불가능하다. 현재 표준인 SHA-256은 256비트 출력을 생성하며, 임의의 값 y가 x와 같은 해시값을 가질 확률은 1/2^256이다. 이 속성은 블록체인의 위변조 저항성에 기여한다. 공격자가 블록 B를 수정하려면, B의 해시값이 변경되지 않도록 하는 수정을 찾아야 하는데, 이는 충돌 저항성으로 인해 불가능하다.

2. **비가역성(Irreversibility)**: h(x)만 주어졌을 때 x를 찾는 것이 사실상 불가능하다. x에서 h(x)를 계산하는 것은 쉽지만, h(x)에서 h^(-1)(h(x))를 찾는 것은 불가능하다. 이 속성은 비밀번호 저장에도 오랫동안 사용되었다. 평문 비밀번호 대신 해시값을 저장하면, 해시값이 유출되어도 원래 비밀번호를 역산할 수 없다.

3. **퍼즐 친화성(Puzzle Friendliness)**: 주어진 값 k에 대해, n비트 값 y가 되도록 하는 x를 찾는 것이 2^n보다 훨씬 빠른 시간에 불가능하다. 이 속성은 작업 증명(Proof of Work) 마이닝에서 핵심적이며, 논스(nonce)를 효율적으로 찾는 알고리즘이 존재하지 않음을 보장한다.

**공개키 암호화와 디지털 서명**: 각 사용자는 공개키(E)와 개인키(D)를 갖는다. 공개키로 암호화한 메시지는 개인키로만 복호화할 수 있고, 그 반대도 성립한다. 문서 x에 서명하려면 사용자가 개인키 D로 암호화하면, 누구든 공개키 E로 복호화하여 서명을 검증할 수 있다. 블록체인에서 블록의 연결이 포인터와 해시로 이루어지므로, 사용자는 최신 블록의 해시에 서명하는 것만으로 전체 체인에 서명할 수 있다.

## 예시

SHA-256 해시 함수의 보안 수준:

```
SHA-256 출력: 256비트

임의의 값이 특정 해시와 일치할 확률:
  1/2^256 ≈ 1/10^77

초당 1회 추측하는 컴퓨터로
50% 확률에 도달하는 시간:
  > 10^67초 ≈ 10^59년

참고: 태양이 지구를 삼킬 것으로 예측되는 시간:
  약 10^10년
```

디지털 서명 과정:

```
사용자 U1이 문서 x에 서명:
1. U1이 개인키 D1으로 x를 암호화: signature = D1(x)
2. 누구든 U1의 공개키 E1으로 검증: E1(signature) = x
3. D1은 U1만 소유하므로, U1만이 이 서명을 생성할 수 있음

블록체인 트랜잭션 검증:
1. 사용자 A가 트랜잭션 T를 생성
2. A의 개인키로 T에 서명
3. 모든 노드가 A의 공개키로 서명 검증 가능
```

## 관련 개념

- [Blockchain](/knowledge/database/blockchain/)
- [Merkle Tree](/knowledge/database/merkle-tree/)
- [Proof of Work](/knowledge/database/proof-of-work/)
- [Smart Contract](/knowledge/database/smart-contract/)
- [Byzantine Fault Tolerance](/knowledge/database/byzantine-fault-tolerance/)
