---
title: "SATA 인터페이스 (SATA Interface)"
description: "SATA(Serial ATA)는 저장 장치를 컴퓨터에 연결하는 가장 보편적인 하드웨어 인터페이스로, 현재 6 Gb/s의 전송 속도를 지원하며 핫스왑 및 명령 큐잉 기능을 제공한다"
tags: ['Sata', 'Storage Interface', 'Esata', 'Ahci', 'Hardware']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sata-interface
sidebar:
  order: 2
---

## 핵심 개념

SATA는 기존 병렬 ATA(PATA)를 대체하여 단순한 케이블링, 더 높은 전송률, 네이티브 핫스왑 지원을 제공한다. eSATA는 외부 연결 표준으로 내부 SATA와 전기적으로 동일하지만 커넥터가 다르다.

**SAS(Serial Attached SCSI)와의 비교:** SAS는 12 Gb/s로 SATA의 2배 속도이며, 수천 개의 대기 연산 큐를 처리할 수 있고(SATA는 32개), 하나의 호스트 인터페이스에 수백~수천 개 장치를 연결할 수 있다. SAS 백플레인은 SATA 드라이브도 수용 가능하다.

**PCIe 인터페이스:** SATA의 6 Gb/s 한계를 초월하기 위해 고성능 SSD는 PCIe 버스에 직접 연결된다. PCIe 3.0은 16레인 기준 15 GB/s 이상의 처리량을 제공하여 SATA보다 20배 이상 빠르다. M.2 표준은 SATA, PCIe, USB 3.0을 단일 커넥터로 통합한다.

**NVMe(Non-Volatile Memory Express):** PCIe 위에서 동작하는 SSD 최적화 프로토콜로, AHCI보다 훨씬 높은 대기열 깊이와 낮은 레이턴시를 제공한다.

## 예시

```bash
# 시스템의 디스크와 인터페이스 정보 확인
lsblk -o NAME,SIZE,TYPE,TRAN

# SATA 드라이브 상세 정보 (물리 서버에서만)
sudo hdparm -I /dev/sda

# 디스크 모델 및 시리얼 확인
lsblk -o +MODEL,SERIAL

# PCIe NVMe 드라이브 확인
ls /dev/nvme*
```

## 관련 개념

- [솔리드 스테이트 드라이브 (Solid State Drive)](/knowledge/linux/solid-state-drive/)
- [디바이스 파일 (Device File)](/knowledge/linux/device-file/)
- [RAID (독립 디스크의 중복 배열)](/knowledge/linux/raid/)
- [디스크 파티셔닝 (Disk Partitioning)](/knowledge/linux/disk-partitioning/)
