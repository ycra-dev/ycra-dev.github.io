---
title: "메모리 압축 (Memory Compression)"
description: "수정된 페이지를 swap space에 기록하는 대신, 여러 페이지를 압축하여 단일 프레임에 저장하는 기법"
tags: ["OS", "Memory", "VirtualMemory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/memory-compression
sidebar:
  order: 6
---

## 핵심 개념

메모리 압축(Memory Compression)은 수정된 페이지를 swap space에 기록하는 대신, 여러 페이지를 압축하여 단일 프레임에 저장하는 기법입니다. 모바일 시스템은 플래시 메모리의 쓰기 수명 제한으로 swap space를 지원하지 않는 경우가 많아, 디스크 I/O 없이 메모리를 확보하는 대안이 필요합니다.

## 동작 원리

1. free frame list가 threshold 이하로 감소
2. LRU 등으로 victim 페이지 선택 → modified-frame list로 이동
3. 여러 페이지를 압축하여 **하나의 프레임**에 저장
4. 원래 프레임들을 free frame list로 반환
5. 압축된 페이지 참조 시 → 해제(decompress) 후 복원

```
[압축 전]
free-frame list: 7 → 2 → 9 → 21
modified-frame list: 15 → 3 → 35

[압축 후]
- 프레임 15, 3, 35를 압축 → 프레임 7에 저장
- 프레임 15, 3, 35가 free-frame list에 추가
compressed-frame list: 7 (contains 15, 3, 35)
```

### 압축 알고리즘

| 알고리즘 | 사용 OS | 특징 |
|----------|---------|------|
| **Xpress** | Windows 10 | 빠른 속도, 적당한 압축률 |
| **WKdm** | macOS, iOS | 30-50% 압축률, 빠름 |
| **zstd/lz4** | Linux (zswap) | 다양한 옵션 |

### 사용 OS

- **Android**: zram (압축된 RAM 블록 디바이스)
- **iOS**: anonymous memory 압축만, 스와핑 없음
- **macOS 10.9+**: LRU 페이지 먼저 압축, 부족하면 paging
- **Linux**: zswap (압축 후 스왑 write-back)

## 예시

안 입는 옷을 압축팩에 넣어 공간을 절약하는 것과 같습니다. 다시 입으려면 꺼내야 합니다.

```
접근 시간 (대략):
- RAM 직접 접근: ~100ns
- 압축 해제 후 접근: ~1μs
- SSD에서 paging: ~100μs
- HDD에서 paging: ~10ms
→ 메모리 압축이 SSD 대비 ~100배, HDD 대비 ~10,000배 빠름
```

- 장점: 디스크 I/O 없이 메모리 확보, SSD 수명 보호, paging보다 빠름
- 단점: 압축/해제에 CPU 사용, 압축률이 낮은 데이터는 효과 적음

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/)
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/)
- [메모리 단편화 (Memory Fragmentation)](/knowledge/os/fragmentation/)
