---
title: "Data Dictionary"
description: "데이터 사전(Data Dictionary)은 릴레이션의 스키마, 저장 조직, 인덱스 정보, 사용자 권한 등 데이터베이스에 관한 메타데이터를 저장하는 구조로, 시스템 카탈로그(system catalog)라고도 한다"
tags: ['Data Dictionary', 'System Catalog', 'Metadata', 'Schema Information', 'Database Administration']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-dictionary
sidebar:
  order: 12
---

## 핵심 개념

데이터 사전에 저장되는 주요 정보:
- 릴레이션 이름
- 각 릴레이션의 속성 이름, 도메인, 길이
- 뷰 이름과 정의
- 무결성 제약 조건(키 제약 등)
- 사용자 이름, 기본 스키마, 인증 정보
- 각 사용자의 권한 정보
- 릴레이션의 튜플 수, 각 속성의 고유 값 수 등 통계 정보

저장 조직에 관한 정보도 기록된다: 릴레이션의 저장 방식(힙, 순차, 해시 등), 릴레이션이 저장된 파일 이름이나 블록 위치, 인덱스 이름, 인덱스가 정의된 릴레이션과 속성, 인덱스 유형 등이 포함된다.

대부분의 데이터베이스 시스템은 시스템 메타데이터를 데이터베이스 내의 릴레이션으로 저장한다. 이렇게 하면 시스템의 전체 구조가 단순해지고, 데이터베이스 자체의 빠른 접근 능력을 시스템 데이터에도 활용할 수 있다. 다만 Relation_metadata 릴레이션 자체의 위치와 저장 조직은 데이터베이스 코드나 고정 위치에 별도로 기록해야 한다.

시스템 메타데이터는 매우 빈번하게 접근되므로, 대부분의 데이터베이스는 시작 시 데이터 사전을 디스크에서 인메모리 자료 구조로 읽어들여 효율적으로 접근한다.

## 예시

데이터 사전의 관계형 스키마 예시:

```
Relation_metadata (
    relation_name,
    number_of_attributes,
    storage_organization,
    location
)

Attribute_metadata (
    relation_name,
    attribute_name,
    domain_type,
    position,
    length
)

Index_metadata (
    index_name,
    relation_name,
    index_type,
    index_attributes    -- 예: "dept_name, building"
)

User_metadata (
    user_name,
    encrypted_password,
    group
)

View_metadata (
    view_name,
    definition
)
```

## 관련 개념

- [File Organization](/knowledge/database/file-organization/)
- [Buffer Pool](/knowledge/database/buffer-pool/)
- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Hash Index](/knowledge/database/hash-index/)
