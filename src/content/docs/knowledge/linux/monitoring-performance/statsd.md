---
title: "StatsD (통계 수집 데몬)"
description: "StatsD는 Etsy에서 개발한 UDP 기반 데이터 수집 프론트엔드 프로토콜로, 임의의 통계 데이터를 모니터링 플랫폼에 전달하여 소비, 계산, 표시할 수 있게 한다"
tags: ['Monitoring', 'Metrics', 'UDP', 'Data Collection', 'Etsy', 'Protocol']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/statsd
sidebar:
  order: 6
---

## 핵심 개념

StatsD의 초능력은 임의의 통계를 수집하고 계산을 수행하는 능력이다. 현재 "StatsD"는 특정 소프트웨어 패키지보다는 프로토콜 자체를 지칭하며, 다양한 언어로 구현체가 존재한다.

**아키텍처:**
- UDP 기반이므로 데이터 전송이 빠르고 비차단적
- 다양한 백엔드와 클라이언트에 데이터를 전달하는 모듈식 구조
- Graphite의 Carbon 컴포넌트와 함께 자주 사용

**Carbon 저장 설정 (storage-schemas.conf):**
- 데이터 보존 기간과 해상도를 정의
- 예: 10초 간격으로 12시간, 1분 간격으로 7일, 10분 간격으로 1년

**집계 방식 (storage-aggregation.conf):**
- 데이터 롤업 시 집계 방법 지정: sum, average, min, max
- xFilesFactor: 의미 있는 다운샘플링을 위한 최소 유효 샘플 비율

## 예시

```bash
# StatsD 설치 (GitHub에서 클론)
git clone https://github.com/etsy/statsd.git

# netcat으로 StatsD에 테스트 데이터 전송
echo "sample.count:1|c" | nc -u -w0 statsd.admin.com 8125
# count(c) 타입의 sample.count 메트릭에 값 1 전송

# Perl 스크립트에서 StatsD로 로드 평균 전송
#!/usr/bin/perl
use Net::StatsD;
my $statsd = Net::StatsD->new(host => 'statsd.admin.com');
my $load = `uptime`;
$load =~ /load average: ([\d.]+)/;
$statsd->gauge('system.load.1min', $1);

# Python에서 StatsD 사용
# pip install statsd
# import statsd
# c = statsd.StatsClient('statsd.admin.com', 8125)
# c.incr('page.views')       # 카운터 증가
# c.timing('api.response', 320)  # 타이밍 기록
# c.gauge('cpu.usage', 45.2)     # 게이지 설정
```

## 관련 개념

- [시계열 데이터베이스 (Time-Series Database)](/knowledge/linux/time-series-database/) - StatsD가 데이터를 전달하는 시계열 저장소
- [Grafana (그라파나)](/knowledge/linux/grafana/) - StatsD 데이터를 시각화하는 도구
- [collectd (시스템 통계 수집 데몬)](/knowledge/linux/collectd/) - 시스템 수준 데이터 수집 대안
- [애플리케이션 모니터링 (Application Monitoring)](/knowledge/linux/application-monitoring/) - StatsD의 주요 활용 영역
