---
title: "APT System"
description: "APT(Advanced Package Tool)는 Debian과 Ubuntu에서 사용되는 패키지 관리 시스템으로, dpkg를 기반으로 자동화된 의존성 해결, 저장소 관리, 시스템 업그레이드 기능을 제공한다"
tags: ['Apt', 'Debian', 'Ubuntu', 'Dpkg', 'Package Management', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/apt-system
sidebar:
  order: 7
---

## 핵심 개념

APT의 핵심은 /etc/apt/sources.list 설정 파일로, 패키지 타입(deb/deb-src), URL, 릴리스 이름, 컴포넌트 목록을 명시한다. 원래 apt-get, apt-cache 같은 저수준 명령 모음이었으나, 통합 apt 명령이 추가되어 사용성이 향상되었다.

**더미 패키지(메타 패키지)**: 자체적으로 아무것도 설치하지 않지만 다른 패키지들을 필수 조건으로 선언하여, 복잡한 소프트웨어 스택을 블록으로 설치/업그레이드할 수 있게 한다.

cron을 사용한 정기적 apt 실행으로 자동 업데이트를 구성할 수 있지만, 자체 APT 서버와 릴리스 제어 시스템을 통해 검증된 패키지만 배포하는 것이 권장된다. 커널 업데이트는 재부팅 전까지 효과가 없으므로 자동화 전략 수립 시 고려해야 한다.

## 예시

```bash
# 패키지 목록 업데이트
sudo apt update

# 패키지 설치
sudo apt install nginx

# 패키지 완전 제거 (설정 포함)
sudo apt purge nginx

# 설치된 패키지 업그레이드
sudo apt upgrade

# 의존성 정보 확인
apt-cache depends nginx

# 특정 버전 설치
sudo apt install nginx=1.18.0-0ubuntu1

# 패키지 홀드 (업그레이드 방지)
sudo apt-mark hold nginx
```

## 관련 개념

- [Package Management](/knowledge/linux/package-management/)
- [Package Repository](/knowledge/linux/package-repository/)
- [Dependency Resolution](/knowledge/linux/dependency-resolution/)
- [Cron](/knowledge/linux/cron/)
- [Linux Distribution](/knowledge/linux/linux-distribution/)
