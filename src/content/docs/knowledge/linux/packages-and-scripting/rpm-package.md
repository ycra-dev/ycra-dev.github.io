---
title: "RPM Package"
description: "RPM(Red Hat Package Manager)은 사전 컴파일된 바이너리, 의존성 정보, 설치 스크립트를 포함하는 패키지 관리 형식으로, RHEL, CentOS, Fedora 등에서 소프트웨어를 설치하고 관리하는 기본 메커니즘이다"
tags: ['Rpm', 'Package Format', 'Redhat', 'Centos', 'Package Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/rpm-package
sidebar:
  order: 6
---

## 핵심 개념

rpm 명령은 -i(설치), -U(업그레이드), -e(제거), -q(쿼리) 등 여러 모드로 작동한다. 패키지 버전이 항상 소프트웨어 버전과 직접 대응하지는 않으며, 배포판 유지보수자의 백포트로 인해 차이가 있을 수 있다.

rpm의 주요 한계는 의존성 자동 해결을 하지 않는다는 점이다. OpenSSH 업그레이드 시 다른 패키지들의 의존성 오류가 발생할 수 있으며, --force로 강제 설치는 시스템 손상 위험이 있다. 이 때문에 yum/dnf 같은 고수준 도구 사용이 권장된다.

RPM은 설치 과정에서 스크립트를 실행하여 사용자/그룹 추가, 환경 커스터마이징 등을 자동화하며, 설정 파일을 인식하여 로컬 커스터마이징을 보존한다.

## 예시

```bash
# 설치된 모든 패키지 나열
rpm -qa

# 패키지 상세 정보 조회
rpm -qi openssh

# 패키지가 설치한 파일 목록
rpm -ql openssh

# 특정 파일이 어느 패키지에 속하는지 확인
rpm -qf /usr/bin/ssh

# 패키지 업그레이드
sudo rpm -Uvh openssh-*.rpm

# 패키지 검증
rpm -V openssh
```

## 관련 개념

- [Package Management](/knowledge/linux/package-management/)
- [Package Repository](/knowledge/linux/package-repository/)
- [Dependency Resolution](/knowledge/linux/dependency-resolution/)
- [Filesystem](/knowledge/linux/filesystem/)
