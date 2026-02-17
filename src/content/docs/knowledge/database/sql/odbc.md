---
title: "ODBC"
description: "ODBC(Open Database Connectivity)는 C 언어를 위해 원래 개발된 데이터베이스 연결 API로, 다양한 프로그래밍 언어(C, C++, C#, Ruby, Go, PHP, Visual Basic 등)에서 데이터베이스에 접근할 수 있게 하는 표준 ..."
tags: ['Odbc', 'Database Connectivity', 'Api', 'C Language', 'Dynamic SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/odbc
sidebar:
  order: 25
---

## 핵심 개념

ODBC는 Microsoft에 의해 처음 개발되었으며, 현재 대부분의 데이터베이스 시스템에서 지원되는 범용 데이터베이스 접근 표준이다. JDBC가 Java에 특화된 것과 달리, ODBC는 다양한 프로그래밍 언어에서 사용할 수 있다.

ODBC의 기본 동작 방식은 JDBC와 유사하다:

1. **환경 및 연결 설정:** SQLAllocEnv()로 환경 핸들을 할당하고, SQLAllocConnect()로 연결 핸들을 할당한 후, SQLConnect()로 데이터베이스에 연결한다.

2. **SQL 문 실행:** SQLAllocStmt()로 문장 핸들을 할당하고, SQLExecDirect()로 SQL 문을 직접 실행하거나, SQLPrepare()와 SQLExecute()로 준비된 문장을 실행한다.

3. **결과 처리:** SQLFetch()로 결과 행을 가져오고, SQLBindCol()로 결과 열을 프로그램 변수에 바인딩한다.

4. **리소스 해제:** SQLFreeStmt(), SQLDisconnect(), SQLFreeConnect(), SQLFreeEnv() 등으로 할당된 리소스를 해제한다.

ODBC의 주요 특징 중 하나는 데이터 소스 이름(DSN, Data Source Name)의 사용이다. DSN은 연결할 데이터베이스의 정보(서버 위치, 데이터베이스 이름, 드라이버 등)를 추상화하여, 응용 프로그램 코드를 수정하지 않고도 다른 데이터베이스로 전환할 수 있게 한다.

ODBC는 JDBC와 마찬가지로 동적 SQL의 한 형태이다. 프로그램이 실행 시점에 SQL 문자열을 구성하여 데이터베이스에 전송하고 결과를 처리한다. 각 데이터베이스 벤더는 ODBC 드라이버를 제공하며, 이 드라이버가 표준 ODBC 호출을 데이터베이스 특화 프로토콜로 변환한다.

## 예시

```c
// ODBC를 사용한 C 프로그램 예시
#include <sql.h>
#include <sqlext.h>

void ODBCexample() {
    SQLHENV env;
    SQLHDBC conn;
    SQLHSTMT stmt;
    SQLRETURN ret;
    char deptname[80];
    float salary;
    SQLLEN lenOut1, lenOut2;

    // 환경 및 연결 설정
    SQLAllocHandle(SQL_HANDLE_ENV, SQL_NULL_HANDLE, &env);
    SQLSetEnvAttr(env, SQL_ATTR_ODBC_VERSION, (void*)SQL_OV_ODBC3, 0);
    SQLAllocHandle(SQL_HANDLE_DBC, env, &conn);

    // 데이터베이스 연결
    SQLConnect(conn, "univdb", SQL_NTS,
               "userid", SQL_NTS,
               "password", SQL_NTS);

    // SQL 실행
    SQLAllocHandle(SQL_HANDLE_STMT, conn, &stmt);
    SQLExecDirect(stmt,
        "SELECT dept_name, AVG(salary) FROM instructor GROUP BY dept_name",
        SQL_NTS);

    // 결과 바인딩 및 처리
    SQLBindCol(stmt, 1, SQL_C_CHAR, deptname, 80, &lenOut1);
    SQLBindCol(stmt, 2, SQL_C_FLOAT, &salary, 0, &lenOut2);

    while (SQLFetch(stmt) == SQL_SUCCESS) {
        printf("%s %.2f\n", deptname, salary);
    }

    // 리소스 해제
    SQLFreeHandle(SQL_HANDLE_STMT, stmt);
    SQLDisconnect(conn);
    SQLFreeHandle(SQL_HANDLE_DBC, conn);
    SQLFreeHandle(SQL_HANDLE_ENV, env);
}
```

## 관련 개념

- [JDBC](/knowledge/database/jdbc/)
- [Dynamic SQL](/knowledge/database/dynamic-sql/)
- [SQL](/knowledge/database/sql/)
- [Database Language](/knowledge/database/database-language/)
