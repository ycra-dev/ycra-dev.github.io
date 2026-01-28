---
title: "하드웨어 가상화 지원 (VT-x/AMD-V)"
description: "CPU가 가상화를 위한 전용 모드와 명령어를 제공하여 효율적으로 게스트 OS를 실행하는 하드웨어 기능"
tags: ["OS", "Virtualization", "Hardware"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/hw-virtualization
sidebar:
  order: 4
---

## 핵심 개념

하드웨어 가상화 지원(VT-x/AMD-V)은 CPU가 **가상화 전용 모드와 명령어**를 제공하여, 게스트 OS를 효율적으로 실행할 수 있게 하는 하드웨어 기능이다.

초기 가상화는 Binary Translation(바이너리 변환)으로 구현했는데, 게스트 OS의 특권 명령어를 하나하나 변환해야 해서 복잡하고 오버헤드가 컸다. 하드웨어 가상화는 이 문제를 **CPU 차원에서 근본적으로 해결**한다.

## 동작 원리

### 듀얼 모드에서 멀티 모드로

기존의 **커널 모드 / 사용자 모드** 이분법을 확장하여 **Root 모드 / Non-root 모드**를 추가했다.

```
┌─────────────────────────────────────────────────┐
│              Non-root mode (Guest)              │
│  ┌───────────────┐  ┌───────────────┐           │
│  │  게스트 앱     │  │  게스트 앱     │           │
│  │  (User mode)  │  │  (User mode)  │           │
│  └───────┬───────┘  └───────┬───────┘           │
│          ▼                  ▼                    │
│  ┌─────────────────────────────────┐            │
│  │       게스트 OS (Kernel mode)    │            │
│  └──────────────┬──────────────────┘            │
│                 │ 특권 명령 실행 시               │
│                 ▼                                │
│            [VM Exit]                             │
├─────────────────┼───────────────────────────────┤
│                 ▼                                │
│  ┌─────────────────────────────────┐            │
│  │     VMM / 하이퍼바이저           │            │
│  │     (Root mode)                 │            │
│  └──────────────┬──────────────────┘            │
│                 │ 처리 완료 후                    │
│                 ▼                                │
│            [VM Entry]                            │
│              Root mode (Host)                    │
└─────────────────────────────────────────────────┘
```

- **Root mode (Host)**: VMM(Virtual Machine Monitor)이 실행되는 모드. 모든 하드웨어 자원에 완전한 접근 가능.
- **Non-root mode (Guest)**: 게스트 OS가 실행되는 모드. 게스트가 가상화된 자원에 접근하면 **자동으로** VMM으로 제어가 전달된다(VM Exit).

### Intel VT-x

| 구성 요소 | 설명 |
|-----------|------|
| **VMX root / non-root** | 두 가지 실행 모드로 호스트와 게스트 분리 |
| **VMCS (Virtual Machine Control Structure)** | 게스트 상태, 호스트 상태, VM Exit 조건 등을 저장하는 구조체 |
| **VM Entry** | Root → Non-root 전환. VMCS에서 게스트 상태 복원 |
| **VM Exit** | Non-root → Root 전환. 게스트 상태를 VMCS에 저장하고 VMM에 제어 전달 |
| **EPT (Extended Page Tables)** | 게스트 물리 주소 → 호스트 물리 주소 변환을 하드웨어로 처리 |

### AMD AMD-V

| 구성 요소 | 설명 |
|-----------|------|
| **Host / Guest mode** | Intel의 root / non-root에 대응 |
| **VMCB (Virtual Machine Control Block)** | Intel의 VMCS에 대응하는 구조체 |
| **RVI (Rapid Virtualization Indexing)** | Intel의 EPT에 대응하는 하드웨어 페이지 테이블 |

### EPT / RVI (하드웨어 중첩 페이지 테이블)

가상 머신에서는 주소 변환이 **두 단계**로 이루어진다.

```
Guest Virtual Address (GVA)
        │
        ▼  게스트 페이지 테이블
Guest Physical Address (GPA)
        │
        ▼  EPT / RVI (하드웨어가 자동 처리)
Host Physical Address (HPA)
```

EPT/RVI가 없으면 VMM이 **Shadow Page Table**을 소프트웨어로 관리해야 한다. EPT/RVI를 사용하면 CPU의 TLB가 양쪽 변환을 하드웨어로 처리하여 오버헤드가 크게 감소한다.

### DMA 가상화 (VT-d / IOMMU)

I/O 디바이스가 DMA로 메모리에 직접 접근할 때도 가상화가 필요하다.

```
1. Protection Domain 설정 → 디바이스별 접근 가능 메모리 영역 지정
2. I/O 디바이스 할당 → 특정 VM에 디바이스 전용 할당
3. DMA 주소 자동 변환 → IOMMU가 게스트 물리 주소를 호스트 물리 주소로 변환
```

이를 통해 디바이스를 VM에 직접 할당(passthrough)하여 **거의 네이티브 수준의 I/O 성능**을 달성할 수 있다.

### 인터럽트 가상화

**Interrupt Remapping**을 통해 VMM 개입 없이 인터럽트를 게스트에 직접 전달할 수 있다. 기존에는 모든 인터럽트가 VMM을 거쳐야 했지만, 하드웨어 지원으로 이 오버헤드를 제거한다.

### ARM (ARMv8) 가상화

ARM 아키텍처는 **Exception Level 2 (EL2)**를 하이퍼바이저 전용으로 제공한다.

```
EL0: 사용자 애플리케이션
EL1: 게스트 OS 커널
EL2: 하이퍼바이저 (전용)
EL3: Secure Monitor
```

게스트 OS가 하이퍼바이저의 서비스를 요청할 때 **HVC (Hypervisor Call)** 명령어를 사용한다.

### Thin Hypervisor

macOS의 **Hypervisor.framework**처럼, OS가 자체적으로 가상화 API를 제공하는 경량 하이퍼바이저 방식도 있다. 별도의 커널 모듈 설치 없이 하드웨어 가상화 기능을 활용할 수 있다.

## 예시

하드웨어 가상화 지원 확인:

```bash
# Linux에서 VT-x/AMD-V 지원 확인
grep -E 'vmx|svm' /proc/cpuinfo

# vmx = Intel VT-x
# svm = AMD AMD-V

# macOS에서 확인
sysctl kern.hv_support
# kern.hv_support: 1  (지원)
```

QEMU/KVM에서 하드웨어 가상화 활용:

```bash
# KVM(하드웨어 가상화) 사용
qemu-system-x86_64 -enable-kvm -m 4G -cpu host disk.img

# 하드웨어 가상화 없이 (소프트웨어 에뮬레이션, 매우 느림)
qemu-system-x86_64 -m 4G disk.img
```

VT-d(IOMMU)를 활용한 GPU 패스스루:

```bash
# IOMMU 활성화 (커널 파라미터)
intel_iommu=on

# GPU를 vfio-pci 드라이버에 바인딩
echo "10de 1b80" > /sys/bus/pci/drivers/vfio-pci/new_id

# VM에 GPU 직접 할당
qemu-system-x86_64 -enable-kvm \
  -device vfio-pci,host=01:00.0 \
  -m 8G disk.img
```

## 관련 개념

- [가상화 (Virtualization)](/knowledge/os/virtualization/)
- [보호 링 (Protection Ring)](/knowledge/os/protection-ring/)
