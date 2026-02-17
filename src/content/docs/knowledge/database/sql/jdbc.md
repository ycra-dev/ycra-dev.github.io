---
title: "JDBC"
description: "JDBC(Java Database Connectivity)는 Java 프로그램에서 데이터베이스 서버에 연결하여 SQL 문을 실행하고 결과를 처리할 수 있게 하는 표준 API(Application Program Interface)이다"
tags: ['Jdbc', 'Java', 'Database Connectivity', 'Api', 'Dynamic SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/jdbc
sidebar:
  order: 24
---

## 핵심 개념

JDBC는 Java 프로그램과 관계형 데이터베이스 사이의 표준화된 인터페이스를 제공한다. JDBC는 API만 정의하고, 실제 통신 프로토콜은 정의하지 않는다. 각 데이터베이스 제품(Oracle, MySQL, PostgreSQL 등)은 JDBC 드라이버를 제공하며, 이 드라이버가 제품 독립적인 JDBC 호출을 제품 특화된 호출로 변환한다.

JDBC를 사용한 데이터베이스 접근의 기본 단계는 다음과 같다:

1. **연결 열기:** DriverManager.getConnection() 메서드를 사용하여 데이터베이스 서버에 연결한다. URL, 사용자 ID, 비밀번호를 매개변수로 전달한다.

2. **SQL 문 실행:** Statement 객체를 생성하여 SQL 문을 전송한다. 질의에는 executeQuery()를, DML/DDL에는 executeUpdate()를 사용한다.

3. **결과 처리:** executeQuery()의 결과는 ResultSet 객체로 반환된다. next() 메서드로 튜플을 순회하고, getString(), getFloat() 등의 메서드로 속성값을 추출한다.

4. **리소스 관리:** Connection, Statement, ResultSet 등의 객체는 사용 후 반드시 닫아야 한다. Java의 try-with-resources 구문을 사용하면 자동으로 리소스가 해제된다.

**PreparedStatement:** SQL 인젝션 공격을 방지하고 성능을 향상시키기 위해 사용한다. SQL 문에서 매개변수를 '?'로 표시하고, setString(), setInt() 등으로 값을 바인딩한다. 데이터베이스 시스템은 준비된 문장을 한 번만 컴파일하고 최적화하여, 반복 실행 시 성능이 향상된다.

**메타데이터:** ResultSetMetaData를 통해 결과의 열 수, 열 이름, 데이터 타입 등의 정보를 동적으로 조회할 수 있다. DatabaseMetaData를 통해 데이터베이스 스키마 정보도 조회 가능하다.

## 예시

```java
// JDBC를 사용한 기본적인 데이터베이스 접근
public static void JDBCexample(String userid, String passwd) {
    try (
        Connection conn = DriverManager.getConnection(
            "jdbc:oracle:thin:@db.yale.edu:1521:univdb",
            userid, passwd);
        Statement stmt = conn.createStatement();
    ) {
        // 데이터 삽입
        stmt.executeUpdate(
            "INSERT INTO instructor VALUES('77987','Kim','Physics',98000)");

        // 질의 실행 및 결과 처리
        ResultSet rset = stmt.executeQuery(
            "SELECT dept_name, AVG(salary) " +
            "FROM instructor GROUP BY dept_name");
        while (rset.next()) {
            System.out.println(rset.getString("dept_name") + " "
                             + rset.getFloat(2));
        }
    } catch (Exception e) {
        System.out.println("Exception: " + e);
    }
}

// PreparedStatement: SQL 인젝션 방지
PreparedStatement pStmt = conn.prepareStatement(
    "INSERT INTO instructor VALUES(?, ?, ?, ?)");
pStmt.setString(1, "88877");
pStmt.setString(2, "Perry");
pStmt.setString(3, "Finance");
pStmt.setInt(4, 125000);
pStmt.executeUpdate();
```

## 관련 개념

- [ODBC](/knowledge/database/odbc/)
- [Dynamic SQL](/knowledge/database/dynamic-sql/)
- [SQL](/knowledge/database/sql/)
- [Stored Procedure](/knowledge/database/stored-procedure/)
