---
title: "Device File"
description: "디바이스 파일은 /dev에 위치하며 하드웨어 장치나 가상 장치에 대한 인터페이스를 제공하는 특수 파일로, \"모든 것은 파일이다\"라는 UNIX 철학의 핵심 구현이다"
tags: ['Dev', 'Major Number', 'Minor Number', 'Block Device', 'Character Device', 'Mknod']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/device-file
sidebar:
  order: 9
---

## 핵심 개념

**블록 디바이스**(b): 고정 크기 블록 단위 I/O — 디스크, SSD, CD-ROM. **캐릭터 디바이스**(c): 바이트 단위 순차 I/O — 터미널, 시리얼 포트, 키보드.

**Pseudo-device(의사 장치)**: 실제 하드웨어 없이 디바이스 드라이버로 구현된 가상 장치. /dev/null(출력 버림), /dev/zero(null 바이트 생성), /dev/urandom(난수), PTY(pseudo-TTY — 네트워크 로그인용).

현대 시스템에서는 Linux의 udev, FreeBSD의 devfs가 장치 감지 시 자동으로 디바이스 파일을 생성/삭제한다. 드물게 수동 생성이 필요한 경우 mknod 명령을 사용한다.

## 예시

```bash
# major/minor 번호 확인
ls -l /dev/sda
# brw-rw---- 1 root disk 8, 0 ... /dev/sda

# 블록 디바이스 나열
ls -l /dev | grep "^b"

# 캐릭터 디바이스 나열
ls -l /dev | grep "^c"

# 수동 디바이스 파일 생성
sudo mknod /dev/mychar c 250 0
sudo mknod /dev/myblock b 252 0

# pseudo-device 사용
echo "discard" > /dev/null
dd if=/dev/zero of=empty.img bs=1M count=10
dd if=/dev/urandom bs=32 count=1 | base64

# 블록 디바이스 트리 구조
lsblk
```

**디스크 디바이스 파일(Ch.20):** 디스크는 /dev/sda, /dev/sdb 같은 파일로 표현되며, 파티션은 /dev/sda1처럼 번호가 추가된다. 디바이스명은 임시적(ephemeral)이어서 디스크 추가나 재부팅 시 변경될 수 있다. /dev/disk/by-uuid, /dev/disk/by-id 등 안정적 경로를 사용해야 하며, /etc/fstab에는 UUID나 LABEL을 사용하는 것이 안전하다. `lsblk`로 블록 디바이스를 나열하고, `lsblk -o +MODEL,SERIAL`로 상세 정보를 확인한다.

## 관련 개념

- [Device Driver](/knowledge/linux/device-driver/)
- [udev](/knowledge/linux/udev/)
- [Inode](/knowledge/linux/inode/)
- [Filesystem](/knowledge/linux/filesystem/)
- [Kernel Module](/knowledge/linux/kernel-module/)
- [Disk Partitioning](/knowledge/linux/disk-partitioning/)
- [RAID](/knowledge/linux/raid/)
