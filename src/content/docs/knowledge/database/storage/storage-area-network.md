---
title: "Storage Area Network"
description: "스토리지 영역 네트워크(SAN, Storage Area Network)는 다수의 디스크가 고속 네트워크를 통해 여러 서버 컴퓨터에 연결되는 아키텍처로, 서버에게 매우 크고 신뢰성 높은 논리적 디스크의 뷰를 제공한다"
tags: ['San', 'Nas', 'Storage Interface', 'Network Storage', 'Cloud Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/storage-area-network
sidebar:
  order: 4
---

## 핵심 개념

자기 디스크와 SSD는 일반적으로 SATA(Serial ATA) 또는 SAS(Serial Attached SCSI) 인터페이스를 통해 컴퓨터 시스템에 연결된다. SATA-3는 최대 600 MB/s의 전송률을, SAS 버전 3은 12 Gbps를 지원한다. NVMe(NonVolatile Memory Express) 인터페이스는 SSD를 더 잘 지원하기 위해 개발된 논리적 인터페이스 표준이다.

SAN 아키텍처에서 디스크는 보통 RAID를 사용하여 로컬로 조직되며, SAN에 사용되는 상호연결 기술로는:
- **iSCSI**: SCSI 명령을 IP 네트워크로 전송
- **Fiber Channel FC**: 버전에 따라 1.6~12 GB/s 전송률
- **InfiniBand**: 매우 낮은 지연시간의 고대역폭 네트워크 통신

NAS(Network Attached Storage)는 SAN의 대안으로, 네트워크 스토리지가 대용량 디스크가 아닌 파일 시스템 인터페이스를 제공한다. NFS나 CIFS 같은 네트워크 파일 시스템 프로토콜을 사용한다.

클라우드 스토리지는 데이터가 클라우드에 저장되고 API를 통해 접근된다. 수십~수백 밀리초의 높은 지연시간으로 인해 데이터베이스의 기저 스토리지로는 이상적이지 않지만, 애플리케이션의 객체 저장에 자주 사용된다.

현대의 SAN과 NAS 시스템은 자기 디스크와 SSD를 조합하여 사용할 수 있으며, SSD를 자기 디스크에 상주하는 데이터의 캐시로 구성할 수 있다.

## 예시

일반적인 SAN 구성:

```
[서버 1] ─┐
[서버 2] ─┼─ [FC 스위치] ─── [RAID 컨트롤러] ─── [디스크 어레이]
[서버 3] ─┘                                     (RAID 5/6 구성)

특징:
- 여러 서버가 동일한 스토리지 풀에 접근
- RAID로 데이터 보호
- FC 또는 iSCSI로 고속 연결
- 핫 스왑 가능한 디스크
```

SAN vs NAS vs 클라우드 스토리지 비교:

| 특성 | SAN | NAS | 클라우드 |
|------|-----|-----|---------|
| 인터페이스 | 블록 장치 | 파일 시스템 | API |
| 지연시간 | 매우 낮음 | 낮음 | 높음 |
| 주요 용도 | DB 스토리지 | 파일 공유 | 객체 저장 |

## 관련 개념

- [RAID](/knowledge/database/raid/)
- [Magnetic Disk](/knowledge/database/magnetic-disk/)
- [Flash Memory](/knowledge/database/flash-memory/)
- [Disk Block Access](/knowledge/database/disk-block-access/)
