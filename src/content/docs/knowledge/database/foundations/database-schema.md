---
title: "Database Schema"
description: "데이터베이스 스키마(Database Schema)는 데이터베이스의 전체적인 설계를 의미하며, 데이터베이스 인스턴스(instance)는 특정 시점에 데이터베이스에 저장된 정보의 집합을 의미한다"
tags: ['Database Schema', 'Instance', 'Physical Schema', 'Logical Schema']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/database-schema
sidebar:
  order: 4
---

## 핵심 개념

데이터베이스 스키마와 인스턴스의 관계는 프로그래밍 언어에서 변수 선언과 변수의 값에 비유할 수 있다. 스키마는 변수 선언(타입 정의 포함)에 해당하고, 인스턴스는 특정 시점의 변수 값에 해당한다.

데이터베이스 시스템은 추상화 수준에 따라 여러 스키마를 가진다. 물리적 스키마(physical schema)는 물리적 수준에서의 데이터베이스 설계를 기술하고, 논리적 스키마(logical schema)는 논리적 수준에서의 설계를 기술한다. 뷰 수준에서는 서브스키마(subschema)라고 불리는 여러 스키마가 존재할 수 있다.

논리적 스키마가 가장 중요한데, 프로그래머들이 논리적 스키마를 사용하여 응용 프로그램을 구축하기 때문이다. 물리적 스키마는 논리적 스키마 아래에 숨겨져 있으며, 응용 프로그램에 영향을 주지 않고 변경할 수 있다. 이를 물리적 데이터 독립성(physical data independence)이라 한다.

스키마 설계 시에는 불필요한 정보 중복과 같은 문제를 피해야 한다. 예를 들어, 부서 예산을 instructor 레코드의 속성으로 저장하면 해당 부서의 예산이 변경될 때 관련된 모든 교수 레코드를 수정해야 한다.

## 예시

대학교 데이터베이스의 논리적 스키마 예시:

```
classroom(building, room_number, capacity)
department(dept_name, building, budget)
course(course_id, title, dept_name, credits)
instructor(ID, name, dept_name, salary)
section(course_id, sec_id, semester, year, building, room_number, time_slot_id)
teaches(ID, course_id, sec_id, semester, year)
student(ID, name, dept_name, tot_cred)
```

밑줄 친 속성은 기본 키(primary key)를 나타낸다.

## 관련 개념

- [Data Abstraction](/knowledge/database/data-abstraction/)
- [Data Model](/knowledge/database/data-model/)
- [Schema Diagram](/knowledge/database/schema-diagram/)
