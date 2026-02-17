---
title: "ZFS"
description: "ZFS는 파일시스템, 논리 볼륨 관리자, RAID 컨트롤러를 하나의 통합 시스템으로 결합한 차세대 저장소 솔루션으로, copy-on-write 방식과 체크섬 기반 데이터 무결성을 핵심으로 한다"
tags: ['Zfs', 'Copy On Write', 'Storage Pool', 'Raidz', 'Snapshot', 'Filesystem']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/zfs
sidebar:
  order: 8
---

## 핵심 개념

**아키텍처:** 스토리지 풀(pool) > 가상 디바이스(vdev) > 파일시스템/raw 볼륨 구조. vdev는 단일 디스크, 미러 그룹, 또는 RAID-Z 어레이가 될 수 있다. 모든 쓰기는 풀 내 vdev들에 스트라이핑된다.

**Copy-on-Write:** 데이터를 제자리에서 덮어쓰지 않고 빈 블록에 새로 기록. 부모 블록도 연쇄적으로 업데이트. 디스크 상의 파일시스템이 항상 일관된 상태를 유지하므로 fsck가 불필요하다.

**데이터 무결성:** 모든 디스크 블록에 체크섬을 저장하고 읽기 시 검증. 미러링/패리티 풀에서는 손상된 데이터를 자동으로 정상 복사본에서 복구한다. 약 75TB 읽기당 1건의 침묵 오류(silent corruption)가 발생할 수 있어 이 검증이 중요하다.

**RAID-Z:** RAID 5와 유사하지만 가변 폭 스트라이프를 사용하여 RAID 5 쓰기 홀 문제를 해결. raidz, raidz2(이중 패리티), raidz3(삼중 패리티) 구성 가능.

**스냅샷과 클론:** `zfs snapshot`으로 즉각적인 읽기 전용 스냅샷 생성. 파일시스템별로 임의 세분화 가능. `.zfs/snapshot` 디렉토리를 통해 사용자가 직접 과거 파일에 접근. 스냅샷을 `zfs clone`으로 쓰기 가능한 파일시스템으로 인스턴스화. `zfs promote`로 클론-원본 관계를 역전.

**파일시스템 계층:** ZFS 파일시스템은 계층적이며, 속성(quota, reservation, mountpoint 등)이 자식에게 상속된다. 파일시스템 생성에 시간과 공간이 거의 필요 없어 사용자별로 개별 파일시스템을 만드는 것이 권장된다.

**제한사항:** 기존 RAID 어레이에 디바이스 추가/제거 불가. CDDL 라이선스로 인해 Linux에서의 번들링이 제한적(Ubuntu 16.04부터 커널 모듈로 포함). 권장 최소 RAM 2GB.

## 예시

```bash
# 스토리지 풀 생성
sudo zpool create demo /dev/ada1

# RAID-Z 풀 생성 (3개 디스크, 단일 패리티)
sudo zpool create monster raidz /dev/sdb /dev/sdc /dev/sdd

# 풀에 미러 vdev 추가
sudo zpool add monster mirror /dev/sde /dev/sdf

# 풀 상태 확인
sudo zpool status monster

# 파일시스템 생성 및 속성 설정
sudo zfs create demo/new_fs
sudo zfs set quota=1G demo/new_fs
sudo zfs set reservation=1G demo/new_fs

# 스냅샷 생성 및 접근
sudo zfs snapshot demo/new_fs@backup1
ls /demo/new_fs/.zfs/snapshot/backup1/

# 스냅샷으로 롤백
sudo zfs rollback demo/new_fs@backup1

# 클론 생성
sudo zfs clone demo/new_fs@backup1 demo/subclone

# 캐시 SSD 추가
sudo zpool add monster cache /dev/sdg

# 속성 확인
sudo zfs get all demo/new_fs
```

## 관련 개념

- [Btrfs](/knowledge/linux/btrfs/)
- [RAID](/knowledge/linux/raid/)
- [Logical Volume Manager](/knowledge/linux/logical-volume-manager/)
- [Filesystem](/knowledge/linux/filesystem/)
- [Copy-on-Write](/knowledge/linux/copy-on-write/)
- [NFS](/knowledge/linux/nfs/)
