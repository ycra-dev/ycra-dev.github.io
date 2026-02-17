---
title: "Dependency Resolution"
description: "의존성 해결은 소프트웨어 패키지가 필요로 하는 라이브러리와 지원 인프라를 자동으로 식별하고 설치하는 패키지 관리 시스템의 메커니즘이다"
tags: ['Dependency Resolution', 'Package Management', 'Software Engineering', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dependency-resolution
sidebar:
  order: 5
---

## 핵심 개념

소프트웨어 애플리케이션은 다양한 라이브러리, 런타임 환경, 지원 유틸리티에 의존한다. rpm 같은 저수준 도구는 의존성 충돌을 보고만 하지만, APT와 yum 같은 고수준 패키지 관리 시스템은 의존성 트리를 구축하고 필요한 모든 패키지를 올바른 순서로 자동 설치한다.

**의존성 지옥(dependency hell)**: 패키지 간 버전 비호환성으로 특정 패키지를 업데이트할 수 없는 상태. 예를 들어 패키지 A가 라이브러리 X v1.0을, 패키지 B가 v2.0을 필요로 할 때 두 패키지를 동시에 설치할 수 없다.

의존성 메커니즘을 활용한 **메타 패키지**는 아무것도 설치하지 않지만 다른 패키지들을 의존성으로 지정하여, 단일 패키지 설치로 전체 소프트웨어 스택을 구축할 수 있게 한다.

## 예시

```bash
# RPM으로 의존성 확인
rpm -q --requires openssh

# 역의존성 확인
rpm -q --whatrequires openssh

# APT 의존성 트리 확인
apt-cache depends apache2

# 역의존성 확인
apt-cache rdepends libssl1.1

# 손상된 의존성 수정
sudo apt --fix-broken install
```

## 관련 개념

- [Package Management](/knowledge/linux/package-management/)
- [Package Repository](/knowledge/linux/package-repository/)
- [Linux Distribution](/knowledge/linux/linux-distribution/)
