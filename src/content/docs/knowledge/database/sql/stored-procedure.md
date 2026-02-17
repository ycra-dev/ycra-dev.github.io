---
title: "Stored Procedure"
description: "저장 프로시저(stored procedure)는 데이터베이스에 저장되어 SQL 문이나 응용 프로그램에서 호출할 수 있는 사용자 정의 함수 또는 프로시저로, 비즈니스 로직을 데이터베이스 내부에 캡슐화하여 재사용 가능한 코드 단위로 제공한다"
tags: ['Stored Procedure', 'Function', 'Psm', 'SQL Programming']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/stored-procedure
sidebar:
  order: 19
---

## 핵심 개념

SQL은 함수(function)와 프로시저(procedure) 모두를 정의할 수 있다. 함수는 값을 반환하고, SQL 표현식 내에서 호출할 수 있다. 프로시저는 in(입력), out(출력), inout(입출력) 매개변수를 가지며, CALL 문으로 호출된다.

저장 프로시저를 데이터베이스에 정의하는 것의 장점은 다음과 같다:
1. **재사용성:** 여러 응용 프로그램에서 동일한 프로시저를 호출할 수 있다.
2. **유지보수 용이성:** 비즈니스 규칙이 변경되면 프로시저만 수정하면 된다.
3. **성능:** 프로시저는 데이터베이스 서버에서 실행되므로, 데이터 전송 오버헤드가 줄어든다.
4. **보안:** 기저 테이블에 대한 직접 접근 없이 프로시저를 통해서만 데이터를 조작하도록 할 수 있다.

SQL의 절차적 확장은 PSM(Persistent Storage Module)이라 불리며, 다음과 같은 프로그래밍 구성 요소를 지원한다:
- 변수 선언(DECLARE)과 할당(SET)
- 복합문(BEGIN ... END)
- 조건문(IF-THEN-ELSE)
- 반복문(WHILE, REPEAT, FOR)
- 예외 처리(SIGNAL, DECLARE HANDLER)

SQL 표준의 문법과 실제 데이터베이스 시스템의 문법은 차이가 있다. Oracle은 PL/SQL, Microsoft SQL Server는 Transact-SQL, PostgreSQL은 PL/pgSQL 등 각자 고유한 절차적 언어를 사용한다.

또한 SQL은 Java, C, C++ 등 외부 프로그래밍 언어로 작성된 함수와 프로시저도 지원한다. 외부 언어 루틴은 SQL만으로 표현할 수 없는 복잡한 계산을 수행할 수 있다.

테이블 함수(table function)는 릴레이션을 결과로 반환하는 함수로, 매개변수화된 뷰(parameterized view)로 생각할 수 있다.

## 예시

```sql
-- SQL 함수 정의
CREATE FUNCTION dept_count(dept_name VARCHAR(20))
RETURNS INTEGER
BEGIN
    DECLARE d_count INTEGER;
    SELECT COUNT(*) INTO d_count
    FROM instructor
    WHERE instructor.dept_name = dept_count.dept_name;
    RETURN d_count;
END;

-- 함수 사용
SELECT dept_name, budget
FROM department
WHERE dept_count(dept_name) > 12;

-- SQL 프로시저 정의
CREATE PROCEDURE dept_count_proc(
    IN dept_name VARCHAR(20),
    OUT d_count INTEGER)
BEGIN
    SELECT COUNT(*) INTO d_count
    FROM instructor
    WHERE instructor.dept_name = dept_count_proc.dept_name;
END;

-- 프로시저 호출
DECLARE d_count INTEGER;
CALL dept_count_proc('Physics', d_count);

-- 테이블 함수
CREATE FUNCTION instructor_of(dept_name VARCHAR(20))
RETURNS TABLE (
    ID VARCHAR(5),
    name VARCHAR(20),
    dept_name VARCHAR(20),
    salary NUMERIC(8,2))
RETURN TABLE
    (SELECT ID, name, dept_name, salary
     FROM instructor
     WHERE instructor.dept_name = instructor_of.dept_name);

-- 테이블 함수 사용
SELECT * FROM TABLE(instructor_of('Finance'));
```

## 관련 개념

- [Trigger](/knowledge/database/trigger/)
- [SQL](/knowledge/database/sql/)
- [JDBC](/knowledge/database/jdbc/)
- [Dynamic SQL](/knowledge/database/dynamic-sql/)
