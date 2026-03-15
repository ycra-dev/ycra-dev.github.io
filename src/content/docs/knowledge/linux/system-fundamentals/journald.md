---
title: "Journald (저널 데몬)"
description: "journald는 systemd의 통합 로깅 프레임워크로, 초기 부팅부터 최종 종료까지 모든 커널 및 서비스 메시지를 캡처하고 관리하는 데몬이다"
tags: ['Journald', 'Logging', 'Systemd', 'Journal', 'Journalctl']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/journald
sidebar:
  order: 9
---

## 핵심 개념

journald는 전통적인 syslog를 대체하거나 보완하도록 설계되었으며, 구조화된 바이너리 형식으로 로그를 저장한다. 모든 메시지 메타데이터가 자동으로 인덱싱되어 시간, PID, 우선순위, 호스트명 등으로 빠르게 검색·필터링할 수 있다.

**메시지 수집 소스**: (1) /dev/log 소켓(syslog 규약), (2) /dev/kmsg(커널 메시지), (3) /run/systemd/journal/stdout(서비스 표준 출력), (4) systemd journal API, (5) auditd 감사 메시지.

현대 Linux에서는 journald와 syslog가 동시에 실행되는 경우가 많다. journald가 /dev/log 소켓을 장악하므로, syslog는 systemd를 통해 메시지 스트림에 접근한다. Debian/Ubuntu는 journald가 /run/systemd/journal/syslog로 메시지를 전달하고, RHEL/CentOS는 syslog가 journal API를 직접 소비한다.

`/etc/systemd/journald.conf`에서 `Storage=persistent`로 설정하면 이전 부팅의 로그도 보존할 수 있다. `journalctl` 명령어로 로그를 조회하며, 특정 유닛(`-u`), 특정 부팅 세션(`-b`), 시간 범위(`--since`), 우선순위(`-p`) 등으로 필터링이 가능하다.

## 예시

```bash
# 전체 로그 조회
journalctl

# 특정 서비스 로그
journalctl -u nginx

# 이전 부팅 목록
journalctl --list-boots

# 이전 부팅의 로그
journalctl -b -1

# 최근 1시간 로그 (전체 라인 표시)
journalctl --since "1 hour ago" -l

# 커널 메시지만 보기
journalctl -k

# 특정 우선순위 이상 메시지
journalctl -p err

# JSON 형식으로 내보내기
journalctl -o json-pretty

# 저널 디스크 사용량 확인
journalctl --disk-usage

# 특정 PID의 로그
journalctl _PID=1234

# 실시간 스트리밍
journalctl -f
```

## 관련 개념

- [Systemd (시스템 관리 데몬)](/knowledge/linux/systemd/)
- [부트 프로세스 (Boot Process)](/knowledge/linux/boot-process/)
- [Syslog (시스템 로그)](/knowledge/linux/syslog/)
- [로그 로테이션 (Log Rotation)](/knowledge/linux/log-rotation/)
