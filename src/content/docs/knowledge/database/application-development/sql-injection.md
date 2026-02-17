---
title: "SQL Injection"
description: "SQL 인젝션(SQL Injection)은 공격자가 애플리케이션의 SQL 쿼리에 악의적인 SQL 코드를 삽입하여, 인증과 권한 검사를 우회하고 데이터베이스에서 임의의 작업을 실행할 수 있게 하는 보안 공격이다"
tags: ['SQL Injection', 'Security', 'Prepared Statement', 'Web Application']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/sql-injection
sidebar:
  order: 11
---

## 핵심 개념

SQL 인젝션은 웹 애플리케이션 보안에서 가장 흔하고 위험한 공격 유형 중 하나이다. 이 공격은 사용자 입력이 SQL 쿼리 문자열에 직접 연결(concatenation)될 때 발생한다. 공격자가 입력에 SQL 문법 요소(따옴표, 세미콜론, 주석 등)를 포함시켜 원래 쿼리를 변형하거나 추가 쿼리를 실행할 수 있다.

공격의 메커니즘은 다음과 같다. 예를 들어 쿼리가 "select * from student where name like '%" + name + "%'"로 구성되면, 공격자가 name에 "'; DROP TABLE student; --"를 입력하면 쿼리가 "select * from student where name like '%'; DROP TABLE student; --%'"으로 변형된다. 따옴표가 문자열을 종료하고, 세미콜론이 새 SQL 문을 시작하며, --가 나머지를 주석 처리한다.

동적 쿼리 생성에서도 SQL 인젝션이 발생할 수 있다. 예를 들어 정렬 속성을 폼에서 받아 "order by " + orderAttribute로 구성하면, 공격자가 임의의 문자열을 주입할 수 있다. HTML 폼에서 메뉴로 입력을 제한하더라도, 공격자는 HTTP 요청을 직접 조작할 수 있으므로 안전하지 않다.

SQL 인젝션을 방지하는 가장 효과적인 방법은 준비된 문(Prepared Statement)을 사용하는 것이다. 준비된 문에서는 SQL 쿼리의 구조가 미리 정해지고, 사용자 입력은 매개변수로 바인딩된다. JDBC는 매개변수 설정 시 자동으로 이스케이프 문자를 추가하여 사용자의 따옴표가 문자열을 종료할 수 없게 한다. 동적 정렬 등의 경우에는 입력값이 허용된 값 목록(예: 속성 이름)에 포함되는지 검증해야 한다.

## 예시

```java
// 취약한 코드 (SQL 인젝션 가능)
String query = "select * from student where name like '%"
               + name + "%'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);

// 공격 입력: name = "'; DELETE FROM student; --"
// 실행되는 SQL:
// select * from student where name like '%';
// DELETE FROM student;
// --%'

// 안전한 코드 (Prepared Statement 사용)
String query = "select * from student where name like ?";
PreparedStatement pstmt = conn.prepareStatement(query);
pstmt.setString(1, "%" + name + "%");
ResultSet rs = pstmt.executeQuery();
// 사용자 입력의 따옴표가 자동으로 이스케이프 처리됨
```

```java
// 동적 정렬에서의 SQL 인젝션 방지
String[] allowedColumns = {"name", "ID", "dept_name"};
if (Arrays.asList(allowedColumns).contains(orderAttribute)) {
    String query = "select * from takes order by " + orderAttribute;
    // 안전: orderAttribute가 허용된 값 목록에 있는 경우만 실행
} else {
    // 오류 처리: 허용되지 않은 값
}
```

## 관련 개념

- [Cross-Site Scripting](/knowledge/database/cross-site-scripting/)
- [Servlet](/knowledge/database/servlet/)
- [Web Application Architecture](/knowledge/database/web-application-architecture/)
- [Session Management](/knowledge/database/session-management/)
- [Encryption](/knowledge/database/encryption/)
