---
title: "Automount"
description: "Automount(자동 마운트)는 파일시스템이 참조될 때 자동으로 마운트하고, 일정 시간 미사용 시 자동으로 언마운트하는 데몬 기반 시스템으로, 대규모 네트워크에서 /etc/fstab의 유지보수 부담과 서버 장애 영향을 줄인다"
tags: ['Autofs', 'Automount', 'Automountd', 'Nfs Mount', 'Indirect Map', 'Direct Map']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/automount
sidebar:
  order: 22
---

## 핵심 개념

**구성 요소:**
- **autofs:** 커널 상주 파일시스템 드라이버. 마운트 요청을 감지하고 호출 프로그램을 일시 정지시킨 뒤 automountd를 호출.
- **automountd:** 설정을 읽고 실제 마운트/언마운트를 수행하는 데몬.
- **automount:** 관리 유틸리티.

**맵 유형:**
- **간접 맵(Indirect Map):** 공통 디렉토리 아래에 여러 파일시스템을 자동 마운트. 마스터 맵에서 루트 경로를 지정.
- **직접 맵(Direct Map):** 공통 접두사가 없는 독립적 마운트 포인트. 각각 별도의 autofs 마운트로 구현. ls에서 바로 보이는 장점.
- **마스터 맵(Master Map):** 직접/간접 맵 목록과 기본 옵션을 정의. `/etc/auto.master`(Linux) 또는 `/etc/auto_master`(FreeBSD).

**레플리카 지원:** 읽기 전용 파일시스템에 대해 여러 서버를 레플리카로 지정 가능. 네트워크 경로, 프로토콜 버전, 응답 시간에 따라 최적 서버를 자동 선택. 우선순위 설정 가능.

**가시성 문제:** 자동 마운트된 디렉토리는 부모 디렉토리의 ls에 표시되지 않는다. 심볼릭 링크로 구성된 섀도 디렉토리를 만들어 해결할 수 있다.

**타임아웃:** 기본 300초(5분) 미사용 후 자동 언마운트. NFS 서버 장애 시 불필요한 마운트가 행(hang)을 유발하므로 적절한 정리가 중요하다.

## 예시

```bash
# 마스터 맵 (/etc/auto.master)
/harp    /etc/auto.harp
/-       /etc/auto.direct

# 간접 맵 (/etc/auto.harp)
users   -rw,hard,intr   harp:/harp/users
devel   -soft            harp:/harp/devel
info    -ro              harp:/harp/info

# 직접 맵 (/etc/auto.direct)
/usr/src   -ro,soft   harp,monk(1):/usr/src
/cs/tools  -ro,intr   harp:/cs/tools monk:/cs/tools

# 설정 변경 적용
sudo automount             # FreeBSD
sudo systemctl reload autofs  # Linux

# 레플리카가 있는 직접 맵
/usr/man  -ro  harp:/usr/man monk(1):/usr/man
```

## 관련 개념

- [NFS](/knowledge/linux/nfs/)
- [fstab](/knowledge/linux/fstab/)
- [Filesystem](/knowledge/linux/filesystem/)
