---
title: "캐시 일관성 (Cache Coherence)"
description: "캐시 일관성(cache coherence)은 멀티코어 멀티프로세서에서 공유 데이터를 캐싱할 때, 각 프로세서의 캐시가 동일한 메모리 위치에 대해 일관된 값을 보도록 보장하는 메커니즘이다"
tags: ['Multiprocessor', 'Shared Memory', 'Snooping Protocol', 'Write Invalidate', 'Consistency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cache-coherence
sidebar:
  order: 14
---

## 핵심 개념

공유 메모리에 대한 각 프로세서의 뷰가 개별 캐시를 통해 이루어지므로, 추가 조치 없이는 두 프로세서가 같은 위치에 대해 서로 다른 값을 볼 수 있다. 메모리 시스템이 일관적이려면 세 가지 조건을 만족해야 한다:

1. 프로세서 P가 위치 X에 쓴 후 P가 읽으면, 다른 프로세서의 쓰기가 없는 한 P가 쓴 값을 반환해야 한다.
2. 다른 프로세서가 X에 쓴 후 충분한 시간이 지난 뒤 읽으면, 기록된 값이 반환되어야 한다.
3. 같은 위치에 대한 쓰기는 직렬화(serialize)되어야 한다.

일관성 프로토콜은 migration(데이터를 로컬 캐시로 이동)과 replication(공유 데이터의 사본을 로컬 캐시에 유지)을 지원한다. 가장 인기 있는 프로토콜은 스누핑(snooping) 방식으로, 모든 캐시가 버스를 모니터링하여 자신이 가진 블록에 대한 요청을 감지한다.

일관성과 별도로, 메모리 일관성 모델(memory consistency model)은 기록된 값이 언제 다른 프로세서에게 보이는지를 정의한다.

## 예시

```
# 캐시 일관성 문제 시나리오
초기 상태: X = 0 (메모리), CPU A와 B 모두 X 캐싱 안 됨

시간 1: CPU A가 X를 읽음 -> A의 캐시에 X=0
시간 2: CPU B가 X를 읽음 -> B의 캐시에 X=0
시간 3: CPU A가 X에 1을 기록 -> A의 캐시 X=1, 메모리 X=1
         하지만 B의 캐시에는 여전히 X=0!

# Write-Invalidate 프로토콜로 해결
시간 3: CPU A가 X에 기록 시:
  -> 버스에 무효화(invalidate) 브로드캐스트
  -> CPU B가 버스를 스누핑하여 자신의 X 사본 무효화
시간 4: CPU B가 X를 읽을 때:
  -> 캐시 미스 발생 -> 메모리에서 X=1 가져옴
```

## 관련 개념

- [스누핑 프로토콜 (Snooping Protocol)](/knowledge/computer-architecture/snooping-protocol/)
- [후기입 (Write-Back)](/knowledge/computer-architecture/write-back/)
- [거짓 공유 (False Sharing)](/knowledge/computer-architecture/false-sharing/)
- [공유 메모리 멀티프로세서 (SMP)](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [MESI 프로토콜 (MESI Protocol)](/knowledge/computer-architecture/mesi-protocol/)
