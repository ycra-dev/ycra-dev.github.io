---
title: "가상 머신 (Virtual Machine)"
description: "가상 머신(VM)은 하나의 물리적 컴퓨터 위에 여러 개의 독립적인 운영 체제 환경을 실행할 수 있도록 하드웨어 자원을 가상화하는 기술이다"
tags: ['Virtualization', 'Hypervisor', 'Vmm', 'Cloud Computing', 'Isolation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/virtual-machine
sidebar:
  order: 14
---

## 핵심 개념

가상 머신은 1960년대 중반에 처음 개발되었으며, 현대 클라우드 컴퓨팅의 핵심 기술이다. 각 VM은 사용자에게 독립적인 컴퓨터 전체를 사용하는 것과 같은 환상을 제공한다. VM을 지원하는 소프트웨어를 가상 머신 모니터(VMM) 또는 하이퍼바이저라고 하며, 물리적 자원을 여러 게스트 VM에 매핑하는 역할을 한다.

VM의 주요 장점은 세 가지이다: (1) 보안 및 격리 강화 - 여러 사용자가 같은 서버를 공유하면서도 서로를 보호할 수 있다. (2) 소프트웨어 관리 용이성 - 레거시 OS를 포함한 다양한 소프트웨어 스택을 실행할 수 있다. (3) 하드웨어 관리 효율성 - 서버 통합을 통해 물리적 서버 수를 줄일 수 있다.

VMM이 제대로 동작하려면 최소 두 가지 프로세서 모드(시스템 모드와 사용자 모드)와, 사용자 모드에서 실행 시 트랩을 발생시키는 특권 명령어 집합이 필요하다. 가상화 오버헤드는 워크로드에 따라 달라지며, 사용자 수준의 CPU 집약적 프로그램은 오버헤드가 거의 없다.

## 예시

AWS EC2는 가상 머신을 활용한 대표적인 클라우드 서비스이다:

```
# VM의 핵심 동작 원리
1. Guest OS가 특권 명령어 실행 시도
2. 사용자 모드에서 실행 중이므로 트랩 발생
3. VMM이 트랩을 가로채어 가상 자원에 대한 적절한 변경 수행
4. Guest OS에게 제어 반환

# 타이머 인터럽트 처리 예시
VMM은 현재 실행 중인 Guest VM을 중단 ->
상태 저장 -> 인터럽트 처리 ->
다음 실행할 Guest VM 결정 ->
해당 VM 상태 로드
```

## 관련 개념

- [가상 머신 모니터 (VMM)](/knowledge/computer-architecture/virtual-machine-monitor/)
- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [관리자 모드 (Supervisor Mode)](/knowledge/computer-architecture/supervisor-mode/)
- [문맥 교환 (Context Switch)](/knowledge/computer-architecture/context-switch/)
