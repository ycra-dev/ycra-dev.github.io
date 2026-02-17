---
title: "Virtualization"
description: "가상화(Virtualization)는 기존 인터페이스를 확장하거나 대체하여 다른 시스템의 동작을 모방하는 기술이다"
tags: ['Virtualization', 'Virtual Machine', 'Process VM', 'Native Vmm', 'Hosted Vmm', 'Portability', 'Isolation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/virtualization
sidebar:
  order: 2
---

## 핵심 개념

**가상화의 중요성**:
1. **이식성(Portability)**: 가상화의 가장 중요한 이유. 하드웨어와 소프트웨어 간 추가 디커플링을 제공하여 완전한 환경을 다른 머신으로 이동 가능.
2. **레거시 지원**: 빠르게 변화하는 하드웨어/시스템 소프트웨어에 비해 상위 소프트웨어는 안정적. 레거시 인터페이스를 새 플랫폼에 포팅.
3. **격리(Isolation)**: 완전한 애플리케이션과 환경을 격리하여, 오류나 보안 공격으로 인한 장애가 다른 시스템에 영향을 주지 않음.
4. **클라우드 컴퓨팅**: IaaS에서 가상 머신은 핵심 역할. 고객 간 거의 완전한 격리를 제공.

**컴퓨터 시스템의 4가지 인터페이스**:
1. ISA (Instruction Set Architecture) - 특권 명령어 (OS만 실행)
2. ISA - 일반 명령어 (모든 프로그램 실행)
3. 시스템 콜 인터페이스
4. 라이브러리/API 인터페이스

**3가지 가상화 유형**:
- **프로세스 가상 머신(Process VM)**: 단일 프로세스에 대한 가상화. 런타임 시스템이 추상 명령어 집합을 제공. 예: Java 런타임 환경, Windows 에뮬레이터.
- **네이티브 VMM(Native Virtual Machine Monitor)**: 하드웨어 위에 직접 구현. 동시에 여러 게스트 OS 실행 가능. 완전한 ISA 제공.
- **호스티드 VMM(Hosted Virtual Machine Monitor)**: 호스트 OS 위에서 실행. 호스트 OS의 기존 디바이스 드라이버와 기능 활용. 현대 데이터 센터와 클라우드에서 널리 사용.

**Popek-Goldberg 정리**: 민감한 명령어(sensitive instructions)가 특권 명령어(privileged instructions)의 부분집합이면 효율적 VMM 구축 가능. Intel x86에는 특권이 아닌 17개의 민감한 명령어가 존재하여 추가 처리 필요.
- **전체 가상화(Full Virtualization)**: 게스트 OS 수정 없이 실행. VMWare가 바이너리 스캔으로 구현.
- **반가상화(Paravirtualization)**: 게스트 OS를 수정하여 비특권 민감 명령어의 부작용 처리. Xen이 대표적.

## 예시

```
# 가상화 유형 비교

(a) 프로세스 가상 머신
┌─────────────────┐
│   Application   │
├─────────────────┤
│  Runtime System │  ← 추상 명령어 해석 (예: JVM)
├─────────────────┤
│  Host OS        │
├─────────────────┤
│  Hardware       │
└─────────────────┘

(b) 네이티브 VMM
┌────────┐ ┌────────┐
│ App A  │ │ App B  │
├────────┤ ├────────┤
│Guest OS│ │Guest OS│
├────────┴─┴────────┤
│  Virtual Machine  │  ← 하드웨어 직접 접근
│     Monitor       │
├───────────────────┤
│    Hardware       │
└───────────────────┘

(c) 호스티드 VMM
┌────────┐ ┌────────┐
│ App A  │ │ App B  │
├────────┤ ├────────┤
│Guest OS│ │Guest OS│
├────────┴─┴────────┤
│       VMM         │  ← 호스트 OS 위에서 실행
├───────────────────┤
│    Host OS        │
├───────────────────┤
│    Hardware       │
└───────────────────┘

# 대부분의 일반(비특권) 명령어는 네이티브로 실행 → 높은 성능
```

## 관련 개념

- [Cloud Computing](/knowledge/distributed-systems/cloud-computing/)
- [Thread](/knowledge/distributed-systems/thread/)
- [Container](/knowledge/distributed-systems/container/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
