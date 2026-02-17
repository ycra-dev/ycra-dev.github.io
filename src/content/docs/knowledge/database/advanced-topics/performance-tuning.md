---
title: "Performance Tuning"
description: "성능 튜닝(Performance Tuning)은 데이터베이스 시스템의 병목 지점을 식별하고 제거하여 특정 애플리케이션의 성능을 최적화하는 과정이다"
tags: ['Performance Tuning', 'Database Optimization', 'Bottleneck', 'Queueing System']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/performance-tuning
sidebar:
  order: 1
---

## 핵심 개념

성능 튜닝은 데이터베이스 시스템에서 가장 실질적이고 중요한 활동 중 하나이다. 대부분의 시스템에서 성능은 하나 또는 소수의 컴포넌트인 병목(bottleneck)에 의해 제한된다. 예를 들어, 프로그램이 80%의 시간을 작은 루프에서 소비한다면 그 루프가 병목이며, 해당 부분을 개선하면 전체 성능이 크게 향상된다.

데이터베이스 튜닝은 세 가지 수준에서 수행된다. 첫째, 가장 높은 수준에서는 스키마와 쿼리를 조정한다. 개발자가 인덱스 생성, 구체화 뷰 설정, 쿼리 재작성 등을 통해 성능을 개선할 수 있다. 둘째, 데이터베이스 시스템 파라미터 수준에서는 버퍼 크기, 체크포인팅 간격 등을 조정한다. 셋째, 하드웨어 수준에서는 디스크를 SSD로 교체하거나, 메모리를 추가하거나, 프로세서를 업그레이드하는 등의 조치를 취한다.

데이터베이스 시스템은 대기열 시스템(queueing system)으로 모델링할 수 있다. 트랜잭션은 CPU, 디스크 I/O, 잠금 등 다양한 서비스를 요청하며, 각 서비스에는 대기열이 존재한다. 자원의 이용률이 100%에 가까워지면 대기열 길이가 급격히 증가하여 과도한 대기 시간이 발생한다. 일반적으로 70% 정도의 이용률이 적절하며, 90%를 초과하면 심각한 지연이 발생한다.

실제 성능 문제의 예시로는 인덱스 부재로 인한 전체 테이블 스캔, 불필요하게 복잡한 중첩 서브쿼리, 과도한 개별 데이터베이스 호출, JDBC 연결 미반환 등이 있다. 이러한 문제들은 모니터링 도구를 통해 발견할 수 있으며, 대부분의 상용 데이터베이스는 성능 모니터링을 위한 뷰와 저장 프로시저를 제공한다.

하드웨어 튜닝에서 중요한 개념은 "5분 규칙(Five Minute Rule)"이다. 이는 특정 페이지가 5분에 한 번 이상 접근된다면 해당 페이지를 메모리에 캐싱하는 것이 비용 효율적이라는 원칙으로, 디스크와 메모리의 가격 비율에 따라 시대별로 수치가 달라진다.

## 예시

성능 모니터링의 예시로, PostgreSQL에서는 다음과 같이 통계를 갱신할 수 있다:

```sql
-- 특정 릴레이션의 통계 재계산
ANALYZE instructor;

-- 모든 릴레이션의 통계 재계산
ANALYZE;
```

반복적인 개별 쿼리를 하나의 집합 지향 쿼리로 변환하는 튜닝 예시:

```sql
-- 비효율적: 각 학과별로 개별 쿼리 실행
SELECT SUM(salary) FROM instructor WHERE dept_name = ?;

-- 효율적: 하나의 쿼리로 모든 학과의 합계를 구함
SELECT dept_name, SUM(salary)
FROM instructor
GROUP BY dept_name;
```

## 관련 개념

- [Performance Benchmark](/knowledge/database/performance-benchmark/)
- [Query Tuning](/knowledge/database/query-tuning/)
- [Schema Tuning](/knowledge/database/schema-tuning/)
- [SQL Standard](/knowledge/database/sql-standard/)
