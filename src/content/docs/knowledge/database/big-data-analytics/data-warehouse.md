---
title: "Data Warehouse"
description: "데이터 웨어하우스(Data Warehouse)는 여러 소스에서 수집된 정보를 통합된 스키마 아래 단일 사이트에 저장하는 저장소(repository)로, 장기간 데이터를 보관하여 과거 데이터에 대한 접근과 의사결정 지원 질의를 용이하게 한다"
tags: ['Data Warehouse', 'Etl', 'Data Analytics', 'Decision Support', 'Business Intelligence']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-warehouse
sidebar:
  order: 8
---

## 핵심 개념

대기업은 다양한 내부 조직 구조를 가지며, 서로 다른 위치나 운영 시스템에 서로 다른 스키마로 데이터가 존재한다. 예를 들어, 제조 문제 데이터와 고객 불만 데이터가 서로 다른 데이터베이스 시스템에 저장될 수 있다. 기업 의사결정자는 이러한 여러 소스의 정보에 접근해야 한다.

데이터 웨어하우스 구축 시 고려해야 할 핵심 사항:

1. **데이터 수집 시기와 방법**: 소스 주도형(source-driven)과 목적지 주도형(destination-driven) 아키텍처가 있다. 동기식 복제는 비용이 많이 들어 대부분 비동기식으로 처리한다.

2. **스키마 설계**: 독립적으로 구축된 소스들은 다른 스키마를 가지며, 심지어 다른 데이터 모델을 사용할 수 있다. 웨어하우스는 스키마 통합을 수행하고 통합된 스키마로 데이터를 변환해야 한다.

3. **데이터 변환 및 정제**: 데이터 정제(data cleansing)는 이름 맞춤법 오류 교정, 주소 검증, 퍼지 조회(fuzzy lookup), 중복 제거(deduplication) 등을 포함한다.

4. **갱신 전파**: 소스의 릴레이션 갱신이 웨어하우스에 전파되어야 한다.

5. **데이터 요약**: 집계를 통한 요약 데이터만 유지할 수도 있다.

이 과정들을 ETL(Extract, Transform, Load) 또는 ELT(Extract, Load, Transform) 태스크라 한다.

## 예시

소매 기업의 데이터 웨어하우스 구성 예시:

데이터 소스:
- POS(Point of Sale) 시스템 → 판매 거래 데이터
- CRM 시스템 → 고객 프로필 데이터
- 공급업체 시스템 → 재고/공급 데이터
- 외부 구매 데이터 → 우편 목록, 신용 점수

이 모든 데이터가 통합 스키마로 변환되어 단일 웨어하우스에 저장되며, 분석가는 이를 통해 "지난 분기 대비 이번 분기 매출 변화" 같은 질의를 쉽게 수행할 수 있다.

## 관련 개념

- [Star Schema](/knowledge/database/star-schema/)
- [Snowflake Schema](/knowledge/database/snowflake-schema/)
- [OLAP](/knowledge/database/olap/)
- [Data Mining](/knowledge/database/data-mining/)
- [Decision Support System](/knowledge/database/decision-support-system/)
