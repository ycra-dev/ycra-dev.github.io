---
title: "Column-Oriented Storage"
description: "컬럼 지향 저장(Column-Oriented Storage)은 릴레이션의 각 속성을 별도로 저장하여 연속된 튜플의 같은 속성 값이 연속적으로 배치되는 저장 방식으로, 행(row) 기반 저장의 대안이다"
tags: ['Column Oriented Storage', 'Columnar Storage', 'Column Store', 'Orc', 'Parquet', 'Data Analytics']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/column-oriented-storage
sidebar:
  order: 11
---

## 핵심 개념

전통적인 행 지향 저장에서는 한 튜플의 모든 속성이 함께 저장된다. 컬럼 지향 저장에서는 각 속성의 값이 별도 파일에 저장되며, i번째 행의 전체 튜플을 복원하려면 각 컬럼 파일의 i번째 위치에서 값을 가져와야 한다.

컬럼 지향 저장의 장점:
1. **I/O 감소**: 쿼리가 일부 속성만 접근할 때 나머지 속성을 디스크에서 읽을 필요가 없다.
2. **CPU 캐시 효율**: 같은 속성의 연속된 값이 메모리에서 인접하므로 캐시 라인 활용률이 높다.
3. **압축 효율**: 동일 타입 값이 연속 저장되어 행 단위 저장보다 압축률이 크게 향상된다.
4. **벡터 처리**: 현대 CPU의 벡터 처리(SIMD)를 활용하여 선택 조건 비교나 집계 연산을 병렬 수행할 수 있다.

컬럼 지향 저장의 단점:
- **튜플 복원 비용**: 여러 속성을 가져와야 하면 복수 I/O가 필요하다.
- **삭제/갱신 비용**: 압축된 표현에서 단일 튜플을 수정하면 전체 압축 단위를 재작성해야 한다.
- **압축 해제 비용**: 단순 압축에서는 파일 처음부터 읽어야 하지만, 실제 구현에서는 일정 간격(예: 10,000개 값)마다 압축을 새로 시작하여 임의 접근을 지원한다.

ORC와 Parquet은 빅데이터 처리에 널리 사용되는 컬럼 파일 형식이다. ORC에서는 수백 MB의 튜플 시퀀스를 스트라이프(stripe, 약 250MB) 단위로 나누어 컬럼 표현으로 변환하며, 각 스트라이프에 인덱스 데이터와 행 데이터가 포함된다.

## 예시

행 지향 vs 컬럼 지향 저장 비교:

```
instructor 릴레이션 (4개 속성, 1000개 튜플)

행 지향 저장:
[10101, Srinivasan, Comp.Sci., 65000]
[12121, Wu, Finance, 90000]
...

컬럼 지향 저장:
ID 파일:    [10101, 12121, 15151, ...]
name 파일:  [Srinivasan, Wu, Mozart, ...]
dept 파일:  [Comp.Sci., Finance, Music, ...]
salary 파일:[65000, 90000, 40000, ...]

쿼리: SELECT AVG(salary) FROM instructor WHERE dept_name = 'Physics'
- 행 지향: 전체 4개 속성 × 1000행 = ~53KB 읽기
- 컬럼 지향: dept(20KB) + salary(8KB) = ~28KB 읽기
  → I/O 약 47% 절감
```

## 관련 개념

- [File Organization](/knowledge/database/file-organization/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [OLAP](/knowledge/database/olap/)
- [Bitmap Index](/knowledge/database/bitmap-index/)
