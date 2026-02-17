---
title: "Text Segment"
description: "텍스트 세그먼트(Text Segment)는 프로그램의 기계어 명령어를 포함하는 메모리 영역으로, MIPS 시스템에서는 주소 400000(hex)에서 시작한다"
tags: ['Memory Layout', 'Data Segment', 'Stack Segment', 'Mips', 'Program Structure']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/text-segment
sidebar:
  order: 9
---

## 핵심 개념

MIPS 시스템의 메모리는 세 부분으로 나뉜다: (1) 텍스트 세그먼트 - 프로그램 명령어가 위치하며 주소 공간의 하단 근처에 배치. (2) 데이터 세그먼트 - 텍스트 세그먼트 위에 위치하며, 정적 데이터(10000000h부터, 컴파일 시 크기가 알려진 전역 변수 등)와 동적 데이터(malloc으로 런타임에 할당, 위쪽으로 확장)로 구분. $gp 레지스터는 10008000h를 가리켜 정적 데이터의 처음 64KB를 효율적으로 접근할 수 있게 한다. (3) 스택 세그먼트 - 주소 공간 최상단(7fffffff(hex)부터 시작하여 아래쪽으로 확장. 이 세 부분 구조의 핵심은 두 개의 동적 확장 가능한 세그먼트(힙과 스택)가 최대한 멀리 떨어져 있어 프로그램의 전체 주소 공간을 활용할 수 있다는 것이다.

## 예시

```
MIPS 메모리 레이아웃:

  7FFFFFFF ┌──────────────┐
           │  스택 세그먼트  │ ← $sp (아래로 확장)
           │     ↓        │
           │              │
           │     ↑        │
           │  동적 데이터   │ (malloc, 위로 확장)
  10000000 ├──────────────┤
           │  정적 데이터   │ ← $gp (10008000)
           ├──────────────┤
  00400000 │  텍스트 세그먼트 │ (프로그램 명령어)
           ├──────────────┤
  00000000 │  예약됨       │
           └──────────────┘

정적 데이터 접근 최적화:
  $gp = 0x10008000 → signed 16비트 오프셋으로
  0x10000000 ~ 0x10010000 범위 접근 가능
```

## 관련 개념

- [Data Segment](/knowledge/computer-architecture/data-segment/)
- [Stack Segment](/knowledge/computer-architecture/stack-segment/)
- [Procedure Call Convention](/knowledge/computer-architecture/procedure-call-convention/)
- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
