---
title: "스누핑 프로토콜 (Snooping Protocol)"
description: "스누핑 프로토콜은 물리 메모리 블록의 사본을 가진 모든 캐시가 해당 블록의 공유 상태 사본을 유지하고, 모든 캐시 컨트롤러가 버스(또는 네트워크)를 모니터링하여 자신이 가진 블록에 대한 요청을 감지하는 캐시 일관성 프로토콜이다"
tags: ['Cache Coherence', 'Multiprocessor', 'Write Invalidate', 'Bus', 'Shared Memory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/snooping-protocol
sidebar:
  order: 15
---

## 핵심 개념

스누핑 프로토콜의 대표적 방식은 쓰기 무효화(write invalidate) 프로토콜이다. 프로세서가 데이터 항목에 쓰기 전에 해당 항목에 대한 배타적 접근(exclusive access)을 확보하여, 다른 캐시의 사본을 무효화한다. 이를 통해 쓰기 발생 시 다른 읽기 가능하거나 쓰기 가능한 사본이 존재하지 않음을 보장한다.

공유(shared), 수정(modified), 무효(invalid)의 세 가지 상태를 사용하는 간단한 프로토콜이 있으며, MESI 프로토콜은 배타적 비수정(exclusive unmodified) 상태를 추가하여 네 가지 상태를 사용한다.

구현 시 중요한 점은 쓰기 미스와 업그레이드 미스가 원자적(atomic)이지 않다는 것이다. 두 프로세서가 동시에 같은 블록에 쓰기를 시도하는 레이스(race) 상태를 처리하기 위해, 버스 접근을 직렬화해야 한다. 포함 속성(inclusion property)은 L1 캐시의 모든 엔트리가 L2 캐시에도 존재해야 함을 요구하여, 스누프 요청을 L2 캐시에서 처리할 수 있게 한다.

## 예시

```
# Write-Invalidate 스누핑 프로토콜 동작
초기: X=0 (메모리), CPU A와 B 캐시에 X=0 (shared 상태)

CPU A가 X에 1을 기록:
  1. A가 버스 접근 권한 획득
  2. 무효화(invalidate) 메시지를 버스에 브로드캐스트
  3. B가 버스를 스누핑 -> X를 invalid로 변경
  4. A의 X 상태: shared -> modified (exclusive)
  5. A가 X=1을 자신의 캐시에 기록

CPU B가 X를 읽으려 할 때:
  1. B의 캐시에서 X가 invalid -> 캐시 미스
  2. B가 버스에 읽기 요청 전송
  3. A가 스누핑하여 자신이 dirty 사본 가짐 감지
  4. A가 X=1을 버스에 제공하고 메모리도 갱신
  5. A와 B 모두 X의 상태를 shared로 변경
```

## 관련 개념

- [캐시 일관성 (Cache Coherence)](/knowledge/computer-architecture/cache-coherence/)
- [MESI 프로토콜 (MESI Protocol)](/knowledge/computer-architecture/mesi-protocol/)
- [거짓 공유 (False Sharing)](/knowledge/computer-architecture/false-sharing/)
- [공유 메모리 멀티프로세서 (SMP)](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [후기입 (Write-Back)](/knowledge/computer-architecture/write-back/)
