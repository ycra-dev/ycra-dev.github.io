---
title: "Syslog 시설과 심각도 (Syslog Facility and Severity)"
description: "syslog facility와 severity는 로그 메시지를 분류하는 두 축으로, facility는 메시지를 생성한 시스템 컴포넌트(kern, mail, auth 등)를, severity는 심각도(emerg~debug 8단계)를 나타내며, 이 조합으로 로그를 선..."
tags: ['Syslog', 'Logging', 'Message Classification', 'Priority', 'Filtering']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/syslog-facility-severity
sidebar:
  order: 11
---

## 핵심 개념

**Facility**: kern(0), user(1), mail(2), daemon(3), auth(4), syslog(5), lpr(6), news(7), uucp(8), cron(9), authpriv(10), local0-local7(16-23). local0~7은 사이트별 커스텀 애플리케이션용.

**Severity** (높은 순): emerg(0), alert(1), crit(2), err(3), warning(4), notice(5), info(6), debug(7). 셀렉터에서 severity는 최소 중요도로 동작하여 auth.warning은 warning 이상 모든 인증 메시지를 선택한다.

**셀렉터 문법**: 쉼표로 facility 결합, 세미콜론으로 셀렉터 결합. `=`는 정확한 레벨만, `!`는 제외. 예: `*.err;mail.none` = 메일 제외 모든 에러 이상.

## 예시

```bash
# 다양한 셀렉터 예시
auth,authpriv.*                 /var/log/auth.log
*.crit                          /var/log/critical.log
*.err;mail.none                 /var/log/error.log
*.emerg                         :omusrmsg:*

# logger로 다양한 facility/severity 테스트
logger -p user.info "User info"
logger -p auth.warning "Auth warning"
logger -p local0.debug "Local0 debug"

# journalctl에서 priority 필터링
journalctl -p err          # err 이상
journalctl -p 0..3         # emerg~err
journalctl SYSLOG_FACILITY=4  # auth

# RainerScript 필터링
if $syslogfacility-text == "auth" then {
    action(type="omfile" file="/var/log/auth.log")
}
```

## 관련 개념

- [Syslog (시스템 로그)](/knowledge/linux/syslog/)
- [Journald (저널 데몬)](/knowledge/linux/journald/)
- [로그 로테이션 (Log Rotation)](/knowledge/linux/log-rotation/)
