---
title: "Syslog"
description: "syslog는 UNIX/Linux에서 로그 메시지를 수집, 처리, 저장하는 표준 로깅 프로토콜 및 시스템으로, rsyslog 같은 현대적 구현체를 통해 네트워크 전송, 필터링, 다양한 출력 대상을 지원한다"
tags: ['Syslog', 'Rsyslog', 'Logging', 'System Administration', 'Daemon']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/syslog
sidebar:
  order: 10
---

## 핵심 개념

프로그램과 데몬들이 /dev/log UNIX 도메인 소켓을 통해 로그를 전송하면, syslog 데몬이 설정에 따라 적절한 위치에 저장한다. 메시지는 **facility**(메시지 소스: kern, mail, auth 등)와 **severity**(심각도: emerg~debug)로 분류된다.

**rsyslog**는 이벤트 스트림 처리 엔진으로 발전했다. 모듈식 아키텍처로 입력 모듈(imuxsock, imtcp, imjournal)에서 수집하고 출력 모듈(omfile, omfwd, omkafka)로 전달한다. **세 가지 설정 문법**: sysklogd(전통적), 레거시 지시자($), RainerScript(현대적 스크립팅).

TLS를 통한 암호화된 로그 전송을 지원하여 보안 환경에서 네트워크 로그 중앙화를 구현할 수 있다.

## 예시

```bash
# rsyslog 상태 확인 및 재시작
systemctl status rsyslog
systemctl restart rsyslog

# 테스트 메시지 전송
logger -p user.notice "Test message"
logger -t myapp "App started"

# 기본 rsyslog 설정 예시 (/etc/rsyslog.conf)
auth,authpriv.*     /var/log/auth.log
*.emerg             :omusrmsg:*
mail.*              -/var/log/mail.log

# TCP 입력 활성화
module(load="imtcp")
input(type="imtcp" port="514")

# HUP 시그널로 로그 파일 재오픈
kill -HUP $(cat /var/run/syslogd.pid)
```

## 관련 개념

- [Journald](/knowledge/linux/journald/)
- [Log Rotation](/knowledge/linux/log-rotation/)
- [Centralized Logging](/knowledge/linux/centralized-logging/)
- [Process](/knowledge/linux/process/)
