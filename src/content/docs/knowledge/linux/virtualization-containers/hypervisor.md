---
title: "Hypervisor"
description: "하이퍼바이저(Hypervisor, 가상 머신 모니터)는 가상 머신(VM)과 물리 하드웨어 사이에서 중재하는 소프트웨어 계층으로, 게스트 운영체제 간에 시스템 자원을 공유하고 격리를 보장하는 역할을 한다"
tags: ['Hypervisor', 'Virtualization', 'Vmm', 'Type1', 'Type2', 'Kvm', 'Xen']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/hypervisor
sidebar:
  order: 1
---

## 핵심 개념

하이퍼바이저는 CPU, 메모리, I/O 자원을 동적으로 할당하여 여러 게스트 OS가 동시에 실행될 수 있게 한다. 게스트 OS들은 서로 격리되어 있으며, 하드웨어에 직접 접근하지 않고 하이퍼바이저를 통해서만 접근한다.

**가상화 모드의 진화:**
1. **전가상화(Full Virtualization)**: 모든 하드웨어를 완전히 에뮬레이션. 게스트 OS 수정 불필요하지만 성능 저하
2. **반가상화(Paravirtualization)**: Xen이 도입. 수정된 게스트 OS가 하이퍼바이저와 협력하여 성능 10배 이상 향상
3. **하드웨어 지원 가상화(Hardware-assisted)**: Intel VT/AMD-V CPU 확장. CPU와 메모리 컨트롤러를 하드웨어가 가상화
4. **현대적 가상화(PVH)**: CPU 가상화 확장 + 반가상화 드라이버 + 최소한의 커널 수정. 최적 성능

**Type 1 vs Type 2:**
- **Type 1 (베어메탈/네이티브)**: 하드웨어 위에서 직접 실행 (예: VMware ESXi, Xen)
- **Type 2 (호스트형)**: 범용 OS 위에서 사용자 공간 앱으로 실행 (예: VirtualBox, bhyve)
- KVM은 Linux 커널 모듈로서 이 구분이 모호한 사례

현대 시스템에서는 하드웨어 지원 가상화가 기본이며, QEMU가 가장 널리 사용되는 에뮬레이션 패키지이다.

## 예시

```bash
# KVM 게스트 설치 (virt-install)
virt-install --name ubuntu-guest \
  --hvm --connect qemu:///system \
  --ram 512 --disk path=~/ubuntu.img,size=12 \
  --cdrom /dev/cdrom --accelerate

# virsh로 VM 관리
virsh list                    # 실행 중인 VM 목록
virsh start ubuntu-guest      # VM 시작
virsh shutdown ubuntu-guest   # VM 종료
virsh console ubuntu-guest    # VM 콘솔 접속
```

```bash
# Xen 게스트 도메인 관리
xl list                       # 실행 중인 도메인 목록
xl console chef               # 도메인 콘솔 접속
xl shutdown chef              # 도메인 종료
```

## 관련 개념

- [Virtual Machine](/knowledge/linux/virtual-machine/)
- [KVM](/knowledge/linux/kvm/)
- [Live Migration](/knowledge/linux/live-migration/)
- [Container](/knowledge/linux/container/)
- [QEMU](/knowledge/linux/qemu/)
