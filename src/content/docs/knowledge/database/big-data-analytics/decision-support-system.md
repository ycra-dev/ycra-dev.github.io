---
title: "Decision Support System"
description: "의사결정 지원 시스템(Decision Support System)은 보고서 작성과 집계에 초점을 맞춘 시스템으로, 대량의 데이터를 처리하는 SQL 질의를 사용하여 조직의 의사결정을 지원하는 분석 시스템이다"
tags: ['Decision Support', 'Business Intelligence', 'Data Analytics', 'OLTP', 'Reporting']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/decision-support-system
sidebar:
  order: 9
---

## 핵심 개념

의사결정 지원은 비즈니스 인텔리전스(BI)와 유사한 맥락에서 사용되지만, 보고서 작성과 집계에 더 좁은 초점을 두며 머신 러닝/데이터 마이닝을 포함하지 않는 것이 일반적이다.

의사결정 지원 질의는 온라인 트랜잭션 처리(OLTP, Online Transaction Processing)와 대비된다:
- **OLTP**: 각 질의가 소량의 데이터만 읽고, 읽기 외에 소규모 갱신을 포함할 수 있다. 빠른 응답 시간과 높은 동시성이 중요하다.
- **의사결정 지원**: 각 질의가 대량의 데이터에 접근하며, 주로 읽기 전용이다. 질의 수는 적지만 각 질의가 처리하는 데이터량이 훨씬 크다.

데이터 웨어하우스는 의사결정 지원을 위해 특별히 설계된 데이터베이스이다. 웨어하우스에서 레코드는 한번 삽입되면 거의 갱신되지 않으므로 동시성 제어의 오버헤드가 필요 없다.

의사결정 지원 시스템의 핵심 구성요소:
- 데이터 웨어하우스 (데이터 저장)
- ETL 프로세스 (데이터 수집 및 변환)
- OLAP 도구 (대화형 분석)
- 보고서 및 대시보드 (시각화)
- 데이터 마이닝 도구 (패턴 발견 및 예측)

분석가는 데이터를 다양한 방식으로 시각화하여 이상 현상(anomaly)을 발견하거나 비즈니스 변화의 원인에 대한 통찰을 얻어야 한다. 차트로 주요 조직 지표(매출, 비용, 반품 등)를 요약하여 표시하는 대시보드는 조직의 건강 상태를 모니터링하는 대표적인 수단이다.

## 예시

의사결정 지원 질의의 예시:

```sql
-- 지역별, 분기별 매출 추이 분석
SELECT s.region, d.quarter, d.year,
       SUM(f.price * f.number) AS total_revenue,
       COUNT(DISTINCT f.customer_id) AS unique_customers
FROM sales f
JOIN store s ON f.store_id = s.store_id
JOIN date_info d ON f.date = d.date
WHERE d.year IN (2024, 2025)
GROUP BY s.region, d.quarter, d.year
ORDER BY s.region, d.year, d.quarter;
```

이 질의는 수백만 개의 판매 레코드를 스캔하여 지역별, 분기별 매출 추이를 제공한다.

## 관련 개념

- [Data Warehouse](/knowledge/database/data-warehouse/)
- [OLAP](/knowledge/database/olap/)
- [Data Mining](/knowledge/database/data-mining/)
- [Data Cube](/knowledge/database/data-cube/)
- [Star Schema](/knowledge/database/star-schema/)
