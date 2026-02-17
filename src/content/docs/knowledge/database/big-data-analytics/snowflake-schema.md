---
title: "Snowflake Schema"
description: "스노우플레이크 스키마(Snowflake Schema)는 스타 스키마의 확장으로, 차원 테이블이 다단계로 정규화되어 하위 차원 테이블로 분해되는 구조이다"
tags: ['Snowflake Schema', 'Data Warehouse', 'Normalization', 'Dimension Table', 'Schema Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/snowflake-schema
sidebar:
  order: 13
---

## 핵심 개념

스타 스키마에서는 각 차원 테이블이 팩트 테이블에 직접 연결되지만, 스노우플레이크 스키마에서는 차원 테이블이 추가적인 하위 차원 테이블로 정규화된다. 예를 들어, item_info 테이블이 manufacturer_id라는 속성을 가질 수 있고, 이것이 제조사 상세 정보를 담은 또 다른 테이블로의 외래 키가 될 수 있다.

복잡한 데이터 웨어하우스 설계에서는 하나 이상의 팩트 테이블을 가질 수도 있다. 이러한 구조는 데이터의 정규화를 통해 저장 공간의 중복을 줄이지만, 질의 시 더 많은 조인이 필요하게 된다.

스노우플레이크 스키마와 스타 스키마의 비교:
- **저장 공간**: 스노우플레이크 스키마가 정규화로 인해 중복이 적어 더 적은 공간 사용
- **질의 복잡성**: 스노우플레이크 스키마는 더 많은 조인이 필요하여 질의가 복잡
- **질의 성능**: 스타 스키마가 조인 수가 적어 일반적으로 더 빠름
- **유지보수**: 스노우플레이크 스키마가 정규화되어 데이터 일관성 유지가 용이

다차원 데이터에서 차원의 계층(hierarchy)은 릴레이션으로 표현할 수 있다. 예를 들어, skirt와 dress가 womenswear 카테고리에 속하고, pants와 shirt가 menswear에 속한다는 관계는 itemcategory(item_name, category) 릴레이션으로 나타낼 수 있다.

## 예시

스노우플레이크 스키마 예시:

```
팩트 테이블: sales(item_id, store_id, customer_id, date, number, price)

1차 차원 테이블:
- item_info(item_id, itemname, color, size, category_id, manufacturer_id)
- store(store_id, city_id)

2차 차원 테이블 (스노우플레이크 확장):
- category(category_id, category_name, department)
- manufacturer(manufacturer_id, mfg_name, country)
- city(city_id, city_name, state_id)
- state(state_id, state_name, country_id)
- country(country_id, country_name, region)
```

스타 스키마에서는 store 테이블에 city, state, country가 모두 있지만, 스노우플레이크 스키마에서는 이를 별도 테이블로 분리한다.

## 관련 개념

- [Star Schema](/knowledge/database/star-schema/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [OLAP](/knowledge/database/olap/)
- [Data Cube](/knowledge/database/data-cube/)
