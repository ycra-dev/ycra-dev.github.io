---
title: "LDAP"
description: "LDAP(Lightweight Directory Access Protocol)는 조직의 사용자, 자원 등의 정보를 계층적으로 저장하고 검색하기 위한 경량 디렉터리 접근 프로토콜로, 인증(authentication)과 조직 정보 공유에 널리 사용되는 업계 표준이다"
tags: ['Ldap', 'Directory System', 'Authentication', 'Distributed Directory', 'X500']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/ldap
sidebar:
  order: 6
---

## 핵심 개념

디렉터리 시스템은 특정 클래스의 객체(예: 사람)에 대한 정보를 나열하는 시스템이다. 데이터베이스 시스템에 저장할 수도 있지만, 디렉터리 전용 프로토콜이 존재하는 이유가 있다.

첫째, 디렉터리 접근 프로토콜은 제한된 유형의 데이터 접근에 특화된 간소화된 프로토콜이다. 둘째, 디렉터리 시스템은 파일 시스템과 유사한 계층적 명명 메커니즘을 제공하여, 분산 디렉터리 시스템에서 각 서버에 저장될 정보를 명시할 수 있다.

**LDAP 데이터 모델**: LDAP에서 디렉터리는 엔트리(entry)를 저장한다. 각 엔트리는 고유 식별 이름(DN, Distinguished Name)을 가지며, DN은 상대 식별 이름(RDN, Relative Distinguished Name)의 순서로 구성된다.

LDAP는 이진, 문자열, 시간 타입과 전화번호(tel), 우편주소(PostalAddress) 등의 특수 타입을 지원한다. 속성은 기본적으로 다중 값(multivalued)이므로 여러 전화번호나 주소를 저장할 수 있다. 객체 클래스(object class)를 정의할 수 있으며, 상속(inheritance)을 지원한다.

엔트리는 DN에 따라 디렉터리 정보 트리(DIT, Directory Information Tree)로 구성된다. 리프 노드는 보통 특정 객체를, 내부 노드는 조직 단위, 조직, 국가 등을 나타낸다.

**LDAP 쿼리 메커니즘**: LDAP의 쿼리는 매우 단순하여 선택(selection)과 투영(projection)만 지원하고 조인(join)은 없다. 쿼리는 기준(base), 검색 조건, 범위(scope), 반환할 속성, 결과 수 제한 등을 지정해야 한다.

**분산 디렉터리 트리**: 조직의 정보를 여러 DIT에 분산할 수 있다. 한 DIT의 노드가 다른 DIT의 노드를 참조(referral)할 수 있어, 분산된 디렉터리 모음을 통합 가상 디렉터리로 구성할 수 있다. 서버가 쿼리를 받으면 참조를 클라이언트에 반환하거나, 직접 참조된 DIT에 쿼리를 전달할 수 있다.

Microsoft Active Directory가 LDAP 기반의 대표적 구현이며, 많은 조직에서 사용되고 있다.

## 예시

LDAP Distinguished Name 예시:

```
cn=Silberschatz, ou=Computer Science, o=Yale University, c=USA
```

이 DN은 다음과 같은 RDN의 조합이다:
- `cn` (common name): Silberschatz
- `ou` (organizational unit): Computer Science
- `o` (organization): Yale University
- `c` (country): USA

분산 디렉터리 구조 예시:

```
DIT 1 (접미사: o=Nokia, c=USA)
  └── ou=Bell Labs → 참조(referral) → DIT 2

DIT 2 (접미사: ou=Bell Labs, o=Nokia, c=USA)
  └── 실제 Bell Labs 디렉터리 데이터

DIT 3 (접미사: o=Nokia, c=India)
  └── 인도 지사 디렉터리 데이터
```

사용자가 DIT 1에서 Bell Labs 직원을 검색하면, 시스템이 자동으로 DIT 2로 쿼리를 전달한다.

## 관련 개념

- [Database Standardization](/knowledge/database/database-standardization/)
- [Performance Tuning](/knowledge/database/performance-tuning/)
