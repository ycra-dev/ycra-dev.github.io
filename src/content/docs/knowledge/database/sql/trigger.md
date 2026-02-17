---
title: "Trigger"
description: "트리거(trigger)는 데이터베이스에서 특정 이벤트(삽입, 삭제, 수정)가 발생했을 때 자동으로 실행되는 명령문으로, 데이터의 무결성을 유지하거나 비즈니스 규칙을 자동으로 적용하기 위해 사용된다"
tags: ['Trigger', 'Event Driven', 'Before After', 'Row Level', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/trigger
sidebar:
  order: 20
---

## 핵심 개념

트리거는 "이벤트-조건-동작(Event-Condition-Action, ECA)" 모델에 기반한다. 이벤트가 발생하면 조건을 평가하고, 조건이 참이면 지정된 동작을 실행한다.

트리거를 정의할 때 지정하는 세 가지 요소:

**이벤트(Event):** 트리거를 발동시키는 데이터베이스 변경 유형이다. INSERT, DELETE, UPDATE가 있으며, UPDATE의 경우 특정 속성의 변경만을 대상으로 지정할 수도 있다(UPDATE OF salary).

**조건(Condition):** 트리거의 동작을 실행할지 결정하는 선택적 조건이다. WHEN 절로 지정하며, 조건이 참일 때만 동작이 실행된다.

**동작(Action):** 이벤트 발생 후 조건이 만족될 때 실행되는 SQL 문이다.

트리거의 실행 시점:
- **BEFORE 트리거:** 이벤트가 실행되기 전에 동작한다. 입력 데이터의 유효성 검사나 값의 자동 수정에 적합하다.
- **AFTER 트리거:** 이벤트가 실행된 후에 동작한다. 감사 로그(audit log) 기록이나 연쇄적 갱신에 적합하다.

트리거의 단위:
- **행 수준(Row-level) 트리거:** FOR EACH ROW로 지정하며, 영향을 받는 각 행에 대해 트리거가 실행된다. 트리거 내부에서 OLD ROW(수정/삭제 전 값)와 NEW ROW(삽입/수정 후 값)를 참조할 수 있다.
- **문장 수준(Statement-level) 트리거:** FOR EACH STATEMENT로 지정하며, SQL 문 전체에 대해 한 번만 실행된다. OLD TABLE과 NEW TABLE을 참조할 수 있다.

트리거의 과도한 사용은 시스템을 복잡하게 만들고, 예상치 못한 동작을 초래할 수 있으므로 주의가 필요하다. 특히 트리거가 다른 트리거를 연쇄적으로 발동시키는 경우 무한 루프에 빠질 수 있다.

## 예시

```sql
-- AFTER INSERT 트리거: 학생 수강 시 학점 자동 업데이트
CREATE TRIGGER credits_earned
AFTER UPDATE OF grade ON takes
REFERENCING NEW ROW AS nrow
REFERENCING OLD ROW AS orow
FOR EACH ROW
WHEN nrow.grade <> 'F' AND nrow.grade IS NOT NULL
    AND (orow.grade = 'F' OR orow.grade IS NULL)
BEGIN ATOMIC
    UPDATE student
    SET tot_cred = tot_cred +
        (SELECT credits FROM course WHERE course.course_id = nrow.course_id)
    WHERE student.ID = nrow.ID;
END;

-- BEFORE INSERT 트리거: 기본값 설정
CREATE TRIGGER set_null_grade
BEFORE INSERT ON takes
REFERENCING NEW ROW AS nrow
FOR EACH ROW
WHEN (nrow.grade = '')
BEGIN ATOMIC
    SET nrow.grade = NULL;
END;

-- AFTER DELETE 트리거: 감사 로그
CREATE TRIGGER instructor_delete_log
AFTER DELETE ON instructor
REFERENCING OLD ROW AS orow
FOR EACH ROW
BEGIN ATOMIC
    INSERT INTO instructor_audit(ID, name, action, action_date)
    VALUES (orow.ID, orow.name, 'DELETE', CURRENT_TIMESTAMP);
END;
```

## 관련 개념

- [Stored Procedure](/knowledge/database/stored-procedure/)
- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [SQL](/knowledge/database/sql/)
- [Transaction](/knowledge/database/transaction/)
