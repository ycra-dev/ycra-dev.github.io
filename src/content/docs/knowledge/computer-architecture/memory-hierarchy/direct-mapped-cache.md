---
title: "Direct-Mapped Cache"
description: "직접 사상 캐시(Direct-Mapped Cache)는 각 메모리 위치가 캐시의 정확히 하나의 위치에만 매핑되는 캐시 구조이다"
tags: ['Cache', 'Memory Hierarchy', 'Mapping', 'Tag', 'Valid Bit']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/direct-mapped-cache
sidebar:
  order: 5
---

## 핵심 개념

직접 사상 캐시에서 메모리 블록의 캐시 위치는 (블록 주소) mod (캐시 블록 수)로 결정된다. 캐시 크기가 2^n 블록이면 주소의 하위 n비트를 인덱스로 사용한다. 같은 캐시 위치에 매핑되는 여러 메모리 블록을 구별하기 위해 태그(tag)가 사용되며, 태그는 인덱스로 사용되지 않는 상위 주소 비트를 포함한다. 유효 비트(valid bit)는 캐시 항목에 유효한 데이터가 있는지 나타낸다. 캐시 접근 시 인덱스로 해당 항목을 선택하고, 태그를 비교하여 히트/미스를 판단한다. 직접 사상의 장점은 단 하나의 비교기만 필요하여 하드웨어가 단순하고 빠르다는 것이다. 단점은 같은 위치에 매핑되는 두 블록이 번갈아 접근되면 반복적 미스(충돌 미스)가 발생한다는 것이다. 예를 들어, Intrinsity FastMATH 프로세서는 256 블록, 16워드/블록의 16KiB 직접 사상 캐시를 사용한다.

## 예시

```
8 블록 직접 사상 캐시 (3비트 인덱스):

주소 (5비트)  블록  인덱스  태그
00001 (1)    →  001    00
01001 (9)    →  001    01
10001 (17)   →  001    10
11001 (25)   →  001    11

# 주소 1, 9, 17, 25가 모두 캐시 블록 001에 매핑
# 동시에 하나만 캐시에 존재 가능

캐시 비트 수 계산 (16KiB, 4워드 블록, 32비트 주소):
- 블록 수: 1024 (2^10)
- 태그 크기: 32 - 10 - 2 - 2 = 18비트
- 총 비트: 1024 × (4×32 + 18 + 1) = 147 Kibibits
```

## 관련 개념

- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [Tag](/knowledge/computer-architecture/tag/)
- [Valid Bit](/knowledge/computer-architecture/valid-bit/)
- [Set-Associative Cache](/knowledge/computer-architecture/set-associative-cache/)
- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
- [Write-Through](/knowledge/computer-architecture/write-through/)
