---
title: "RAID"
description: "RAID(Redundant Arrays of Independent Disks)는 여러 디스크를 조합하여 성능 향상과 데이터 신뢰성을 동시에 달성하기 위한 디스크 조직 기법의 총칭이다"
tags: ['Raid', 'Redundancy', 'Disk Organization', 'Fault Tolerance', 'Data Reliability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/raid
sidebar:
  order: 3
---

## 핵심 개념

RAID 시스템의 두 가지 주요 목표:
1. **신뢰성 향상 (중복성)**: N개의 디스크 중 하나 이상이 고장날 확률은 단일 디스크 고장 확률보다 훨씬 높다. MTTF가 100,000시간인 100개 디스크 배열에서 어떤 디스크라도 고장날 평균 시간은 약 42일에 불과하다. 미러링(mirroring)을 통해 모든 디스크를 복제하면, 두 번째 디스크가 첫 번째가 수리되기 전에 고장나야만 데이터가 손실된다.

2. **성능 향상 (병렬성)**: 블록 수준 스트라이핑(block-level striping)으로 대용량 파일 읽기 시 n개 블록을 동시에 가져와 높은 전송률을 얻고, 소규모 접근을 여러 디스크에 분산시켜 처리량을 높인다.

주요 RAID 레벨:
- **RAID 0**: 중복성 없는 스트라이핑. 성능만 향상, 안전성 없음.
- **RAID 1**: 미러링 + 블록 스트라이핑. 가장 높은 쓰기 성능, 저장 공간 2배 필요.
- **RAID 5**: 블록 인터리브 분산 패리티. 데이터와 패리티를 모든 디스크에 분산. 저장 오버헤드가 낮지만 랜덤 쓰기 시 블록 2개 읽기 + 2개 쓰기 필요.
- **RAID 6**: P+Q 중복 방식. 두 디스크 동시 고장도 견딜 수 있음. Reed-Solomon 코드 사용.

하드웨어 RAID는 비휘발성 RAM을 사용하여 쓰기를 기록하고, 소프트웨어 RAID보다 전원 장애 후 복구가 빠르다. 핫 스왑(hot swapping)으로 시스템 중단 없이 디스크 교체가 가능하다.

## 예시

RAID 5의 패리티 분산 예시 (5개 디스크):

```
디스크0  디스크1  디스크2  디스크3  디스크4
P0      블록0   블록1   블록2   블록3
블록4   P1      블록5   블록6   블록7
블록8   블록9   P2      블록10  블록11
블록12  블록13  블록14  P3      블록15
블록16  블록17  블록18  블록19  P4
```

패리티 블록이 각 디스크에 골고루 분배되어 특정 디스크에 부하가 집중되는 것을 방지한다.

RAID 선택 기준:
- 로그 파일 저장 → RAID 1 (최고의 쓰기 성능)
- 읽기 위주, 쓰기 드문 경우 → RAID 5 (저장 효율)
- 데이터 안전이 최우선 → RAID 6 (2개 디스크 고장 허용)

## 관련 개념

- [Magnetic Disk](/knowledge/database/magnetic-disk/)
- [Flash Memory](/knowledge/database/flash-memory/)
- [Storage Area Network](/knowledge/database/storage-area-network/)
- [Disk Block Access](/knowledge/database/disk-block-access/)
