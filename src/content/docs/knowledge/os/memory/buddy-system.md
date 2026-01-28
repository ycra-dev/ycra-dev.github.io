---
title: "버디 시스템 (Buddy System)"
description: "메모리를 2의 거듭제곱 크기로 분할하여 할당하고, 인접한 버디끼리 빠르게 합치는 커널 메모리 할당 기법"
tags: ["OS", "Memory", "Kernel"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/buddy-system
sidebar:
  order: 10
---

## 핵심 개념

버디 시스템(Buddy System)은 메모리를 2의 거듭제곱 크기로 분할하여 할당하고, 인접한 버디끼리 빠르게 합칠 수 있는 커널 메모리 할당 기법입니다. 커널은 다양한 크기의 메모리를 빈번하게 할당/해제하며, 물리적으로 연속된 메모리가 필요한 경우(DMA 등)에 사용됩니다.

## 동작 원리

### 할당 과정

1. 큰 메모리 세그먼트를 절반씩 분할하여 **버디 쌍** 생성
2. 요청 크기에 맞는 가장 작은 2^n 블록 할당
3. 해제 시 버디와 병합 가능하면 합쳐서 더 큰 블록 생성 (coalescing)

```
256KB 세그먼트에서 21KB 요청 (→ 32KB 필요):

         256 KB
        /      \
    128 KB    128 KB (AR - free)
    /    \
  64 KB  64 KB (BR - free)
  /   \
32 KB 32 KB (CR - free)
 ↓
CL 할당 (21KB 사용, 11KB 내부 단편화)
```

### 병합 (Coalescing)

```
CL 해제 시:
1. CL의 버디 CR → 둘 다 free → 병합하여 64KB
2. BL의 버디 BR → 둘 다 free → 병합하여 128KB
3. AL의 버디 AR → 둘 다 free → 병합하여 256KB (원래 블록 복원)
```

### 내부 단편화

| 요청 크기 | 할당 크기 | 낭비율 |
|-----------|-----------|--------|
| 21 KB | 32 KB | 34% |
| 33 KB | 64 KB | 48% |
| 65 KB | 128 KB | 49% |

최악의 경우 약 50%의 메모리가 낭비됩니다.

### Linux에서의 사용

- Linux 커널의 기본 물리 페이지 할당자
- 페이지 단위(4KB)부터 시작
- 큰 연속 메모리 블록 할당에 사용
- 작은 객체는 슬랩 할당(Slab Allocation)으로 처리

## 예시

피자 분할과 같습니다. 전체를 반으로, 다시 반으로 나눠서 적절한 크기 조각을 제공합니다.

- 장점: 빠른 병합, 외부 단편화 감소, 구현 단순, 연속 메모리 할당 가능
- 단점: 최대 50% 내부 단편화, 2의 거듭제곱 제약, 작은 객체에 비효율적

## 관련 개념

- [슬랩 할당 (Slab Allocation)](/knowledge/os/slab-allocation/) — 버디 시스템의 단점 보완
- [메모리 단편화 (Memory Fragmentation)](/knowledge/os/fragmentation/)
- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/)
