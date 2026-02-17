---
title: "Spatial Data"
description: "공간 데이터(Spatial Data)는 공간적 위치 정보를 기반으로 데이터를 저장, 인덱싱, 질의할 수 있도록 하는 데이터 유형으로, 지리 데이터(geographic data)와 기하 데이터(geometric data)의 두 범주로 나뉜다"
tags: ['Spatial Data', 'Geographic Data', 'Geometric Data', 'Spatial Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/spatial-data
sidebar:
  order: 6
---

## 핵심 개념

공간 데이터는 크게 두 종류로 나뉜다. 지리 데이터는 도로 지도, 토지 이용 지도, 지형 지도 등으로 위도, 경도, 고도 기반의 구면 좌표계를 사용한다. 기하 데이터는 건물, 자동차 등 객체의 구조에 대한 공간 정보로 2차원 또는 3차원 유클리드 좌표계(X, Y, Z)를 사용한다.

공간 데이터의 기본 기하 객체는 점(point), 선분(line segment), 폴리라인(polyline/linestring), 다각형(polygon) 등이다. 복잡한 곡선은 폴리라인으로 근사하고, 복잡한 다각형은 삼각분할(triangulation)로 표현할 수 있다. 3차원으로 확장하면 구, 원기둥, 직육면체 등이 추가되며, 합집합, 교집합, 차집합 연산으로 복합 3차원 객체를 구성한다.

지리 데이터의 표현 방식은 래스터(raster)와 벡터(vector) 두 가지가 있다. 래스터 데이터는 비트맵/픽셀맵으로, 위성 사진이 대표적이다. 타일(tile) 형태로 저장되며 줌 레벨별로 별도의 타일 세트를 생성한다. 벡터 데이터는 기본 기하 객체로 구성되며, 도로는 폴리라인으로, 호수나 국가 경계는 다각형으로 표현된다.

공간 질의의 주요 유형은 세 가지이다. 영역 질의(region query)는 지정된 영역 내의 객체를 찾는다. 근접 질의(nearness query)와 최근접 이웃 질의(nearest-neighbor query)는 특정 위치에 가까운 객체를 찾는다. 공간 그래프 질의(spatial graph query)는 도로 네트워크 같은 공간 그래프에서 최단 경로 등을 계산한다.

PostgreSQL의 PostGIS, Oracle Spatial, SQL Server 등 많은 데이터베이스 시스템이 공간 데이터 타입과 질의 함수를 지원한다. OGC(Open Geospatial Consortium) 표준 기반의 함수들로 ST_Contains(), ST_Overlaps(), ST_Distance() 등이 제공된다.

## 예시

```sql
-- PostGIS를 사용한 공간 질의 예시

-- 기하 객체 생성
SELECT ST_GeometryFromText('LINESTRING(1 1, 2 3, 4 4)');
SELECT ST_GeometryFromText('POLYGON((1 1, 2 3, 4 4, 1 1))');

-- 영역 질의: 특정 다각형 내의 상점 찾기
SELECT shop_name
FROM shop
WHERE ST_Contains(region_polygon, shop.location);

-- 근접 질의: 주어진 점에서 100m 이내의 레스토랑
SELECT name
FROM restaurant
WHERE ST_Distance(location, ST_GeographyFromText('POINT(37.5 127.0)'))
      < 100;

-- 최근접 이웃 질의: 가장 가까운 주유소
SELECT name, ST_Distance(location, my_point) AS dist
FROM gas_station
ORDER BY dist
LIMIT 1;
```

## 관련 개념

- [Semi-structured Data](/knowledge/database/semi-structured-data/)
- [First Normal Form](/knowledge/database/first-normal-form/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
