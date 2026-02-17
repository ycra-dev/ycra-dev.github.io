---
title: "Spatial Locality"
description: "공간적 지역성(Spatial Locality)은 한 데이터 위치가 참조되면 인접한 주소의 데이터도 곧 참조될 가능성이 높다는 원리이다"
tags: ['Locality', 'Memory Hierarchy', 'Cache', 'Block Size', 'Principle']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/spatial-locality
sidebar:
  order: 4
---

## 핵심 개념

공간적 지역성은 명령어의 순차적 실행과 배열/레코드의 순차적 접근에서 자연스럽게 나타난다. 메모리 계층구조는 공간적 지역성을 활용하여 단일 워드가 아닌 여러 연속 워드로 구성된 블록(block) 단위로 데이터를 상위 계층으로 이동한다. 블록 크기를 키우면 공간적 지역성을 더 잘 활용하여 미스율을 줄일 수 있지만, 블록 크기가 캐시 크기의 상당 부분을 차지하면 블록 수가 줄어 경쟁이 증가하고 미스율이 오히려 높아질 수 있다. 또한 블록 크기가 커지면 미스 패널티도 증가하므로, 메모리 시스템의 대역폭과 균형을 맞춰야 한다. early restart나 critical word first 같은 기법으로 큰 블록의 미스 패널티를 일부 숨길 수 있다.

## 예시

```
공간적 지역성 예시:

int a[1000];
for (i = 0; i < 1000; i++)
    a[i] = a[i] * 2;  // a[0], a[1], a[2], ... 순차 접근

# a[0] 접근 시 블록 전체 (예: a[0]~a[15])가 캐시에 로드
# a[1]~a[15] 접근 시 캐시 히트 → 공간적 지역성 활용

블록 크기와 미스율:
  블록 크기 ↑ → 미스율 ↓ (공간적 지역성 활용)
  블록 크기 ↑↑ → 미스율 ↑ (캐시 내 블록 수 감소, 경쟁 증가)
```

## 관련 개념

- [Temporal Locality](/knowledge/computer-architecture/temporal-locality/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
