---
title: "폴링 (Polling)"
description: "폴링(polling)은 I/O 장치의 상태 비트를 주기적으로 확인하여 서비스가 필요한지 판단하는 프로세스이다"
tags: ['Input Output', 'Interrupt', 'Performance', 'Latency', 'Device Driver']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/polling
sidebar:
  order: 2
---

## 핵심 개념

인터럽트 기반 I/O에서는 DMA가 전송 완료 시 인터럽트를 발생시켜 프로세서에 알린다. 그러나 현대 프로세서는 인터럽트 대기 중 저전력 모드에 들어가며, 인터럽트 서비스를 위해 깨어나는 시간과 파이프라인 방해로 인한 지연이 발생한다.

폴링은 이러한 인터럽트 오버헤드를 제거한다. 프로세서(또는 사용자 프로그램)가 NIC의 상태를 지속적으로 확인하여 DMA가 메시지를 전달했는지 판단한다. 부수 효과로 프로세서가 저전력 모드에 들어가지 않는다.

고성능 네트워킹에서는 폴링과 함께 여러 최적화를 결합한다:
1. **제로 카피(Zero-copy):** 중간 OS 버퍼를 거치지 않고 DMA가 사용자 공간에 직접 읽기/쓰기
2. **사용자 공간 통신:** OS를 거의 완전히 우회하여 컨텍스트 스위치 오버헤드 제거
3. **하드웨어 CRC 계산:** NIC이 이더넷 패킷의 프리앰블과 CRC를 하드웨어에서 계산

이러한 최적화를 적용한 오브젝트 스토어에서 객체 전송 시간은 약 9.5~12.5 마이크로초이다.

## 예시

```
# 인터럽트 vs 폴링 비교

인터럽트 방식:
  DMA 전송 시작 -> 프로세서 저전력 모드
  DMA 완료 -> 인터럽트 발생
  -> 프로세서 깨어남 (지연)
  -> 파이프라인 플러시 (지연)
  -> 인터럽트 핸들러 실행
  -> 컨텍스트 복원

폴링 방식:
  DMA 전송 시작
  while (NIC.status != DONE) {
      // 상태 비트 확인 (바쁜 대기)
  }
  // 즉시 데이터 처리 (깨어남/파이프라인 지연 없음)

# 네트워크 전송 시간 (최적화 적용)
클라이언트 드라이버 TX: 0.7 μs
NIC TX (PCIe + 이더넷): 6.4~8.7 μs
시간 of flight (3m): 0.02 μs
NIC RX: 1.8~2.5 μs
서버 드라이버 RX: 0.6 μs
총: ~9.5~12.5 μs
```

## 관련 개념

- [DMA (직접 메모리 접근)](/knowledge/computer-architecture/direct-memory-access/)
- [메모리 맵 입출력 (Memory-Mapped I/O)](/knowledge/computer-architecture/memory-mapped-io/)
- [문맥 교환 (Context Switch)](/knowledge/computer-architecture/context-switch/)
