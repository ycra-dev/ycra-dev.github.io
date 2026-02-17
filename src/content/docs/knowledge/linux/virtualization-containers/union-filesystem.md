---
title: "Union Filesystem"
description: "유니온 파일시스템(Union Filesystem)은 여러 파일시스템을 오버레이하여 하나의 일관된 계층 구조를 생성하는 기술로, Docker 컨테이너의 이미지 레이어링과 copy-on-write 전략의 기반이다"
tags: ['Union Filesystem', 'Overlay', 'Copy On Write', 'Docker', 'Container', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/union-filesystem
sidebar:
  order: 11
---

## 핵심 개념

유니온 파일시스템은 컨테이너 이미지의 핵심 기술이다. 컨테이너 이미지는 일반 Linux 배포판의 루트 파일시스템을 닮은 유니온 파일시스템으로 구성된다.

**작동 방식:**
1. 이미지는 여러 읽기 전용 레이어의 스택
2. 컨테이너 생성 시 읽기/쓰기 레이어를 상단에 추가
3. 프로세스가 파일 수정 시 변경 사항이 읽기/쓰기 레이어에 투명하게 저장 (**copy-on-write**)
4. 기본 레이어는 수정되지 않음

**이점:**
- 많은 컨테이너가 동일한 불변 기본 레이어를 공유하여 저장 효율 향상
- 컨테이너 시작 시간 단축
- 이미지 다운로드 시 이미 보유한 레이어는 재다운로드 불필요

**Docker 스토리지 드라이버 옵션:**
| 드라이버 | 설명 |
|----------|------|
| overlay2 | 현대 Linux 기본. 커널 내장 OverlayFS |
| aufs | 초기 Docker 기본. Ubuntu에서 널리 사용됨 |
| devicemapper | RHEL/CentOS에서 사용. thin provisioning |
| btrfs | Btrfs 파일시스템의 네이티브 COW 클론 활용 |
| zfs | ZFS의 네이티브 COW 클론 활용 |
| vfs | 유니온 파일시스템 미사용. 각 컨테이너가 이미지 완전 복사 |

스토리지 드라이버 선택은 성능과 안정성에 중요한 영향을 미치며, 배포판의 기본값을 사용하는 것이 권장된다.

## 예시

```bash
# Docker 스토리지 드라이버 확인
docker info | grep "Storage Driver"

# 이미지 레이어 확인 (각 레이어는 유니온 FS의 계층)
docker pull debian
# 출력: 각 레이어의 hex 해시가 표시됨

# 이미지 히스토리 (레이어별 명령 확인)
docker history nginx

# 스토리지 드라이버 변경 (systemd 서비스 수정)
# ExecStart=/usr/bin/dockerd --storage-driver=overlay2
```

## 관련 개념

- [Docker](/knowledge/linux/docker/)
- [Dockerfile](/knowledge/linux/dockerfile/)
- [Container](/knowledge/linux/container/)
- [Filesystem](/knowledge/linux/filesystem/)
