---
title: "PXE 부트 (PXE Boot)"
description: "PXE(Preboot eXecution Environment) 부트는 물리적 미디어 없이 네트워크 인터페이스를 통해 시스템을 부팅할 수 있게 하는 인텔 표준 프로토콜로, DHCP와 TFTP를 사용하여 완전 자동화된 OS 설치를 가능하게 한다"
tags: ['Pxe', 'Network Boot', 'Deployment', 'Automation', 'Provisioning', 'Dhcp', 'Tftp']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/pxe-boot
sidebar:
  order: 8
---

## 핵심 개념

PXE 부팅 프로세스: (1) 호스트가 PXE 플래그가 포함된 DHCP discover 브로드캐스트 → (2) DHCP 서버가 부트 서버와 부트 파일 정보를 응답 → (3) TFTP를 통해 부트 파일 다운로드 및 실행 → (4) 부트 메뉴에서 OS 이미지 선택 후 HTTP/FTP/NFS로 설치 파일 전송.

PXELINUX가 가장 널리 사용되는 PXE 부트 시스템으로, SYSLINUX 부트 로더 제품군의 일부이다. Linux뿐만 아니라 FreeBSD, Windows 등 다양한 OS 설치에 사용 가능하다. Red Hat의 Kickstart나 Debian의 Preseed와 결합하여 완전 무인 설치를 구현할 수 있다.

Cobbler 같은 통합 프로비저닝 서버는 DHCP, DNS, TFTP를 번들로 제공하여 PXE 설정을 크게 단순화한다.

## 예시

```bash
# PXELINUX 설치
sudo apt install pxelinux syslinux-common

# TFTP 서버 디렉토리 준비
sudo mkdir -p /var/lib/tftpboot/pxelinux.cfg
sudo cp /usr/lib/PXELINUX/pxelinux.0 /var/lib/tftpboot/

# DHCP 서버에 PXE 설정 추가
# /etc/dhcp/dhcpd.conf:
# next-server 192.168.1.10;  # TFTP 서버
# filename "pxelinux.0";     # 부트 파일

# Cobbler 설치 및 배포판 가져오기
sudo cobbler import --name=ubuntu-20.04 --path=/mnt/ubuntu-iso
```

## 관련 개념

- [부트 프로세스 (Boot Process)](/knowledge/linux/boot-process/)
- [GRUB (부트로더)](/knowledge/linux/grub/)
- [리눅스 배포판 (Linux Distribution)](/knowledge/linux/linux-distribution/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
