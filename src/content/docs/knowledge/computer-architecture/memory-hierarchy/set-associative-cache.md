---
title: "Set-Associative Cache"
description: "세트 연관 캐시(Set-Associative Cache)는 각 블록이 고정된 수의 위치(최소 2개)에 배치될 수 있는 캐시 구조이다"
tags: ['Cache', 'Associativity', 'Memory Hierarchy', 'Miss Rate', 'Replacement']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/set-associative-cache
sidebar:
  order: 6
---

## 핵심 개념

n-way 세트 연관 캐시는 여러 세트로 구성되며, 각 세트는 n개의 블록을 포함한다. 메모리 블록은 (블록 번호) mod (세트 수)로 결정되는 고유한 세트에 매핑되고, 해당 세트 내 어느 위치에나 배치될 수 있다. 직접 사상(1-way)과 완전 연관(m-way) 사이의 중간 설계이다. 연관도를 2배로 높이면 세트 수가 절반으로 줄고, 인덱스가 1비트 줄고, 태그가 1비트 늘어난다. 캐시 접근 시 인덱스로 세트를 선택한 후 세트 내 모든 블록의 태그를 병렬로 비교해야 하므로, n-way 캐시는 n개의 비교기가 필요하다. 1-way에서 2-way로의 전환이 미스율을 약 15% 줄이는 가장 큰 개선을 보이며, 그 이상의 연관도 증가는 개선 폭이 줄어든다. 미스 시 교체할 블록 선택에는 LRU(Least Recently Used) 알고리즘이 일반적으로 사용된다.

## 예시

```
8 블록 캐시의 연관도 변화:

직접 사상 (1-way):  8세트 × 1블록 = 8블록
2-way 세트 연관:    4세트 × 2블록 = 8블록
4-way 세트 연관:    2세트 × 4블록 = 8블록
완전 연관 (8-way):  1세트 × 8블록 = 8블록

4-way 세트 연관 캐시 접근:
주소 → [태그 | 인덱스 | 오프셋]
         ↓      ↓
      비교기×4  세트 선택
         ↓
      4:1 MUX → 데이터 출력

접근 시퀀스 0, 8, 0, 6, 8:
- 직접 사상: 5 미스 (0과 8이 같은 블록에 매핑)
- 2-way: 4 미스
- 완전 연관: 3 미스
```

## 관련 개념

- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
- [Fully Associative Cache](/knowledge/computer-architecture/fully-associative-cache/)
- [Least Recently Used](/knowledge/computer-architecture/least-recently-used/)
- [Tag](/knowledge/computer-architecture/tag/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
