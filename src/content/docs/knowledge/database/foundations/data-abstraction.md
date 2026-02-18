---
title: "Data Abstraction"
description: "데이터 추상화(Data Abstraction)는 데이터베이스 시스템이 데이터의 저장 및 유지 관리에 대한 세부 사항을 사용자에게 숨기고, 단순화된 데이터 뷰를 제공하는 것을 의미한다"
tags: ['Data Abstraction', 'Physical Level', 'Logical Level', 'View Level']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-abstraction
sidebar:
  order: 2
---

## 핵심 개념

데이터베이스 시스템은 효율적인 데이터 검색을 위해 복잡한 데이터 구조를 사용하지만, 대부분의 사용자는 컴퓨터 전문가가 아니므로 이러한 복잡성을 숨길 필요가 있다. 이를 위해 데이터베이스 시스템은 세 단계의 데이터 추상화를 제공한다.

물리적 수준(Physical Level)은 가장 낮은 추상화 수준으로, 데이터가 실제로 어떻게 저장되는지를 설명한다. 연속된 바이트 블록, 인덱스 같은 데이터 구조, 파일 내 레코드 저장 방식 등 저수준 구현 세부사항을 다룬다.

논리적 수준(Logical Level)은 다음 단계의 추상화로, 데이터베이스에 어떤 데이터가 저장되고 그 데이터 간에 어떤 관계가 존재하는지를 설명한다. 데이터베이스 관리자(DBA)는 이 수준에서 작업하며, 물리적 수준의 복잡한 구조를 알 필요가 없다. 이를 물리적 데이터 독립성(physical data independence)이라 한다.

뷰 수준(View Level)은 가장 높은 추상화 수준으로, 전체 데이터베이스의 일부만을 기술한다. 사용자들은 자신에게 필요한 부분만 볼 수 있으며, 이는 보안 메커니즘으로도 기능한다. 하나의 데이터베이스에 대해 여러 개의 뷰가 존재할 수 있다.

이 세 수준의 추상화 개념은 프로그래밍 언어의 타입 시스템과 유사하다. 물리적 수준은 메모리 내 바이트 표현에, 논리적 수준은 구조체(struct) 타입 정의에, 뷰 수준은 응용 프로그램의 사용자 인터페이스에 비유할 수 있다.

## 예시

```
-- 논리적 수준에서의 instructor 레코드 타입 정의
type instructor = record
    ID       : char(5);
    name     : char(20);
    dept_name: char(20);
    salary   : numeric(8,2);
end;
```

- 물리적 수준: instructor 레코드가 디스크 상에 연속된 바이트 블록으로 저장됨
- 논리적 수준: instructor가 ID, name, dept_name, salary 필드를 가진 레코드 타입으로 정의됨
- 뷰 수준: 등록처 직원은 학생 정보만 보고, 급여 정보는 보이지 않음

## 관련 개념

- [Database Schema](/knowledge/database/database-schema/)
- [Data Model](/knowledge/database/data-model/)
