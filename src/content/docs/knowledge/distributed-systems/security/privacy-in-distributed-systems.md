---
title: "분산 시스템의 프라이버시 (Privacy in Distributed Systems)"
description: "분산 시스템에서의 프라이버시는 개인정보의 적절한 흐름에 대한 권리로, 단순한 기밀성 보장을 넘어 누가, 언제, 어떻게 개인정보를 열람하는지에 대한 통제를 포함하며, 정보 흐름을 중지하고 철회할 수 있는 능력까지 포괄한다"
tags: ['Privacy', 'Gdpr', 'Confidentiality', 'Data Protection', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/privacy-in-distributed-systems
sidebar:
  order: 20
---

## 핵심 개념

프라이버시와 기밀성의 차이:
- **기밀성(Confidentiality)**: 데이터가 비인가 방식으로 공개되지 않음 (기밀성은 "위반"된다)
- **프라이버시(Privacy)**: 개인정보의 적절한 흐름에 대한 권리 (프라이버시는 "침해"된다)
- 기밀성 보장만으로는 프라이버시를 보장할 수 없다

**GDPR (General Data Protection Regulation, 2016)**: EU의 포괄적 개인정보 보호 규정. 데이터베이스 시스템에 미치는 영향:
- 목적 명시적 데이터 수집 -> 메타데이터 인덱싱 필요
- 데이터 무기한 보관 금지 -> TTL(Time-To-Live) 기반 적시 삭제
- 고객 데이터 접근/삭제 권리 -> 메타데이터 인덱싱
- 적절한 데이터 보안 구현 -> 암호화
- 감사 추적 공유 -> 모니터링 및 로깅

**설계 접근법**:
1. **소유권 중심(Solid)**: 개인정보 통제를 개인에게 부여
2. **데이터플로우 관점**: 시스템을 대규모 데이터플로우 계산으로 모델링. 사용자가 자신의 샤드(shard)를 기여하거나 철회 가능. 철회 시 관련 데이터 흐름 자동 갱신.

**성능과 확장성 문제**: GDPR 준수에 필요한 대량의 메타데이터 유지가 성능에 심각한 영향. 사후 적합성 확보가 사전 설계보다 훨씬 어렵다.

## 예시

```python
# 데이터플로우 기반 프라이버시 (SNS 게시물 예시)
class UserShard:
    """사용자의 개인정보 조각"""
    def __init__(self, user):
        self.personal_info = {}
        self.connections = []  # 다른 샤드 참조
        self.posts = []

def react(original_post, reactions):
    """게시물에 대한 반응 트리 구축"""
    tree = build_tree(original_post, reactions)
    return tree

# Alice가 참여 철회 시
def withdraw(alice_shard, discussion_tree):
    """Alice의 게시물 제거 -> 해당 분기 전체 재귀적 제거"""
    for post in alice_shard.posts:
        remove_branch(discussion_tree, post)
    # react 함수가 입력 변경에 따라 자동 갱신

# GDPR 메타데이터 예시
metadata = {
    "purpose": "marketing",        # 수집 목적
    "ttl": "365 days",             # 보관 기간
    "origin": "user_consent",      # 데이터 출처
    "sharing": ["analytics_team"], # 공유 대상
    "access_control": "restricted" # 접근 제어
}
```

## 관련 개념

- [보안 정책과 메커니즘 (Security Policy and Mechanism)](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [동형 암호화 (Homomorphic Encryption)](/knowledge/distributed-systems/homomorphic-encryption/)
- [인가 및 접근 제어 (Authorization and Access Control)](/knowledge/distributed-systems/authorization-and-access-control/)
- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain/)
- [다자간 연산 (Multiparty Computation)](/knowledge/distributed-systems/multiparty-computation/)
