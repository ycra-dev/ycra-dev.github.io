---
title: "Buffer Pool"
description: "버퍼 풀(Buffer Pool)은 디스크 블록의 복사본을 저장하기 위해 메인 메모리에 할당된 영역으로, 버퍼 관리자(buffer manager)가 이 공간의 할당과 교체를 담당하여 디스크 I/O를 최소화한다"
tags: ['Buffer Pool', 'Buffer Manager', 'Lru', 'Mru', 'Pin Unpin', 'Replacement Strategy']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/buffer-pool
sidebar:
  order: 10
---

## 핵심 개념

데이터베이스 프로그램이 디스크 블록을 요청하면 버퍼 관리자가 처리한다. 블록이 이미 버퍼에 있으면 메모리 주소를 반환하고, 없으면 디스크에서 읽어와 버퍼에 적재한다. 공간이 부족하면 기존 블록을 퇴출(evict)하며, 수정된 블록만 디스크에 다시 기록한다.

주요 메커니즘:

1. **교체 전략(Replacement Strategy)**: 운영체제는 일반적으로 LRU(Least Recently Used) 방식을 사용하지만, 데이터베이스 시스템은 쿼리 처리 패턴을 예측할 수 있어 더 정교한 전략이 가능하다. 중첩 루프 조인에서 외부 릴레이션 블록에는 toss-immediate 전략을, 내부 릴레이션 블록에는 MRU(Most Recently Used) 전략이 최적일 수 있다.

2. **핀(Pin)/언핀(Unpin)**: 프로세스가 버퍼 블록을 읽기 전에 핀 연산을 수행하여 퇴출을 방지한다. 읽기 완료 후 언핀 연산으로 퇴출을 허용한다. 핀 카운트가 0인 블록만 퇴출 대상이 된다. 모든 블록이 핀되면 데이터베이스가 더 이상 처리를 진행할 수 없으므로 주의가 필요하다.

3. **공유/배타 잠금(Shared/Exclusive Lock)**: 블록 읽기 시 공유 잠금을, 갱신 시 배타 잠금을 획득한다. 여러 프로세스가 동시에 공유 잠금을 가질 수 있으나, 배타 잠금은 다른 잠금이 없을 때만 부여된다.

4. **강제 출력(Forced Output)**: 장애 복구를 위해 특정 블록을 디스크에 즉시 기록해야 하는 경우가 있다. 메모리 내용은 장애 시 소실되므로, 트랜잭션 커밋 시 충분한 데이터가 디스크에 기록되어야 한다.

## 예시

중첩 루프 조인에서의 버퍼 교체 전략:

```
-- 쿼리: instructor ⋈ department (자연 조인)
for each tuple i of instructor do
    for each tuple d of department do
        if i[dept_name] = d[dept_name] then
            output (i, d)

버퍼 교체 전략:
- instructor 블록: toss-immediate
  (한 번 처리 후 다시 필요 없음 → 즉시 퇴출 가능)
- department 블록: MRU (Most Recently Used)
  (가장 최근 사용된 블록이 가장 나중에 재참조됨)

LRU 사용 시: department 블록을 불필요하게 유지
MRU 사용 시: 다음에 참조될 블록을 우선 유지 → 최적
```

## 관련 개념

- [File Organization](/knowledge/database/file-organization/)
- [Disk Block Access](/knowledge/database/disk-block-access/)
- [Flash Memory](/knowledge/database/flash-memory/)
- [Magnetic Disk](/knowledge/database/magnetic-disk/)
