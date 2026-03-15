---
title: "Btrfs (B-트리 파일 시스템)"
description: "Btrfs(B-tree File System)는 Linux용 차세대 파일시스템으로, ZFS와 유사하게 copy-on-write, 체크섬, 볼륨 관리, RAID 기능을 통합하지만, 하드웨어 재구성의 유연성에서 ZFS를 능가한다"
tags: ['Btrfs', 'Copy On Write', 'Subvolume', 'Snapshot', 'Linux Filesystem']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/btrfs
sidebar:
  order: 9
---

## 핵심 개념

**ZFS와의 차이점:** Btrfs는 ZFS의 클론이 아니다. 디스크 추가/제거가 자유롭고, RAID 타입 변경도 온라인으로 가능하다(ZFS에서는 불가). 반면 ZFS의 SSD 캐싱, 인텐트 로그, 핫 스페어 기능이 없으며, 파일시스템 속성 상속이나 재귀적 명령을 지원하지 않는다. RAID 5/6 구현은 아직 프로덕션 수준이 아니다(2017년 기준).

**서브볼륨과 스냅샷:** 서브볼륨은 파일 트리의 독립적 단위로, 스냅샷과 쿼터의 대상이 된다. 일반 디렉토리처럼 보이지만 독립적으로 마운트 가능. Btrfs 스냅샷은 기본적으로 쓰기 가능하며, 사실상 "저장소를 공유하는 볼륨"이다. `-r` 옵션으로 읽기 전용 스냅샷도 가능.

**Shallow Copy:** `cp --reflink`를 통해 파일/디렉토리의 copy-on-write 복사를 수행. 서브볼륨 루트가 아닌 일반 파일에도 적용 가능하며 특별한 권한이 불필요하다. `--reflink=auto`로 가능할 때만 자동 적용.

**스토리지 재구성:** 디스크 추가 후 `btrfs balance`로 데이터를 재분배하거나, `btrfs balance start -dconvert=raid5`로 RAID 레벨을 변환할 수 있다. 디스크 제거 시에도 자동으로 데이터가 이동된다.

**블록 그룹 할당:** RAID 구성이 디스크 전체가 아닌 블록 그룹 단위로 적용되어, 미할당 공간에는 구조가 부과되지 않는다. 이 설계가 유연한 재구성을 가능하게 한다.

## 예시

```bash
# 2개 디스크로 RAID 1 Btrfs 생성
sudo mkfs.btrfs -L demo -d raid1 -m raid1 /dev/sdb /dev/sdc
sudo mount LABEL=demo /mnt/demo

# 서브볼륨 생성
sudo btrfs subvolume create /mnt/demo/data

# 서브볼륨 목록 확인
sudo btrfs subvolume list /mnt/demo

# 쓰기 가능한 스냅샷 생성
sudo btrfs subvolume snapshot /mnt/demo/data /mnt/demo/data-snap

# 읽기 전용 스냅샷
sudo btrfs subvolume snapshot -r /mnt/demo/data /mnt/demo/data-readonly

# 디스크 추가 및 밸런싱
sudo btrfs device add /dev/sdd /mnt/demo
sudo btrfs balance start /mnt/demo

# RAID 레벨 변환 (RAID 1 -> RAID 5)
sudo btrfs balance start -dconvert=raid5 -mconvert=raid5 /mnt/demo

# Shallow copy (reflink)
cp --reflink=auto largefile.dat largefile-copy.dat

# 사용량 확인
sudo btrfs filesystem usage /mnt/demo
```

## 관련 개념

- [ZFS (Z 파일 시스템)](/knowledge/linux/zfs/)
- [RAID (독립 디스크의 중복 배열)](/knowledge/linux/raid/)
- [논리 볼륨 관리자 (Logical Volume Manager)](/knowledge/linux/logical-volume-manager/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [기록 시 복사 (Copy-on-Write)](/knowledge/linux/copy-on-write/)
