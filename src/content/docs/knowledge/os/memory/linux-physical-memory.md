---
title: "Linux 물리 메모리 관리"
description: "Linux의 Zone 기반 메모리 분류와 Buddy System, Slab Allocator를 통합한 물리 메모리 관리 체계"
tags: ["OS", "Memory", "Linux"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/linux-physical-memory
sidebar:
  order: 21
---

## 핵심 개념

Linux는 물리 메모리를 **Zone**으로 분류하고, **Buddy System**으로 페이지를 할당하며, **Slab Allocator**로 커널 객체를 효율적으로 관리한다. 하드웨어마다 DMA 제약, 주소 공간 한계 등 메모리 접근 제약이 다르기 때문에 이를 체계적으로 관리한다.

## 동작 원리

### 1. 메모리 Zone

하드웨어 제약에 따라 물리 메모리를 영역으로 구분한다.

| Zone | 설명 | x86-32 예시 |
|------|------|-------------|
| **ZONE_DMA** | ISA 장치의 DMA용 | < 16 MB |
| **ZONE_DMA32** | 32비트 DMA용 | < 4 GB |
| **ZONE_NORMAL** | 일반 커널 매핑 영역 | 16 ~ 896 MB |
| **ZONE_HIGHMEM** | 커널 주소공간에 직접 매핑 안 됨 | > 896 MB |

64비트 시스템(x86-64)에서는 `ZONE_HIGHMEM`이 불필요하다.

### 2. Buddy System (페이지 할당)

연속된 물리 페이지를 2의 거듭제곱 크기로 할당하는 알고리즘이다.

```
[할당 과정]
16KB 요청 → 16KB 블록 없음 → 32KB 블록 분할
32KB → 16KB + 16KB (buddy pair)
      └→ 하나를 할당, 하나는 free list에

[해제 과정]
16KB 반환 → buddy도 free인지 확인
         → 둘 다 free면 32KB로 병합 (재귀적)
```

```
┌──────────────────────────────────────┐
│              32 KB                   │
├─────────────────┬────────────────────┤
│     16 KB       │      16 KB         │
├────────┬────────┼─────────┬──────────┤
│  8 KB  │  8 KB  │   8 KB  │   8 KB   │
├───┬────┼───┬────┼────┬────┼────┬─────┤
│4KB│4KB │4KB│4KB │ 4KB│4KB │ 4KB│ 4KB │
└───┴────┴───┴────┴────┴────┴────┴─────┘
```

비유하면, 큰 종이를 접어서 필요한 크기로 자르고, 버릴 때 다시 붙이는 것이다.

### 3. Slab Allocator (커널 객체 캐싱)

커널 자료구조별 전용 캐시를 관리한다.

```
커널 객체 ──→ Cache ──→ Slab ──→ 물리 연속 페이지
                │
    ┌───────────┼───────────┐
    ↓           ↓           ↓
task_struct  file 객체   inode 객체
   캐시        캐시        캐시
```

**Slab의 3가지 상태:**
- **Full**: 모든 객체 사용 중
- **Partial**: 일부 객체 사용 중
- **Empty**: 모든 객체 free

**할당 순서:** Partial → Empty → 새 Slab 할당

비유하면, 같은 크기의 쿠키틀로 반죽을 찍어내는 것이다 (task_struct 틀, inode 틀 등).

### 커널 메모리 할당 API

```c
page = alloc_pages(GFP_KERNEL, order);  // 2^order 페이지 할당 (Buddy)
ptr = kmalloc(size, GFP_KERNEL);        // 임의 크기 할당
obj = kmem_cache_alloc(cache, flags);   // Slab에서 객체 할당
```

## 예시

새 프로세스 생성 시:
1. `task_struct` 캐시(Slab)에서 빈 객체를 가져옴
2. 초기화 후 사용
3. 프로세스 종료 시 객체를 캐시에 반환 (재사용 가능)

## 관련 개념

- [버디 시스템 (Buddy System)](/knowledge/os/buddy-system/) - Buddy 할당의 일반 개념
- [슬랩 할당 (Slab Allocation)](/knowledge/os/slab-allocation/) - Slab 할당의 일반 개념
- [Linux 가상 메모리 관리](/knowledge/os/linux-virtual-memory/) - 가상 메모리 관리 체계
- [메모리 단편화 (Fragmentation)](/knowledge/os/fragmentation/) - Buddy가 해결하는 문제
