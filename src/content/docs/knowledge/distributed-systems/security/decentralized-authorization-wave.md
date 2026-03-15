---
title: "분산 인가 WAVE (Decentralized Authorization WAVE)"
description: "WAVE(Wide-Area Verified Exchange)는 다수 조직에 걸쳐 운영되도록 설계된 확장 가능한 분산 인가 서비스로, 그래프 기반 인가와 분산 저장소를 결합하여 중앙 집중식 권한 서버 없이 접근 권한을 위임하고 검증한다"
tags: ['Authorization', 'Decentralized', 'Graph Based', 'Attestation', 'Delegation', 'Wave']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/decentralized-authorization-wave
sidebar:
  order: 19
---

## 핵심 개념

**그래프 기반 인가**: 전역 방향 그래프를 유지한다.
- **정점(vertex)**: 권한을 부여하거나 수신할 수 있는 엔티티 (사용자, 부서, 서비스 등). 각 엔티티는 공개키 컬렉션을 소유.
- **간선(edge)**: 발행자(issuer)에서 주체(subject)로의 권한 위임을 나타내는 증명서(attestation).
- 엔티티 B가 자원에 대한 권한을 증명하려면 소유자 A에서 B까지의 방향 경로를 보여야 한다.

**RTree 정책 메커니즘**: 리소스 트리. URI 형식으로 리소스 식별 (예: `user-entity/music/albums/popular/band/`). RTree 문장은 리소스 ID, 부여된 권한, 유효 기간, 위임 제한을 포함.

**분산 저장소 요구사항**:
1. **단조성 증명**: 위조 불가능한 추가 전용 로그
2. **포함 증명**: 객체가 저장소에 존재함을 보장
3. **비존재 증명**: 객체가 없음을 입증
4. **비모호성 증명**: 모든 클라이언트에게 동일한 뷰 제공

이 요구사항은 블록체인 기반 분산 원장과 매우 유사하다.

**구조적 보안(Structural Security)**: 증명서 암호화를 통한 개인정보 보호.
- A가 B에게 증명서 att 발행: `PK^att_B([att|SK^att_A])`
- B가 C에게 파생 증명서 발행: `PK^att'_C([att'|m1|SK^att_B])` (m1은 A의 원본 포함)
- C는 역방향으로 체인을 복호화하여 모든 증명서 확인 가능. A, B가 온라인일 필요 없음.

## 예시

```
# WAVE 그래프 기반 인가 예시
#
# Alice(발행자) --[파일 읽기/쓰기 권한]--> Bob(주체)
#                                          |
#                                  [파일 읽기 권한]
#                                          |
#                                          v
#                                        Chuck
#
# 증명서(attestation) 구조:
attestation = {
    "issuer_hash": hash(alice_public_keys),
    "subject_hash": hash(bob_public_keys),
    "rtree_statements": [{
        "resource": "alice/documents/project/",
        "permissions": ["read", "write"],
        "duration": "30d",
        "can_delegate": ["read"]
    }],
    "signature": sign(alice_sk, ...)
}

# Chuck의 권한 증명: Alice -> Bob -> Chuck 경로 존재 확인
```

## 관련 개념

- [인가 및 접근 제어 (Authorization and Access Control)](/knowledge/distributed-systems/authorization-and-access-control/)
- [분산 시스템에서의 위임 (Delegation in Distributed Systems)](/knowledge/distributed-systems/delegation-in-distributed-systems/)
- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain/)
- [공개키 인증서 (Public Key Certificate)](/knowledge/distributed-systems/public-key-certificate/)
- [신뢰 컴퓨팅 기반 (Trusted Computing Base)](/knowledge/distributed-systems/trusted-computing-base/)
