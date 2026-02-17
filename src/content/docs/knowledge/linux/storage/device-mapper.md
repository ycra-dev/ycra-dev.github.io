---
title: "Device Mapper"
description: "Device Mapper는 Linux 커널의 저장소 추상화 프레임워크로, 하나의 블록 디바이스가 다른 블록 디바이스들의 집합 위에 구축되는 개념을 추상화하여 LVM2, 전체 디스크 암호화(LUKS), 컨테이너 파일시스템 계층 등의 기반이 된다"
tags: ['Device Mapper', 'Dm', 'Lvm2', 'Luks', 'Encryption', 'Linux Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/device-mapper
sidebar:
  order: 11
---

## 핵심 개념

**역할:** 디바이스 매핑 테이블을 유지하면서 각 블록을 적절한 물리적 위치로 라우팅한다. /dev/mapper 아래에 디바이스가 나타나며, dmsetup 명령으로 직접 매핑 테이블을 설정할 수도 있다.

**주요 활용:**
- **LVM2:** 논리 볼륨 관리의 핵심 구현 계층
- **LUKS(Linux Unified Key Setup):** 전체 디스크 암호화
- **컨테이너화:** Docker 등의 파일시스템 레이어 구현
- **dm-crypt:** 블록 디바이스 수준 암호화
- **dm-thin:** 씬 프로비저닝

대부분의 경우 Device Mapper는 Linux 저장소의 내부 구현이며 관리자가 직접 다룰 일은 드물다. 그러나 /dev/mapper 아래의 디바이스를 통해 그 존재를 인식할 수 있다.

## 예시

```bash
# Device Mapper 디바이스 확인
ls -la /dev/mapper/

# 매핑 테이블 조회
sudo dmsetup table

# 매핑 상태 확인
sudo dmsetup status

# LUKS 암호화 볼륨 생성
sudo cryptsetup luksFormat /dev/sdb1
sudo cryptsetup open /dev/sdb1 encrypted_vol
sudo mkfs.ext4 /dev/mapper/encrypted_vol

# LVM 디바이스도 /dev/mapper에 표시됨
ls /dev/mapper/DEMO-web1
```

## 관련 개념

- [Logical Volume Manager](/knowledge/linux/logical-volume-manager/)
- [Filesystem](/knowledge/linux/filesystem/)
- [Device File](/knowledge/linux/device-file/)
- [Linux Namespaces](/knowledge/linux/linux-namespaces/)
