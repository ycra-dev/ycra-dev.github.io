---
title: "공개키 인증서 (Public Key Certificate)"
description: "공개키 인증서(Public Key Certificate)는 공개키와 해당 키의 소유자를 식별하는 문자열이 함께 묶여 인증 기관(CA)에 의해 서명된 디지털 문서로, 공개키의 소유권을 인증하는 메커니즘이다"
tags: ['Cryptography', 'Certificate', 'Pki', 'Certification Authority', 'Key Management']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/public-key-certificate
sidebar:
  order: 7
---

## 핵심 개념

공개키 배포의 핵심 문제는 수신자가 해당 공개키가 실제로 주장된 소유자의 것인지 확인해야 한다는 것이다. 인증서는 이 문제를 해결한다.

**인증서 구조**:
- 공개키 (PK)
- 소유자 식별 정보
- 인증 기관(CA)의 서명: `SK_CA(PK, identifier)`

**인증서 검증 과정**: 클라이언트가 인증서의 공개키 소유권을 확인하려면, CA의 공개키 `PK_CA`로 서명을 검증한다. 주요 CA들의 공개키는 웹 브라우저에 내장되어 배포된다.

**인증서 폐기(Revocation)**:
1. **인증서 폐기 목록(CRL)**: CA가 정기적으로 발행. 발행 간격이 곧 취소 지연 시간.
2. **유효 기간 제한**: 인증서에 만료 시간 설정. Let's Encrypt 시스템이 자동 갱신 지원.
3. **실시간 검증**: 수명을 극도로 줄여 매번 CA에 확인 요청 (CA가 항상 온라인이어야 함).

**신뢰 체인(Trust Chain)**: CA의 공개키를 신뢰할 수 없으면, 해당 키도 다른 CA가 서명한 인증서로 검증. 체인의 끝에 있는 CA는 반드시 신뢰해야 함.

**웹 오브 트러스트(Web of Trust)**: PGP에서 시작된 대안. 사용자들이 직접 만나 공개키를 교환하고 서로의 키에 서명. 분산된 신뢰 모델이지만 대규모 운영에서의 효과에 대한 합의가 없다.

## 예시

```
# TLS 인증서 체인 검증 예시
1. 서버가 인증서를 클라이언트에게 전송:
   cert = {PK_server, "example.com", sig_CA(PK_server, "example.com")}

2. 클라이언트가 CA의 공개키로 검증:
   verify(PK_CA, sig_CA) == (PK_server, "example.com")  # True면 유효

3. CA의 PK_CA가 브라우저에 내장되어 있지 않으면:
   cert_CA = {PK_CA, "IntermediateCA", sig_RootCA(PK_CA, "IntermediateCA")}
   # Root CA의 공개키는 브라우저에 내장 -> 신뢰 체인 완성
```

## 관련 개념

- [대칭 및 비대칭 암호 시스템 (Symmetric and Asymmetric Cryptosystem)](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
- [디지털 서명과 해시 함수 (Digital Signature and Hash Function)](/knowledge/distributed-systems/digital-signature-and-hash-function/)
- [전송 계층 보안 (Transport Layer Security)](/knowledge/distributed-systems/transport-layer-security/)
- [신뢰 컴퓨팅 기반 (Trusted Computing Base)](/knowledge/distributed-systems/trusted-computing-base/)
- [시빌 공격 (Sybil Attack)](/knowledge/distributed-systems/sybil-attack/)
