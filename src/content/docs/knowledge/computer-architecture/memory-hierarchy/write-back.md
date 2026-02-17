---
title: "Write-Back"
description: "Write-back은 정보를 캐시의 블록에만 기록하고, 해당 블록이 교체될 때에만 하위 메모리 계층으로 기록하는 캐시 쓰기 정책이다"
tags: ['Cache', 'Memory Hierarchy', 'Dirty Bit', 'Write Policy', 'Write Buffer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/write-back
sidebar:
  order: 17
---

## 핵심 개념

Write-back의 주요 장점:
1. 프로세서가 메모리가 아닌 캐시 속도로 개별 워드를 기록할 수 있다.
2. 한 블록 내의 여러 쓰기에 대해 하위 계층에 한 번만 기록하면 된다.
3. 블록이 기록될 때 전체 블록을 전송하여 높은 대역폭을 효과적으로 활용할 수 있다.

반면 Write-through는 캐시와 하위 메모리 계층 모두에 정보를 기록하는 방식으로, 미스 처리가 더 간단하고 구현이 쉽지만 쓰기 버퍼가 필요하다.

가상 메모리 시스템에서는 디스크 쓰기 시간이 수백만 클럭 사이클이 걸리므로 write-through가 비실용적이다. 따라서 가상 메모리는 항상 write-back을 사용한다. 현대 최하위 레벨 캐시도 대부분 write-back을 사용하는데, 프로세서가 생성하는 쓰기 속도가 메모리 시스템의 처리 속도를 초과하기 때문이다.

Write-back 시스템에서는 더티 비트를 사용하여 블록이 수정되었는지 추적하고, 교체 시 수정된 블록만 하위 계층에 기록한다.

## 예시

```
# Write-Back vs Write-Through 비교
Write-Through:
  store $t0, 0($s0)  ->  캐시에 기록 + 메모리에 기록
  # 장점: 미스 시 블록을 하위 계층에 기록할 필요 없음
  # 단점: 매번 메모리 대역폭 소비

Write-Back:
  store $t0, 0($s0)  ->  캐시에만 기록 + dirty bit = 1
  # 교체 시에만 메모리에 기록
  # 장점: 메모리 대역폭 절약
  # 단점: 미스 시 dirty 블록을 먼저 기록해야 할 수 있음

# 가상 메모리에서의 Write-Back
전체 페이지(4KB)를 한 번에 디스크에 복사하는 것이
개별 워드를 따로 디스크에 쓰는 것보다 훨씬 효율적
```

## 관련 개념

- [Dirty Bit](/knowledge/computer-architecture/dirty-bit/)
- [Three Cs Model](/knowledge/computer-architecture/three-cs-model/)
- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Cache Coherence](/knowledge/computer-architecture/cache-coherence/)
- [Write-Through](/knowledge/computer-architecture/write-through/)
- [Write Buffer](/knowledge/computer-architecture/write-buffer/)
- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
