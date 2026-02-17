---
title: "Star Schema"
description: "스타 스키마(Star Schema)는 데이터 웨어하우스에서 사용되는 스키마 설계로, 중앙의 팩트 테이블(fact table)과 이를 둘러싼 여러 차원 테이블(dimension table)로 구성되며, 팩트 테이블에서 차원 테이블로의 외래 키 관계가 별(star) ..."
tags: ['Star Schema', 'Data Warehouse', 'Fact Table', 'Dimension Table', 'Schema Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/star-schema
sidebar:
  order: 12
---

## 핵심 개념

데이터 웨어하우스의 릴레이션은 팩트 테이블과 차원 테이블로 분류된다. 팩트 테이블은 판매 같은 개별 이벤트에 대한 정보를 기록하며, 보통 매우 크다. 팩트 테이블의 속성은 차원 속성(dimension attributes)과 측정 속성(measure attributes)으로 나뉜다.

- **측정 속성(Measure Attributes)**: 집계 가능한 정량적 정보를 저장한다. 예를 들어, 판매 테이블의 판매 수량(number)과 가격(price).
- **차원 속성(Dimension Attributes)**: 측정 속성의 그룹화와 조회에 사용되는 차원이다. 예를 들어, 상품 ID, 판매 일자, 매장 ID, 고객 ID.

저장 요구사항을 최소화하기 위해 차원 속성은 보통 다른 차원 테이블로의 외래 키인 짧은 식별자로 구성된다. 예를 들어, sales 팩트 테이블의 store_id는 store 차원 테이블(도시, 주, 국가 등의 속성 포함)로의 외래 키이다.

스타 스키마의 장점:
- 단순한 구조로 질의 작성이 용이
- 집계 질의에 최적화
- 비즈니스 사용자가 이해하기 쉬움
- 차원 테이블을 조인하여 다양한 관점에서 분석 가능

## 예시

소매업의 스타 스키마 예시:

```
팩트 테이블: sales(item_id, store_id, customer_id, date, number, price)

차원 테이블:
- item_info(item_id, itemname, color, size, category)
- store(store_id, city, state, country)
- customer(customer_id, name, street, city, state, zipcode, country)
- date_info(date, month, quarter, year)
```

SQL 질의 예시 - 각 매장별 월간 매출 합계:

```sql
SELECT s.city, d.month, SUM(f.price * f.number) AS total_sales
FROM sales f
JOIN store s ON f.store_id = s.store_id
JOIN date_info d ON f.date = d.date
GROUP BY s.city, d.month;
```

## 관련 개념

- [Snowflake Schema](/knowledge/database/snowflake-schema/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [OLAP](/knowledge/database/olap/)
- [Data Cube](/knowledge/database/data-cube/)
