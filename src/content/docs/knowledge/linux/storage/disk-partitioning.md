---
title: "디스크 파티셔닝 (Disk Partitioning)"
description: "디스크 파티셔닝은 물리적 저장 장치를 고정 크기의 독립적인 하위 섹션(파티션)으로 분할하는 것으로, 각 파티션은 자체 디바이스 파일을 가지며 독립적인 저장 장치처럼 동작한다"
tags: ['Partition', 'Gpt', 'Mbr', 'Fdisk', 'Parted', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/disk-partitioning
sidebar:
  order: 3
---

## 핵심 개념

**MBR(Master Boot Record) 파티션:** 1980년대 Microsoft 표준으로, 512바이트 블록 하나에 최대 4개의 기본(primary) 파티션만 정의 가능하며 2TB 초과 디스크를 지원하지 못한다. Extended 파티션으로 확장할 수 있지만 문제를 일으킬 수 있어 권장되지 않는다.

**GPT(GUID Partition Table):** Intel EFI/UEFI에서 도입된 현대적 파티셔닝 방식. 파티션 수 제한 없음, 16바이트 GUID로 파티션 타입 식별, MBR 호환성을 위한 보호 MBR 포함. GPT가 사실상의 표준이다.

**파티셔닝 vs LVM:** 파티셔닝은 단순하고 Windows/BIOS가 이해하지만, 크기 조정이 어렵고 스냅샷 등의 기능이 없다. LVM이 대부분의 면에서 우월하나, 부트 디스크는 파티션 테이블이 필요하다.

**일반 권장사항:** /tmp, /var(/var/log), /home을 별도 파티션/볼륨으로 분리하면 용량 초과나 손상 시 시스템 보호가 가능하다. 루트 파티션은 단일 사용자 모드까지 부팅에 필요한 모든 것을 포함해야 한다.

## 예시

```bash
# GPT 파티션 테이블 생성 및 파티션 추가 (fdisk)
sudo fdisk /dev/sdb
# g (GPT 생성) -> n (새 파티션) -> w (저장)

# parted로 GPT 레이블 생성
sudo parted /dev/sdb mklabel gpt

# 디스크 파티션 정보 확인
sudo parted -l

# gparted (GUI) 사용 가능

# FreeBSD에서 GPT 파티션 생성
sudo gpart create -s gpt ada1
sudo gpart add -t freebsd-ufs -l spare ada1
```

## 관련 개념

- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [논리 볼륨 관리자 (Logical Volume Manager)](/knowledge/linux/logical-volume-manager/)
- [RAID (독립 디스크의 중복 배열)](/knowledge/linux/raid/)
- [디바이스 파일 (Device File)](/knowledge/linux/device-file/)
- [UEFI (통합 확장 펌웨어 인터페이스)](/knowledge/linux/uefi/)
