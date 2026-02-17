---
title: "Query Tuning"
description: "쿼리 튜닝(Query Tuning)은 쿼리의 작성 방식이나 애플리케이션이 데이터베이스에 쿼리를 발행하는 방식을 변경하여 데이터베이스 애플리케이션의 성능을 향상시키는 과정이다"
tags: ['Query Tuning', 'Performance Optimization', 'SQL Optimization', 'Query Plan', 'Decorrelation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/query-tuning
sidebar:
  order: 2
---

## 핵심 개념

현대의 고급 옵티마이저는 잘못 작성된 쿼리도 변환하여 효율적으로 실행할 수 있지만, 여전히 옵티마이저가 잘못된 계획을 선택하는 경우가 있다. 쿼리 튜닝은 이러한 문제를 진단하고 해결하는 과정이다.

**쿼리 계획 튜닝**: 대부분의 데이터베이스는 `EXPLAIN` 명령을 지원하여 쿼리에 사용되는 실행 계획을 확인할 수 있다. 잘못된 계획이 선택되는 주요 원인은 다음과 같다:

1. **부정확한 통계**: 옵티마이저가 관계의 튜플 수를 적게 추정하면 중첩 루프 조인을 선택할 수 있는데, 실제로 튜플이 많으면 매우 비효율적이다. `ANALYZE` 명령으로 통계를 갱신해야 한다.

2. **필요한 인덱스 부재**: 대량 관계에서 소수의 행만 가져오는 쿼리는 인덱스가 필수적이다. 조인 속성에 대한 인덱스도 매우 유용하다.

3. **중첩 부속 쿼리의 비효율적 처리**: 비상관화(decorrelation)되지 않은 부속 쿼리는 반복 실행되어 대량의 랜덤 I/O를 발생시킨다. 이를 조인으로 재작성하면 효율적인 집합 지향 연산을 사용할 수 있다.

**집합 지향성 향상(Set Orientation)**: SQL 쿼리가 반복적으로 실행될 때, 각 호출마다 서버와의 통신 오버헤드가 발생한다. 여러 개별 쿼리를 하나의 쿼리로 결합하면 통신 비용과 처리 비용을 크게 줄일 수 있다. JDBC의 배치 업데이트(batch update) 기능도 이러한 최적화를 지원한다.

**대량 로드 및 업데이트 튜닝**: 대량 데이터를 개별 INSERT 문으로 로드하면 성능이 매우 저하된다. 무결성 제약 검사와 인덱스 갱신을 개별 튜플마다 수행하면 대량의 랜덤 I/O가 발생하기 때문이다. 대부분의 데이터베이스는 `COPY` (PostgreSQL), `SQL*Loader` (Oracle), `bcp` (SQL Server) 등의 벌크 가져오기 유틸리티를 제공한다. SQL:2003에서 도입된 `MERGE` 구문도 대량 업데이트에 유용하다.

## 예시

부서별 급여 합계를 구하는 비효율적 방식과 효율적 방식의 비교:

```sql
-- 비효율적: 부서마다 개별 쿼리 실행
-- 각 부서에 대해 반복 호출
SELECT SUM(salary)
FROM instructor
WHERE dept_name = ?;

-- 효율적: 단일 쿼리로 모든 부서 합계 계산
SELECT dept_name, SUM(salary)
FROM instructor
GROUP BY dept_name;
```

JDBC 배치 업데이트 예시:

```java
PreparedStatement pStmt = conn.prepareStatement(
    "INSERT INTO instructor VALUES(?,?,?,?)");

pStmt.setString(1, "88877");
pStmt.setString(2, "Perry");
pStmt.setString(3, "Finance");
pStmt.setInt(4, 125000);
pStmt.addBatch();

pStmt.setString(1, "88878");
pStmt.setString(2, "Thierry");
pStmt.setString(3, "Physics");
pStmt.setInt(4, 100000);
pStmt.addBatch();

pStmt.executeBatch(); // 한 번의 통신으로 모든 삽입 실행
```

SQL MERGE 구문 예시:

```sql
MERGE INTO department AS A
USING (SELECT * FROM funds_received) AS F
ON (A.dept_name = F.dept_name)
WHEN MATCHED THEN
    UPDATE SET budget = budget + F.amount;
```

## 관련 개념

- [Performance Tuning](/knowledge/database/performance-tuning/)
- [Schema Tuning](/knowledge/database/schema-tuning/)
- [TPC Benchmark](/knowledge/database/tpc-benchmark/)
- [Database Standardization](/knowledge/database/database-standardization/)
