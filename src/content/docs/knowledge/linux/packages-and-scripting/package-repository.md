---
title: "Package Repository"
description: "패키지 저장소는 소프트웨어 패키지들을 체계적으로 저장하고 배포하기 위한 네트워크 기반 저장 시스템으로, 패키지 관리 시스템이 소프트웨어를 검색, 다운로드, 업데이트할 수 있는 중앙화된 소스를 제공한다"
tags: ['Package Repository', 'Software Management', 'Linux', 'Distribution', 'Apt', 'Yum']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/package-repository
sidebar:
  order: 4
---

## 핵심 개념

저장소의 구조는 릴리스(배포판 버전의 스냅샷), 컴포넌트(소프트웨어 하위 집합), 아키텍처(하드웨어 클래스)로 조직화된다. Ubuntu의 경우 main(공식 지원), universe(커뮤니티 오픈소스), multiverse(비자유 라이선스) 등의 컴포넌트가 있다.

대규모 환경에서는 외부 저장소 대신 로컬 미러를 구축하는 것이 권장된다. apt-mirror 같은 도구를 사용하면 패키지를 로컬에 복제하여 내부 네트워크에서 빠르게 배포할 수 있다. 보안 업데이트만을 포함하는 최소 활동 컴포넌트를 통해 시스템 안정성을 유지하면서 중요한 보안 패치를 적시에 적용할 수 있다.

조직은 자체 저장소를 구축하여 내부 애플리케이션이나 커스터마이징된 패키지를 배포할 수 있으며, 이는 DevOps에서 재현 가능한 인프라 구축의 기반이 된다.

## 예시

```bash
# APT 저장소 설정 파일 확인
cat /etc/apt/sources.list

# Ubuntu sources.list 예제
deb http://archive.ubuntu.com/ubuntu/ focal main universe multiverse
deb http://security.ubuntu.com/ubuntu/ focal-security main universe multiverse

# 저장소 메타데이터 업데이트
sudo apt update

# YUM 저장소 목록 확인
yum repolist

# 로컬 APT 미러 생성
sudo apt install apt-mirror
sudo apt-mirror
```

## 관련 개념

- [Package Management](/knowledge/linux/package-management/)
- [Linux Distribution](/knowledge/linux/linux-distribution/)
- [DevOps](/knowledge/linux/devops/)
