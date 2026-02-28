---
title: "Observability"
description: "시스템의 외부 출력을 통해 내부 상태를 파악할 수 있는 정도"
tags: ["Software Engineering", "Operations", "Monitoring", "SRE"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/observability
sidebar:
  order: 20
---

## 핵심 개념

관측가능성(Observability)은 시스템의 외부 출력(메트릭, 로그, 트레이스)을 통해 시스템의 내부 상태를 파악할 수 있는 정도이다. 제어 이론에서 차용된 개념이다. 원칙: **모든 것을 측정한다** — 리소스 풀, 캐시, 데이터 구조, CPU/IO 연산, 예외, 원격 요청.

## 동작 원리

3가지 관측가능성 축(Observability Pillars):
- **메트릭(Metrics)**: 시스템 상태를 수치로 측정
- **로그(Logs)**: 이벤트와 상태 변화의 텍스트 기록
- **트레이스(Traces)**: 요청이 여러 서비스를 거치는 흐름 추적

메트릭 유형:
- **Counter**: 이벤트 발생 횟수, 단조 증가 (예: 요청 수, 에러 수)
- **Gauge**: 시점별 측정값, 증감 가능 (예: 메모리 사용량, 큐 크기)
- **Histogram**: 이벤트를 범위별로 분류 (예: 응답 시간 분포)

P99 등 백분위 수로 시스템 성능을 측정한다. Datadog, Prometheus, Grafana 등으로 대시보드 및 알림을 구성한다.

RED 메트릭 패턴 (모든 서비스의 기본):
- **R**ate: 요청 수/초
- **E**rror: 에러 비율
- **D**uration: 응답 시간

## 예시

```python
from statsd import StatsClient

statsd = StatsClient()

# Counter: 캐시 히트 횟수 (단조 증가)
statsd.incr('cache.key_hit')

# Gauge: 현재 큐 크기 (증감 가능)
statsd.gauge('queue.pending_jobs', len(queue))

# Histogram: API 응답 시간 측정
with statsd.timer('api.response_time'):
    result = process_request(request)
```

주요 관측 대상:
```
# RED 메트릭 (모든 서비스)
- 요청 수 (requests per second)
- 에러 율 (error rate %)
- 응답 시간 (P50, P95, P99)

# 추가 관측 대상
- 데이터베이스 연결 풀 사용률
- 캐시 히트/미스 비율
- 메시지 큐 깊이
- GC 빈도 및 소요 시간
- CPU/메모리 사용률
```

알림 설정:
```yaml
alerts:
  - name: high_error_rate
    condition: error_rate > 1%
    duration: 5m
    severity: page  # 즉시 온콜 알림

  - name: slow_response
    condition: p99_latency > 500ms
    duration: 10m
    severity: ticket  # 티켓 생성
```

## 관련 개념

- [Log Levels](/knowledge/software-engineering/quality-and-configuration/log-levels/)
- [Distributed Tracing](/knowledge/software-engineering/quality-and-configuration/distributed-tracing/)
- [Service Level Objective](/knowledge/software-engineering/quality-and-configuration/service-level-objective/)
- [Incident Response](/knowledge/software-engineering/quality-and-configuration/incident-response/)
