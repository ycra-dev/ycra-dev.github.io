---
title: "Storage Manager"
description: "저장 관리자(Storage Manager)는 데이터베이스에 저장된 저수준 데이터와 시스템에 제출된 응용 프로그램 및 질의 사이의 인터페이스를 제공하는 데이터베이스 시스템 구성요소이다"
tags: ['Storage Manager', 'Buffer Manager', 'File Manager', 'Data Dictionary']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/storage-manager
sidebar:
  order: 7
---

## 핵심 개념

데이터베이스는 일반적으로 대용량 저장 공간을 필요로 한다. 기업 데이터베이스는 수백 기가바이트에서 수 테라바이트에 이르며, 가장 큰 기업은 페타바이트 규모에 달한다. 주 메모리가 이 모든 정보를 저장할 수 없고 시스템 충돌 시 주 메모리의 내용이 손실되므로, 정보는 디스크에 저장된다. 저장 관리자는 파일 관리자와 상호작용하여 다양한 DML 문을 저수준 파일 시스템 명령으로 변환하는 역할을 한다.

저장 관리자의 구성요소는 네 가지이다. 권한 및 무결성 관리자(Authorization and Integrity Manager)는 무결성 제약 조건의 만족 여부를 검사하고 사용자의 데이터 접근 권한을 확인한다. 트랜잭션 관리자(Transaction Manager)는 시스템 장애에도 데이터베이스가 일관된 상태를 유지하도록 보장한다. 파일 관리자(File Manager)는 디스크 저장 공간의 할당과 데이터 구조를 관리한다. 버퍼 관리자(Buffer Manager)는 디스크에서 주 메모리로 데이터를 가져오고 어떤 데이터를 캐시할지 결정한다.

저장 관리자가 구현하는 주요 데이터 구조에는 데이터 파일(database 자체 저장), 데이터 사전(스키마 등 메타데이터 저장), 인덱스(특정 값을 가진 데이터 항목에 대한 빠른 접근 제공)가 있다.

## 예시

저장 관리자의 동작 예시:

```
사용자 질의: "Physics 학과의 모든 교수를 찾아라"

1. 권한 관리자: 사용자가 instructor 테이블에 대한 읽기 권한이 있는지 확인
2. 버퍼 관리자: instructor 테이블의 관련 데이터 블록을 디스크에서 메모리로 로드
3. 파일 관리자: dept_name에 대한 인덱스를 사용하여 'Physics' 레코드 위치 파악
4. 결과를 상위 계층(질의 처리기)으로 전달
```

## 관련 개념

- [Query Processor](/knowledge/database/query-processor/)
