---
title: "KVM"
description: "KVM(Kernel-based Virtual Machine)은 Linux 커널에 통합된 전가상화 플랫폼으로, Intel VT/AMD-V CPU 확장을 활용하며 커널 자체가 하이퍼바이저 역할을 수행한다"
tags: ['Kvm', 'Virtualization', 'Linux', 'Kernel', 'Hypervisor', 'Qemu']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/kvm
sidebar:
  order: 3
---

## 핵심 개념

KVM의 독특한 점은 **Linux 커널 자체가 하이퍼바이저**로 동작한다는 것이다. 메모리 관리와 스케줄링은 호스트 커널이 처리하며, 게스트 머신은 일반 Linux 프로세스로 실행된다. 이로 인해:

- 멀티코어 프로세서의 복잡성을 커널이 처리하여 별도의 하이퍼바이저 변경 불필요
- `top`, `ps`, `kill` 등 표준 Linux 명령으로 VM을 조회하고 제어 가능
- Linux와의 통합이 원활(seamless)

KVM은 대부분의 Linux 배포판에서 기본 가상화 플랫폼이며, QEMU와 함께 완전 가상화된 하드웨어 시스템을 구현한다. Windows를 포함한 다양한 게스트 OS를 지원하며, Linux, FreeBSD, Windows용 반가상화 드라이버도 제공된다.

관리 도구:
- **virt-install**: 게스트 OS 설치를 위한 CLI 도구
- **virsh**: 일상적인 VM 관리를 위한 CLI 셸
- **virt-manager**: GUI 기반 VM 관리 도구

## 예시

```bash
# KVM 지원 확인
egrep -c '(vmx|svm)' /proc/cpuinfo

# KVM 게스트 설치
virt-install --name ubuntu-server \
  --hvm --connect qemu:///system \
  --ram 1024 --disk path=~/ubuntu.img,size=20 \
  --cdrom /dev/cdrom --accelerate

# virsh 관리 명령
virsh --connect qemu:///system
virsh list --all              # 모든 VM 목록
virsh start ubuntu-server     # VM 시작
virsh destroy ubuntu-server   # VM 강제 종료
virsh undefine ubuntu-server  # VM 정의 제거
```

## 관련 개념

- [Hypervisor](/knowledge/linux/hypervisor/)
- [Virtual Machine](/knowledge/linux/virtual-machine/)
- [QEMU](/knowledge/linux/qemu/)
- [Kernel Module](/knowledge/linux/kernel-module/)
