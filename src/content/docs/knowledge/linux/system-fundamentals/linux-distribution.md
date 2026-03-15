---
title: "리눅스 배포판 (Linux Distribution)"
description: "Linux 배포판은 Linux 커널과 사용자 명령어를 구성하는 패키지들의 조합으로, 설치 절차, 데스크톱 환경, 패키지 관리 시스템을 포함하는 완성된 운영 체제이다"
tags: ['Linux', 'Operating System', 'Distribution', 'Debian', 'Red Hat', 'Ubuntu']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/linux-distribution
sidebar:
  order: 2
---

## 핵심 개념

모든 배포판은 동일한 Linux 커널 계보를 공유하지만, 패키지의 형식, 종류, 수량이 크게 다르다. 주요 계보는 Debian 계열과 Red Hat 계열 두 가지로 나뉜다.

**Debian 계열**: Debian은 비상업적 프로젝트로 stable, unstable, testing 세 가지 릴리즈를 동시 유지한다. Ubuntu는 Debian 기반으로 Canonical이 운영하며, 짝수 해 4월 릴리즈는 5년 지원의 LTS 버전이다.

**Red Hat 계열**: RHEL은 엔터프라이즈 대상 유료 배포판이며, CentOS는 RHEL과 바이너리 호환되는 무료 대안이다. Fedora는 Red Hat이 후원하는 커뮤니티 배포판으로 최신 기술의 실험장이다.

**최소주의 배포판**: CoreOS는 컨테이너 중심, Alpine Linux는 경량 배포판으로 Docker 이미지 기반으로 인기가 있다.

배포판 선택 시 장기 생존 가능성, 보안 패치 대응력, 커뮤니티 활성도, 벤더 지원을 고려해야 한다.

## 예시

```bash
# Ubuntu 버전 확인
lsb_release -a

# CentOS/RHEL 버전 확인
cat /etc/redhat-release

# Debian 버전 확인
cat /etc/debian_version
```

## 관련 개념

- [패키지 관리 (Package Management)](/knowledge/linux/package-management/)
- [매뉴얼 페이지 (Man Pages)](/knowledge/linux/man-pages/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
