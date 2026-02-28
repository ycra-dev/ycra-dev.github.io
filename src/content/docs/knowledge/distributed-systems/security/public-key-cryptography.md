---
title: "공개키 암호 (Public-Key Cryptography)"
description: "공개키와 개인키라는 수학적으로 연결된 키 쌍을 사용하여 키 분배 문제를 해결하는 비대칭 암호 방식이다"
tags: ["Security", "Cryptography", "Public-Key", "RSA", "Diffie-Hellman"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/public-key-cryptography
sidebar:
  order: 29
---

## 핵심 개념

공개키 암호(Public-Key Cryptography)는 공개키(public key)와 개인키(private key)라는 수학적으로 연결된 키 쌍을 사용하여, 키 분배 문제를 해결하는 비대칭 암호 방식이다. 1976년 Whitfield Diffie와 Martin Hellman이 발표한 혁명적 아이디어이다.

## 동작 원리

**핵심 원리**:
- 각 사용자가 **키 쌍**(공개키 + 개인키)을 생성
- **공개키**: 누구에게나 공개. 전화번호부처럼 배포 가능
- **개인키**: 본인만 비밀로 보관
- 공개키로 암호화한 것은 대응하는 개인키로만 복호화 가능
- 개인키로 암호화한 것은 대응하는 공개키로만 복호화 가능 (디지털 서명)

**RSA 알고리즘**:
- 공개키 암호의 가장 대표적인 알고리즘 (Rivest, Shamir, Adleman, 1977)
- 큰 수의 소인수분해가 매우 어렵다는 수학적 사실에 기반
- 두 큰 소수의 곱은 쉽게 계산 가능하지만, 결과로부터 원래 소수를 찾는 것은 극도로 어려움
- 2048비트 이상의 키를 권장

**HTTPS에서의 사용**:
공개키 암호는 대칭키 암호보다 100~1000배 느리므로, 실제로는 두 방식을 **조합**하여 사용한다.
1. 공개키 암호로 대칭키를 안전하게 교환 (느리지만 소량의 데이터)
2. 교환된 대칭키로 실제 통신 데이터를 암호화 (빠름, 대량의 데이터)

이 하이브리드 방식이 HTTPS, TLS/SSL의 동작 원리이다.

**Diffie-Hellman 키 교환**:
두 당사자가 공개된 채널을 통해 비밀 키를 안전하게 합의하는 프로토콜. 도청자가 교환 과정을 모두 관찰하더라도 최종 비밀 키를 알 수 없다.

## 예시

공개키 암호 통신:
```
1. Bob이 키 쌍 생성: 공개키(PUB_B), 개인키(PRIV_B)
2. Bob이 공개키(PUB_B)를 공개적으로 배포

3. Alice가 메시지를 Bob에게 보내려 할 때:
   암호문 = 암호화("안녕하세요", PUB_B)
   → 누구나 볼 수 있는 채널로 암호문 전송

4. Bob이 수신:
   평문 = 복호화(암호문, PRIV_B)
   → "안녕하세요"

핵심: Bob의 개인키를 모르는 도청자는 암호문을 해독할 수 없음
```

RSA의 수학적 기반 (단순화):
```
1. 두 큰 소수 선택: p=61, q=53
2. n = p × q = 3233 (공개)
3. p와 q를 알면 개인키 계산 가능
4. n만 알면 p, q를 구하기 어려움 (소인수분해)

실제로는 p, q가 각각 수백 자릿수의 소수
→ n에서 p, q를 구하는 것이 사실상 불가능
```

키 분배 문제 해결:
```
대칭키: 1000명 → 499,500개 키 관리 필요
공개키: 1000명 → 각자 1개 키 쌍 = 1000개만 관리
```

## 관련 개념

- [암호학 (Cryptography)](/knowledge/distributed-systems/cryptography/) - 암호학의 두 축 중 하나
- [대칭키 암호 (Symmetric-Key Cryptography)](/knowledge/distributed-systems/symmetric-key-cryptography/) - 공개키 암호와 조합하여 사용
- [디지털 서명 (Digital Signature)](/knowledge/distributed-systems/digital-signature/) - 개인키를 사용한 서명 (공개키 암호의 역방향 활용)
- [암호학적 해시 (Cryptographic Hash)](/knowledge/distributed-systems/cryptographic-hash/) - 디지털 서명에서 해시와 함께 사용

## 출처

- Understanding the Digital World, Chapter 12
