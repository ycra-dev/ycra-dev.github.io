---
title: "Boot Process"
description: "부팅(Booting)은 컴퓨터를 시작하는 과정으로, \"bootstrapping\"의 줄임말이다"
tags: ['Boot', 'Bootstrapping', 'Startup', 'Firmware', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/boot-process
sidebar:
  order: 5
---

## 핵심 개념

부트 프로세스는 네 가지 주요 단계로 구성된다:
1. **부트스트랩 코드 실행**: CPU가 ROM에 저장된 펌웨어(BIOS/UEFI) 실행
2. **OS 커널 로드**: 부트 로더가 커널을 찾아 메모리에 적재
3. **스타트업 스크립트 실행**: init/systemd가 시스템 서비스와 데몬 시작
4. **프로세스 관리**: 시스템 상태 전환과 프로세스 위생 유지

관리자는 대부분의 부트 단계를 직접 제어하지 않으며, 부트 로더 설정 변경이나 커널 인수 수정을 통해 간접적으로 구성한다. 부팅 전에 파일시스템 검사(`fsck`)와 마운트가 수행되어야 한다.

클라우드/가상화 환경으로의 이동으로 물리적 하드웨어 접근 대신 이미지 관리, API, 제어 패널을 통한 부트 관리가 일반화되었다.

## 예시

```bash
# 부팅 시 커널에 전달되는 옵션 예시 (GRUB에서)
GRUB_CMDLINE_LINUX="single"    # 싱글유저 모드로 부팅
GRUB_CMDLINE_LINUX="init=/bin/bash"  # bash 직접 실행

# 시스템 재부팅
sudo reboot

# 시스템 종료
sudo halt -p
```

## 관련 개념

- [UEFI](/knowledge/linux/uefi/)
- [GRUB](/knowledge/linux/grub/)
- [Systemd](/knowledge/linux/systemd/)
