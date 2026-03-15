---
title: "GRUB (부트로더)"
description: "GRUB(GRand Unified Boot Loader)은 GNU 프로젝트가 개발한 Linux의 기본 부트 로더로, 커널을 식별하고 로드하며 부팅 시 사용자 인터페이스를 제공한다"
tags: ['Grub', 'Boot Loader', 'Linux', 'Boot', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/grub
sidebar:
  order: 7
---

## 핵심 개념

현재 표준인 GRUB 2는 대부분의 Linux 배포판에서 기본 부트 로더로 사용된다. GRUB은 일반적인 파일시스템을 이해할 수 있어, 설정을 일반 텍스트 파일(`grub.cfg`)에서 읽는다.

**설정 파일 위치:**
- `/boot/grub/grub.cfg` (Ubuntu/Debian)
- `/boot/grub2/grub.cfg` (Red Hat/CentOS)

`grub.cfg`는 직접 편집하지 않고 `grub-mkconfig`(또는 `update-grub`)로 생성한다. 설정 소스는 `/etc/default/grub`에 쉘 변수 형태로 저장되며, 커스텀 커널은 `/etc/grub.d/40_custom`에 정의한다.

GRUB은 부팅 시 커맨드라인 인터페이스도 제공하며(`c` 키), 커널 옵션을 임시로 수정하거나 다른 OS를 부팅할 수 있다. 새 커널은 기존 커널과 나란히 설치되어, 문제 발생 시 이전 커널로 롤백이 가능하다.

## 예시

```bash
# GRUB 설정 업데이트 (Debian/Ubuntu)
sudo update-grub

# GRUB 설정 업데이트 (Red Hat/CentOS)
sudo grub2-mkconfig -o /boot/grub2/grub.cfg

# /etc/default/grub 주요 옵션
GRUB_TIMEOUT=5                    # 부트 메뉴 대기 시간
GRUB_CMDLINE_LINUX="quiet splash"  # 커널 파라미터
GRUB_DEFAULT=0                     # 기본 부트 항목
```

## 관련 개념

- [부트 프로세스 (Boot Process)](/knowledge/linux/boot-process/)
- [UEFI (통합 확장 펌웨어 인터페이스)](/knowledge/linux/uefi/)
- [Systemd (시스템 관리 데몬)](/knowledge/linux/systemd/)
