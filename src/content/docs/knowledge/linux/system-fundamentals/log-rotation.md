---
title: "로그 로테이션 (Log Rotation)"
description: "로그 로테이션은 로그 파일의 무한 증가를 방지하기 위해 주기적으로 파일명을 변경하여 보관하고 새로운 빈 파일을 생성하는 프로세스로, Linux에서는 logrotate, FreeBSD에서는 newsyslog이 자동화한다"
tags: ['Logrotate', 'Logging', 'Maintenance', 'Disk Management', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/log-rotation
sidebar:
  order: 12
---

## 핵심 개념

logrotate는 /etc/logrotate.conf과 /etc/logrotate.d/의 설정 파일을 통해 구성되며, cron에서 하루 한 번 실행된다. **주요 옵션**: daily/weekly/monthly(주기), rotate N(보관 개수), compress(gzip 압축), delaycompress(한 사이클 지연), copytruncate(복사 후 잘라내기).

**로테이션 방법**: (1) 기본 — 파일 이름 변경 후 새 파일 생성, (2) copytruncate — 파일 복사 후 원본 잘라내기(시그널 전송 불가 시 유용).

로그 파일을 쓰는 데몬에 알리기 위해 **postrotate/prerotate** 스크립트 블록을 사용한다. sharedscripts 옵션으로 여러 파일 처리 시 스크립트를 한 번만 실행한다.

## 예시

```bash
# logrotate 설정 예시 (/etc/logrotate.d/nginx)
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 $(cat /var/run/nginx.pid)
    endscript
}

# 디버그 모드로 실행 (변경 없음)
logrotate -d /etc/logrotate.conf

# 강제 로테이션
logrotate -f /etc/logrotate.conf
```

## 관련 개념

- [Syslog (시스템 로그)](/knowledge/linux/syslog/)
- [Journald (저널 데몬)](/knowledge/linux/journald/)
- [크론 (Cron)](/knowledge/linux/cron/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [시그널 (Signal)](/knowledge/linux/signal/)
