---
title: "완전 연관 캐시 (Fully Associative Cache)"
description: "완전 연관 캐시(Fully Associative Cache)는 메모리 블록이 캐시의 어느 위치에든 배치될 수 있는 캐시 구조이다"
tags: ['Cache', 'Associativity', 'Memory Hierarchy', 'Cam', 'Search']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/fully-associative-cache
sidebar:
  order: 7
---

## 핵심 개념

완전 연관 캐시에서는 블록을 배치할 때 인덱스가 필요 없으며, 모든 캐시 항목을 검색해야 하므로 블록 오프셋을 제외한 전체 주소가 태그가 된다. 검색은 각 캐시 항목에 연결된 비교기를 통해 병렬로 수행된다. 이 비교기들의 하드웨어 비용이 높아 작은 수의 블록을 가진 캐시에서만 실용적이다. CAM(Content Addressable Memory)은 비교와 저장을 하나의 장치에서 결합하여 높은 연관도를 효율적으로 구현할 수 있게 한다. 2020년 기준으로 CAM의 크기와 전력 소비로 인해 2-way와 4-way는 일반 SRAM과 비교기로, 8-way 이상은 CAM으로 구현하는 것이 일반적이다. 완전 연관은 m 블록의 캐시에서 m-way 세트 연관과 동일하며, 가장 낮은 미스율을 제공하지만 가장 높은 히트 시간을 갖는다. TLB(Translation Lookaside Buffer)처럼 작은 캐시에서 주로 사용된다.

## 예시

```
완전 연관 캐시 (4블록):

블록 | V | 태그(28비트) | 데이터
-----|---|-------------|-------
  0  | 1 | 0x3A2F104   | [...]
  1  | 1 | 0x00B1200   | [...]
  2  | 1 | 0x7FF0010   | [...]
  3  | 0 |     --      |  --

접근: 주소 0x3A2F1044
  태그 = 0x3A2F104 → 4개 비교기가 동시에 비교
  → 블록 0에서 히트!

장점: 최저 미스율 (충돌 미스 없음)
단점: 비교기 수 = 블록 수 (비용↑, 히트 시간↑)
```

## 관련 개념

- [집합 연관 캐시 (Set-Associative Cache)](/knowledge/computer-architecture/set-associative-cache/)
- [직접 사상 캐시 (Direct-Mapped Cache)](/knowledge/computer-architecture/direct-mapped-cache/)
- [LRU (최근 최소 사용)](/knowledge/computer-architecture/least-recently-used/)
- [TLB (변환 색인 버퍼)](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [태그 (Tag)](/knowledge/computer-architecture/tag/)
