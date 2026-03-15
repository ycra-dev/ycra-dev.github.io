---
title: "분산 추적 (Distributed Tracing)"
description: "단일 API 호출이 발생시키는 여러 서비스 간의 흐름을 하나의 그래프로 연결하는 추적 기법"
tags: ["Software Engineering", "Observability", "Microservices", "Debugging"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/distributed-tracing
sidebar:
  order: 21
---

## 핵심 개념

분산 추적(Distributed Tracing)은 단일 프론트엔드 API 호출이 발생시키는 수백 개의 다운스트림 RPC 호출을 하나의 그래프로 연결하는 추적 기법이다. 마이크로서비스 환경에서 요청이 어느 서비스를 거쳐 어디서 지연이 발생했는지 파악하기 위해 필수적이다.

## 동작 원리

동작 원리:
1. RPC 클라이언트가 트레이싱 라이브러리로 고유한 trace ID를 요청에 부착
2. 다운스트림 서비스도 동일 trace ID를 전파
3. 각 서비스가 호출 정보(메타데이터 태그, 처리 시간)와 ID를 중앙 수집 시스템에 보고
4. 전용 시스템이 ID 기준으로 분산 호출 그래프를 재구성

활용 분야:
- 에러 디버깅 (어느 서비스에서 오류 발생?)
- 성능 측정 (병목 구간 식별)
- 의존성 파악 (서비스 간 호출 관계 시각화)
- 비용 분석 (비싼 다운스트림 호출 식별)

보통 RPC 클라이언트 래퍼나 서비스 메시가 자동으로 trace ID를 전파한다.

## 예시

사용자 로그인 요청의 분산 트레이스:

```
[trace-id: abc-789]

API Gateway ─────────────────── 총 250ms
  ├─ Auth Service ──────────── 80ms
  │    └─ User DB Query ────── 15ms
  ├─ Token Service ─────────── 45ms
  │    └─ Redis Cache ──────── 2ms (cache hit!)
  └─ Audit Log Service ─────── 10ms (비동기)
```

각 구간(Span)에 부착할 수 있는 메타데이터 태그:
```
span "Auth Service":
  - user.id: 12345
  - auth.method: password
  - status: success

span "User DB Query":
  - db.type: postgresql
  - db.table: users
  - db.rows_affected: 1
```

OpenTelemetry를 사용한 계측:
```python
from opentelemetry import trace

tracer = trace.get_tracer("my-service")

def process_payment(order_id):
    with tracer.start_as_current_span("process_payment") as span:
        span.set_attribute("order.id", order_id)
        result = payment_gateway.charge(order_id)
        span.set_attribute("payment.status", result.status)
        return result
```

도구: Jaeger, Zipkin, Datadog APM, AWS X-Ray, Honeycomb

## 관련 개념

- [관측 가능성 (Observability)](/knowledge/software-engineering/quality-and-configuration/observability/)
- [로그 레벨 (Log Levels)](/knowledge/software-engineering/quality-and-configuration/log-levels/)
- [장애 대응 (Incident Response)](/knowledge/software-engineering/quality-and-configuration/incident-response/)
