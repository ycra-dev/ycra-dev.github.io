---
title: "Linux 가상 메모리 관리"
description: "Linux의 vm_area_struct로 논리적 메모리 영역을 관리하고, Copy-on-Write와 Demand Paging으로 메모리 효율을 극대화하는 체계"
tags: ["OS", "Memory", "Linux"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/linux-virtual-memory
sidebar:
  order: 20
---

## 핵심 개념

Linux 가상 메모리 시스템은 **vm_area_struct(VMA)**로 논리적 메모리 영역을 관리하고, **Copy-on-Write**와 **Demand Paging**으로 메모리 효율을 극대화한다. 프로세스 생성(fork), 프로그램 실행(exec), 메모리 매핑(mmap) 등 다양한 상황에서 가상 메모리를 동적으로 관리한다.

## 동작 원리

### 두 가지 관점

| 관점 | 설명 | 자료구조 |
|------|------|----------|
| 논리적 관점 | 주소 공간의 영역 레이아웃 | vm_area_struct (VMA) |
| 물리적 관점 | 실제 메모리 매핑 상태 | 페이지 테이블 |

비유하면, VMA는 아파트 **도면**(어떤 방이 어디 있는지)이고, 페이지 테이블은 실제로 가구가 들어간 방(물리적 상태)이다.

### vm_area_struct (VMA)

```
프로세스 주소 공간
├── VMA 1: [0x400000 - 0x401000] 코드(rx) ← ELF text
├── VMA 2: [0x600000 - 0x601000] 데이터(rw) ← ELF data
├── VMA 3: [0x700000 - ...     ] 힙(rw)    ← brk/sbrk
├── VMA 4: [mmap 영역]         공유lib(rx)
└── VMA 5: [스택 영역]         스택(rw)
```

각 VMA는 다음을 포함한다:
- 시작/끝 주소
- 접근 권한 (read/write/execute)
- 백업 저장소 (파일 또는 none)
- 페이지 폴트 핸들러 함수 테이블

### 백업 저장소 (Backing Store)

| 유형 | 설명 |
|------|------|
| **파일 기반** | 파일의 특정 영역을 매핑 (mmap) |
| **익명 (Anonymous)** | 백업 없음, 페이지 폴트 시 0으로 채워진 페이지 제공 |

### Copy-on-Write (CoW) 구현

```
[fork() 직후]
부모 PTE ──→ 물리 페이지 (ref_count=2, read-only)
자식 PTE ──→   ↑

[자식이 쓰기 시도 시]
부모 PTE ──→ 원본 물리 페이지 (ref_count=1, writable)
자식 PTE ──→ 복사된 물리 페이지 (ref_count=1, writable)
```

비유하면, 형제가 같은 책을 공유하다가 한 명이 낙서하려 하면 그제서야 복사본을 만드는 것이다.

### 페이지 교체 정책

Linux는 변형된 Clock(Second-Chance) 알고리즘을 사용한다:
- 각 페이지에 **age** 값 유지 (최근 접근 빈도 반영)
- 자주 접근된 페이지는 높은 age → 페이지 아웃 대상에서 제외
- LFU(Least Frequently Used) 정책과 유사

### ELF 프로그램 메모리 레이아웃

```
┌─────────────────────────┐ 높은 주소
│   커널 가상 메모리       │ (사용자 접근 불가)
├─────────────────────────┤
│         스택            │ ← 아래로 성장
│           ↓             │
│                         │
│           ↑             │
│   메모리 매핑 영역       │ ← mmap, 공유 라이브러리
├─────────────────────────┤
│          brk            │ ← 힙의 끝
│           ↑             │
│          힙             │ ← 위로 성장
├─────────────────────────┤
│   초기화되지 않은 데이터  │ (BSS)
├─────────────────────────┤
│    초기화된 데이터       │ (Data)
├─────────────────────────┤
│      프로그램 텍스트     │ (Text, read-only)
├─────────────────────────┤
│       금지 영역          │
└─────────────────────────┘ 낮은 주소 (0x0)
```

## 예시

1. `fork()` 호출 → 부모의 VMA 복사, 페이지 테이블 공유 (read-only)
2. 자식이 데이터 수정 시도 → 페이지 폴트 → CoW 복사 수행
3. `exec()` 호출 → 새 VMA 생성, 기존 매핑 모두 해제

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/) - 가상 메모리의 일반 개념
- [Copy-on-Write (COW)](/knowledge/os/copy-on-write/) - CoW의 일반 개념
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/) - 필요할 때만 페이지 적재
- [페이지 교체 (Page Replacement)](/knowledge/os/page-replacement/) - 교체 알고리즘 기본 개념
- [Linux 물리 메모리 관리](/knowledge/os/linux-physical-memory/) - 물리 메모리 할당 체계
