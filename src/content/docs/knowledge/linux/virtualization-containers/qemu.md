---
title: "QEMU (큐이뮤)"
description: "QEMU(Quick Emulator)는 오픈소스 하드웨어 에뮬레이션 패키지로, 하이퍼바이저가 가상 머신에 가상화된 하드웨어(디스크, 네트워크, 인터럽트 컨트롤러, BIOS 등)를 제공하기 위해 사용하는 가장 일반적인 에뮬레이터이다"
tags: ['Qemu', 'Emulation', 'Virtualization', 'Hardware Emulation', 'Kvm']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/qemu
sidebar:
  order: 4
---

## 핵심 개념

대부분의 하이퍼바이저는 여러 환경 유지(가상화)와 각 환경 내 하드웨어 시뮬레이션(에뮬레이션)을 분리하며, QEMU가 에뮬레이션 역할을 담당한다.

QEMU는 KVM과 함께 사용될 때 가장 효과적이다. KVM이 CPU 가상화 확장을 활용하여 CPU와 메모리 가상화를 처리하고, QEMU가 나머지 하드웨어(디스크 드라이브, 네트워크 장치, 디스플레이 카드 등)를 에뮬레이션한다.

현대적 가상화(PVH)에서는 반가상화 드라이버와 CPU 확장이 대부분의 하드웨어 접근을 처리하므로, QEMU의 역할이 상당히 줄어들었다. 그러나 여전히 PC 아키텍처의 레거시 하드웨어(인터럽트 컨트롤러, BIOS 리소스 등) 에뮬레이션에 필요하다.

## 예시

```bash
# QEMU 직접 사용 (단독 에뮬레이션)
qemu-system-x86_64 -hda disk.img -m 512

# KVM과 함께 사용 (하드웨어 가속)
qemu-system-x86_64 -enable-kvm -hda disk.img -m 1024

# virt-install이 내부적으로 QEMU/KVM 사용
virt-install --connect qemu:///system \
  --name myvm --ram 1024 --disk path=vm.img,size=10
```

## 관련 개념

- [KVM (커널 기반 가상 머신)](/knowledge/linux/kvm/)
- [하이퍼바이저 (Hypervisor)](/knowledge/linux/hypervisor/)
- [가상 머신 (Virtual Machine)](/knowledge/linux/virtual-machine/)
- [디바이스 드라이버 (Device Driver)](/knowledge/linux/device-driver/)
