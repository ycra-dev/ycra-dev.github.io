---
title: "라이브 마이그레이션 (Live Migration)"
description: "라이브 마이그레이션(Live Migration)은 가상 머신을 서비스 중단이나 연결 손실 없이 서로 다른 물리 하드웨어에서 실행 중인 하이퍼바이저 간에 실시간으로 이동시키는 기술이다"
tags: ['Live Migration', 'Virtualization', 'High Availability', 'VM', 'Hypervisor']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/live-migration
sidebar:
  order: 5
---

## 핵심 개념

라이브 마이그레이션의 핵심은 소스 호스트와 대상 호스트 간의 **메모리 복제 과정**이다:

1. 하이퍼바이저가 소스에서 대상으로 메모리 페이지를 복사하기 시작
2. 복사 중 변경되는 메모리 페이지(dirty pages)를 추적
3. 변경된 페이지를 반복적으로 재전송
4. 두 호스트의 메모리가 동일해지는 순간 마이그레이션 완료

이 기술은 다음과 같은 시나리오에서 유용하다:
- **고가용성 로드 밸런싱**: 부하에 따라 VM을 동적으로 재배치
- **재해 복구**: 장애 발생 시 다른 물리 서버로 즉시 이전
- **서버 유지보수**: 물리 서버 점검 시 VM을 다른 호스트로 이동
- **시스템 유연성**: 하드웨어 업그레이드나 교체 시 서비스 연속성 유지

VMware는 가장 성숙한 라이브 마이그레이션 기술(vMotion)을 보유하고 있으며, Xen과 KVM도 이 기능을 지원한다.

## 예시

```bash
# KVM에서 라이브 마이그레이션 (virsh)
virsh migrate --live vm-name \
  qemu+ssh://target-host/system

# Xen에서 라이브 마이그레이션
xl migrate vm-name target-host
```

## 관련 개념

- [하이퍼바이저 (Hypervisor)](/knowledge/linux/hypervisor/)
- [가상 머신 (Virtual Machine)](/knowledge/linux/virtual-machine/)
- [KVM (커널 기반 가상 머신)](/knowledge/linux/kvm/)
