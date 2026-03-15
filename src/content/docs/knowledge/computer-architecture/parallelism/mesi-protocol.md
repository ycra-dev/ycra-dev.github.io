---
title: "MESI 프로토콜 (MESI Protocol)"
description: "MESI 프로토콜은 Modified(수정), Exclusive(배타적), Shared(공유), Invalid(무효)의 네 가지 상태를 사용하는 캐시 일관성 프로토콜이다"
tags: ['Cache Coherence', 'Snooping Protocol', 'Multiprocessor', 'Finite State Machine', 'Write Invalidate']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/mesi-protocol
sidebar:
  order: 16
---

## 핵심 개념

기본 3상태(Invalid, Shared, Modified) 프로토콜에 Exclusive(배타적 비수정) 상태를 추가한 것이 MESI 프로토콜이다. Exclusive 상태는 블록이 하나의 캐시에만 존재하지만 아직 수정되지 않은 상태를 나타낸다.

Exclusive 상태의 핵심 장점: 블록이 배타적 상태에 있는 프로세서가 해당 블록에 쓰기를 할 때, 버스 접근을 획득하거나 무효화를 생성할 필요 없이 단순히 상태를 Modified로 변경하면 된다. 이는 블록이 이 캐시에만 존재함이 이미 알려져 있기 때문이다.

스누핑 프로토콜에서는 다른 프로세서가 읽기 미스를 발생시키면 Exclusive 상태가 Shared로 변경된다. 또한 MOESI 프로토콜은 "Owned" 상태를 추가로 도입한다.

구현 시 주요 과제는 연산의 원자성(atomicity)을 보장하는 것이다. 비원자적 연산은 교착 상태(deadlock)를 초래할 수 있으므로, 버스 접근의 직렬화 등의 메커니즘이 필요하다.

## 예시

```
# MESI 상태 전이 다이어그램

[Invalid] --프로세서 읽기 미스--> [Shared] 또는 [Exclusive]
  (다른 캐시에 사본 있으면 Shared, 없으면 Exclusive)

[Exclusive] --프로세서 쓰기--> [Modified]
  (버스 트랜잭션 불필요! 핵심 최적화)

[Shared] --프로세서 쓰기--> [Modified]
  (버스에 무효화 브로드캐스트 필요)

[Modified] --다른 프로세서 읽기 미스 (스누핑)--> [Shared]
  (수정된 데이터를 요청 프로세서에 제공하고 메모리도 갱신)

[Shared/Exclusive] --다른 프로세서 쓰기 (스누핑)--> [Invalid]

# 상태 인코딩 (2비트)
Invalid:   dirty=0, exclusive=0
Shared:    dirty=0, exclusive=0 (+ shared bit)
Exclusive: dirty=0, exclusive=1
Modified:  dirty=1, exclusive=1
```

## 관련 개념

- [캐시 일관성 (Cache Coherence)](/knowledge/computer-architecture/cache-coherence/)
- [스누핑 프로토콜 (Snooping Protocol)](/knowledge/computer-architecture/snooping-protocol/)
- [유한 상태 기계 (Finite-State Machine)](/knowledge/computer-architecture/finite-state-machine/)
- [후기입 (Write-Back)](/knowledge/computer-architecture/write-back/)
- [거짓 공유 (False Sharing)](/knowledge/computer-architecture/false-sharing/)
