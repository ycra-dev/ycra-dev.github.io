---
title: "Nagios"
description: "Nagios는 실시간 알림과 오류 상태 감지에 특화된 오픈 소스 모니터링 플랫폼으로, 수많은 서비스 모니터링 스크립트와 SNMP 모니터링 기능을 포함한다"
tags: ['Monitoring', 'Alerting', 'Icinga', 'Sensu', 'Real Time', 'Open Source']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nagios
sidebar:
  order: 2
---

## 핵심 개념

Nagios, Icinga, Sensu Core는 1세대 실시간(임계값 기반) 모니터링 도구를 대표한다. 이들은 혁신적이었으나 시계열 시스템에 점차 대체되고 있다.

**Nagios vs Icinga:**
- Icinga는 원래 Nagios에서 포크되었으나, Icinga 2는 완전히 새로 작성됨
- Icinga 2가 더 깨끗한 코드 베이스, 빠른 UI, 서비스 의존성 자동 생성 기능을 보유
- 새로 구축한다면 Nagios보다 Icinga 2를 권장

**공통 강점:**
- Perl, PHP, Python, C 등으로 커스텀 모니터링 스크립트 작성 가능
- 이메일, 웹 리포트, 문자 메시지 등 다양한 알림 방법 내장
- 이중화, 원격 모니터링, 알림 에스컬레이션 지원
- 1,000대 미만의 호스트/장치 네트워크에 적합

**Sensu:**
- Nagios 대체를 목표로 설계된 풀스택 모니터링 프레임워크
- 레거시 Nagios/Icinga/Zabbix 플러그인 실행 가능
- Logstash, Slack 통합 용이

**모니터링 문화의 핵심 원칙:**
- 프로덕션 장치/서비스는 라이브 전에 반드시 모니터링 플랫폼에 추가
- 알림은 반드시 실행 가능(actionable)해야 함
- 모니터링 플랫폼 자체도 모니터링해야 함

## 예시

```bash
# Nagios 플러그인으로 서비스 상태 확인
/usr/lib/nagios/plugins/check_http -H www.example.com
/usr/lib/nagios/plugins/check_disk -w 20% -c 10% -p /
/usr/lib/nagios/plugins/check_load -w 5.0,4.0,3.0 -c 10.0,8.0,6.0

# Icinga 2 서비스 상태 확인
icinga2 daemon -C  # 설정 검증

# 커스텀 Nagios 호환 플러그인 (Bash)
#!/bin/bash
LOAD=$(uptime | awk -F'load average: ' '{print $2}' | cut -d, -f1)
if (( $(echo "$LOAD > 5.0" | bc -l) )); then
    echo "CRITICAL - Load average: $LOAD"
    exit 2
elif (( $(echo "$LOAD > 3.0" | bc -l) )); then
    echo "WARNING - Load average: $LOAD"
    exit 1
else
    echo "OK - Load average: $LOAD"
    exit 0
fi
```

## 관련 개념

- [time-series-database](/knowledge/linux/time-series-database/) - Nagios를 대체하는 현대적 모니터링 접근법
- [prometheus](/knowledge/linux/prometheus/) - 시계열 기반 모니터링 대안
- [snmp](/knowledge/linux/snmp/) - Nagios의 네트워크 장치 모니터링 기능
- [collectd](/knowledge/linux/collectd/) - 시스템 통계 수집과의 통합
