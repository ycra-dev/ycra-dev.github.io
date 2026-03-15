---
title: "패키지 관리 (Package Management)"
description: "패키지 관리는 운영체제에서 소프트웨어를 설치, 업그레이드, 설정, 제거하는 체계적 프로세스로, 패키지 매니저를 통해 소프트웨어의 의존성과 버전을 관리한다"
tags: ['Linux', 'Software', 'Apt', 'Yum', 'Pkg', 'Installation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/package-management
sidebar:
  order: 3
---

## 핵심 개념

현대 운영체제는 내용물을 독립적으로 설치 가능한 패키지로 분할한다. 주요 패키지 관리 시스템은 배포판에 따라 다르다:

- **APT** (Debian/Ubuntu): `apt-get` 또는 `apt` 명령어 사용
- **YUM/DNF** (Red Hat/CentOS): `yum` 또는 `dnf` 명령어 사용
- **pkg** (FreeBSD): `pkg install` 명령어 사용

소프트웨어 설치 방식에는 세 가지가 있다: (1) 패키지 저장소에서 사전 컴파일된 바이너리 설치, (2) 소스 코드에서 `./configure && make && make install` 순서로 빌드, (3) 웹 스크립트를 통한 설치. 패키지 저장소 설치가 가장 권장되며, 추적, 업그레이드, 제거가 용이하다.

`which`, `whereis`, `locate` 명령어로 이미 설치된 소프트웨어를 확인할 수 있다. 추가 소프트웨어는 공격 표면을 늘리므로 필요한 것만 설치해야 한다.

## 예시

```bash
# Debian/Ubuntu: tcpdump 설치
sudo apt-get install tcpdump

# Red Hat/CentOS: tcpdump 설치
sudo yum install tcpdump

# FreeBSD: tcpdump 설치
sudo pkg install tcpdump

# 소스에서 빌드
git clone https://github.com/the-tcpdump-group/tcpdump.git
cd tcpdump && ./configure && make && sudo make install

# 설치된 패키지 확인 (Red Hat)
rpm -qa python
```

## 관련 개념

- [리눅스 배포판 (Linux Distribution)](/knowledge/linux/linux-distribution/)
- [매뉴얼 페이지 (Man Pages)](/knowledge/linux/man-pages/)
