---
title: "UEFI"
description: "UEFI(Unified Extensible Firmware Interface)는 레거시 BIOS를 대체하는 현대적 시스템 펌웨어 표준으로, GPT 파티셔닝, FAT 파일시스템 인식, 표준 API를 제공한다"
tags: ['Uefi', 'Firmware', 'Bios', 'Boot', 'Efi', 'Gpt']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/uefi
sidebar:
  order: 6
---

## 핵심 개념

UEFI는 레거시 BIOS의 한계를 극복한다. BIOS는 MBR(Master Boot Record)의 512바이트 제한으로 부트 로더가 매우 제한적이었지만, UEFI는 EFI System Partition(ESP)이라는 FAT 파일시스템 파티션에서 직접 부트 애플리케이션을 로드할 수 있다.

**UEFI의 주요 특징:**
- **GPT 파티셔닝**: GUID Partition Table로 MBR의 한계 극복
- **ESP**: EFI System Partition에서 부트 로더를 파일로 직접 읽음
- **표준 API**: 하드웨어 접근을 위한 공식 인터페이스 제공
- **런타임 변수 수정**: `efibootmgr`로 부팅 중인 시스템에서 UEFI 설정 변경 가능

기본 부트 경로는 `/efi/boot/bootx64.efi`이며, 구성된 시스템에서는 `/efi/ubuntu/grubx64.efi` 같은 배포판별 경로를 사용한다. UEFI 변수가 `/sys`를 통해 읽기/쓰기 마운트되므로, `rm -rf /`가 펌웨어 수준에서 시스템을 영구 파괴할 수 있다는 주의점이 있다.

## 예시

```bash
# UEFI 부트 설정 확인
efibootmgr -v

# 부트 순서 변경
efibootmgr -o 0004,0002

# ESP 파티션 확인 (FreeBSD)
gpart show
```

## 관련 개념

- [Boot Process](/knowledge/linux/boot-process/)
- [GRUB](/knowledge/linux/grub/)
