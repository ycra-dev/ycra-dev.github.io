---
title: "동기화 (Synchronization)"
description: "동기화(synchronization)는 서로 다른 프로세서에서 실행될 수 있는 둘 이상의 프로세스의 동작을 조율하는 과정이다"
tags: ['Shared Memory', 'Multiprocessor', 'Lock', 'Atomic Operation', 'Parallel Computing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/synchronization
sidebar:
  order: 18
---

## 핵심 개념

공유 주소 공간에서 병렬로 동작하는 프로세서들이 공유 데이터를 수정할 때, 한 프로세서가 데이터 작업을 마치기 전에 다른 프로세서가 해당 데이터를 사용하는 것을 방지해야 한다. 이를 위해 동기화 메커니즘이 필요하다.

대표적인 동기화 방식은 **락(lock)**이다. 공유 변수에 대한 락을 획득한 프로세서만 해당 변수에 접근할 수 있으며, 다른 프로세서는 락이 해제될 때까지 대기해야 한다.

MIPS에서는 ll(load linked)과 sc(store conditional) 명령어 쌍으로 원자적 연산을 구현한다. 이를 통해 테스트-앤-셋, 비교-앤-스왑 등의 원자적 동기화 프리미티브를 소프트웨어로 구현할 수 있다.

리덕션(reduction)은 병렬 프로그래밍에서 흔히 사용되는 동기화 패턴으로, 데이터 구조를 처리하여 단일 값을 반환하는 함수이다. 예를 들어 64개 프로세서의 부분합을 최종 합으로 결합하는 과정에서 계층적 리덕션을 사용한다.

## 예시

```
# MIPS ll/sc를 사용한 락 구현
try:  ll   $t0, 0($s0)    # 락 변수를 load linked
      bne  $t0, $zero, try # 이미 잠겨있으면 재시도
      addi $t0, $zero, 1   # 락 값을 1로 설정
      sc   $t0, 0($s0)    # store conditional
      beq  $t0, $zero, try # sc 실패하면 재시도
      # 임계 구역 (critical section) 진입
      ...
      sw   $zero, 0($s0)  # 락 해제

# 계층적 리덕션 (64개 부분합 -> 1개 최종합)
half = 64;
do {
    synch();  // 장벽 동기화
    if (Pn < half) sum[Pn] += sum[Pn + half];
    half = half / 2;
} while (half != 0);
# 6단계 (log2(64))로 완료
```

## 관련 개념

- [공유 메모리 멀티프로세서 (SMP)](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [캐시 일관성 (Cache Coherence)](/knowledge/computer-architecture/cache-coherence/)
- [강한 확장성 (Strong Scaling)](/knowledge/computer-architecture/strong-scaling/)
- [OpenMP (병렬 프로그래밍 API)](/knowledge/computer-architecture/openmp/)
