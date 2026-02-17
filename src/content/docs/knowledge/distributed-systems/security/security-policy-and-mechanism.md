---
title: "Security Policy and Mechanism"
description: "보안 정책(Security Policy)은 시스템 내 엔티티들이 수행할 수 있는 행동과 금지된 행동을 정확히 기술하는 명세이며, 보안 메커니즘(Security Mechanism)은 해당 정책을 실제로 강제하기 위한 기술적 수단이다"
tags: ['Security', 'Distributed Systems', 'Access Control', 'Threat Model']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/security-policy-and-mechanism
sidebar:
  order: 1
---

## 핵심 개념

분산 시스템의 보안은 기밀성(confidentiality), 무결성(integrity), 가용성(availability)이라는 세 가지 핵심 속성을 보호하는 것에 기반한다. 보안 위협은 크게 세 가지로 분류된다: (1) 비인가 정보 공개, (2) 비인가 정보 수정, (3) 비인가 사용 거부(서비스 거부). 이 위협들은 각각 기밀성, 무결성, 가용성에 대응한다.

보안 정책이 먼저 수립되어야 보안 메커니즘을 설계할 수 있다. 주요 보안 메커니즘은 네 가지가 있다: (1) 암호화 - 데이터를 공격자가 이해할 수 없는 형태로 변환, (2) 인증 - 사용자나 클라이언트의 신원 확인, (3) 인가 - 인증된 엔티티의 작업 수행 권한 확인, (4) 모니터링 및 감사 - 자산 접근 추적 및 침입 탐지. 이 네 가지 메커니즘이 조합되어 다양한 보안 정책을 구현한다.

## 예시

보안 정책과 메커니즘의 관계를 간단한 의사코드로 표현하면:

```python
# 보안 정책 정의
policy = {
    "user_alice": {"read": ["file_a", "file_b"], "write": ["file_a"]},
    "user_bob": {"read": ["file_b"], "write": []},
}

# 보안 메커니즘: 참조 모니터
def reference_monitor(user, operation, resource):
    if user not in policy:
        return "DENIED: unknown user"  # 인증 실패
    if operation in policy[user] and resource in policy[user][operation]:
        return "ALLOWED"               # 인가 성공
    return "DENIED: unauthorized"       # 인가 실패
```

## 관련 개념

- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Authorization and Access Control](/knowledge/distributed-systems/authorization-and-access-control/)
- [Symmetric and Asymmetric Cryptosystem](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
- [Trusted Computing Base](/knowledge/distributed-systems/trusted-computing-base/)
- [Intrusion Detection System](/knowledge/distributed-systems/intrusion-detection-system/)
