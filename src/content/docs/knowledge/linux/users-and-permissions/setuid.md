---
title: "Setuid"
description: "Setuid(Set User ID)는 실행 파일에 설정되는 특수 권한 비트로, 실행 시 프로세스의 유효 UID를 실행자가 아닌 파일 소유자의 UID로 변경하여 권한을 상승시키는 메커니즘이다"
tags: ['Setuid', 'Setgid', 'Permissions', 'Security', 'Unix', 'Access Control']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/setuid
sidebar:
  order: 5
---

## 핵심 개념

커널이 setuid 비트가 설정된 실행 파일을 실행하면, 결과 프로세스의 유효 UID(또는 setgid의 경우 GID)를 파일 소유자의 것으로 변경한다. 이를 통해 비특권 사용자가 특정 특권 작업을 수행할 수 있다.

대표적 예시는 `passwd` 명령어로, 사용자가 `/etc/shadow` 파일(root만 쓰기 가능)에 접근하여 비밀번호를 변경할 수 있게 한다.

**프로세스 ID 종류:**
- **실제(Real) UID/GID**: 계정 관리용
- **유효(Effective) UID/GID**: 접근 권한 결정용
- **저장(Saved) UID/GID**: 특권 모드 전환 시 임시 저장용

**보안 위험:** setuid 프로그램은 보안 취약점의 주요 대상이므로 최소한으로 유지해야 한다. 파일시스템에 `nosuid` 마운트 옵션을 사용하면 setuid 실행을 비활성화할 수 있다. setuid를 고려하지 않고 작성된 프로그램에는 절대 setuid를 설정하지 않아야 한다.

## 예시

```bash
# setuid 비트가 설정된 파일 확인
ls -l /usr/bin/passwd
# -rwsr-xr-x 1 root root ... /usr/bin/passwd

# setuid 비트 설정
chmod u+s /usr/local/bin/myprogram
chmod 4755 /usr/local/bin/myprogram

# 시스템에서 setuid 파일 찾기
find / -perm -4000 -type f 2>/dev/null

# nosuid로 파일시스템 마운트
mount -o nosuid /dev/sda2 /home
```

## 관련 개념

- [Sudo](/knowledge/linux/sudo/)
- [Linux Capabilities](/knowledge/linux/linux-capabilities/)
- [PAM](/knowledge/linux/pam/)
