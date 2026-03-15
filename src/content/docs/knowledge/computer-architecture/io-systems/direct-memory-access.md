---
title: "DMA (직접 메모리 접근)"
description: "DMA(Direct Memory Access)는 프로세서의 개입 없이 장치 컨트롤러가 메모리와 직접 데이터를 전송할 수 있게 하는 메커니즘이다"
tags: ['Input Output', 'Dma', 'Memory Mapped I/O', 'Interrupt', 'Data Transfer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/direct-memory-access
sidebar:
  order: 3
---

## 핵심 개념

고속 네트워크로부터의 데이터 전송을 프로세서가 직접 처리하면 프로세서 자원의 상당 부분을 소비하게 된다. DMA는 이 문제를 해결하기 위해 전용 컨트롤러가 네트워크 인터페이스와 메모리 사이의 데이터 전송을 프로세서와 독립적으로 수행한다.

DMA 동작 과정:
1. 드라이버가 호스트 메모리에 버퍼를 준비한다.
2. 드라이버가 NIC 레지스터에 I/O 디스크립터(버퍼 주소와 길이)를 기록한다.
3. NIC의 DMA 엔진이 PCIe를 통해 데이터를 복사한다.
4. 전송 완료 시 DMA가 I/O 인터럽트를 발생시켜 프로세서에 알린다.

DMA는 가상 메모리 시스템과 캐시에서 문제를 야기할 수 있다. DMA가 메모리에 직접 데이터를 쓰면 캐시에 있는 데이터와 불일치가 발생할 수 있으며(stale data problem), 이는 캐시 일관성과 유사한 해결책이 필요하다.

Intel의 DDIO(Direct Data I/O)는 DMA 엔진이 DRAM 대신 마지막 레벨 캐시의 일부(10%)를 빠른 스크래치패드로 사용하게 하여 지연과 대역폭을 모두 개선한다.

## 예시

```
# NIC에서 패킷 수신 시 DMA 과정

드라이버:
  1. 수신 버퍼 할당 (호스트 메모리)
  2. NIC에 I/O 디스크립터 기록 (버퍼 주소, 길이)

NIC DMA 엔진:
  3. 이더넷에서 패킷 수신
  4. PCIe를 통해 패킷을 호스트 버퍼에 직접 복사
  5. 인터럽트 발생 -> 프로세서에 패킷 도착 알림

드라이버:
  6. 수신된 패킷을 사용자 주소 공간으로 복사

# DMA와 캐시 일관성 문제
DMA 쓰기 -> 메모리에 새 데이터
캐시 -> 이전 데이터 (stale)
해결: 캐시 무효화 또는 캐시 플러시
```

## 관련 개념

- [메모리 맵 입출력 (Memory-Mapped I/O)](/knowledge/computer-architecture/memory-mapped-io/)
- [캐시 일관성 (Cache Coherence)](/knowledge/computer-architecture/cache-coherence/)
- [폴링 (Polling)](/knowledge/computer-architecture/polling/)
- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
