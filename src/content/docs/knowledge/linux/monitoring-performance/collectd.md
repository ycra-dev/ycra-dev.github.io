---
title: "collectd (시스템 통계 수집 데몬)"
description: "collectd는 시스템 통계를 지정된 간격으로 수집하고 저장하는 데몬으로, 100개 이상의 플러그인을 통해 다양한 메트릭을 모니터링 플랫폼에 공급한다"
tags: ['Monitoring', 'System Statistics', 'Daemon', 'Metrics Collection', 'Plugin']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/collectd
sidebar:
  order: 5
---

## 핵심 개념

시스템 통계 수집은 지속적인 프로세스여야 하므로 UNIX 철학에 따라 데몬으로 구현된 것이 collectd이다. Linux와 FreeBSD에서 모두 동작하는 성숙한 도구이다.

**동작 모드:**
- 로컬 모드: 로컬 시스템에서 메트릭을 수집하고 저장
- 클라이언트/서버 모드: 하나 이상의 collectd 인스턴스가 다른 서버 그룹의 데이터를 집계

**특징:**
- 100개 이상의 입출력 플러그인 (CPU, 메모리, 디스크, 네트워크 등)
- Icinga/Nagios에서 실시간 모니터링 쿼리 가능
- Graphite/InfluxDB로 시계열 분석을 위한 데이터 전달 가능
- RRDtool 호환 데이터 파일 생성

collectd는 SNMP 에이전트의 현대적 대안으로, 서버 모니터링에서 SNMP보다 훨씬 우수한 성능과 편의성을 제공한다. 개별 스크립트 작성 방식에서 체계적인 데이터 수집으로의 전환을 대표한다.

## 예시

```bash
# collectd 설치 (Ubuntu)
sudo apt-get install collectd

# /etc/collectd/collectd.conf 설정 예시
# Hostname "webserver01"
# Interval 30
#
# LoadPlugin cpu
# LoadPlugin memory
# LoadPlugin disk
# LoadPlugin interface
# LoadPlugin load
# LoadPlugin df
#
# <Plugin "disk">
#   Disk "sda"
# </Plugin>
#
# <Plugin "interface">
#   Interface "eth0"
# </Plugin>
#
# <Plugin "write_graphite">
#   <Node "graphite">
#     Host "graphite.admin.com"
#     Port "2003"
#   </Node>
# </Plugin>

# collectd 서비스 관리
sudo systemctl start collectd
sudo systemctl enable collectd
sudo systemctl status collectd
```

## 관련 개념

- [SNMP (네트워크 관리 프로토콜)](/knowledge/linux/snmp/) - collectd가 대체하는 서버 모니터링 프로토콜
- [시계열 데이터베이스 (Time-Series Database)](/knowledge/linux/time-series-database/) - collectd가 데이터를 전달하는 대상
- [Prometheus (프로메테우스)](/knowledge/linux/prometheus/) - collectd와 유사한 데이터 수집 기능 내장
- [Nagios (나기오스)](/knowledge/linux/nagios/) - collectd 데이터를 쿼리하는 모니터링 플랫폼
