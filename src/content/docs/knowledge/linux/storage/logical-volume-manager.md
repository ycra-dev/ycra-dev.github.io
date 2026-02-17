---
title: "Logical Volume Manager"
description: "LVM(Logical Volume Manager)은 물리적 저장 장치를 볼륨 그룹(Volume Group)으로 묶고, 이를 논리 볼륨(Logical Volume)으로 유연하게 분할하는 추상화 계층으로, 디스크 파티셔닝의 한계를 극복한다"
tags: ['Lvm', 'Lvm2', 'Volume Group', 'Logical Volume', 'Physical Volume', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/logical-volume-manager
sidebar:
  order: 12
---

## 핵심 개념

**3단계 구조:**
1. **물리 볼륨(PV):** 디스크, 파티션, RAID 어레이에 LVM 레이블을 적용한 것. `pvcreate`로 생성.
2. **볼륨 그룹(VG):** 여러 PV를 묶은 스토리지 풀. `vgcreate`로 생성. PE(Physical Extent) 단위로 공간 관리.
3. **논리 볼륨(LV):** VG에서 할당된 가상 파티션. `lvcreate`로 생성. 파일시스템을 담는 블록 디바이스.

**핵심 기능:**
- 논리 볼륨의 동적 크기 조절(확대/축소)
- 물리 디바이스 간 볼륨 이동
- Copy-on-write 스냅샷
- 온라인 드라이브 교체
- 미러링 및 스트라이핑

**스냅샷의 한계:** LVM2 스냅샷은 고정 크기로 할당되므로, 원본 볼륨 수정이 많아지면 스냅샷 공간이 부족해져 스냅샷이 무효화(corrupted)된다. 따라서 LVM 스냅샷은 단기 사용(백업 등)이나 원본과 같은 크기로 할당해야 한다. ZFS/Btrfs의 스냅샷이 이 문제에서 자유롭다.

**파일시스템 크기 조절 순서:** 확대 시 볼륨 먼저 -> 파일시스템 확대, 축소 시 파일시스템 먼저 -> 볼륨 축소.

## 예시

```bash
# 물리 볼륨 생성
sudo pvcreate /dev/sdb1

# 볼륨 그룹 생성
sudo vgcreate DEMO /dev/sdb1

# 볼륨 그룹 정보 확인
sudo vgdisplay DEMO

# 100GB 논리 볼륨 생성
sudo lvcreate -L 100G -n web1 DEMO

# 파일시스템 생성 및 마운트
sudo mkfs -t ext4 /dev/DEMO/web1
sudo mount /dev/DEMO/web1 /mnt/web1

# 스냅샷 생성
sudo lvcreate -L 100G -s -n web1-snap /dev/DEMO/web1

# 논리 볼륨 크기 확장
sudo lvresize -L +100G /dev/DEMO/web1
sudo resize2fs /dev/DEMO/web1

# XFS 파일시스템 확장 (마운트 상태에서)
sudo xfs_growfs /mnt/web1
```

## 관련 개념

- [RAID](/knowledge/linux/raid/)
- [Disk Partitioning](/knowledge/linux/disk-partitioning/)
- [Filesystem](/knowledge/linux/filesystem/)
- [ZFS](/knowledge/linux/zfs/)
- [Btrfs](/knowledge/linux/btrfs/)
- [Device File](/knowledge/linux/device-file/)
