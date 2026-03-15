---
title: "RAID (독립 디스크 중복 배열)"
description: "RAID(Redundant Arrays of Inexpensive Disks)는 다수의 작고 저렴한 디스크를 배열로 구성하여 성능과 신뢰성을 모두 향상시키는 디스크 구성 방식이다"
tags: ['Disk Storage', 'Redundancy', 'Dependability', 'Striping', 'Parity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/raid
sidebar:
  order: 6
---

## 핵심 개념

RAID는 원래 대형 디스크를 다수의 소형 디스크로 대체하여 성능을 향상시키려는 동기에서 시작되었다. 그러나 RAID의 진정한 인기는 소수의 중복 디스크를 추가하여 제공하는 높은 신뢰성(dependability) 덕분이었다.

주요 RAID 레벨:
- **RAID 0:** 스트라이핑만 (중복 없음) - 성능은 좋으나 신뢰성 없음
- **RAID 1:** 미러링 - 모든 데이터를 두 디스크에 복제, 가장 비쌈
- **RAID 3:** 비트 인터리브 패리티 - 패리티 디스크 1개로 1/n 비용
- **RAID 4:** 블록 인터리브 패리티 - 독립적 작은 접근 허용
- **RAID 5:** 분산 블록 인터리브 패리티 - 패리티를 모든 디스크에 분산하여 쓰기 병목 제거
- **RAID 6:** P+Q 중복 - 두 번의 동시 장애에서 복구 가능

핫 스와핑(hot-swapping)과 대기 예비(standby spares)를 통해 시스템 중단 없이 장애 디스크를 교체할 수 있다. 디스크 용량 증가로 복구 시간이 길어지고 있어 RAID 6에 대한 관심이 증가하고 있다.

## 예시

```
# RAID 5 소규모 쓰기 최적화 (shortcut)
4개 데이터 디스크 + 분산 패리티

기존 방식 (naive):
  D0' 기록 시 -> D1, D2, D3 읽기 + P' = D0' XOR D1 XOR D2 XOR D3
  총 3번 디스크 읽기 + 2번 디스크 쓰기 (5회 접근)

최적화 방식 (shortcut):
  D0' 기록 시 -> 기존 D0 읽기 + 기존 P 읽기
  P' = P XOR D0 XOR D0' (변경된 비트만 패리티 갱신)
  총 2번 디스크 읽기 + 2번 디스크 쓰기 (4회 접근)

# RAID 5 패리티 분산 (병목 제거)
Disk 0: D0, D4, D8, P3, ...
Disk 1: D1, D5, P2, D12, ...
Disk 2: D2, P1, D9, D13, ...
Disk 3: P0, D6, D10, D14, ...
-> 패리티가 분산되어 동시 쓰기 가능
```

## 관련 개념

- [더티 비트 (Dirty Bit)](/knowledge/computer-architecture/dirty-bit/)
- [후기입 (Write-Back)](/knowledge/computer-architecture/write-back/)
- [비차단 캐시 (Nonblocking Cache)](/knowledge/computer-architecture/nonblocking-cache/)
