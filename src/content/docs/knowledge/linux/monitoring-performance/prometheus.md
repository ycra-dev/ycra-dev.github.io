---
title: "Prometheus"
description: "Prometheus는 통합 수집, 트렌딩, 경고 기능을 갖춘 종합적인 오픈 소스 시계열 모니터링 플랫폼으로, DevOps 환경에서 가장 선호되는 모니터링 도구이다"
tags: ['Monitoring', 'Time Series', 'Metrics', 'Alerting', 'DevOps', 'Open Source']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/prometheus
sidebar:
  order: 3
---

## 핵심 개념

Prometheus는 시스템 관리자와 개발자 모두에게 친화적이어서 DevOps 조직에 매우 적합하다. 통합 수집(collection), 트렌딩(trending), 경고(alerting) 컴포넌트를 포함한 종합 플랫폼이다.

**장점:**
- 풀(pull) 기반 메트릭 수집 모델
- 강력한 쿼리 언어(PromQL)
- 다차원 데이터 모델 (레이블 기반)
- 자체 알림 관리자(Alertmanager) 포함
- Grafana와의 뛰어난 통합

**제한:**
- 클러스터링을 지원하지 않아 고가용성이 필요한 사이트에는 부적합할 수 있음

Prometheus는 Graphite, InfluxDB, Munin 등과 함께 시계열 플랫폼 카테고리에 속하지만, 통합 컴포넌트의 완성도와 사용 편의성 면에서 가장 높은 평가를 받는다. 대부분의 새로운 배포에 가장 추천되는 플랫폼이다.

## 예시

```yaml
# prometheus.yml 기본 설정
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100', 'server2:9100']

  - job_name: 'application'
    static_configs:
      - targets: ['app-server:8080']
```

```bash
# Node Exporter 설치 및 실행 (시스템 메트릭 수집)
./node_exporter --web.listen-address=":9100"

# PromQL 쿼리 예시
# CPU 사용률
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# 메모리 사용률
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100

# 디스크 I/O
rate(node_disk_read_bytes_total[5m])
```

## 관련 개념

- [time-series-database](/knowledge/linux/time-series-database/) - Prometheus의 데이터 저장 방식
- [grafana](/knowledge/linux/grafana/) - Prometheus 데이터 시각화 도구
- [nagios](/knowledge/linux/nagios/) - Prometheus가 대체하는 1세대 모니터링
- [collectd](/knowledge/linux/collectd/) - 시스템 메트릭 수집 도구와의 비교
