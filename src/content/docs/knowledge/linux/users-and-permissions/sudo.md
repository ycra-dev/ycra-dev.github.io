---
title: "Sudo (관리자 권한 실행)"
description: "sudo(substitute user do)는 일반 사용자가 root 또는 다른 제한된 사용자로 명령을 실행할 수 있게 하는 프로그램으로, `/etc/sudoers` 파일로 권한을 세밀하게 제어한다"
tags: ['Sudo', 'Root', 'Access Control', 'Privilege', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sudo
sidebar:
  order: 4
---

## 핵심 개념

sudo는 root 계정 접근의 주요 방법으로 권장되며, `su`를 대체한다. 사용자가 sudo 명령을 실행하면 자신의 비밀번호를 입력하고, 5분간 추가 인증 없이 사용 가능하다.

**핵심 장점:**
- 명령어 로깅으로 책임 추적 가능
- 사용자별 실행 가능한 명령 제한
- root 비밀번호를 소수만 알면 됨
- 권한 취소 시 root 비밀번호 변경 불필요

**sudoers 파일 구성:** 각 권한 라인은 (사용자, 호스트, 대상 사용자, 명령)의 4-tuple로 정의된다. 여러 줄이 매칭되면 마지막 줄이 우선한다. `visudo`로 편집하면 문법 검증이 자동으로 수행된다.

**주의점:** NOPASSWD 설정은 위험하므로 최소한 특정 명령으로 제한해야 한다. sudo 사용자 계정이 침해되면 root 침해와 동등하므로, 강력한 비밀번호가 필수이다.

## 예시

```bash
# root로 명령 실행
sudo apt-get update

# 다른 사용자로 실행
sudo -u postgres psql

# sudoers 파일 편집
sudo visudo

# 기본적인 sudoers 설정
# User_Alias  ADMINS = alice, bob
# ADMINS  ALL = (ALL) ALL

# 비밀번호 없이 특정 명령만 허용
# deploy  ALL = (root) NOPASSWD: /usr/bin/systemctl restart nginx
```

## 관련 개념

- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/)
- [리눅스 캐퍼빌리티 (Linux Capabilities)](/knowledge/linux/linux-capabilities/)
- [Systemd (시스템 관리 데몬)](/knowledge/linux/systemd/)
