---
title: "Dynamic SQL"
description: "동적 SQL(dynamic SQL)은 프로그램 실행 시점(runtime)에 SQL 질의를 문자열로 구성하여 데이터베이스 서버에 전송하고 결과를 처리하는 방식으로, JDBC나 ODBC와 같은 API를 통해 범용 프로그래밍 언어에서 SQL 데이터베이스에 접근하는 메커..."
tags: ['Dynamic SQL', 'Embedded SQL', 'Prepared Statement', 'SQL Injection']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/dynamic-sql
sidebar:
  order: 23
---

## 핵심 개념

범용 프로그래밍 언어에서 SQL 데이터베이스에 접근하는 방법은 크게 두 가지로 나뉜다: 동적 SQL과 내장 SQL(embedded SQL)이다.

**동적 SQL:** 프로그램이 실행 중에 SQL 문을 문자열로 구성하여 데이터베이스에 전송한다. JDBC(Java), ODBC(C/C++ 등), Python Database API 등이 대표적인 동적 SQL 인터페이스이다. 동적 SQL의 핵심은 함수(절차적 언어) 또는 메서드(객체지향 언어)의 집합을 사용하여 데이터베이스와 통신하는 것이다.

**내장 SQL(Embedded SQL):** SQL 문을 호스트 프로그래밍 언어의 소스 코드에 직접 포함시킨다. 전처리기(preprocessor)가 SQL 문을 호스트 언어의 함수 호출로 변환한 후, 호스트 언어 컴파일러로 컴파일한다. 컴파일 시점에 SQL 관련 오류를 발견할 수 있는 장점이 있으나, 현재는 대부분 동적 SQL이 선호된다.

프로그래밍 언어와 SQL 간의 주요 과제는 **임피던스 불일치(impedance mismatch)**이다. SQL은 릴레이션(행의 집합) 단위로 동작하지만, 프로그래밍 언어는 변수(단일 값) 단위로 동작한다. 이를 해결하기 위해 커서(cursor)나 반복자(iterator)를 사용하여 결과 집합의 행을 하나씩 처리한다.

**SQL 인젝션(SQL Injection):** 동적 SQL의 가장 큰 보안 위협이다. 사용자 입력을 직접 SQL 문자열에 삽입하면, 악의적 사용자가 SQL 문을 조작하여 데이터를 탈취하거나 변조할 수 있다. 이를 방지하기 위해 **준비된 문장(Prepared Statement)**을 사용해야 한다. 준비된 문장에서는 매개변수를 '?'로 표시하고, 값을 별도로 바인딩하므로 사용자 입력이 SQL 구문으로 해석되는 것을 방지한다.

준비된 문장은 보안 외에도 성능상의 이점이 있다. 데이터베이스 시스템이 SQL 문을 한 번만 파싱하고 최적화한 후 캐싱하여, 동일한 문장을 반복 실행할 때 이전 최적화 결과를 재사용할 수 있다.

## 예시

```java
// 동적 SQL (JDBC) - 위험한 방식 (SQL 인젝션 취약)
String query = "SELECT * FROM instructor WHERE name = '" + userName + "'";
ResultSet rs = stmt.executeQuery(query);
// 만약 userName이 "'; DROP TABLE instructor; --" 이면 테이블이 삭제됨

// 안전한 방식: PreparedStatement 사용
PreparedStatement pStmt = conn.prepareStatement(
    "SELECT * FROM instructor WHERE name = ?");
pStmt.setString(1, userName);  // 안전하게 바인딩
ResultSet rs = pStmt.executeQuery();
```

```c
// 내장 SQL (Embedded SQL) 예시
EXEC SQL BEGIN DECLARE SECTION;
    char v_name[20];
    float v_salary;
EXEC SQL END DECLARE SECTION;

EXEC SQL DECLARE c CURSOR FOR
    SELECT name, salary FROM instructor
    WHERE dept_name = 'Physics';

EXEC SQL OPEN c;
while (1) {
    EXEC SQL FETCH c INTO :v_name, :v_salary;
    if (SQLCA.sqlcode != 0) break;
    printf("%s %.2f\n", v_name, v_salary);
}
EXEC SQL CLOSE c;
```

```python
# Python Database API
cursor = conn.cursor()
cursor.execute("SELECT * FROM instructor WHERE dept_name = %s",
               ('Physics',))  # 매개변수 바인딩
for row in cursor:
    print(row)
```

## 관련 개념

- [JDBC](/knowledge/database/jdbc/)
- [ODBC](/knowledge/database/odbc/)
- [SQL](/knowledge/database/sql/)
- [Stored Procedure](/knowledge/database/stored-procedure/)
