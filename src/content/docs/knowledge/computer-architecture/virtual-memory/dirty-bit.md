---
title: "더티 비트 (Dirty Bit)"
description: "더티 비트는 페이지가 메모리에 읽힌 이후 쓰기가 발생했는지를 추적하는 비트이다"
tags: ['Virtual Memory', 'Cache', 'Write Back', 'Page Table', 'Memory Hierarchy']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dirty-bit
sidebar:
  order: 6
---

## 핵심 개념

가상 메모리 시스템은 write-back 방식을 사용하므로, 개별 쓰기는 메모리 내의 페이지에 수행되고, 페이지가 교체될 때만 디스크로 복사된다. 그러나 write-back 연산도 비용이 높기 때문에, 페이지가 실제로 수정되었는지를 알아야 한다.

더티 비트가 설정된(dirty = 1) 페이지는 "더티 페이지"라 불리며, 교체 시 반드시 디스크에 기록해야 한다. 더티 비트가 설정되지 않은 페이지는 디스크에 기록할 필요 없이 바로 새 페이지로 대체할 수 있어 I/O 작업을 절약한다.

더티 비트는 캐시에서도 동일하게 사용된다. Write-back 캐시에서 캐시 블록이 수정되었는지를 추적하여, 교체 시 메모리에 기록할 필요가 있는지 결정한다.

## 예시

```
# 페이지 테이블 엔트리 구조
+-------+-------+-----+-----+-------------------+
| Valid | Dirty | Ref | RW  | 물리 페이지 번호   |
+-------+-------+-----+-----+-------------------+
|   1   |   0   |  1  |  1  | 0x1A3             |  -> 수정 안됨
|   1   |   1   |  1  |  1  | 0x0F2             |  -> 수정됨 (교체 시 디스크 기록 필요)
+-------+-------+-----+-----+-------------------+

# 페이지 교체 시 더티 비트 활용
if (선택된_페이지.dirty == 1):
    디스크의 스왑 공간에 페이지 기록  # 비용 큼
    새 페이지 로드
else:
    새 페이지 바로 로드  # I/O 절약
```

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [후기입 (Write-Back)](/knowledge/computer-architecture/write-back/)
- [페이지 테이블 (Page Table)](/knowledge/computer-architecture/page-table/)
- [스왑 공간 (Swap Space)](/knowledge/computer-architecture/swap-space/)
- [참조 비트 (Reference Bit)](/knowledge/computer-architecture/reference-bit/)
