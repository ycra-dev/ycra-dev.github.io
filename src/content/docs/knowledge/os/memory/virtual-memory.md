---
title: "가상 메모리 (Virtual Memory)"
description: "프로세스의 논리적 메모리를 물리적 메모리와 분리하여, 물리 메모리보다 큰 프로그램도 실행할 수 있게 해주는 기법"
tags: ["OS", "Memory", "VirtualMemory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/virtual-memory
sidebar:
  order: 2
---

## 핵심 개념

가상 메모리(Virtual Memory)는 프로세스의 논리적 메모리를 물리적 메모리와 분리하여, 물리 메모리보다 큰 프로그램도 실행할 수 있게 해주는 기법입니다. 대부분의 프로그램은 실행 시 전체 코드가 필요하지 않으므로(에러 처리 코드, 드물게 쓰는 옵션 등), 참조 지역성(locality of reference)을 활용하여 필요한 부분만 물리 메모리에 적재합니다.

## 동작 원리

1. 프로세스에게 연속적인 가상 주소 공간(Virtual Address Space)을 제공
2. MMU(Memory Management Unit)가 가상 주소를 물리 주소로 변환
3. 필요한 페이지만 물리 메모리에 적재, 나머지는 보조 저장장치(swap space)에 유지
4. 접근 시 메모리에 없으면 페이지 폴트 발생 → 해당 페이지를 메모리로 로드

```
[가상 주소 공간]          [물리 메모리]        [보조 저장장치]
    max
   ┌─────┐                 ┌─────┐             ┌─────┐
   │stack│ ←────────────→  │page │             │     │
   │     │                 │frames│            │swap │
   │(hole)│    MMU         │     │             │space│
   │     │  ─────────→     │     │ ←─────→     │     │
   │heap │                 │     │             │     │
   │data │                 └─────┘             └─────┘
   │text │
    0
```

## 예시

4GB 물리 메모리 시스템에서 8GB 크기의 프로그램 실행 시, 프로그램 전체를 메모리에 올릴 수 없지만 가상 메모리를 통해 현재 실행에 필요한 부분만 메모리에 적재하여 실행할 수 있습니다.

도서관에서 책을 빌릴 때, 모든 책을 집에 가져오는 대신 필요한 책만 빌려오고 다 읽으면 반납하고 새 책을 빌리는 것과 같습니다.

- 프로그램이 물리 메모리 크기에 제한받지 않음
- 더 많은 프로세스를 동시에 실행 가능 (멀티프로그래밍 증가)
- 프로세스 간 라이브러리/메모리 공유 가능
- 프로세스 생성 효율화 (fork 시 Copy-on-Write)
- 단점: 페이지 폴트 발생 시 성능 저하, 스래싱(thrashing) 위험, MMU 하드웨어 필요

## 관련 개념

- [논리 주소와 물리 주소](/knowledge/os/logical-physical-address/)
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/)
- [계층적 페이징 (Hierarchical Paging)](/knowledge/os/hierarchical-paging/)
- [멀티프로그래밍 (Multiprogramming)](/knowledge/os/multiprogramming/)
