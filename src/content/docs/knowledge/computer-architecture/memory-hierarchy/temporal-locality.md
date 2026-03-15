---
title: "시간 지역성 (Temporal Locality)"
description: "시간적 지역성(Temporal Locality)은 한 데이터 위치가 참조되면 가까운 미래에 다시 참조될 가능성이 높다는 원리이다"
tags: ['Locality', 'Memory Hierarchy', 'Cache', 'Performance', 'Principle']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/temporal-locality
sidebar:
  order: 3
---

## 핵심 개념

시간적 지역성은 메모리 계층구조의 근본 원리 중 하나이다. 프로그램의 루프 구조가 시간적 지역성의 대표적 원인으로, 루프 내의 명령어와 데이터는 반복적으로 접근된다. 메모리 계층구조는 시간적 지역성을 활용하여 최근에 접근된 데이터를 프로세서에 더 가까운 상위 계층에 유지한다. 캐시가 이 원리에 기반하여 동작하며, 최근 접근된 블록을 캐시에 보관하여 재접근 시 빠르게 제공한다. 시간적 지역성이 높은 프로그램은 높은 히트율을 달성하여 메모리 계층구조의 성능 이점을 최대한 활용할 수 있다. 반면, 시간적 지역성이 낮은 접근 패턴(예: 대규모 배열의 순차 스캔)은 캐시의 이점을 크게 줄인다.

## 예시

```
시간적 지역성 예시:

for (i = 0; i < 1000; i++) {
    sum += a[i];  // sum: 높은 시간적 지역성 (매 반복 접근)
                   // a[i]: 낮은 시간적 지역성 (각 요소 1번만 접근)
}

# sum 변수는 루프 내에서 1000번 접근 → 캐시에 유지됨
# 루프 명령어 자체도 1000번 반복 실행 → 명령어 캐시에 유지됨
```

## 관련 개념

- [공간 지역성 (Spatial Locality)](/knowledge/computer-architecture/spatial-locality/)
- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [캐시 메모리 (Cache Memory)](/knowledge/computer-architecture/cache-memory/)
- [적중률 (Hit Rate)](/knowledge/computer-architecture/hit-rate/)
