---
title: "Memory-Mapped I/O"
description: "메모리 맵 I/O는 주소 공간의 일부를 I/O 장치에 할당하여, 해당 주소에 대한 읽기와 쓰기를 I/O 장치에 대한 명령으로 해석하는 I/O 방식이다"
tags: ['Input Output', 'Address Space', 'Device Driver', 'Pcie', 'Operating System']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/memory-mapped-io
sidebar:
  order: 1
---

## 핵심 개념

메모리 맵 I/O에서는 초기화(부팅) 시 PCIe 장치가 지정된 길이의 주소 영역을 요청할 수 있다. 이후 해당 주소 영역에 대한 모든 프로세서 읽기/쓰기는 PCIe를 통해 해당 장치로 전달된다. 메모리 시스템은 해당 주소가 I/O에 사용되는 메모리 공간임을 인식하고 연산을 무시한다.

사용자 프로그램은 OS가 주소 변환을 통해 I/O 장치에 할당된 주소 공간에 대한 접근을 제공하지 않으므로 직접 I/O를 수행할 수 없다. 이를 통해 보호가 보장된다.

프로세서가 직접 데이터를 전송하면 오버헤드가 커질 수 있으므로, DMA(Direct Memory Access)를 사용하여 프로세서 개입 없이 장치 컨트롤러가 메모리와 직접 데이터를 전송한다.

SPIM 시뮬레이터의 터미널 장치는 4개의 메모리 매핑 레지스터를 사용한다: 수신 제어 레지스터(ffff0000h, ready 비트와 인터럽트 활성화 비트), 수신 데이터 레지스터(ffff0004h, 마지막 입력 문자), 송신 제어 레지스터(ffff0008h, ready 비트와 인터럽트 활성화 비트), 송신 데이터 레지스터(ffff000ch, 출력 문자). 수신기와 송신기는 완전히 독립적이어서, 키보드에 입력된 문자가 자동으로 화면에 에코되지 않는다. 프로그램이 문자를 에코하려면 수신기에서 읽어 송신기에 써야 한다. 폴링 방식 또는 인터럽트 방식으로 I/O를 수행할 수 있다.

## 예시

```
# 메모리 맵 I/O 주소 공간 배치
물리 주소 공간:
  0x00000000 ~ 0x3FFFFFFF: DRAM (1 GiB)
  0x40000000 ~ 0x400000FF: NIC 레지스터 (메모리 맵)
  0x40000100 ~ 0x400001FF: 디스크 컨트롤러 (메모리 맵)
  ...

# NIC에 명령 전송 예시
sw $t0, 0x40000000   # NIC의 명령 레지스터에 쓰기
  -> 메모리 시스템: 이 주소는 I/O -> 무시
  -> NIC: PCIe를 통해 데이터 수신 -> 명령으로 해석

# 보호 메커니즘
사용자 프로세스의 페이지 테이블에 I/O 주소 매핑 없음
-> 사용자가 I/O 주소 접근 시도 -> 페이지 폴트
-> OS만 I/O 장치에 접근 가능
```

```
터미널 I/O 레지스터 맵:

주소          레지스터              용도
ffff0000h    수신 제어 레지스터    비트0: ready, 비트1: 인터럽트 활성화
ffff0004h    수신 데이터 레지스터  하위 8비트: 입력 문자
ffff0008h    송신 제어 레지스터    비트0: ready, 비트1: 인터럽트 활성화
ffff000ch    송신 데이터 레지스터  하위 8비트: 출력 문자

문자 에코 (폴링 방식):
wait_recv:
    lw $t0, 0xffff0000    # 수신 제어 레지스터 읽기
    andi $t0, $t0, 1      # ready 비트 확인
    beq $t0, $zero, wait_recv
    lw $a0, 0xffff0004    # 수신 데이터 읽기
wait_send:
    lw $t0, 0xffff0008    # 송신 제어 레지스터 읽기
    andi $t0, $t0, 1      # ready 비트 확인
    beq $t0, $zero, wait_send
    sw $a0, 0xffff000c    # 문자 송신
```

## 관련 개념

- [Direct Memory Access](/knowledge/computer-architecture/direct-memory-access/)
- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Supervisor Mode](/knowledge/computer-architecture/supervisor-mode/)
- [Polling](/knowledge/computer-architecture/polling/)
- [Interrupt](/knowledge/computer-architecture/interrupt/)
- [Exception Handler](/knowledge/computer-architecture/exception-handler/)
- [Device Driver](/knowledge/computer-architecture/device-driver/)
