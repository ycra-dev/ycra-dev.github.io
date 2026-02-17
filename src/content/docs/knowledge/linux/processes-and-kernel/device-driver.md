---
title: "Device Driver"
description: "디바이스 드라이버는 하드웨어 장치와 시스템의 상호작용을 관리하는 추상화 계층으로, 하드웨어 명령과 커널의 표준화된 인터페이스 사이를 번역한다"
tags: ['Kernel', 'Hardware', 'Driver', 'Device', 'Abstraction', 'Major Minor']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/device-driver
sidebar:
  order: 8
---

## 핵심 개념

드라이버는 커널의 일부이며 주로 `/dev` 디렉토리의 디바이스 파일을 통해 접근한다. 커널은 디바이스 파일에 대한 작업을 드라이버 코드 호출로 매핑한다.

디바이스 파일은 **major 번호**(드라이버/장치 타입 식별)와 **minor 번호**(특정 인스턴스 식별)를 가진다. **블록 디바이스**는 고정 크기 블록 단위로 I/O(디스크, SSD), **캐릭터 디바이스**는 바이트 단위로 I/O(터미널, 시리얼 포트).

드라이버는 시스템/커널 버전에 특화되어 있으며, 다른 OS용 드라이버는 호환되지 않는다. 새 하드웨어 구매 시 Linux 지원 여부를 확인해야 한다.

## 예시

```bash
# 디바이스 major/minor 번호 확인
ls -l /dev/sda
# brw-rw---- 1 root disk 8, 0 ... /dev/sda

# PCI 장치와 드라이버 확인
lspci -k

# USB 장치 확인
lsusb

# 커널이 감지한 하드웨어
dmesg | grep -i "ethernet\|usb"

# 디바이스의 드라이버 확인
readlink /sys/class/net/eth0/device/driver

# 디바이스 상세 정보
udevadm info --query=all --name=/dev/sda
```

## 관련 개념

- [Kernel Module](/knowledge/linux/kernel-module/)
- [Device File](/knowledge/linux/device-file/)
- [udev](/knowledge/linux/udev/)
- [Proc Filesystem](/knowledge/linux/proc-filesystem/)
