---
title: "TPC Benchmark"
description: "TPC(Transaction Processing Performance Council) 벤치마크는 데이터베이스 시스템의 성능을 정량적으로 측정하기 위해 표준화된 작업 모음(suite)으로, 트랜잭션 처리량(throughput)과 가격 대비 성능(price/perfo..."
tags: ['Tpc Benchmark', 'Performance Benchmark', 'Database Evaluation', 'Throughput', 'OLTP', 'Decision Support']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/tpc-benchmark
sidebar:
  order: 4
---

## 핵심 개념

TPC 벤치마크는 데이터베이스 시스템의 성능을 공정하게 비교하기 위해 설계되었다. 단일 작업으로는 시스템 성능을 적절히 측정할 수 없기 때문에, 여러 유형의 작업을 조합한 벤치마크 스위트를 사용한다.

성능 측정 시 주의할 점은 여러 작업의 처리량을 단순 산술 평균으로 결합하면 안 된다는 것이다. 올바른 방법은 조화 평균(harmonic mean)을 사용하는 것이다. 예를 들어, 시스템 A가 작업 T1을 99 TPS, T2를 1 TPS로 처리하고, 시스템 B가 둘 다 50 TPS로 처리한다면, 산술 평균은 동일해 보이지만 실제로 시스템 B가 약 25배 빠르다.

TPC 벤치마크의 주요 특징은 다음과 같다:
- 관계의 구조와 튜플 크기를 상세히 정의한다.
- 관계의 튜플 수를 고정 값이 아닌 초당 처리 트랜잭션 수의 배수로 정의한다.
- 응답 시간이 일정 범위 내에 있어야 하므로, 높은 처리량을 긴 응답 시간으로 대체할 수 없다.
- 가격 대비 TPS(price per TPS)도 측정한다.
- 외부 감사 없이 TPC 벤치마크 결과를 주장할 수 없다.

주요 TPC 벤치마크 종류:
- **TPC-C**: 주문 입력 환경을 모델링한 OLTP 벤치마크로, 현재도 널리 사용된다.
- **TPC-E**: 증권 중개 회사 모델 기반의 OLTP 벤치마크이다.
- **TPC-H**: TPC-D의 개선판으로, 22개 쿼리와 2개의 갱신으로 구성된 ad hoc 의사결정 지원 벤치마크이다. 구체화된 뷰(materialized view)를 금지하고 기본키/외래키에만 인덱스를 허용한다.
- **TPC-DS**: TPC-H의 후속으로, 소매 제품 공급업체의 의사결정 지원 기능을 모델링하며, ad hoc 쿼리와 보고 기능 모두를 포함한다.

TPC-H와 TPC-DS의 성능 측정 방식은 파워 테스트(쿼리를 순차 실행)와 처리량 테스트(복수 스트림을 병렬 실행)의 기하 평균에서 복합 메트릭을 계산한다.

## 예시

조화 평균 계산 예시:

```
시스템 A: T1 = 99 TPS, T2 = 1 TPS
시스템 B: T1 = 50 TPS, T2 = 50 TPS

조화 평균 공식: n / (1/t1 + 1/t2 + ... + 1/tn)

시스템 A 조화 평균 = 2 / (1/99 + 1/1) = 2 / 1.0101 = 1.98 TPS
시스템 B 조화 평균 = 2 / (1/50 + 1/50) = 2 / 0.04 = 50 TPS
```

시스템 B가 약 25배 더 빠르다는 것을 알 수 있다. 산술 평균을 사용했다면 두 시스템 모두 50 TPS로 동일하게 보였을 것이다.

## 관련 개념

- [Performance Tuning](/knowledge/database/performance-tuning/)
- [Query Tuning](/knowledge/database/query-tuning/)
- [Schema Tuning](/knowledge/database/schema-tuning/)
- [Database Standardization](/knowledge/database/database-standardization/)
