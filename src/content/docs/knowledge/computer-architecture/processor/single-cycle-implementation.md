---
title: "Single-Cycle Implementation"
description: "단일 사이클 구현(Single-Cycle Implementation)은 모든 명령어가 하나의 클록 사이클에서 실행되는 프로세서 구현 방식이다"
tags: ['Processor', 'Clock Cycle', 'Datapath', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/single-cycle-implementation
sidebar:
  order: 9
---

## 핵심 개념

단일 사이클 구현에서 CPI(Cycles Per Instruction)는 1이지만, 클록 사이클이 가장 느린 명령어(일반적으로 lw)에 맞춰져야 하므로 전체 성능이 저하된다. lw는 명령어 메모리, 레지스터 파일, ALU, 데이터 메모리, 레지스터 파일 등 5개의 기능 유닛을 직렬로 사용하여 가장 긴 경로를 형성한다. 이 방식은 이해하기 쉽지만, 공통 경우를 빠르게 만들라(make the common case fast)는 설계 원칙을 위반한다. 현대 프로세서에서는 사용되지 않으며, 파이프라이닝이 이를 대체한다. 별도의 명령어 메모리와 데이터 메모리가 필요하다.

## 예시

```
lw 명령어의 단일 사이클 실행 경로:
Instruction Memory -> Register File -> ALU -> Data Memory -> Register File
     (200 ps)          (100 ps)      (200 ps)   (200 ps)      (100 ps)
                                                          = 800 ps 총 시간

모든 명령어가 800 ps 클록 사이클을 사용해야 함
(add 같은 명령어는 500 ps면 충분하지만)
```

## 관련 개념

- [Datapath](/knowledge/computer-architecture/datapath/)
- [Control Unit](/knowledge/computer-architecture/control-unit/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
- [Multicycle Implementation](/knowledge/computer-architecture/multicycle-implementation/)
