---
title: "Schema Diagram"
description: "스키마 다이어그램(schema diagram)은 데이터베이스 스키마를 기본키와 외래키 제약 조건과 함께 시각적으로 표현한 그림으로, 릴레이션들의 구조와 관계를 한눈에 파악할 수 있게 해준다"
tags: ['Schema Diagram', 'Database Design', 'Visualization', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/schema-diagram
sidebar:
  order: 4
---

## 핵심 개념

스키마 다이어그램에서 각 릴레이션은 상자(box)로 표현된다. 상자의 상단에 릴레이션 이름이 표시되고, 그 안에 속성들이 나열된다. 기본키 속성은 밑줄로 표시되어 다른 속성과 구분된다.

외래키 제약 조건은 참조 릴레이션의 외래키 속성에서 피참조 릴레이션의 기본키로 향하는 화살표로 표현된다. 이 화살표를 통해 릴레이션 간의 참조 관계를 직관적으로 파악할 수 있다.

참조 무결성 제약 조건이 외래키 제약이 아닌 경우(피참조 속성이 기본키가 아닌 경우)에는 단일 화살표 대신 양방향 화살표(two-headed arrow)를 사용하여 표시한다. 예를 들어, section 릴레이션의 time_slot_id가 time_slot 릴레이션의 time_slot_id를 참조하지만, time_slot_id가 time_slot의 기본키 전체가 아니므로 양방향 화살표로 표시된다.

스키마 다이어그램은 엔티티-관계 다이어그램(E-R diagram)과 외관상 유사할 수 있으나, 전혀 다른 표기법이므로 혼동하지 않아야 한다. 많은 데이터베이스 시스템에서 스키마 다이어그램을 생성하는 그래픽 사용자 인터페이스(GUI) 도구를 제공한다.

## 예시

대학교 데이터베이스의 스키마 다이어그램 구조:

```
[student]              [takes]              [section]
 ID (PK)     ------>   ID (FK)              course_id (PK, FK) ----> [course]
 name                  course_id (FK) --->  sec_id (PK)               course_id (PK)
 dept_name (FK) --->   sec_id (FK)          semester (PK)             title
 tot_cred              semester (FK)        year (PK)                 dept_name (FK) --->
                       year (FK)            building (FK) ------>     credits
                       grade                room_number (FK) -->
                                            time_slot_id         [department]
[instructor]           [teaches]                                  dept_name (PK)
 ID (PK)     ------>   ID (FK)             [classroom]            building
 name                  course_id (FK) -->   building (PK)         budget
 dept_name (FK) --->   sec_id (FK)          room_number (PK)
 salary                semester (FK)        capacity
                       year (FK)
```

스키마 다이어그램을 통해 릴레이션 간 참조 관계를 한눈에 파악할 수 있다.

## 관련 개념

- [Database Schema](/knowledge/database/database-schema/)
- [Primary Key](/knowledge/database/primary-key/)
- [Foreign Key](/knowledge/database/foreign-key/)
- [Referential Integrity](/knowledge/database/referential-integrity/)
- [Relation](/knowledge/database/relation/)
