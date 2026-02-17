---
title: "Split Cache"
description: "분리 캐시(Split Cache)는 메모리 계층구조의 한 수준이 명령어 캐시와 데이터 캐시로 분리되어 병렬로 동작하는 구조이다"
tags: ['Cache', 'Pipeline', 'Bandwidth', 'Instruction Cache', 'Data Cache']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/split-cache
sidebar:
  order: 19
---

## 핵심 개념

분리 캐시는 거의 모든 현대 프로세서에서 사용된다. 파이프라인이 매 클록마다 명령어 워드와 데이터 워드를 동시에 요청할 수 있으므로, 단일 통합 캐시로는 이 대역폭을 지원할 수 없다(구조적 해저드). 분리 캐시는 캐시 대역폭을 두 배로 하여 파이프라인의 요구를 충족한다. 같은 총 크기의 통합 캐시가 약간 더 높은 히트율을 가지지만(명령어와 데이터 간 유연한 공간 할당), 분리 캐시의 대역폭 장점이 미스율 약간의 증가를 쉽게 보상한다. Intrinsity FastMATH 프로세서는 16KiB 명령어 캐시와 16KiB 데이터 캐시를 분리하여 사용하며, 12단계 파이프라인의 피크 속도에서 매 클록 두 요청을 처리한다.

## 예시

```
분리 캐시 vs 통합 캐시:

분리 캐시 (FastMATH):
  명령어 캐시 (16 KiB) ← 명령어 인출
  데이터 캐시 (16 KiB) ← 데이터 접근
  → 동시 접근 가능, 대역폭 2배

통합 캐시 (32 KiB):
  → 명령어/데이터 유연 공간 할당
  → 히트율 약간 높음 (3.18% vs 3.24%)
  → 하지만 동시 접근 불가 (구조적 해저드)

결론: 분리 캐시의 대역폭 이점 >> 미스율 차이
```

## 관련 개념

- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [Structural Hazard](/knowledge/computer-architecture/structural-hazard/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
