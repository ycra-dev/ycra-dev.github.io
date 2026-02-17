---
title: "Flash Memory"
description: "플래시 메모리(Flash Memory)는 전원이 꺼져도 데이터가 보존되는 비휘발성 저장 매체로, NAND 플래시가 데이터 저장에 주로 사용되며 SSD(Solid-State Drive)의 내부 저장 매체로 활용된다"
tags: ['Flash Memory', 'Ssd', 'Nand Flash', 'Non Volatile Storage', 'Wear Leveling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/flash-memory
sidebar:
  order: 2
---

## 핵심 개념

NAND 플래시에서 읽기는 일반적으로 4096바이트의 페이지 단위로 수행된다. SSD는 NAND 플래시를 내부적으로 사용하면서 자기 디스크와 유사한 블록 지향 인터페이스를 제공한다.

SSD와 자기 디스크의 주요 차이점:
- **랜덤 접근 지연**: SSD 20~100 마이크로초 vs. 자기 디스크 5~10 밀리초
- **전송률**: SSD SATA 500 MB/s, NVMe PCIe 3 GB/s vs. 자기 디스크 최대 200 MB/s
- **전력 소비**: SSD가 현저히 낮음
- **가격**: SSD가 바이트당 6~8배 비쌈

플래시 메모리의 쓰기 특성:
- 페이지 쓰기는 약 100 마이크로초 소요
- 이미 쓰여진 페이지는 직접 덮어쓸 수 없고, 소거(erase) 후 재기록 필요
- 소거는 소거 블록(erase block, 256KB~1MB) 단위로 수행되며 2~5 밀리초 소요
- 각 페이지는 약 100,000~1,000,000번만 소거 가능

이러한 제약을 극복하기 위해 플래시 변환 계층(Flash Translation Layer)이 논리적 페이지 번호를 물리적 페이지 번호에 매핑한다. 논리적 페이지가 갱신되면 이미 소거된 다른 물리적 페이지로 재매핑되고, 원래 위치는 나중에 소거된다.

마모 평준화(wear leveling)는 소거 연산을 물리적 블록에 균등하게 분배하여 특정 블록의 조기 마모를 방지한다. 자주 갱신되는 "핫 데이터"는 소거 횟수가 적은 블록에, 드물게 갱신되는 "콜드 데이터"는 소거 횟수가 많은 블록에 배치한다.

## 예시

SSD 성능 지표 (2018년 기준):

```
QD-1 (단일 요청):
- 랜덤 4KB 블록 읽기: ~10,000 IOPS
- 랜덤 4KB 블록 쓰기: ~40,000 IOPS

QD-32 (32개 병렬 요청):
- SATA SSD 랜덤 읽기: ~100,000 IOPS
- NVMe PCIe SSD 랜덤 읽기: >350,000 IOPS

순차 전송률:
- SATA 3 SSD: 400-500 MB/s
- NVMe PCIe 3.0x4 SSD: 2-3 GB/s
```

하이브리드 디스크 드라이브는 자기 디스크와 소량의 플래시 메모리를 결합하여, 자주 접근되는 데이터를 플래시 메모리에 캐시한다.

## 관련 개념

- [Magnetic Disk](/knowledge/database/magnetic-disk/)
- [RAID](/knowledge/database/raid/)
- [Disk Block Access](/knowledge/database/disk-block-access/)
- [Buffer Pool](/knowledge/database/buffer-pool/)
