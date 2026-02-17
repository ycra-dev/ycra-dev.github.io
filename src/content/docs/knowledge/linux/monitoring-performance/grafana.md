---
title: "Grafana"
description: "Grafana는 다양한 데이터 소스의 시계열 데이터를 아름답고 인터랙티브한 대시보드와 차트로 시각화하는 오픈 소스 데이터 시각화 플랫폼이다"
tags: ['Monitoring', 'Visualization', 'Dashboard', 'Charting', 'Metrics', 'Open Source']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/grafana
sidebar:
  order: 4
---

## 핵심 개념

Grafana는 원래 Graphite의 그래핑 기능을 개선하기 위해 시작되었으나, 현재는 30개 이상의 데이터 백엔드를 지원하는 독립적인 시각화 플랫폼으로 발전했다.

**대시보드의 핵심 원칙:**
- **선별성**: 특정 도메인에서 가장 중요한 메트릭만 표시
- **컨텍스트**: 데이터의 중요도를 시각적 단서(색상, 크기, 그룹핑)로 표현
- **차트화**: 데이터 시리즈를 차트로 표시하여 한눈에 평가 가능

**Grafana vs Graphite 그래핑:**
- Grafana는 데이터베이스에 독립적(agnostic)이어서 다양한 외부 데이터 소스 수용에 뛰어남
- Graphite 그래핑은 주로 Whisper(자체 데이터 저장소) 중심
- 비교 평가에서 Grafana가 우수한 UI와 미려한 그래프로 호평

**모니터링 대시보드의 가치:**
- 저수준 시스템 메트릭부터 비즈니스 수준 지표까지 표시 가능
- 개발자와 프로세스 오너에게 기능성을 보여주면 모니터링 확대에 대한 즉각적 지지를 얻을 수 있음
- 인사이트를 유발하고 경영진을 만족시키는 시각화 제공

## 예시

```bash
# Grafana 설치 (Ubuntu)
sudo apt-get install -y grafana
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
# 웹 브라우저에서 http://localhost:3000 접속 (기본 admin/admin)

# Grafana 데이터 소스 추가 (API 사용)
curl -X POST http://admin:admin@localhost:3000/api/datasources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prometheus",
    "type": "prometheus",
    "url": "http://localhost:9090",
    "access": "proxy"
  }'
```

```json
// Grafana 대시보드 패널 JSON 예시
{
  "title": "CPU Usage",
  "type": "graph",
  "targets": [{
    "expr": "100 - (avg(rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)",
    "legendFormat": "{{instance}}"
  }]
}
```

## 관련 개념

- [prometheus](/knowledge/linux/prometheus/) - Grafana의 주요 데이터 소스
- [time-series-database](/knowledge/linux/time-series-database/) - Grafana가 시각화하는 데이터의 저장소
- [nagios](/knowledge/linux/nagios/) - Grafana와 통합 가능한 모니터링 도구
- [application-monitoring](/knowledge/linux/application-monitoring/) - 비즈니스 메트릭 시각화
