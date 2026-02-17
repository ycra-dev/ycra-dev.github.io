---
title: "Data Model"
description: "데이터 모델(Data Model)은 데이터, 데이터 관계, 데이터 의미론, 일관성 제약 조건을 기술하기 위한 개념적 도구들의 모음이다"
tags: ['Data Model', 'Relational Model', 'E-R Model', 'Semi Structured']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-model
sidebar:
  order: 3
---

## 핵심 개념

데이터 모델은 데이터베이스 구조의 기반이 되며, 네 가지 주요 범주로 분류된다.

관계형 모델(Relational Model)은 데이터와 데이터 간의 관계를 테이블(릴레이션)의 집합으로 표현한다. 각 테이블은 여러 열(속성)을 가지며, 각 열은 고유한 이름을 갖는다. 관계형 모델은 레코드 기반 모델의 한 예로, 현재 가장 널리 사용되는 데이터 모델이다.

개체-관계 모델(Entity-Relationship Model, E-R 모델)은 기본 객체인 개체(entity)와 이러한 객체 간의 관계(relationship)를 사용한다. 데이터베이스 설계에 널리 사용된다.

반구조적 데이터 모델(Semi-structured Data Model)은 동일한 타입의 개별 데이터 항목이 서로 다른 속성 집합을 가질 수 있도록 허용한다. JSON과 XML이 대표적인 반구조적 데이터 표현이다.

객체 기반 데이터 모델(Object-Based Data Model)은 객체지향 프로그래밍의 개념을 데이터베이스에 통합한 것으로, 캡슐화, 메서드, 객체 식별성 등의 개념을 관계형 모델에 확장한다.

데이터 모델의 중요한 특징은 저수준 구현 세부사항을 데이터베이스 사용자뿐 아니라 응용 프로그램 개발자에게도 숨긴다는 것이다. 이를 통해 개발자는 데이터 모델의 추상화를 사용하여 데이터를 저장하고 검색할 수 있다.

## 예시

관계형 모델에서 대학교 데이터를 표현하는 예시:

```
instructor 테이블:
| ID    | name       | dept_name  | salary |
|-------|------------|------------|--------|
| 22222 | Einstein   | Physics    | 95000  |
| 12121 | Wu         | Finance    | 90000  |
| 45565 | Katz       | Comp. Sci. | 75000  |

department 테이블:
| dept_name  | building | budget  |
|------------|----------|---------|
| Comp. Sci. | Taylor   | 100000  |
| Biology    | Watson   | 90000   |
```

## 관련 개념

- [Database Management System (DBMS)](/knowledge/database/database-management-system-dbms/)
- [Data Abstraction](/knowledge/database/data-abstraction/)
- [Relation](/knowledge/database/relation/)
- [Database Schema](/knowledge/database/database-schema/)
