---
title: "udev (장치 관리자)"
description: "udev는 Linux에서 디바이스 파일을 동적으로 관리하는 사용자 공간 데몬으로, 커널의 장치 이벤트를 수신하여 /dev에 디바이스 파일을 자동 생성/제거하며, 규칙(rules) 기반으로 영구적 이름 지정, 자동 마운트, 권한 설정을 지원한다"
tags: ['Udev', 'Linux', 'Device Management', 'Sysfs', 'Hotplug', 'Rules']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/udev
sidebar:
  order: 10
---

## 핵심 개념

과거 RHEL 3은 18,000개 이상의 정적 디바이스 파일을 포함했다. udev는 커널의 **sysfs**(/sys에 마운트된 가상 파일시스템)에서 장치 정보를 가져와 동적으로 필요한 디바이스 파일만 관리한다.

**규칙 시스템**: 기본 규칙은 /lib/udev/rules.d, 커스텀 규칙은 /etc/udev/rules.d에 위치. `nn-description.rules` 패턴으로 명명. 각 규칙은 매치 조건과 할당 조건으로 구성된다.

**udevadm** 도구: 장치 정보 조회, 이벤트 트리거, 규칙 재로드, 실시간 이벤트 모니터링 기능을 제공한다. USB 장치에 영구 이름을 설정하거나 장치 연결 시 자동 스크립트를 실행할 수 있다.

## 예시

```bash
# 디바이스 udev 속성 확인
udevadm info --attribute-walk --name=/dev/sdb

# 실시간 이벤트 모니터링
udevadm monitor

# 규칙 재로드
sudo udevadm control --reload-rules
sudo udevadm trigger

# 디스크 영구 이름 확인
ls -l /dev/disk/by-uuid/
ls -l /dev/disk/by-id/

# 커스텀 규칙 예시 (/etc/udev/rules.d/10-local.rules)
# USB 드라이브에 영구 심볼릭 링크 생성
# KERNEL=="sd?", ATTRS{model}=="USB2FlashStorage", SYMLINK+="my-usb%n"
```

## 관련 개념

- [디바이스 드라이버 (Device Driver)](/knowledge/linux/device-driver/)
- [디바이스 파일 (Device File)](/knowledge/linux/device-file/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [Systemd (시스템 관리 데몬)](/knowledge/linux/systemd/)
