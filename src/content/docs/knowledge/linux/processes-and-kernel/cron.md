---
title: "Cron"
description: "cron은 미리 정해진 스케줄에 따라 명령을 자동 실행하는 UNIX/Linux 데몬으로, crontab(cron table) 파일에 실행 시각과 명령을 정의한다"
tags: ['Cron', 'Scheduling', 'Crontab', 'Automation', 'Periodic Task']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cron
sidebar:
  order: 3
---

## 핵심 개념

cron은 시스템 부팅 시 시작되어 계속 실행된다. 설정 파일(crontab)은 sh를 통해 명령을 실행하며, 최소 1분 단위로 스케줄링 가능하다.

**crontab 형식:** 6개 필드 — 분, 시, 일, 월, 요일, 명령어
```
분(0-59) 시(0-23) 일(1-31) 월(1-12) 요일(0-7) 명령어
```
`*`는 모든 값, 범위(`1-5`), 스텝(`*/10`), 목록(`1,3,5`) 사용 가능.

**crontab 파일 종류:**
- 사용자별: `/var/spool/cron/` (Linux) — `crontab -e`로 편집
- 시스템 전역: `/etc/crontab` — 추가로 사용자명 필드 포함
- 패키지용: `/etc/cron.d/`
- 디렉토리 기반: `/etc/cron.{hourly,daily,weekly,monthly}/`

**주의점:** cron은 로그인 쉘이 아니므로 환경변수가 다를 수 있다. 명령의 전체 경로를 사용하고, 필요시 crontab 상단에 환경변수를 명시적으로 설정해야 한다.

**systemd timer**: cron의 대안으로, `.timer`와 `.service` 유닛 파일 쌍으로 구성되며 캘린더 및 상대 시간 표현이 가능하다.

## 예시

```bash
# crontab 편집
crontab -e

# crontab 보기
crontab -l

# 매일 새벽 2시에 백업
0 2 * * * /usr/local/bin/backup.sh

# 월-금 10분마다 실행
*/10 * * * 1-5 /usr/local/bin/check.sh

# systemd timer로 10분마다 실행
# systemd-run --on-calendar='*:0/10' /usr/bin/git pull
```

## 관련 개념

- [Process](/knowledge/linux/process/)
- [Systemd](/knowledge/linux/systemd/)
- [Signal](/knowledge/linux/signal/)
