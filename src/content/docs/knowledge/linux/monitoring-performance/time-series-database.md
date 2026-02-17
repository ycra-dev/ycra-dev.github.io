---
title: "Time-Series Database"
description: "시계열 데이터베이스(TSDB)는 시간에 따른 데이터 변화를 효율적으로 저장, 조회, 집계하도록 특화된 데이터베이스로, 현대 모니터링 플랫폼의 핵심 구성 요소이다"
tags: ['Monitoring', 'Database', 'Metrics', 'Graphite', 'Prometheus', 'Influxdb']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/time-series-database
sidebar:
  order: 7
---

## 핵심 개념

모든 모니터링 데이터는 본질적으로 시계열 데이터이다. 값이 변하지 않는다면 모니터링할 필요가 없기 때문이다. 기존 데이터베이스에 모니터링 데이터를 축적하면 성능 저하와 디스크 오버플로우가 발생한다.

**시계열 데이터 관리 전략:**
- 최근 데이터는 높은 해상도로 유지 (예: 1시간치 1초 간격)
- 오래된 데이터는 점진적으로 요약하여 저장 공간 절약 (예: 1주일치 1분 간격, 1년치 1시간 간격)
- 역사적 데이터는 대시보드 표시와 비교 기준선으로 활용

**주요 시계열 플랫폼:**
- **Graphite**: 시계열 모니터링 플랫폼의 선구자. Carbon(데이터 수집)과 Whisper(저장) 핵심 컴포넌트. 클러스터링 지원
- **Prometheus**: 저자들이 가장 선호하는 플랫폼. 통합 수집, 트렌딩, 경고 기능. DevOps 환경에 적합하나 클러스터링 미지원
- **InfluxDB**: 개발자 친화적이며 다양한 프로그래밍 언어 지원. Graphite 대비 풍부한 데이터 관리 기능
- **Munin**: 데이터 수집 플러그인이 데이터 표현 방식까지 지정하는 아키텍처

대부분의 새로운 배포에는 Prometheus를 권장하며, Nagios/Icinga 같은 1세대 실시간 플랫폼은 점차 시계열 시스템에 대체되고 있다.

## 예시

```bash
# Prometheus 설정 예시 (prometheus.yml)
# global:
#   scrape_interval: 15s
# scrape_configs:
#   - job_name: 'node'
#     static_configs:
#       - targets: ['localhost:9100']

# Graphite Carbon 데이터 보존 설정 (storage-schemas.conf)
# [stats]
# pattern = ^stats\.
# retentions = 10s:12h,1m:7d,10m:1y

# Prometheus 쿼리 예시 (PromQL)
# CPU 사용률
# 100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# InfluxDB에 데이터 쓰기
curl -i -XPOST 'http://localhost:8086/write?db=mydb' \
  --data-binary 'cpu_load,host=server01 value=0.64'
```

## 관련 개념

- [prometheus](/knowledge/linux/prometheus/) - 대표적인 시계열 모니터링 플랫폼
- [grafana](/knowledge/linux/grafana/) - 시계열 데이터 시각화
- [collectd](/knowledge/linux/collectd/) - 시계열 데이터베이스에 데이터를 공급하는 수집기
- [statsd](/knowledge/linux/statsd/) - 데이터 수집 프론트엔드
