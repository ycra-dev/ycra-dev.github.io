---
title: "문맥 교환 (Context Switch)"
description: "컨텍스트 스위치(또는 프로세스 스위치)는 프로세서의 내부 상태를 변경하여 다른 프로세스가 프로세서를 사용할 수 있도록 하는 과정으로, 현재 실행 중인 프로세스로 돌아오기 위해 필요한 상태를 저장하는 것을 포함한다"
tags: ['Operating System', 'Process', 'Tlb', 'Page Table', 'Multitasking']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/context-switch
sidebar:
  order: 13
---

## 핵심 개념

운영체제가 실행 중인 프로세스를 P1에서 P2로 전환할 때, P2가 P1의 페이지 테이블에 접근하지 못하도록 보장해야 한다. TLB가 없는 경우 페이지 테이블 레지스터만 변경하면 되지만, TLB가 있는 경우 P1에 속하는 TLB 엔트리를 클리어해야 한다(P1의 데이터 보호 및 P2의 엔트리 로드 강제).

프로세스 전환 빈도가 높으면 TLB 클리어가 비효율적일 수 있다. 이를 해결하기 위해 프로세스 식별자(process identifier) 또는 ASID(Address Space ID)를 사용한다. ASID 필드가 TLB 태그에 연결되어, 페이지 번호와 프로세스 식별자가 모두 일치해야 TLB 히트가 발생한다. 이를 통해 프로세스 전환 시 TLB를 클리어할 필요가 없어진다.

프로세스의 상태(페이지 테이블, 프로그램 카운터, 레지스터)가 저장되면 해당 프로세스는 비활성 상태가 되며, 나중에 상태를 복원하여 실행을 계속할 수 있다.

## 예시

```
# 컨텍스트 스위치 과정
1. 현재 프로세스(P1)의 상태 저장:
   - 범용 레지스터, 부동소수점 레지스터
   - 프로그램 카운터 (PC)
   - 페이지 테이블 레지스터
   - EPC, Cause 레지스터
2. TLB 처리:
   - ASID 없는 경우: TLB 엔트리 전부 클리어 (비용 큼)
   - ASID 있는 경우: ASID 레지스터만 새 프로세스 ID로 변경
3. 새 프로세스(P2)의 상태 복원:
   - 페이지 테이블 레지스터 -> P2의 페이지 테이블
   - 레지스터, PC 복원
4. P2 실행 재개

# Intrinsity FastMATH: 8비트 ASID 필드 사용
TLB 엔트리: [ASID | VPN | PPN | Valid | Dirty | ...]
히트 조건: (VPN 일치) AND (ASID 일치)
```

## 관련 개념

- [페이지 테이블 (Page Table)](/knowledge/computer-architecture/page-table/)
- [TLB (변환 색인 버퍼)](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [관리자 모드 (Supervisor Mode)](/knowledge/computer-architecture/supervisor-mode/)
- [가상 머신 (Virtual Machine)](/knowledge/computer-architecture/virtual-machine/)
- [하드웨어 멀티스레딩 (Hardware Multithreading)](/knowledge/computer-architecture/hardware-multithreading/)
