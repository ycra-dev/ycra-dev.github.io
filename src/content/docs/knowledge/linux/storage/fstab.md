---
title: "fstab (파일 시스템 테이블)"
description: "`/etc/fstab`은 시스템 부팅 시 자동으로 마운트할 파일시스템 목록과 마운트 옵션을 정의하는 설정 파일로, mount, umount, swapon, fsck 명령이 참조한다"
tags: ['Fstab', 'Mount', 'Filesystem', 'Uuid', 'Label', 'Boot']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/fstab
sidebar:
  order: 14
---

## 핵심 개념

**필드 구성:** 각 줄은 6개 필드로 구성된다: (1) 디바이스명/UUID/LABEL, (2) 마운트 포인트, (3) 파일시스템 타입, (4) 마운트 옵션, (5) dump 빈도(레거시), (6) fsck 순서(레거시).

**디바이스 식별 방법:** 디바이스명(/dev/sda1)은 변경될 수 있어 위험하다. 안전한 대안:
- `UUID=xxxx` - 파일시스템 고유 ID (blkid로 확인)
- `LABEL=label` - 관리자 지정 레이블 (e2label, xfs_admin으로 설정)
- `PARTUUID=`, `PARTLABEL=` - GPT 파티션의 UUID/레이블
- `/dev/disk/by-uuid/`, `/dev/disk/by-id/` - udev가 관리하는 안정적 경로

**마운트 순서:** fstab은 순차적으로 처리되므로, /var/log는 반드시 /var 뒤에 위치해야 한다.

**NFS 마운트:** `server:/export /mnt/share nfs rw,hard,intr,bg 0 0` 형식으로 원격 파일시스템도 등록 가능.

`mount -a` 명령으로 fstab의 모든 파일시스템을 즉시 마운트할 수 있으며, `noauto` 옵션으로 자동 마운트에서 제외할 수 있다.

## 예시

```bash
# Linux fstab 예시
UUID=a1b2c3d4  /         ext4  defaults           0  1
LABEL=spare    /spare    ext4  defaults           0  2
UUID=e5f6g7h8  none      swap  sw                 0  0

# NFS 마운트
monk:/home     /home     nfs4  rw,hard,intr,bg    0  0

# FreeBSD fstab 예시
/dev/gpt/spare /spare    ufs   rw                 2  2

# fstab 변경 후 즉시 적용
sudo mount -a

# 특정 타입만 마운트
sudo mount -a -t ext4
```

## 관련 개념

- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [디스크 파티셔닝 (Disk Partitioning)](/knowledge/linux/disk-partitioning/)
- [NFS (네트워크 파일 시스템)](/knowledge/linux/nfs/)
- [스왑 공간 (Swap Space)](/knowledge/linux/swap-space/)
- [디바이스 파일 (Device File)](/knowledge/linux/device-file/)
