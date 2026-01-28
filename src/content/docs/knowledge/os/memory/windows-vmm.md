---
title: "Windows 가상 메모리 관리자 (Virtual Memory Manager)"
description: "Windows Executive의 가상 주소 공간 관리, 물리 메모리 할당, 페이징을 담당하는 컴포넌트로 예약-커밋 2단계 할당 모델을 사용"
tags: ["OS", "Windows", "Memory"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/windows-vmm
sidebar:
  order: 27
---

## 핵심 개념

Windows VM Manager는 Executive 구성 요소로, **프로세스별 가상 주소 공간 관리**, 물리 메모리 할당, 페이징을 담당한다. 핵심 특징은 **예약(Reserve)-커밋(Commit) 2단계 할당 모델**이다.

물리 메모리는 유한하지만 프로세스마다 독립적인 주소 공간이 필요하고, 프로세스 간 메모리 격리와 공유를 동시에 지원해야 한다.

## 동작 원리

### 주소 공간 크기

| 아키텍처 | 전체 | 유저 공간 | 커널 공간 |
|---------|------|----------|----------|
| 32비트 (IA-32, ARM) | 4GB | 2GB | 2GB |
| 64비트 (AMD64) | 256TB | 128TB | 128TB |

### 2단계 할당 모델

1. **예약(Reserve)**: 가상 주소 범위만 확보, 물리 메모리 미할당
2. **커밋(Commit)**: 실제 물리 메모리 또는 페이징 파일 공간 할당. 커밋 메모리에 쿼터를 적용하여 메모리 과다 사용을 방지한다.

```
┌────────────────────────────────────────────────────────┐
│                  Virtual Address Space                 │
├──────────┬──────────┬──────────┬──────────┬───────────┤
│  Free    │ Reserved │ Committed│ Committed│   Free    │
│          │ (미커밋) │ (물리)   │ (페이징) │           │
└──────────┴──────────┴──────────┴──────────┴───────────┘
                          │            │
                          ▼            ▼
              ┌───────────────┐  ┌─────────────┐
              │Physical Memory│  │ Paging File │
              │    (RAM)      │  │  (Disk)     │
              └───────────────┘  └─────────────┘
```

### 페이지 보호 속성

| 속성 | 설명 |
|------|------|
| Read-only | 읽기만 가능 |
| Read-write | 읽기/쓰기 가능 |
| Read-write-execute | 읽기/쓰기/실행 모두 가능 |
| Execute-only | 실행만 가능 (데이터 읽기 불가) |
| No-access | 접근 시 예외 발생 (가드 페이지, 스택 오버플로 감지) |
| Copy-on-write | 쓰기 시 복사본 생성 (공유 메모리 효율화) |

### 물리 페이지 상태 (7가지)

| 상태 | 설명 |
|------|------|
| Free | 내용 없음 |
| Zeroed | 0으로 초기화됨 (zero-on-demand용) |
| Modified | 수정됨, 디스크 쓰기 필요 |
| Standby | 디스크에 이미 기록됨 (재사용 대기) |
| Bad | 하드웨어 오류로 사용 불가 |
| Transition | 디스크→메모리 전송 중 |
| Valid | 프로세스 워킹셋에 포함, 활성 사용 중 |

### 다단계 페이지 테이블 (AMD64)

```
Virtual Address (48-bit used)
┌─────────┬─────────┬─────────┬─────────┬────────────┐
│ PML4 idx│ PDPT idx│  PD idx │  PT idx │Page Offset │
│  9 bits │  9 bits │  9 bits │  9 bits │  12 bits   │
└────┬────┴────┬────┴────┬────┴────┬────┴─────┬──────┘
     │         │         │         │          │
     ▼         ▼         ▼         ▼          │
   PML4 ──► PDPT ──► Page Dir ──► Page Table  │
   512      512       512         512         │
  entries  entries   entries     entries      │
                                   │          │
                                   └──────────┘
                                    ▼
                              Physical Page (4KB)
```

페이지 크기: 4KB (기본), 2MB, 1GB (하드웨어 지원 시)

## 예시

호텔 예약 시스템에 비유할 수 있다. Reserve는 "5월 10일 방을 잡아두세요"이고, Commit은 "실제로 방 배정해주세요"이다. 예약만 하면 방이 비어있어도 다른 손님에게 배정 안 되고, 커밋해야 실제 방(물리 메모리)이 할당된다.

1. 프로세스가 `VirtualAlloc(1GB, MEM_RESERVE)` 호출 → 1GB 가상 주소 예약
2. 필요할 때 `VirtualAlloc(MEM_COMMIT)` 호출 → 실제 페이지 할당
3. 접근 시 페이지 폴트 → VMM이 물리 페이지 매핑 또는 페이징 파일에서 로드

### 장단점

- **장점**: Reserve-Commit으로 가상 주소 낭비 없이 유연한 할당, 커밋 쿼터로 시스템 전체 메모리 관리, Copy-on-Write로 공유 메모리 효율화, 커널 주소 공간이 모든 프로세스에 매핑 → 시스템 콜 시 빠른 컨텍스트 전환
- **단점**: 다단계 페이지 테이블 워킹 오버헤드 (TLB 미스 시), 페이지 테이블 자체도 페이징 대상 → 이중 페이지 폴트 가능, 64비트에서도 실제 사용 가능 주소는 256TB로 제한 (하드웨어 한계)

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/) - 가상 메모리의 일반적 개념
- [페이징 (Paging)](/knowledge/os/paging/) - 메모리를 고정 크기 페이지로 관리하는 기법
- [Linux 가상 메모리 관리](/knowledge/os/linux-virtual-memory/) - Linux의 vm_area_struct 기반 관리와 대비
