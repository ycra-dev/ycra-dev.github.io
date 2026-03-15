---
title: "커널 모듈 (Kernel Module)"
description: "커널 모듈(Loadable Kernel Module, LKM)은 시스템 재부팅 없이 실행 중인 커널에 동적으로 로드하거나 제거할 수 있는 코드 조각으로, 주로 디바이스 드라이버나 파일시스템 기능을 추가하는 데 사용된다"
tags: ['Kernel', 'Driver', 'Linux', 'Lkm', 'Modprobe', 'Insmod']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/kernel-module
sidebar:
  order: 7
---

## 핵심 개념

모든 드라이버를 커널에 정적 포함하면 크기가 지나치게 커지므로, 커널 모듈로 필요한 드라이버만 로드하여 효율성을 유지한다. 모듈은 `/lib/modules/$(uname -r)` 디렉토리에 저장된다.

**modprobe**는 모듈 의존성을 자동 해결하는 고수준 명령어로, /etc/modprobe.conf을 참조한다. **insmod**는 의존성을 처리하지 않는 저수준 명령어. 모듈에 파라미터를 전달하여 다양한 설정으로 사용할 수 있다.

주의: 모듈 로드/언로드 시 커널 패닉 위험이 있으므로 테스트되지 않은 모듈을 프로덕션에서 시험하지 않아야 한다.

## 예시

```bash
# 로드된 모듈 목록
lsmod

# 모듈 정보 확인
modinfo snd-usb-audio

# 모듈 로드 (의존성 자동 해결)
sudo modprobe snd-usb-audio

# 파라미터 전달
sudo modprobe snd-usb-audio index=0

# 모듈 제거
sudo modprobe -r snd-usb-audio

# 부팅 시 자동 로드 설정
echo "snd-usb-audio" | sudo tee /etc/modules-load.d/usb-audio.conf

# 영구적 파라미터 설정
echo "options snd-usb-audio index=0" | sudo tee /etc/modprobe.d/usb-audio.conf
```

## 관련 개념

- [디바이스 드라이버 (Device Driver)](/knowledge/linux/device-driver/)
- [디바이스 파일 (Device File)](/knowledge/linux/device-file/)
- [부트 프로세스 (Boot Process)](/knowledge/linux/boot-process/)
- [Systemd (시스템 관리 데몬)](/knowledge/linux/systemd/)
