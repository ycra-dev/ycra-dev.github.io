---
title: "Cache Memory"
description: "캐시 메모리(Cache Memory)는 더 크고 느린 메모리(DRAM)에 대한 버퍼 역할을 하는 작고 빠른 메모리이다"
tags: ['Memory Hierarchy', 'Sram', 'Performance', 'Locality', 'Buffer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cache-memory
sidebar:
  order: 2
---

## 핵심 개념

캐시는 메모리 계층구조의 핵심 구성요소로, 프로세서와 메인 메모리 사이의 속도 차이를 완화한다. "cache"라는 단어는 "은닉처"를 뜻하며, 자주 사용되는 데이터의 사본을 빠르게 접근할 수 있는 곳에 보관한다. 캐시가 효과적인 이유는 프로그램이 시간적 지역성(최근 접근한 데이터를 다시 접근)과 공간적 지역성(인접한 데이터를 접근)을 보이기 때문이다. 현대 프로세서는 L1, L2, L3 등 여러 수준의 캐시를 가지며, L1이 가장 빠르고 작다.

캐시의 각 블록에는 태그(tag)와 유효 비트(valid bit)가 포함된다. 태그는 해당 블록이 어떤 메모리 주소에 대응하는지 식별하고, 유효 비트는 블록에 유효한 데이터가 있는지 나타낸다. 캐시 미스 발생 시 하위 메모리에서 블록을 가져와 캐시에 기록하고 태그를 설정한다. 블록 크기를 키우면 공간적 지역성을 활용하여 미스율을 줄일 수 있지만, 지나치게 크면 블록 수가 줄어 경쟁이 증가한다. 쓰기 정책으로는 write-through(즉시 메모리 갱신)와 write-back(교체 시에만 갱신)이 있다. 파이프라인의 명령어 캐시와 데이터 캐시를 분리하는 분리 캐시(split cache) 방식이 대역폭 향상을 위해 일반적이다.

## 예시

```
프로세서 → L1 캐시(가장 빠름, 가장 작음)
         → L2 캐시(중간)
         → L3 캐시(느림, 큼)
         → 메인 메모리 (DRAM)

캐시 히트: 요청한 데이터가 캐시에 있음 → 빠른 접근
캐시 미스: 요청한 데이터가 캐시에 없음 → 하위 계층에서 가져와야 함
```

## 관련 개념

- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [SRAM](/knowledge/computer-architecture/sram/)
- [DRAM](/knowledge/computer-architecture/dram/)
- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
- [Set-Associative Cache](/knowledge/computer-architecture/set-associative-cache/)
- [Write-Through](/knowledge/computer-architecture/write-through/)
- [Write-Back](/knowledge/computer-architecture/write-back/)
- [Multilevel Cache](/knowledge/computer-architecture/multilevel-cache/)
- [Temporal Locality](/knowledge/computer-architecture/temporal-locality/)
- [Spatial Locality](/knowledge/computer-architecture/spatial-locality/)
