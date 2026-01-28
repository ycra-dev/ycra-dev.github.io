---
title: "하이퍼바이저 유형 (Type 0/1/2 Hypervisor)"
description: "펌웨어 기반(Type 0), Bare-metal(Type 1), Hosted(Type 2) 하이퍼바이저의 분류와 특성"
tags: ["OS", "Virtualization"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/hypervisor-types
sidebar:
  order: 11
---

## 핵심 개념

하이퍼바이저 유형은 구현 위치와 방식에 따라 **펌웨어 기반(Type 0)**, **Bare-metal(Type 1)**, **Hosted(Type 2)**로 분류된다. 사용 목적에 따라 성능, 관리 편의성, 설치 용이성이 다르므로 적합한 유형이 다르다.

## 동작 원리

### Type 0 하이퍼바이저 (펌웨어)

하드웨어 **펌웨어**에 구현된 가상화. "파티션" 또는 "도메인"이라 불린다.

```
┌────────┬────────┬────────┬────────┐
│Guest 1 │Guest 2 │Guest 3 │Guest 4 │
│ CPUs   │ CPUs   │ CPUs   │ CPUs   │
│ Memory │ Memory │ Memory │ Memory │
└────┬───┴────┬───┴────┬───┴────┬───┘
     └────────┴────┬───┴────────┘
      Type 0 Hypervisor (Firmware)
                   │
            ┌──────┴──────┐
            │   Hardware  │
            └─────────────┘
```

- 부팅 시 펌웨어가 로드되어 게스트 이미지 실행
- **자원 전용 할당**: 각 파티션에 CPU, 메모리, I/O 전용 할당
- 예시: IBM LPAR, Oracle LDOM

### Type 1 하이퍼바이저 (Bare-metal)

하드웨어 위에 **직접** 설치되는 전용 가상화 소프트웨어.

```
┌──────────────────┬──────────────────┐
│    Guest OS 1    │    Guest OS 2    │
└────────┬─────────┴────────┬─────────┘
┌────────┴──────────────────┴─────────┐
│        Type 1 Hypervisor            │
│  - 자체 스케줄러, 메모리 관리        │
│  - 자체 디바이스 드라이버            │
└────────────────┬────────────────────┘
          ┌──────┴──────┐
          │  Hardware   │
          └─────────────┘
```

- 커널 모드에서 실행, 데이터센터의 "운영체제" 역할
- 라이브 마이그레이션, 스냅샷 등 강력한 관리 기능
- 예시: VMware ESX/ESXi, Citrix XenServer, KVM

### Type 2 하이퍼바이저 (Hosted)

**호스트 OS 위**에서 일반 애플리케이션으로 실행.

```
┌───────────────────────────────────────────┐
│         Guest OS (Linux)                  │
└────────────────┬──────────────────────────┘
┌────────────────┴──────────────────────────┐
│     Type 2 Hypervisor (VirtualBox)        │
└────────────────┬──────────────────────────┘
┌────────────────┴──────────────────────────┐
│        Host OS (Windows, macOS)           │
└────────────────┬──────────────────────────┘
          ┌──────┴──────┐
          │  Hardware   │
          └─────────────┘
```

- 일반 앱처럼 설치, 개발/테스트/학습용
- 예시: VMware Workstation/Fusion, VirtualBox, Parallels Desktop

### 유형별 비교

| 특성 | Type 0 | Type 1 | Type 2 |
|------|--------|--------|--------|
| 위치 | 펌웨어 | Bare-metal | 호스트 OS 위 |
| 성능 | 최고 | 높음 | 낮음 |
| 관리 복잡도 | 높음 | 중간 | 낮음 |
| 주 사용처 | 메인프레임 | 데이터센터 | 개발/테스트 |
| 설치 난이도 | 하드웨어 종속 | 전용 설치 | 앱 설치 |

## 예시

- **Type 0**: IBM 메인프레임에서 LPAR로 하나의 물리 서버를 여러 독립 파티션으로 분할
- **Type 1**: VMware ESXi로 데이터센터의 물리 서버에서 수십 개 VM 운영
- **Type 2**: 개발자가 macOS에서 VirtualBox로 Linux VM을 실행하여 테스트

## 관련 개념

- [가상화 (Virtualization)](/knowledge/os/virtualization/) - 가상화의 전체 개념
- [트랩 앤 에뮬레이트 (Trap-and-Emulate)](/knowledge/os/trap-and-emulate/) - VMM의 핵심 가상화 기법
- [준가상화 (Paravirtualization)](/knowledge/os/paravirtualization/) - 게스트 OS를 수정하는 효율적 가상화
- [컨테이너 (Container)](/knowledge/os/container/) - 전체 OS 가상화 vs OS 수준 격리
