---
title: "Referential Integrity"
description: "참조 무결성(referential integrity)은 한 릴레이션의 특정 속성에 나타나는 값이 반드시 다른 릴레이션의 특정 속성에도 존재해야 한다는 제약 조건으로, 릴레이션 간의 참조 관계에서 데이터의 일관성을 보장한다"
tags: ['Referential Integrity', 'Foreign Key', 'Cascade', 'Constraint']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/referential-integrity
sidebar:
  order: 17
---

## 핵심 개념

참조 무결성은 외래키 제약 조건보다 더 일반적인 개념이다. 외래키 제약은 참조되는 속성이 반드시 피참조 릴레이션의 기본키여야 하지만, 참조 무결성 제약에서는 피참조 속성이 기본키가 아닌 경우도 포함한다. 그러나 대부분의 상용 데이터베이스 시스템에서는 외래키 제약만을 직접 지원한다.

참조 무결성 위반이 발생할 수 있는 상황은 네 가지이다:
1. **참조 릴레이션에 삽입:** 새 튜플의 외래키 값이 피참조 릴레이션에 존재하지 않을 때
2. **피참조 릴레이션에서 삭제:** 삭제되는 튜플의 기본키를 참조하는 튜플이 참조 릴레이션에 존재할 때
3. **참조 릴레이션에서 수정:** 외래키 속성이 새로운 값으로 변경될 때 그 값이 피참조 릴레이션에 존재하지 않을 때
4. **피참조 릴레이션에서 수정:** 기본키 속성이 변경될 때 이전 값을 참조하는 튜플이 존재할 때

SQL에서는 참조 무결성 위반 시 다음과 같은 보상 동작을 지정할 수 있다:
- **CASCADE:** 피참조 릴레이션의 변경이 참조 릴레이션에 연쇄적으로 전파된다. ON DELETE CASCADE는 피참조 튜플 삭제 시 참조 튜플도 함께 삭제하고, ON UPDATE CASCADE는 기본키 변경 시 외래키도 함께 변경한다.
- **SET NULL:** 피참조 튜플이 삭제되거나 변경되면 참조 속성을 null로 설정한다.
- **SET DEFAULT:** 참조 속성을 기본값으로 설정한다.
- **RESTRICT/NO ACTION:** 참조하는 튜플이 있으면 변경을 거부한다(기본 동작).

## 예시

```sql
-- 외래키와 참조 무결성 보상 동작
CREATE TABLE course (
    course_id VARCHAR(8),
    title     VARCHAR(50),
    dept_name VARCHAR(20),
    credits   NUMERIC(2,0),
    PRIMARY KEY (course_id),
    FOREIGN KEY (dept_name) REFERENCES department
        ON DELETE SET NULL    -- 학과 삭제 시 null 설정
        ON UPDATE CASCADE     -- 학과명 변경 시 연쇄 변경
);

-- CASCADE 삭제
CREATE TABLE takes (
    ID        VARCHAR(5),
    course_id VARCHAR(8),
    sec_id    VARCHAR(8),
    semester  VARCHAR(6),
    year      NUMERIC(4,0),
    grade     VARCHAR(2),
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    FOREIGN KEY (ID) REFERENCES student
        ON DELETE CASCADE,    -- 학생 삭제 시 수강 기록도 삭제
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section
        ON DELETE CASCADE
);

-- 참조 무결성 위반 예시
-- department에 'Art' 학과가 없는 상태에서:
INSERT INTO instructor VALUES ('99999', 'Kim', 'Art', 50000);
-- 오류: foreign key constraint violation

-- CASCADE 동작 예시
DELETE FROM department WHERE dept_name = 'Finance';
-- course 테이블에서 dept_name이 'Finance'인 행의 dept_name이 null로 설정됨
```

## 관련 개념

- [Foreign Key](/knowledge/database/foreign-key/)
- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [Primary Key](/knowledge/database/primary-key/)
- [SQL](/knowledge/database/sql/)
