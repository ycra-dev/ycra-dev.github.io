---
title: "Miss Penalty"
description: "미스 패널티(Miss Penalty)는 캐시 미스 시 하위 메모리 계층에서 블록을 가져와 상위 계층에 삽입하고 요청자에게 전달하는 데 필요한 시간이다"
tags: ['Cache', 'Memory Hierarchy', 'Performance', 'Latency', 'Stall']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/miss-penalty
sidebar:
  order: 12
---

## 핵심 개념

미스 패널티는 블록을 가져오는 지연 시간(latency)과 전송 시간(transfer time)으로 구성된다. 상위 계층은 더 작고 빠른 기술로 구현되므로 히트 시간은 미스 패널티보다 훨씬 작다. 블록 크기가 커지면 전송 시간이 증가하여 미스 패널티도 증가한다. Intel Core i7에서 L1 미스는 약 10 사이클, L2 미스는 약 30 사이클, L3 미스는 약 130-135 사이클의 패널티를 갖는다. 미스율이 감소하더라도 미스 패널티의 증가가 이를 압도하면 캐시 성능이 오히려 저하된다. 메모리 대역폭을 높여(wide memory, interleaving, DDR) 큰 블록의 전송 시간을 줄이면 미스 패널티 증가를 완화할 수 있다. AMAT 공식(히트 시간 + 미스율 x 미스 패널티)에서 미스 패널티는 캐시 성능의 핵심 결정 요인이다.

## 예시

```
Intel Core i7 미스 패널티:
- L1 미스 → L2 히트: ~10 사이클
- L2 미스 → L3 히트: ~30 사이클 (L1의 3배)
- L3 미스 → 메모리: ~130-135 사이클 (L1의 13배)

블록 크기와 미스 패널티:
- 블록 크기 ↑ → 전송 시간 ↑ → 미스 패널티 ↑
- 해결책: 메모리 대역폭 ↑ (DDR, 인터리빙)

early restart: 요청 워드가 도착하면 나머지 블록 전송 전에 실행 재개
critical word first: 요청 워드를 먼저 전송하고 나머지는 wrap-around
```

## 관련 개념

- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
- [AMAT](/knowledge/computer-architecture/amat/)
- [Hit Rate](/knowledge/computer-architecture/hit-rate/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Multilevel Cache](/knowledge/computer-architecture/multilevel-cache/)
