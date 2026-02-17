---
title: "Centralized Logging"
description: "중앙 집중식 로깅은 분산된 여러 시스템의 로그를 하나의 중앙 서버나 클러스터로 수집하여 통합 관리하는 방식으로, 대규모 환경의 로그 검색, 분석, 감사를 효율적으로 수행한다"
tags: ['Logging', 'Distributed Systems', 'Elk Stack', 'Rsyslog', 'Monitoring']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/centralized-logging
sidebar:
  order: 13
---

## 핵심 개념

20대 이상의 서버를 운영하는 환경에서 권장된다. PCI 같은 규정은 로그를 3개월간 즉시 접근 가능하게, 1년간 아카이빙할 것을 요구한다.

**rsyslog 기반 구현**: 클라이언트에서 omfwd 출력 모듈로 원격 전송, 서버에서 imtcp/imudp 입력 모듈로 수신. TLS(gtls 드라이버)로 암호화 전송 가능.

**ELK 스택**: Elasticsearch(검색 엔진) + Logstash(수집/필터링) + Kibana(시각화). **대안**: Graylog(오픈소스, RBAC/LDAP 통합 포함), Splunk, Sumo Logic, Loggly, AWS CloudWatch Logs.

중앙 로그 서버는 신뢰할 수 있는 관리자와 보안 담당자만 접근하도록 제한해야 한다.

## 예시

```bash
# 클라이언트 - TCP로 원격 전송
*.* @@log-server.example.com:514

# 서버 - TCP 입력 활성화
module(load="imtcp")
input(type="imtcp" port="514")

# 호스트별 로그 분리 저장
$template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
*.* ?RemoteLogs
& stop

# Filebeat으로 Logstash에 로그 전송
# /etc/filebeat/filebeat.yml
filebeat.inputs:
- type: log
  paths:
    - /var/log/syslog
output.logstash:
  hosts: ["logstash:5044"]
```

## 관련 개념

- [Syslog](/knowledge/linux/syslog/)
- [Journald](/knowledge/linux/journald/)
- [DevOps](/knowledge/linux/devops/)
- [Site Reliability Engineering](/knowledge/linux/site-reliability-engineering/)
