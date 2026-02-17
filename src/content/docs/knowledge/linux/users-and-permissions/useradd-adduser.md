---
title: "User Addition Commands"
description: "useradd와 adduser는 새로운 사용자 계정을 생성하는 명령으로, passwd/shadow 파일 편집, 홈 디렉토리 생성, 기본 파일 복사, 권한 설정 등의 복잡한 과정을 자동화한다"
tags: ['Useradd', 'Adduser', 'User Management', 'Account Provisioning', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/useradd-adduser
sidebar:
  order: 3
---

## 핵심 개념

**useradd** (Linux 저수준): /etc/default/useradd와 /etc/login.defs로 구성. 기본 홈 디렉토리 위치, 기본 셸, skeleton 디렉토리, 비밀번호 에이징 매개변수 등을 설정.

**adduser** (Debian/Ubuntu): 대화형 Perl 스크립트로 홈 디렉토리 생성, 그룹 선택, skeleton 파일 복사를 자동 처리. pre-hook/post-hook 스크립트도 지원.

**newusers** (Linux): 텍스트 파일에서 한 번에 여러 계정을 생성하지만, startup 파일은 복사하지 않는 제한이 있다.

**FreeBSD**: adduser 셸 스크립트와 pw 명령 제공. pw는 사용자/그룹 관리의 모든 측면을 처리한다.

## 예시

```bash
# Linux - 홈 디렉토리와 함께 사용자 생성
sudo useradd -m -s /bin/bash newuser

# 특정 UID, GID, 여러 그룹에 추가
sudo useradd -u 1500 -g 1500 -G sudo,docker newuser

# Debian/Ubuntu - 대화형 사용자 추가
sudo adduser newuser

# FreeBSD - pw 명령
sudo pw useradd newuser -m -s /bin/sh -G wheel

# 대량 사용자 추가
sudo newusers users.txt

# 기본 skeleton 파일 확인
ls -la /etc/skel

# 비밀번호 설정
sudo passwd newuser
```

## 관련 개념

- [Passwd and Shadow Files](/knowledge/linux/passwd-and-shadow-files/)
- [UID/GID](/knowledge/linux/uidgid/)
- [File Permissions](/knowledge/linux/file-permissions/)
- [PAM](/knowledge/linux/pam/)
