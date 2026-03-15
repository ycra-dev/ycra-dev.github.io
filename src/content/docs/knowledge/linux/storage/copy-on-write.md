---
title: "기록 시 복사 (Copy-on-Write)"
description: "Copy-on-Write(COW)는 자원이 실제로 수정될 때만 복사본을 생성하는 최적화 전략으로, 컨테이너 이미지의 레이어 시스템과 가상 머신의 디스크 관리에서 핵심적으로 사용된다"
tags: ['Copy On Write', 'Cow', 'Filesystem', 'Container', 'Virtualization', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/copy-on-write
sidebar:
  order: 10
---

## 핵심 개념

COW의 기본 원리는 간단하다: 여러 소비자가 동일한 자원을 공유하되, 한 소비자가 수정을 시도할 때만 해당 소비자를 위한 별도의 복사본이 생성된다. 수정하지 않는 소비자들은 원본을 계속 공유한다.

**컨테이너에서의 COW:**
Docker는 읽기 전용 이미지 레이어 위에 컨테이너별 읽기/쓰기 레이어를 추가한다. 컨테이너가 파일을 수정하면 변경 사항이 읽기/쓰기 레이어에 투명하게 저장되며, 원본 이미지 레이어는 변경되지 않는다. 이를 통해:
- 많은 컨테이너가 같은 기본 이미지를 공유하여 저장 공간 절약
- 새 컨테이너 시작 시 이미지를 완전 복사할 필요 없어 빠른 시작

**가상화에서의 COW:**
Xen의 파일 기반 VBD(Virtual Block Device)는 sparse 파일로 필요에 따라 확장되며, Btrfs와 ZFS는 네이티브 COW 클론을 지원하여 Docker의 스토리지 드라이버로 효율적으로 동작한다.

## 예시

```bash
# Docker에서 COW 확인 - 동일 이미지의 여러 컨테이너
docker run -d --name web1 nginx
docker run -d --name web2 nginx
docker run -d --name web3 nginx
# 3개 컨테이너가 동일한 이미지 레이어를 공유
# 각 컨테이너의 쓰기만 별도 레이어에 저장

# 컨테이너별 변경 사항 확인
docker diff web1

# Btrfs COW 스냅샷
btrfs subvolume snapshot /mnt/data /mnt/data-snapshot
```

## 관련 개념

- [유니온 파일 시스템 (Union Filesystem)](/knowledge/linux/union-filesystem/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [컨테이너 (Container)](/knowledge/linux/container/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
