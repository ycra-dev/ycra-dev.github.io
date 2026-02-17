---
title: "Disk Formatting"
description: "디스크 포맷팅은 저장 매체에 주소 정보와 타이밍 마크를 기록하여 섹터를 구획하는 하드웨어 수준의 작업(로우레벨 포맷)과, 파티션 테이블 작성 및 파일시스템 설치(하이레벨 초기화)를 포함하는 광의의 용어이다"
tags: ['Formatting', 'Mkfs', 'Newfs', 'Secure Erase', 'Bad Blocks', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/disk-formatting
sidebar:
  order: 4
---

## 핵심 개념

**로우레벨 포맷:** 모든 하드디스크는 공장 출하 시 포맷되어 있으며, 현장에서의 재포맷은 불필요하다. 배드 블록 관리는 드라이브 펌웨어가 자동으로 처리하며, 예비 저장 영역의 양호한 블록으로 대체한다. SATA 디스크는 공장 외부 포맷이 설계되지 않았으며, SAS 디스크는 `sg_format`(Linux)이나 `camcontrol`(FreeBSD)로 포맷 가능.

**ATA Secure Erase:** 2000년부터 SATA 디스크에 구현된 보안 삭제 명령. NIST 인증 방식으로, 미국 국방부 기밀 이하 수준에서 승인. `rm`으로 삭제한 파일은 소프트웨어 도구로 복구 가능하므로 디스크 폐기 시 반드시 수행해야 한다. SSD에서는 완전 초기화 효과로 성능 복구에도 도움.

**Advanced Format:** 전통적 512바이트 섹터에서 4KiB 블록으로 업계 전환. 512n(구형), 512e(4K 내부/512 에뮬레이션), 4Kn(4K 네이티브) 세 유형. 512e에서 파일시스템 클러스터와 하드웨어 블록의 정렬이 중요하며, 현대 파티셔닝 도구는 자동으로 정렬을 보장.

## 예시

```bash
# 파일시스템 생성 (mkfs)
sudo mkfs -t ext4 -L spare /dev/sdb1
sudo mkfs.xfs /dev/sdc1

# FreeBSD 파일시스템 생성
sudo newfs -L spare /dev/gpt/spare

# ATA Secure Erase (Linux)
sudo hdparm --user-master u --security-set-pass p /dev/sda
sudo hdparm --user-master u --security-erase p /dev/sda

# ATA Secure Erase (FreeBSD)
sudo camcontrol security ada0 -U user -s mypass
sudo camcontrol security ada0 -U user -e mypass

# 섹터 크기 확인
sudo fdisk -l /dev/sda | grep "Sector size"
```

## 관련 개념

- [Filesystem](/knowledge/linux/filesystem/)
- [Disk Partitioning](/knowledge/linux/disk-partitioning/)
- [Solid State Drive](/knowledge/linux/solid-state-drive/)
- [Device File](/knowledge/linux/device-file/)
