---
title: "Mach 메모리 객체 (Memory Object)"
description: "메모리의 소스를 추상화한 객체로, 사용자 수준 외부 메모리 관리자가 페이징을 수행하는 Mach의 메모리 관리 구조"
tags: ["OS", "Mach", "Memory"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/mach-memory-object
sidebar:
  order: 22
---

## 핵심 개념

Memory Object는 메모리의 소스를 추상화한 것으로, Task가 가상 주소 공간에 매핑하여 접근할 수 있다. 핵심은 **사용자 수준 외부 메모리 관리자(external memory manager)**가 페이징을 수행할 수 있다는 점이다.

비유하면, 도서관의 책과 같다. 책(데이터)은 서가(이차 저장소)에 있고, 열람실(메모리)에는 현재 읽는 페이지만 가져온다. 사서(외부 메모리 관리자)가 어떤 페이지를 가져올지 결정한다.

## 동작 원리

### 구조

```
┌───────────────────────┬─────────────────────────────┐
│        Task           │                             │
│  Virtual Address Space│                             │
│  ┌────────┬──────────┐│                             │
│  │Region A│Mapped Obj││                             │
│  └────────┴──────┬───┘│                             │
└──────────────────┼────┘                             │
                   │ Page Fault                       │
                   ▼                                  │
┌─────────────────────────────────────────────────────┘
│                    Kernel
│  ┌──────────────┐    IPC    ┌────────────────────┐
│  │ Memory Cache │◀─────────▶│ External Memory    │
│  │  (resident   │           │ Manager (user-level)│
│  │   pages)     │           └────────┬───────────┘
│  └──────────────┘                    ▼
│                             Secondary Storage
```

### 외부 메모리 관리자

커널이 아닌 **사용자 수준 태스크**가 페이징을 수행한다:

| 호출 방향 | 함수 | 설명 |
|----------|------|------|
| Kernel → Manager | `memory_object_data_request()` | 페이지 폴트 시 페이지 요청 |
| Kernel → Manager | `memory_object_data_write()` | 수정된 페이지 반환 |
| Manager → Kernel | `memory_object_data_provided()` | 요청된 페이지 제공 |

### Default Pager

외부 관리자가 없거나 실패할 경우 커널이 사용하는 기본 페이저이다. FIFO with second chance 알고리즘으로 교체 대상을 선정한다.

### Precious Pages

수정되지 않았지만 버릴 수 없는 페이지이다. 메모리 관리자가 더 이상 복사본을 유지하지 않을 때 선언하며, 커널이 메모리에서 제거 시 관리자에게 반환한다.

## 예시

파일을 memory-mapped I/O로 접근:
1. `vm_map()`으로 파일을 가상 주소 공간에 매핑
2. 스레드가 해당 주소 접근 → 페이지 폴트
3. 커널이 파일 서버(외부 메모리 관리자)에 `data_request()` 메시지
4. 파일 서버가 디스크에서 읽어 `data_provided()`로 응답
5. 커널이 페이지를 매핑하고 스레드 재개

## 관련 개념

- [Mach 운영체제](/knowledge/os/mach-overview/) - Mach 전체 구조
- [Mach 메시지와 IPC](/knowledge/os/mach-message-ipc/) - 커널-관리자 간 통신
- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/) - 가상 메모리의 일반 개념
- [페이지 교체 (Page Replacement)](/knowledge/os/page-replacement/) - 페이지 교체 알고리즘
