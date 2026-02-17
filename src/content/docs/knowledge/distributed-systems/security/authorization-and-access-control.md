---
title: "Authorization and Access Control"
description: "인가(Authorization)는 인증된 엔티티가 시스템 자원에 대해 허용된 작업만 수행하도록 보장하는 메커니즘으로, 주체(subject)가 객체(object)에 대해 요청한 작업의 허용 여부를 판단하는 참조 모니터(reference monitor)에 의해 강제된다"
tags: ['Authorization', 'Access Control', 'Rbac', 'Abac', 'Acl', 'Capability', 'Security']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/authorization-and-access-control
sidebar:
  order: 13
---

## 핵심 개념

**네 가지 접근 제어 정책**:

1. **MAC (Mandatory Access Control)**: 중앙 관리자가 접근 권한 결정. 군사 보안에서 사용. 보안 레벨(public ~ top secret)에 따른 데이터 분류.

2. **DAC (Discretionary Access Control)**: 객체 소유자가 접근 권한 설정. Unix 시스템의 read/write/execute 권한이 대표적 (소유자/그룹/기타).

3. **RBAC (Role-Based Access Control)**: 사용자의 역할에 기반한 권한 부여. 교수, 학생, 프로젝트 관리자 등의 역할에 따라 접근 결정.

4. **ABAC (Attribute-Based Access Control)**: 사용자, 객체, 환경, 연결, 관리 속성을 종합적으로 고려. 가장 세밀한 접근 제어 가능.

**접근 제어 행렬(Access Control Matrix)**: M[s,o]에 주체 s가 객체 o에 수행 가능한 작업 기록. 구현 방식:
- **ACL (Access Control List)**: 열 기준 분배 - 각 객체가 접근 권한 목록 유지
- **Capability**: 행 기준 분배 - 각 주체가 권한 목록(티켓) 보유, 서명으로 위변조 방지

**Policy Machine**: ABAC 구현 시스템으로 할당(assignment), 금지(prohibition), 의무(obligation)를 통해 MAC, DAC, RBAC를 모두 표현 가능.

## 예시

```bash
# DAC 예시 (Unix)
alice$ chmod u=rw,g=r,o= document  # 소유자:읽기쓰기, 그룹:읽기, 기타:없음
root# chown alice:teachers document  # 소유권 설정

# RBAC 예시 (Policy Machine)
# Alice -> Teachers (역할 할당)
# allowed(Teachers, {read, write}, CourseGrades)

# ABAC 예시 - 세밀한 제어
# "분산시스템 과목 교수만 해당 과목 수강생의 성적 읽기 가능"
policy_rule = {
    "user_attr": {"role": "teacher", "course": "DistributedSystems"},
    "object_attr": {"type": "grade", "course": "DistributedSystems"},
    "permission": "read"
}

# MAC 정보 유출 방지 (의무 규칙)
# when u reads f ∈ OL3 then denied(u, {write}, ¬{OL3, OL4, OL5})
```

## 관련 개념

- [Security Policy and Mechanism](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Delegation in Distributed Systems](/knowledge/distributed-systems/delegation-in-distributed-systems/)
- [Kerberos Authentication Service](/knowledge/distributed-systems/kerberos-authentication-service/)
- [Security Design Principles](/knowledge/distributed-systems/security-design-principles/)
