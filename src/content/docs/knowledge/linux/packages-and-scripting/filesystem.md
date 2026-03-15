---
title: "파일 시스템 (Filesystem)"
description: "UNIX/Linux 파일시스템은 `/`(루트)에서 시작하는 단일 통합 계층 구조로, 파일, 프로세스, 디바이스, 커널 데이터 구조까지 다양한 객체를 표현하고 조직하는 시스템이다"
tags: ['Filesystem', 'Mount', 'Fstab', 'Vfs', 'Unix', 'Linux', 'Hierarchy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/filesystem
sidebar:
  order: 1
---

## 핵심 개념

파일시스템은 네 가지 주요 컴포넌트로 구성된다: (1) 네임스페이스 — 계층적 이름 체계, (2) API — 시스템 콜 인터페이스, (3) 보안 모델 — 접근 제어, (4) 구현 — 하드웨어 연결 소프트웨어.

**파일 유형 7가지:** 일반 파일, 디렉토리, 문자 디바이스 파일, 블록 디바이스 파일, 로컬 도메인 소켓, 명명된 파이프(FIFO), 심볼릭 링크.

**마운트:** `mount` 명령으로 파일시스템을 트리에 부착하고, `umount`으로 분리한다. `/etc/fstab`에 자동 마운트 설정을 정의한다. `fuser`로 파일시스템을 사용 중인 프로세스를 확인할 수 있다.

**주요 디렉토리:** `/etc`(설정 파일), `/bin`, `/sbin`(핵심 명령어), `/usr`(표준 프로그램), `/var`(가변 데이터, 로그), `/tmp`(임시 파일), `/dev`(디바이스 파일), `/proc`(의사 파일시스템), `/boot`(부트 로더, 커널).

주요 파일시스템 구현으로는 ext4, XFS, UFS, ZFS, Btrfs가 있으며, NFS, SMB 같은 네트워크 파일시스템도 지원된다.

**저장소 관점(Ch.20):** 파일시스템은 파티션, RAID 어레이, 논리 볼륨 위에 구축되며, 원시 블록 디바이스를 사용자 프로그램이 기대하는 표준 인터페이스(경로, 퍼미션 등)로 변환한다. 전통적 파일시스템(UFS, ext4, XFS)은 **저널링**을 통해 정전 시 구조적 손상을 방지한다. 저널링은 메타데이터 변경을 먼저 저널에 기록한 뒤 커밋 레코드를 작성하고, 실제 파일시스템을 수정하는 방식으로 작동한다. 차세대 파일시스템(ZFS, Btrfs)은 copy-on-write 방식으로 저널링 없이도 항상 일관된 상태를 유지한다.

**mkfs/newfs:** 파일시스템을 생성하는 명령어. `-L` 옵션으로 레이블을 지정하면 디바이스 이름 변경에도 식별이 가능하다. **fsck:** 파일시스템 일관성 검사 및 복구 도구. 저널링 이후 검사 시간이 초 단위로 단축되었다. `/etc/fstab`에 UUID 또는 LABEL로 파일시스템을 식별하면 디바이스명 변동에 안전하다.

## 예시

```bash
# 마운트된 파일시스템 확인
mount

# 파일시스템 마운트
sudo mount /dev/sda4 /users

# 파일시스템 사용량 확인
df -h

# 디렉토리 크기 확인
du -sh /var/log

# 파일 유형 확인
file /usr/bin/gzip

# ext4 파일시스템 생성 (레이블 지정)
sudo mkfs -t ext4 -L spare /dev/sdb1

# 파일시스템 UUID 확인
blkid /dev/sdb1

# 파일시스템 일관성 검사
sudo fsck -y /dev/sdb1

# fsck 자동 검사 주기 조절 (50회 마운트마다)
sudo tune2fs -c 50 /dev/sdb1
```

## 관련 개념

- [파일 권한 (File Permissions)](/knowledge/linux/file-permissions/)
- [접근 제어 목록 (Access Control List)](/knowledge/linux/access-control-list/)
- [Proc 파일 시스템 (Proc Filesystem)](/knowledge/linux/proc-filesystem/)
- [디스크 파티셔닝 (Disk Partitioning)](/knowledge/linux/disk-partitioning/)
- [RAID (독립 디스크의 중복 배열)](/knowledge/linux/raid/)
- [논리 볼륨 관리자 (Logical Volume Manager)](/knowledge/linux/logical-volume-manager/)
- [ZFS (Z 파일 시스템)](/knowledge/linux/zfs/)
- [Btrfs (B-트리 파일 시스템)](/knowledge/linux/btrfs/)
- [아이노드 (Inode)](/knowledge/linux/inode/)
