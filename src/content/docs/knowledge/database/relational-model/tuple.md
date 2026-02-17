---
title: "Tuple"
description: "튜플(tuple)은 릴레이션에서 하나의 행(row)을 의미하며, 각 속성에 대한 값들의 순서 있는 집합으로 하나의 개체(entity)에 대한 정보를 나타낸다"
tags: ['Tuple', 'Row', 'Record', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/tuple
sidebar:
  order: 2
---

## 핵심 개념

튜플은 릴레이션의 기본 데이터 단위이다. 하나의 튜플은 릴레이션 스키마에 정의된 모든 속성에 대한 값을 포함한다. 예를 들어, instructor 릴레이션의 한 튜플은 특정 교수의 ID, 이름, 학과명, 급여를 담고 있다.

수학적 관점에서 릴레이션은 튜플의 집합이므로, 동일한 릴레이션 내에 완전히 동일한 두 개의 튜플은 존재할 수 없다. 그러나 SQL 기반의 실제 데이터베이스에서는 기본키(primary key) 제약 조건이 선언된 경우에만 이 규칙이 강제된다.

튜플의 각 속성 값은 해당 속성의 도메인에 속하는 원자적 값이어야 한다. 속성 값이 알 수 없거나 존재하지 않는 경우에는 null 값이 사용된다. null 값은 데이터베이스 연산에서 특별한 처리가 필요하며, 비교 연산이나 산술 연산에서 예상치 못한 결과를 초래할 수 있다.

릴레이션 인스턴스에 포함된 튜플의 순서는 의미가 없다. 즉, 동일한 튜플들의 집합이라면 순서가 달라도 같은 릴레이션 인스턴스로 간주된다. 이는 릴레이션이 수학적 집합에 기반하기 때문이다.

## 예시

instructor 릴레이션에서 하나의 튜플 예시:

```
(10101, 'Srinivasan', 'Comp. Sci.', 65000)
```

이 튜플은 ID가 10101인 교수 Srinivasan이 Computer Science 학과에 소속되어 있으며, 급여가 65,000달러임을 나타낸다.

```sql
-- 튜플 삽입
INSERT INTO instructor VALUES ('10101', 'Srinivasan', 'Comp. Sci.', 65000);

-- 특정 조건의 튜플 검색
SELECT * FROM instructor WHERE ID = '10101';
```

## 관련 개념

- [Relation](/knowledge/database/relation/)
- [Attribute](/knowledge/database/attribute/)
- [Primary Key](/knowledge/database/primary-key/)
- [NULL Value](/knowledge/database/null-value/)
