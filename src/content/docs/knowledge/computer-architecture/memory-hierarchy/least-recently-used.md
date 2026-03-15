---
title: "LRU (최근 최소 사용)"
description: "최소 최근 사용(Least Recently Used, LRU)은 캐시 교체 정책으로, 가장 오랫동안 사용되지 않은 블록을 교체 대상으로 선택하는 방식이다"
tags: ['Cache', 'Replacement Policy', 'Set Associative', 'Memory Hierarchy', 'Algorithm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/least-recently-used
sidebar:
  order: 15
---

## 핵심 개념

LRU는 연관 캐시(세트 연관 또는 완전 연관)에서 미스가 발생했을 때 어떤 블록을 교체할지 결정하는 가장 일반적인 알고리즘이다. 시간적 지역성 원리에 기반하여, 최근에 사용된 블록은 곧 다시 사용될 가능성이 높으므로 가장 오래 사용되지 않은 블록을 교체한다. 2-way 세트 연관 캐시에서는 각 세트에 1비트만 유지하면 LRU를 구현할 수 있다: 요소가 참조될 때마다 해당 비트를 설정하여 마지막 접근을 표시한다. 그러나 연관도가 증가하면 LRU 구현이 복잡해진다. 높은 연관도에서는 정확한 LRU 대신 근사 LRU(pseudo-LRU)나 랜덤 교체 등의 대안이 사용되기도 한다. 직접 사상 캐시에서는 교체할 블록이 하나뿐이므로 교체 정책이 필요 없다.

## 예시

```
2-way 세트 연관 캐시에서 LRU:

세트 0: [블록A, 블록B]  LRU 비트 = A

접근 시퀀스: 0, 8, 0, 6, 8
  0 → 미스: 세트0에 블록0 배치     [0, -]
  8 → 미스: 세트0에 블록8 배치     [0, 8]  LRU=0
  0 → 히트: 블록0 접근             [0, 8]  LRU=8
  6 → 미스: LRU는 블록8 → 교체    [0, 6]  LRU=0
  8 → 미스: LRU는 블록0 → 교체    [8, 6]  LRU=6
```

## 관련 개념

- [집합 연관 캐시 (Set-Associative Cache)](/knowledge/computer-architecture/set-associative-cache/)
- [완전 연관 캐시 (Fully Associative Cache)](/knowledge/computer-architecture/fully-associative-cache/)
- [캐시 미스 (Cache Miss)](/knowledge/computer-architecture/cache-miss/)
- [시간 지역성 (Temporal Locality)](/knowledge/computer-architecture/temporal-locality/)
