---
title: "스왑 공간 (Swap Space)"
description: "스왑 공간은 물리 메모리(RAM)가 부족할 때 프로세스의 메모리 페이지를 디스크에 저장하는 가상 메모리 영역으로, 파일시스템 대신 커널이 직접 관리하는 전용 파티션이나 논리 볼륨으로 구성된다"
tags: ['Swap', 'Virtual Memory', 'Paging', 'Mkswap', 'Swapon']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/swap-space
sidebar:
  order: 13
---

## 핵심 개념

**구성 방식:** 일반적으로 전용 파티션/논리 볼륨을 사용하지만, 파일시스템 내 스왑 파일도 가능하다. ZFS에서는 `zfs create -V size`로 raw 볼륨을 생성하여 스왑으로 사용한다.

**권장 크기:** 물리 서버에서는 RAM의 절반 이상(최소 2GB). 하이버네이션 사용 시 RAM 전체 크기를 추가로 확보. 여러 물리 디스크에 스왑을 분산하면 성능 향상이 가능하지만, 가장 좋은 방법은 충분한 RAM을 확보하여 스왑을 사용하지 않는 것이다.

**클라우드/가상화:** 소규모 인스턴스는 RAM이 적어 스왑 없이 부팅조차 어려울 수 있다. 정상 상태에서 스왑을 사용하지 않는 한 설정해 두는 것이 좋다. Amazon EC2의 인스턴스 스토어가 있다면 스왑용으로 활용 가능.

**fstab 등록:** `mkswap`으로 초기화 후 `/etc/fstab`에 타입 `swap`으로 등록하면 부팅 시 자동 활성화된다. UUID로 식별 가능하다.

## 예시

```bash
# 스왑 영역 초기화
sudo mkswap /dev/sdb2

# 스왑 수동 활성화
sudo swapon /dev/sdb2

# 스왑 상태 확인
swapon -s   # Linux
swapctl -l  # FreeBSD

# /etc/fstab에 스왑 등록
# UUID=xxxx-xxxx  none  swap  sw  0  0

# 스왑 파일 생성 (긴급 시)
sudo dd if=/dev/zero of=/swapfile bs=1G count=4
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## 관련 개념

- [논리 볼륨 관리자 (Logical Volume Manager)](/knowledge/linux/logical-volume-manager/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [디스크 파티셔닝 (Disk Partitioning)](/knowledge/linux/disk-partitioning/)
- [ZFS (Z 파일 시스템)](/knowledge/linux/zfs/)
