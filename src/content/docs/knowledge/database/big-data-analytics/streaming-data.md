---
title: "Streaming Data"
description: "스트리밍 데이터(Streaming Data)는 연속적으로 도착하는 데이터를 의미하며, 많은 애플리케이션 도메인에서 실시간으로(즉, 도착 시 지연 없이 또는 특정 한도 내의 지연으로) 처리되어야 하는 데이터이다"
tags: ['Streaming Data', 'Real Time Processing', 'Continuous Query', 'Window Operations', 'Big Data']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/streaming-data
sidebar:
  order: 7
---

## 핵심 개념

데이터베이스에 저장된 데이터는 정지 데이터(data-at-rest)라고 하는 반면, 스트림은 무한(unbounded)하다. 즉, 개념적으로 스트림은 끝나지 않을 수 있다. 따라서 스트림의 모든 튜플을 본 후에만 결과를 출력할 수 있는 질의는 영원히 결과를 반환할 수 없다.

스트리밍 데이터를 질의하는 네 가지 접근법이 있다:

1. **연속 질의(Continuous Queries)**: 들어오는 데이터 스트림을 릴레이션에 대한 삽입으로 처리하고, SQL로 질의를 작성한다. 질의는 계속 실행되며, 기저 데이터가 갱신될 때마다 질의 결과의 갱신 스트림을 출력한다.

2. **스트림 질의 언어**: SQL 또는 관계 대수를 확장하여 스트림에 윈도우 연산을 적용한다. 주요 윈도우 타입으로는 텀블링(tumbling), 호핑(hopping), 슬라이딩(sliding), 세션(session) 윈도우가 있다.

3. **대수적 연산자**: 사용자 정의 코드로 대수적 연산을 구현하며, Apache Storm과 Kafka 같은 시스템이 튜플 라우팅을 지원한다.

4. **패턴 매칭**: 패턴과 액션으로 규칙을 정의하며, 복합 이벤트 처리(CEP) 시스템이라 불린다.

많은 스트림 처리 시스템은 데이터를 메모리에 유지하고 지속성 보장을 제공하지 않는다. 이를 보완하기 위해 람다 아키텍처(lambda architecture)가 사용되기도 한다.

## 예시

Azure Stream Analytics에서의 텀블링 윈도우 질의 예시:

```sql
SELECT item, System.Timestamp AS window_end, SUM(amount)
FROM order
TIMESTAMP BY datetime
GROUP BY itemid, TumblingWindow(hour, 1)
```

이 질의는 매 시간 단위로 각 아이템별 주문 금액의 합계를 계산한다.

스트리밍 데이터의 활용 사례:
- **주식 시장**: 거래 스트림을 분석하여 패턴을 감지하고 매수/매도 결정
- **전자상거래**: 구매 및 검색 스트림을 모니터링하여 광고 캠페인 효과 실시간 추적
- **네트워크 모니터링**: 네트워크 패킷 데이터를 스트림으로 처리하여 장애나 공격 감지

## 관련 개념

- [Apache Spark](/knowledge/database/apache-spark/)
- [Key-Value Store](/knowledge/database/key-value-store/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [Graph Database](/knowledge/database/graph-database/)
