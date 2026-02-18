---
title: "Homomorphic Encryption"
description: "동형 암호(Homomorphic Encryption)는 암호화된 데이터에 대해 수학적 연산을 수행하면 그 결과가 평문에 같은 연산을 수행한 것과 동일한 암호문을 생성하는 암호화 기법이다"
tags: ['Cryptography', 'Homomorphic Encryption', 'Privacy', 'Cloud Computing', 'Fhe']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/homomorphic-encryption
sidebar:
  order: 6
---

## 핵심 개념

동형 암호의 핵심 성질은 다음과 같다:
```
E_K(x) * E_K(y) = E_K(x * y)
```
여기서 `*`는 덧셈이나 곱셈 같은 수학적 연산이다.

이 기술의 중요성은 비신뢰(untrusted) 서버에서 데이터를 처리할 수 있게 해준다는 점이다. 기존에는 원격 서버에 데이터를 안전하게 저장하려면 암호화해서 보내면 되지만, 그 데이터를 처리하려면 복호화가 필요했다. 동형 암호는 이 문제를 해결한다: 서버가 암호화된 데이터에 직접 연산을 수행하고, 결과도 자동으로 암호화된 상태로 유지된다.

동형 암호는 두 가지 유형으로 나뉜다:
- **완전 동형 암호(FHE, Full Homomorphic Encryption)**: 덧셈과 곱셈 모두 지원하여 모든 수학적 연산이 가능하지만, 현재 구현은 성능이 매우 느리다.
- **부분 동형 암호(PHE, Partial Homomorphic Encryption)**: 덧셈이나 곱셈 중 하나만 지원하지만 효율적인 구현이 존재한다. 특정 응용 분야에 적합.

## 예시

실제 응용 사례: 보행자 수 카운팅 시스템

Wi-Fi 신호로 기기를 탐지하되 개인정보를 보호해야 하는 상황. 블룸 필터(Bloom filter)를 사용하여 탐지 결과를 저장하고, 두 위치의 교집합 계산에 동형 암호를 적용한다:

```
# 블룸 필터 A와 B의 교집합 (비트별 AND = 곱셈)
PK(A ⊙ B)[i] = PK(A[i]) · PK(B[i])
```

서버는 암호화된 필터의 교집합을 계산할 수 있지만, 실제 탐지 내용은 알 수 없다. Alice는 개인키로 결과를 복호화하여 카운트만 추정한다. 동일한 값을 두 번 암호화해도 다른 암호문이 생성되어(`p1 != p2`) 관찰자가 원본 값을 구별할 수 없다.

## 관련 개념

- [Symmetric and Asymmetric Cryptosystem](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
- [Digital Signature and Hash Function](/knowledge/distributed-systems/digital-signature-and-hash-function/)
- [Multiparty Computation](/knowledge/distributed-systems/multiparty-computation/)
