---
title: "Magnetic Disk"
description: "자기 디스크(Magnetic Disk)는 자기 물질로 코팅된 원반(platter)에 데이터를 기록하는 비휘발성 저장 장치로, 대용량 데이터의 장기 온라인 저장을 위한 주요 매체이다"
tags: ['Magnetic Disk', 'Hdd', 'Storage', 'Seek Time', 'Data Transfer Rate']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/magnetic-disk
sidebar:
  order: 1
---

## 핵심 개념

자기 디스크의 물리적 구조는 스핀들에 장착된 여러 개의 플래터로 구성된다. 각 플래터 표면은 동심원 형태의 트랙(track)으로 논리적으로 분할되며, 트랙은 다시 섹터(sector)로 나뉜다. 섹터는 512바이트가 일반적이며, 디스크에서 읽거나 쓸 수 있는 최소 정보 단위이다.

읽기-쓰기 헤드는 디스크 암(disk arm) 조립체에 장착되어 함께 움직인다. 모든 플래터의 동일 위치 트랙을 실린더(cylinder)라 한다. 디스크는 보통 5,400~10,000 RPM으로 회전한다.

디스크 성능의 주요 지표:
- **탐색 시간(Seek Time)**: 디스크 암이 올바른 트랙으로 이동하는 시간. 평균 4~10ms.
- **회전 지연(Rotational Latency)**: 원하는 섹터가 헤드 아래로 올 때까지 기다리는 시간. 평균 1회전의 절반.
- **접근 시간(Access Time)**: 탐색 시간 + 회전 지연. 평균 5~20ms.
- **데이터 전송률**: 최대 50~200 MB/s (내부 트랙은 상당히 낮음).
- **IOPS**: 4KB 블록 기준 50~200 IOPS (랜덤 접근).
- **MTTF**: 500,000~1,200,000시간 (새 디스크 기준).

순차 접근 패턴에서는 연속된 블록 요청이 같은 트랙이나 인접 트랙에 있어 탐색이 최소화되므로 전송률이 높다. 반면 랜덤 접근 패턴에서는 각 요청마다 탐색이 필요하여 훨씬 느리다.

SSD의 바이트당 가격이 자기 디스크보다 6~8배 비싸므로, 대용량 데이터 저장(비디오, 이미지, 웹 스케일의 접근 빈도 낮은 데이터)에서는 여전히 자기 디스크가 선호된다.

## 예시

디스크 접근 시간 계산 예시:

```
디스크 사양:
- 회전 속도: 7,200 RPM (1회전 = 8.33ms)
- 평균 탐색 시간: 5ms
- 전송률: 100 MB/s

평균 접근 시간 = 평균 탐색 시간 + 평균 회전 지연
             = 5ms + 8.33ms / 2
             = 5ms + 4.17ms
             = 9.17ms

4KB 블록의 전송 시간 = 4KB / 100MB/s = 0.04ms

총 시간 = 9.17ms + 0.04ms ≈ 9.21ms
따라서 초당 약 108개의 랜덤 4KB 블록 읽기 가능 (108 IOPS)
```

## 관련 개념

- [Flash Memory](/knowledge/database/flash-memory/)
- [RAID](/knowledge/database/raid/)
- [Disk Block Access](/knowledge/database/disk-block-access/)
- [Storage Area Network](/knowledge/database/storage-area-network/)
