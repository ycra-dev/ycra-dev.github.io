---
title: "LDAP (경량 디렉터리 액세스 프로토콜)"
description: "LDAP(Lightweight Directory Access Protocol)은 구조화된 명명과 속성 기반 명명을 결합한 분산 디렉토리 서비스이다"
tags: ['Ldap', 'Directory Service', 'Attribute Based Naming', 'X500']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/ldap
sidebar:
  order: 5
---

## 핵심 개념

**속성 기반 명명(Attribute-based Naming)**: 엔티티에 속성 집합을 연관시키고, 사용자가 원하는 속성 값을 지정하여 검색. 구조화된 명명(DNS 등)과 결합하여 사용.

**디렉토리 서비스 vs 명명 시스템**: 명명 시스템은 구조화된 이름을 지원하고, 디렉토리 서비스는 속성 기반 검색을 지원. LDAP은 두 가지를 결합.

**RDF(Resource Description Framework)**: 자원을 (주체, 술어, 객체) 삼중으로 기술. 예: (Person, name, Alice). 참조는 URL 형태.

**LDAP의 특징**:
- X.500 디렉토리 서비스의 경량 버전
- 디렉토리 정보 기반(Directory Information Base, DIB)에 디렉토리 항목 저장
- 각 항목은 (속성, 값) 쌍의 모음으로 RDF 모델과 유사
- 트리 구조(DIT: Directory Information Tree)로 조직
- Microsoft Active Directory 등에서 널리 사용

**검색의 어려움**: 속성 기반 검색은 본질적으로 모든 디스크립터를 전수 조사해야 함. 분산 데이터 저장소에 검색 쿼리를 보내는 것은 비효율적. 인덱싱으로 개선 가능하나 분산 환경에서는 여전히 도전적.

## 예시

```
# LDAP 디렉토리 항목 예시
dn: cn=John Smith, ou=Engineering, o=Acme Corp, c=US
objectClass: person
cn: John Smith
sn: Smith
mail: jsmith@acme.com
telephoneNumber: +1 555 1234

# LDAP 검색 쿼리
# 기본 DN: ou=Engineering, o=Acme Corp, c=US
# 필터: (&(objectClass=person)(sn=Smith))
# → 성이 Smith인 Engineering 부서의 모든 사람 반환

# RDF 삼중 예시
(Person, name, "Alice")
(Person, worksAt, Organization)
(Organization, name, "Acme Corp")
```

## 관련 개념

- [DNS (도메인 네임 시스템)](/knowledge/distributed-systems/dns/)
- [이름 해석 (Name Resolution)](/knowledge/distributed-systems/name-resolution/)
- [플랫 네이밍 (Flat Naming)](/knowledge/distributed-systems/flat-naming/)
