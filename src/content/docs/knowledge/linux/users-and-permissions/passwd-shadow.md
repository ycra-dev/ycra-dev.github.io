---
title: "Passwd and Shadow Files"
description: "/etc/passwd와 /etc/shadow는 UNIX/Linux에서 사용자 계정 정보를 저장하는 핵심 파일로, passwd는 기본 사용자 정보(world-readable)를, shadow는 암호화된 비밀번호와 보안 정보(superuser만 읽기 가능)를 포함한다"
tags: ['Authentication', 'Security', 'User Management', 'Password', 'Shadow']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/passwd-shadow
sidebar:
  order: 2
---

## 핵심 개념

**/etc/passwd**: 콜론 구분 7개 필드 — 로그인 이름, 비밀번호 플레이스홀더(x), UID, 기본 GID, GECOS(전체 이름 등), 홈 디렉토리, 로그인 셸.

**/etc/shadow**: 콜론 구분 9개 필드 — 로그인 이름, 암호화된 비밀번호, 마지막 변경 날짜, 최소/최대 변경 일수, 만료 전 경고 일수, 비활성화 일수, 계정 만료 날짜, 예약 필드. 날짜는 1970-01-01 이후 일수로 표현한다.

수동 편집 시 **vipw** 명령을 사용해야 파일 잠금이 보장된다. Linux에서는 `vipw -s`로 shadow 파일도 편집한다. **pwconv**로 두 파일의 내용을 동기화할 수 있다.

## 예시

```bash
# passwd 정보 조회
getent passwd username

# shadow 정보 조회 (root)
sudo getent shadow username

# 안전한 편집
sudo vipw        # passwd
sudo vipw -s     # shadow

# 비밀번호 에이징 정보 확인
chage -l username

# 비밀번호 만료일 설정
sudo chage -E 2026-12-31 username
sudo chage -M 90 username  # 최대 90일

# 계정 잠금/해제
sudo usermod -L username
sudo usermod -U username
```

## 관련 개념

- [PAM](/knowledge/linux/pam/)
- [Sudo](/knowledge/linux/sudo/)
- [File Permissions](/knowledge/linux/file-permissions/)
