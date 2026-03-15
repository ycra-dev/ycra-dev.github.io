---
title: "애플리케이션 모니터링 (Application Monitoring)"
description: "애플리케이션 모니터링(APM)은 시스템이나 네트워크 전체가 아닌 특정 소프트웨어의 상태, 성능, 내부 동작을 검증하고 프로파일링하는 모니터링 영역이다"
tags: ['Monitoring', 'Apm', 'DevOps', 'New Relic', 'Performance', 'Log Monitoring']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/application-monitoring
sidebar:
  order: 9
---

## 핵심 개념

애플리케이션 모니터링은 모니터링 계층에서 가장 비즈니스에 밀접한 영역이다. LAMP 스택 웹사이트라면 페이지 로드 시간, PHP 오류, MySQL 데이터베이스 상태, 과도한 연결 시도 등을 모니터링해야 한다.

**비즈니스 가치:**
- 지난 1시간 동안 판매된 위젯 수, 장바구니에 상품이 머무는 평균 시간 등 비즈니스 메트릭 모니터링 가능
- 위젯 판매 감소가 광고 네트워크 장애를 시사하는 등 다른 이벤트에 대한 통찰 제공
- 개발자와 비즈니스 오너의 참여와 지원을 즉각적으로 이끌어낼 수 있음

**로그 모니터링:**
- logwatch: 유연한 배치 지향 로그 요약기, 일일 이벤트 요약 생성
- OSSEC: 실시간 로그 모니터링에 적합
- 종합 로그 집계 시스템 (ELK 스택 등)과 통합

**상용 APM 도구:**
- New Relic: 애플리케이션 레이어 내부 동작 프로파일링에 강점
- AppDynamics: 풀스택 모니터링 솔루션 지향

**DevOps와의 관계:**
APM은 DevOps의 핵심 요소로, 팀이 스택의 어느 영역에서 성능과 안정성 개선이 가장 필요한지 판단하는 정량적 메트릭을 제공한다. 개발팀을 모니터링 프로세스에 참여시키는 것이 중요하다.

## 예시

```bash
# logwatch 일일 요약 실행
sudo logwatch --output mail --mailto admin@example.com --detail high

# 간단한 HTTP 응답 시간 모니터링
curl -w "time_total: %{time_total}s\n" -o /dev/null -s https://example.com

# Apache 접속 로그에서 느린 요청 찾기
awk '$NF > 5000000' /var/log/apache2/access.log
# (응답 시간 5초 이상인 요청)

# Supervisor로 프로세스 모니터링
# /etc/supervisor/conf.d/myapp.conf
# [program:myapp]
# command=/usr/bin/python /opt/myapp/app.py
# autorestart=true
# stderr_logfile=/var/log/myapp.err.log
# stdout_logfile=/var/log/myapp.out.log
```

## 관련 개념

- [Grafana (그라파나)](/knowledge/linux/grafana/) - 애플리케이션 메트릭 시각화 대시보드
- [Prometheus (프로메테우스)](/knowledge/linux/prometheus/) - 애플리케이션 메트릭 수집 플랫폼
- [StatsD (통계 수집 데몬)](/knowledge/linux/statsd/) - 애플리케이션에서 커스텀 메트릭 전송
- [DevOps (데브옵스)](/knowledge/linux/devops/) - APM이 핵심인 DevOps 문화
