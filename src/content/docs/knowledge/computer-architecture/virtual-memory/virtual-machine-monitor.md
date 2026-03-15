---
title: "가상 머신 모니터 (VMM)"
description: "가상 머신 모니터(VMM) 또는 하이퍼바이저는 가상 머신 기술의 핵심 소프트웨어로, 게스트 소프트웨어에 소프트웨어 인터페이스를 제공하고, 게스트 상태를 서로 격리하며, 게스트 소프트웨어로부터 자신을 보호하는 역할을 한다"
tags: ['Virtualization', 'Hypervisor', 'Vmm', 'Privileged Instruction', 'Trap']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/virtual-machine-monitor
sidebar:
  order: 15
---

## 핵심 개념

VMM은 프로세서의 거의 모든 것을 제어해야 한다: 특권 상태 접근, I/O, 예외, 인터럽트 등. VMM은 게스트 VM보다 높은 특권 수준에서 동작하며, 게스트 VM은 일반적으로 사용자 모드에서 실행된다. 이를 통해 특권 명령어의 실행이 VMM에 의해 처리되도록 보장한다.

VMM의 격리 부분은 약 10,000줄의 코드로 비교적 작으며, 전통적인 OS보다 훨씬 간결하다. 가상화 가능한(virtualizable) 아키텍처는 VM이 하드웨어에서 직접 실행될 수 있게 설계된 것으로, IBM 370이 대표적이다. 반면 x86과 대부분의 RISC 아키텍처는 원래 가상화를 고려하지 않고 설계되었기 때문에 추가적인 하드웨어 지원(Intel VT-x, AMD Pacifica)이 필요했다.

## 예시

```
# VMM의 기본 요구사항
1. 최소 두 가지 프로세서 모드: 시스템(커널) 모드, 사용자 모드
2. 사용자 모드에서 실행 시 트랩을 발생시키는 특권 명령어 집합

# x86의 가상화 문제점 예시
POPF 명령어:
- 시스템 모드: 모든 플래그 변경 (IE 플래그 포함)
- 사용자 모드: IE 플래그 제외하고 변경 (트랩 없이 조용히 실패)
# -> Guest OS가 IE 변경을 기대하지만 실제로는 변경되지 않음
# -> VMM이 이를 감지할 수 없는 문제 발생
```

## 관련 개념

- [가상 머신 (Virtual Machine)](/knowledge/computer-architecture/virtual-machine/)
- [관리자 모드 (Supervisor Mode)](/knowledge/computer-architecture/supervisor-mode/)
- [문맥 교환 (Context Switch)](/knowledge/computer-architecture/context-switch/)
- [도메인 특화 아키텍처 (DSA)](/knowledge/computer-architecture/domain-specific-architecture/)
